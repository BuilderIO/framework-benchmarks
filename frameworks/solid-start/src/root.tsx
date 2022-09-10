// @refresh reload
import { Suspense } from 'solid-js';
import {
  Body,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
} from 'solid-start';

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <Routes>
          <FileRoutes />
        </Routes>

        <Scripts />
      </Body>
    </Html>
  );
}
