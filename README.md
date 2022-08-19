# Framework Benchmarks

Test each framework for it's performance, particularly common Lighthouse and CWV metrics as applications scale

**Important**: This is not a measure of "is framework x better than y". There are many tradeoffs to weigh when choosing the best framework for you - such as DX, features, familiarity, ecosystem, documentation, etc. These benchmarks only show a part of the picture.

### Goals

The goal for this project are to understand the performance tradeoffs of popular frameworks in real world-ish scenarios. We want to assume non trivial codebases and imperfect code and conditions, so to see how each framework holds up to real world scenarios and scale.

We are intentionally not focused on client side rendering performance, for that please use [Stefan Krause](https://github.com/krausest)'s great [js-framework-benchmark](https://github.com/krausest/js-framework-benchmark)

### Status

This project is in initial development. Do not put too much weight on these current results, there is still much more to do to ensure accuracy, consistency, and fairness.

**Contributions are welcome!**

## How it works

### Methodology

We created a basic starting point for each framework in the `frameworks/` folder using each framework's suggested starter/cli.

We then create basic example components and use [Mitosis](https://github.com/builderio/mitosis) to compile them to best-effort idiomatic code for each framework. This will never be perfectly optimized code

We then build and serve each project, and run Lighthouse on each project with puppeteer, including with [emulation of slow devices and networks](https://github.com/GoogleChrome/lighthouse/blob/master/docs/emulation.md) (aka includes CPU and network throttling), and measure:

- **FCP**: [First Contentful Paint](https://web.dev/first-contentful-paint/) (lower is better)
- **LCP**: [Largest Contentful Paint](https://web.dev/largest-contentful-paint/) (lower is better)
- **TBT**: [Total Blocking Time](https://web.dev/tbt/) (lower is better)
- **TTI**: [Time to Interactive](https://web.dev/interactive/) (lower is better)
- **Score**: [Lighthouse Performance Score](https://web.dev/performance-scoring/) (higher is better)
- **Eager JS Kib**: the KiB of JS that is eagerly downloaded and executed from `<script>` tags for the initial page load. This is the actual size transferred over the network, including compression (lower is better)
- **Total KiB**: the total KiB transferred with the given page, including HTML, CSS, prefetched resources, etc. Also known as the "total byte weight". This is the actual size transferred over the network, including compression (lower is better)

We take the median of multiple runs, and sort the results by TTI, ascending

We are also experimenting with looking at other metrics, such as [build times](#build-times)

### The Frameworks

Alphabetically:

- [astro](https://astro.build/) - generated via their official CLI, with Solid for the interactive parts
- [fresh](https://fresh.deno.dev/) - generated via their official CLI
- [gatsby](https://www.gatsbyjs.com/) - contributed by the Gatsby team
- [hydrogen](https://hydrogen.shopify.dev/) - generated via their [official CLI](https://shopify.dev/custom-storefronts/hydrogen/getting-started/quickstart)
- [lit](https://lit.dev/) - generated via their official [starter](https://github.com/lit/lit-element-starter-ts)
- [marko](https://markojs.com/) - generated via their official CLI
- [next](https://nextjs.org/) - generated via their official CLI
- next-bun - Next.js with [Bun](https://bun.sh/), via `bun create next`
- [nuxt2](https://nuxtjs.org/) - generated via their official CLI
- [nuxt3](https://v3.nuxtjs.org/) - generated via their official CLI (in beta)
- [qwik](https://qwik.builder.io/) - generated with Qwik City (meta framework)
- [react](https://reactjs.org/) - generated from create-react-app with react-router-dom added for routing
- [solid](https://www.solidjs.com/) - generated with Solid Start (meta framework)
- [svelte](https://svelte.dev/) - generated with Svelte Kit (meta framework)
- [vue3](https://vuejs.org/) - generated via their official CLI, with routing

### Sample output

**Important:**: This project is still in initial development. Do not put too much weight on these current results, there is still much more to do to ensure accuracy, consistency, and fairness.

#### Dashboard:

A more feature rich app for displaying table data, sorting, filtering, etc. Uses more JS, more like a [median website](https://almanac.httparchive.org/en/2021/javascript). [Source](https://github.com/BuilderIO/framework-benchmarks/blob/main/apps/components/src/components/dashboard.lite.tsx)

```
┌─────────┬────────────┬──────────┬──────────┬──────────┬──────────┬───────┬──────────────┬───────────┐
│ (index) │    name    │   TTI    │   FCP    │   LCP    │   TBT    │ Score │ Eager JS KiB │ Total KiB │
├─────────┼────────────┼──────────┼──────────┼──────────┼──────────┼───────┼──────────────┼───────────┤
│    0    │   'qwik'   │ '0.6 s'  │ '0.6 s'  │ '1.5 s'  │  '0 ms'  │  100  │      2       │    38     │
│    1    │  'react'   │ '0.8 s'  │ '0.8 s'  │ '2.4 s'  │  '0 ms'  │  98   │     187      │    199    │
│    2    │  'gatsby'  │ '0.8 s'  │ '0.8 s'  │ '1.4 s'  │  '0 ms'  │  100  │      82      │    87     │
│    3    │   'lit'    │ '0.8 s'  │ '0.8 s'  │ '1.1 s'  │  '0 ms'  │  100  │      23      │    25     │
│    4    │ 'hydrogen' │ '0.8 s'  │ '0.8 s'  │ '1.3 s'  │  '0 ms'  │  90   │      44      │    61     │
│    5    │  'solid'   │ '0.9 s'  │ '0.6 s'  │ '1.3 s'  │  '0 ms'  │  85   │      24      │    28     │
│    6    │  'astro'   │ '0.9 s'  │ '0.9 s'  │ '1.1 s'  │  '0 ms'  │  100  │      15      │    35     │
│    7    │  'marko'   │ '1.0 s'  │ '0.8 s'  │ '0.9 s'  │ '10 ms'  │  100  │      24      │    33     │
│    8    │  'fresh'   │ '1.3 s'  │ '1.3 s'  │ '1.5 s'  │  '0 ms'  │  100  │      17      │    46     │
│    9    │   'next'   │ '1.6 s'  │ '0.6 s'  │ '1.2 s'  │ '10 ms'  │  100  │      91      │    103    │
│   10    │  'svelte'  │ '1.6 s'  │ '1.6 s'  │ '1.7 s'  │  '0 ms'  │  99   │      29      │    35     │
│   11    │ 'angular'  │ '1.7 s'  │ '1.5 s'  │ '1.5 s'  │ '150 ms' │  98   │      86      │    88     │
│   12    │   'vue3'   │ '1.8 s'  │ '1.2 s'  │ '2.1 s'  │  '0 ms'  │  94   │      41      │    50     │
│   13    │  'nuxt2'   │ '2.1 s'  │ '1.2 s'  │ '2.1 s'  │ '70 ms'  │  98   │     106      │    118    │
│   14    │  'nuxt3'   │ '20.8 s' │ '20.8 s' │ '21.0 s' │  '0 ms'  │  45   │     3784     │   3801    │
└─────────┴────────────┴──────────┴──────────┴──────────┴──────────┴───────┴──────────────┴───────────┘
```

#### Todo App:

A very simple/trivial interactive Todo app. [Source](https://github.com/BuilderIO/framework-benchmarks/blob/main/apps/components/src/components/todo-app.lite.tsx)

Ordered by TTI, ascending:

```
┌─────────┬────────────┬─────────┬─────────┬─────────┬──────────┬───────┬──────────────┬───────────┐
│ (index) │    name    │   TTI   │   FCP   │   LCP   │   TBT    │ Score │ Eager JS KiB │ Total KiB │
├─────────┼────────────┼─────────┼─────────┼─────────┼──────────┼───────┼──────────────┼───────────┤
│    0    │ 'hydrogen' │ '0.6 s' │ '0.6 s' │ '1.6 s' │  '0 ms'  │  91   │     163      │    178    │
│    1    │  'astro'   │ '0.6 s' │ '0.6 s' │ '0.6 s' │  '0 ms'  │  100  │      20      │    32     │
│    2    │   'qwik'   │ '0.7 s' │ '0.7 s' │ '1.2 s' │  '0 ms'  │  100  │      2       │    25     │
│    3    │  'react'   │ '0.8 s' │ '0.8 s' │ '2.2 s' │  '0 ms'  │  99   │     159      │    171    │
│    4    │  'fresh'   │ '0.8 s' │ '0.8 s' │ '0.9 s' │  '0 ms'  │  100  │      9       │    37     │
│    5    │   'lit'    │ '0.8 s' │ '0.8 s' │ '1.1 s' │  '0 ms'  │  100  │      16      │    18     │
│    6    │  'solid'   │ '1.0 s' │ '0.7 s' │ '1.3 s' │ '40 ms'  │  86   │      17      │    19     │
│    7    │  'marko'   │ '1.1 s' │ '0.8 s' │ '0.9 s' │ '10 ms'  │  100  │      17      │    23     │
│    8    │   'vue3'   │ '1.2 s' │ '1.2 s' │ '1.8 s' │ '10 ms'  │  99   │      33      │    41     │
│    9    │  'svelte'  │ '1.5 s' │ '1.5 s' │ '1.5 s' │  '0 ms'  │  100  │      19      │    24     │
│   10    │  'gatsby'  │ '1.6 s' │ '0.8 s' │ '1.1 s' │  '0 ms'  │  100  │      70      │    75     │
│   11    │  'nuxt2'   │ '1.6 s' │ '1.0 s' │ '1.0 s' │ '40 ms'  │  100  │      95      │    106    │
│   12    │ 'angular'  │ '1.6 s' │ '1.5 s' │ '1.6 s' │ '30 ms'  │  99   │      72      │    74     │
│   13    │  'nuxt3'   │ '2.2 s' │ '2.2 s' │ '2.3 s' │ '10 ms'  │  96   │     122      │    131    │
│   14    │   'next'   │ '2.2 s' │ '0.7 s' │ '0.8 s' │ '110 ms' │  99   │      83      │    94     │
└─────────┴────────────┴─────────┴─────────┴─────────┴──────────┴───────┴──────────────┴───────────┘
```

#### Hello World:

Just a few links and `<h1>Hello World</h1>`. [Source](https://github.com/BuilderIO/framework-benchmarks/blob/main/apps/components/src/components/hello-world.lite.tsx)

Ordered by TTI, ascending:

```
┌─────────┬────────────┬─────────┬─────────┬─────────┬──────────┬───────┬──────────────┬───────────┐
│ (index) │    name    │   TTI   │   FCP   │   LCP   │   TBT    │ Score │ Eager JS KiB │ Total KiB │
├─────────┼────────────┼─────────┼─────────┼─────────┼──────────┼───────┼──────────────┼───────────┤
│    0    │   'qwik'   │ '0.7 s' │ '0.7 s' │ '0.7 s' │  '0 ms'  │  100  │      0       │     4     │
│    1    │  'astro'   │ '0.7 s' │ '0.7 s' │ '0.7 s' │  '0 ms'  │  100  │      0       │     9     │
│    2    │  'react'   │ '0.8 s' │ '0.8 s' │ '2.2 s' │  '0 ms'  │  99   │     154      │    166    │
│    3    │  'fresh'   │ '0.8 s' │ '0.8 s' │ '0.8 s' │  '0 ms'  │  100  │      0       │    27     │
│    4    │  'marko'   │ '0.8 s' │ '0.8 s' │ '1.1 s' │  '0 ms'  │  100  │      15      │    21     │
│    5    │   'lit'    │ '0.8 s' │ '0.6 s' │ '0.9 s' │ '10 ms'  │  100  │      15      │    16     │
│    6    │  'solid'   │ '0.9 s' │ '0.9 s' │ '1.1 s' │  '0 ms'  │  100  │      16      │    18     │
│    7    │   'vue3'   │ '1.2 s' │ '1.2 s' │ '1.5 s' │  '0 ms'  │  100  │      31      │    38     │
│    8    │  'gatsby'  │ '1.4 s' │ '0.6 s' │ '1.0 s' │  '0 ms'  │  100  │      69      │    73     │
│    9    │  'svelte'  │ '1.5 s' │ '1.5 s' │ '1.5 s' │  '0 ms'  │  100  │      18      │    22     │
│   10    │  'nuxt2'   │ '1.5 s' │ '0.9 s' │ '0.9 s' │ '120 ms' │  99   │      93      │    103    │
│   11    │ 'angular'  │ '1.7 s' │ '1.5 s' │ '1.5 s' │ '150 ms' │  98   │      72      │    74     │
│   12    │ 'hydrogen' │ '1.8 s' │ '0.6 s' │ '1.6 s' │ '30 ms'  │  91   │     160      │    172    │
│   13    │  'nuxt3'   │ '2.0 s' │ '2.0 s' │ '2.2 s' │ '10 ms'  │  97   │     122      │    130    │
│   14    │   'next'   │ '2.1 s' │ '0.7 s' │ '0.8 s' │ '40 ms'  │  100  │      82      │    93     │
└─────────┴────────────┴─────────┴─────────┴─────────┴──────────┴───────┴──────────────┴───────────┘
```

#### SSR times:

Time it took to server-side render the [/dashboard page](#Dashboard:) in milliseconds. Smaller numbers are better.

```
┌─────────┬────────────┬─────┬──────┬─────┬───────┬─────┬────────┬─────────┬─────┬─────┐
│ (index) │    name    │ 1%  │ 2.5% │ 50% │ 97.5% │ 99% │  Avg   │ Std Dev │ Min │ Max │
├─────────┼────────────┼─────┼──────┼─────┼───────┼─────┼────────┼─────────┼─────┼─────┤
│    0    │  'marko'   │  1  │  1   │  1  │   3   │  4  │  1.29  │   0.8   │  1  │ 39  │
│    1    │  'fresh'   │  4  │  4   │  4  │   5   │  6  │  4.19  │  0.88   │  1  │ 50  │
│    2    │ 'hydrogen' │  4  │  4   │  5  │  12   │ 14  │  5.63  │  4.39   │  2  │ 181 │
│    3    │  'svelte'  │  6  │  6   │  7  │  16   │ 18  │  8.17  │  3.12   │  4  │ 61  │
│    4    │  'solid'   │  6  │  6   │  8  │  18   │ 22  │  8.77  │   3.8   │  3  │ 71  │
│    5    │  'nuxt2'   │ 11  │  11  │ 14  │  25   │ 32  │ 15.04  │  4.89   │  3  │ 105 │
│    6    │  'astro'   │ 11  │  11  │ 14  │  31   │ 38  │ 16.56  │  5.98   │  9  │ 75  │
│    7    │  'remix'   │ 12  │  13  │ 18  │  47   │ 62  │  20.3  │  8.87   │  2  │ 93  │
│    8    │  'gatsby'  │ 27  │  28  │ 33  │  78   │ 103 │  36.9  │  12.86  │ 26  │ 153 │
│    9    │   'next'   │ 35  │  35  │ 40  │  95   │ 113 │ 46.96  │  19.06  │ 34  │ 220 │
│   10    │ 'next-bun' │ 35  │  36  │ 42  │  92   │ 117 │ 47.16  │  17.02  │ 33  │ 175 │
│   11    │ 'angular'  │ 113 │ 116  │ 127 │  268  │ 400 │ 141.73 │  47.64  │ 42  │ 408 │
└─────────┴────────────┴─────┴──────┴─────┴───────┴─────┴────────┴─────────┴─────┴─────┘
```

#### SSR throughput (req/second):

SSR throughput of the dashboard page, measured by [autocannon](https://github.com/mcollina/autocannon), sorted by 99% percentile descending. Larger numbers are better.

```
┌─────────┬────────────┬──────┬──────┬──────┬───────┬──────┬─────────┬─────────┬──────┬──────┐
│ (index) │    name    │  1%  │ 2.5% │ 50%  │ 97.5% │ 99%  │   Avg   │ Std Dev │ Min  │ Max  │
├─────────┼────────────┼──────┼──────┼──────┼───────┼──────┼─────────┼─────────┼──────┼──────┤
│    0    │  'marko'   │ 3677 │ 3677 │ 5411 │ 5951  │ 5951 │ 5263.1  │ 702.18  │ 3677 │ 5950 │
│    1    │  'fresh'   │ 1748 │ 1748 │ 2057 │ 2123  │ 2123 │ 1997.73 │ 117.92  │ 1748 │ 2122 │
│    2    │ 'hydrogen' │ 843  │ 843  │ 1653 │ 1807  │ 1807 │ 1528.1  │ 290.27  │ 843  │ 1807 │
│    3    │  'svelte'  │ 536  │ 536  │ 820  │ 1107  │ 1107 │  795.3  │ 182.24  │ 536  │ 1107 │
│    4    │  'solid'   │ 534  │ 534  │ 842  │ 1019  │ 1019 │ 830.64  │ 138.46  │ 534  │ 1019 │
│    5    │  'astro'   │ 444  │ 444  │ 573  │  641  │ 641  │   579   │  56.1   │ 444  │ 641  │
│    6    │  'nuxt2'   │ 384  │ 384  │ 550  │  588  │ 588  │  539.8  │  54.2   │ 384  │ 588  │
│    7    │  'remix'   │ 264  │ 264  │ 371  │  485  │ 485  │  387.9  │  69.16  │ 264  │ 485  │
│    8    │  'gatsby'  │ 158  │ 158  │ 233  │  277  │ 277  │  239.6  │  34.64  │ 158  │ 277  │
│    9    │ 'next-bun' │ 145  │ 145  │ 207  │  234  │ 234  │  205.8  │  23.6   │ 145  │ 234  │
│   10    │   'next'   │ 142  │ 142  │ 206  │  233  │ 233  │  203.7  │  24.71  │ 142  │ 233  │
│   11    │ 'angular'  │  45  │  45  │  72  │  76   │  76  │  69.91  │  8.61   │  45  │  76  │
└─────────┴────────────┴──────┴──────┴──────┴───────┴──────┴─────────┴─────────┴──────┴──────┘
```

#### Build times:

```
┌─────────┬────────────┬──────────────────────┐
│ (index) │    Name    │ Build Time (Seconds) │
├─────────┼────────────┼──────────────────────┤
│    0    │   'fresh'  │          0           │
│    1    │   'vue3'   │         3.5          │
│    2    │   'react'  │         7.4          │
│    3    │  'svelte'  │         7.7          │
│    4    │   'qwik'   │         7.7          │
│    5    │   'next'   │         7.8          │
│    6    │   'astro'  │         7.9          │
│    7    │ 'hydrogen' │         8.4          │
│    8    │    'lit'   │         8.4          │
│    9    │  'gatsby'  │         9.9          │
│   10    │  'angular' │         10.7         │
│   11    │   'nuxt2'  │         12.8         │
│   12    │   'solid'  │         12.9         │
│   13    │   'nuxt3'  │          16          │
│   14    │   'marko'  │         16.2         │
└─────────┴────────────┴──────────────────────┘
```

## Roadmap

Next things we want to add:

- More complex examples that more closesly emulate real world sites and apps (e.g. a dashboard for exploring the test run results in interactive tables and graphs)
- Test interaction delays - such as initial interaction (like add todo) or navigate to next page
- Move test running to be remote, such as in GH actions ([Help wanted!](https://github.com/BuilderIO/framework-benchmarks/issues/6))
- Benchmark SSR speeds. Also add Bun here.
- Benchmark with and without Partytown for 3P scripts (and vs none at all)

Contributions welcome!

## Running locally

### Prereqs

You will need [Node.js](https://nodejs.org/en/download/) >= 16.14.0k [Deno](https://deno.land/manual/getting_started/installation) installed locally, and [Bun](https://bun.sh/) installed locally

### Setup

After cloning this repo, install dependencies:

```sh
npm install
```

Now you can start running the below scripts:

### Install

Use the install script to install dependencies of each framework:

```sh
npm run fw-install
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

## Credit and Inspiration

- [Stefan Krause](https://github.com/krausest) and his [js-framework-benchmark](https://github.com/krausest/js-framework-benchmark)
- [Addy Osmani](https://github.com/addyosmani) and his great [Web Performance Recipes With Puppeteer](https://addyosmani.com/blog/puppeteer-recipes/) blog post
- [Lighthouse](https://github.com/GoogleChrome/lighthouse) and the very helpful Lighthouse team
- [Ryan Carniato](https://github.com/ryansolid) for always providing incredibly helpful insight and feedback
- [Builder.io](https://www.builder.io/) for funding this research and development
