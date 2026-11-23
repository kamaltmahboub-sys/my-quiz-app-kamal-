import { useCallback, useEffect, useRef, useState } from 'react';
import { BarChart3, Volume2, VolumeX } from 'lucide-react';
import { ExamView } from './components/ExamView';
import { HomeView } from './components/HomeView';
import { CodeModal, ConstantsModal, ModeModal, ReviewGridModal } from './components/Modals';
import { PhysicsHubView } from './components/PhysicsHubView';
import { ProgressDashboardView } from './components/ProgressDashboardView';
import { ResultsView } from './components/ResultsView';
import {
  DEFAULT_APP_CONFIG,
  getPartKey,
  getStudyUnitOrder,
  getSubPartDetails,
  PHYSICS_PARTS,
  QUESTION_BANK,
  UI_TEXT,
} from './data/physicsData';
import { testFirestoreConnection } from './firebase';
import type {
  ChapterStat,
  ExamState,
  Language,
  PendingQuizConfig,
  PhysicsPart,
  QuizMode,
  ViewName,
} from './types';
import {
  buildAdaptiveExamQuestions,
  loadAdaptiveHistory,
  resetAdaptiveHistory,
  saveAdaptiveHistory,
} from './utils/adaptiveQuiz';
import {
  getSoundEnabled,
  playUiTone,
  setSoundEnabled,
} from './utils/examUtils';

const EMPTY_EXAM: ExamState = {
  partId: null,
  titleAr: '',
  titleEn: '',
  questions: [],
  currentIndex: 0,
  answers: {},
  flagged: {},
  elapsedSeconds: 0,
  fontSize: 'md',
};

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [view, setView] = useState<ViewName>('home');
  const [studentName, setStudentName] = useState('');
  const [soundOn, setSoundOn] = useState<boolean>(() => getSoundEnabled());

  const platformConfig = DEFAULT_APP_CONFIG;
  const activeQuestions = QUESTION_BANK;

  const [freeQuizUsed, setFreeQuizUsed] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [selectedPartId, setSelectedPartId] = useState<number | null>(null);
  const [selectedSubPart, setSelectedSubPart] = useState<number>(1);
  const [pendingQuizConfig, setPendingQuizConfig] = useState<PendingQuizConfig | null>(null);
  const [initialHistory] = useState(() => loadAdaptiveHistory());
  const [seenIds, setSeenIds] = useState<string[]>(initialHistory.seenIds);
  const [missedIds, setMissedIds] = useState<string[]>(initialHistory.missedIds);
  const [chapterStats, setChapterStats] = useState<Record<string, ChapterStat>>(
    initialHistory.chapterStats,
  );
  const [exam, setExam] = useState<ExamState>(EMPTY_EXAM);

  // Modals
  const [modeModalPart, setModeModalPart] = useState<PhysicsPart | null>(null);
  const [modeModalSubPart, setModeModalSubPart] = useState<number>(1);
  const [codeModalOpen, setCodeModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [constantsModalOpen, setConstantsModalOpen] = useState(false);

  // Toast
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  const t = UI_TEXT[lang];
  const isAr = lang === 'ar';

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setToastMsg(null);
    }, 3200);
  }, []);

  // Sync document language and text direction
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  // Verify Firestore connection on boot
  useEffect(() => {
    void testFirestoreConnection();
  }, []);

  const handleToggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) {
      playUiTone('click');
    }
  };

  const finishExam = useCallback(
    (examSnapshot?: ExamState) => {
      const targetExam = examSnapshot ?? exam;
      setReviewModalOpen(false);
      setConstantsModalOpen(false);

      let correctCount = 0;
      const total = targetExam.questions.length;
      if (total > 0) {
        targetExam.questions.forEach((q, idx) => {
          if (targetExam.answers[idx] === q.correct) correctCount++;
        });
      }

      let nextSeenSet = new Set(seenIds);
      let nextMissedSet = new Set(missedIds);
      let nextStats = chapterStats;

      if (total > 0) {
        targetExam.questions.forEach((q, idx) => {
          const baseId = q.baseId ?? q.id;
          nextSeenSet.add(baseId);
          if (targetExam.answers[idx] === q.correct) {
            nextMissedSet.delete(baseId);
          } else {
            nextMissedSet.add(baseId);
          }
        });
      }

      if (targetExam.partId && total > 0) {
        const pct = Math.round((correctCount / total) * 100);
        const statKey = getPartKey(targetExam.partId, targetExam.subPart ?? 1);
        const existing = chapterStats[statKey] || { attempts: 0, bestPct: 0 };
        const nextAttemptNum = existing.attempts + 1;
        const prevHistory = existing.history ?? [];
        nextStats = {
          ...chapterStats,
          [statKey]: {
            attempts: nextAttemptNum,
            bestPct: Math.max(existing.bestPct, pct),
            lastPct: pct,
            history: [
              ...prevHistory,
              {
                attempt: nextAttemptNum,
                pct,
                correctCount,
                totalCount: total,
                timestamp: Date.now(),
              },
            ],
          },
        };
        setChapterStats(nextStats);
      }

      const nextSeenArr = Array.from(nextSeenSet);
      const nextMissedArr = Array.from(nextMissedSet);
      setSeenIds(nextSeenArr);
      setMissedIds(nextMissedArr);
      saveAdaptiveHistory({
        seenIds: nextSeenArr,
        missedIds: nextMissedArr,
        chapterStats: nextStats,
      });

      const isPerfectScore = total > 0 && correctCount === total;
      playUiTone(isPerfectScore ? 'celebrate' : 'complete');
      setView('results');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [chapterStats, exam, missedIds, seenIds],
  );

  // Track overall elapsed time while in exam view (no per-question limit)
  useEffect(() => {
    if (view !== 'exam') return;

    const interval = window.setInterval(() => {
      setExam((prev) => ({ ...prev, elapsedSeconds: prev.elapsedSeconds + 1 }));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [view]);

  const navigateTo = useCallback((viewName: ViewName) => {
    playUiTone('click');
    setReviewModalOpen(false);
    setConstantsModalOpen(false);
    setView(viewName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const startQuizEngine = useCallback(
    ({ partId, subPart = 1, mode }: PendingQuizConfig) => {
      const part = PHYSICS_PARTS.find((p) => p.id === partId);
      if (!part) return;

      const isComprehensive = Boolean(part.isComprehensive || mode === 'comprehensive');
      let pool = activeQuestions;
      let targetCount = platformConfig.questionsPerPartQuiz;

      if (isComprehensive) {
        pool = activeQuestions;
        targetCount = platformConfig.questionsPerComprehensive;
      } else if (mode === 'cumulative') {
        const targetOrder = getStudyUnitOrder(partId, subPart);
        pool = activeQuestions.filter(
          (q) => getStudyUnitOrder(q.part, q.subPart ?? 1) <= targetOrder,
        );
      } else {
        pool = activeQuestions.filter(
          (q) => q.part === partId && (q.subPart ?? 1) === subPart,
        );
      }

      if (pool.length === 0) {
        playUiTone('error');
        showToast(
          lang === 'ar'
            ? 'لا توجد أسئلة مضافة لهذا الجزء بعد.'
            : 'No questions available for this part yet.',
        );
        return;
      }

      const { questions: selectedQuestions, summary } = buildAdaptiveExamQuestions(
        pool,
        targetCount,
        new Set(seenIds),
        new Set(missedIds),
      );

      const subDetails = getSubPartDetails(partId, subPart);
      const subLabelAr = subDetails?.sub ? ` — ${subDetails.sub.titleAr}` : '';
      const subLabelEn = subDetails?.sub ? ` — ${subDetails.sub.titleEn}` : '';

      const modeTagAr = isComprehensive
        ? ''
        : mode === 'cumulative'
          ? ' (هذا الجزء + الأجزاء السابقة)'
          : ' (هذا الجزء الحالي فقط)';
      const modeTagEn = isComprehensive
        ? ''
        : mode === 'cumulative'
          ? ' (This Part + All Previous)'
          : ' (Current Part Only)';

      playUiTone('next');
      setExam({
        partId,
        subPart,
        mode,
        titleAr: `${part.titleAr}${subLabelAr}${modeTagAr}`,
        titleEn: `${part.titleEn}${subLabelEn}${modeTagEn}`,
        questions: selectedQuestions,
        currentIndex: 0,
        answers: {},
        flagged: {},
        elapsedSeconds: 0,
        fontSize: 'md',
        adaptiveSummary: summary,
      });

      setView('exam');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [
      activeQuestions,
      lang,
      missedIds,
      platformConfig.questionsPerComprehensive,
      platformConfig.questionsPerPartQuiz,
      seenIds,
      showToast,
    ],
  );

  const attemptStartQuiz = useCallback(
    (config: PendingQuizConfig) => {
      if (!freeQuizUsed || isUnlocked) {
        if (!freeQuizUsed) {
          setFreeQuizUsed(true);
        }
        startQuizEngine(config);
      } else {
        playUiTone('click');
        setPendingQuizConfig(config);
        setCodeModalOpen(true);
      }
    },
    [freeQuizUsed, isUnlocked, startQuizEngine],
  );

  const handlePartClick = useCallback(
    (partId: number, subPart = 1) => {
      const part = PHYSICS_PARTS.find((p) => p.id === partId);
      if (!part) return;

      setSelectedPartId(partId);
      setSelectedSubPart(subPart);
      if (part.isComprehensive) {
        attemptStartQuiz({ partId: part.id, subPart: 1, mode: 'comprehensive' });
        return;
      }

      playUiTone('click');
      setModeModalPart(part);
      setModeModalSubPart(subPart);
    },
    [attemptStartQuiz],
  );

  const handleSelectMode = (mode: QuizMode) => {
    playUiTone('click');
    const partId = modeModalPart?.id ?? selectedPartId;
    const subPart = modeModalSubPart;
    setModeModalPart(null);
    if (partId) {
      attemptStartQuiz({ partId, subPart, mode });
    }
  };

  const handleUnlockSuccess = () => {
    setIsUnlocked(true);
    setCodeModalOpen(false);
    showToast(t.codeSuccessToast);
    if (pendingQuizConfig) {
      const cfg = pendingQuizConfig;
      setPendingQuizConfig(null);
      startQuizEngine(cfg);
    }
  };

  const handleResetHistory = useCallback(() => {
    playUiTone('click');
    resetAdaptiveHistory();
    setSeenIds([]);
    setMissedIds([]);
    setChapterStats({});
    showToast(t.resetHistoryToast);
  }, [showToast, t.resetHistoryToast]);

  const handleStartAdaptiveRetry = useCallback(() => {
    const partId = exam.partId || selectedPartId || 1;
    const subPart = exam.subPart ?? selectedSubPart;
    const mode: QuizMode =
      exam.mode ??
      (PHYSICS_PARTS.find((p) => p.id === partId)?.isComprehensive ? 'comprehensive' : 'single');
    attemptStartQuiz({ partId, subPart, mode });
  }, [attemptStartQuiz, exam.mode, exam.partId, exam.subPart, selectedPartId, selectedSubPart]);

  const selectOption = useCallback((optIdx: number) => {
    setExam((prev) => {
      playUiTone('select');
      return {
        ...prev,
        answers: {
          ...prev.answers,
          [prev.currentIndex]: optIdx,
        },
      };
    });
  }, []);

  const toggleFlagCurrent = useCallback(() => {
    setExam((prev) => {
      const idx = prev.currentIndex;
      const nextFlagged = { ...prev.flagged };
      if (nextFlagged[idx]) {
        delete nextFlagged[idx];
      } else {
        nextFlagged[idx] = true;
      }
      playUiTone('flag');
      return {
        ...prev,
        flagged: nextFlagged,
      };
    });
  }, []);

  const prevQuestion = useCallback(() => {
    setExam((prev) => {
      if (prev.currentIndex > 0) {
        playUiTone('prev');
        return { ...prev, currentIndex: prev.currentIndex - 1 };
      }
      return prev;
    });
  }, []);

  const nextQuestion = useCallback(() => {
    setExam((prev) => {
      if (prev.currentIndex < prev.questions.length - 1) {
        playUiTone('next');
        return { ...prev, currentIndex: prev.currentIndex + 1 };
      }
      return prev;
    });
  }, []);

  const jumpToQuestion = useCallback((index: number) => {
    playUiTone('click');
    setExam((prev) => ({ ...prev, currentIndex: index }));
    setReviewModalOpen(false);
  }, []);

  // Keyboard shortcuts during computerized exam (1-4 / A-D to answer, F to flag, Arrows to navigate)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (view !== 'exam') return;
      const activeTag = document.activeElement?.tagName;
      if (activeTag && ['INPUT', 'TEXTAREA', 'SELECT'].includes(activeTag)) return;

      const key = e.key.toUpperCase();
      if (key === '1' || key === 'A') selectOption(0);
      else if (key === '2' || key === 'B') selectOption(1);
      else if (key === '3' || key === 'C') selectOption(2);
      else if (key === '4' || key === 'D') selectOption(3);
      else if (key === 'F') toggleFlagCurrent();
      else if (e.key === 'ArrowRight') {
        if (lang === 'ar') prevQuestion();
        else nextQuestion();
      } else if (e.key === 'ArrowLeft') {
        if (lang === 'ar') nextQuestion();
        else prevQuestion();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [lang, nextQuestion, prevQuestion, selectOption, toggleFlagCurrent, view]);

  const handleLogoClick = () => {
    if (view === 'exam') {
      playUiTone('click');
      setReviewModalOpen(true);
    } else {
      navigateTo('home');
    }
  };

  const handleCopyWebsiteLink = async () => {
    playUiTone('click');
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast(
        isAr ? 'تم نسخ رابط الموقع لمشاركته مع الطلاب!' : 'Website link copied to clipboard!',
      );
    } catch {
      showToast(
        isAr ? 'انسخ رابط الموقع من شريط العنوان لمشاركته.' : 'Copy the URL from your address bar to share.',
      );
    }
  };

  return (
    <>
      {/* TOP QIYAS COMPUTERIZED HEADER BAR */}
      <header className="bg-[#041B14] text-white shadow-md sticky top-0 z-40 border-b border-emerald-900/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleLogoClick}
            className="flex items-center gap-3 cursor-pointer text-start min-w-0"
          >
            <div className="w-10 h-10 rounded-xl bg-qiyas-teal flex items-center justify-center shadow-inner shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div className="leading-tight min-w-0">
              <h1 className="font-bold text-sm sm:text-base tracking-wide text-white truncate">
                {t.headerTitle}
              </h1>
              <p className="text-[11px] sm:text-xs text-teal-300 font-medium truncate">
                {t.headerSub}
              </p>
            </div>
          </button>

          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {view !== 'exam' && (
              <button
                type="button"
                onClick={() => navigateTo('progress')}
                className={`h-9 px-3 rounded-xl font-bold text-xs shadow transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 border cursor-pointer shrink-0 whitespace-nowrap ${
                  view === 'progress'
                    ? 'bg-qiyas-teal text-white border-teal-400/50'
                    : 'bg-emerald-900/70 hover:bg-emerald-800/80 text-teal-200 border-emerald-700/60'
                }`}
              >
                <BarChart3 className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">{t.progressDashboardBtn}</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleToggleSound}
              title={soundOn ? t.soundOnLabel : t.soundOffLabel}
              aria-label={soundOn ? t.soundOnLabel : t.soundOffLabel}
              className={`w-9 h-9 rounded-xl font-bold shadow transition-all hover:scale-105 active:scale-95 flex items-center justify-center border cursor-pointer shrink-0 ${
                soundOn
                  ? 'bg-emerald-900/70 hover:bg-emerald-800/80 text-teal-200 border-emerald-700/60'
                  : 'bg-slate-800/80 hover:bg-slate-700 text-slate-400 border-slate-700'
              }`}
            >
              {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={() => {
                playUiTone('click');
                setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
              }}
              title="Switch Language / تغيير اللغة"
              className="w-9 h-9 rounded-xl bg-qiyas-teal hover:bg-qiyas-tealHover text-white font-extrabold shadow transition-all hover:scale-105 active:scale-95 flex items-center justify-center border border-teal-400/30 cursor-pointer shrink-0"
            >
              <span className="text-[11px] leading-none tracking-tight">{t.langToggle}</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN DYNAMIC APPLICATION CONTAINER */}
      <main className="flex-1 flex flex-col">
        {view === 'home' && (
          <HomeView
            lang={lang}
            studentName={studentName}
            onChangeStudentName={setStudentName}
            onEnterPhysics={() => navigateTo('physics')}
            onChemistryClick={() => {
              playUiTone('click');
              showToast(t.chemToast);
            }}
          />
        )}

        {view === 'physics' && (
          <PhysicsHubView
            lang={lang}
            isUnlocked={isUnlocked}
            freeQuizUsed={freeQuizUsed}
            chapterStats={chapterStats}
            seenCount={seenIds.length}
            missedCount={missedIds.length}
            totalBankCount={activeQuestions.length}
            onResetHistory={handleResetHistory}
            onOpenProgress={() => navigateTo('progress')}
            onBackHome={() => navigateTo('home')}
            onSelectPart={handlePartClick}
          />
        )}

        {view === 'progress' && (
          <ProgressDashboardView
            lang={lang}
            chapterStats={chapterStats}
            seenCount={seenIds.length}
            missedCount={missedIds.length}
            totalBankCount={activeQuestions.length}
            onBackToPhysics={() => navigateTo('physics')}
            onSelectPart={handlePartClick}
            onResetHistory={handleResetHistory}
          />
        )}

        {view === 'exam' && (
          <ExamView
            lang={lang}
            studentName={studentName}
            exam={exam}
            onSelectOption={selectOption}
            onToggleFlag={toggleFlagCurrent}
            onOpenConstants={() => setConstantsModalOpen(true)}
            onOpenReviewGrid={() => setReviewModalOpen(true)}
            onPrev={prevQuestion}
            onNext={nextQuestion}
          />
        )}

        {view === 'results' && (
          <ResultsView
            lang={lang}
            exam={exam}
            selectedPartId={selectedPartId}
            selectedSubPart={selectedSubPart}
            onRetryPart={handlePartClick}
            onStartAdaptiveRetry={handleStartAdaptiveRetry}
            onOpenProgress={() => navigateTo('progress')}
            onBackToPhysics={() => navigateTo('physics')}
          />
        )}
      </main>

      {/* PUBLIC WEBSITE FOOTER (shown outside exam) */}
      {view !== 'exam' && (
        <footer className="bg-[#041B14]/95 text-slate-300 border-t border-emerald-900/70 mt-auto">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-5 pb-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-slate-300">
              <span className="font-bold text-white">{t.headerTitle}</span>
              <span aria-hidden="true">·</span>
              <span>
                {isAr
                  ? `${activeQuestions.length} سؤال فيزياء متاح للتدريب`
                  : `${activeQuestions.length} Physics practice questions`}
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => navigateTo('home')}
                className="hover:text-white hover:underline cursor-pointer"
              >
                {isAr ? 'الرئيسية' : 'Home'}
              </button>
              <button
                type="button"
                onClick={() => navigateTo('physics')}
                className="hover:text-white hover:underline cursor-pointer"
              >
                {t.physicsCardTitle}
              </button>
              <button
                type="button"
                onClick={() => navigateTo('progress')}
                className="hover:text-white hover:underline cursor-pointer"
              >
                {t.progressDashboardBtn}
              </button>
              <button
                type="button"
                onClick={() => void handleCopyWebsiteLink()}
                className="px-3 py-1.5 rounded-lg bg-qiyas-teal/20 hover:bg-qiyas-teal/30 text-teal-200 border border-teal-700/60 font-semibold transition cursor-pointer"
              >
                {isAr ? 'نسخ رابط الموقع' : 'Copy Website Link'}
              </button>
            </div>
          </div>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-3 pt-2 border-t border-emerald-900/50 text-center">
            <p className="text-[10px] text-slate-400 tracking-wide">{t.creatorCredit}</p>
          </div>
        </footer>
      )}

      {/* MODALS */}
      <ModeModal
        open={modeModalPart !== null}
        lang={lang}
        part={modeModalPart}
        subPart={modeModalSubPart}
        onClose={() => {
          playUiTone('click');
          setModeModalPart(null);
        }}
        onSelectMode={handleSelectMode}
      />

      <CodeModal
        open={codeModalOpen}
        lang={lang}
        expectedCode={platformConfig.accessCode}
        onClose={() => {
          playUiTone('click');
          setCodeModalOpen(false);
        }}
        onUnlock={handleUnlockSuccess}
      />

      <ReviewGridModal
        open={reviewModalOpen}
        lang={lang}
        exam={exam}
        onClose={() => {
          playUiTone('click');
          setReviewModalOpen(false);
        }}
        onJumpToQuestion={jumpToQuestion}
        onFinishExam={() => finishExam()}
      />

      <ConstantsModal
        open={constantsModalOpen}
        lang={lang}
        onClose={() => {
          playUiTone('click');
          setConstantsModalOpen(false);
        }}
      />

      {/* TOAST NOTIFICATION BANNER */}
      {toastMsg && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-slate-900 text-white text-xs sm:text-sm font-semibold px-5 py-3 rounded-xl shadow-xl border border-slate-700 whitespace-nowrap">
            {toastMsg}
          </div>
        </div>
      )}
    </>
  );
}
