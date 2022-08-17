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
- [Gatsby](https://www.gatsbyjs.com/) - contributed by the Gatsby team
- [Hydrogen](https://hydrogen.shopify.dev/) - generated via their [official CLI](https://shopify.dev/custom-storefronts/hydrogen/getting-started/quickstart)
- [Lit](https://lit.dev/) - generated via their official [starter](https://github.com/lit/lit-element-starter-ts)
- [Marko](https://markojs.com/) - generated via their official CLI
- [Next.js](https://nextjs.org/) - generated via their official CLI
- [Nuxt 2](https://nuxtjs.org/) - generated via their official CLI
- [Nuxt 3](https://v3.nuxtjs.org/) - generated via their official CLI (in beta)
- [Qwik](https://qwik.builder.io/) - generated with Qwik City (meta framework)
- [Solid](https://www.solidjs.com/) - generated with Solid Start (meta framework)
- [Svelte](https://svelte.dev/) - generated with Svelte Kit (meta framework)

### Sample output

**Important:**: This project is still in initial development. Do not put too much weight on these current results, there is still much more to do to ensure accuracy, consistency, and fairness.

#### Todo App:

A very simple/trivial interactive Todo app. [Source](https://github.com/BuilderIO/framework-benchmarks/blob/main/apps/components/src/components/todo-app.lite.tsx)

Ordered by TTI, ascending:

```
┌─────────┬────────────┬─────────┬─────────┬──────────┬──────────────┬───────────┐
│ (index) │    name    │   TTI   │   FCP   │   TBT    │ Eager JS KiB │ Total KiB │
├─────────┼────────────┼─────────┼─────────┼──────────┼──────────────┼───────────┤
│    0    │   'qwik'   │ '0.7 s' │ '0.7 s' │  '0 ms'  │      2       │    24     │
│    1    │   'marko'  │ '0.8 s' │ '0.8 s' │  '0 ms'  │      16      │    22     │
│    2    │   'astro'  │ '0.8 s' │ '0.8 s' │  '0 ms'  │      19      │    28     │
│    3    │   'lit'    │ '0.8 s' │ '0.8 s' │  '0 ms'  │      15      │    17     │
│    4    │   'solid'  │ '1.0 s' │ '0.6 s' │  '0 ms'  │      15      │    18     │
│    5    │   'fresh'  │ '1.2 s' │ '1.2 s' │  '0 ms'  │      9       │    36     │
│    6    │  'svelte'  │ '1.3 s' │ '1.3 s' │  '0 ms'  │      19      │    23     │
│    7    │  'gatsby'  │ '1.6 s' │ '0.8 s' │ '10 ms'  │      70      │    74     │
│    8    │ 'hydrogen' │ '1.9 s' │ '0.7 s' │ '40 ms'  │     163      │    177    │
│    9    │  'nuxt3'   │ '2.0 s' │ '2.0 s' │  '0 ms'  │     122      │    131    │
│   10    │  'angular' │ '2.4 s' │ '2.3 s' │ '50 ms'  │     233      │    236    │
│   11    │   'nuxt2'  │ '3.4 s' │ '0.9 s' │ '170 ms' │     377      │    387    │
│   12    │   'next'   │ '3.7 s' │ '0.6 s' │ '180 ms' │     366      │    377    │
└─────────┴────────────┴─────────┴─────────┴──────────┴──────────────┴───────────┘
```

#### Hello World:

Just a few links and `<h1>Hello World</h1>`. [Source](https://github.com/BuilderIO/framework-benchmarks/blob/main/apps/components/src/components/hello-world.lite.tsx)

Ordered by TTI, ascending:

```
┌─────────┬────────────┬─────────┬─────────┬──────────┬──────────────┬───────────┐
│ (index) │    name    │   TTI   │   FCP   │   TBT    │ Eager JS KiB │ Total KiB │
├─────────┼────────────┼─────────┼─────────┼──────────┼──────────────┼───────────┤
│    0    │   'qwik'   │ '0.6 s' │ '0.6 s' │  '0 ms'  │      0       │     3     │
│    1    │   'astro'  │ '0.6 s' │ '0.6 s' │  '0 ms'  │      0       │     7     │
│    2    │   'solid'  │ '0.6 s' │ '0.6 s' │  '0 ms'  │      15      │    17     │
│    3    │   'marko'  │ '0.6 s' │ '0.6 s' │  '0 ms'  │      15      │    20     │
│    4    │  'gatsby'  │ '0.6 s' │ '0.6 s' │  '0 ms'  │      70      │    73     │
│    5    │ 'hydrogen' │ '0.6 s' │ '0.6 s' │  '0 ms'  │     160      │    172    │
│    6    │    'lit'   │ '0.6 s' │ '0.6 s' │  '0 ms'  │      14      │    16     │
│    7    │   'fresh'  │ '0.8 s' │ '0.8 s' │  '0 ms'  │      0       │    27     │
│    8    │  'svelte'  │ '1.3 s' │ '1.3 s' │  '0 ms'  │      17      │    21     │
│    9    │   'nuxt2'  │ '1.6 s' │ '0.9 s' │ '160 ms' │      90      │    100    │
│   10    │   'nuxt3'  │ '1.9 s' │ '1.9 s' │  '0 ms'  │     121      │    130    │
│   11    │  'angular' │ '2.3 s' │ '2.3 s' │ '30 ms'  │     233      │    236    │
│   12    │   'next'   │ '3.7 s' │ '0.6 s' │ '180 ms' │     366      │    376    │
└─────────┴────────────┴─────────┴─────────┴──────────┴──────────────┴───────────┘
```

#### Build times:

```
┌─────────┬────────────┬──────────────────────┐
│ (index) │    Name    │ Build Time (Seconds) │
├─────────┼────────────┼──────────────────────┤
│    0    │   'fresh'  │          0           │
│    1    │  'svelte'  │         7.7          │
│    2    │   'qwik'   │         7.7          │
│    3    │   'next'   │         7.8          │
│    4    │   'astro'  │         7.9          │
│    5    │ 'hydrogen' │         8.4          │
│    6    │    'lit'   │         8.4          │
│    7    │  'gatsby'  │         9.9          │
│    8    │  'angular' │         10.7         │
│    9    │   'nuxt2'  │         12.8         │
│   10    │   'solid'  │         12.9         │
│   11    │   'nuxt3'  │          16          │
│   12    │   'marko'  │         16.2         │
└─────────┴────────────┴──────────────────────┘
```

## Roadmap

Next things we want to add:

- More complex examples that more closesly emulate real world sites and apps (e.g. a dashboard for exploring the test run results in interactive tables and graphs)
- Test interaction delays - such as initial interaction (like add todo) or navigate to next page
- Move test running to be remote, such as in GH actions ([Help wanted!](https://github.com/BuilderIO/framework-benchmarks/issues/6))
- Benchmark SSR speeds. Also add Bun here.

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

## Credit and Inspiration

- [Stefan Krause](https://github.com/krausest) and his [js-framework-benchmark](https://github.com/krausest/js-framework-benchmark)
- [Addy Osmani](https://github.com/addyosmani) and his great [Web Performance Recipes With Puppeteer](https://addyosmani.com/blog/puppeteer-recipes/) blog post
- [Lighthouse](https://github.com/GoogleChrome/lighthouse) and the very helpful Lighthouse team
- [Ryan Carniato](https://github.com/ryansolid) for always providing incredibly helpful insight and feedback
- [Builder.io](https://www.builder.io/) for funding this research and development
