import { component$ } from '@builder.io/qwik';
import { useDocumentHead, useLocation } from '@builder.io/qwik-city';
import global from '../../global.css?inline';

export const Head = component$(() => {
  const head = useDocumentHead();
  const loc = useLocation();

  return (
    <head>
      <meta charSet="utf-8" />

      <title>{head.title ? `${head.title} - Qwik` : `Qwik`}</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      ></meta>

      <style dangerouslySetInnerHTML={global}/>

      <link rel="canonical" href={loc.href} />

      {head.meta.map((m) => (
        <meta {...m} />
      ))}

      {head.links.map((l) => (
        <link {...l} />
      ))}

      {head.styles.map((s) => (
        <style {...s.props} dangerouslySetInnerHTML={s.style} />
      ))}
    </head>
  );
});
