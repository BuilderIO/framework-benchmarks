import { hljs } from './highlight';

export type CodeViewerProps = {
  code: string;
  language: 'json' | 'javascript' | 'typescript';
};

export default function CodeViewer(props: CodeViewerProps) {
  return (
    <pre>{hljs.highlight(props.code, { language: props.language }).value}</pre>
  );
}
