import { useCallback, useEffect, useState } from "react";
import { getSlideEntry, SLIDE_COUNT } from "./slides";
import { SlideOutlineRail } from "./SlideOutlineRail";

export function Deck() {
  const [index, setIndex] = useState(0);
  const [revealStep, setRevealStep] = useState(0);
  /** 슬라이드 전환 방향: 다음 장 = 1, 이전 장 = -1 (애니메이션) */
  const [enterDir, setEnterDir] = useState<1 | -1>(1);

  const entry = getSlideEntry(index);

  useEffect(() => {
    setRevealStep(0);
  }, [index]);

  const goNext = useCallback(() => {
    const e = getSlideEntry(index);
    if (e.hasReveal && revealStep === 0) {
      setRevealStep(1);
      return;
    }
    setEnterDir(1);
    setRevealStep(0);
    setIndex((i) => Math.min(i + 1, SLIDE_COUNT - 1));
  }, [index, revealStep]);

  const goPrev = useCallback(() => {
    const e = getSlideEntry(index);
    if (e.hasReveal && revealStep === 1) {
      setRevealStep(0);
      return;
    }
    setEnterDir(-1);
    setRevealStep(0);
    setIndex((i) => Math.max(i - 1, 0));
  }, [index, revealStep]);

  const goToSlide = useCallback((i: number) => {
    if (i === index) return;
    setEnterDir(i > index ? 1 : -1);
    setRevealStep(0);
    setIndex(Math.max(0, Math.min(i, SLIDE_COUNT - 1)));
  }, [index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "Home") {
        e.preventDefault();
        setEnterDir(1);
        setRevealStep(0);
        setIndex(0);
      } else if (e.key === "End") {
        e.preventDefault();
        setEnterDir(-1);
        setRevealStep(0);
        setIndex(SLIDE_COUNT - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  const onMainClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const w = rect.width;
    if (x > w * 0.55) goNext();
    else if (x < w * 0.45) goPrev();
  };

  const progress = ((index + 1) / SLIDE_COUNT) * 100;
  const Comp = entry.Component;
  const showRevealHint = Boolean(entry.hasReveal && revealStep === 0);

  return (
    <div className="flex h-full min-h-0 flex-col bg-white">
      <div className="h-0.5 w-full shrink-0 bg-teal-400" aria-hidden />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <SlideOutlineRail activeIndex={index} direction={enterDir} onSelectSlide={goToSlide} />
        <div
          className="relative min-h-0 min-w-0 flex-1 bg-white"
          onClick={onMainClick}
          role="presentation"
        >
          <div
            key={index}
            className={`flex h-full min-h-0 flex-col justify-center px-[clamp(0.85rem,3vw,2.25rem)] py-[clamp(0.65rem,2.2vh,1.5rem)] sm:px-[clamp(1.1rem,3.5vw,2.75rem)] ${
              enterDir === 1 ? "deck-enter-forward" : "deck-enter-back"
            }`}
          >
            <Comp revealStep={revealStep} />
          </div>
        </div>
      </div>
      <footer className="relative z-10 border-t border-teal-200 bg-white px-[clamp(0.65rem,2.2vw,1.5rem)] py-2">
        <div className="mx-auto flex max-w-[72rem] flex-wrap items-center justify-between gap-x-2 gap-y-2 text-[clamp(0.7rem,1.3vw,0.85rem)] text-slate-500">
          <div className="flex flex-wrap items-center gap-2 gap-y-2">
            <span className="font-semibold tabular-nums text-slate-800">
              {index + 1} / {SLIDE_COUNT}
              {entry.hasReveal ? (
                <span className="ml-2 font-normal text-teal-600">· 단계 {revealStep + 1}/2</span>
              ) : null}
            </span>
          </div>
          {showRevealHint ? (
            <span className="order-last w-full text-center text-[0.68rem] text-teal-600 sm:order-none sm:w-auto sm:flex-1 sm:text-center">
              다음 클릭으로 핵심 문제 상세 표시
            </span>
          ) : (
            <span className="hidden flex-1 sm:block" aria-hidden />
          )}
          <div className="mx-2 h-0.5 max-w-md flex-1 overflow-hidden rounded-full bg-teal-100 sm:max-w-xs" aria-hidden>
            <div
              className="h-full rounded-full bg-teal-500 transition-[width] duration-500 ease-[cubic-bezier(0.34,1.25,0.64,1)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="hidden shrink-0 text-slate-400 sm:inline">
            <kbd className="rounded border border-slate-200 bg-slate-50 px-1 py-0.5 font-sans text-[0.85em]">←</kbd>{" "}
            <kbd className="rounded border border-slate-200 bg-slate-50 px-1 py-0.5 font-sans text-[0.85em]">→</kbd>
          </span>
        </div>
      </footer>
    </div>
  );
}
