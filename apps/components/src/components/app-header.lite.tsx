import { useStore } from '@builder.io/mitosis';
import { frameworks, Framework, examples, Example } from '../links.js';

export interface HeaderProps {
  framework: string;
  path: string;
}

export default function AppHeader(props: HeaderProps) {
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
    <div>
      <link
        href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
        rel="stylesheet"
      />
      <div class="bg-gray-100 border-gray-200 border-b-2 flex flex-col md:flex-row mb-8">
        <div class="flex flex-row justify-center flex-wrap border-gray-200 border-b-2 md:border-b-0 p-2">
          {frameworks.map((link) => (
            <a
              href={link.url + (props.path || '/')}
              class={state.getClassForFrameworkLink(link)}
            >
              {link.text || link.name}
            </a>
          ))}
        </div>
        <div class="flex flex-row justify-center md:ml-auto flex-wrap p-2">
          {examples.map((example) => (
            <a href={example.url} class={state.getclassForExampleLink(example)}>
              {example.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
