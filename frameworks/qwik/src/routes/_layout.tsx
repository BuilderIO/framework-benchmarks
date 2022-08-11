import { component$, Host, Slot } from '@builder.io/qwik';
import { AppHeader } from '@builder.io/components/qwik';

export default component$(() => {
  return (
    <Host>
      <AppHeader />
      <Slot />
    </Host>
  );
});
