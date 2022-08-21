/**
 * Originally from: https://github.com/oven-sh/bun/blob/e55d6eed2bf9a5db30250fdd8b9be063dc949054/bench/react-hello-world/react-hello-world.node.jsx
 */
import { renderToPipeableStream } from 'react-dom/server.node';
import Dashboard from './generated-components/components/dashboard.js';
import AppHeader from './generated-components/components/app-header.js';
import React from 'react';
import http from 'http';

const App = () => (
  <html>
    <body>
      <AppHeader framework="react-ssr-node" path="/dashboard" />
      <Dashboard />
    </body>
  </html>
);
const port = Number(process.env.port || 6014);

var didError = false;
http
  .createServer(function (req, res) {
    const stream = renderToPipeableStream(<App />, {
      onShellReady() {
        // The content above all Suspense boundaries is ready.
        // If something errored before we started streaming, we set the error code appropriately.
        res.statusCode = didError ? 500 : 200;
        res.setHeader('Content-type', 'text/html');
        res.setHeader('Cache-Control', 'no-transform'); // set to match the Deno benchmark, which requires this for an apples to apples comparison
        stream.pipe(res);
      },
      onError(err) {
        didError = true;
        console.error(err);
      },
    });
  })
  .listen(port);

console.log(`Listening at http://localhost:${port}`);
