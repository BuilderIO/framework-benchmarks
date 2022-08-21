/**
 * Originally from: https://github.com/oven-sh/bun/blob/e55d6eed2bf9a5db30250fdd8b9be063dc949054/bench/react-hello-world/react-hello-world.jsx
 */
import { renderToReadableStream } from 'react-dom/server.browser';
import Dashboard from './generated-components/components/dashboard';
import AppHeader from './generated-components/components/app-header';

const headers = {
  headers: {
    'Content-Type': 'text/html',
    'Cache-Control': 'no-transform',
  },
};

const App = () => (
  <html>
    <body>
      <AppHeader framework="react-ssr-bun" path="/dashboard" />
      <Dashboard />
    </body>
  </html>
);

const port = Number(process.env.PORT) || 6016;

console.info(`Listening at http://localhost:${port}`);

export default {
  port,
  async fetch(req) {
    return new Response(await renderToReadableStream(<App />), headers);
  },
};
