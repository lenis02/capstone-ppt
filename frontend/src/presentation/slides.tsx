import { Fragment } from 'react';
import {
  OpeningMotifFigure,
  PainPointRowConnector,
  ProblemBridge,
} from './graphics';
import type { SlideEntry, SlideRenderProps } from './slideTypes';
import {
  DeckBrand,
  Hi,
  LBranch,
  PointBox,
  QuotedDefinition,
  SlidePhotoGrid,
} from './slidePatterns';

/** 1장: 서비스명 ‘컨펌’ 전용 */
const titleServiceName =
  'slide-enter-delay-1 text-[clamp(2.25rem,5.2vw,3.6rem)] font-bold leading-none tracking-tight text-slate-900';

const titleServiceTagline =
  'slide-enter-delay-1 mt-3 ml-1 text-[clamp(1.4rem,2.15vw,1.8rem)] font-semibold leading-snug text-slate-600';

/** 2장 이후 본제목 — 동일 규격 */
const titleSlide =
  'slide-enter-delay-1 mt-3 text-[clamp(1.5rem,3.25vw,2.3rem)] font-bold leading-[1.15] tracking-tight text-slate-900';

const body =
  'text-[clamp(0.98rem,1.75vw,1.12rem)] leading-relaxed text-slate-600';

const bodyTight = 'text-[1.2rem] leading-snug text-slate-600 sm:text-[1.1rem]';

const problemConclusion =
  'text-[clamp(1.4rem,2vw,1.4rem)] font-bold leading-snug text-slate-900';

/** 0: 오프닝 — 뷰포트 오른쪽 50% 배경 모티프 + SlidePhotoGrid로 본문 배치 복구 */
function SlideOpening(_props: SlideRenderProps) {
  return (
    <div className="relative isolate w-full">
      <div
        className="pointer-events-none fixed inset-y-0 right-0 z-[5] h-dvh w-[50vw]"
        aria-hidden
      >
        <OpeningMotifFigure
          fullBleed
          viewportBg
          className="slide-enter-delay-2"
        />
        <div
          className="absolute inset-y-0 left-0 z-[1] w-[clamp(2.75rem,14vw,6rem)] bg-gradient-to-r from-white from-[8%] via-white/55 via-45% to-transparent"
          aria-hidden
        />
      </div>

      <div className="relative z-20 w-full">
        <SlidePhotoGrid
          left={
            <>
              <DeckBrand />
              <h1 className={titleServiceName}>컨펌(Conf:rm)</h1>
              <p className={titleServiceTagline}>PM을 위한 회의관리 에이전트</p>
              <div className="headline-rule" />

              <p
                className={`${body} slide-enter-delay-3 mt-5 max-w-[36rem] text-slate-500`}
              >
                인공지능학부 소프트웨어전공
                <br />
                정원영 김민재 성세현
              </p>
            </>
          }
          right={
            <div
              className="hidden min-h-[min(52vh,22rem)] w-full max-w-[20rem] lg:block"
              aria-hidden
            />
          }
        />
      </div>
    </div>
  );
}

const PROBLEM_PAIN_POINTS = [
  {
    title: '회의 중에 리스크·충돌을 바로 확인하기 어렵다',
    lead: '회의 중 논의 내용이 기존 정책이나 결정과 충돌해도 즉각 인지 불가',
    outcome: '추가적인 논의 필요',
  },
  {
    title: '왜 그렇게 결정했는지 금방 기억에서 사라진다',
    lead: '요약만 보면 이전 회의에서 ‘왜(Why)’ 결정했었는지 논거가 사라짐',
    outcome: '이전 회의를 다시 찾아봐야 함',
  },
  {
    title: '회의가 잘 됐는지 숫자로 보기 어렵다',
    lead: '회의의 질을 객관적으로 측정할 지표의 부재',
    outcome: '반복되는 비효율적인 회의',
  },
] as const;

/** 핵심 기능 슬라이드 — 각 행과 AS-IS 카드 제목이 1:1로 대응 */
const SOLUTION_FEATURES = [
  {
    title: '회의 중에 바로 짚어 주는 알림',
    asIs: '지금 나온 말이 정책·이전 결정과 맞는지, 회의 안에서는 거의 바로 확인하기 어렵다.',
    toBe: '실시간 STT로 들은 내용을 기획서·회의록 등과 Vector DB에 올려 두고, RAG로 질의·대조해 문맥이 어긋나면 즉시 알려 준다.',
  },
  {
    title: '예전 논의·결정, 나중에도 이어서 보기',
    asIs: '요약만 남거나 기록이 흩어져 “왜 그렇게 됐지?”를 다시 찾기 번거롭다.',
    toBe: '회의·결정을 구조화해 저장하고, RAG로 “당시 논거·맥락”을 물어보면 관련 기록을 이어서 찾아 준다.',
  },
  {
    title: '발언·시간을 모아 보는 회의 리포트',
    asIs: '누가 얼마나 말했는지, 시간은 어떻게 썼는지 등을 한눈에 보기 어렵다.',
    toBe: '발언·시간 로그를 모아 대시보드로 보여 주고, 필요하면 LLM·RAG로 회고용 요약을 돕는다.',
  },
] as const;

const MS_WTI_TOP5_IMG = '/ms-wti-top5-obstacles.png';
const MS_WTI_SOURCE_URL =
  'https://www.microsoft.com/en-us/worklab/work-trend-index/will-ai-fix-work';

/** 1: 핵심 문제 — (0) 통계·인포그래픽 → (1) 핵심 문제 본문 */
function SlideProblemReveal({ revealStep }: SlideRenderProps) {
  if (revealStep === 0) {
    return (
      <div className="mx-auto flex h-full min-h-0 w-full max-w-[90rem] flex-col justify-center px-1 sm:px-2">
        <div className="slide-enter grid min-h-0 w-full grid-cols-1 items-center gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(14rem,0.65fr)] lg:gap-8 xl:gap-10">
          <figure className="flex min-h-0 min-w-0 flex-col justify-center lg:pr-2">
            <div className="flex min-h-[min(52vh,22rem)] flex-1 items-center justify-center rounded-xl border border-slate-200/90 bg-white p-2 shadow-lg sm:min-h-[min(58vh,26rem)] lg:min-h-[min(72vh,36rem)] xl:min-h-[min(78vh,40rem)]">
              <img
                src={MS_WTI_TOP5_IMG}
                alt="Microsoft Work Trend Index: 생산성을 방해하는 상위 5가지 요인. 1위 비효율적 회의 등"
                className="max-h-full w-full object-contain object-center"
              />
            </div>
            <figcaption className="mt-2 text-center text-[0.68rem] leading-snug text-slate-500 lg:text-left">
              Microsoft Work Trend Index — Top 5 Obstacles to Productivity
            </figcaption>
          </figure>

          <div className="flex min-h-0 min-w-0 flex-col justify-center text-balance lg:max-w-none">
            <div className="mx-auto w-full max-w-[26rem] text-center lg:mx-0 lg:max-w-[22rem] lg:text-left xl:max-w-[24rem]">
              <p className="text-[clamp(1.02rem,1.85vw,1.22rem)] font-semibold leading-relaxed text-slate-800">
                미국 기업들은 매년 비효율적인 회의로 인해 약{' '}
                <strong className="font-bold text-teal-700">370억 달러</strong>
                (한화 약{' '}
                <strong className="font-bold text-teal-700">49조 원</strong>)의
                손실 발생
              </p>
              <p className="mt-4 text-[clamp(1.02rem,1.85vw,1.22rem)] font-semibold leading-relaxed text-slate-800">
                또한 직장인{' '}
                <span className="tabular-nums text-[clamp(1.35rem,2.6vw,1.85rem)] font-black text-teal-600">
                  71%
                </span>
                가 회의가 비생산적이고
                <br /> 비효율적이라고 느낀다고 응답
              </p>
              <p className="mt-6 text-[0.72rem] leading-snug text-slate-500">
                인포그래픽 출처:{' '}
                <a
                  href={MS_WTI_SOURCE_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-medium text-teal-700 underline decoration-teal-300 underline-offset-2 hover:text-teal-800"
                >
                  Microsoft Work Trend Index — Will AI Fix Work?
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex h-full min-h-0 w-full max-w-[72rem] flex-col justify-center">
      <div className="min-w-0">
        <h2 className={titleSlide}>핵심 문제</h2>
        <div className="headline-rule" />

        <div className="slide-enter-delay-3 mt-5 flex gap-2 sm:gap-3">
          <div className="hidden shrink-0 sm:flex sm:items-center" aria-hidden>
            <LBranch />
          </div>
          <div className="grid min-w-0 flex-1 grid-cols-1 gap-x-3 gap-y-4 sm:grid-cols-[minmax(0,1fr)_2.75rem_minmax(0,1fr)] sm:items-stretch">
            {PROBLEM_PAIN_POINTS.map((item, i) => (
              <Fragment key={item.title}>
                <div
                  className={`flex min-h-0 min-w-0 flex-col ${
                    i === 0
                      ? 'slide-enter-delay-2'
                      : i === 1
                        ? 'slide-enter-delay-3'
                        : 'slide-enter-delay-4'
                  }`}
                >
                  <PointBox className="h-full min-h-0">
                    <p
                      className={`${bodyTight} mt-2 font-medium text-slate-800`}
                    >
                      {item.lead}
                    </p>
                  </PointBox>
                </div>
                <div
                  className={`flex items-center justify-center sm:w-full ${
                    i === 0
                      ? 'slide-enter-delay-2'
                      : i === 1
                        ? 'slide-enter-delay-3'
                        : 'slide-enter-delay-4'
                  }`}
                >
                  <PainPointRowConnector
                    direction="vertical"
                    className="h-10 w-10 sm:hidden"
                  />
                  <PainPointRowConnector
                    direction="horizontal"
                    className="hidden h-10 w-10 sm:block"
                  />
                </div>
                <div
                  className={`flex min-h-0 min-w-0 justify-center items-center rounded-xl border-2 border-teal-100 bg-white p-3 shadow-md sm:p-3.5 ${
                    i === 0
                      ? 'slide-enter-delay-2'
                      : i === 1
                        ? 'slide-enter-delay-3'
                        : 'slide-enter-delay-4'
                  }`}
                >
                  <p className="text-[1.4rem] font-semibold leading-snug text-slate-800 sm:text-[1.4rem]">
                    {item.outcome}
                  </p>
                </div>
              </Fragment>
            ))}
          </div>
        </div>

        <div className="slide-enter-delay-3 mt-6 sm:mt-7">
          <QuotedDefinition>
            정보의 연속성 단절로 인해 <Hi>보이지 않는 비용 발생</Hi>
          </QuotedDefinition>
        </div>

        <div
          className="slide-enter-delay-3 mt-4 flex justify-center"
          aria-hidden
        >
          <ProblemBridge className="h-10 w-10 shrink-0 sm:h-11 sm:w-11" />
        </div>

        <div className="slide-enter-delay-4 mx-auto mt-2 max-w-[40rem] rounded-2xl border border-teal-200 bg-gradient-to-br from-teal-50 to-white px-5 py-4 text-center shadow-sm sm:px-6 sm:text-left">
          <p className={`${problemConclusion} text-center text-balance`}>
            이를 조율하고 기억하는 PM의 역량에 따라{' '}
            <Hi>프로젝트의 질이 좌우됨</Hi>
          </p>
        </div>
      </div>
    </div>
  );
}

/** 2: 핵심 기능 — 핵심 문제와 동일 폭 정렬, 3×2 그리드(As-is | 연노랑 To-be) */
function SlideCoreFeatures(_props: SlideRenderProps) {
  const featureCellText =
    'text-[clamp(1.12rem,2.15vw,1.42rem)] font-normal leading-relaxed sm:font-medium';
  const featureTitleText =
    'text-[clamp(1.18rem,2.2vw,1.48rem)] font-bold leading-snug tracking-tight text-slate-900';

  return (
    <div className="mx-auto flex h-full min-h-0 w-full max-w-[min(92rem,100%)] flex-col justify-center gap-4">
      <div className="min-w-0">
        <h2 className={titleSlide}>핵심 기능</h2>
        <div className="headline-rule" />
        <p className="slide-enter-delay-2 mt-1 text-[0.88rem] font-semibold text-teal-800 sm:text-[0.92rem]">
          Solution · As-is → To-be
        </p>

        <div className="slide-enter-delay-3 mt-5 min-h-0 overflow-y-auto lg:min-h-[min(54vh,30rem)]">
          <div
            className="hidden overflow-hidden rounded-2xl border border-teal-100/80 bg-white text-[clamp(1rem,1.8vw,1.15rem)] shadow-[0_4px_6px_-1px_rgba(13,148,136,0.06),0_20px_40px_-16px_rgba(15,23,42,0.1)] ring-1 ring-slate-900/[0.04] sm:grid sm:grid-cols-2 sm:gap-0"
            role="table"
            aria-label="As-is와 To-be 비교"
          >
            <div
              className="border-b border-r border-slate-100/90 bg-gradient-to-b from-slate-50/95 to-white px-6 py-4 text-[0.82rem] font-bold uppercase tracking-[0.2em] text-teal-700 sm:px-7 sm:py-4.5 sm:text-[0.9rem]"
              role="columnheader"
            >
              As-is
            </div>
            <div
              className="border-b border-slate-100/80 bg-gradient-to-br from-amber-50 via-amber-50 to-amber-100/40 px-6 py-4 text-[0.82rem] font-bold uppercase tracking-[0.2em] text-amber-950/75 sm:px-7 sm:py-4.5 sm:text-[0.9rem]"
              role="columnheader"
            >
              To-be
            </div>
            {SOLUTION_FEATURES.map((item, i) => (
              <Fragment key={item.title}>
                <div
                  className={`group border-r border-slate-100/90 bg-white px-6 py-6 transition-colors duration-200 hover:bg-slate-50/40 sm:px-7 sm:py-7 ${
                    i < SOLUTION_FEATURES.length - 1
                      ? 'border-b border-slate-100/80'
                      : ''
                  }`}
                  role="cell"
                >
                  <div className="flex gap-4 sm:gap-5">
                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-100 to-teal-50 text-[0.95rem] font-bold tabular-nums text-teal-700 shadow-sm ring-1 ring-teal-200/50 sm:h-12 sm:w-12 sm:text-[1.05rem]"
                      aria-hidden
                    >
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className={`${featureCellText} text-slate-600`}>
                        {item.asIs}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className={`relative border-l-4 border-l-teal-400/35 bg-gradient-to-br from-amber-50/95 via-amber-50/80 to-yellow-50/50 px-6 py-6 sm:px-7 sm:py-7 ${
                    i < SOLUTION_FEATURES.length - 1
                      ? 'border-b border-amber-200/25'
                      : ''
                  }`}
                  role="cell"
                >
                  <h3 className={featureTitleText}>{item.title}</h3>
                  <p
                    className={`${featureCellText} mt-3 pl-0.5 text-slate-800`}
                  >
                    {item.toBe}
                  </p>
                </div>
              </Fragment>
            ))}
          </div>

          <div className="flex flex-col gap-5 sm:hidden">
            {SOLUTION_FEATURES.map((item, i) => (
              <div
                key={item.title}
                className="overflow-hidden rounded-2xl border border-teal-100/80 bg-white shadow-[0_4px_6px_-1px_rgba(13,148,136,0.05),0_12px_28px_-12px_rgba(15,23,42,0.1)] ring-1 ring-slate-900/[0.04]"
              >
                <div className="border-b border-slate-100/90 bg-gradient-to-b from-slate-50/90 to-white px-5 pb-5 pt-4">
                  <p className="text-[0.78rem] font-bold uppercase tracking-[0.18em] text-teal-700">
                    As-is
                  </p>
                  <div className="mt-3 flex gap-3.5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-100 to-teal-50 text-[0.95rem] font-bold text-teal-700 shadow-sm ring-1 ring-teal-200/50">
                      {i + 1}
                    </span>
                    <p
                      className={`${featureCellText} min-w-0 text-slate-600`}
                    >
                      {item.asIs}
                    </p>
                  </div>
                </div>
                <div className="border-l-4 border-l-teal-400/35 bg-gradient-to-br from-amber-50/95 to-yellow-50/45 px-5 py-4">
                  <h3 className={featureTitleText}>{item.title}</h3>
                  <p className="mt-2.5 text-[0.78rem] font-bold uppercase tracking-[0.18em] text-amber-950/70">
                    To-be
                  </p>
                  <p className={`${featureCellText} mt-2.5 pl-0.5 text-slate-800`}>
                    {item.toBe}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* <p className="slide-enter-delay-4 mx-auto max-w-[48rem] text-center text-[clamp(0.88rem,1.65vw,1.02rem)] font-semibold leading-snug text-slate-800">
        단순 기록을 넘어, 팀의 히스토리를 이해하고 리스크를 선제적으로 관리하는{' '}
        <span className="text-teal-800">
          &lsquo;가상 시니어 PM&rsquo; 서비스
        </span>
      </p> */}
    </div>
  );
}

type GanttTask = { label: string; start: number; span: number };

const GANTT_MONTHS = ['3월', '4월', '5월', '6월'] as const;
const MONTH_COUNT = GANTT_MONTHS.length;

/** 참고 간트표와 동일한 수행기간 매핑 (컨펌 과제 기준) */
const GANTT_TASKS: GanttTask[] = [
  { label: '주제 구체화 및 역할 분담', start: 0, span: 1 },
  { label: '유사서비스 및 기술 조사', start: 0, span: 2 },
  { label: '회의록·프로젝트 문서 수집 및 분석', start: 1, span: 1 },
  { label: '시스템 요구사항 정의 및 기능 설계', start: 1, span: 1 },
  { label: '정보 추출·실행계획 생성 로직 구현', start: 1, span: 2 },
  { label: '웹 UI 및 결과 시각화 기능 구현', start: 2, span: 1 },
  { label: '통합 테스트 및 기능 보완', start: 2, span: 2 },
  { label: '결과보고서·발표자료 작성', start: 3, span: 1 },
];

function GanttChart() {
  return (
    <div className="slide-enter-delay-2 overflow-x-auto rounded-xl border-2 border-teal-200 bg-white shadow-md">
      <div
        className="grid min-w-[min(100%,48rem)] grid-cols-[minmax(14.5rem,1.65fr)_repeat(4,minmax(5.5rem,1fr))] sm:min-w-[52rem] lg:min-w-[58rem]"
        role="table"
        aria-label="학기 수행 일정 간트"
      >
        <div
          className="border-b-2 border-teal-200 bg-teal-100 px-4 py-3.5 text-left text-[clamp(1rem,1.6vw,1.15rem)] font-bold text-slate-800 sm:px-5 sm:py-4 sm:text-[clamp(1.05rem,1.5vw,1.22rem)]"
          role="columnheader"
        >
          세부내용
        </div>
        {GANTT_MONTHS.map((m) => (
          <div
            key={m}
            className="border-b-2 border-l border-teal-200 bg-teal-100 px-3 py-3.5 text-center text-[clamp(1rem,1.6vw,1.15rem)] font-bold text-slate-800 sm:px-4 sm:py-4 sm:text-[clamp(1.05rem,1.5vw,1.22rem)]"
            role="columnheader"
          >
            {m}
          </div>
        ))}

        {GANTT_TASKS.map((task, i) => (
          <Fragment key={task.label}>
            <div
              className={`flex items-center border-b border-teal-200 px-3 py-3.5 text-[clamp(0.95rem,1.55vw,1.12rem)] font-semibold leading-snug text-slate-800 sm:px-5 sm:py-4 sm:text-[clamp(1.02rem,1.45vw,1.18rem)] ${
                i % 2 === 0 ? 'bg-slate-50/80' : 'bg-white'
              }`}
              role="rowheader"
            >
              {task.label}
            </div>
            <div
              className={`relative col-span-4 grid grid-cols-4 border-b border-teal-200 ${
                i % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'
              }`}
              role="cell"
            >
              {GANTT_MONTHS.map((m) => (
                <div
                  key={m}
                  className="min-h-[3rem] border-l border-teal-100 first:border-l-0 sm:min-h-[3.25rem]"
                  aria-hidden
                />
              ))}
              <div className="pointer-events-none absolute inset-x-0 top-1/2 z-[1] h-4 -translate-y-1/2 px-0 sm:h-[1.15rem]">
                <div
                  className="gantt-bar-anim h-full rounded-sm bg-teal-500/75 shadow-sm ring-1 ring-teal-600/15"
                  style={{
                    marginLeft: `${(task.start / MONTH_COUNT) * 100}%`,
                    width: `${(task.span / MONTH_COUNT) * 100}%`,
                    animationDelay: `${i * 0.06}s`,
                  }}
                />
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

/** 3: 학기 수행 일정 (간트) */
function SlideMilestoneGantt(_props: SlideRenderProps) {
  return (
    <div className="mx-auto w-full max-w-[min(92rem,100%)]">
      <h2 className={titleSlide}>일정</h2>
      <div className="headline-rule" />
      <p className={`${body} slide-enter-delay-2 mt-4 max-w-[48rem]`}>
        <strong className="text-slate-900">3~6월</strong> 기준 수행기간 · 가로
        막대는 과제 단계별 수행 구간
      </p>
      <div className="slide-enter-delay-2 mt-5">
        <GanttChart />
      </div>
      <p
        className={`${body} slide-enter-delay-3 mt-4 text-center text-slate-500 sm:text-left`}
      >
        수행기간 — 2026학년도 1학기(3~6월) 기준
      </p>
    </div>
  );
}

export const SLIDE_REGISTRY: SlideEntry[] = [
  { id: 'opening', outlineLabel: '개요', Component: SlideOpening },
  {
    id: 'problem-reveal',
    outlineLabel: '핵심 문제',
    Component: SlideProblemReveal,
    hasReveal: true,
  },
  {
    id: 'core-features',
    outlineLabel: '핵심 기능',
    Component: SlideCoreFeatures,
  },
  {
    id: 'milestone-gantt',
    outlineLabel: '일정',
    Component: SlideMilestoneGantt,
  },
];

export const SLIDE_COUNT = SLIDE_REGISTRY.length;

export function getSlideEntry(index: number): SlideEntry {
  return SLIDE_REGISTRY[index] ?? SLIDE_REGISTRY[0];
}
