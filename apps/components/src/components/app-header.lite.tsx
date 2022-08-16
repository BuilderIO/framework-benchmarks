import { useStore } from '@builder.io/mitosis';
import { frameworks, examples } from '../links.js';
import type { Framework, Example } from '../links.js';

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
      {/* TODO: maybe some global style component, or use css={{}} obj with some @global or something */}
      <style jsx>{`
        :root {
          /* Space */
          --s1: 5px;
          --s2: calc(--s1 * 2);
          --gray-1: #bbb;
          --gray-2: #999;
          --border-gray: 1px solid var(--gray-2);
          --shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
          --round: 4px;
          --primary: steelblue;
          --mobile: 640px;
        }

        ul {
          list-style-type: none;
          margin: 0;
          padding: 0;
        }
      `}</style>
      <div
        css={{
          background: 'var(--gray)',
          borderBottom: '1px solid var(--gray-2)',
          display: 'flex',
          marginBottom: 'var(--s2)',
        }}
      >
        <div
          css={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            borderBottom: 'var(--border-gray)',
            padding: 'var(--s2)',
          }}
        >
          {frameworks.map((link) => (
            <a
              href={link.url + (props.path || '/')}
              class={state.getClassForFrameworkLink(link)}
            >
              {link.text || link.name}
            </a>
          ))}
        </div>
        <div
          css={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            borderBottom: 'var(--border-gray)',
            padding: 'var(--s2)',
          }}
        >
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
