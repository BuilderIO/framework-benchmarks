export type Example = {
  name: string;
  url: string;
};

export type Framework = {
  name: string;
  url: string;
};

function getUrl(port: number) {
  return `http://localhost:${port}`;
}

export const frameworks: Framework[] = [
  // Removing for now, weird routing errors with no clear direction to resolve
  // {
  //   name: 'angular',
  //   url: getUrl(4200),
  // },
  // Removing for now, given doesn't support interactivity
  // {
  //   name: 'astro',
  //   url: getUrl(6001),
  // },
  {
    name: 'marko',
    url: getUrl(6002),
  },
  {
    name: 'next',
    url: getUrl(6003),
  },
  // Removing for now, weird things happening with imports
  // {
  //   name: 'nuxt2',
  //   url: getUrl(6004),
  // },
  {
    name: 'nuxt3',
    url: getUrl(6005),
  },
  {
    name: 'qwik',
    url: getUrl(6006),
  },
  // Removing for now: can't get it to work
  // {
  //   name: 'remix',
  //   url: getUrl(6007),
  // },
  {
    name: 'solid',
    url: getUrl(6008),
  },
  {
    name: 'svelte',
    url: getUrl(6009),
  },
];

export const examples: Example[] = [
  {
    name: 'Hello World',
    url: '/',
  },
  {
    name: 'Simple Todo',
    url: '/todo',
  },
];
