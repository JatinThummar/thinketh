export default function BlockQuote({ children }) {
  return (
    <blockquote className="blockquote">
      <span className="quote-mark" aria-hidden>
        “
      </span>
      <div className="quote-body">{children}</div>
    </blockquote>
  );
}

