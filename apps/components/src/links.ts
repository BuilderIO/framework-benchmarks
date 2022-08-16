export type Example = {
  name: string;
  url: string;
};

export type Framework = {
  name: string;
  url: string;
  text?: string;
};

function getUrl(port: number) {
  return `http://localhost:${port}`;
}

export const frameworks: Framework[] = [
  // TODO: add back when get working
  {
    name: 'angular',
    url: getUrl(4200),
  },
  // TODO: add back when get working
  {
    name: 'astro',
    url: getUrl(6001),
  },
  {
    name: 'lit',
    url: getUrl(6010),
  },
  {
    name: 'marko',
    url: getUrl(6002),
  },
  {
    name: 'next',
    url: getUrl(6003),
  },
  // TODO: add back when get working
  {
    name: 'nuxt2',
    url: getUrl(6004),
  },
  // TODO: add back when get working
  {
    name: 'nuxt3',
    url: getUrl(6005),
  },
  // TODO: add back when get working
  {
    name: 'qwik',
    url: getUrl(6006),
  },
  // TODO: add back when get working
  {
    name: 'remix',
    url: getUrl(6007),
  },
  {
    name: 'solid',
    url: getUrl(6008),
  },
  {
    name: 'svelte',
    url: getUrl(6009),
  },
  {
    name: 'fresh',
    url: getUrl(8000),
  },
  {
    name: 'gatsby',
    url: getUrl(8001),
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
