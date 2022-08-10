import { useStore } from '@builder.io/mitosis';
import { links, Link } from '../links';

export interface HeaderProps {
  framework: string;
}

export default function Header(props: HeaderProps) {
  const state = useStore({
    getClass(link: Link) {
      return `text-base font-medium capitalize ${
        props.framework === link.name
          ? 'text-blue-500'
          : 'text-gray-500 hover:text-gray-900'
      }`;
    },
  });
  
  return (
    <div class="flex flex-row">
      <link
        href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
        rel="stylesheet"
      />
      {links.map((link) => (
        <a class={state.getClass(link)}>{link.name}</a>
      ))}
    </div>
  );
}
