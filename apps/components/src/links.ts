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
    url: getUrl(6000),
  },
  {
    name: 'astro',
    url: getUrl(6001),
  },
  {
    name: 'marko',
    url: getUrl(6002),
  },
  {
    name: 'next',
    url: getUrl(6003),
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
