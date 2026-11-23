import React, { useMemo, useState } from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { getPartKey, PHYSICS_PARTS, UI_TEXT } from '../data/physicsData';
import type { ChapterStat, Language } from '../types';
import { playUiTone } from '../utils/examUtils';

interface ProgressDashboardViewProps {
  lang: Language;
  chapterStats: Record<string, ChapterStat>;
  seenCount: number;
  missedCount: number;
  totalBankCount: number;
  onBackToPhysics: () => void;
  onSelectPart: (partId: number, subPart?: number) => void;
  onResetHistory: () => void;
}

interface UnitDescriptor {
  key: string;
  partId: number;
  subPart: number;
  shortEn: string;
  shortAr: string;
  fullEn: string;
  fullAr: string;
}

interface ChapterBarRow {
  name: string;
  fullName: string;
  bestPct: number;
  latestPct: number;
  attempts: number;
}

interface TimelineRow {
  step: number;
  name: string;
  pct: number;
  unitName: string;
  scoreDetail: string;
}

interface CustomTooltipPayloadItem {
  name?: string;
  value?: number;
  color?: string;
  payload?: ChapterBarRow & TimelineRow;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: CustomTooltipPayloadItem[];
  isTimeline?: boolean;
}

const ChartTooltip: React.FC<CustomTooltipProps> = ({ active, payload, isTimeline }) => {
  if (!active || !payload || payload.length === 0) return null;
  const first = payload[0]?.payload;
  if (!first) return null;

  return (
    <div className="bg-slate-900 text-white px-3.5 py-2.5 rounded-xl shadow-xl border border-slate-700 text-xs space-y-1">
      <div className="font-bold text-teal-300">
        {isTimeline ? `${first.name} · ${first.unitName}` : first.fullName}
      </div>
      {payload.map((entry, idx) => (
        <div key={idx} className="flex items-center justify-between gap-4 tabular-nums">
          <span className="text-slate-300">{entry.name}:</span>
          <span className="font-extrabold text-white">{entry.value}%</span>
        </div>
      ))}
      {isTimeline && first.scoreDetail && (
        <div className="text-[11px] text-slate-400 pt-0.5 tabular-nums">{first.scoreDetail}</div>
      )}
    </div>
  );
};

export const ProgressDashboardView: React.FC<ProgressDashboardViewProps> = ({
  lang,
  chapterStats,
  seenCount,
  missedCount,
  totalBankCount,
  onBackToPhysics,
  onSelectPart,
  onResetHistory,
}) => {
  const t = UI_TEXT[lang];
  const isAr = lang === 'ar';

  const [grouping, setGrouping] = useState<'chapter' | 'part'>('chapter');
  const [unitFilter, setUnitFilter] = useState<string>('all');

  const unitDescriptors = useMemo<UnitDescriptor[]>(() => {
    const units: UnitDescriptor[] = [];
    for (const part of PHYSICS_PARTS) {
      if (part.isComprehensive) {
        units.push({
          key: getPartKey(part.id, 1),
          partId: part.id,
          subPart: 1,
          shortEn: 'Comprehensive',
          shortAr: 'الشامل',
          fullEn: part.titleEn,
          fullAr: part.titleAr,
        });
      } else if (part.subParts && part.subParts.length > 0) {
        for (const sp of part.subParts) {
          units.push({
            key: getPartKey(part.id, sp.subPart),
            partId: part.id,
            subPart: sp.subPart,
            shortEn: `Ch. ${part.id} · Pt. ${sp.subPart}`,
            shortAr: `ف${part.id} · ج${sp.subPart}`,
            fullEn: `${part.titleEn} — ${sp.titleEn}`,
            fullAr: `${part.titleAr} — ${sp.titleAr}`,
          });
        }
      } else {
        units.push({
          key: getPartKey(part.id, 1),
          partId: part.id,
          subPart: 1,
          shortEn: `Chapter ${part.id}`,
          shortAr: `الفصل ${part.id}`,
          fullEn: part.titleEn,
          fullAr: part.titleAr,
        });
      }
    }
    return units;
  }, []);

  const totalAttempts = useMemo(
    () => Object.values(chapterStats).reduce((sum, s) => sum + (s?.attempts ?? 0), 0),
    [chapterStats],
  );

  const hasData = totalAttempts > 0;

  const { bestOverall, avgAccuracy } = useMemo(() => {
    const entries = Object.values(chapterStats).filter((s) => s && s.attempts > 0);
    if (entries.length === 0) return { bestOverall: 0, avgAccuracy: 0 };

    const best = Math.max(...entries.map((s) => s.bestPct));
    const allAttemptPcts: number[] = [];
    for (const s of entries) {
      if (s.history && s.history.length > 0) {
        for (const pt of s.history) allAttemptPcts.push(pt.pct);
      } else {
        allAttemptPcts.push(s.bestPct);
      }
    }
    const avg =
      allAttemptPcts.length > 0
        ? Math.round(allAttemptPcts.reduce((acc, v) => acc + v, 0) / allAttemptPcts.length)
        : 0;

    return { bestOverall: best, avgAccuracy: avg };
  }, [chapterStats]);

  // BarChart data derived directly from chapterStats
  const chapterBarData = useMemo<ChapterBarRow[]>(() => {
    if (grouping === 'part') {
      return unitDescriptors.map((u) => {
        const stat = chapterStats[u.key];
        const latest =
          stat?.lastPct ??
          (stat?.history && stat.history.length > 0
            ? stat.history[stat.history.length - 1].pct
            : stat?.bestPct ?? 0);
        return {
          name: isAr ? u.shortAr : u.shortEn,
          fullName: isAr ? u.fullAr : u.fullEn,
          bestPct: stat?.bestPct ?? 0,
          latestPct: latest,
          attempts: stat?.attempts ?? 0,
        };
      });
    }

    // Group by Chapter (Chapter 1, Chapter 2, Comprehensive Exam)
    return PHYSICS_PARTS.map((part) => {
      const matchingUnits = unitDescriptors.filter((u) => u.partId === part.id);
      const activeStats = matchingUnits
        .map((u) => chapterStats[u.key])
        .filter((s): s is ChapterStat => Boolean(s && s.attempts > 0));

      const attemptsSum = activeStats.reduce((sum, s) => sum + s.attempts, 0);
      const bestPct =
        activeStats.length > 0 ? Math.max(...activeStats.map((s) => s.bestPct)) : 0;

      // Collect latest attempt timestamp or average of latest part scores
      let latestPct = 0;
      const allHistoryPts = activeStats.flatMap((s) => s.history ?? []);
      if (allHistoryPts.length > 0) {
        allHistoryPts.sort((a, b) => a.timestamp - b.timestamp);
        latestPct = allHistoryPts[allHistoryPts.length - 1].pct;
      } else if (activeStats.length > 0) {
        latestPct = Math.round(
          activeStats.reduce((sum, s) => sum + (s.lastPct ?? s.bestPct), 0) / activeStats.length,
        );
      }

      const shortName = part.isComprehensive
        ? isAr
          ? 'الشامل'
          : 'Comprehensive'
        : isAr
          ? `الفصل ${part.id}`
          : `Chapter ${part.id}`;

      return {
        name: shortName,
        fullName: isAr ? part.titleAr : part.titleEn,
        bestPct,
        latestPct,
        attempts: attemptsSum,
      };
    });
  }, [chapterStats, grouping, isAr, unitDescriptors]);

  // AreaChart chronological timeline derived from chapterStats
  const timelineData = useMemo<TimelineRow[]>(() => {
    const rawPoints: Array<{
      timestamp: number;
      pct: number;
      unitName: string;
      scoreDetail: string;
    }> = [];

    const filteredUnits =
      unitFilter === 'all'
        ? unitDescriptors
        : unitDescriptors.filter((u) => u.key === unitFilter);

    filteredUnits.forEach((u, unitIdx) => {
      const stat = chapterStats[u.key];
      if (!stat || stat.attempts <= 0) return;
      const unitLabel = isAr ? u.shortAr : u.shortEn;

      if (stat.history && stat.history.length > 0) {
        stat.history.forEach((pt) => {
          rawPoints.push({
            timestamp: pt.timestamp,
            pct: pt.pct,
            unitName: unitLabel,
            scoreDetail: `${pt.correctCount} / ${pt.totalCount}`,
          });
        });
      } else {
        // Fallback for legacy stats recorded before history tracking
        rawPoints.push({
          timestamp: unitIdx + 1,
          pct: stat.bestPct,
          unitName: unitLabel,
          scoreDetail: `${stat.bestPct}%`,
        });
      }
    });

    rawPoints.sort((a, b) => a.timestamp - b.timestamp);

    return rawPoints.map((pt, idx) => ({
      step: idx + 1,
      name: t.attemptLabel(idx + 1),
      pct: pt.pct,
      unitName: pt.unitName,
      scoreDetail: pt.scoreDetail,
    }));
  }, [chapterStats, isAr, t, unitDescriptors, unitFilter]);

  const improvementDelta =
    timelineData.length >= 2
      ? timelineData[timelineData.length - 1].pct - timelineData[0].pct
      : null;

  return (
    <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-6 animate-view-enter">
      {/* Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-md">
        <div>
          <button
            type="button"
            onClick={onBackToPhysics}
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
            {t.backToPartsBtn}
          </button>
          <div className="flex items-center gap-2.5">
            <BarChart3 className="w-6 h-6 text-qiyas-teal shrink-0" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-qiyas-navy">
              {t.progressDashboardTitle}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">{t.progressDashboardDesc}</p>
          {seenCount > 0 && (
            <p className="text-xs font-bold text-qiyas-teal mt-2 tabular-nums">
              {t.exploredProgressLabel(seenCount, totalBankCount, missedCount)}
            </p>
          )}
        </div>

        {(hasData || seenCount > 0) && (
          <button
            type="button"
            onClick={onResetHistory}
            className="self-start sm:self-center text-xs font-bold text-slate-600 hover:text-rose-700 border border-slate-200 hover:border-rose-200 px-3.5 py-2 rounded-xl transition cursor-pointer whitespace-nowrap shrink-0"
          >
            {t.resetHistoryBtn}
          </button>
        )}
      </div>

      {!hasData ? (
        /* Empty State */
        <div className="bg-white rounded-3xl p-8 sm:p-12 text-center shadow-md border border-slate-200 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-teal-50 text-qiyas-teal mx-auto flex items-center justify-center border border-teal-200">
            <TrendingUp className="w-8 h-8" />
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-qiyas-navy">
            {t.progressEmptyTitle}
          </h3>
          <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            {t.progressEmptyDesc}
          </p>
          <button
            type="button"
            onClick={() => {
              playUiTone('click');
              onBackToPhysics();
            }}
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-qiyas-teal hover:bg-qiyas-tealHover text-white font-bold text-sm shadow transition cursor-pointer"
          >
            {t.progressStartQuizBtn}
          </button>
        </div>
      ) : (
        <>
          {/* KPI Summary Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-5 shadow-md border border-slate-200">
              <div className="text-xs font-bold text-slate-500">{t.totalAttemptsLabel}</div>
              <div className="text-3xl font-extrabold text-qiyas-navy mt-1 tabular-nums">
                {totalAttempts}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-md border border-slate-200">
              <div className="text-xs font-bold text-slate-500">{t.bestOverallLabel}</div>
              <div className="text-3xl font-extrabold text-emerald-600 mt-1 tabular-nums">
                {bestOverall}%
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-md border border-slate-200">
              <div className="text-xs font-bold text-slate-500">{t.avgAccuracyLabel}</div>
              <div className="text-3xl font-extrabold text-qiyas-teal mt-1 tabular-nums">
                {avgAccuracy}%
              </div>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart 1: Correct Answers (%) Per Chapter */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-md border border-slate-200 flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg text-qiyas-navy">
                    {t.chartChapterAccuracyTitle}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{t.chartChapterAccuracySub}</p>
                </div>

                <div className="inline-flex items-center rounded-xl border border-slate-200 bg-slate-50 p-0.5 text-xs font-bold self-start">
                  <button
                    type="button"
                    onClick={() => {
                      playUiTone('click');
                      setGrouping('chapter');
                    }}
                    className={`px-3 py-1.5 rounded-lg cursor-pointer transition ${
                      grouping === 'chapter'
                        ? 'bg-white shadow-2xs text-qiyas-navy'
                        : 'text-slate-500'
                    }`}
                  >
                    {t.groupByChapterLabel}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playUiTone('click');
                      setGrouping('part');
                    }}
                    className={`px-3 py-1.5 rounded-lg cursor-pointer transition ${
                      grouping === 'part'
                        ? 'bg-white shadow-2xs text-qiyas-navy'
                        : 'text-slate-500'
                    }`}
                  >
                    {t.groupByPartLabel}
                  </button>
                </div>
              </div>

              <div className="w-full h-72" dir="ltr">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chapterBarData}
                    margin={{ top: 12, right: 12, left: -12, bottom: 8 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: '#334155', fontSize: 11, fontWeight: 600 }}
                      axisLine={{ stroke: '#CBD5E1' }}
                    />
                    <YAxis
                      domain={[0, 100]}
                      unit="%"
                      tick={{ fill: '#475569', fontSize: 11 }}
                      axisLine={{ stroke: '#CBD5E1' }}
                    />
                    <Tooltip content={<ChartTooltip />} />
                    <Legend wrapperStyle={{ fontSize: '12px', fontWeight: 600 }} />
                    <Bar
                      dataKey="bestPct"
                      name={t.bestPctLegend}
                      fill="#0D9488"
                      radius={[6, 6, 0, 0]}
                      maxBarSize={42}
                    />
                    <Bar
                      dataKey="latestPct"
                      name={t.latestPctLegend}
                      fill="#0B2545"
                      radius={[6, 6, 0, 0]}
                      maxBarSize={42}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Improvement Over Time */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-md border border-slate-200 flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-extrabold text-base sm:text-lg text-qiyas-navy">
                      {t.chartImprovementTitle}
                    </h3>
                    {improvementDelta !== null && (
                      <span
                        className={`text-xs font-extrabold px-2 py-0.5 rounded-md tabular-nums ${
                          improvementDelta >= 0
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {t.improvementDeltaLabel(improvementDelta)}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{t.chartImprovementSub}</p>
                </div>

                <select
                  value={unitFilter}
                  onChange={(e) => {
                    playUiTone('click');
                    setUnitFilter(e.target.value);
                  }}
                  aria-label={t.allUnitsFilter}
                  className="text-xs font-bold text-qiyas-navy bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 outline-none focus:border-qiyas-teal cursor-pointer self-start"
                >
                  <option value="all">{t.allUnitsFilter}</option>
                  {unitDescriptors.map((u) => (
                    <option key={u.key} value={u.key}>
                      {isAr ? u.shortAr : u.shortEn}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full h-72" dir="ltr">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={timelineData}
                    margin={{ top: 12, right: 16, left: -12, bottom: 8 }}
                  >
                    <defs>
                      <linearGradient id="scoreAreaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0D9488" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#0D9488" stopOpacity={0.03} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: '#334155', fontSize: 11, fontWeight: 600 }}
                      axisLine={{ stroke: '#CBD5E1' }}
                    />
                    <YAxis
                      domain={[0, 100]}
                      unit="%"
                      tick={{ fill: '#475569', fontSize: 11 }}
                      axisLine={{ stroke: '#CBD5E1' }}
                    />
                    <ReferenceLine y={80} stroke="#10B981" strokeDasharray="4 4" />
                    <Tooltip content={<ChartTooltip isTimeline />} />
                    <Area
                      type="monotone"
                      dataKey="pct"
                      name={t.scoreLabel}
                      stroke="#0D9488"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#scoreAreaGradient)"
                      dot={{ r: 4, fill: '#0B2545', stroke: '#FFFFFF', strokeWidth: 2 }}
                      activeDot={{ r: 6, fill: '#0D9488', stroke: '#FFFFFF', strokeWidth: 2 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Unit-by-Unit Progress Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {unitDescriptors.map((u) => {
              const stat = chapterStats[u.key];
              const best = stat?.bestPct ?? 0;
              const attempts = stat?.attempts ?? 0;

              return (
                <div
                  key={u.key}
                  className="bg-white rounded-2xl p-5 shadow-md border border-slate-200 flex flex-col justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[11px] font-bold text-qiyas-teal">
                          {isAr ? u.shortAr : u.shortEn}
                        </span>
                        <h4 className="font-bold text-slate-900 text-sm leading-snug mt-0.5">
                          {isAr ? u.fullAr : u.fullEn}
                        </h4>
                      </div>
                      <span className="text-sm font-extrabold text-qiyas-navy tabular-nums shrink-0">
                        {attempts > 0 ? `${best}%` : '—'}
                      </span>
                    </div>

                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full bg-qiyas-teal transition-all duration-300"
                        style={{ width: `${Math.min(100, Math.max(0, best))}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <span className="font-semibold text-slate-500 tabular-nums">
                      {t.attemptsCountLabel(attempts)}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        playUiTone('click');
                        onSelectPart(u.partId, u.subPart);
                      }}
                      className="font-bold text-qiyas-teal hover:underline cursor-pointer"
                    >
                      {t.practiceUnitBtn}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
