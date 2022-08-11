import { component$, Host, Slot } from '@builder.io/qwik';
import { AppHeader } from '@builder.io/components/qwik';
import { useLocation } from '@builder.io/qwik-city';

export default component$(() => {
  const { pathname } = useLocation();

  return (
    <Host>
      <AppHeader framework="qwik" path={pathname} />
      <Slot />
    </Host>
  );
});
