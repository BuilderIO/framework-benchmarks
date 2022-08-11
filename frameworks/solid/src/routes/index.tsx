import { HelloWorld, AppHeader } from '@builder.io/components/solid';

export default function Home() {
  return (
    <>
      <AppHeader framework="solid" path="/" />
      <HelloWorld name="Solid" />
    </>
  );
}
