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
  {
    name: 'angular',
    url: getUrl(4200),
  },
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
];

export const examples: Example[] = [
  {
    name: 'hello world',
    url: '/',
  },
  {
    name: 'simple todo',
    url: '/todo',
  },
];
