import { getRephrasedQuestionVariant } from '../data/adaptiveVariants';
import type { AdaptiveExamSummary, ChapterStat, Question } from '../types';
import { shuffleArray } from './examUtils';

const STORAGE_KEY = 'saat_adaptive_history_v1';

export interface AdaptiveHistoryData {
  seenIds: string[];
  missedIds: string[];
  chapterStats: Record<string, ChapterStat>;
}

const EMPTY_HISTORY: AdaptiveHistoryData = {
  seenIds: [],
  missedIds: [],
  chapterStats: {},
};

/**
 * Questions whose option choices explicitly refer to fixed lettered/numbered positions
 * in an SVG diagram (or fixed ordered sets) — their option order must remain intact
 * so Arrow 1..4 / Position A..D / Figure A..D align with the diagram labels.
 */
const FIXED_OPTION_ORDER_BASE_IDS = new Set([
  'q31',
  'q56',
  'q58',
  'q95',
  'q106',
  'q112',
  'q123',
  'q129',
  'q148',
  'q149',
  'q150',
  'q155',
  'q184',
  'q201',
  'q221',
]);

export function loadAdaptiveHistory(): AdaptiveHistoryData {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_HISTORY;
    const parsed = JSON.parse(raw) as Partial<AdaptiveHistoryData>;
    const rawStats =
      parsed.chapterStats && typeof parsed.chapterStats === 'object' ? parsed.chapterStats : {};
    const cleanStats: Record<string, ChapterStat> = {};

    for (const [key, stat] of Object.entries(rawStats)) {
      if (!stat || typeof stat !== 'object') continue;
      const attempts = typeof stat.attempts === 'number' ? stat.attempts : 0;
      const bestPct = typeof stat.bestPct === 'number' ? stat.bestPct : 0;
      const lastPct = typeof stat.lastPct === 'number' ? stat.lastPct : undefined;
      const history = Array.isArray(stat.history)
        ? stat.history.filter(
            (pt) =>
              pt &&
              typeof pt === 'object' &&
              typeof pt.attempt === 'number' &&
              typeof pt.pct === 'number' &&
              typeof pt.timestamp === 'number',
          )
        : undefined;

      cleanStats[key] = {
        attempts,
        bestPct,
        ...(lastPct !== undefined ? { lastPct } : {}),
        ...(history ? { history } : {}),
      };
    }

    return {
      seenIds: Array.isArray(parsed.seenIds)
        ? parsed.seenIds.filter((x): x is string => typeof x === 'string')
        : [],
      missedIds: Array.isArray(parsed.missedIds)
        ? parsed.missedIds.filter((x): x is string => typeof x === 'string')
        : [],
      chapterStats: cleanStats,
    };
  } catch {
    return EMPTY_HISTORY;
  }
}

export function saveAdaptiveHistory(data: AdaptiveHistoryData): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Ignore storage quota or private-mode restrictions
  }
}

export function resetAdaptiveHistory(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage access errors
  }
}

/**
 * Safely shuffles the 4 answer choices together across Arabic and English,
 * updating `correct` to match, unless the question relies on fixed figure labels.
 */
export function shuffleQuestionOptionsIfSafe(question: Question): Question {
  const baseId = question.baseId ?? question.id;
  if (FIXED_OPTION_ORDER_BASE_IDS.has(baseId)) {
    return question;
  }

  const count = Math.min(question.optionsAr.length, question.optionsEn.length);
  if (count <= 1) return question;

  const indices = shuffleArray(Array.from({ length: count }, (_, idx) => idx));
  const nextCorrect = indices.indexOf(question.correct);
  if (nextCorrect === -1) return question;

  return {
    ...question,
    optionsAr: indices.map((i) => question.optionsAr[i]),
    optionsEn: indices.map((i) => question.optionsEn[i]),
    correct: nextCorrect,
  };
}

/**
 * Builds an adaptive randomized test from `pool`:
 * 1. Includes previously missed questions (rephrased / alternate approach),
 * 2. Reserves dedicated slots for brand-new unseen questions from the uploaded resources,
 * 3. Fills remaining slots with additional unseen questions first, then previously mastered
 *    questions (also served in rephrased form so repeated exposure uses a fresh angle).
 */
export function buildAdaptiveExamQuestions(
  pool: Question[],
  targetCount: number,
  seenIds: Set<string>,
  missedIds: Set<string>,
): { questions: Question[]; summary: AdaptiveExamSummary } {
  const count = Math.min(targetCount, pool.length);
  if (count <= 0) {
    return {
      questions: [],
      summary: { rephrasedCount: 0, newCount: 0, reviewFallbackCount: 0 },
    };
  }

  const missedInPool = shuffleArray(pool.filter((q) => missedIds.has(q.baseId ?? q.id)));
  const unseenInPool = shuffleArray(
    pool.filter((q) => {
      const bid = q.baseId ?? q.id;
      return !seenIds.has(bid) && !missedIds.has(bid);
    }),
  );
  const masteredInPool = shuffleArray(
    pool.filter((q) => {
      const bid = q.baseId ?? q.id;
      return seenIds.has(bid) && !missedIds.has(bid);
    }),
  );

  // Reserve ~40% (minimum 2 when available) of the new exam for brand-new unseen questions
  // so follow-up randomized tests mix rephrased missed concepts with fresh questions.
  const reservedNewSlots =
    unseenInPool.length > 0 ? Math.min(unseenInPool.length, Math.max(2, Math.floor(count * 0.4))) : 0;
  const maxMissedSlots = Math.max(0, count - reservedNewSlots);

  const chosenMissed = missedInPool.slice(0, maxMissedSlots);
  const remainingAfterMissed = count - chosenMissed.length;
  const chosenUnseen = unseenInPool.slice(0, remainingAfterMissed);
  const remainingAfterUnseen = count - chosenMissed.length - chosenUnseen.length;
  const chosenMastered = remainingAfterUnseen > 0 ? masteredInPool.slice(0, remainingAfterUnseen) : [];

  const adaptiveQuestions: Question[] = [
    ...chosenMissed.map((q) =>
      shuffleQuestionOptionsIfSafe({
        ...getRephrasedQuestionVariant(q),
        isRephrased: true,
        isNewUnseen: false,
      }),
    ),
    ...chosenUnseen.map((q) =>
      shuffleQuestionOptionsIfSafe({
        ...q,
        baseId: q.baseId ?? q.id,
        figureId: q.figureId ?? q.id,
        isRephrased: false,
        // Mark as newly introduced only on adaptive follow-up rounds once prior progress exists
        isNewUnseen: seenIds.size > 0,
      }),
    ),
    ...chosenMastered.map((q) =>
      shuffleQuestionOptionsIfSafe({
        ...getRephrasedQuestionVariant(q),
        isRephrased: true,
        isNewUnseen: false,
      }),
    ),
  ];

  return {
    questions: shuffleArray(adaptiveQuestions),
    summary: {
      rephrasedCount: chosenMissed.length,
      newCount: chosenUnseen.length,
      reviewFallbackCount: chosenMastered.length,
    },
  };
}
