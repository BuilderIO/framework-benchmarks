# Framework Benchmarks

Test each framework for it's performance, particularly common Lighthouse and CWV metrics as applications scale

**Important**: This is not a measure of "is framework x better than y". There are many tradeoffs to weight when choosing the best framework for you - such as DX, features, familiarity, ecosystem, documentation, etc. These benchmarks only show a part of the picture

### Goals

The goals for this project are to understand the performance tradeoffs of popular frameworks in real world-ish scenarios. We want to assume non trivial codebases and imperfect code and conditions, so to see how each framework holds up to real world scenarios and scale.

### Status

This project is in initial development. Do not put too much weight on these current results, there is still much more to do to ensure accuracy, consistency, and fairness.

**Contributions are welcome!**

## How it works

### Methodology

We created a basic starting point for each framework in the `frameworks/` folder using each framework's suggested starter/cli.

We then create basic example components and use [Mitosis](https://github.com/builderio/mitosis) to compile them to best-effort idiomatic code for each framework. This will never be perfectly optimized code

We then build and serve each project, and run Lighthouse on each project with puppeteer, including with [emulation of slow devices and networks](https://github.com/GoogleChrome/lighthouse/blob/master/docs/emulation.md) (aka includes CPU and network throttling), and measure:

- **FCP**: [First Contentful Paint](https://web.dev/first-contentful-paint/)
- **TBT**: [Total Blocking Time](https://web.dev/tbt/)
- **TTI**: [Time to Interactive](https://web.dev/interactive/)
- **Eager JS Kib**: the KiB of JS that is eagerly downloaded and executed from `<script>` tags for the initial page load. This is the actual size transferred over the network, including compression
- **Total KiB**: the total KiB transferred with the given page, including HTML, CSS, prefetched resources, etc. Also known as the "total byte weight". This is the actual size transferred over the network, including compression

We sort the results by TTI, ascending

We are also experimenting with looking at other metrics, such as [build times](#build-times)

### The Frameworks

Alphabetically:

- [Astro](https://astro.build/) - generated via their official CLI, with Solid for the interactive parts 
- [Fresh](https://fresh.deno.dev/) - generated via their official CLI
- [Marko](https://markojs.com/) - generated via their official CLI
- [Next.js](https://nextjs.org/) - generated via their official CLI
- [Nuxt 2](https://nuxtjs.org/) - generated via their official CLI
- [Nuxt 3](https://v3.nuxtjs.org/) - generated via their official CLI (in beta)
- [Qwik](https://qwik.builder.io/) - generated with Qwik City (meta framework)
- [Remix](https://remix.run/) - generated via their official CLI
- [Solid](https://www.solidjs.com/) - generated with Solid Start (meta framework)
- [Svelte](https://svelte.dev/) - generated with Svelte Kit (meta framework)

### Sample output

**Important:**: This project is still in initial development. Do not put too much weight on these current results, there is still much more to do to ensure accuracy, consistency, and fairness.

#### Hello World:

Just a few links and `<h1>Hello World</h1>`. [Source](https://github.com/BuilderIO/framework-benchmarks/blob/main/apps/components/src/components/hello-world.lite.tsx)

```
┌─────────┬───────────┬─────────┬─────────┬────────────┬──────────────┬───────────┐
│ (index) │   name    │   TTI   │   FCP   │    TBT     │ Eager JS KiB │ Total KiB │
├─────────┼───────────┼─────────┼─────────┼────────────┼──────────────┼───────────┤
│    0    │  'marko'  │ '0.6 s' │ '0.6 s' │   '0 ms'   │      15      │    20     │
│    1    │  'qwik'   │ '0.6 s' │ '0.6 s' │   '0 ms'   │      0       │     8     │
│    2    │  'astro'  │ '0.6 s' │ '0.6 s' │   '0 ms'   │      0       │     7     │
│    3    │  'fresh'  │ '0.8 s' │ '0.8 s' │   '0 ms'   │      0       │    27     │
│    4    │ 'solid'   │ '1.1 s' │ '1.1 s' │   '0 ms'   │      14      │    16     │
│    5    │ 'svelte'  │ '1.3 s' │ '1.3 s' │   '0 ms'   │      18      │    21     │
│    6    │  'nuxt3'  │ '1.9 s' │ '1.9 s' │   '0 ms'   │     121      │   1145    │
│    7    │ 'angular' │ '2.4 s' │ '2.3 s' │  '20 ms'   │     233      │    236    │
│    8    │  'nuxt2'  │ '3.3 s' │ '0.8 s' │  '360 ms'  │     375      │    385    │
│    9    │  'remix'  │ '3.5 s' │ '1.3 s' │  '200 ms'  │     358      │    363    │
│   10    │  'next'   │ '3.8 s' │ '0.6 s' │  '230 ms'  │     366      │    376    │
└─────────┴───────────┴─────────┴─────────┴────────────┴──────────────┴───────────┘
```

#### Todo App:

A very simple/trivial interactive Todo app. [Source](https://github.com/BuilderIO/framework-benchmarks/blob/main/apps/components/src/components/todo-app.lite.tsx)

```
┌─────────┬───────────┬─────────┬─────────┬──────────┬──────────────┬───────────┐
│ (index) │   name    │   TTI   │   FCP   │   TBT    │ Eager JS KiB │ Total KiB │
├─────────┼───────────┼─────────┼─────────┼──────────┼──────────────┼───────────┤
│    0    │  'qwik'   │ '0.7 s' │ '0.7 s' │  '0 ms'  │      2       │    55     │
│    1    │  'fresh'  │ '0.8 s' │ '0.8 s' │  '0 ms'  │      9       │    36     │
│    2    │  'marko'  │ '0.8 s' │ '0.8 s' │  '0 ms'  │      16      │    22     │
│    3    │ 'solid'   │ '0.9 s' │ '0.9 s' │ '0 ms'   │      15      │    17     │
│    3    │  'astro'  │ '1.2 s' │ '0.7 s' │  '0 ms'  │      20      │    29     │
│    4    │ 'svelte'  │ '1.3 s' │ '1.3 s' │  '0 ms'  │      19      │    23     │
│    5    │  'nuxt3'  │ '2.0 s' │ '2.0 s' │  '0 ms'  │     122      │   1146    │
│    6    │ 'angular' │ '2.4 s' │ '2.3 s' │ '40 ms'  │     233      │    236    │
│    8    │  'nuxt2'  │ '3.2 s' │ '1.5 s' │ '130 ms' │     376      │    386    │
│    9    │  'remix'  │ '3.5 s' │ '1.3 s' │ '210 ms' │     358      │    363    │
│    10   │  'next'   │ '3.8 s' │ '0.7 s' │ '210 ms' │     366      │    377    │
└─────────┴───────────┴─────────┴─────────┴──────────┴──────────────┴───────────┘
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

## Todo

Next things we want to add:

- Time to interaction
- More complex examples that more closesly emulate real world sites and apps
- Execute multiple runs per test and averate the results
- Move test running to be remote, such as in GH actions

Contributions welcome!

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
