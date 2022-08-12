# Framework Benchmarks

Test each framework for it's performance, particularly common Lighthouse and CWV metrics as applications scale

## How it works

We created a basic starting point for each framework in the `frameworks/` folder.

We then build and serve each project, and run Lighthouse on each project with puppeteer, and measure the amount of JS downloaded on the main thread for various examples (e.g. a simple `<h1>Hello World</h1>` page).

### Sample output

Output measures the kb of JS downloaded, FCP ([First Contentful Paint](https://web.dev/first-contentful-paint/)), TBT ([Total Blocking Time](https://web.dev/tbt/)), and TTI ([Time to Interactive](https://web.dev/interactive/)).

#### Hello World:

```
┌─────────┬──────┬─────────┬──────────┬─────────┐
│ (index) │ jsKb │   fcp   │   tbt    │   tti   │
├─────────┼──────┼─────────┼──────────┼─────────┤
│ angular │ 228  │ '2.3 s' │ '30 ms'  │ '2.4 s' │
│  astro  │  0   │ '0.6 s' │  '0 ms'  │ '0.6 s' │
│  fresh  │  0   │ '0.8 s' │  '0 ms'  │ '0.8 s' │
│  marko  │  15  │ '2.9 s' │  '0 ms'  │ '2.9 s' │
│  next   │  81  │ '0.6 s' │ '40 ms'  │ '2.1 s' │
│  nuxt2  │  90  │ '0.9 s' │ '130 ms' │ '1.6 s' │
│  nuxt3  │ 120  │ '1.9 s' │  '0 ms'  │ '1.9 s' │
│  qwik   │  0   │ '0.6 s' │  '0 ms'  │ '0.6 s' │
│  remix  │  62  │ '1.4 s' │ '20 ms'  │ '1.9 s' │
│  solid  │  18  │ '2.9 s' │  '0 ms'  │ '2.9 s' │
│ svelte  │  17  │ '1.3 s' │  '0 ms'  │ '1.3 s' │
└─────────┴──────┴─────────┴──────────┴─────────┘
```

#### Todo App:

```
┌─────────┬───────┬───────────┬───────────┬───────────┐
│ (index) │ jsKb  │    fcp    │    tbt    │    tti    │
├─────────┼───────┼───────────┼───────────┼───────────┤
│  astro  │  19   │  '0.7 s'  │  '0 ms'   │  '0.7 s'  │
│  fresh  │   8   │  '0.8 s'  │  '0 ms'   │  '0.8 s'  │
│  marko  │  16   │  '2.9 s'  │  '0 ms'   │  '2.9 s'  │
│  next   │  81   │  '0.7 s'  │  '40 ms'  │  '2.1 s'  │
│  nuxt2  │  91   │  '1.0 s'  │  '60 ms'  │  '1.6 s'  │
│  nuxt3  │  121  │  '2.0 s'  │  '0 ms'   │  '2.0 s'  │
│  qwik   │   0   │  '0.7 s'  │  '0 ms'   │  '0.7 s'  │
│  remix  │  62   │  '1.4 s'  │  '20 ms'  │  '1.9 s'  │
│  solid  │  18   │  '2.9 s'  │  '0 ms'   │  '2.9 s'  │
│ svelte  │  18   │  '1.3 s'  │  '0 ms'   │  '1.3 s'  │
└─────────┴───────┴───────────┴───────────┴───────────┘
```

## Running locally

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
