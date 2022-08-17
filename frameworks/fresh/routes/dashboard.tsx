/** @jsx h */
import { h } from 'preact';
import AppHeader from '../components/generated-components/components/app-header.js';
import Dashboard from '../islands/Dashboard.tsx';

export default function Home() {
  return (
    <div>
      <AppHeader framework="fresh" path="/dashboard" />
      <Dashboard />
    </div>
  );
}
