import { Framework } from './frameworks';

import angularTodoData from '../../reports/todo/angular';
import astroTodoData from '../../reports/astro'
import freshTodoData from '../../reports/fresh'
import gatsbyTodoData from '../../reports/gatsby'
import hydrogenTodoData from '../../reports/hydrogen'
import litTodoData from '../../reports/lit'
import markoTodoData from '../../reports/marko'
import nextTodoData from '../../reports/next'
import nuxt3TodoData from '../../reports/nuxt3'
import qwikTodoData from '../../reports/qwik'
import solidTodoData from '../../reports/solid'
import svelteTodoData from '../../reports/svelte'

import angularHelloWorldData from '../../reports/angular';
import astroHelloWorldData from '../../reports/astro'
import freshHelloWorldData from '../../reports/fresh'
import gatsbyHelloWorldData from '../../reports/gatsby'
import hydrogenHelloWorldData from '../../reports/hydrogen'
import litHelloWorldData from '../../reports/lit'
import markoHelloWorldData from '../../reports/marko'
import nextHelloWorldData from '../../reports/next'
import nuxt3HelloWorldData from '../../reports/nuxt3'
import qwikHelloWorldData from '../../reports/qwik'
import solidHelloWorldData from '../../reports/solid'
import svelteHelloWorldData from '../../reports/svelte'


export type LighthouseDataWithName = LH.Result & {
  name: string;
};

export type LighthouseDataMap = Partial<Record<Framework, LH.Result>>;

export const todoData: LighthouseDataMap = {
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

export const dashboardData: LighthouseDataMap = {};

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

export const dashboardDataList: LighthouseDataWithName[] = Object.keys(
  dashboardData
).map((name) => ({
  name,
  ...dashboardData[name as Framework]!,
}));
