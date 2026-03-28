import type { ComponentType } from "react";

export type SlideRenderProps = {
  /** `hasReveal` 슬라이드에서만 0 → 1로 증가 */
  revealStep: number;
};

export type SlideEntry = {
  id: string;
  /** 상단 점 목차·툴팁용 짧은 제목 */
  outlineLabel: string;
  Component: ComponentType<SlideRenderProps>;
  /** true면 같은 슬라이드에서 다음 클릭 시 revealStep만 올라가고, 그다음 클릭에 다음 슬라이드로 이동 */
  hasReveal?: boolean;
};
