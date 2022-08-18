import { Framework } from './frameworks.js';

// import angularDashboardData from '../../reports/dashboard/angular_simple.js';
import astroDashboardData from '../../reports/dashboard/astro_simple.js';
import freshDashboardData from '../../reports/dashboard/fresh_simple.js';
import gatsbyDashboardData from '../../reports/dashboard/gatsby_simple.js';
import hydrogenDashboardData from '../../reports/dashboard/hydrogen_simple.js';
import litDashboardData from '../../reports/dashboard/lit_simple.js';
import markoDashboardData from '../../reports/dashboard/marko_simple.js';
import nextDashboardData from '../../reports/dashboard/next_simple.js';
import nuxt3DashboardData from '../../reports/dashboard/nuxt3_simple.js';
import qwikDashboardData from '../../reports/dashboard/qwik_simple.js';
import solidDashboardData from '../../reports/dashboard/solid_simple.js';
import svelteDashboardData from '../../reports/dashboard/svelte_simple.js';

export type LighthouseDataWithName = ReportData & {
  name: string;
};

export type LighthouseDataMap = Partial<Record<Framework, ReportData>>;

export const getTodoData = async () => {
  const [
    angularTodoData,
    astroTodoData,
    freshTodoData,
    gatsbyTodoData,
    hydrogenTodoData,
    litTodoData,
    markoTodoData,
    nextTodoData,
    nuxt3TodoData,
    qwikTodoData,
    solidTodoData,
    svelteTodoData,
  ] = await Promise.all([
    import('../../reports/todo/angular_simple.js'),
    import('../../reports/todo/astro_simple.js'),
    import('../../reports/todo/fresh_simple.js'),
    import('../../reports/todo/gatsby_simple.js'),
    import('../../reports/todo/hydrogen_simple.js'),
    import('../../reports/todo/lit_simple.js'),
    import('../../reports/todo/marko_simple.js'),
    import('../../reports/todo/next_simple.js'),
    import('../../reports/todo/nuxt3_simple.js'),
    import('../../reports/todo/qwik_simple.js'),
    import('../../reports/todo/solid_simple.js'),
    import('../../reports/todo/svelte_simple.js'),
  ]);

  return {
    angular: angularTodoData,
    astro: astroTodoData,
    fresh: freshTodoData,
    gatsby: gatsbyTodoData,
    hydrogen: hydrogenTodoData,
    lit: litTodoData,
    marko: markoTodoData,
    next: nextTodoData,
    nuxt3: nuxt3TodoData,
    qwik: qwikTodoData,
    solid: solidTodoData,
    svelte: svelteTodoData,
  };
};

export const getHelloWorldData = async () => {
  const [
    angularHelloWorldData,
    astroHelloWorldData,
    freshHelloWorldData,
    gatsbyHelloWorldData,
    hydrogenHelloWorldData,
    litHelloWorldData,
    markoHelloWorldData,
    nextHelloWorldData,
    nuxt3HelloWorldData,
    qwikHelloWorldData,
    solidHelloWorldData,
    svelteHelloWorldData,
  ] = await Promise.all([
    import('../../reports/angular_simple.js'),
    import('../../reports/astro_simple.js'),
    import('../../reports/fresh_simple.js'),
    import('../../reports/gatsby_simple.js'),
    import('../../reports/hydrogen_simple.js'),
    import('../../reports/lit_simple.js'),
    import('../../reports/marko_simple.js'),
    import('../../reports/next_simple.js'),
    import('../../reports/nuxt3_simple.js'),
    import('../../reports/qwik_simple.js'),
    import('../../reports/solid_simple.js'),
    import('../../reports/svelte_simple.js'),
  ]);

  return {
    angular: angularHelloWorldData,
    astro: astroHelloWorldData,
    fresh: freshHelloWorldData,
    gatsby: gatsbyHelloWorldData,
    hydrogen: hydrogenHelloWorldData,
    lit: litHelloWorldData,
    marko: markoHelloWorldData,
    next: nextHelloWorldData,
    nuxt3: nuxt3HelloWorldData,
    qwik: qwikHelloWorldData,
    solid: solidHelloWorldData,
    svelte: svelteHelloWorldData,
  };
};

export const dashboardData: LighthouseDataMap = {
  // angular: angularDashboardData,
  astro: astroDashboardData,
  fresh: freshDashboardData,
  gatsby: gatsbyDashboardData,
  hydrogen: hydrogenDashboardData,
  lit: litDashboardData,
  marko: markoDashboardData,
  next: nextDashboardData,
  nuxt3: nuxt3DashboardData,
  qwik: qwikDashboardData,
  solid: solidDashboardData,
  svelte: svelteDashboardData,
};

export const getTodoDataList = async () => {
  const todoData = await getTodoData();
  return Object.keys(todoData).map((name) => ({
    name,
    ...(todoData as any)[name]!,
  })) as LighthouseDataWithName[];
};
export const getHelloWorldDataList = async () => {
  const helloWorldData = await getHelloWorldData();
  return Object.keys(helloWorldData).map((name) => ({
    name,
    ...(helloWorldData as any)[name]!,
  })) as LighthouseDataWithName[];
};

export const dashboardDataList: LighthouseDataWithName[] = Object.keys(
  dashboardData
).map((name) => ({
  name,
  ...dashboardData[name as Framework]!,
}));

export interface ReportData {
  ttiNumber?: number;
  FCP?: string;
  TBT?: string;
  TTI?: string;
  LCP?: string;
  jsKb?: number;
  totalKb?: number;
  score?: number;
}
