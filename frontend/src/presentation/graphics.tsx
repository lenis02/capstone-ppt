import { useId } from "react";

/** 보조 도형 — 참고 슬라이드와 맞춘 청록 포인트 */

type SvgProps = { className?: string };

export function ArrowRightClean({ className }: SvgProps) {
  return (
    <svg
      className={`text-teal-500 ${className ?? ""}`}
      viewBox="0 0 120 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M8 24h72M72 16l16 8-16 8"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="svg-path-draw"
      />
    </svg>
  );
}

export function ThreeStepFlow({ className }: SvgProps) {
  const box =
    "rounded-lg border border-teal-100 bg-white px-3 py-2.5 text-[clamp(0.85rem,1.5vw,1rem)] font-semibold text-slate-800 shadow-sm";
  const arrow = "text-teal-500 float-soft select-none text-lg font-bold";
  return (
    <div className={`flex flex-wrap items-center gap-x-2 gap-y-2 ${className ?? ""}`} aria-hidden>
      <span className={box}>회의·자료</span>
      <span className={arrow}>→</span>
      <span className={box}>정리·체크</span>
      <span className={arrow}>→</span>
      <span className={box}>다음 일정</span>
    </div>
  );
}

export function VerticalTimeline({ className }: SvgProps) {
  return (
    <svg
      className={`text-slate-300 ${className ?? ""}`}
      viewBox="0 0 36 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <line
        x1="18"
        y1="14"
        x2="18"
        y2="206"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="4 8"
      />
      <circle cx="18" cy="44" r="7" className="fill-white stroke-teal-500" strokeWidth="2" />
      <circle
        cx="18"
        cy="110"
        r="7"
        className="fill-teal-500 stroke-teal-600 pulse-ring"
        strokeWidth="2"
        style={{ transformOrigin: "18px 110px" }}
      />
      <circle cx="18" cy="176" r="7" className="fill-white stroke-teal-500" strokeWidth="2" />
    </svg>
  );
}

export function PhaseStrip({ className }: SvgProps) {
  return (
    <div
      className={`flex flex-wrap items-stretch gap-0 overflow-hidden rounded-xl border border-teal-100 bg-white text-[clamp(0.9rem,1.6vw,1.08rem)] font-bold text-slate-800 shadow-sm ${className ?? ""}`}
    >
      {["전", "중", "후"].map((label, i) => (
        <span
          key={label}
          className={`relative flex min-w-[3.25rem] flex-1 items-center justify-center px-4 py-3 ${
            i > 0 ? "border-l border-teal-100" : ""
          } ${i === 1 ? "bg-teal-50 text-teal-700" : ""}`}
        >
          {label}
          {i < 2 && (
            <span className="pointer-events-none absolute -right-2 top-1/2 z-10 -translate-y-1/2 text-teal-400">
              →
            </span>
          )}
        </span>
      ))}
    </div>
  );
}

export function ProblemBridge({ className }: SvgProps) {
  const ink = "#0a0a0a";
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden>
      <path d="M16 5v11" stroke={ink} strokeWidth="6" strokeLinecap="round" />
      <path d="M11 16L16 25L21 16Z" fill={ink} />
    </svg>
  );
}

/** 핵심 문제 슬라이드 — 좌·우 카드 연결 화살표 */
export function ProblemSolutionArrow({ className }: SvgProps) {
  return (
    <div className={`flex items-center justify-center text-teal-600 ${className ?? ""}`} aria-hidden>
      <svg className="h-14 w-10 lg:hidden" viewBox="0 0 40 96" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M20 8v68M20 76l-8-10M20 76l8-10"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg className="hidden h-10 w-24 lg:block" viewBox="0 0 96 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8 20h68M76 20l-10-8M76 20l-10 8"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

/** 핵심 문제 슬라이드 — 좌·우 카드 연결용 짧은 검은 화살표 (정사각형 뷰박스, 선+채움 머리) */
export function PainPointRowConnector({
  className,
  direction = "horizontal",
}: {
  className?: string;
  direction?: "horizontal" | "vertical";
}) {
  const ink = "#0a0a0a";
  const shaft = { stroke: ink, strokeWidth: 6, strokeLinecap: "round" as const };
  if (direction === "vertical") {
    return (
      <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden>
        <path d="M16 5v11" {...shaft} />
        <path d="M11 16L16 25L21 16Z" fill={ink} />
      </svg>
    );
  }
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden>
      <path d="M5 16H17" {...shaft} />
      <path d="M17 11L26 16L17 21Z" fill={ink} />
    </svg>
  );
}

/** 개요(오프닝) 우측 — 사물 형상 없이 선·리듬만으로 테마를 주는 추상 모티프 */
export function OpeningMotifFigure({
  className,
  fullBleed,
  viewportBg,
}: SvgProps & { fullBleed?: boolean; viewportBg?: boolean }) {
  const raw = useId().replace(/:/g, "");
  const gFlow = `om-flow-${raw}`;
  const gVignette = `om-vig-${raw}`;

  const frame =
    viewportBg && fullBleed
      ? "h-full min-h-0 w-full rounded-none border-0 shadow-none"
      : fullBleed
        ? "h-full min-h-0 w-full rounded-none border-0 shadow-none lg:border-l lg:border-teal-100/70"
        : "mx-auto aspect-[3/4] max-h-[min(56vh,24rem)] w-full max-w-[20rem] rounded-xl border border-teal-100 shadow-sm lg:mx-0";

  const slice = Boolean(fullBleed);

  return (
    <figure
      className={`pointer-events-none ${fullBleed || viewportBg ? "m-0 h-full min-h-0 w-full" : "w-full max-w-full"} ${className ?? ""}`}
    >
      <div
        className={`relative overflow-hidden bg-gradient-to-br from-white via-teal-50/35 to-teal-100/20 ${frame}`}
      >
        <svg
          className={`h-full w-full ${fullBleed ? "min-h-0" : "min-h-[12rem]"}`}
          viewBox="0 0 260 340"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio={slice ? "xMidYMid slice" : "xMidYMid meet"}
          aria-hidden
        >
          <defs>
            <linearGradient id={gFlow} x1="8%" y1="12%" x2="92%" y2="88%">
              <stop offset="0%" stopColor="#5eead4" stopOpacity="0.2" />
              <stop offset="42%" stopColor="#14b8a6" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#0f766e" stopOpacity="0.35" />
            </linearGradient>
            <radialGradient id={gVignette} cx="50%" cy="38%" r="78%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="72%" stopColor="#ccfbf1" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#99f6e4" stopOpacity="0.38" />
            </radialGradient>
          </defs>

          <rect width="260" height="340" fill={`url(#${gVignette})`} />

          <path
            className="opening-motif-pulse-a"
            d="M-12 78 C44 28 108 96 172 62 S252 40 276 96"
            stroke={`url(#${gFlow})`}
            strokeWidth="2.15"
            strokeLinecap="round"
          />
          <path
            className="opening-motif-pulse-b"
            d="M288 188 C220 152 168 228 96 198 S-8 176 -20 242"
            stroke={`url(#${gFlow})`}
            strokeWidth="1.65"
            strokeLinecap="round"
          />
          <path
            className="opening-motif-pulse-c"
            d="M32 268 C88 232 156 312 228 276 S268 228 248 352"
            stroke={`url(#${gFlow})`}
            strokeWidth="1.35"
            strokeLinecap="round"
            strokeDasharray="10 14"
            opacity="0.85"
          />

          <path
            d="M196 48a72 72 0 0 1 0 144"
            stroke="#2dd4bf"
            strokeWidth="1.1"
            strokeLinecap="round"
            opacity="0.35"
          />
          <path
            d="M64 118a52 52 0 0 0 104 0"
            stroke="#0d9488"
            strokeWidth="1.25"
            strokeLinecap="round"
            opacity="0.4"
          />

          <circle cx="196" cy="120" r="3.2" className="fill-teal-600/55" />
          <circle cx="72" cy="210" r="2.4" className="fill-teal-500/45" />
          <circle cx="188" cy="268" r="2.2" className="fill-teal-700/40" />
        </svg>
      </div>
      <figcaption className="sr-only">오프닝용 추상 선 장식 그래픽</figcaption>
    </figure>
  );
}
