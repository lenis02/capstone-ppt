import type { ReactNode } from "react";

/** 참고 슬라이드 좌상단 브랜드 느낌 */
export function DeckBrand({ className }: { className?: string }) {
  return (
    <p
      className={`slide-enter-delay-1 mb-2 ml-1 text-[0.65rem] font-bold tracking-[0.12em] text-slate-400 sm:text-[1.25rem] ${className ?? ""}`}
    >
      2026학년도 1학기 캡스톤디자인
      <span className="ml-1 text-teal-500">멘탈뿌수</span>
    </p>
  );
}

/** 큰 청록 따옴표 + 본문 (정의문 스타일) */
export function QuotedDefinition({ children }: { children: ReactNode }) {
  return (
    <blockquote className="slide-enter-delay-2 relative my-8">
      <span
        className="pointer-events-none absolute -left-1 -top-2 font-serif text-[clamp(2.75rem,7vw,4.5rem)] font-bold leading-none text-teal-300 select-none"
        aria-hidden
      >
        &ldquo;
      </span>
      <div className="relative z-[1] pl-[clamp(1.5rem,3.8vw,2.5rem)] pr-2 pt-1 text-[clamp(1.1rem,2.05vw,1.38rem)] text-center font-medium leading-relaxed text-ink">
        {children}
      </div>
      <span
        className="pointer-events-none absolute -top-2 right-0 font-serif text-[clamp(2.75rem,7vw,4.5rem)] font-bold leading-none text-teal-300 select-none sm:right-4"
        aria-hidden
      >
        &rdquo;
      </span>
    </blockquote>
  );
}

/** 형광펜 강조 */
export function Hi({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-sm bg-yellow-100 px-1 py-0.5 font-semibold text-ink [box-decoration-break:clone]">
      {children}
    </span>
  );
}

/** 정의문 → 하위 요약으로 이어지는 L자 연결선 */
export function LBranch({ className }: { className?: string }) {
  return (
    <div
      className={`slide-enter-delay-3 ml-1 h-[2.75rem] w-[2.75rem] shrink-0 self-end border-l-2 border-b-2 border-slate-300 rounded-bl-lg sm:h-12 sm:w-12 ${className ?? ""}`}
      aria-hidden
    />
  );
}

/** 연한 청록 라운드 박스 (하위 포인트) */
export function PointBox({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`interactive-surface rounded-xl border border-teal-100 bg-teal-50/90 px-4 py-3 text-[clamp(0.98rem,1.75vw,1.12rem)] leading-snug text-ink shadow-sm ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

/** 참고 레이아웃: 좌 약 2/3 · 우 약 1/3 */
export function SlidePhotoGrid({ left, right }: { left: ReactNode; right: ReactNode }) {
  return (
    <div className="mx-auto grid w-full max-w-[72rem] grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
      <div className="min-w-0 lg:col-span-8">{left}</div>
      <div className="flex min-w-0 justify-center lg:col-span-4 lg:justify-end lg:self-center">{right}</div>
    </div>
  );
}

export function SubPointStack({ children }: { children: ReactNode }) {
  return (
    <div className="slide-enter-delay-3 flex min-w-0 flex-1 flex-col gap-3">{children}</div>
  );
}
