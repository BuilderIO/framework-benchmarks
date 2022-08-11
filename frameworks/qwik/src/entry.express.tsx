import express from 'express';
import { fileURLToPath } from 'url';
import { join } from 'path';
import cityPlan from '@qwik-city-plan';
import { qwikCity } from '@builder.io/qwik-city/middleware/express';
import render from './entry.ssr';

const app = express();

const port = Number(process.env.PORT || 8080);

app.use(
  qwikCity(render, {
    ...cityPlan,
    staticDir: join(fileURLToPath(import.meta.url), '..', '..', 'dist'),
  })
);

app.listen(port, () => {
  /* eslint-disable */
  console.log(`http://localhost:${port}/`);
});
