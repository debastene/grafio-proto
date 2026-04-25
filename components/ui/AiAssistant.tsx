"use client";
import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, User, Bot } from "lucide-react";

type Msg = { role: "user" | "ai"; text: string };

const SUGGESTIONS = [
  "Apa tren utama dari data ini?",
  "Identifikasi anomali bulan terakhir",
  "Rekomendasikan chart terbaik",
  "Buatkan ringkasan untuk presentasi",
];

const CANNED: { match: RegExp; reply: string }[] = [
  {
    match: /tren|trend/i,
    reply:
      "Tren keseluruhan menunjukkan pertumbuhan +8.4% / bulan. Penjualan tumbuh paling kuat di Q2, dengan April sebagai puncak (+23% di atas target). Saya merekomendasikan menambahkan moving-average 3 bulan untuk smoothing.",
  },
  {
    match: /anomali|outlier/i,
    reply:
      "Saya mendeteksi 1 anomali signifikan: Maret -25% dari trend. Z-score = -2.4. Korelasi tinggi dengan drop traffic di kanal Marketplace pada periode yang sama.",
  },
  {
    match: /chart|visual|grafik/i,
    reply:
      "Untuk dataset time-series + target, kombinasi Line + Bar (mixed chart) paling informatif. Untuk distribusi kategori, Doughnut. Untuk korelasi multi-metrik, Radar atau Bubble. Mau saya generate semuanya?",
  },
  {
    match: /ringkas|summary|presentasi/i,
    reply:
      "Ringkasan Eksekutif: Penjualan tumbuh 8.4%/bln, total Rp 324M (6 bulan). 4/6 bulan melampaui target. Margin stabil 27-32%. Rekomendasi: scale-up kanal A, audit kanal C, replikasi playbook April.",
  },
];

function reply(input: string): string {
  for (const c of CANNED) if (c.match.test(input)) return c.reply;
  return "Saya menganalisis pertanyaan kamu… Untuk dataset yang sudah dimuat, saya sarankan eksplorasi distribusi, korelasi, dan deteksi outlier terlebih dulu. Coba salah satu suggestion di atas, atau tanya hal spesifik soal kolom data.";
}

export default function AiAssistant() {
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "ai",
      text: "Halo! Saya Grafio AI. Tanyakan apa saja tentang datamu — saya bisa bantu cari tren, anomali, dan rekomendasi visualisasi.",
    },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, thinking]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t) return;
    setMsgs((m) => [...m, { role: "user", text: t }]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      setMsgs((m) => [...m, { role: "ai", text: reply(t) }]);
      setThinking(false);
    }, 700);
  };

  return (
    <div className="glass rounded-xl flex flex-col h-[460px]">
      <div className="flex items-center gap-2 px-5 py-4 border-b border-borderColor">
        <div className="w-8 h-8 rounded-lg bg-cyan/15 border border-cyan/30 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-cyan" />
        </div>
        <div>
          <p className="font-syne font-bold text-white text-sm">Grafio AI Copilot</p>
          <p className="text-[10px] uppercase tracking-widest text-mint">Online</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {msgs.map((m, i) => (
          <div key={i} className={`flex gap-2.5 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
            <div
              className={`w-7 h-7 rounded-md flex-shrink-0 flex items-center justify-center ${
                m.role === "user" ? "bg-purple/20 text-purple" : "bg-cyan/15 text-cyan"
              }`}
            >
              {m.role === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>
            <div
              className={`max-w-[80%] rounded-lg px-3.5 py-2.5 text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-cyan text-bgDeep"
                  : "bg-bgSurface border border-borderColor text-white"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {thinking && (
          <div className="flex gap-2.5">
            <div className="w-7 h-7 rounded-md bg-cyan/15 text-cyan flex items-center justify-center">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <div className="flex items-center gap-1 bg-bgSurface border border-borderColor rounded-lg px-3 py-2.5">
              <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
              <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" style={{ animationDelay: "0.15s" }} />
              <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" style={{ animationDelay: "0.3s" }} />
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {msgs.length <= 1 && (
        <div className="px-5 pb-2 flex flex-wrap gap-1.5">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="text-[11px] px-2.5 py-1 rounded-full border border-borderColor text-muted hover:border-cyan hover:text-cyan transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="border-t border-borderColor px-3 py-3 flex items-center gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tanya apa saja tentang datamu…"
          className="flex-1 bg-bgSurface border border-borderColor rounded-md px-3 py-2 text-sm text-white placeholder:text-muted focus:outline-none focus:border-cyan/50"
        />
        <button
          type="submit"
          aria-label="Send"
          className="w-9 h-9 rounded-md bg-cyan text-bgDeep flex items-center justify-center hover:bg-cyanSoft transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
