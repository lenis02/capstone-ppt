type FigureSlotProps = {
  caption?: string;
  ratio?: "video" | "tall";
  className?: string;
};

/**
 * 우측 1/3 비주얼 영역. src는 비워 두었습니다.
 */
export function FigureSlot({ caption = "이미지", ratio = "video", className }: FigureSlotProps) {
  const ratioCls =
    ratio === "tall"
      ? "aspect-[3/4] max-h-[min(56vh,24rem)] w-full max-w-[20rem]"
      : "aspect-[4/3] max-h-[min(42vh,20rem)] w-full";

  return (
    <figure className={`w-full max-w-full ${className ?? ""}`}>
      <div
        className={`relative overflow-hidden rounded-xl border border-teal-100 bg-teal-50/40 shadow-sm ${ratioCls}`}
      >
        <img src="" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white/86 px-3">
          <span className="rounded-lg border border-dashed border-teal-200 bg-white px-3 py-2 text-center text-[clamp(0.78rem,1.35vw,0.92rem)] font-semibold text-teal-700">
            {caption}
          </span>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-[0.65rem] text-slate-400">
        <code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-[0.62rem]">src</code>에 경로 입력
      </figcaption>
    </figure>
  );
}
