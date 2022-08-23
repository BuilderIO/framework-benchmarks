import { Framework } from './frameworks.js';

import angularDashboardData from '../../reports/dashboard/angular_simple.js';
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

import angularTodoData from '../../reports/todo/angular_simple.js';
import astroTodoData from '../../reports/todo/astro_simple.js';
import freshTodoData from '../../reports/todo/fresh_simple.js';
import gatsbyTodoData from '../../reports/todo/gatsby_simple.js';
import hydrogenTodoData from '../../reports/todo/hydrogen_simple.js';
import litTodoData from '../../reports/todo/lit_simple.js';
import markoTodoData from '../../reports/todo/marko_simple.js';
import nextTodoData from '../../reports/todo/next_simple.js';
import nuxt3TodoData from '../../reports/todo/nuxt3_simple.js';
import qwikTodoData from '../../reports/todo/qwik_simple.js';
import solidTodoData from '../../reports/todo/solid_simple.js';
import svelteTodoData from '../../reports/todo/svelte_simple.js';

import angularHelloWorldData from '../../reports/angular_simple.js';
import astroHelloWorldData from '../../reports/astro_simple.js';
import freshHelloWorldData from '../../reports/fresh_simple.js';
import gatsbyHelloWorldData from '../../reports/gatsby_simple.js';
import hydrogenHelloWorldData from '../../reports/hydrogen_simple.js';
import litHelloWorldData from '../../reports/lit_simple.js';
import markoHelloWorldData from '../../reports/marko_simple.js';
import nextHelloWorldData from '../../reports/next_simple.js';
import nuxt3HelloWorldData from '../../reports/nuxt3_simple.js';
import qwikHelloWorldData from '../../reports/qwik_simple.js';
import solidHelloWorldData from '../../reports/solid_simple.js';
import svelteHelloWorldData from '../../reports/svelte_simple.js';

export type LighthouseDataWithName = ReportData & {
  name: string;
};

export type LighthouseDataMap = Partial<Record<Framework, ReportData>>;

export const dashboardData: LighthouseDataMap = {
  angular: angularDashboardData,
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

export const todoData: LighthouseDataMap = {
  angular: angularTodoData,
  astro: astroDashboardData,
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

export const helloWorldData: LighthouseDataMap = {
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

export const dashboardDataList: LighthouseDataWithName[] = Object.keys(
  dashboardData
).map((name) => ({
  name,
  ...dashboardData[name as Framework]!,
}));

export const todoDataList: LighthouseDataWithName[] = Object.keys(todoData).map(
  (name) => ({
    name,
    ...todoData[name as Framework]!,
  })
);

export const helloWorldDataList: LighthouseDataWithName[] = Object.keys(
  helloWorldData
).map((name) => ({
  name,
  ...helloWorldData[name as Framework]!,
}));

export interface ReportData {
  ttiNumber?: number;
  tbtNumber?: number;
  lcpNumber?: number;
  fcpNumber?: number;
  FCP?: string;
  TBT?: string;
  TTI?: string;
  LCP?: string;
  jsKb?: number;
  totalKb?: number;
  score?: number;
}
