"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

const links = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "backdrop-blur-xl bg-bgDeep/80 border-b border-borderColor" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <Logo className="w-9 h-9 text-silver group-hover:text-cyan transition-colors" />
          <span className="font-syne font-extrabold text-xl tracking-wide text-white group-hover:text-gradient transition-all">
            GRAFIO
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm transition-colors ${
                pathname === l.href ? "text-cyan" : "text-muted hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/login" className="text-sm text-muted hover:text-white transition-colors">
            Login
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 rounded-md bg-cyan text-bgDeep font-semibold text-sm hover:bg-cyanSoft hover:scale-[1.03] transition-all flex items-center gap-1.5 shadow-glow"
          >
            <Sparkles className="w-3.5 h-3.5" /> Coba Gratis
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label="Menu"
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-white"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-borderColor bg-bgDeep/95 backdrop-blur-xl">
          <div className="flex flex-col px-6 py-4 gap-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`text-sm ${pathname === l.href ? "text-cyan" : "text-muted"}`}
              >
                {l.label}
              </Link>
            ))}
            <Link href="/login" onClick={() => setOpen(false)} className="text-sm text-muted">
              Login
            </Link>
            <Link
              href="/signup"
              onClick={() => setOpen(false)}
              className="px-4 py-2 rounded-md bg-cyan text-bgDeep font-semibold text-sm text-center"
            >
              Coba Gratis
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
