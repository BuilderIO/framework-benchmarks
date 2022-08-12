/** @jsx h */
import { h } from 'preact';
import { tw } from '@twind';
import {
  AppHeader,
  HelloWorld,
} from '../components/generated-components/index.js';

export default function Home() {
  return (
    <div>
      <AppHeader framework="fresh" path="/" />
      <HelloWorld />
    </div>
  );
}
