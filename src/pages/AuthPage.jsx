import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { BookOpen, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { signup, login, ApiError } from "../api/client";
import Spinner from "../components/Spinner";

export default function AuthPage() {
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [emailInput, setEmailInput] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setError("");
  }, [mode]);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "signup") {
        await signup(emailInput, password);
      }
      const data = await login(emailInput, password);
      signIn(data.access_token, emailInput);
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-paper flex flex-col lg:flex-row">
      {/* Left: hero */}
      <div className="lg:w-1/2 flex flex-col justify-center px-8 py-16 lg:px-20">
        <div className="flex items-center gap-2 mb-10">
          <BookOpen className="text-pine" size={26} strokeWidth={2.2} />
          <span className="font-display font-semibold text-lg text-ink tracking-tight">
            CourseMind AI
          </span>
        </div>

        <h1 className="font-display text-4xl lg:text-5xl font-semibold text-ink leading-tight mb-6 max-w-lg">
          Ask your textbook anything.
        </h1>
        <p className="font-body text-inksoft text-lg mb-12 max-w-md leading-relaxed">
          Upload your own course notes and PDFs. Ask a question in plain
          words. Get an answer pulled straight from your material — with
          the exact passage it came from.
        </p>

        <div className="bg-card border border-rule rounded-xl shadow-sm p-6 max-w-md rotate-[-0.6deg]">
          <p className="font-mono text-xs text-inksoft mb-3 uppercase tracking-wide">
            You asked
          </p>
          <p className="font-body text-ink mb-5">
            "Why does recursion need a base case?"
          </p>
          <div className="h-px bg-rule mb-5" />
          <p className="font-mono text-xs text-inksoft mb-3 uppercase tracking-wide">
            Found in your notes
          </p>
          <p className="font-body text-ink leading-relaxed">
            Without a{" "}
            <span className="highlight-mark font-medium">
              base case, the function would call itself forever
            </span>
            , never reaching a stopping point.
          </p>
        </div>
      </div>

      {/* Right: auth form */}
      <div className="lg:w-1/2 flex items-center justify-center px-8 py-16 lg:px-20 bg-card lg:border-l border-rule">
        <div className="w-full max-w-sm">
          <div className="flex gap-1 mb-8 bg-paper rounded-lg p-1 border border-rule">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`flex-1 py-2 rounded-md font-body font-medium text-sm transition-colors ${
                mode === "login" ? "bg-card text-ink shadow-sm" : "text-inksoft"
              }`}
            >
              Log in
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`flex-1 py-2 rounded-md font-body font-medium text-sm transition-colors ${
                mode === "signup" ? "bg-card text-ink shadow-sm" : "text-inksoft"
              }`}
            >
              Sign up
            </button>
          </div>

          <h2 className="font-display text-2xl font-semibold text-ink mb-1">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h2>
          <p className="font-body text-inksoft text-sm mb-8">
            {mode === "login"
              ? "Log in to pick up where you left off."
              : "Takes about ten seconds. No credit card, no essay."}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className="block font-body text-sm font-medium text-ink mb-1.5"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full font-body px-3.5 py-2.5 rounded-lg border border-rule bg-paper text-ink focus:outline-none focus:ring-2 focus:ring-pine focus:border-transparent"
                placeholder="you@university.edu"
              />
            </div>
            <div>
              <label
                className="block font-body text-sm font-medium text-ink mb-1.5"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full font-body px-3.5 py-2.5 rounded-lg border border-rule bg-paper text-ink focus:outline-none focus:ring-2 focus:ring-pine focus:border-transparent"
                placeholder="At least 8 characters"
              />
            </div>

            {error && (
              <p className="font-body text-sm text-danger bg-danger/10 border border-danger/20 rounded-lg px-3.5 py-2.5">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-pine hover:bg-pinedark disabled:opacity-70 text-white font-body font-medium py-2.5 rounded-lg transition-colors"
            >
              {loading ? (
                <Spinner />
              ) : (
                <>
                  {mode === "login" ? "Log in" : "Create account"}
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <p className="font-body text-xs text-inksoft mt-6 text-center">
            First request after a quiet period can take up to a minute to
            wake up — that's normal.
          </p>
        </div>
      </div>
    </div>
  );
}
