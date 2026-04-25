"use client";
import { useState } from "react";
import Nav from "@/components/ui/Nav";
import Footer from "@/components/ui/Footer";
import Card from "@/components/ui/Card";
import PricingToggle from "@/components/ui/PricingToggle";
import FaqAccordion from "@/components/ui/FaqAccordion";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";
import { Check, Crown, Rocket, Sparkles, Star } from "lucide-react";

type Tier = {
  name: string;
  icon: any;
  monthly: number | "Custom";
  yearly: number | "Custom";
  highlight?: boolean;
  bullets: string[];
  cta: string;
};

const tiers: Tier[] = [
  {
    name: "FREE",
    icon: Sparkles,
    monthly: 0,
    yearly: 0,
    bullets: ["3 upload / bulan", "Chart basic", "Watermark Grafio", "Komunitas support"],
    cta: "Mulai Gratis",
  },
  {
    name: "STUDENT",
    icon: Star,
    monthly: 29000,
    yearly: 23200,
    highlight: true,
    bullets: ["30 upload / bulan", "Semua chart type", "Export PNG", "Email support"],
    cta: "Pilih Student",
  },
  {
    name: "PRO",
    icon: Rocket,
    monthly: 99000,
    yearly: 79200,
    bullets: ["Unlimited upload", "PDF & PPT report", "AI insight & copilot", "Priority support", "API access"],
    cta: "Pilih Pro",
  },
  {
    name: "ENTERPRISE",
    icon: Crown,
    monthly: "Custom",
    yearly: "Custom",
    bullets: ["Tim & SSO", "Custom branding", "On-premise opsional", "Dedicated CSM", "SLA 99.9%"],
    cta: "Hubungi Sales",
  },
];

function formatPrice(v: number | "Custom") {
  if (v === "Custom") return "Custom";
  if (v === 0) return "Rp 0";
  return `Rp ${v.toLocaleString("id")}`;
}

export default function Pricing() {
  const [monthly, setMonthly] = useState(true);

  const choose = (tier: Tier) => {
    if (tier.name === "ENTERPRISE") {
      window.location.href = "/contact#sales";
    } else {
      window.location.href = "/signup";
    }
  };

  return (
    <main className="min-h-screen bg-bgDeep relative">
      <Nav />
      <div className="absolute inset-0 bg-grad-hero pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <SectionHeader
          eyebrow="Pricing"
          title="Harga Transparan, Tanpa Kaget"
          description="Mulai gratis, upgrade kapan saja. Tidak ada biaya tersembunyi, cancel kapan saja."
        />
        <PricingToggle monthly={monthly} setMonthly={setMonthly} />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {tiers.map((t) => {
            const price = monthly ? t.monthly : t.yearly;
            return (
              <div
                key={t.name}
                className={`relative rounded-2xl p-6 transition-all duration-300 ${
                  t.highlight
                    ? "border-2 border-cyan bg-gradient-to-b from-cyan/10 to-transparent shadow-glow"
                    : "border border-borderColor bg-bgSurface hover:border-cyan/40"
                }`}
              >
                {t.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan text-bgDeep text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full">
                    Paling Populer
                  </span>
                )}
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-cyan/15 border border-cyan/30 flex items-center justify-center">
                    <t.icon className="w-4 h-4 text-cyan" />
                  </div>
                  <h3 className="font-syne font-bold text-white">{t.name}</h3>
                </div>
                <p className="text-3xl font-syne font-extrabold text-white mb-1">
                  {formatPrice(price)}
                </p>
                <p className="text-xs text-muted mb-5">
                  {t.monthly === "Custom" ? "Hubungi tim sales" : `/${monthly ? "bulan" : "bulan, billed yearly"}`}
                </p>
                <ul className="space-y-2 mb-6 text-sm">
                  {t.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-muted">
                      <Check className="w-4 h-4 text-mint flex-shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => choose(t)}
                  variant={t.highlight ? "primary" : "ghost"}
                  className="w-full"
                >
                  {t.cta}
                </Button>
              </div>
            );
          })}
        </div>

        {/* COMPARISON note */}
        <div className="mt-16 max-w-3xl mx-auto text-center">
          <Card glass>
            <p className="text-sm text-muted">
              Semua paket berbayar termasuk{" "}
              <span className="text-cyan">7 hari free trial</span>, tanpa kartu kredit.
              Upgrade / downgrade kapan saja dari dashboard.
            </p>
          </Card>
        </div>

        <FaqAccordion />
      </div>
      <Footer />
    </main>
  );
}
