import { useState, useRef } from "react";
import { LogOut, Upload, Send, BookOpen } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { uploadDocument, askQuestion, ApiError } from "../api/client";
import DocumentChip from "../components/DocumentChip";
import AnswerMessage from "../components/AnswerMessage";
import Spinner from "../components/Spinner";

export default function DashboardPage() {
  const { token, email, signOut } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [asking, setAsking] = useState(false);
  const [askError, setAskError] = useState("");
  const fileInputRef = useRef(null);

  async function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError("");
    setUploading(true);
    try {
      const result = await uploadDocument(file, token);
      setDocuments((prev) => [
        ...prev,
        { filename: result.filename, chunks: result.chunks_created },
      ]);
    } catch (err) {
      setUploadError(
        err instanceof ApiError ? err.message : "Upload failed. Try again."
      );
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function handleAsk(e) {
    e.preventDefault();
    if (!question.trim() || asking) return;
    const currentQuestion = question;
    setQuestion("");
    setAskError("");
    setAsking(true);
    try {
      const result = await askQuestion(currentQuestion, token);
      setMessages((prev) => [
        ...prev,
        { question: currentQuestion, answer: result.answer, sources: result.sources },
      ]);
    } catch (err) {
      setAskError(
        err instanceof ApiError ? err.message : "Couldn't get an answer. Try again."
      );
    } finally {
      setAsking(false);
    }
  }

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 border-b border-rule bg-card">
        <div className="flex items-center gap-2">
          <BookOpen className="text-pine" size={22} strokeWidth={2.2} />
          <span className="font-display font-semibold text-ink">CourseMind AI</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-body text-sm text-inksoft hidden sm:inline">{email}</span>
          <button
            onClick={signOut}
            className="flex items-center gap-1.5 font-body text-sm text-inksoft hover:text-ink transition-colors"
          >
            <LogOut size={15} /> Log out
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row max-w-6xl w-full mx-auto lg:min-h-0">
        {/* Sidebar */}
        <aside className="lg:w-72 flex-shrink-0 border-b lg:border-b-0 lg:border-r border-rule px-6 py-6">
          <h2 className="font-display font-semibold text-ink mb-1">Your documents</h2>
          <p className="font-body text-sm text-inksoft mb-4">
            Upload a PDF to ask questions about it.
          </p>

          <label className="flex items-center justify-center gap-2 border-2 border-dashed border-rule rounded-xl py-6 cursor-pointer hover:border-pine hover:bg-pine/5 transition-colors mb-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
              disabled={uploading}
            />
            {uploading ? (
              <span className="flex items-center gap-2 font-body text-sm text-inksoft">
                <Spinner /> Reading your PDF…
              </span>
            ) : (
              <span className="flex items-center gap-2 font-body text-sm text-pine font-medium">
                <Upload size={16} /> Upload a PDF
              </span>
            )}
          </label>

          {uploadError && (
            <p className="font-body text-sm text-danger mb-4">{uploadError}</p>
          )}

          <div className="space-y-2">
            {documents.length === 0 ? (
              <p className="font-body text-sm text-inksoft italic">
                Nothing uploaded yet this session.
              </p>
            ) : (
              documents.map((doc, i) => (
                <DocumentChip key={i} filename={doc.filename} chunks={doc.chunks} />
              ))
            )}
          </div>
        </aside>

        {/* Chat */}
        <main className="flex-1 flex flex-col px-6 py-6 min-h-[70vh]">
          <div className="flex-1 space-y-6 mb-6 overflow-y-auto">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <BookOpen size={32} className="text-rule mb-3" />
                <p className="font-body text-inksoft max-w-sm">
                  Upload a PDF, then ask a question about it — I'll answer
                  using only what's inside your document.
                </p>
              </div>
            ) : (
              messages.map((m, i) => <AnswerMessage key={i} {...m} />)
            )}
            {asking && (
              <div className="flex justify-start">
                <div className="bg-card border border-rule rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-2 font-body text-sm text-inksoft">
                  <Spinner /> Reading through your documents…
                </div>
              </div>
            )}
          </div>

          {askError && <p className="font-body text-sm text-danger mb-3">{askError}</p>}

          <form onSubmit={handleAsk} className="flex gap-2">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a question about your notes…"
              className="flex-1 font-body px-4 py-3 rounded-xl border border-rule bg-card text-ink focus:outline-none focus:ring-2 focus:ring-pine focus:border-transparent"
            />
            <button
              type="submit"
              disabled={asking || !question.trim()}
              className="bg-pine hover:bg-pinedark disabled:opacity-50 text-white rounded-xl px-4 py-3 transition-colors"
            >
              <Send size={18} />
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}
