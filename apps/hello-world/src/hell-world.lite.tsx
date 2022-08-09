export default function HelloWorld(props: { frameworkName?: string }) {
  return <h1>Hello {props.frameworkName || 'world'}</h1>;
}
