export default function HelloWorld(props: { name?: string }) {
  return <h1>Hello {props.name || 'world'}</h1>;
}
