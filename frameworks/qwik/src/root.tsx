import { QwikCity, RouterOutlet } from '@builder.io/qwik-city';
import { Head } from './components/head/head';

import './global.css';

export default () => {
  return (
    <QwikCity>
      <Head />
      <body lang="en">
        <RouterOutlet />
      </body>
    </QwikCity>
  );
};
