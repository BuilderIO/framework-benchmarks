const relative = require('./relative-path.cjs');

module.exports = function (data) {
  const {title, page, content} = data;
  return `
<!doctype html>

<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    ${page.url === '/' ? `
    <script type="module" src="${relative(
      page.url,
      '/hello-world.bundled.js'
    )}" async></script>
    ` : ''}
    ${page.url === '/todo/' ? `
    <script type="module" src="${relative(
      page.url,
      '/todo-app.bundled.js'
    )}" async></script>
    ` : ''}
    <script type="module" src="${relative(
      page.url,
      '/app-header.bundled.js'
    )}" async></script>
  </head>
  <body>
    <app-header></app-header>
    ${content}
  </body>
</html>`;
};
