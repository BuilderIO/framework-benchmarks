const http = require('http');
const express = require('express');
const compression = require('compression');
const path = require('path');

const app = express();

app.use(express.json());
app.use(compression());
app.use(express.static('dist/angular'));

app.use('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/angular/index.html'));
});

const server = http.createServer(app);
const port = Number(process.env.PORT || 4200);
server.listen(port);
console.debug('Server listening on port ' + port + '...');
