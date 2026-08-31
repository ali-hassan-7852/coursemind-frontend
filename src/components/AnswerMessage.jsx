import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// The model sometimes emits literal <br> tags inside table cells - strip them
// to a plain space instead of enabling raw HTML rendering (safer, and
// tables wrap fine on their own without it).
function cleanAnswer(text) {
  return text.replace(/<br\s*\/?>/gi, " ");
}

const markdownComponents = {
  h1: ({ children }) => (
    <h3 className="font-display font-semibold text-ink text-lg mt-3 mb-1.5 first:mt-0">{children}</h3>
  ),
  h2: ({ children }) => (
    <h4 className="font-display font-semibold text-ink text-base mt-3 mb-1.5 first:mt-0">{children}</h4>
  ),
  h3: ({ children }) => (
    <h5 className="font-body font-semibold text-ink text-sm mt-2.5 mb-1 first:mt-0">{children}</h5>
  ),
  p: ({ children }) => <p className="text-ink leading-relaxed mb-2.5 last:mb-0">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
  ul: ({ children }) => <ul className="list-disc list-outside pl-5 mb-2.5 space-y-1 text-ink">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal list-outside pl-5 mb-2.5 space-y-1 text-ink">{children}</ol>,
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  code: ({ inline, children }) =>
    inline ? (
      <code className="font-mono text-xs bg-paper border border-rule rounded px-1.5 py-0.5 text-pinedark">
        {children}
      </code>
    ) : (
      <code className="font-mono text-xs block">{children}</code>
    ),
  pre: ({ children }) => (
    <pre className="bg-ink text-paper font-mono text-xs rounded-lg p-3 overflow-x-auto mb-2.5">{children}</pre>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto mb-2.5 rounded-lg border border-rule">
      <table className="w-full text-sm border-collapse">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-paper">{children}</thead>,
  tr: ({ children }) => <tr className="border-b border-rule last:border-0">{children}</tr>,
  th: ({ children }) => (
    <th className="text-left font-body font-semibold text-ink px-3 py-2 border-r border-rule last:border-0">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="text-ink px-3 py-2 align-top border-r border-rule last:border-0">{children}</td>
  ),
};

export default function AnswerMessage({ question, answer, sources }) {
  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <div className="bg-pine text-white font-body rounded-2xl rounded-br-md px-4 py-2.5 max-w-lg">
          {question}
        </div>
      </div>
      <div className="flex justify-start">
        <div className="bg-card border border-rule font-body rounded-2xl rounded-bl-md px-4 py-3.5 max-w-xl space-y-3">
          <div className="text-ink leading-relaxed">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {cleanAnswer(answer)}
            </ReactMarkdown>
          </div>
          {sources && sources.length > 0 && (
            <div className="pt-2 border-t border-rule space-y-3">
              <p className="font-mono text-xs text-inksoft uppercase tracking-wide">Found in</p>
              {sources.map((s, i) => (
                <div key={i} className="text-sm">
                  <p className="font-mono text-xs text-pine mb-1.5">{s.document_filename}</p>
                  <p className="text-ink leading-snug">
                    <span className="highlight-mark">{s.content}</span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}