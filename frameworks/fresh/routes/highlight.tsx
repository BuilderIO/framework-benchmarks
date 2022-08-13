/** @jsx h */
import { h } from 'preact';
import AppHeader from '../components/generated-components/components/app-header.js';
// Currently not working, highlight.js isn't playing nice with Deno
// import Highlight from '../islands/Highlight.tsx';

export default function Home() {
  return (
    <div>
      <AppHeader framework="fresh" path="/todo" />
      {/* <Highlight /> */}
    </div>
  );
}
