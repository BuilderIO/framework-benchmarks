import AppHeader from '../generated-components/components/app-header';
import HelloWorld from '../generated-components/components/hello-world';

export default function Home() {
  return (
    <>
      <AppHeader framework="solid" path="/" />
      <HelloWorld />
    </>
  );
}
