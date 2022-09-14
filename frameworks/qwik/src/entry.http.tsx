import http from 'http';
import render from './entry.ssr';


const port = Number(process.env.port || 6006);

http.createServer(function (req, res) {

  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Cache-Control': 'no-transform',
  });
  render({}).then((r) => {
    res.end(r.html);
  })
}).listen(port);

console.log(`Listening at http://localhost:${port}`);

// import http from 'http';
// import render from './entry.ssr';


// async function main() {
//   for (let i = 0; i < 1000; i++) {
//     await render({})
//   }
// }

// main();


