// Highlights every case-insensitive occurrence of `query` inside `text`.
export const Highlight = ({ text, query }) => {
  const q = (query || "").trim();
  if (!q) return <>{text}</>;

  const lower = text.toLowerCase();
  const ql = q.toLowerCase();
  if (!lower.includes(ql)) return <>{text}</>;

  const parts = [];
  let i = 0;
  let pos;
  while ((pos = lower.indexOf(ql, i)) !== -1) {
    if (pos > i) parts.push(text.slice(i, pos));
    parts.push(
      <mark className="cs-hl" key={pos}>
        {text.slice(pos, pos + q.length)}
      </mark>
    );
    i = pos + q.length;
  }
  if (i < text.length) parts.push(text.slice(i));

  return <>{parts}</>;
};
