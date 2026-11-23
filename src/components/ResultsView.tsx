import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { UI_TEXT } from '../data/physicsData';
import type { ExamState, Language } from '../types';
import { formatTime, playUiTone } from '../utils/examUtils';
import { FireworksOverlay } from './FireworksOverlay';
import { QuestionFigure } from './QuestionFigure';

interface ResultsViewProps {
  lang: Language;
  exam: ExamState;
  selectedPartId: number | null;
  selectedSubPart?: number;
  onRetryPart: (partId: number, subPart?: number) => void;
  onStartAdaptiveRetry: () => void;
  onOpenProgress: () => void;
  onBackToPhysics: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  lang,
  exam,
  selectedPartId,
  selectedSubPart = 1,
  onRetryPart,
  onStartAdaptiveRetry,
  onOpenProgress,
  onBackToPhysics,
}) => {
  const t = UI_TEXT[lang];
  const isAr = lang === 'ar';
  const { questions, answers, elapsedSeconds, adaptiveSummary } = exam;
  const total = questions.length;
  const letters = t.optionLetters;

  let correctCount = 0;
  questions.forEach((q, idx) => {
    if (answers[idx] === q.correct) correctCount++;
  });
  const wrongCount = total - correctCount;
  const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;
  const isPerfectScore = total > 0 && correctCount === total;

  const [replayKey, setReplayKey] = useState(0);

  const badgeColor =
    percentage >= 80
      ? 'text-emerald-600 bg-emerald-50 border-emerald-200'
      : percentage >= 60
        ? 'text-amber-600 bg-amber-50 border-amber-200'
        : 'text-rose-600 bg-rose-50 border-rose-200';

  const handleReplayCelebration = () => {
    setReplayKey((k) => k + 1);
    playUiTone('celebrate');
  };

  return (
    <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-8 space-y-8 animate-view-enter">
      <FireworksOverlay active={isPerfectScore} replayKey={replayKey} />

      {/* Perfect 100% Zero-Mistake Celebration Banner */}
      {isPerfectScore && (
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-500 text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-emerald-300/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0">
              <Sparkles className="w-7 h-7 text-amber-200" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                {t.perfectScoreTitle}
              </h2>
              <p className="text-sm text-emerald-50 font-medium mt-1">
                {t.perfectScoreSub}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleReplayCelebration}
            className="px-4 py-2.5 rounded-xl bg-white text-emerald-900 hover:bg-amber-50 font-extrabold text-xs sm:text-sm shadow transition shrink-0 whitespace-nowrap cursor-pointer"
          >
            {t.replayCelebrationBtn}
          </button>
        </div>
      )}

      {/* Score Summary Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <span className="text-xs font-bold text-qiyas-teal tracking-wider">{t.resultsHeader}</span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-qiyas-navy mt-1">
              {isAr ? exam.titleAr : exam.titleEn}
            </h2>
            {adaptiveSummary && adaptiveSummary.rephrasedCount > 0 && (
              <p className="text-xs font-semibold text-amber-800 mt-1.5 tabular-nums">
                {t.adaptiveSummaryLine(adaptiveSummary.rephrasedCount, adaptiveSummary.newCount)}
              </p>
            )}
          </div>

          <div className={`px-5 py-3 rounded-2xl border-2 text-center ${badgeColor}`}>
            <div className="text-xs font-bold">{t.scoreLabel}</div>
            <div className="text-3xl font-extrabold tabular-nums">{percentage}%</div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 sm:gap-5 text-center">
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 tabular-nums">
              {correctCount} / {total}
            </div>
            <div className="text-xs font-bold text-emerald-800 mt-1">{t.correctCountLabel}</div>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
            <div className="text-2xl sm:text-3xl font-extrabold text-rose-700 tabular-nums">{wrongCount}</div>
            <div className="text-xs font-bold text-rose-800 mt-1">{t.wrongCountLabel}</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200">
            <div className="text-2xl sm:text-3xl font-extrabold text-qiyas-navy font-mono tabular-nums">
              {formatTime(elapsedSeconds)}
            </div>
            <div className="text-xs font-bold text-slate-600 mt-1">{t.timeSpentLabel}</div>
          </div>
        </div>

        {/* Adaptive Follow-Up Callout when mistakes occurred */}
        {wrongCount > 0 && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 space-y-1">
            <div className="text-xs sm:text-sm font-extrabold">{t.adaptiveNextTestTitle}</div>
            <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
              {t.adaptiveNextTestDesc(wrongCount)}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          {wrongCount > 0 ? (
            <button
              type="button"
              onClick={() => {
                playUiTone('click');
                onStartAdaptiveRetry();
              }}
              className="flex-1 py-3.5 px-5 rounded-xl bg-qiyas-teal hover:bg-qiyas-tealHover text-white font-bold text-sm shadow transition cursor-pointer"
            >
              {t.adaptiveRetryBtn}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                playUiTone('click');
                onRetryPart(selectedPartId || 1, selectedSubPart);
              }}
              className="flex-1 py-3.5 px-5 rounded-xl bg-qiyas-teal hover:bg-qiyas-tealHover text-white font-bold text-sm shadow transition cursor-pointer"
            >
              {t.retryNewRandomBtn}
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              playUiTone('click');
              onOpenProgress();
            }}
            className="flex-1 py-3.5 px-5 rounded-xl bg-qiyas-navy hover:bg-qiyas-navyLight text-white font-bold text-sm transition cursor-pointer"
          >
            {t.progressDashboardBtn}
          </button>
          <button
            type="button"
            onClick={() => {
              playUiTone('click');
              onBackToPhysics();
            }}
            className="flex-1 py-3.5 px-5 rounded-xl border-2 border-slate-300 hover:bg-slate-100 text-slate-800 font-bold text-sm transition cursor-pointer"
          >
            {t.backToPartsBtn}
          </button>
        </div>
      </div>

      {/* Detailed Question-by-Question Review */}
      <div className="space-y-4">
        <h3 className="text-lg sm:text-xl font-extrabold text-white px-1">{t.detailedReviewTitle}</h3>

        {questions.map((q, idx) => {
          const userAns = answers[idx];
          const isCorrect = userAns === q.correct;
          const opts = isAr ? q.optionsAr : q.optionsEn;

          return (
            <div
              key={q.id}
              className={`bg-white rounded-2xl p-5 sm:p-6 shadow-xs border-2 ${
                isCorrect ? 'border-emerald-200' : 'border-rose-200'
              } space-y-4`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span
                    className={`w-8 h-8 rounded-lg font-extrabold text-sm flex items-center justify-center shrink-0 tabular-nums ${
                      isCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <div className="space-y-1.5">
                    {(q.isRephrased || q.isNewUnseen) && (
                      <span
                        className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded-md border ${
                          q.isRephrased
                            ? 'text-amber-800 bg-amber-50 border-amber-200'
                            : 'text-emerald-800 bg-emerald-50 border-emerald-200'
                        }`}
                      >
                        {q.isRephrased ? t.rephrasedMarker : t.newQuestionMarker}
                      </span>
                    )}
                    <p
                      className="font-bold text-slate-900 text-base sm:text-lg leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: isAr ? q.qAr : q.qEn }}
                    />
                  </div>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-lg text-xs font-extrabold shrink-0 ${
                    isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {isCorrect ? '✓' : '✕'}
                </span>
              </div>

              <QuestionFigure questionId={q.figureId ?? q.id} lang={lang} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div
                  className={`p-3.5 rounded-xl border ${
                    isCorrect
                      ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                      : 'bg-rose-50/70 border-rose-200 text-rose-900'
                  }`}
                >
                  <span className="block text-xs font-bold opacity-75 mb-1">{t.yourAnswerLabel}</span>
                  <span
                    className="font-bold"
                    dangerouslySetInnerHTML={{
                      __html:
                        userAns !== undefined ? `${letters[userAns]}) ${opts[userAns]}` : t.notAnsweredLabel,
                    }}
                  />
                </div>

                <div className="p-3.5 rounded-xl bg-teal-50/80 border border-teal-200 text-teal-950">
                  <span className="block text-xs font-bold text-qiyas-teal mb-1">{t.correctAnswerLabel}</span>
                  <span
                    className="font-bold"
                    dangerouslySetInnerHTML={{ __html: `${letters[q.correct]}) ${opts[q.correct]}` }}
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <strong className="text-qiyas-navy">{t.explanationLabel}</strong>{' '}
                <span>{isAr ? q.expAr : q.expEn}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
