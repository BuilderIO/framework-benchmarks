import AppHeader from '../generated-components/components/app-header';
import Dashboard from '../generated-components/components/dashboard';

export default function Home() {
  return (
    <>
      <AppHeader framework="solid" path="/dashboard" />
      <Dashboard />
    </>
  );
}
