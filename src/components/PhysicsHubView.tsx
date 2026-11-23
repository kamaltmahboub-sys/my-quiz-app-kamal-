import React from 'react';
import { getPartKey, PHYSICS_PARTS, UI_TEXT } from '../data/physicsData';
import type { ChapterStat, Language } from '../types';

interface PhysicsHubViewProps {
  lang: Language;
  isUnlocked: boolean;
  freeQuizUsed: boolean;
  chapterStats: Record<string, ChapterStat>;
  seenCount: number;
  missedCount: number;
  totalBankCount: number;
  onResetHistory: () => void;
  onOpenProgress: () => void;
  onBackHome: () => void;
  onSelectPart: (partId: number, subPart?: number) => void;
}

export const PhysicsHubView: React.FC<PhysicsHubViewProps> = ({
  lang,
  isUnlocked,
  freeQuizUsed,
  chapterStats,
  seenCount,
  missedCount,
  totalBankCount,
  onResetHistory,
  onOpenProgress,
  onBackHome,
  onSelectPart,
}) => {
  const t = UI_TEXT[lang];
  const isAr = lang === 'ar';

  const chapterParts = PHYSICS_PARTS.filter((p) => !p.isComprehensive);
  const comprehensivePart = PHYSICS_PARTS.find((p) => p.isComprehensive);
  const compStat = comprehensivePart ? chapterStats[getPartKey(comprehensivePart.id, 1)] : undefined;

  const accessText = isUnlocked ? t.unlockedPill : !freeQuizUsed ? t.freePill : t.lockedPill;
  const accessColorClass = isUnlocked
    ? 'text-emerald-700'
    : !freeQuizUsed
      ? 'text-qiyas-teal'
      : 'text-amber-800';

  return (
    <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-6 animate-view-enter">
      {/* Breadcrumb & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-md">
        <div>
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-qiyas-teal hover:underline mb-2 cursor-pointer"
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
            {t.backToSubjects}
          </button>
          <h2 className="text-xl sm:text-2xl font-extrabold text-qiyas-navy">{t.physicsHubTitle}</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">{t.physicsHubDesc}</p>
          {seenCount > 0 && (
            <p className="text-xs font-bold text-qiyas-teal mt-2 tabular-nums">
              {t.exploredProgressLabel(seenCount, totalBankCount, missedCount)}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-center shrink-0">
          <button
            type="button"
            onClick={onOpenProgress}
            className="text-xs font-bold text-qiyas-navy bg-teal-50 hover:bg-teal-100 border border-teal-200 px-3.5 py-1.5 rounded-lg transition cursor-pointer whitespace-nowrap"
          >
            {t.progressDashboardBtn}
          </button>
          {seenCount > 0 && (
            <button
              type="button"
              onClick={onResetHistory}
              className="text-xs font-bold text-slate-600 hover:text-rose-700 border border-slate-200 hover:border-rose-200 px-3 py-1.5 rounded-lg transition cursor-pointer whitespace-nowrap"
            >
              {t.resetHistoryBtn}
            </button>
          )}
          <span className={`text-xs font-bold whitespace-nowrap ${accessColorClass}`}>{accessText}</span>
        </div>
      </div>

      {/* Section 1: Chapters 1–10 with Lesson-Based Parts */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs sm:text-sm font-extrabold tracking-wider text-emerald-200">
            {t.curriculumLabel}
          </h3>
        </div>

        <div className="space-y-4">
          {chapterParts.map((part) => {
            const hasSubParts = Boolean(part.subParts && part.subParts.length > 0);
            const chStat = chapterStats[getPartKey(part.id, 1)];

            return (
              <div
                key={part.id}
                className="bg-white rounded-2xl p-5 sm:p-6 shadow-md border border-slate-200 flex flex-col gap-4"
              >
                {/* Chapter Header */}
                <div className="flex items-start gap-3.5 w-full">
                  <div className="w-11 h-11 rounded-xl bg-qiyas-tealLight text-qiyas-teal font-extrabold text-base flex items-center justify-center shrink-0 tabular-nums">
                    {String(part.id).padStart(2, '0')}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-1.5">
                      <h3 className="font-bold text-slate-900 text-base sm:text-lg leading-snug">
                        {isAr ? part.titleAr : part.titleEn}
                      </h3>
                      <span className="text-[11px] font-semibold text-slate-400 whitespace-nowrap tabular-nums">
                        {t.chapterOfLabel(part.id)}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {isAr ? part.subAr : part.subEn}
                    </p>
                  </div>
                </div>

                {/* Either Direct Chapter Practice (Chapter 1 - No Sub-Parts) OR Sub-Parts Grid (Chapter 2) */}
                {!hasSubParts ? (
                  <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-3 text-xs">
                        <span className="font-bold text-qiyas-navy">{t.noPartsLabel}</span>
                        {chStat && (
                          <span className="text-[11px] font-bold text-emerald-700 tabular-nums">
                            · ✓ {t.bestScoreLabel} {chStat.bestPct}%
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] font-semibold text-slate-500">{t.lessonsIncludedLabel}</p>
                      <ul className="space-y-1 text-xs text-slate-600">
                        {(part.lessons ?? []).map((lesson) => (
                          <li key={lesson.number} className="flex items-start gap-2">
                            <span className="text-qiyas-teal font-bold tabular-nums">{lesson.number}.</span>
                            <span>{isAr ? lesson.titleAr : lesson.titleEn}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectPart(part.id, 1)}
                      className="sm:w-auto w-full py-2.5 px-6 rounded-xl bg-qiyas-teal hover:bg-qiyas-tealHover text-white font-bold text-xs sm:text-sm transition flex items-center justify-center gap-1.5 cursor-pointer shrink-0 whitespace-nowrap"
                    >
                      <span>{t.practiceBtn}</span>
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
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-3 border-t border-slate-100">
                    {part.subParts!.map((sp) => {
                      const spStat = chapterStats[getPartKey(part.id, sp.subPart)];
                      return (
                        <button
                          key={sp.subPart}
                          type="button"
                          onClick={() => onSelectPart(part.id, sp.subPart)}
                          className="w-full text-start p-4 rounded-xl border border-slate-200 hover:border-qiyas-teal hover:bg-teal-50/40 transition cursor-pointer flex flex-col justify-between gap-3 group"
                        >
                          <div className="space-y-2 w-full">
                            <div className="flex items-start justify-between gap-2 w-full">
                              <div className="min-w-0">
                                <span className="text-[11px] font-semibold text-slate-400 tabular-nums">
                                  {t.partBadgeLabel(sp.subPart, part.subParts!.length)}
                                </span>
                                <h4 className="font-extrabold text-qiyas-navy group-hover:text-qiyas-teal text-xs sm:text-sm leading-snug mt-0.5 transition">
                                  {isAr ? sp.titleAr : sp.titleEn}
                                </h4>
                              </div>

                              {spStat && (
                                <span className="text-[11px] font-bold text-emerald-700 tabular-nums shrink-0">
                                  ✓ {spStat.bestPct}%
                                </span>
                              )}
                            </div>

                            <div className="space-y-0.5 pt-2 border-t border-slate-100">
                              <p className="text-[11px] font-semibold text-slate-400">{t.lessonsIncludedLabel}</p>
                              <ul className="space-y-0.5 text-xs text-slate-600">
                                {sp.lessons.map((lesson) => (
                                  <li key={lesson.number} className="flex items-start gap-1.5">
                                    <span className="text-qiyas-teal font-bold tabular-nums">{lesson.number}.</span>
                                    <span>{isAr ? lesson.titleAr : lesson.titleEn}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <div className="flex items-center justify-end text-xs font-bold text-qiyas-teal gap-1 whitespace-nowrap">
                            <span>{t.practiceBtn}</span>
                            <svg
                              className={`w-3.5 h-3.5 transform ${isAr ? 'rotate-180' : ''}`}
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2.2}
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 2: Comprehensive Final Exam */}
      {comprehensivePart && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs sm:text-sm font-extrabold tracking-wider text-amber-300">
              {t.comprehensiveSectionLabel}
            </h3>
          </div>

          <button
            type="button"
            onClick={() => onSelectPart(comprehensivePart.id, 1)}
            className="subject-card w-full text-start cursor-pointer bg-gradient-to-r from-qiyas-navy via-qiyas-navyLight to-qiyas-navy text-white rounded-2xl p-6 shadow-lg hover:shadow-xl border border-slate-700 group flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-qiyas-navy font-extrabold text-lg flex items-center justify-center shrink-0 shadow group-hover:scale-105 transition tabular-nums">
                {String(comprehensivePart.id).padStart(2, '0')}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="inline-block text-xs font-bold text-amber-300">{t.comprehensiveTopTag}</span>
                  {compStat && (
                    <span className="text-[11px] font-bold text-emerald-300 tabular-nums">
                      · ✓ {t.bestScoreLabel} {compStat.bestPct}%
                    </span>
                  )}
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold leading-snug">
                  {isAr ? comprehensivePart.titleAr : comprehensivePart.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  {isAr ? comprehensivePart.subAr : comprehensivePart.subEn}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-white/10">
              <span className="text-xs font-bold text-teal-200 whitespace-nowrap">
                {t.comprehensiveBadgeLabel}
              </span>
              <span className="px-4 py-2.5 rounded-xl bg-qiyas-teal group-hover:bg-teal-500 text-white font-bold text-sm transition flex items-center gap-1.5 shadow whitespace-nowrap shrink-0">
                {t.comprehensiveBtn}
              </span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};
