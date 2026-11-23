export type Language = 'en' | 'ar';

export type ViewName = 'home' | 'physics' | 'exam' | 'results' | 'progress';

export type QuizMode = 'single' | 'cumulative' | 'comprehensive';

export type ExamFontSize = 'sm' | 'md' | 'lg';

export interface ChapterLesson {
  number: number;
  titleEn: string;
  titleAr: string;
}

export interface ChapterSubPart {
  subPart: number;
  titleEn: string;
  titleAr: string;
  lessons: ChapterLesson[];
}

export interface PhysicsPart {
  id: number;
  titleEn: string;
  subEn: string;
  titleAr: string;
  subAr: string;
  lessons?: ChapterLesson[];
  subParts?: ChapterSubPart[];
  isComprehensive?: boolean;
}

export interface Question {
  id: string;
  baseId?: string;
  figureId?: string;
  isRephrased?: boolean;
  isNewUnseen?: boolean;
  part: number;
  subPart?: number;
  qAr: string;
  qEn: string;
  optionsAr: string[];
  optionsEn: string[];
  correct: number;
  expAr: string;
  expEn: string;
}

export interface ChapterAttemptPoint {
  attempt: number;
  pct: number;
  correctCount: number;
  totalCount: number;
  timestamp: number;
}

export interface ChapterStat {
  attempts: number;
  bestPct: number;
  lastPct?: number;
  history?: ChapterAttemptPoint[];
}

export interface PendingQuizConfig {
  partId: number;
  subPart?: number;
  mode: QuizMode;
}

export interface AdaptiveExamSummary {
  rephrasedCount: number;
  newCount: number;
  reviewFallbackCount: number;
}

export interface ExamState {
  partId: number | null;
  subPart?: number;
  mode?: QuizMode;
  titleAr: string;
  titleEn: string;
  questions: Question[];
  currentIndex: number;
  answers: Record<number, number>;
  flagged: Record<number, boolean>;
  elapsedSeconds: number;
  fontSize: ExamFontSize;
  adaptiveSummary?: AdaptiveExamSummary;
}
