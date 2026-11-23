import React from 'react';
import { UI_TEXT } from '../data/physicsData';
import type { Language } from '../types';

interface HomeViewProps {
  lang: Language;
  studentName: string;
  onChangeStudentName: (name: string) => void;
  onEnterPhysics: () => void;
  onChemistryClick: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  lang,
  studentName,
  onChangeStudentName,
  onEnterPhysics,
  onChemistryClick,
}) => {
  const t = UI_TEXT[lang];
  const isAr = lang === 'ar';

  return (
    <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 space-y-8 animate-view-enter">
      {/* Hero Card */}
      <div className="bg-gradient-to-br from-white via-white to-teal-50/50 rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200/90 relative overflow-hidden">
        <div
          className={`absolute top-0 ${isAr ? 'left-0 -translate-x-1/4' : 'right-0 translate-x-1/4'} w-64 h-64 bg-qiyas-teal/10 rounded-full blur-2xl -translate-y-1/2 pointer-events-none`}
        />
        <div
          className={`absolute bottom-0 ${isAr ? 'right-10' : 'left-10'} w-40 h-40 bg-amber-400/10 rounded-full blur-2xl translate-y-1/2 pointer-events-none`}
        />

        <div className="max-w-3xl space-y-4 relative z-10">
          <p className="text-xs font-bold text-qiyas-teal tracking-wide">{t.heroBadge}</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-qiyas-navy leading-snug text-balance">
            {t.heroTitle}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{t.heroDesc}</p>

          {/* Student Name Input */}
          <div className="pt-2 max-w-md">
            <label htmlFor="student-name-input" className="block text-xs font-bold text-slate-700 mb-1.5">
              {t.studentNameLabel}
            </label>
            <input
              id="student-name-input"
              type="text"
              value={studentName}
              onChange={(e) => onChangeStudentName(e.target.value)}
              placeholder={t.studentNamePlaceholder}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-qiyas-teal focus:ring-4 focus:ring-teal-500/15 outline-none text-sm font-medium bg-white shadow-2xs transition"
            />
          </div>
        </div>

        {/* Interactive Feature Highlights Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-7 pt-6 border-t border-slate-200/70 relative z-10">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/80 border border-slate-200/80">
            <div className="w-9 h-9 rounded-xl bg-teal-100 text-qiyas-teal flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <div>
              <div className="text-xs font-extrabold text-qiyas-navy">{t.feature1Title}</div>
              <div className="text-[11px] text-slate-500">{t.feature1Sub}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/80 border border-slate-200/80">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="text-xs font-extrabold text-qiyas-navy">{t.feature2Title}</div>
              <div className="text-[11px] text-slate-500">{t.feature2Sub}</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/80 border border-slate-200/80">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="text-xs font-extrabold text-qiyas-navy">{t.feature3Title}</div>
              <div className="text-[11px] text-slate-500">{t.feature3Sub}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Subjects Grid: Physics vs Chemistry */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {/* Physics Card */}
        <button
          type="button"
          onClick={onEnterPhysics}
          className="subject-card text-start cursor-pointer bg-white rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl hover:shadow-teal-900/10 border-2 border-slate-200 hover:border-qiyas-teal group flex flex-col justify-between relative overflow-hidden"
        >
          <div
            className={`absolute -bottom-8 ${isAr ? '-left-8' : '-right-8'} w-36 h-36 bg-qiyas-teal/5 rounded-full group-hover:scale-125 transition-transform duration-500 pointer-events-none`}
          />

          <div className="space-y-4 relative z-10 w-full">
            <div className="flex items-center justify-between gap-2">
              <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-md group-hover:border-qiyas-teal transition-all animate-float-slow p-1.5 overflow-hidden">
                <img
                  src="/assets/aistudio/image_6ab863c0.png"
                  alt={t.physicsCardTitle}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xs font-bold text-emerald-700 whitespace-nowrap shrink-0">
                {t.physicsCardBadge}
              </span>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-qiyas-navy group-hover:text-qiyas-teal transition">
                {t.physicsCardTitle}
              </h3>
              <p className="text-sm font-medium text-slate-600 mt-2 leading-relaxed">{t.physicsCardSub}</p>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-qiyas-teal font-bold text-sm relative z-10 w-full">
            <span>{t.physicsStartBtn}</span>
            <span className="w-8 h-8 rounded-full bg-qiyas-tealLight group-hover:bg-qiyas-teal group-hover:text-white flex items-center justify-center transition">
              <svg
                className={`w-4 h-4 transform ${isAr ? 'rotate-180 group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'} transition`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2.4}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </div>
        </button>

        {/* Chemistry Card */}
        <button
          type="button"
          onClick={onChemistryClick}
          className="subject-card text-start cursor-pointer bg-white/90 rounded-3xl p-6 sm:p-8 shadow-sm border-2 border-dashed border-slate-300 hover:border-slate-400 flex flex-col justify-between opacity-95"
        >
          <div className="space-y-4 w-full">
            <div className="flex items-center justify-between gap-2">
              <div className="w-14 h-14 rounded-2xl bg-slate-200 text-slate-600 flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              </div>
              <span className="text-xs font-bold text-slate-500 whitespace-nowrap shrink-0">
                {t.chemCardBadge}
              </span>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-700">{t.chemCardTitle}</h3>
              <p className="text-sm font-medium text-slate-500 mt-2 leading-relaxed">{t.chemCardSub}</p>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-slate-500 font-semibold text-sm w-full">
            <span>{t.chemStartBtn}</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};
