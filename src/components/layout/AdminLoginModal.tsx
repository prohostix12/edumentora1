"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, ShieldCheck, X, Eye, EyeOff } from "lucide-react";

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminLoginModal({ isOpen, onClose }: AdminLoginModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        onClose();
        router.push("/admin");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-md p-4 animate-fadeIn" 
      onClick={onClose}
    >
      <div 
        className="glass rounded-[2.5rem] shadow-hover p-8 w-full max-w-md relative overflow-hidden animate-scaleIn"
        onClick={e => e.stopPropagation()}
      >
        {/* Top gradient bar */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-primary via-accent to-primary" />

        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-primary block mb-1">
              Admin Portal
            </span>
            <h2 className="text-2xl font-extrabold text-heading tracking-tight">
              Dashboard Sign-In
            </h2>
          </div>
          <button 
            onClick={onClose} 
            className="h-9 w-9 flex items-center justify-center rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-100 text-slate-400 hover:text-slate-600 transition-all shadow-sm"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Secure badge */}
        <div className="flex items-center gap-4 bg-slate-50 border border-slate-100/80 rounded-2xl p-4 mb-6">
          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 border border-primary/20 text-primary shrink-0 shadow-sm">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-heading">Encrypted Access</h3>
            <p className="text-[10px] font-bold text-paragraph/70">Secure session authentication enabled</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-heading mb-2" htmlFor="admin-username">
              Username / Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-paragraph/60" />
              </div>
              <input
                id="admin-username"
                type="text"
                placeholder="admin@edumentora.com"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-11 pr-4 py-3 text-sm font-semibold text-heading placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-heading mb-2" htmlFor="admin-password">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-paragraph/60" />
              </div>
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-11 pr-11 py-3 text-sm font-semibold text-heading placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 text-xs font-semibold rounded-xl p-3">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary to-primary-dark hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98] text-white font-bold py-3.5 rounded-xl transition-all disabled:opacity-60 text-xs mt-6 cursor-pointer"
          >
            {loading ? "Verifying Credentials..." : "Authenticate Session"}
          </button>
        </form>
      </div>
    </div>
  );
}
