import { FileText, Trash2 } from "lucide-react";
import Spinner from "./Spinner";

export default function DocumentChip({ filename, chunks, onDelete, deleting }) {
  return (
    <div className="flex items-center gap-2.5 bg-card border border-rule rounded-lg px-3 py-2.5">
      <FileText size={16} className="text-pine flex-shrink-0" />
      <div className="min-w-0 flex-1">
        <p className="font-body text-sm text-ink truncate">{filename}</p>
        <p className="font-mono text-xs text-inksoft">{chunks} chunks indexed</p>
      </div>
      <button
        type="button"
        onClick={onDelete}
        disabled={deleting}
        aria-label={`Delete ${filename}`}
        className="flex-shrink-0 text-inksoft hover:text-danger transition-colors disabled:opacity-50"
      >
        {deleting ? <Spinner /> : <Trash2 size={15} />}
      </button>
    </div>
  );
}