import { hljs } from './highlight';

export type CodeViewerProps = {
  code: string;
  language: 'json' | 'javascript' | 'typescript';
  style?: any;
};

export default function CodeViewer(props: CodeViewerProps) {
  return (
    <pre
      css={{
        overflow: 'auto',
        borderRadius: '$round',
        padding: '$s2',
        backgroundColor: '$gray-5',
        color: 'white',
        '.hljs-punctuation': {
          color: '#c9d1d9',
        },
        '.hljs-attr': {
          color: '#7ee787',
        },
        '.hljs-string': {
          color: '#a5d6ff',
        },
        '.hljs-number': {
          color: '#ffa657',
        },
      }}
      style={props.style}
      innerHTML={hljs.highlight(props.code, { language: props.language }).value}
    />
  );
}
