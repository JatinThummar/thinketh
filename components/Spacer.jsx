export default function Spacer({ size = 'md' }) {
  const allowed = new Set(['xs', 'sm', 'md', 'lg', 'xl']);
  const s = allowed.has(size) ? size : 'md';
  return <div className={`spacer ${s}`} aria-hidden="true" role="presentation" />;
}

