import { useLayoutEffect, useRef, useState } from "react";
import { SLIDE_REGISTRY } from "./slides";

export type SlideOutlineRailProps = {
  activeIndex: number;
  direction: 1 | -1;
  onSelectSlide?: (index: number) => void;
};

const dotAnchor = "absolute top-1/2 z-[2] -translate-x-1/2 -translate-y-1/2";
const labelAnchor = "absolute top-0 -translate-x-1/2";

export function SlideOutlineRail({ activeIndex, direction, onSelectSlide }: SlideOutlineRailProps) {
  const [motionGen, setMotionGen] = useState(0);
  const initialized = useRef(false);

  useLayoutEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      return;
    }
    setMotionGen((g) => g + 1);
  }, [activeIndex]);

  const motionClass =
    motionGen > 0
      ? direction === 1
        ? "outline-rail-three--motion-fwd"
        : "outline-rail-three--motion-back"
      : "";

  const lastIndex = SLIDE_REGISTRY.length - 1;
  const leftIdx = activeIndex > 0 ? activeIndex - 1 : null;
  const rightIdx = activeIndex < lastIndex ? activeIndex + 1 : null;
  const hasPrev = leftIdx !== null;
  const hasNext = rightIdx !== null;
  /** 이전 칸이 곧 첫 슬라이드면 왼쪽 바깥 실선 없음(25%↔50%만) */
  const prevLineToEdge = hasPrev && leftIdx! > 0;
  /** 다음 칸이 곧 마지막 슬라이드면 오른쪽 바깥 실선 없음(50%↔75%만) */
  const nextLineToEdge = hasNext && rightIdx! < lastIndex;

  const renderDot = (slideIndex: number, variant: "prev" | "current" | "next", posClass: string) => {
    const entry = SLIDE_REGISTRY[slideIndex];
    return (
      <button
        type="button"
        title={entry.outlineLabel}
        aria-label={`${entry.outlineLabel} 슬라이드로 이동`}
        aria-current={variant === "current" ? "step" : undefined}
        onClick={(e) => {
          e.stopPropagation();
          onSelectSlide?.(slideIndex);
        }}
        className={`outline-rail-dot ${dotAnchor} ${posClass} block rounded-full border-4 border-teal-600 bg-white shadow-none transition-[box-shadow] duration-300 hover:shadow-[0_0_0_6px_rgba(13,148,136,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500 ${
          variant === "current"
            ? "size-10 sm:size-11"
            : "size-8 opacity-95 sm:size-9"
        }`}
      />
    );
  };

  const renderLabel = (
    slideIndex: number,
    variant: "prev" | "current" | "next",
    posClass: string,
  ) => {
    const entry = SLIDE_REGISTRY[slideIndex];
    return (
      <p
        className={`${labelAnchor} ${posClass} line-clamp-2 max-w-[min(30vw,9rem)] min-h-[2.5rem] px-1 text-center text-[clamp(0.65rem,2.1vw,0.82rem)] font-semibold leading-tight sm:min-h-[2.75rem] sm:max-w-[9rem] sm:text-[0.82rem] ${
          variant === "current" ? "text-teal-700" : "text-slate-500"
        }`}
      >
        {entry.outlineLabel}
      </p>
    );
  };

  return (
    <nav
      className="outline-rail relative z-10 shrink-0 border-b border-teal-100/90 bg-white px-[clamp(0.65rem,2.2vw,1.25rem)] py-3 sm:py-4"
      aria-label="슬라이드 목차"
    >
      <div className="outline-rail-three w-full">
        <div
          key={`${motionGen}-${direction}`}
          className={`outline-rail-three-motion outline-rail-fullbleed flex flex-col gap-2 ${motionClass}`}
        >
          <div className="outline-rail-three-dots relative min-h-[3.25rem] w-full sm:min-h-[3.5rem]">
            {hasPrev ? (
              <div
                className={`outline-rail-line ${
                  prevLineToEdge ? "outline-rail-line--to-center-from-prev-edge" : "outline-rail-line--to-center-from-prev-inner"
                }`}
                aria-hidden
              />
            ) : null}
            {hasNext ? (
              <div
                className={`outline-rail-line ${
                  nextLineToEdge ? "outline-rail-line--from-center-to-next-edge" : "outline-rail-line--from-center-to-next-inner"
                }`}
                aria-hidden
              />
            ) : null}

            {hasPrev ? renderDot(leftIdx!, "prev", "left-[20%]") : null}
            {renderDot(activeIndex, "current", "left-1/2")}
            {hasNext ? renderDot(rightIdx!, "next", "left-[80%]") : null}
          </div>

          <div className="relative min-h-[2.75rem] w-full sm:min-h-[3rem]">
            {hasPrev ? renderLabel(leftIdx!, "prev", "left-[20%]") : null}
            {renderLabel(activeIndex, "current", "left-1/2")}
            {hasNext ? renderLabel(rightIdx!, "next", "left-[80%]") : null}
          </div>
        </div>
      </div>
    </nav>
  );
}
