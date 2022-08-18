export const rootStyles = `
  :root {
    /* Space */
    --s1: 5px;
    --s2: calc(var(--s1) * 2);
    --s3: calc(var(--s1) * 4);
    --gray-1: #eee;
    --gray-2: #bbb;
    --gray-3: #999;
    --gray-4: #666;
    --gray-5: #333;
    --border-gray: 1px solid var(--gray-2);
    --shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
    --shadow-2: 0 1px 10px rgba(0, 0, 0, 0.1);
    --round: 4px;
    --primary: rgb(26, 115, 232);
    --mobile: 640px;
    --font-medium: 400;
  }

  ul, ol {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  body {
    margin: 0;
    font-family: Avenir, Helvetica, sans-serif;
  }

  a {
    text-decoration: none;
  }
`;

export const rootStylesTag = `<style>${rootStyles}</style>`;
