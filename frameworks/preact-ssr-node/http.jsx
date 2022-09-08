/** @jsx h */
import { h } from 'preact';
import { render } from 'preact-render-to-string';
import Dashboard from './generated-components/components/dashboard.js';
import AppHeader from './generated-components/components/app-header.js';
import http from 'http';

const App = () => (
  <html>
    <body>
      <AppHeader framework="react-ssr-node" path="/dashboard" />
      <Dashboard />
    </body>
  </html>
);
const port = Number(process.env.port || 6017);

http
  .createServer(function (req, res) {
    const str = render(<App />);
    res.writeHead(200, {
      'Content-Type': 'text/html',
      'Cache-Control': 'no-transform',
    });
    res.end(str);
  })
  .listen(port);

console.log(`Listening at http://localhost:${port}`);
