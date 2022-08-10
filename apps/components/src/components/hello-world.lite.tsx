export default function HelloWorld(props: { name?: string }) {
  return <h1 class="text-center p-10">Hello {props.name || 'world'}</h1>;
}
