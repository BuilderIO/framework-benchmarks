# Framework Performance

Test each framework for it's performance, particularly common Lighthouse and CWV metrics as applications scale

## How it works

We created a basic starting point for each framework in the `frameworks/` folder.

We then build and serve each project, and run Lighthouse on each project with puppeteer, and measure the amount of JS downloaded on the main thread for various examples (e.g. a simple `<h1>Hello World</h1>` page).

### Sample output

The below numbers are the kb of JS downloaded with main thread script tags for each framework:

```js
{
  angular: 124,
  astro: 0,
  marko: 0,
  next: 87,
  nuxt2: 93,
  nuxt3: 97,
  qwik: 0,
  remix: 62,
  solid: 13,
  svelte: 15
}
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
