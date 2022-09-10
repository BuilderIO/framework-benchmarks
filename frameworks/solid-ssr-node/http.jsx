import { renderToString } from 'solid-js/web';
import Dashboard from './generated-components/components/dashboard.jsx';
import AppHeader from './generated-components/components/app-header.jsx';
import http from 'http';

const App = () => (
  <html>
    <body>
      <AppHeader framework="solid-ssr-node" path="/dashboard" />
      <Dashboard />
    </body>
  </html>
);
const port = Number(process.env.port || 6018);

http
  .createServer(function (req, res) {
    const str = renderToString(() => <App />);
    res.writeHead(200, {
      'Content-Type': 'text/html',
      'Cache-Control': 'no-transform',
    });
    res.end(str);
  })
  .listen(port);

console.log(`Listening at http://localhost:${port}`);