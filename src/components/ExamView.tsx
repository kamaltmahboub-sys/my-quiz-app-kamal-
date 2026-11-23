import React from 'react';
import { UI_TEXT } from '../data/physicsData';
import type { ExamState, Language } from '../types';
import { formatTime, playUiTone } from '../utils/examUtils';
import { QuestionFigure } from './QuestionFigure';

interface ExamViewProps {
  lang: Language;
  studentName: string;
  exam: ExamState;
  onSelectOption: (optionIndex: number) => void;
  onToggleFlag: () => void;
  onOpenConstants: () => void;
  onOpenReviewGrid: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const ExamView: React.FC<ExamViewProps> = ({
  lang,
  studentName,
  exam,
  onSelectOption,
  onToggleFlag,
  onOpenConstants,
  onOpenReviewGrid,
  onPrev,
  onNext,
}) => {
  const t = UI_TEXT[lang];
  const isAr = lang === 'ar';
  const { questions, currentIndex, answers, flagged, elapsedSeconds } = exam;
  const q = questions[currentIndex];
  if (!q) return null;

  const total = questions.length;
  const answeredCount = Object.keys(answers).length;
  const isFlagged = !!flagged[currentIndex];
  const selectedOpt = answers[currentIndex];
  const letters = t.optionLetters;
  const candidateDisplay = studentName.trim() || t.defaultStudent;

  const questionSizeClass = 'text-lg sm:text-xl';
  const optionSizeClass = 'text-base sm:text-lg';
  const optionsList = isAr ? q.optionsAr : q.optionsEn;

  return (
    <div className="flex-1 flex flex-col bg-transparent">
      {/* Qiyas Sub-Header Banner */}
      <div className="bg-slate-800 text-white border-t border-slate-700 px-4 sm:px-6 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-xs sm:text-sm min-w-0">
            <span className="px-2.5 py-1 rounded-lg bg-slate-700 text-slate-200 font-semibold shrink-0">
              {t.candidateLabel} <strong className="text-white">{candidateDisplay}</strong>
            </span>
            <span className="text-slate-300 truncate hidden md:inline">
              {isAr ? exam.titleAr : exam.titleEn}
            </span>
          </div>

          <div className="flex items-center gap-3 ms-auto">
            <div className="px-3.5 py-1.5 rounded-xl bg-qiyas-teal text-white font-bold text-xs sm:text-sm shadow-sm tabular-nums whitespace-nowrap">
              {t.questionCounter(currentIndex + 1, total)}
            </div>

            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-mono font-extrabold text-sm sm:text-base bg-qiyas-navyLight text-white border border-slate-600 tabular-nums">
              <svg className="w-4 h-4 text-teal-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs font-sans font-semibold text-slate-300 hidden sm:inline">
                {t.elapsedTimeLabel}:
              </span>
              <span>{formatTime(elapsedSeconds)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Qiyas Toolbar */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-2.5 shadow-2xs">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <button
            type="button"
            onClick={onToggleFlag}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold border transition cursor-pointer whitespace-nowrap ${
              isFlagged
                ? 'bg-amber-100 border-amber-400 text-amber-900'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-amber-50 hover:border-amber-300'
            }`}
          >
            <svg
              className={`w-4 h-4 ${isFlagged ? 'text-amber-600 fill-amber-500' : 'text-slate-500'}`}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
              />
            </svg>
            <span>{isFlagged ? t.flaggedBtn : t.flagBtn}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                playUiTone('click');
                onOpenReviewGrid();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-qiyas-navy border border-slate-200 text-xs sm:text-sm font-bold transition cursor-pointer whitespace-nowrap tabular-nums"
            >
              <svg className="w-4 h-4 text-qiyas-teal" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 10h16M4 14h10M4 18h6"
                />
              </svg>
              <span>{t.reviewModalTitle}</span>
              <span className="text-qiyas-teal font-extrabold">
                ({answeredCount}/{total})
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                playUiTone('click');
                onOpenConstants();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-qiyas-teal border border-teal-200 text-xs sm:text-sm font-bold transition cursor-pointer whitespace-nowrap"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              <span>{t.constantsBtn}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Question & Options Workspace — fills the full lower section down to the bottom bar */}
      <div className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-5 flex flex-col">
        <div className="flex-1 w-full bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 flex flex-col justify-between gap-6">
          <div className="pb-5 border-b border-slate-100">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-2 text-xs font-bold text-qiyas-teal bg-teal-50 px-3 py-1 rounded-lg tabular-nums">
                #{currentIndex + 1}
              </span>
              {q.isRephrased && (
                <span className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
                  {t.rephrasedMarker}
                </span>
              )}
              {!q.isRephrased && q.isNewUnseen && (
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                  {t.newQuestionMarker}
                </span>
              )}
            </div>
            <p
              className={`font-bold text-slate-900 ${questionSizeClass} leading-relaxed`}
              dangerouslySetInnerHTML={{ __html: isAr ? q.qAr : q.qEn }}
            />
            <QuestionFigure questionId={q.figureId ?? q.id} lang={lang} />
          </div>

          <div className="flex-1 flex flex-col justify-center space-y-3.5">
            {optionsList.map((optText, idx) => {
              const isSelected = selectedOpt === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onSelectOption(idx)}
                  className={`qiyas-option w-full text-start p-4 sm:p-5 rounded-2xl border-2 flex items-center gap-4 cursor-pointer ${
                    isSelected
                      ? 'border-qiyas-teal bg-teal-50/80 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3 shrink-0">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? 'border-qiyas-teal bg-qiyas-teal' : 'border-slate-400'
                      }`}
                    >
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                    <span
                      className={`w-8 h-8 rounded-lg font-extrabold text-sm flex items-center justify-center ${
                        isSelected ? 'bg-qiyas-teal text-white' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {letters[idx]}
                    </span>
                  </div>

                  <div
                    className={`font-semibold text-slate-800 ${optionSizeClass} leading-relaxed flex-1`}
                    dangerouslySetInnerHTML={{ __html: optText }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Qiyas Navigation Footer */}
      <div className="bg-white border-t border-slate-200 px-4 sm:px-6 py-3.5 sticky bottom-0 z-30 shadow-inner">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onPrev}
            disabled={currentIndex === 0}
            className={`px-4 sm:px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm border-2 transition flex items-center gap-2 whitespace-nowrap ${
              currentIndex === 0
                ? 'border-slate-200 text-slate-300 cursor-not-allowed'
                : 'border-slate-300 text-slate-700 hover:bg-slate-100 cursor-pointer'
            }`}
          >
            <svg
              className={`w-4 h-4 transform ${isAr ? '' : 'rotate-180'}`}
              fill="none"
              stroke="currentColor"
              strokeWidth={2.2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span>{t.prevBtn}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playUiTone('click');
              onOpenReviewGrid();
            }}
            className="px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-slate-800 hover:bg-slate-900 text-white transition whitespace-nowrap cursor-pointer"
          >
            {t.reviewAllBtn}
          </button>

          {currentIndex < total - 1 ? (
            <button
              type="button"
              onClick={onNext}
              className="px-5 sm:px-7 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-qiyas-teal hover:bg-qiyas-tealHover text-white shadow transition flex items-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <span>{t.nextBtn}</span>
              <svg
                className={`w-4 h-4 transform ${isAr ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2.2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                playUiTone('click');
                onOpenReviewGrid();
              }}
              className="px-5 sm:px-7 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-rose-600 hover:bg-rose-700 text-white shadow transition whitespace-nowrap cursor-pointer"
            >
              {t.endExamBtn}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
