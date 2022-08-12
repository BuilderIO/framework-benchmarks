# Framework Benchmarks

Test each framework for it's performance, particularly common Lighthouse and CWV metrics as applications scale

### Goals

The goals for this project are to understand the performance tradeoffs of popular frameworks in real world-ish scenarios. We want to assume non trivial codebases and imperfect code and conditions, so to see how each framework holds up to real world scenarios and scale.

### Status

This project is in initial development. Do not put too much weight on these current results, there is still much more to do to ensure accuracy, consistency, and fairness.

**Contributions are welcome!**

## How it works

### Methodology

We created a basic starting point for each framework in the `frameworks/` folder using each framework's suggested starter/cli.

We then create basic example components and use [Mitosis](https://github.com/builderio/mitosis) to compile them to best-effort idiomatic code for each framework. This will never be perfectly optimized code

We then build and serve each project, and run Lighthouse on each project with puppeteer, and measure:

- **JS kb**: the kb of JS downloaded from `<script src="...">` tags
- **FCP**: [First Contentful Paint](https://web.dev/first-contentful-paint/)
- **TBT**: [Total Blocking Time](https://web.dev/tbt/)
- **TTI**: [Time to Interactive](https://web.dev/interactive/)

We sort the results by TTI, ascending

We are also experimenting with looking at other metrics, such as [build times](#build-times)

### The Frameworks

Alphabetically:

- [Astro](https://astro.build/) (Given that Astro supports interactivity via other framework, we use Solidjs for the interactive parts)
- [Fresh](https://fresh.deno.dev/)
- [Marko](https://markojs.com/)
- [Next.js](https://nextjs.org/)
- [Nuxt 2](https://nuxtjs.org/)
- [Nuxt 3](https://v3.nuxtjs.org/)
- [Qwik](https://qwik.builder.io/)
- [Remix](https://remix.run/)
- [Solid](https://www.solidjs.com/)
- [Svelte](https://svelte.dev/)

### Sample output

**Important:**: This project is still in initial development. Do not put too much weight on these current results, there is still much more to do to ensure accuracy, consistency, and fairness.

#### Hello World:

Just a few links and `<h1>Hello World</h1>`

```
┌─────────┬───────────┬─────────┬───────┬─────────┬──────────┐
│ (index) │   name    │   TTI   │ JS kb │   FCP   │   TBT    │
├─────────┼───────────┼─────────┼───────┼─────────┼──────────┤
│    0    │  'qwik'   │ '0.6 s' │   0   │ '0.6 s' │  '0 ms'  │
│    1    │  'astro'  │ '0.7 s' │   0   │ '0.7 s' │  '0 ms'  │
│    2    │  'fresh'  │ '0.8 s' │   0   │ '0.8 s' │  '0 ms'  │
│    3    │  'marko'  │ '0.8 s' │  15   │ '0.8 s' │  '0 ms'  │
│    4    │  'solid'  │ '1.1 s' │  18   │ '1.1 s' │  '0 ms'  │
│    5    │ 'svelte'  │ '1.3 s' │  17   │ '1.3 s' │  '0 ms'  │
│    6    │  'nuxt2'  │ '1.6 s' │  90   │ '0.8 s' │ '140 ms' │
│    7    │  'nuxt3'  │ '1.9 s' │  120  │ '1.9 s' │  '0 ms'  │
│    8    │  'remix'  │ '2.0 s' │  62   │ '1.2 s' │ '70 ms'  │
│    9    │  'next'   │ '2.1 s' │  81   │ '0.6 s' │ '40 ms'  │
└─────────┴───────────┴─────────┴───────┴─────────┴──────────┘
```

#### Todo App:

A very simple/trivial interactive Todo app

```
┌─────────┬──────────┬─────────┬───────┬─────────┬─────────┐
│ (index) │   name   │   TTI   │ JS kb │   FCP   │   TBT   │
├─────────┼──────────┼─────────┼───────┼─────────┼─────────┤
│    0    │ 'astro'  │ '0.6 s' │  19   │ '0.6 s' │ '0 ms'  │
│    1    │  'qwik'  │ '0.7 s' │   0   │ '0.7 s' │ '0 ms'  │
│    2    │ 'fresh'  │ '0.8 s' │   8   │ '0.8 s' │ '0 ms'  │
│    3    │ 'marko'  │ '0.8 s' │  16   │ '0.8 s' │ '0 ms'  │
│    4    │ 'solid'  │ '1.1 s' │  18   │ '1.1 s' │ '0 ms'  │
│    5    │ 'svelte' │ '1.4 s' │  18   │ '1.4 s' │ '0 ms'  │
│    6    │ 'nuxt2'  │ '1.6 s' │  91   │ '1.0 s' │ '40 ms' │
│    7    │ 'remix'  │ '2.0 s' │  62   │ '1.8 s' │ '60 ms' │
│    8    │ 'nuxt3'  │ '2.0 s' │  121  │ '2.0 s' │ '0 ms'  │
│    9    │  'next'  │ '2.1 s' │  81   │ '0.6 s' │ '30 ms' │
└─────────┴──────────┴─────────┴───────┴─────────┴─────────┘
```

#### Syntax Highlighter:

An interactive component with a text box to type text, and display the output with syntax highlighting.

This is to test the impact of having a large external dependency, in this case: [highlight.js](https://github.com/highlightjs/highlight.js/)

```
┌─────────┬──────────┬─────────┬───────┬─────────┬────────────┐
│ (index) │   name   │   TTI   │ JS kb │   FCP   │    TBT     │
├─────────┼──────────┼─────────┼───────┼─────────┼────────────┤
│    0    │  'qwik'  │ '0.8 s' │   0   │ '0.8 s' │   '0 ms'   │
│    1    │ 'svelte' │ '2.7 s' │  313  │ '1.2 s' │ '1,370 ms' │
│    0    │ 'solid'  │ '3.5 s' │  305  │ '1.1 s' │ '1,430 ms' │
│    2    │ 'nuxt2'  │ '3.9 s' │  375  │ '1.0 s' │  '910 ms'  │
│    3    │ 'marko'  │ '4.4 s' │  245  │ '0.9 s' │ '1,720 ms' │
│    4    │  'next'  │ '4.5 s' │  366  │ '0.7 s' │ '1,640 ms' │
│    5    │ 'remix'  │ '5.0 s' │  357  │ '1.7 s' │ '1,730 ms' │
│    6    │ 'astro'  │ '7.8 s' │ 1043  │ '0.8 s' │ '1,630 ms' │
│    7    │ 'nuxt3'  │ '7.9 s' │ 1134  │ '7.1 s' │  '50 ms'   │
└─────────┴──────────┴─────────┴───────┴─────────┴────────────┘
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
