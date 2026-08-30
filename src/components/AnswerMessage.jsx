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
          <p className="text-ink leading-relaxed">{answer}</p>
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
