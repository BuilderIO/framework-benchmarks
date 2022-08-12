# Framework Benchmarks

Test each framework for it's performance, particularly common Lighthouse and CWV metrics as applications scale

## How it works

We created a basic starting point for each framework in the `frameworks/` folder.

We then build and serve each project, and run Lighthouse on each project with puppeteer, and measure the kb of JS downloaded, FCP ([First Contentful Paint](https://web.dev/first-contentful-paint/)), LCP ([First Contentful Paint](https://web.dev/first-contentful-paint/)), TBT ([Total Blocking Time](https://web.dev/tbt/)), and TTI ([Time to Interactive](https://web.dev/interactive/)).

### Sample output

#### Hello World:

Just a few links and `<h1>Hello World</h1>`

```
┌─────────┬───────────┬─────────┬───────┬─────────┬──────────┬─────────┐
│ (index) │   name    │   TTI   │ JS kb │   FCP   │   TBT    │   LCP   │
├─────────┼───────────┼─────────┼───────┼─────────┼──────────┼─────────┤
│    0    │  'qwik'   │ '0.6 s' │   0   │ '0.6 s' │  '0 ms'  │ '0.6 s' │
│    1    │  'astro'  │ '0.7 s' │   0   │ '0.7 s' │  '0 ms'  │ '0.7 s' │
│    2    │  'fresh'  │ '0.8 s' │   0   │ '0.8 s' │  '0 ms'  │ '0.8 s' │
│    3    │  'marko'  │ '0.8 s' │  15   │ '0.8 s' │  '0 ms'  │ '1.1 s' │
│    4    │  'solid'  │ '1.1 s' │  18   │ '1.1 s' │  '0 ms'  │ '1.1 s' │
│    5    │ 'svelte'  │ '1.3 s' │  17   │ '1.3 s' │  '0 ms'  │ '1.3 s' │
│    6    │  'nuxt2'  │ '1.6 s' │  90   │ '0.8 s' │ '140 ms' │ '0.8 s' │
│    7    │  'nuxt3'  │ '1.9 s' │  120  │ '1.9 s' │  '0 ms'  │ '2.1 s' │
│    8    │  'remix'  │ '2.0 s' │  62   │ '1.2 s' │ '70 ms'  │ '1.2 s' │
│    9    │  'next'   │ '2.1 s' │  81   │ '0.6 s' │ '40 ms'  │ '0.8 s' │
│   10    │ 'angular' │ '2.4 s' │  228  │ '2.3 s' │ '40 ms'  │ '2.3 s' │
└─────────┴───────────┴─────────┴───────┴─────────┴──────────┴─────────┘
```

#### Todo App:

A basic interactive Todo app

_Note: Lighthouse fails to run for Angular on this test, for reasons unclear to me at this time_

```
┌─────────┬──────────┬─────────┬───────┬─────────┬─────────┬─────────┐
│ (index) │   name   │   TTI   │ JS kb │   FCP   │   TBT   │   LCP   │
├─────────┼──────────┼─────────┼───────┼─────────┼─────────┼─────────┤
│    0    │ 'astro'  │ '0.6 s' │  19   │ '0.6 s' │ '0 ms'  │ '0.6 s' │
│    1    │  'qwik'  │ '0.7 s' │   0   │ '0.7 s' │ '0 ms'  │ '1.2 s' │
│    2    │ 'fresh'  │ '0.8 s' │   8   │ '0.8 s' │ '0 ms'  │ '0.8 s' │
│    3    │ 'marko'  │ '0.8 s' │  16   │ '0.8 s' │ '0 ms'  │ '0.9 s' │
│    4    │ 'solid'  │ '1.1 s' │  18   │ '1.1 s' │ '0 ms'  │ '1.1 s' │
│    5    │ 'svelte' │ '1.4 s' │  18   │ '1.4 s' │ '0 ms'  │ '1.5 s' │
│    6    │ 'nuxt2'  │ '1.6 s' │  91   │ '1.0 s' │ '40 ms' │ '1.0 s' │
│    7    │ 'remix'  │ '2.0 s' │  62   │ '1.8 s' │ '60 ms' │ '1.8 s' │
│    8    │ 'nuxt3'  │ '2.0 s' │  121  │ '2.0 s' │ '0 ms'  │ '2.1 s' │
│    9    │  'next'  │ '2.1 s' │  81   │ '0.6 s' │ '30 ms' │ '0.8 s' │
└─────────┴──────────┴─────────┴───────┴─────────┴─────────┴─────────┘
```

#### Build times:

```
┌─────────┬──────────┬──────────────────────┐
│ (index) │   Name   │ Build Time (Seconds) │
├─────────┼──────────┼──────────────────────┤
│    0    │ 'fresh'  │         0            │
│    1    │ 'remix'  │         1.3          │
│    2    │ 'svelte' │         2.3          │
│    3    │ 'astro'  │         3.3          │
│    4    │  'qwik'  │         3.4          │
│    5    │ 'solid'  │         4.2          │
│    6    │  'next'  │         4.3          │
│    7    │ 'marko'  │         7.3          │
│    8    │ 'nuxt2'  │         8.8          │
│    9    │ 'nuxt3'  │         11.9         │
└─────────┴──────────┴──────────────────────┘
```

## Running locally

### Prereqs

You will need [Node.js](https://nodejs.org/en/download/) >= 16.14.0 and [Deno](https://deno.land/manual/getting_started/installation) installed locally

### Setup

After cloning this repo, install dependencies:

```sh
npm install
```

Now you can start running the below scripts:

### Install

Use the install script to install dependencies of each framework:

```sh
npm run install
```

### Generate

First, we must generate the component code for each framework via Mitosis.

```sh
cd apps/components
npm install
npm run build
```

### Build

Use the build script to build all frameworks (be sure to `install` first as described above):

```sh
npm run build
```

### Measure

To measure the weight of each framework (after you ran `install` and `build`):

```sh
npm run measure
```
