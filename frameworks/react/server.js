const http = require('http');
const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('build'));

app.use('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});

const server = http.createServer(app);
const port = Number(process.env.PORT);
server.listen(port);
console.debug('Server is running... http://localhost:' + port);
