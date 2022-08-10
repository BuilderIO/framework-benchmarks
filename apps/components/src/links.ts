export type Link = {
  name: string;
  url: string;
};

function getUrl(port: number) {
  return `http://localhost:${port}`;
}

export const links: Link[] = [
  {
    name: 'astro',
    url: getUrl(6001),
  },
];
