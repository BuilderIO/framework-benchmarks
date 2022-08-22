import { useStore } from '@builder.io/mitosis';
import { frameworks, examples } from '../links.js';
import type { Framework, Example } from '../links.js';
import { rootStylesTag } from '../root-styles.js';

export interface HeaderProps {
  framework: string;
  path: string;
}

export default function AppHeader(props: HeaderProps) {
  const state = useStore({
    getStyleForFrameworkLink(link: Framework) {
      return {
        color:
          props.framework === link.name ? 'var(--primary)' : 'var(--gray-3)',
      };
    },
    getStyleForExampleLink(link: Example) {
      return {
        color: link.url === props.path ? 'var(--primary)' : 'var(--gray-3)',
      };
    },
  });

  return (
    <div>
      {/* TODO: move this out of here */}
      <div innerHTML={rootStylesTag} />
      <div
        css={{
          backgroundColor: '$gray-1',
          borderBottom: '$border-gray',
          display: 'flex',
          padding: '$s1',
          marginBottom: 'var(--s2)',
          '@mobile': {
            flexDirection: 'column',
          },
        }}
      >
        <div
          css={{
            display: 'flex',
            flexWrap: 'wrap',
            padding: '$s1',
            textTransform: 'capitalize',
            '@mobile': {
              borderBottom: 'var(--border-gray)',
              justifyContent: 'center',
            },
          }}
        >
          {frameworks.map((link, index) => (
            <a
              key={index}
              css={{
                padding: '$s1',
                fontWeight: '$font-medium',
                '&:hover': {
                  color: '$gray-4',
                },
              }}
              href={link.url + (props.path || '/')}
              style={state.getStyleForFrameworkLink(link)}
            >
              {link.text || link.name}
            </a>
          ))}
        </div>
        <div
          css={{
            display: 'flex',
            flexWrap: 'wrap',
            textTransform: 'capitalize',
            padding: '$s1',
            marginLeft: 'auto',
            justifyContent: 'flex-end',
            '@mobile': {
              marginRight: 'auto',
              justifyContent: 'center',
            },
            '&:hover': {
              color: '$gray-4',
            },
          }}
        >
          {examples.map((example, index) => (
            <a
              key={index}
              css={{
                padding: '$s1',
                fontWeight: '$font-medium',
              }}
              href={example.url}
              style={state.getStyleForExampleLink(example)}
            >
              {example.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
