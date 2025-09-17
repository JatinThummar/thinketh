export default function Callout({ type = 'note', children }) {
  const color = type === 'tip' ? 'var(--primary-color)'
    : type === 'warn' ? '#d97706'
    : type === 'danger' ? '#dc2626'
    : 'var(--primary-color)';
  return (
    <aside className="callout" style={{ borderLeftColor: color }}>
      <div className="callout-dot" style={{ background: color }} />
      <div className="callout-body">{children}</div>
    </aside>
  );
}

