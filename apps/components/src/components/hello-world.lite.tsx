export default function HelloWorld(props: { name?: string }) {
  return (
    <h1
      css={{
        textAlign: 'center',
        padding: 'var(--s2)',
      }}
    >
      Hello {props.name || 'world'}
    </h1>
  );
}
