/**
 * Originally from: https://github.com/oven-sh/bun/blob/e55d6eed2bf9a5db30250fdd8b9be063dc949054/bench/react-hello-world/react-hello-world.deno.jsx
 */

import { renderToReadableStream } from 'https://esm.run/react-dom/server';
import { serve } from 'https://deno.land/std@0.146.0/http/server.ts';
import * as React from 'react';
import Dashboard from './generated-components/components/dashboard.js';
import AppHeader from './generated-components/components/app-header.js';

const App = () => (
  <html>
    <body>
      <AppHeader framework="react-ssr-deno" path="/dashboard" />
      <Dashboard />
    </body>
  </html>
);

const headers = {
  headers: {
    'Content-Type': 'text/html',
    'Cache-Control': 'no-transform', // disables response body auto compression, see https://deno.land/manual/runtime/http_server_apis#automatic-body-compression
  },
};

const port = Number(Deno.env.get('PORT')) || 6015;

console.info(`Listening at http://localhost:${port}`);

await serve(
  async (req) => {
    return new Response(await renderToReadableStream(<App />), headers);
  },
  { port: port }
);
