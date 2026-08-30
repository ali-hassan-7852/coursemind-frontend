import { FileText } from "lucide-react";

export default function DocumentChip({ filename, chunks }) {
  return (
    <div className="flex items-center gap-2.5 bg-card border border-rule rounded-lg px-3 py-2.5">
      <FileText size={16} className="text-pine flex-shrink-0" />
      <div className="min-w-0">
        <p className="font-body text-sm text-ink truncate">{filename}</p>
        <p className="font-mono text-xs text-inksoft">{chunks} chunks indexed</p>
      </div>
    </div>
  );
}
