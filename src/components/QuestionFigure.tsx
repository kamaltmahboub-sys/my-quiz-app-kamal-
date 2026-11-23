import React from 'react';
import type { Language } from '../types';

interface QuestionFigureProps {
  questionId: string;
  lang: Language;
}

const FIGURE_IDS = new Set([
  'q30',
  'q31',
  'q34',
  'q35',
  'q36',
  'q37',
  'q38',
  'q39',
  'q40',
  'q41',
  'q42',
  'q54',
  'q55',
  'q56',
  'q58',
  'q59',
  'q64',
  'q71',
  'q90',
  'q95',
  'q97',
  'q101',
  'q102',
  'q103',
  'q106',
  'q112',
  'q113',
  'q114',
  'q123',
  'q129',
  'q148',
  'q149',
  'q150',
  'q151',
  'q155',
  'q159',
  'q167',
  'q172',
  'q176',
  'q193',
  'q195',
  'q196',
  'q201',
  'q221',
  'q223',
  'q228',
  'q245',
  'q255',
  'q267',
  'q281',
  'q283',
  'q329',
  'q332',
  'q336',
  'q341',
  'q349',
  'q357',
  'q369',
  'q374',
  'q377',
  'q379',
  'q391',
  'q400',
]);

export function hasQuestionFigure(questionId: string): boolean {
  return FIGURE_IDS.has(questionId);
}

export const QuestionFigure: React.FC<QuestionFigureProps> = ({ questionId, lang }) => {
  if (!FIGURE_IDS.has(questionId)) return null;

  const isAr = lang === 'ar';

  const renderSvg = () => {
    switch (questionId) {
      case 'q30':
        return (
          <svg viewBox="0 0 320 220" className="w-full max-w-[320px] h-auto">
            <defs>
              <pattern id="grid30" width="35" height="25" patternUnits="userSpaceOnUse">
                <path d="M 35 0 L 0 0 0 25" fill="none" stroke="#e2e8f0" strokeWidth="1" />
              </pattern>
            </defs>
            <rect x="60" y="20" width="210" height="150" fill="url(#grid30)" />
            <line x1="60" y1="20" x2="60" y2="170" stroke="#334155" strokeWidth="1.8" />
            <line x1="60" y1="170" x2="275" y2="170" stroke="#334155" strokeWidth="1.8" />
            {[0, 2.5, 5, 7.5, 10, 12.5, 15].map((val, i) => (
              <text key={val} x="54" y={174 - i * 25} textAnchor="end" fontSize="9" fill="#475569">
                {val.toFixed(1)}
              </text>
            ))}
            {[0, 1, 2, 3, 4, 5, 6].map((val, i) => (
              <text key={val} x={60 + i * 35} y="184" textAnchor="middle" fontSize="9" fill="#475569">
                {val}
              </text>
            ))}
            <text x="18" y="95" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e293b" transform="rotate(-90 18 95)">
              Distance (m)
            </text>
            <text x="165" y="204" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e293b">
              Time (s)
            </text>
            <line x1="60" y1="170" x2="235" y2="45" stroke="#2563eb" strokeWidth="2.4" />
            <circle cx="60" cy="170" r="3.5" fill="#dc2626" />
            <circle cx="235" cy="45" r="4" fill="#dc2626" />
            <text x="200" y="37" fontSize="10" fontWeight="700" fill="#1d4ed8">
              (5 s, 12.5 m)
            </text>
          </svg>
        );

      case 'q31':
        return (
          <svg viewBox="0 0 460 120" className="w-full max-w-[460px] h-auto">
            {['A', 'B', 'C', 'D'].map((label, idx) => {
              const ox = 25 + idx * 110;
              return (
                <g key={label}>
                  <text x={ox + 42} y="14" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f172a">
                    {label}
                  </text>
                  <line x1={ox} y1="22" x2={ox} y2="94" stroke="#334155" strokeWidth="1.5" />
                  <line x1={ox} y1="94" x2={ox + 84} y2="94" stroke="#334155" strokeWidth="1.5" />
                  <text x={ox - 6} y="60" textAnchor="end" fontSize="9" fill="#475569">
                    y
                  </text>
                  <text x={ox + 42} y="108" textAnchor="middle" fontSize="9" fill="#475569">
                    x
                  </text>
                </g>
              );
            })}
            <line x1="25" y1="94" x2="102" y2="28" stroke="#2563eb" strokeWidth="2.2" />
            <path d="M 135 94 Q 185 88 214 28" fill="none" stroke="#dc2626" strokeWidth="2.2" />
            <path d="M 250 26 Q 254 88 324 91" fill="none" stroke="#059669" strokeWidth="2.2" />
            <line x1="355" y1="58" x2="434" y2="58" stroke="#b45309" strokeWidth="2.2" />
          </svg>
        );

      case 'q34':
        return (
          <svg viewBox="0 0 340 120" className="w-full max-w-[340px] h-auto">
            <text x="30" y="20" fontSize="11" fontWeight="700" fill="#334155">
              Person 1
            </text>
            <line x1="36" y1="34" x2="294" y2="34" stroke="#0f172a" strokeWidth="2" />
            <circle cx="36" cy="34" r="5" fill="#2563eb" />
            <circle cx="294" cy="34" r="5" fill="#dc2626" />
            <text x="36" y="50" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1d4ed8">
              A
            </text>
            <text x="294" y="50" textAnchor="middle" fontSize="11" fontWeight="700" fill="#b91c1c">
              B
            </text>

            <text x="30" y="72" fontSize="11" fontWeight="700" fill="#334155">
              Person 2
            </text>
            <polyline points="36,86 78,86 105,104 134,80 165,98 202,86 294,86" fill="none" stroke="#0f172a" strokeWidth="2" />
            <circle cx="36" cy="86" r="5" fill="#2563eb" />
            <circle cx="294" cy="86" r="5" fill="#dc2626" />
            <text x="36" y="104" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1d4ed8">
              A
            </text>
            <text x="294" y="104" textAnchor="middle" fontSize="11" fontWeight="700" fill="#b91c1c">
              B
            </text>
          </svg>
        );

      case 'q35':
        return (
          <svg viewBox="0 0 300 120" className="w-full max-w-[300px] h-auto">
            <defs>
              <marker id="arr35" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a" />
              </marker>
            </defs>
            <line x1="65" y1="30" x2="250" y2="30" stroke="#0f172a" strokeWidth="2.2" markerEnd="url(#arr35)" markerStart="url(#arr35)" />
            <text x="155" y="21" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f172a">
              9 m
            </text>
            <line x1="65" y1="34" x2="65" y2="92" stroke="#0f172a" strokeWidth="2.2" markerEnd="url(#arr35)" />
            <text x="80" y="66" fontSize="11" fontWeight="700" fill="#0f172a">
              2 m
            </text>
            <circle cx="65" cy="30" r="5" fill="#2563eb" />
            <text x="48" y="34" textAnchor="end" fontSize="11" fontWeight="700" fill="#1d4ed8">
              Start
            </text>
            <circle cx="65" cy="96" r="5" fill="#dc2626" />
            <text x="48" y="100" textAnchor="end" fontSize="11" fontWeight="700" fill="#b91c1c">
              End
            </text>
          </svg>
        );

      case 'q36':
        return (
          <svg viewBox="0 0 320 220" className="w-full max-w-[320px] h-auto">
            <defs>
              <pattern id="grid36" width="38" height="20" patternUnits="userSpaceOnUse">
                <path d="M 38 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="1" />
              </pattern>
            </defs>
            <rect x="60" y="20" width="190" height="140" fill="url(#grid36)" />
            <line x1="60" y1="20" x2="60" y2="160" stroke="#334155" strokeWidth="1.8" />
            <line x1="60" y1="160" x2="255" y2="160" stroke="#334155" strokeWidth="1.8" />
            {[0, 10, 20, 30, 40, 50, 60, 70].map((v, i) => (
              <text key={v} x="54" y={164 - i * 20} textAnchor="end" fontSize="9" fill="#475569">
                {v}
              </text>
            ))}
            {[0, 1, 2, 3, 4, 5].map((v, i) => (
              <text key={v} x={60 + i * 38} y="174" textAnchor="middle" fontSize="9" fill="#475569">
                {v}
              </text>
            ))}
            <text x="18" y="90" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e293b" transform="rotate(-90 18 90)">
              Position (m)
            </text>
            <text x="155" y="195" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e293b">
              Time (s)
            </text>
            <line x1="60" y1="160" x2="230" y2="27" stroke="#2563eb" strokeWidth="2.4" />
            <line x1="60" y1="160" x2="230" y2="71" stroke="#dc2626" strokeWidth="2.4" />
            <line x1="212" y1="40" x2="212" y2="80" stroke="#0f172a" strokeWidth="1.8" strokeDasharray="4 3" />
            <circle cx="212" cy="40" r="3.5" fill="#0f172a" />
            <circle cx="212" cy="80" r="3.5" fill="#0f172a" />
          </svg>
        );

      case 'q37':
        return (
          <svg viewBox="0 0 340 225" className="w-full max-w-[340px] h-auto">
            <defs>
              <pattern id="grid37" width="22" height="15" patternUnits="userSpaceOnUse">
                <path d="M 22 0 L 0 0 0 15" fill="none" stroke="#e2e8f0" strokeWidth="1" />
              </pattern>
            </defs>
            <rect x="60" y="20" width="220" height="150" fill="url(#grid37)" />
            <line x1="60" y1="20" x2="60" y2="170" stroke="#334155" strokeWidth="1.8" />
            <line x1="60" y1="170" x2="285" y2="170" stroke="#334155" strokeWidth="1.8" />
            {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((v, i) => (
              <text key={v} x="54" y={173 - i * 15} textAnchor="end" fontSize="8" fill="#475569">
                {v}
              </text>
            ))}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((v, i) => (
              <text key={v} x={60 + i * 22} y="183" textAnchor="middle" fontSize="8" fill="#475569">
                {v}
              </text>
            ))}
            <text x="18" y="95" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e293b" transform="rotate(-90 18 95)">
              Position (m)
            </text>
            <text x="170" y="203" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e293b">
              Time (s)
            </text>
            {/* Saeed: (0,40)->(2,60)->(5,90)->(6,100) */}
            <line x1="60" y1="110" x2="192" y2="20" stroke="#2563eb" strokeWidth="2.4" />
            <text x="115" y="55" fontSize="10" fontWeight="700" fill="#1d4ed8" transform="rotate(-34 115 55)">
              Saeed
            </text>
            {/* Ahmad: (0,0)->(10,40) */}
            <line x1="60" y1="170" x2="280" y2="110" stroke="#dc2626" strokeWidth="2.4" />
            <text x="200" y="124" fontSize="10" fontWeight="700" fill="#b91c1c" transform="rotate(-15 200 124)">
              Ahmad
            </text>
          </svg>
        );

      case 'q38':
      case 'q42':
        return (
          <svg viewBox="0 0 320 215" className="w-full max-w-[320px] h-auto">
            <defs>
              <pattern id="grid38" width="25" height="40" patternUnits="userSpaceOnUse">
                <path d="M 25 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="1" />
              </pattern>
            </defs>
            <rect x="60" y="25" width="200" height="140" fill="url(#grid38)" />
            <line x1="60" y1="25" x2="60" y2="165" stroke="#334155" strokeWidth="1.8" />
            <line x1="60" y1="165" x2="265" y2="165" stroke="#334155" strokeWidth="1.8" />
            {[0, 10, 20, 30].map((v, i) => (
              <text key={v} x="54" y={168 - i * 40} textAnchor="end" fontSize="9" fill="#475569">
                {v}
              </text>
            ))}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((v, i) => (
              <text key={v} x={60 + i * 25} y="179" textAnchor="middle" fontSize="9" fill="#475569">
                {v}
              </text>
            ))}
            <text x="18" y="95" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e293b" transform="rotate(-90 18 95)">
              Position (m)
            </text>
            <text x="160" y="199" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e293b">
              Time (s)
            </text>
            {/* Passes through (0,0) and (6,30) -> (210, 45) */}
            <line x1="60" y1="165" x2="225" y2="33" stroke="#2563eb" strokeWidth="2.4" />
          </svg>
        );

      case 'q39':
        return (
          <svg viewBox="0 0 320 220" className="w-full max-w-[320px] h-auto">
            <defs>
              <pattern id="grid39" width="40" height="32" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 32" fill="none" stroke="#e2e8f0" strokeWidth="1" />
              </pattern>
            </defs>
            <rect x="60" y="26" width="200" height="128" fill="url(#grid39)" />
            <line x1="60" y1="22" x2="60" y2="154" stroke="#334155" strokeWidth="1.8" />
            <line x1="60" y1="154" x2="266" y2="154" stroke="#334155" strokeWidth="1.8" />
            {[0, 10, 20, 30, 40].map((v, i) => (
              <text key={v} x="54" y={158 - i * 32} textAnchor="end" fontSize="9" fill="#475569">
                {v}
              </text>
            ))}
            {[0, 5, 10, 15, 20, 25].map((v, i) => (
              <text key={v} x={60 + i * 40} y="168" textAnchor="middle" fontSize="9" fill="#475569">
                {v}
              </text>
            ))}
            <text x="18" y="90" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e293b" transform="rotate(-90 18 90)">
              Position (m)
            </text>
            <text x="160" y="190" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e293b">
              Time (s)
            </text>
            <polyline points="60,26 100,90 180,90 260,154" fill="none" stroke="#2563eb" strokeWidth="2.4" />
            {[
              [60, 26],
              [100, 90],
              [180, 90],
              [260, 154],
            ].map(([cx, cy], idx) => (
              <circle key={idx} cx={cx} cy={cy} r="4" fill="#dc2626" />
            ))}
          </svg>
        );

      case 'q40':
        return (
          <svg viewBox="0 0 320 215" className="w-full max-w-[320px] h-auto">
            <defs>
              <pattern id="grid40" width="40" height="26" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 26" fill="none" stroke="#e2e8f0" strokeWidth="1" />
              </pattern>
            </defs>
            <rect x="60" y="25" width="200" height="130" fill="url(#grid40)" />
            <line x1="60" y1="25" x2="60" y2="155" stroke="#334155" strokeWidth="1.8" />
            <line x1="60" y1="155" x2="265" y2="155" stroke="#334155" strokeWidth="1.8" />
            {[0, 5, 10, 15, 20, 25].map((v, i) => (
              <text key={v} x="54" y={158 - i * 26} textAnchor="end" fontSize="9" fill="#475569">
                {v}
              </text>
            ))}
            {[0, 1, 2, 3, 4, 5].map((v, i) => (
              <text key={v} x={60 + i * 40} y="169" textAnchor="middle" fontSize="9" fill="#475569">
                {v}
              </text>
            ))}
            <text x="18" y="90" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e293b" transform="rotate(-90 18 90)">
              Position (m)
            </text>
            <text x="160" y="190" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e293b">
              Time (s)
            </text>
            <line x1="60" y1="155" x2="260" y2="25" stroke="#2563eb" strokeWidth="2.4" />
          </svg>
        );

      case 'q41':
        return (
          <svg viewBox="0 0 320 215" className="w-full max-w-[320px] h-auto">
            <defs>
              <pattern id="grid41" width="38" height="22" patternUnits="userSpaceOnUse">
                <path d="M 38 0 L 0 0 0 22" fill="none" stroke="#e2e8f0" strokeWidth="1" />
              </pattern>
            </defs>
            <rect x="60" y="23" width="190" height="132" fill="url(#grid41)" />
            <line x1="60" y1="20" x2="60" y2="155" stroke="#334155" strokeWidth="1.8" />
            <line x1="60" y1="155" x2="255" y2="155" stroke="#334155" strokeWidth="1.8" />
            {[0, 2, 4, 6, 8, 10, 12].map((v, i) => (
              <text key={v} x="54" y={158 - i * 22} textAnchor="end" fontSize="9" fill="#475569">
                {v}
              </text>
            ))}
            {[0, 1, 2, 3, 4, 5].map((v, i) => (
              <text key={v} x={60 + i * 38} y="169" textAnchor="middle" fontSize="9" fill="#475569">
                {v}
              </text>
            ))}
            <text x="18" y="90" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e293b" transform="rotate(-90 18 90)">
              Position (m)
            </text>
            <text x="155" y="190" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e293b">
              Time (s)
            </text>
            <line x1="60" y1="155" x2="250" y2="45" stroke="#0f172a" strokeWidth="2.2" />
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <circle key={i} cx={60 + i * 38} cy={155 - i * 22} r="3.5" fill="#0f172a" />
            ))}
          </svg>
        );

      case 'q54':
        return (
          <svg viewBox="0 0 320 215" className="w-full max-w-[320px] h-auto">
            <defs>
              <pattern id="grid54" width="38" height="26" patternUnits="userSpaceOnUse">
                <path d="M 38 0 L 0 0 0 26" fill="none" stroke="#e2e8f0" strokeWidth="1" />
              </pattern>
            </defs>
            <rect x="60" y="25" width="190" height="130" fill="url(#grid54)" />
            <line x1="60" y1="25" x2="60" y2="155" stroke="#334155" strokeWidth="1.8" />
            <line x1="60" y1="155" x2="255" y2="155" stroke="#334155" strokeWidth="1.8" />
            {[0, 2, 4, 6, 8, 10].map((v, i) => (
              <text key={v} x="54" y={158 - i * 26} textAnchor="end" fontSize="9" fill="#475569">
                {v}
              </text>
            ))}
            {[0, 1, 2, 3, 4, 5].map((v, i) => (
              <text key={v} x={60 + i * 38} y="169" textAnchor="middle" fontSize="9" fill="#475569">
                {v}
              </text>
            ))}
            <text x="18" y="90" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e293b" transform="rotate(-90 18 90)">
              Velocity (m/s)
            </text>
            <text x="155" y="190" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e293b">
              Time (s)
            </text>
            <line x1="60" y1="155" x2="250" y2="25" stroke="#7e22ce" strokeWidth="2.4" />
          </svg>
        );

      case 'q55':
        return (
          <svg viewBox="0 0 360 70" className="w-full max-w-[360px] h-auto">
            <defs>
              <marker id="arr55" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#2563eb" />
              </marker>
            </defs>
            <line x1="20" y1="35" x2="340" y2="35" stroke="#2563eb" strokeWidth="2" markerEnd="url(#arr55)" />
            {[32, 52, 82, 126, 186, 266].map((cx, i) => (
              <circle key={i} cx={cx} cy="35" r="5" fill="#9333ea" />
            ))}
          </svg>
        );

      case 'q56':
        return (
          <svg viewBox="0 0 330 220" className="w-full max-w-[330px] h-auto">
            <defs>
              <pattern id="grid56" width="33" height="22" patternUnits="userSpaceOnUse">
                <path d="M 33 0 L 0 0 0 22" fill="none" stroke="#e2e8f0" strokeWidth="1" />
              </pattern>
            </defs>
            <rect x="60" y="23" width="198" height="132" fill="url(#grid56)" />
            <line x1="60" y1="23" x2="60" y2="155" stroke="#334155" strokeWidth="1.8" />
            <line x1="60" y1="155" x2="264" y2="155" stroke="#334155" strokeWidth="1.8" />
            {[0, 5, 10, 15, 20, 25, 30].map((v, i) => (
              <text key={v} x="54" y={158 - i * 22} textAnchor="end" fontSize="8.5" fill="#475569">
                {v}
              </text>
            ))}
            {[0, 5, 10, 15, 20, 25, 30].map((v, i) => (
              <text key={v} x={60 + i * 33} y="168" textAnchor="middle" fontSize="8.5" fill="#475569">
                {v}
              </text>
            ))}
            <text x="18" y="90" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e293b" transform="rotate(-90 18 90)">
              Velocity (m/s)
            </text>
            <text x="159" y="189" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e293b">
              Time (s)
            </text>
            <polyline points="60,155 93,133 159,111 192,111 225,58 258,36" fill="none" stroke="#2563eb" strokeWidth="2.4" />
            {[
              [93, 133],
              [159, 111],
              [192, 111],
              [225, 58],
            ].map(([cx, cy], idx) => (
              <circle key={idx} cx={cx} cy={cy} r="3.5" fill="#1d4ed8" />
            ))}
            <text x="125" y="116" fontSize="10" fontWeight="700" fill="#dc2626">1</text>
            <text x="175" y="103" fontSize="10" fontWeight="700" fill="#dc2626">2</text>
            <text x="200" y="76" fontSize="10" fontWeight="700" fill="#dc2626">3</text>
            <text x="240" y="38" fontSize="10" fontWeight="700" fill="#dc2626">4</text>
          </svg>
        );

      case 'q58':
        return (
          <svg viewBox="0 0 320 215" className="w-full max-w-[320px] h-auto">
            <defs>
              <pattern id="grid58" width="25" height="24" patternUnits="userSpaceOnUse">
                <path d="M 25 0 L 0 0 0 24" fill="none" stroke="#e2e8f0" strokeWidth="1" />
              </pattern>
            </defs>
            <rect x="60" y="25" width="200" height="120" fill="url(#grid58)" />
            <line x1="60" y1="22" x2="60" y2="145" stroke="#334155" strokeWidth="1.8" />
            <line x1="60" y1="145" x2="265" y2="145" stroke="#334155" strokeWidth="1.8" />
            {[0, 1, 2, 3, 4, 5].map((v, i) => (
              <text key={v} x="54" y={148 - i * 24} textAnchor="end" fontSize="9" fill="#475569">
                {v}
              </text>
            ))}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((v, i) => (
              <text key={v} x={60 + i * 25} y="159" textAnchor="middle" fontSize="9" fill="#475569">
                {v}
              </text>
            ))}
            <text x="18" y="85" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e293b" transform="rotate(-90 18 85)">
              Velocity (m/s)
            </text>
            <text x="160" y="180" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e293b">
              Time (s)
            </text>
            <polyline points="60,145 85,97 160,73 210,73 235,37 260,37" fill="none" stroke="#2563eb" strokeWidth="2.4" />
            <text x="120" y="75" fontSize="11" fontWeight="800" fill="#0f172a">A</text>
            <text x="182" y="65" fontSize="11" fontWeight="800" fill="#0f172a">B</text>
            <text x="215" y="48" fontSize="11" fontWeight="800" fill="#0f172a">C</text>
            <text x="245" y="29" fontSize="11" fontWeight="800" fill="#0f172a">D</text>
          </svg>
        );

      case 'q59':
        return (
          <svg viewBox="0 0 300 170" className="w-full max-w-[300px] h-auto">
            <defs>
              <marker id="arr59" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a" />
              </marker>
            </defs>
            <line x1="40" y1="150" x2="40" y2="18" stroke="#0f172a" strokeWidth="1.8" markerEnd="url(#arr59)" />
            <line x1="30" y1="85" x2="275" y2="85" stroke="#0f172a" strokeWidth="1.8" markerEnd="url(#arr59)" />
            <text x="48" y="24" fontSize="11" fontWeight="700" fill="#0f172a">v</text>
            <text x="272" y="76" fontSize="11" fontWeight="700" fill="#0f172a">t</text>
            <path d="M 40 72 C 70 20, 120 20, 150 85 C 180 150, 230 150, 260 112" fill="none" stroke="#2563eb" strokeWidth="2.4" />
            <circle cx="95" cy="33" r="4.5" fill="#dc2626" />
            <text x="95" y="23" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f172a">x</text>
            <circle cx="205" cy="137" r="4.5" fill="#dc2626" />
            <text x="205" y="156" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f172a">y</text>
          </svg>
        );

      case 'q64':
        return (
          <svg viewBox="0 0 320 215" className="w-full max-w-[320px] h-auto">
            <defs>
              <pattern id="grid64" width="25" height="27" patternUnits="userSpaceOnUse">
                <path d="M 25 0 L 0 0 0 27" fill="none" stroke="#e2e8f0" strokeWidth="1" />
              </pattern>
            </defs>
            <rect x="60" y="27" width="200" height="108" fill="url(#grid64)" />
            <rect x="60" y="81" width="150" height="54" fill="#dbeafe" opacity="0.85" />
            <line x1="60" y1="22" x2="60" y2="135" stroke="#334155" strokeWidth="1.8" />
            <line x1="60" y1="135" x2="265" y2="135" stroke="#334155" strokeWidth="1.8" />
            {[0, 1, 2, 3, 4].map((v, i) => (
              <text key={v} x="54" y={138 - i * 27} textAnchor="end" fontSize="9" fill="#475569">
                {v}
              </text>
            ))}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((v, i) => (
              <text key={v} x={60 + i * 25} y="149" textAnchor="middle" fontSize="9" fill="#475569">
                {v}
              </text>
            ))}
            <text x="18" y="80" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e293b" transform="rotate(-90 18 80)">
              Velocity (m/s)
            </text>
            <text x="160" y="170" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e293b">
              Time (s)
            </text>
            <line x1="60" y1="81" x2="210" y2="81" stroke="#2563eb" strokeWidth="2.6" />
          </svg>
        );

      case 'q71':
        return (
          <svg viewBox="0 0 460 120" className="w-full max-w-[460px] h-auto">
            {['A', 'B', 'C', 'D'].map((label, idx) => {
              const ox = 25 + idx * 110;
              return (
                <g key={label}>
                  <text x={ox + 42} y="14" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f172a">
                    {label}
                  </text>
                  <line x1={ox} y1="22" x2={ox} y2="94" stroke="#334155" strokeWidth="1.5" />
                  <line x1={ox} y1="94" x2={ox + 84} y2="94" stroke="#334155" strokeWidth="1.5" />
                  <text x={ox - 6} y="60" textAnchor="end" fontSize="9" fill="#475569">
                    v
                  </text>
                  <text x={ox + 42} y="108" textAnchor="middle" fontSize="9" fill="#475569">
                    t
                  </text>
                </g>
              );
            })}
            <line x1="25" y1="94" x2="104" y2="28" stroke="#2563eb" strokeWidth="2.2" />
            <line x1="135" y1="58" x2="214" y2="58" stroke="#2563eb" strokeWidth="2.2" />
            <path d="M 248 92 Q 287 10 326 92" fill="none" stroke="#2563eb" strokeWidth="2.2" />
            <path d="M 426 28 Q 332 58 426 92" fill="none" stroke="#2563eb" strokeWidth="2.2" />
          </svg>
        );

      case 'q90':
        return (
          <svg viewBox="0 0 320 120" className="w-full max-w-[320px] h-auto">
            <defs>
              <marker id="arr90" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#2563eb" />
              </marker>
            </defs>
            <rect x="45" y="65" width="46" height="36" fill="#cbd5e1" stroke="#0f172a" strokeWidth="1.6" />
            <text x="68" y="81" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0f172a">1</text>
            <text x="68" y="94" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0f172a">2 kg</text>

            <rect x="91" y="47" width="50" height="54" fill="#cbd5e1" stroke="#0f172a" strokeWidth="1.6" />
            <text x="116" y="70" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0f172a">2</text>
            <text x="116" y="83" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0f172a">3 kg</text>

            <rect x="141" y="25" width="60" height="76" fill="#94a3b8" stroke="#0f172a" strokeWidth="1.6" />
            <text x="171" y="58" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0f172a">3</text>
            <text x="171" y="72" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0f172a">5 kg</text>

            <line x1="215" y1="62" x2="280" y2="62" stroke="#2563eb" strokeWidth="2.4" markerEnd="url(#arr90)" />
            <text x="248" y="52" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1d4ed8">
              F = 10 N
            </text>
          </svg>
        );

      case 'q95':
        return (
          <svg viewBox="0 0 280 165" className="w-full max-w-[280px] h-auto">
            <defs>
              <marker id="arr95r" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#dc2626" />
              </marker>
              <marker id="arr95b" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#2563eb" />
              </marker>
            </defs>
            <polygon points="40,40 40,145 245,145" fill="none" stroke="#0f172a" strokeWidth="2" />
            <g transform="translate(120,81) rotate(27)">
              <rect x="-18" y="-12" width="36" height="24" fill="#f59e0b" stroke="#0f172a" strokeWidth="1.5" />
            </g>
            {/* Arrow 1: down incline */}
            <line x1="120" y1="81" x2="180" y2="112" stroke="#dc2626" strokeWidth="2" markerEnd="url(#arr95r)" />
            <text x="184" y="110" fontSize="11" fontWeight="700" fill="#dc2626">1</text>
            {/* Arrow 2: perpendicular normal */}
            <line x1="120" y1="81" x2="149" y2="24" stroke="#dc2626" strokeWidth="2" markerEnd="url(#arr95r)" />
            <text x="155" y="25" fontSize="11" fontWeight="700" fill="#dc2626">2</text>
            {/* Arrow 3: straight up */}
            <line x1="120" y1="81" x2="120" y2="18" stroke="#dc2626" strokeWidth="2" markerEnd="url(#arr95r)" />
            <text x="128" y="22" fontSize="11" fontWeight="700" fill="#dc2626">3</text>
            {/* Arrow 4: up incline */}
            <line x1="120" y1="81" x2="62" y2="51" stroke="#dc2626" strokeWidth="2" markerEnd="url(#arr95r)" />
            <text x="53" y="48" fontSize="11" fontWeight="700" fill="#dc2626">4</text>
            {/* W: downward vertical */}
            <line x1="120" y1="81" x2="120" y2="132" stroke="#2563eb" strokeWidth="2" markerEnd="url(#arr95b)" />
            <text x="128" y="132" fontSize="11" fontWeight="700" fill="#1d4ed8">W</text>
          </svg>
        );

      case 'q97':
        return (
          <svg viewBox="0 0 240 120" className="w-full max-w-[240px] h-auto">
            <defs>
              <marker id="arr97" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#dc2626" />
              </marker>
            </defs>
            <line x1="40" y1="95" x2="200" y2="95" stroke="#334155" strokeWidth="2.5" />
            <rect x="85" y="57" width="70" height="38" fill="#fcd34d" stroke="#0f172a" strokeWidth="1.6" />
            <text x="120" y="80" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f172a">
              10 kg
            </text>
            <line x1="120" y1="57" x2="120" y2="20" stroke="#dc2626" strokeWidth="2.2" markerEnd="url(#arr97)" />
            <text x="130" y="30" fontSize="11" fontWeight="700" fill="#0f172a">
              Fₙ
            </text>
          </svg>
        );

      case 'q101':
        return (
          <svg viewBox="0 0 320 90" className="w-full max-w-[320px] h-auto">
            <defs>
              <marker id="arr101r" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#dc2626" />
              </marker>
              <marker id="arr101b" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#2563eb" />
              </marker>
            </defs>
            <line x1="115" y1="45" x2="205" y2="45" stroke="#475569" strokeWidth="4" />
            <line x1="115" y1="45" x2="45" y2="45" stroke="#dc2626" strokeWidth="2.4" markerEnd="url(#arr101r)" />
            <line x1="205" y1="45" x2="275" y2="45" stroke="#2563eb" strokeWidth="2.4" markerEnd="url(#arr101b)" />
            <text x="72" y="32" textAnchor="middle" fontSize="12" fontWeight="700" fill="#dc2626">F</text>
            <text x="244" y="32" textAnchor="middle" fontSize="12" fontWeight="700" fill="#2563eb">20 N</text>
            <text x="160" y="68" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f172a">m = 0.5 kg</text>
          </svg>
        );

      case 'q102':
        return (
          <svg viewBox="0 0 320 110" className="w-full max-w-[320px] h-auto">
            <defs>
              <marker id="arr102r" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#dc2626" />
              </marker>
              <marker id="arr102b" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#2563eb" />
              </marker>
            </defs>
            <text x="160" y="22" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f172a">
              m = 10 kg
            </text>
            <rect x="115" y="34" width="90" height="50" fill="#fed7aa" stroke="#0f172a" strokeWidth="1.6" />
            <line x1="115" y1="59" x2="40" y2="59" stroke="#dc2626" strokeWidth="2.4" markerEnd="url(#arr102r)" />
            <line x1="205" y1="59" x2="275" y2="59" stroke="#2563eb" strokeWidth="2.4" markerEnd="url(#arr102b)" />
            <text x="72" y="46" textAnchor="middle" fontSize="11" fontWeight="700" fill="#dc2626">150 N</text>
            <text x="242" y="46" textAnchor="middle" fontSize="11" fontWeight="700" fill="#2563eb">100 N</text>
          </svg>
        );

      case 'q103':
        return (
          <svg viewBox="0 0 280 120" className="w-full max-w-[280px] h-auto">
            <defs>
              <marker id="arr103" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a" />
              </marker>
            </defs>
            <line x1="55" y1="95" x2="205" y2="95" stroke="#0f172a" strokeWidth="2.2" markerEnd="url(#arr103)" />
            <line x1="55" y1="95" x2="115" y2="25" stroke="#0f172a" strokeWidth="2.2" markerEnd="url(#arr103)" />
            <path d="M 85 95 A 30 30 0 0 0 74 72" fill="none" stroke="#2563eb" strokeWidth="1.6" />
            <text x="92" y="83" fontSize="10" fontWeight="700" fill="#1d4ed8">60°</text>
            <text x="128" y="30" fontSize="11" fontWeight="700" fill="#0f172a">F₁ = 5 N</text>
            <text x="214" y="99" fontSize="11" fontWeight="700" fill="#0f172a">F₂ = 10 N</text>
          </svg>
        );

      case 'q106':
        return (
          <svg viewBox="0 0 460 115" className="w-full max-w-[460px] h-auto">
            <defs>
              <marker id="arr106r" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#dc2626" />
              </marker>
              <marker id="arr106b" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#2563eb" />
              </marker>
              <marker id="arr106g" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#16a34a" />
              </marker>
            </defs>
            {/* A */}
            <text x="60" y="18" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f172a">A</text>
            <line x1="60" y1="58" x2="25" y2="58" stroke="#16a34a" strokeWidth="2" markerEnd="url(#arr106g)" />
            <line x1="60" y1="58" x2="100" y2="58" stroke="#2563eb" strokeWidth="2" markerEnd="url(#arr106b)" />
            <line x1="60" y1="58" x2="60" y2="85" stroke="#dc2626" strokeWidth="2" markerEnd="url(#arr106r)" />
            <circle cx="60" cy="58" r="3" fill="#0f172a" />
            <text x="34" y="50" fontSize="9" fontWeight="700" fill="#16a34a">3 N</text>
            <text x="86" y="50" fontSize="9" fontWeight="700" fill="#2563eb">5 N</text>
            <text x="67" y="82" fontSize="9" fontWeight="700" fill="#dc2626">2 N</text>

            {/* B */}
            <text x="170" y="18" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f172a">B</text>
            <line x1="170" y1="50" x2="170" y2="95" stroke="#2563eb" strokeWidth="2" markerEnd="url(#arr106b)" />
            <circle cx="170" cy="50" r="3" fill="#0f172a" />
            <text x="178" y="64" fontSize="9" fontWeight="700" fill="#2563eb">5 N</text>
            <text x="178" y="76" fontSize="9" fontWeight="700" fill="#16a34a">3 N</text>
            <text x="178" y="88" fontSize="9" fontWeight="700" fill="#dc2626">2 N</text>

            {/* C */}
            <text x="285" y="18" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f172a">C</text>
            <line x1="285" y1="58" x2="235" y2="58" stroke="#dc2626" strokeWidth="2" markerEnd="url(#arr106r)" />
            <line x1="285" y1="58" x2="330" y2="58" stroke="#2563eb" strokeWidth="2" markerEnd="url(#arr106b)" />
            <circle cx="285" cy="58" r="3" fill="#0f172a" />
            <text x="255" y="48" textAnchor="middle" fontSize="9" fontWeight="700" fill="#dc2626">3 N + 2 N</text>
            <text x="315" y="48" textAnchor="middle" fontSize="9" fontWeight="700" fill="#2563eb">5 N</text>

            {/* D */}
            <text x="400" y="18" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f172a">D</text>
            <line x1="400" y1="62" x2="358" y2="62" stroke="#2563eb" strokeWidth="2" markerEnd="url(#arr106b)" />
            <line x1="400" y1="62" x2="438" y2="62" stroke="#16a34a" strokeWidth="2" markerEnd="url(#arr106g)" />
            <line x1="400" y1="62" x2="400" y2="34" stroke="#dc2626" strokeWidth="2" markerEnd="url(#arr106r)" />
            <circle cx="400" cy="62" r="3" fill="#0f172a" />
            <text x="372" y="75" fontSize="9" fontWeight="700" fill="#2563eb">5 N</text>
            <text x="420" y="75" fontSize="9" fontWeight="700" fill="#16a34a">3 N</text>
            <text x="407" y="44" fontSize="9" fontWeight="700" fill="#dc2626">2 N</text>
          </svg>
        );

      case 'q112':
        return (
          <svg viewBox="0 0 280 115" className="w-full max-w-[280px] h-auto">
            <rect x="35" y="55" width="90" height="42" fill="#e2e8f0" stroke="#0f172a" strokeWidth="1.6" />
            <text x="80" y="80" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f172a">B</text>
            <rect x="180" y="20" width="46" height="77" fill="#e2e8f0" stroke="#0f172a" strokeWidth="1.6" />
            <text x="203" y="64" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f172a">A</text>
          </svg>
        );

      case 'q113':
        return (
          <svg viewBox="0 0 280 140" className="w-full max-w-[280px] h-auto">
            <polygon points="45,25 45,120 220,120" fill="none" stroke="#0f172a" strokeWidth="2.2" />
            <g transform="translate(115,63) rotate(28.5)">
              <rect x="-18" y="-12" width="36" height="24" fill="#cbd5e1" stroke="#0f172a" strokeWidth="1.6" />
            </g>
            <text x="150" y="52" fontSize="11" fontWeight="700" fill="#0f172a" transform="rotate(28.5 150 52)">
              m = 6 kg
            </text>
            <text x="172" y="113" fontSize="11" fontWeight="700" fill="#0f172a">
              30°
            </text>
          </svg>
        );

      case 'q114':
        return (
          <svg viewBox="0 0 280 155" className="w-full max-w-[280px] h-auto">
            <line x1="25" y1="20" x2="25" y2="140" stroke="#334155" strokeWidth="1.8" />
            <line x1="25" y1="140" x2="260" y2="140" stroke="#334155" strokeWidth="1.8" />
            <path d="M 40 140 Q 140 -20 240 140" fill="none" stroke="#2563eb" strokeWidth="2.4" />
            <line x1="82" y1="80" x2="198" y2="80" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 4" />
            <circle cx="82" cy="80" r="4.5" fill="#dc2626" />
            <text x="71" y="75" fontSize="11" fontWeight="700" fill="#0f172a">a</text>
            <circle cx="140" cy="60" r="4.5" fill="#dc2626" />
            <text x="140" y="48" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f172a">b</text>
            <circle cx="198" cy="80" r="4.5" fill="#dc2626" />
            <text x="208" y="75" fontSize="11" fontWeight="700" fill="#0f172a">c</text>
          </svg>
        );

      case 'q123':
        return (
          <svg viewBox="0 0 300 140" className="w-full max-w-[300px] h-auto">
            <ellipse cx="150" cy="70" rx="110" ry="50" fill="none" stroke="#2563eb" strokeWidth="2" />
            <circle cx="215" cy="70" r="13" fill="#f59e0b" />
            <text x="215" y="96" textAnchor="middle" fontSize="10" fontWeight="700" fill="#b45309">
              Sun
            </text>
            <circle cx="260" cy="70" r="4" fill="#dc2626" />
            <text x="268" y="74" fontSize="10" fontWeight="700" fill="#dc2626">1</text>
            <circle cx="150" cy="20" r="4" fill="#dc2626" />
            <text x="150" y="13" textAnchor="middle" fontSize="10" fontWeight="700" fill="#dc2626">2</text>
            <circle cx="40" cy="70" r="4" fill="#dc2626" />
            <text x="30" y="74" textAnchor="end" fontSize="10" fontWeight="700" fill="#dc2626">3</text>
            <circle cx="150" cy="120" r="4" fill="#dc2626" />
            <text x="150" y="134" textAnchor="middle" fontSize="10" fontWeight="700" fill="#dc2626">4</text>
          </svg>
        );

      case 'q129':
        return (
          <svg viewBox="0 0 460 120" className="w-full max-w-[460px] h-auto">
            {[
              { label: 'A', px: 60, py: 42 },
              { label: 'B', px: 145, py: 72 },
              { label: 'C', px: 285, py: 28 },
              { label: 'D', px: 444, py: 72 },
            ].map((item, idx) => {
              const cx = 60 + idx * 112;
              return (
                <g key={item.label}>
                  <text x={cx} y="14" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0f172a">
                    {item.label}
                  </text>
                  <ellipse cx={cx} cy="72" rx="44" ry="24" fill="#bfdbfe" stroke="#1e3a8a" strokeWidth="1.6" />
                  <text x={cx} y="76" textAnchor="middle" fontSize="9" fontWeight="700" fill="#1e3a8a">
                    Earth
                  </text>
                  {/* Stick person */}
                  <circle cx={item.px} cy={item.py - 10} r="3" fill="#0f172a" />
                  <line x1={item.px} y1={item.py - 7} x2={item.px} y2={item.py + 2} stroke="#0f172a" strokeWidth="1.5" />
                  <line x1={item.px - 4} y1={item.py - 4} x2={item.px + 4} y2={item.py - 4} stroke="#0f172a" strokeWidth="1.3" />
                  <line x1={item.px} y1={item.py + 2} x2={item.px - 3} y2={item.py + 7} stroke="#0f172a" strokeWidth="1.3" />
                  <line x1={item.px} y1={item.py + 2} x2={item.px + 3} y2={item.py + 7} stroke="#0f172a" strokeWidth="1.3" />
                </g>
              );
            })}
          </svg>
        );

      case 'q148':
        return (
          <svg viewBox="0 0 460 110" className="w-full max-w-[460px] h-auto">
            <defs>
              <marker id="arr148" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#dc2626" />
              </marker>
            </defs>
            {[
              { label: 'A', fx: 95, fy: 32 },
              { label: 'B', fx: 192, fy: 32 },
              { label: 'C', fx: 328, fy: 45 },
              { label: 'D', fx: 448, fy: 70 },
            ].map((item, idx) => {
              const x0 = 20 + idx * 112;
              const x1 = x0 + 68;
              return (
                <g key={item.label}>
                  <text x={x0 + 34} y="18" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f172a">
                    {item.label}
                  </text>
                  <line x1={x0} y1="70" x2={x1} y2="70" stroke="#1e3a8a" strokeWidth="3" />
                  <circle cx={x0} cy="70" r="3.5" fill="#dc2626" />
                  <text x={x0 + 34} y="88" textAnchor="middle" fontSize="9" fill="#475569">
                    Lever Arm
                  </text>
                  <line x1={x1} y1="70" x2={item.fx} y2={item.fy} stroke="#dc2626" strokeWidth="2" markerEnd="url(#arr148)" />
                  <text x={item.fx + 5} y={item.fy + 3} fontSize="10" fontWeight="700" fill="#dc2626">
                    F
                  </text>
                </g>
              );
            })}
          </svg>
        );

      case 'q149':
        return (
          <svg viewBox="0 0 240 140" className="w-full max-w-[240px] h-auto">
            <rect x="65" y="20" width="120" height="100" fill="#f8fafc" stroke="#0f172a" strokeWidth="2" />
            <line x1="65" y1="15" x2="65" y2="125" stroke="#dc2626" strokeWidth="4" />
            <text x="53" y="70" textAnchor="middle" fontSize="10" fontWeight="700" fill="#dc2626" transform="rotate(-90 53 70)">
              Hinge
            </text>
            {[
              { label: 'A', x: 86 },
              { label: 'B', x: 112 },
              { label: 'C', x: 138 },
              { label: 'D', x: 164 },
            ].map((ring) => (
              <g key={ring.label}>
                <text x={ring.x} y="55" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f172a">
                  {ring.label}
                </text>
                <circle cx={ring.x} cy="70" r="5" fill="none" stroke="#2563eb" strokeWidth="2" />
              </g>
            ))}
          </svg>
        );

      case 'q150':
        return (
          <svg viewBox="0 0 460 110" className="w-full max-w-[460px] h-auto">
            <defs>
              <marker id="arr150" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#dc2626" />
              </marker>
            </defs>
            {[
              { label: 'A', fy: 90 },
              { label: 'B', fy: 62 },
              { label: 'C', fy: 78 },
              { label: 'D', fy: 42 },
            ].map((item, idx) => {
              const bx = 55 + idx * 112;
              return (
                <g key={item.label}>
                  <text x={bx + 22} y="20" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f172a">
                    {item.label}
                  </text>
                  <rect x={bx} y="36" width="44" height="62" fill="#cbd5e1" stroke="#334155" strokeWidth="1.5" />
                  <line x1={bx - 30} y1={item.fy} x2={bx - 4} y2={item.fy} stroke="#dc2626" strokeWidth="2" markerEnd="url(#arr150)" />
                  <text x={bx - 36} y={item.fy + 3} textAnchor="end" fontSize="10" fontWeight="700" fill="#dc2626">
                    F
                  </text>
                </g>
              );
            })}
          </svg>
        );

      case 'q151':
        return (
          <svg viewBox="0 0 300 95" className="w-full max-w-[300px] h-auto">
            <line x1="40" y1="45" x2="260" y2="45" stroke="#b45309" strokeWidth="4" />
            <polygon points="105,47 96,75 114,75" fill="#dc2626" />
            <text x="105" y="34" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f172a">
              X
            </text>
            <text x="28" y="49" fontSize="12" fontWeight="700" fill="#0f172a">
              B
            </text>
            <text x="266" y="49" fontSize="12" fontWeight="700" fill="#0f172a">
              A
            </text>
          </svg>
        );

      case 'q155':
        return (
          <svg viewBox="0 0 460 95" className="w-full max-w-[460px] h-auto">
            <text x="65" y="16" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f172a">A</text>
            <rect x="22" y="54" width="86" height="26" fill="#cbd5e1" stroke="#334155" strokeWidth="1.5" />

            <text x="180" y="16" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f172a">B</text>
            <rect x="152" y="28" width="56" height="52" fill="#cbd5e1" stroke="#334155" strokeWidth="1.5" />

            <text x="295" y="16" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f172a">C</text>
            <rect x="278" y="54" width="34" height="26" fill="#cbd5e1" stroke="#334155" strokeWidth="1.5" />

            <text x="405" y="16" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f172a">D</text>
            <rect x="388" y="28" width="34" height="52" fill="#cbd5e1" stroke="#334155" strokeWidth="1.5" />
          </svg>
        );

      case 'q159':
        return (
          <svg viewBox="0 0 320 205" className="w-full max-w-[320px] h-auto">
            <defs>
              <pattern id="grid159" width="22" height="20" patternUnits="userSpaceOnUse">
                <path d="M 22 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="1" />
              </pattern>
            </defs>
            <rect x="55" y="20" width="220" height="140" fill="url(#grid159)" />
            <path d="M 65 160 C 110 160, 125 36, 165 36 C 205 36, 220 160, 265 160 Z" fill="#bfdbfe" opacity="0.7" />
            <path d="M 65 160 C 110 160, 125 36, 165 36 C 205 36, 220 160, 265 160" fill="none" stroke="#2563eb" strokeWidth="2.5" />
            <line x1="55" y1="20" x2="55" y2="160" stroke="#334155" strokeWidth="1.8" />
            <line x1="55" y1="160" x2="278" y2="160" stroke="#334155" strokeWidth="1.8" />
            {[0, 10, 20, 30].map((v, i) => (
              <text key={v} x="48" y={163 - i * 40} textAnchor="end" fontSize="9" fill="#475569">{v}</text>
            ))}
            {[0, 2, 4, 6, 8, 10].map((v, i) => (
              <text key={v} x={55 + i * 44} y="174" textAnchor="middle" fontSize="9" fill="#475569">{v}</text>
            ))}
            <text x="16" y="90" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e293b" transform="rotate(-90 16 90)">
              Force F (N)
            </text>
            <text x="166" y="193" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e293b">
              Time t (s)
            </text>
            <text x="165" y="122" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e3a8a">
              Area = ?
            </text>
          </svg>
        );

      case 'q167':
        return (
          <svg viewBox="0 0 320 140" className="w-full max-w-[320px] h-auto">
            <defs>
              <marker id="arr167r" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#dc2626" />
              </marker>
              <marker id="arr167b" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#2563eb" />
              </marker>
            </defs>
            <line x1="25" y1="102" x2="295" y2="102" stroke="#334155" strokeWidth="2.4" />
            <rect x="48" y="64" width="54" height="38" rx="3" fill="#fed7aa" stroke="#0f172a" strokeWidth="1.6" />
            <line x1="102" y1="82" x2="180" y2="82" stroke="#94a3b8" strokeWidth="1.4" strokeDasharray="4 3" />
            <line x1="102" y1="82" x2="152" y2="26" stroke="#dc2626" strokeWidth="2.4" markerEnd="url(#arr167r)" />
            <path d="M 134 82 A 32 32 0 0 0 124 58" fill="none" stroke="#dc2626" strokeWidth="1.6" />
            <text x="142" y="74" fontSize="10" fontWeight="700" fill="#b91c1c">60°</text>
            <text x="158" y="28" fontSize="11" fontWeight="700" fill="#dc2626">F = 5 N</text>
            <line x1="75" y1="118" x2="245" y2="118" stroke="#2563eb" strokeWidth="2" markerEnd="url(#arr167b)" />
            <text x="160" y="133" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1d4ed8">
              d = 6 m
            </text>
          </svg>
        );

      case 'q172':
        return (
          <svg viewBox="0 0 320 205" className="w-full max-w-[320px] h-auto">
            <defs>
              <pattern id="grid172" width="35" height="30" patternUnits="userSpaceOnUse">
                <path d="M 35 0 L 0 0 0 30" fill="none" stroke="#e2e8f0" strokeWidth="1" />
              </pattern>
            </defs>
            <rect x="58" y="24" width="210" height="135" fill="url(#grid172)" />
            <polygon points="58,159 233,159 233,39" fill="#bbf7d0" opacity="0.7" />
            <line x1="58" y1="159" x2="233" y2="39" stroke="#15803d" strokeWidth="2.5" />
            <line x1="58" y1="22" x2="58" y2="159" stroke="#334155" strokeWidth="1.8" />
            <line x1="58" y1="159" x2="275" y2="159" stroke="#334155" strokeWidth="1.8" />
            {[0, 5, 10, 15, 20].map((v, i) => (
              <text key={v} x="52" y={162 - i * 30} textAnchor="end" fontSize="9" fill="#475569">{v}</text>
            ))}
            {[0, 0.5, 1.0, 1.5].map((v, i) => (
              <text key={v} x={58 + i * 58.3} y="173" textAnchor="middle" fontSize="9" fill="#475569">
                {v.toFixed(1)}
              </text>
            ))}
            <text x="16" y="92" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e293b" transform="rotate(-90 16 92)">
              Force F (N)
            </text>
            <text x="164" y="192" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e293b">
              Displacement d (m)
            </text>
            <circle cx="233" cy="39" r="3.8" fill="#dc2626" />
            <text x="208" y="31" fontSize="9.5" fontWeight="700" fill="#15803d">(1.5 m, 20 N)</text>
          </svg>
        );

      case 'q176':
        return (
          <svg viewBox="0 0 320 165" className="w-full max-w-[320px] h-auto">
            <line x1="70" y1="18" x2="250" y2="18" stroke="#0f172a" strokeWidth="3.5" />
            <line x1="160" y1="18" x2="160" y2="145" stroke="#94a3b8" strokeWidth="1.4" strokeDasharray="4 4" />
            <path d="M 76 92 A 112 112 0 0 0 244 92" fill="none" stroke="#cbd5e1" strokeWidth="1.6" strokeDasharray="4 3" />
            <line x1="160" y1="18" x2="82" y2="96" stroke="#475569" strokeWidth="1.8" strokeDasharray="4 3" />
            <line x1="160" y1="18" x2="160" y2="128" stroke="#0f172a" strokeWidth="2" />
            <line x1="160" y1="18" x2="238" y2="96" stroke="#475569" strokeWidth="1.8" strokeDasharray="4 3" />
            <circle cx="82" cy="96" r="13" fill="#f97316" stroke="#9a3412" strokeWidth="1.6" />
            <text x="82" y="100" textAnchor="middle" fontSize="11" fontWeight="800" fill="#ffffff">A</text>
            <circle cx="160" cy="128" r="13" fill="#2563eb" stroke="#1e3a8a" strokeWidth="1.6" />
            <text x="160" y="132" textAnchor="middle" fontSize="11" fontWeight="800" fill="#ffffff">B</text>
            <circle cx="238" cy="96" r="13" fill="#f97316" stroke="#9a3412" strokeWidth="1.6" />
            <text x="238" y="100" textAnchor="middle" fontSize="11" fontWeight="800" fill="#ffffff">C</text>
            <text x="82" y="124" textAnchor="middle" fontSize="9" fontWeight="600" fill="#64748b">Max Height</text>
            <text x="160" y="154" textAnchor="middle" fontSize="9" fontWeight="600" fill="#1d4ed8">Lowest Point</text>
            <text x="238" y="124" textAnchor="middle" fontSize="9" fontWeight="600" fill="#64748b">Max Height</text>
          </svg>
        );

      case 'q193':
        return (
          <svg viewBox="0 0 360 150" className="w-full max-w-[360px] h-auto">
            <defs>
              <marker id="arr193" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#0d9488" />
              </marker>
            </defs>
            <line x1="20" y1="26" x2="340" y2="26" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="5 3" />
            <text x="180" y="16" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0f172a">
              Target Height h = 10 m
            </text>
            <line x1="20" y1="126" x2="340" y2="126" stroke="#334155" strokeWidth="2" />
            {[
              { label: 'Worker a', m: '2 kg', t: '5 s', x: 75 },
              { label: 'Worker b', m: '3 kg', t: '10 s', x: 180 },
              { label: 'Worker c', m: '4 kg', t: '15 s', x: 285 },
            ].map((w) => (
              <g key={w.label}>
                <rect x={w.x - 24} y="88" width="48" height="38" rx="4" fill="#e2e8f0" stroke="#334155" strokeWidth="1.5" />
                <text x={w.x} y="106" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0f172a">{w.m}</text>
                <text x={w.x} y="119" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#475569">t = {w.t}</text>
                <line x1={w.x} y1="84" x2={w.x} y2="34" stroke="#0d9488" strokeWidth="2" markerEnd="url(#arr193)" />
                <text x={w.x} y="142" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#0f172a">{w.label}</text>
              </g>
            ))}
          </svg>
        );

      case 'q195':
        return (
          <svg viewBox="0 0 300 180" className="w-full max-w-[300px] h-auto">
            <defs>
              <marker id="arr195" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#334155" />
              </marker>
            </defs>
            <line x1="56" y1="142" x2="56" y2="20" stroke="#334155" strokeWidth="1.8" markerEnd="url(#arr195)" />
            <line x1="56" y1="142" x2="265" y2="142" stroke="#334155" strokeWidth="1.8" markerEnd="url(#arr195)" />
            <line x1="56" y1="142" x2="236" y2="32" stroke="#dc2626" strokeWidth="2.5" />
            <circle cx="56" cy="142" r="3.5" fill="#0f172a" />
            <text x="18" y="82" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e293b" transform="rotate(-90 18 82)">
              Temperature T (K)
            </text>
            <text x="160" y="164" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e293b">
              Average Kinetic Energy (KE_avg)
            </text>
            <text x="64" y="155" fontSize="9" fill="#64748b">(0, 0)</text>
          </svg>
        );

      case 'q196':
        return (
          <svg viewBox="0 0 340 120" className="w-full max-w-[340px] h-auto">
            <defs>
              <marker id="arr196" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a" />
              </marker>
            </defs>
            <rect x="20" y="32" width="56" height="44" rx="5" fill="#fecaca" stroke="#dc2626" strokeWidth="1.8" />
            <text x="48" y="59" textAnchor="middle" fontSize="11" fontWeight="800" fill="#991b1b">100°C</text>
            <rect x="76" y="32" width="56" height="44" rx="5" fill="#bfdbfe" stroke="#2563eb" strokeWidth="1.8" />
            <text x="104" y="59" textAnchor="middle" fontSize="11" fontWeight="800" fill="#1e40af">0°C</text>
            <text x="76" y="94" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#475569">Before Contact</text>

            <line x1="146" y1="54" x2="196" y2="54" stroke="#0f172a" strokeWidth="2.2" markerEnd="url(#arr196)" />
            <text x="171" y="44" textAnchor="middle" fontSize="10" fontWeight="700" fill="#ea580c">Q</text>

            <rect x="208" y="32" width="56" height="44" rx="5" fill="#fed7aa" stroke="#ea580c" strokeWidth="1.8" />
            <text x="236" y="59" textAnchor="middle" fontSize="11" fontWeight="800" fill="#9a3412">50°C</text>
            <rect x="264" y="32" width="56" height="44" rx="5" fill="#fed7aa" stroke="#ea580c" strokeWidth="1.8" />
            <text x="292" y="59" textAnchor="middle" fontSize="11" fontWeight="800" fill="#9a3412">50°C</text>
            <text x="264" y="94" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#0f172a">T₁ = T₂</text>
          </svg>
        );

      case 'q201':
        return (
          <svg viewBox="0 0 320 205" className="w-full max-w-[320px] h-auto">
            <defs>
              <pattern id="grid201" width="38" height="28" patternUnits="userSpaceOnUse">
                <path d="M 38 0 L 0 0 0 28" fill="none" stroke="#e2e8f0" strokeWidth="1" />
              </pattern>
            </defs>
            <rect x="58" y="22" width="190" height="140" fill="url(#grid201)" />
            <line x1="58" y1="22" x2="58" y2="162" stroke="#334155" strokeWidth="1.8" />
            <line x1="58" y1="162" x2="260" y2="162" stroke="#334155" strokeWidth="1.8" />
            <line x1="58" y1="162" x2="128" y2="26" stroke="#dc2626" strokeWidth="2.3" />
            <line x1="58" y1="162" x2="178" y2="38" stroke="#ea580c" strokeWidth="2.3" />
            <line x1="58" y1="162" x2="232" y2="74" stroke="#2563eb" strokeWidth="2.3" />
            <line x1="58" y1="162" x2="246" y2="122" stroke="#16a34a" strokeWidth="2.3" />
            <text x="134" y="28" fontSize="10.5" fontWeight="800" fill="#dc2626">D</text>
            <text x="184" y="41" fontSize="10.5" fontWeight="800" fill="#ea580c">C</text>
            <text x="238" y="76" fontSize="10.5" fontWeight="800" fill="#2563eb">B</text>
            <text x="252" y="124" fontSize="10.5" fontWeight="800" fill="#16a34a">A</text>
            <text x="18" y="92" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e293b" transform="rotate(-90 18 92)">
              Temperature T (°C)
            </text>
            <text x="160" y="185" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e293b">
              Heat Absorbed Q (J)
            </text>
          </svg>
        );

      case 'q221':
        return (
          <svg viewBox="0 0 320 160" className="w-full max-w-[320px] h-auto">
            <rect x="35" y="106" width="250" height="36" rx="4" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.8" />
            <text x="160" y="130" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0369a1">Water Reservoir</text>
            {[
              { label: '1', x: 75, w: 8, topY: 26 },
              { label: '2', x: 130, w: 14, topY: 48 },
              { label: '3', x: 190, w: 22, topY: 70 },
              { label: '4', x: 252, w: 32, topY: 88 },
            ].map((tube) => (
              <g key={tube.label}>
                <rect x={tube.x - tube.w / 2} y="18" width={tube.w} height="92" fill="#f8fafc" stroke="#334155" strokeWidth="1.5" />
                <rect x={tube.x - tube.w / 2 + 1} y={tube.topY} width={tube.w - 2} height={110 - tube.topY} fill="#38bdf8" opacity="0.85" />
                <text x={tube.x} y="14" textAnchor="middle" fontSize="11" fontWeight="800" fill="#0f172a">{tube.label}</text>
              </g>
            ))}
          </svg>
        );

      case 'q223':
        return (
          <svg viewBox="0 0 320 155" className="w-full max-w-[320px] h-auto">
            <defs>
              <marker id="arr223d" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#dc2626" />
              </marker>
              <marker id="arr223u" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#16a34a" />
              </marker>
            </defs>
            <path d="M 55 56 L 55 135 L 265 135 L 265 56 L 195 56 L 195 102 L 90 102 L 90 56 Z" fill="#bae6fd" stroke="#0369a1" strokeWidth="2" />
            <rect x="55" y="44" width="35" height="12" fill="#475569" />
            <rect x="195" y="44" width="70" height="12" fill="#475569" />
            <line x1="72.5" y1="16" x2="72.5" y2="41" stroke="#dc2626" strokeWidth="2.4" markerEnd="url(#arr223d)" />
            <text x="72.5" y="13" textAnchor="middle" fontSize="10" fontWeight="700" fill="#dc2626">F₁ (A₁)</text>
            <line x1="230" y1="43" x2="230" y2="16" stroke="#16a34a" strokeWidth="2.4" markerEnd="url(#arr223u)" />
            <text x="230" y="13" textAnchor="middle" fontSize="10" fontWeight="700" fill="#15803d">F₂ (A₂)</text>
            <text x="160" y="122" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0c4a6e">F₁ / A₁ = F₂ / A₂</text>
          </svg>
        );

      case 'q228':
        return (
          <svg viewBox="0 0 340 130" className="w-full max-w-[340px] h-auto">
            <defs>
              <marker id="arr228" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#2563eb" />
              </marker>
              <marker id="arr228r" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#dc2626" />
              </marker>
            </defs>
            <path d="M 20 26 L 100 26 C 125 26, 130 46, 150 46 L 190 46 C 210 46, 215 26, 240 26 L 320 26 L 320 102 L 240 102 C 215 102, 210 82, 190 82 L 150 82 C 130 82, 125 102, 100 102 L 20 102 Z" fill="#e0f2fe" stroke="#0369a1" strokeWidth="2" />
            <line x1="40" y1="64" x2="88" y2="64" stroke="#2563eb" strokeWidth="2.2" markerEnd="url(#arr228)" />
            <line x1="142" y1="64" x2="200" y2="64" stroke="#dc2626" strokeWidth="2.6" markerEnd="url(#arr228r)" />
            <line x1="252" y1="64" x2="300" y2="64" stroke="#2563eb" strokeWidth="2.2" markerEnd="url(#arr228)" />
            <text x="64" y="18" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1e40af">Wide (v₁, P₁)</text>
            <text x="170" y="38" textAnchor="middle" fontSize="10" fontWeight="700" fill="#dc2626">Narrow (v₂ &gt; v₁)</text>
            <text x="170" y="118" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#0f172a">Pressure P₂ = ?</text>
          </svg>
        );

      case 'q245':
        return (
          <svg viewBox="0 0 340 150" className="w-full max-w-[340px] h-auto">
            <line x1="20" y1="78" x2="320" y2="78" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" />
            <path d="M 25 78 Q 55 24, 85 78 T 145 78 T 205 78 T 265 78 T 320 78" fill="none" stroke="#2563eb" strokeWidth="2.6" />
            <line x1="55" y1="30" x2="55" y2="48" stroke="#dc2626" strokeWidth="1.6" />
            <line x1="175" y1="30" x2="175" y2="48" stroke="#dc2626" strokeWidth="1.6" />
            <line x1="55" y1="34" x2="175" y2="34" stroke="#dc2626" strokeWidth="1.8" />
            <circle cx="55" cy="51" r="3.5" fill="#dc2626" />
            <circle cx="175" cy="51" r="3.5" fill="#dc2626" />
            <text x="115" y="25" textAnchor="middle" fontSize="11" fontWeight="800" fill="#dc2626">?</text>
            <line x1="205" y1="78" x2="205" y2="105" stroke="#0d9488" strokeWidth="1.8" />
            <text x="218" y="96" fontSize="9.5" fontWeight="700" fill="#0f766e">A</text>
            <text x="115" y="132" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#475569">Crest to Crest Distance</text>
          </svg>
        );

      case 'q255':
        return (
          <svg viewBox="0 0 340 135" className="w-full max-w-[340px] h-auto">
            <line x1="25" y1="64" x2="315" y2="64" stroke="#94a3b8" strokeWidth="1.4" strokeDasharray="4 3" />
            <path d="M 35 64 Q 80 18, 125 64 T 215 64 T 305 64" fill="none" stroke="#2563eb" strokeWidth="2.4" />
            <path d="M 35 64 Q 80 110, 125 64 T 215 64 T 305 64" fill="none" stroke="#60a5fa" strokeWidth="1.8" strokeDasharray="5 3" />
            {[35, 125, 215, 305].map((cx, i) => (
              <g key={cx}>
                <circle cx={cx} cy="64" r="4.5" fill="#dc2626" />
                <text x={cx} y="53" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#b91c1c">N{i + 1}</text>
              </g>
            ))}
            <line x1="35" y1="112" x2="125" y2="112" stroke="#0f172a" strokeWidth="1.8" />
            <line x1="35" y1="106" x2="35" y2="118" stroke="#0f172a" strokeWidth="1.6" />
            <line x1="125" y1="106" x2="125" y2="118" stroke="#0f172a" strokeWidth="1.6" />
            <text x="80" y="128" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#0f172a">?</text>
          </svg>
        );

      case 'q267':
        return (
          <svg viewBox="0 0 340 140" className="w-full max-w-[340px] h-auto">
            <rect x="50" y="34" width="240" height="58" fill="#f8fafc" stroke="none" />
            <line x1="50" y1="34" x2="290" y2="34" stroke="#0f172a" strokeWidth="2.6" />
            <line x1="50" y1="92" x2="290" y2="92" stroke="#0f172a" strokeWidth="2.6" />
            <path d="M 50 38 Q 170 63, 50 88" fill="none" stroke="#2563eb" strokeWidth="2.2" />
            <path d="M 290 38 Q 170 63, 290 88" fill="none" stroke="#2563eb" strokeWidth="2.2" />
            <circle cx="170" cy="63" r="4" fill="#dc2626" />
            <text x="170" y="24" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#0f172a">Open Air Column (Length L)</text>
            <line x1="50" y1="114" x2="290" y2="114" stroke="#0d9488" strokeWidth="1.8" />
            <line x1="50" y1="108" x2="50" y2="120" stroke="#0d9488" strokeWidth="1.8" />
            <line x1="290" y1="108" x2="290" y2="120" stroke="#0d9488" strokeWidth="1.8" />
            <text x="170" y="131" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#0f766e">L</text>
          </svg>
        );

      case 'q281':
        return (
          <svg viewBox="0 0 260 190" className="w-full max-w-[260px] h-auto">
            <rect x="10" y="10" width="240" height="170" rx="12" fill="#0f172a" />
            <g style={{ mixBlendMode: 'screen' }}>
              <circle cx="130" cy="68" r="46" fill="#ef4444" />
              <circle cx="102" cy="116" r="46" fill="#22c55e" />
              <circle cx="158" cy="116" r="46" fill="#3b82f6" />
            </g>
            <text x="130" y="45" textAnchor="middle" fontSize="10" fontWeight="700" fill="#ffffff">Red</text>
            <text x="80" y="132" textAnchor="middle" fontSize="10" fontWeight="700" fill="#ffffff">Green</text>
            <text x="180" y="132" textAnchor="middle" fontSize="10" fontWeight="700" fill="#ffffff">Blue</text>
            <text x="130" y="101" textAnchor="middle" fontSize="9" fontWeight="800" fill="#0f172a">W</text>
          </svg>
        );

      case 'q283':
        return (
          <svg viewBox="0 0 300 155" className="w-full max-w-[300px] h-auto">
            <defs>
              <marker id="arr283" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#dc2626" />
              </marker>
            </defs>
            <line x1="40" y1="122" x2="260" y2="122" stroke="#1e293b" strokeWidth="3.5" />
            <line x1="150" y1="22" x2="150" y2="122" stroke="#64748b" strokeWidth="1.6" strokeDasharray="4 4" />
            <line x1="65" y1="36" x2="150" y2="122" stroke="#dc2626" strokeWidth="2.3" markerEnd="url(#arr283)" />
            <line x1="150" y1="122" x2="235" y2="36" stroke="#2563eb" strokeWidth="2.3" markerEnd="url(#arr283)" />
            <path d="M 122 94 A 38 38 0 0 1 150 84" fill="none" stroke="#dc2626" strokeWidth="1.5" />
            <path d="M 150 84 A 38 38 0 0 1 178 94" fill="none" stroke="#2563eb" strokeWidth="1.5" />
            <text x="128" y="76" textAnchor="middle" fontSize="10" fontWeight="700" fill="#dc2626">35°</text>
            <text x="172" y="76" textAnchor="middle" fontSize="10" fontWeight="700" fill="#2563eb">θ₂ = ?</text>
            <text x="150" y="142" textAnchor="middle" fontSize="10" fontWeight="700" fill="#334155">Plane Mirror</text>
          </svg>
        );

      case 'q329':
        return (
          <svg viewBox="0 0 260 175" className="w-full max-w-[260px] h-auto">
            <rect x="42" y="14" width="68" height="20" rx="4" fill="#fca5a5" stroke="#dc2626" strokeWidth="1.6" />
            <text x="76" y="28" textAnchor="middle" fontSize="10" fontWeight="800" fill="#991b1b">− − −</text>
            <circle cx="150" cy="40" r="14" fill="#cbd5e1" stroke="#334155" strokeWidth="1.8" />
            <line x1="150" y1="54" x2="150" y2="108" stroke="#334155" strokeWidth="3" />
            <polygon points="108,82 192,82 208,156 92,156" fill="#f8fafc" stroke="#64748b" strokeWidth="1.6" />
            <line x1="150" y1="108" x2="122" y2="144" stroke="#d97706" strokeWidth="3" />
            <line x1="150" y1="108" x2="178" y2="144" stroke="#d97706" strokeWidth="3" />
            <text x="150" y="168" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#475569">Charged Electroscope</text>
          </svg>
        );

      case 'q332':
        return (
          <svg viewBox="0 0 320 115" className="w-full max-w-[320px] h-auto">
            <defs>
              <marker id="arr332" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#0f172a" />
              </marker>
            </defs>
            <circle cx="72" cy="52" r="18" fill="#fecaca" stroke="#dc2626" strokeWidth="2" />
            <text x="72" y="56" textAnchor="middle" fontSize="10" fontWeight="800" fill="#991b1b">+5 μC</text>
            <circle cx="248" cy="52" r="18" fill="#bfdbfe" stroke="#2563eb" strokeWidth="2" />
            <text x="248" y="56" textAnchor="middle" fontSize="10" fontWeight="800" fill="#1e40af">−4 μC</text>
            <line x1="94" y1="52" x2="138" y2="52" stroke="#0f172a" strokeWidth="2" markerEnd="url(#arr332)" />
            <line x1="226" y1="52" x2="182" y2="52" stroke="#0f172a" strokeWidth="2" markerEnd="url(#arr332)" />
            <line x1="72" y1="86" x2="248" y2="86" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 3" />
            <text x="160" y="102" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#0f172a">r = 30 cm</text>
          </svg>
        );

      case 'q336':
        return (
          <svg viewBox="0 0 320 120" className="w-full max-w-[320px] h-auto">
            <defs>
              <marker id="arr336" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#0f766e" />
              </marker>
            </defs>
            <line x1="88" y1="60" x2="232" y2="60" stroke="#0d9488" strokeWidth="2" markerEnd="url(#arr336)" />
            <path d="M 88 50 Q 160 12, 232 50" fill="none" stroke="#0d9488" strokeWidth="1.8" markerEnd="url(#arr336)" />
            <path d="M 88 70 Q 160 108, 232 70" fill="none" stroke="#0d9488" strokeWidth="1.8" markerEnd="url(#arr336)" />
            <circle cx="72" cy="60" r="16" fill="#fecaca" stroke="#dc2626" strokeWidth="2" />
            <text x="72" y="65" textAnchor="middle" fontSize="14" fontWeight="800" fill="#991b1b">+</text>
            <circle cx="248" cy="60" r="16" fill="#bfdbfe" stroke="#2563eb" strokeWidth="2" />
            <text x="248" y="65" textAnchor="middle" fontSize="14" fontWeight="800" fill="#1e40af">−</text>
          </svg>
        );

      case 'q341':
        return (
          <svg viewBox="0 0 300 135" className="w-full max-w-[300px] h-auto">
            <defs>
              <marker id="arr341" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#0d9488" />
              </marker>
            </defs>
            <rect x="45" y="18" width="180" height="14" rx="2" fill="#fecaca" stroke="#dc2626" strokeWidth="1.6" />
            <text x="135" y="29" textAnchor="middle" fontSize="10" fontWeight="800" fill="#991b1b">+  +  +  +  +  +</text>
            <rect x="45" y="102" width="180" height="14" rx="2" fill="#bfdbfe" stroke="#2563eb" strokeWidth="1.6" />
            <text x="135" y="113" textAnchor="middle" fontSize="10" fontWeight="800" fill="#1e40af">−  −  −  −  −  −</text>
            {[75, 115, 155, 195].map((x) => (
              <line key={x} x1={x} y1="36" x2={x} y2="96" stroke="#0d9488" strokeWidth="2" markerEnd="url(#arr341)" />
            ))}
            <text x="260" y="68" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0f172a">d = 0.75 cm</text>
            <text x="135" y="130" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0f766e">E = 1200 N/C</text>
          </svg>
        );

      case 'q349':
        return (
          <svg viewBox="0 0 280 135" className="w-full max-w-[280px] h-auto">
            <line x1="30" y1="68" x2="105" y2="68" stroke="#334155" strokeWidth="2.2" />
            <line x1="175" y1="68" x2="250" y2="68" stroke="#334155" strokeWidth="2.2" />
            <rect x="105" y="24" width="10" height="88" fill="#475569" />
            <rect x="165" y="24" width="10" height="88" fill="#475569" />
            <rect x="115" y="24" width="50" height="88" fill="#fef3c7" opacity="0.7" />
            <text x="140" y="18" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#0f172a">Separation d</text>
            <text x="72" y="45" textAnchor="middle" fontSize="10" fontWeight="700" fill="#334155">Area A</text>
            <text x="140" y="72" textAnchor="middle" fontSize="10" fontWeight="700" fill="#b45309">C</text>
          </svg>
        );

      case 'q357':
        return (
          <svg viewBox="0 0 300 145" className="w-full max-w-[300px] h-auto">
            <rect x="55" y="46" width="190" height="72" fill="none" stroke="#334155" strokeWidth="2.2" />
            <rect x="122" y="106" width="56" height="24" rx="4" fill="#e2e8f0" stroke="#0f172a" strokeWidth="1.6" />
            <text x="150" y="122" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0f172a">Battery</text>
            <rect x="118" y="34" width="64" height="24" rx="4" fill="#fed7aa" stroke="#ea580c" strokeWidth="1.8" />
            <text x="150" y="50" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#9a3412">Load R</text>
            <polyline points="105,46 105,14 195,14 195,46" fill="none" stroke="#2563eb" strokeWidth="2" />
            <circle cx="150" cy="14" r="11" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.8" />
            <text x="150" y="18" textAnchor="middle" fontSize="11" fontWeight="800" fill="#1d4ed8">?</text>
            <circle cx="55" cy="82" r="11" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.8" />
            <text x="55" y="86" textAnchor="middle" fontSize="11" fontWeight="800" fill="#15803d">A</text>
          </svg>
        );

      case 'q369':
        return (
          <svg viewBox="0 0 300 135" className="w-full max-w-[300px] h-auto">
            <line x1="35" y1="68" x2="78" y2="68" stroke="#334155" strokeWidth="2.2" />
            <line x1="222" y1="68" x2="265" y2="68" stroke="#334155" strokeWidth="2.2" />
            <line x1="78" y1="24" x2="78" y2="112" stroke="#334155" strokeWidth="2.2" />
            <line x1="222" y1="24" x2="222" y2="112" stroke="#334155" strokeWidth="2.2" />
            {[
              { y: 24, label: '24 Ω (R₁)' },
              { y: 54, label: '24 Ω (R₂)' },
              { y: 112, label: '24 Ω (R₈)' },
            ].map((b) => (
              <g key={b.label}>
                <line x1="78" y1={b.y} x2="222" y2={b.y} stroke="#334155" strokeWidth="2" />
                <rect x="115" y={b.y - 10} width="70" height="20" rx="4" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
                <text x="150" y={b.y + 4} textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#0369a1">{b.label}</text>
              </g>
            ))}
            <text x="150" y="88" textAnchor="middle" fontSize="14" fontWeight="800" fill="#475569">⋮</text>
          </svg>
        );

      case 'q374':
        return (
          <svg viewBox="0 0 260 140" className="w-full max-w-[260px] h-auto">
            <defs>
              <marker id="arr374" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#dc2626" />
              </marker>
            </defs>
            <ellipse cx="130" cy="72" rx="78" ry="28" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeDasharray="5 3" />
            <ellipse cx="130" cy="72" rx="48" ry="17" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeDasharray="5 3" />
            <line x1="130" y1="126" x2="130" y2="18" stroke="#b45309" strokeWidth="4" markerEnd="url(#arr374)" />
            <text x="142" y="28" fontSize="11" fontWeight="800" fill="#dc2626">I</text>
            <text x="130" y="132" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#1e3a8a">Concentric Field Loops B</text>
          </svg>
        );

      case 'q377':
        return (
          <svg viewBox="0 0 300 130" className="w-full max-w-[300px] h-auto">
            <defs>
              <marker id="arr377" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#dc2626" />
              </marker>
            </defs>
            <rect x="28" y="34" width="42" height="58" rx="4" fill="#fecaca" stroke="#dc2626" strokeWidth="1.8" />
            <text x="49" y="68" textAnchor="middle" fontSize="14" fontWeight="800" fill="#991b1b">N</text>
            <rect x="230" y="34" width="42" height="58" rx="4" fill="#bfdbfe" stroke="#2563eb" strokeWidth="1.8" />
            <text x="251" y="68" textAnchor="middle" fontSize="14" fontWeight="800" fill="#1e40af">S</text>
            {[46, 64, 82].map((y) => (
              <line key={y} x1="74" y1={y} x2="226" y2={y} stroke="#0d9488" strokeWidth="1.6" strokeDasharray="4 3" />
            ))}
            <line x1="150" y1="112" x2="150" y2="18" stroke="#b45309" strokeWidth="4" markerEnd="url(#arr377)" />
            <text x="164" y="26" fontSize="10" fontWeight="700" fill="#dc2626">I = 6 A</text>
            <text x="150" y="124" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0f172a">B = 0.5 T · L = 1.5 m</text>
          </svg>
        );

      case 'q379':
        return (
          <svg viewBox="0 0 340 130" className="w-full max-w-[340px] h-auto">
            {/* Option 1: Parallel R */}
            <text x="85" y="18" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#0f172a">Circuit (1): Parallel</text>
            <line x1="25" y1="54" x2="145" y2="54" stroke="#334155" strokeWidth="2" />
            <polyline points="48,54 48,96 122,96 122,54" fill="none" stroke="#334155" strokeWidth="2" />
            <circle cx="85" cy="54" r="14" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
            <text x="85" y="58" textAnchor="middle" fontSize="11" fontWeight="800" fill="#0369a1">G</text>
            <rect x="65" y="86" width="40" height="20" rx="3" fill="#fed7aa" stroke="#ea580c" strokeWidth="1.5" />
            <text x="85" y="100" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#9a3412">R_s</text>

            {/* Option 2: Series R */}
            <text x="255" y="18" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#0f172a">Circuit (2): Series</text>
            <line x1="185" y1="68" x2="325" y2="68" stroke="#334155" strokeWidth="2" />
            <circle cx="225" cy="68" r="14" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
            <text x="225" y="72" textAnchor="middle" fontSize="11" fontWeight="800" fill="#0369a1">G</text>
            <rect x="264" y="58" width="44" height="20" rx="3" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
            <text x="286" y="72" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#15803d">R_m</text>
          </svg>
        );

      case 'q391':
        return (
          <svg viewBox="0 0 300 135" className="w-full max-w-[300px] h-auto">
            <rect x="75" y="22" width="150" height="88" rx="6" fill="none" stroke="#475569" strokeWidth="14" />
            <rect x="64" y="40" width="22" height="52" rx="4" fill="#fecaca" stroke="#dc2626" strokeWidth="2" />
            <rect x="214" y="40" width="22" height="52" rx="4" fill="#bfdbfe" stroke="#2563eb" strokeWidth="2" />
            <text x="38" y="69" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#dc2626">Np, Vp</text>
            <text x="262" y="69" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#2563eb">Ns, Vs</text>
            <text x="150" y="70" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#0f172a">AC Iron Core</text>
          </svg>
        );

      case 'q400':
        return (
          <svg viewBox="0 0 420 115" className="w-full max-w-[420px] h-auto">
            {[
              { label: 'Radio', color: '#94a3b8', x: 10 },
              { label: 'Micro', color: '#38bdf8', x: 68 },
              { label: 'IR', color: '#fb923c', x: 126 },
              { label: 'Visible', color: '#22c55e', x: 184 },
              { label: 'UV', color: '#a855f7', x: 242 },
              { label: 'X-Ray', color: '#6366f1', x: 300 },
              { label: 'Gamma', color: '#ef4444', x: 358 },
            ].map((band) => (
              <g key={band.label}>
                <rect x={band.x} y="34" width="54" height="34" rx="4" fill={band.color} opacity="0.88" />
                <text x={band.x + 27} y="55" textAnchor="middle" fontSize="9.5" fontWeight="800" fill="#ffffff">{band.label}</text>
              </g>
            ))}
            <text x="210" y="20" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0f172a">
              ← Longer Wavelength (λ) | Shorter Wavelength (λ) →
            </text>
            <text x="210" y="92" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0f766e">
              Lower Frequency (f) ← | → Higher Frequency (f) &amp; Energy
            </text>
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div className="my-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center" dir="ltr">
      {renderSvg()}
      <span className="text-[11px] font-medium text-slate-400 mt-2">
        {isAr ? 'الشكل التوضيحي للسؤال' : 'Question Reference Figure'}
      </span>
    </div>
  );
};
