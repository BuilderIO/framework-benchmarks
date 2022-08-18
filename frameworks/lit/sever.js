const http = require('http');
const express = require('express');
const path = require('path');
const compression = require('compression');
const app = express();

app.use(compression());
app.use(express.json());
app.use(express.static('docs'));

app.use('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/docs/index.html'));
});

const server = http.createServer(app);
const port = Number(process.env.PORT);
server.listen(port);
console.debug('Server is running... http://localhost:' + port);
