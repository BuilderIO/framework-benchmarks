import express from 'express';
import { handler as ssrHandler } from './dist/server/entry.mjs';

const app = express();
app.use(ssrHandler);

const port = Number(process.env.PORT || 6001);
app.listen(port);

console.log(`Listening on http://localhost:${port}`);
