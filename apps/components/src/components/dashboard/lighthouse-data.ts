import { Framework } from './frameworks.js';

// import angularDashboardData from '../../reports/dashboard/angular.js';
import astroDashboardData from '../../reports/dashboard/astro.js';
import freshDashboardData from '../../reports/dashboard/fresh.js';
import gatsbyDashboardData from '../../reports/dashboard/gatsby.js';
import hydrogenDashboardData from '../../reports/dashboard/hydrogen.js';
import litDashboardData from '../../reports/dashboard/lit.js';
import markoDashboardData from '../../reports/dashboard/marko.js';
import nextDashboardData from '../../reports/dashboard/next.js';
import nuxt3DashboardData from '../../reports/dashboard/nuxt3.js';
import qwikDashboardData from '../../reports/dashboard/qwik.js';
import solidDashboardData from '../../reports/dashboard/solid.js';
import svelteDashboardData from '../../reports/dashboard/svelte.js';

export type LighthouseDataWithName = LH.Result & {
  name: string;
};

export type LighthouseDataMap = Partial<Record<Framework, LH.Result>>;

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
    import('../../reports/todo/angular.js'),
    import('../../reports/todo/astro.js'),
    import('../../reports/todo/fresh.js'),
    import('../../reports/todo/gatsby.js'),
    import('../../reports/todo/hydrogen.js'),
    import('../../reports/todo/lit.js'),
    import('../../reports/todo/marko.js'),
    import('../../reports/todo/next.js'),
    import('../../reports/todo/nuxt3.js'),
    import('../../reports/todo/qwik.js'),
    import('../../reports/todo/solid.js'),
    import('../../reports/todo/svelte.js'),
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
    import('../../reports/angular.js'),
    import('../../reports/astro.js'),
    import('../../reports/fresh.js'),
    import('../../reports/gatsby.js'),
    import('../../reports/hydrogen.js'),
    import('../../reports/lit.js'),
    import('../../reports/marko.js'),
    import('../../reports/next.js'),
    import('../../reports/nuxt3.js'),
    import('../../reports/qwik.js'),
    import('../../reports/solid.js'),
    import('../../reports/svelte.js'),
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
