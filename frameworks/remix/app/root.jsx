import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from '@remix-run/react';
import { AppHeader } from '../components/generated-components';

export const meta = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
});

export default function App() {
  const { pathname } = useLocation();
  return (
    <html lang="en">
      <body>
        <AppHeader framework="remix" path={pathname} />
        <Outlet />

        <Scripts />
      </body>
    </html>
  );
}
