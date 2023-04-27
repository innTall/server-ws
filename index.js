import express from 'express';
import path from 'path';
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import { WebSocketServer } from 'ws';

// .../javascript/index.js"
const __filename = fileURLToPath(import.meta.url);
console.log(__filename);
// .../javascript"
const __dirname = path.dirname(__filename);
console.log('directory-name ', __dirname);
// .../javascript/dist/index.html"
console.log(path.join(__dirname, '/dist', 'index.html'));

const app = express();
app.use(express.static(path.join(__dirname, '/public')));

const server = createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', function (ws) {
  const id = setInterval(function () {
    ws.send(JSON.stringify(process.memoryUsage()), function () {
      //
      // Ignoring errors.
      //
    });
  }, 100);
  console.log('started client interval');

  ws.on('close', function () {
    console.log('stopping client interval');
    clearInterval(id);
  });
});

server.listen(8080, function () {
  console.log('Listening on http://0.0.0.0:8080');
});
