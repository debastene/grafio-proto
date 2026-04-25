"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import { Mail, Lock, User, ArrowRight, Check } from "lucide-react";

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", agree: false });
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.agree) return;
    setLoading(true);
    setTimeout(() => router.push("/dashboard"), 700);
  };

  return (
    <main className="min-h-screen bg-bgDeep flex items-center justify-center px-6 py-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-grad-hero pointer-events-none" />
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      <div className="relative w-full max-w-md">
        <Link href="/" className="flex items-center justify-center gap-2.5 mb-8 group">
          <Logo className="w-10 h-10 text-silver group-hover:text-cyan transition-colors" />
          <span className="font-syne font-extrabold text-2xl tracking-wide text-white">
            GRAFIO
          </span>
        </Link>

        <div className="glass rounded-2xl p-8 shadow-soft">
          <h1 className="text-2xl font-syne font-bold text-white mb-1">Buat Akun Gratis</h1>
          <p className="text-sm text-muted mb-6">14 hari Pro gratis · tanpa kartu kredit.</p>

          <form onSubmit={onSubmit} className="space-y-4">
            <label className="block">
              <span className="text-xs text-muted">Nama lengkap</span>
              <div className="mt-1 relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Nama kamu"
                  className="w-full pl-10 pr-3 py-2.5 bg-bgSurface border border-borderColor rounded-md text-sm text-white focus:outline-none focus:border-cyan/50 placeholder:text-muted/60"
                />
              </div>
            </label>
            <label className="block">
              <span className="text-xs text-muted">Email</span>
              <div className="mt-1 relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="kamu@email.com"
                  className="w-full pl-10 pr-3 py-2.5 bg-bgSurface border border-borderColor rounded-md text-sm text-white focus:outline-none focus:border-cyan/50 placeholder:text-muted/60"
                />
              </div>
            </label>
            <label className="block">
              <span className="text-xs text-muted">Password</span>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Min. 6 karakter"
                  className="w-full pl-10 pr-3 py-2.5 bg-bgSurface border border-borderColor rounded-md text-sm text-white focus:outline-none focus:border-cyan/50 placeholder:text-muted/60"
                />
              </div>
            </label>
            <label className="flex items-start gap-2 text-xs text-muted">
              <input
                type="checkbox"
                required
                checked={form.agree}
                onChange={(e) => setForm({ ...form, agree: e.target.checked })}
                className="accent-cyan mt-0.5"
              />
              Saya setuju dengan{" "}
              <Link href="/contact#terms" className="text-cyan hover:underline">
                Terms
              </Link>{" "}
              dan{" "}
              <Link href="/contact#privacy" className="text-cyan hover:underline">
                Privacy
              </Link>
              .
            </label>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Membuat akun…" : <>Buat Akun <ArrowRight className="w-4 h-4" /></>}
            </Button>
          </form>

          <ul className="mt-6 space-y-1.5 text-xs text-muted">
            <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-mint" /> Akses semua fitur Pro selama 14 hari</li>
            <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-mint" /> Cancel kapan saja</li>
            <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-mint" /> Data dienkripsi end-to-end</li>
          </ul>

          <p className="text-center text-sm text-muted mt-6">
            Sudah punya akun?{" "}
            <Link href="/login" className="text-cyan hover:underline">
              Login
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-muted mt-6">
          <Link href="/" className="hover:text-white">← Kembali ke beranda</Link>
        </p>
      </div>
    </main>
  );
}
