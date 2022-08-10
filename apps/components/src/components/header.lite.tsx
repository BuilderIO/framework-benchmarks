import { useStore } from '@builder.io/mitosis';
import { frameworks, Framework, examples, Example } from '../links';

export interface HeaderProps {
  framework: string;
  path: string;
}

export default function Header(props: HeaderProps) {
  const state = useStore({
    getClassForFrameworkLink(link: Framework) {
      return `p-2 text-base font-medium capitalize ${
        props.framework === link.name
          ? 'text-blue-500'
          : 'text-gray-500 hover:text-gray-900'
      }`;
    },
    getclassForExampleLink(link: Example) {
      return `p-2 text-base font-medium capitalize ${
        link.url === props.path
          ? 'text-blue-500'
          : 'text-gray-500 hover:text-gray-900'
      }`;
    },
  });

  return (
    <>
      <link
        href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
        rel="stylesheet"
      />
      <div class="flex flex-row justify-center">
        {frameworks.map((link) => (
          <a
            href={link.url + (props.path || '/')}
            class={state.getClassForFrameworkLink(link)}
          >
            {link.name}
          </a>
        ))}
      </div>
      <div class="flex flex-row justify-center">
        {examples.map((example) => (
          <a href={example.url} class={state.getclassForExampleLink(example)}>
            {example.name}
          </a>
        ))}
      </div>
    </>
  );
}
