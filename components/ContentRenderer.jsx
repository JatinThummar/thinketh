import parse, { domToReact } from 'html-react-parser';
import Callout from '@/components/Callout';
import Divider from '@/components/Divider';
import SectionHeading from '@/components/SectionHeading';
import BlockQuote from '@/components/BlockQuote';
import Highlight from '@/components/Highlight';
import Spacer from '@/components/Spacer';
import { renderPugForLang } from '@/lib/pugRender';

export default function ContentRenderer({ lang }) {
  const html = renderPugForLang(lang);

  function getTextFromDom(node) {
    if (!node) return '';
    if (Array.isArray(node)) return node.map(getTextFromDom).join(' ');
    if (node.type === 'text') return node.data || '';
    if (node.children && node.children.length) return getTextFromDom(node.children);
    return '';
  }

  function slugify(str) {
    return String(str)
      .toLowerCase()
      .replace(/&amp;/g, 'and')
      .replace(/[^\p{L}\p{N}\s-]/gu, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  const options = {
    replace: (node) => {
      if (!node || node.type !== 'tag') return;

      // Enhance h2/h3 headings with ids + anchor links
      if (node.name === 'h2' || node.name === 'h3') {
        const level = node.name === 'h3' ? 3 : 2;
        // Default to accent for all languages; allow explicit override via data-heading
        let type = 'accent';
        const attrType = node.attribs?.['data-heading'];
        if (attrType === 'plain' || attrType === 'accent') type = attrType;
        const rawText = getTextFromDom(node.children);
        const id = slugify(rawText);
        return (
          <SectionHeading level={level} type={type} lang={lang} id={id}>
            {domToReact(node.children, options)}
          </SectionHeading>
        );
      }

      // Style blockquotes consistently
      if (node.name === 'blockquote') {
        return <BlockQuote>{domToReact(node.children, options)}</BlockQuote>;
      }

      // Inline highlights
      if (node.name === 'x-highlight' || (node.attribs && node.attribs['data-highlight'] !== undefined)) {
        return <Highlight>{domToReact(node.children, options)}</Highlight>;
      }

      // Custom tag: <x-callout type="tip">...</x-callout>
      if (node.name === 'x-callout') {
        const type = node.attribs?.type || 'note';
        return <Callout type={type}>{domToReact(node.children, options)}</Callout>;
      }

      // Attribute-based component: <div data-component="callout" data-type="tip">...</div>
      if (node.attribs && node.attribs['data-component'] === 'callout') {
        const type = node.attribs['data-type'] || 'note';
        return <Callout type={type}>{domToReact(node.children, options)}</Callout>;
      }

      // Custom divider: <x-divider /> or <div data-component="divider" />
      if (node.name === 'x-divider' || (node.attribs && node.attribs['data-component'] === 'divider')) {
        return <Divider />;
      }

      // Vertical space: <x-space size="md" /> or <div data-component="spacer" data-size="lg" />
      if (node.name === 'x-space' || (node.attribs && node.attribs['data-component'] === 'spacer')) {
        const size = node.attribs?.size || node.attribs?.['data-size'] || 'md';
        return <Spacer size={size} />;
      }
      return undefined; // leave everything else as-is
    },
  };

  return <div className="content">{parse(html, options)}</div>;
}
