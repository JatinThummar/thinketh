import React from 'react';

function textFromNodes(nodes) {
  if (!nodes) return '';
  return nodes
    .map((n) => (typeof n === 'string' ? n : (n?.data || '')))
    .join(' ')
    .trim();
}

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/&amp;/g, 'and')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export default function SectionHeading({ level = 2, children, type = 'accent', lang = 'en', id: idProp }) {
  const Tag = level === 3 ? 'h3' : 'h2';

  const text = textFromNodes(Array.isArray(children) ? children : [children]);
  const id = idProp || slugify(text) || undefined;
  const href = id ? `#${id}` : undefined;
  const className = type === 'accent' ? 'heading accent' : 'heading';

  return (
    <Tag id={id} className={className}>
      {children}
      {href && (
        <a className="anchor" href={href} aria-label="Link to section" title={text}>#</a>
      )}
    </Tag>
  );
}
