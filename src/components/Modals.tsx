import React, { useEffect, useRef, useState } from 'react';
import { getSubPartDetails, UI_TEXT } from '../data/physicsData';
import type { ExamState, Language, PhysicsPart, QuizMode } from '../types';
import { playUiTone } from '../utils/examUtils';

interface ModeModalProps {
  open: boolean;
  lang: Language;
  part: PhysicsPart | null;
  subPart?: number;
  onClose: () => void;
  onSelectMode: (mode: QuizMode) => void;
}

export const ModeModal: React.FC<ModeModalProps> = ({
  open,
  lang,
  part,
  subPart = 1,
  onClose,
  onSelectMode,
}) => {
  if (!open || !part) return null;
  const t = UI_TEXT[lang];
  const isAr = lang === 'ar';
  const details = getSubPartDetails(part.id, subPart);
  const subTitle = details?.sub ? (isAr ? details.sub.titleAr : details.sub.titleEn) : null;
  const lessons = details?.lessons ?? [];
  const isFirstUnit = details?.isFirstUnit ?? part.id === 1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/65 backdrop-blur-xs p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-view-enter"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-qiyas-navy text-white px-6 py-4 flex items-center justify-between">
          <h3 className="font-bold text-base sm:text-lg">{t.modeModalTitle}</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.closeBtn}
            className="text-slate-300 hover:text-white p-1 rounded-lg transition cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
            <div>
              <p className="font-bold text-qiyas-navy text-sm sm:text-base">
                {isAr ? part.titleAr : part.titleEn}
              </p>
              {subTitle && (
                <p className="font-bold text-qiyas-teal text-xs sm:text-sm mt-0.5">{subTitle}</p>
              )}
            </div>

            {lessons.length > 0 && (
              <div className="pt-2 border-t border-slate-200/80 space-y-1">
                <p className="text-[11px] font-bold text-slate-500">{t.lessonsIncludedLabel}</p>
                <ul className="space-y-1 text-xs text-slate-700">
                  {lessons.map((lesson) => (
                    <li key={lesson.number} className="flex items-start gap-1.5">
                      <span className="text-qiyas-teal font-bold tabular-nums">{lesson.number}.</span>
                      <span>{isAr ? lesson.titleAr : lesson.titleEn}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <p className="text-xs text-slate-500 pt-1">{t.modeModalDesc}</p>
          </div>

          <button
            type="button"
            onClick={() => onSelectMode('single')}
            className="w-full text-start p-4 rounded-xl border-2 border-slate-200 hover:border-qiyas-teal hover:bg-teal-50/40 transition group flex items-start gap-3.5 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-qiyas-teal flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-qiyas-teal group-hover:text-white transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="font-bold text-slate-900 text-sm sm:text-base">{t.modeSingleTitle}</div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{t.modeSingleSub}</p>
            </div>
          </button>

          {!isFirstUnit && (
            <button
              type="button"
              onClick={() => onSelectMode('cumulative')}
              className="w-full text-start p-4 rounded-xl border-2 border-slate-200 hover:border-amber-500 hover:bg-amber-50/40 transition group flex items-start gap-3.5 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-amber-600 group-hover:text-white transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-bold text-slate-900 text-sm sm:text-base">{t.modeCumTitle}</div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{t.modeCumSub}</p>
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

interface CodeModalProps {
  open: boolean;
  lang: Language;
  expectedCode: string;
  onClose: () => void;
  onUnlock: () => void;
}

export const CodeModal: React.FC<CodeModalProps> = ({ open, lang, expectedCode, onClose, onUnlock }) => {
  const [codeValue, setCodeValue] = useState('');
  const [hasError, setHasError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setCodeValue('');
      setHasError(false);
      const timer = setTimeout(() => inputRef.current?.focus(), 80);
      return () => clearTimeout(timer);
    }
  }, [open]);

  if (!open) return null;
  const t = UI_TEXT[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (codeValue.trim() === expectedCode) {
      setHasError(false);
      playUiTone('unlock');
      onUnlock();
    } else {
      setHasError(true);
      playUiTone('error');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-xs p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-view-enter"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-qiyas-navy text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <h3 className="font-bold text-base sm:text-lg">{t.codeModalTitle}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.closeBtn}
            className="text-slate-300 hover:text-white p-1 rounded-lg transition cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs sm:text-sm text-amber-900 leading-relaxed">
            <p>{t.codeModalDesc}</p>
          </div>

          <div>
            <label htmlFor="access-code-input" className="block text-xs font-bold text-slate-700 mb-2 tracking-wide">
              {t.codeInputLabel}
            </label>
            <input
              ref={inputRef}
              id="access-code-input"
              type="text"
              inputMode="numeric"
              maxLength={5}
              pattern="[0-9]{5}"
              placeholder="• • • • •"
              autoComplete="off"
              dir="ltr"
              value={codeValue}
              onChange={(e) => {
                setCodeValue(e.target.value.replace(/\D/g, '').slice(0, 5));
                if (hasError) setHasError(false);
              }}
              className="w-full text-center text-2xl sm:text-3xl font-extrabold tracking-[0.5em] py-3.5 px-4 rounded-xl border-2 border-slate-300 focus:border-qiyas-teal focus:ring-4 focus:ring-teal-500/15 outline-none transition bg-slate-50 tabular-nums"
              required
            />
            {hasError && (
              <p className="text-rose-600 text-xs font-semibold mt-2 text-center">{t.codeError}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-5 rounded-xl bg-qiyas-teal hover:bg-qiyas-tealHover text-white font-bold text-sm sm:text-base shadow-md transition cursor-pointer"
          >
            {t.codeSubmit}
          </button>
        </form>
      </div>
    </div>
  );
};

interface ReviewGridModalProps {
  open: boolean;
  lang: Language;
  exam: ExamState;
  onClose: () => void;
  onJumpToQuestion: (index: number) => void;
  onFinishExam: () => void;
}

export const ReviewGridModal: React.FC<ReviewGridModalProps> = ({
  open,
  lang,
  exam,
  onClose,
  onJumpToQuestion,
  onFinishExam,
}) => {
  if (!open) return null;
  const t = UI_TEXT[lang];
  const total = exam.questions.length;
  const answeredCount = Object.keys(exam.answers).length;
  const flaggedCount = Object.keys(exam.flagged).length;
  const unansweredCount = total - answeredCount;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/65 backdrop-blur-xs p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-view-enter"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-qiyas-navy text-white px-6 py-4 flex items-center justify-between">
          <h3 className="font-bold text-base sm:text-lg">{t.reviewModalTitle}</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.closeBtn}
            className="text-slate-300 hover:text-white p-1 rounded-lg transition cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
              <div className="text-xl font-extrabold text-emerald-700 tabular-nums">{answeredCount}</div>
              <div className="text-xs font-semibold text-emerald-800">{t.statAnswered}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-100 border border-slate-200">
              <div className="text-xl font-extrabold text-slate-700 tabular-nums">{unansweredCount}</div>
              <div className="text-xs font-semibold text-slate-600">{t.statUnanswered}</div>
            </div>
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
              <div className="text-xl font-extrabold text-amber-600 tabular-nums">{flaggedCount}</div>
              <div className="text-xs font-semibold text-amber-800">{t.statFlagged}</div>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-2.5 max-h-64 overflow-y-auto p-1">
            {exam.questions.map((_, idx) => {
              const isAns = exam.answers[idx] !== undefined;
              const isFlg = !!exam.flagged[idx];
              const isActive = idx === exam.currentIndex;
              let cls = 'bg-slate-100 text-slate-700 border-slate-300';
              if (isFlg) cls = 'bg-amber-400 text-slate-950 border-amber-500 font-extrabold';
              else if (isAns) cls = 'bg-emerald-600 text-white border-emerald-700 font-bold';

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onJumpToQuestion(idx)}
                  className={`py-2.5 rounded-xl border text-sm transition hover:opacity-90 relative tabular-nums cursor-pointer ${cls} ${
                    isActive ? 'ring-2 ring-offset-2 ring-qiyas-navy' : ''
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="pt-1 grid grid-cols-3 gap-2 text-[11px] font-semibold text-slate-600">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-xs bg-emerald-600 inline-block shrink-0" />
              <span>{t.legendAnswered}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-xs bg-slate-100 border border-slate-400 inline-block shrink-0" />
              <span>{t.legendUnanswered}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-xs bg-amber-400 inline-block shrink-0" />
              <span>{t.legendFlagged}</span>
            </div>
          </div>

          <div className="bg-rose-50 border border-rose-200 rounded-xl p-3.5 text-xs text-rose-800">
            <p>{t.endExamWarn}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl border-2 border-slate-300 hover:bg-slate-100 text-slate-800 font-bold text-sm transition cursor-pointer"
            >
              {t.reviewContinueBtn}
            </button>
            <button
              type="button"
              onClick={onFinishExam}
              className="flex-1 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow transition cursor-pointer"
            >
              {t.reviewFinishBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ConstantsModalProps {
  open: boolean;
  lang: Language;
  onClose: () => void;
}

export const ConstantsModal: React.FC<ConstantsModalProps> = ({ open, lang, onClose }) => {
  if (!open) return null;
  const t = UI_TEXT[lang];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/65 backdrop-blur-xs p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-view-enter"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-qiyas-teal text-white px-6 py-4 flex items-center justify-between">
          <h3 className="font-bold text-base">{t.constantsBtn}</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.closeBtn}
            className="text-teal-100 hover:text-white p-1 rounded-lg transition cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-3 text-sm" dir="ltr">
          <div className="flex justify-between py-2 border-b border-slate-100 gap-4">
            <span className="font-semibold text-slate-700">Acceleration due to gravity (g)</span>
            <span className="font-mono font-bold text-qiyas-navy tabular-nums">
              9.8 m/s<sup>2</sup> (≈ 10 m/s<sup>2</sup>)
            </span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100 gap-4">
            <span className="font-semibold text-slate-700">Speed of light in vacuum (c)</span>
            <span className="font-mono font-bold text-qiyas-navy tabular-nums">
              3.00 × 10<sup>8</sup> m/s
            </span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100 gap-4">
            <span className="font-semibold text-slate-700">Planck&apos;s constant (h)</span>
            <span className="font-mono font-bold text-qiyas-navy tabular-nums">
              6.626 × 10<sup>-34</sup> J·s
            </span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100 gap-4">
            <span className="font-semibold text-slate-700">Elementary charge (e)</span>
            <span className="font-mono font-bold text-qiyas-navy tabular-nums">
              1.60 × 10<sup>-19</sup> C
            </span>
          </div>
          <div className="flex justify-between py-2 gap-4">
            <span className="font-semibold text-slate-700">Coulomb&apos;s constant (K)</span>
            <span className="font-mono font-bold text-qiyas-navy tabular-nums">
              9.0 × 10<sup>9</sup> N·m<sup>2</sup>/C<sup>2</sup>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
