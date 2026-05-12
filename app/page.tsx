"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Copy, Loader2, RefreshCcw, Sparkles, Wand2, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Offer = {
  headline: string;
  coreOffer: string;
  promise: string;
  bullets: string[];
  instagram: string;
  email: string;
};

export default function Home() {
  const [form, setForm] = useState({
    businessType: "",
    targetCustomer: "",
    product: "",
    priceRange: "",
    tone: "Warm and premium",
    painPoint: "",
  });

  const [offer, setOffer] = useState<Offer | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const sampleOffer = useMemo<Offer>(() => ({
    headline: "A warm, premium offer for new founders: turn scattered ideas into a clear, confident brand message.",
    coreOffer: "OfferSpark helps small businesses package their service into a simple, high-value offer that feels easy to understand and easy to buy.",
    promise: "Move from vague idea to sales-ready offer with a headline, positioning angle, social post, and email pitch.",
    bullets: [
      "Clear outcome: customers instantly understand what they get",
      "Low friction: the next step feels simple and natural",
      "Trust builder: the offer sounds helpful, not pushy",
      "Value anchor: the price connects to a real transformation",
    ],
    instagram: "Struggling to explain what you sell?\n\nOfferSpark turns your rough idea into a clear offer, headline, post, and email pitch.\n\nNo more staring at a blank page. Just enter your business details and get a polished starting point.",
    email: "Subject: A clearer way to present your offer\n\nHi,\n\nIf your offer feels hard to explain, OfferSpark can help you turn it into a clear sales message.\n\nAdd your business type, audience, service, price, and tone. The app gives you a headline, offer angle, social post, and email pitch.\n\nWant to try it?",
  }), []);

  const activeOffer = offer || sampleOffer;

  const outputText = `Headline:\n${activeOffer.headline}\n\nCore offer:\n${activeOffer.coreOffer}\n\nPromise:\n${activeOffer.promise}\n\nWhy it works:\n- ${activeOffer.bullets.join("\n- ")}\n\nInstagram post:\n${activeOffer.instagram}\n\nEmail pitch:\n${activeOffer.email}`;

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setCopied(false);
    setError("");
  };

  const generateOffer = async () => {
    setLoading(true);
    setCopied(false);
    setError("");

    try {
      const response = await fetch("/api/generate-offer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("The offer could not be generated. Check the API route and OpenAI key.");
      }

      const data = await response.json();
      setOffer(data.offer);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const copyOffer = async () => {
    await navigator.clipboard.writeText(outputText);
    setCopied(true);
  };

  const resetForm = () => {
    setForm({
      businessType: "",
      targetCustomer: "",
      product: "",
      priceRange: "",
      tone: "Warm and premium",
      painPoint: "",
    });
    setOffer(null);
    setCopied(false);
    setError("");
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#fbf7f0] text-[#1f1b16]">
      <div className="pointer-events-none fixed inset-0 opacity-70">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-amber-200 blur-3xl" />
        <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-rose-200 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-orange-100 blur-3xl" />
      </div>

      <main className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <nav className="mb-10 flex items-center justify-between rounded-3xl bg-white/70 px-4 py-3 shadow-sm backdrop-blur">
          <div className="flex items-center gap-2 font-bold tracking-tight">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#1f1b16] text-white">
              <Sparkles className="h-4 w-4" />
            </div>
            OfferSpark
          </div>
          <a href="#generator" className="hidden rounded-full bg-[#1f1b16] px-5 py-2 text-sm font-semibold text-white transition hover:opacity-90 sm:block">
            Build my offer
          </a>
        </nav>

        <section className="grid items-center gap-10 pb-16 pt-4 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold shadow-sm backdrop-blur">
              <Zap className="h-4 w-4" />
              AI-powered mini web app
            </div>
            <h1 className="max-w-3xl text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
              Turn messy ideas into offers that sell.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#6c5e4e]">
              OfferSpark helps founders, coaches, creators, and service businesses transform rough notes into a clear offer, headline, social post, and email pitch in seconds.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#generator" className="inline-flex items-center justify-center rounded-2xl bg-[#1f1b16] px-6 py-4 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl">
                Generate an offer <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <div className="inline-flex items-center justify-center rounded-2xl bg-white/70 px-6 py-4 font-semibold shadow-sm backdrop-blur">
                No install. Works on phone + laptop.
              </div>
            </div>
            <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-3">
              {["Headline", "Sales angle", "Email pitch"].map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-2xl bg-white/70 px-4 py-3 text-sm font-semibold shadow-sm backdrop-blur">
                  <Check className="h-4 w-4" /> {item}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55, delay: 0.1 }}>
            <div className="rounded-[2rem] bg-[#1f1b16] p-3 shadow-2xl">
              <div className="rounded-[1.5rem] bg-[#fffaf2] p-5">
                <div className="mb-5 flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-300" />
                  <span className="h-3 w-3 rounded-full bg-yellow-300" />
                  <span className="h-3 w-3 rounded-full bg-green-300" />
                </div>
                <div className="space-y-3">
                  <MiniPreview title="Input" text="Branding studio for new female founders, €299 starter package" />
                  <MiniPreview title="AI output" text="A warm, premium offer that turns scattered brand ideas into a clear visual direction and confident launch message." large />
                  <MiniPreview title="Ready assets" text="Headline · Instagram post · Email pitch · Value bullets" />
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="generator" className="scroll-mt-6 rounded-[2rem] bg-white/65 p-3 shadow-xl backdrop-blur sm:p-4">
          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <Card className="rounded-[1.5rem] border-0 bg-white shadow-sm">
              <CardContent className="p-5 sm:p-7">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#b46c2f]">Step 1</p>
                    <h2 className="mt-2 text-2xl font-black">Describe the business</h2>
                    <p className="mt-2 text-sm leading-6 text-[#6c5e4e]">The more specific the input, the stronger the offer.</p>
                  </div>
                  <Button variant="outline" onClick={resetForm} className="rounded-2xl border-[#eadfce]">
                    <RefreshCcw className="mr-2 h-4 w-4" /> Reset
                  </Button>
                </div>

                <div className="space-y-4">
                  <Field label="Business type" placeholder="Branding studio, coach, skincare shop" value={form.businessType} onChange={(v) => updateField("businessType", v)} />
                  <Field label="Target customer" placeholder="Female founders, busy parents, local cafés" value={form.targetCustomer} onChange={(v) => updateField("targetCustomer", v)} />
                  <Field label="Product or service" placeholder="Brand strategy session, 6-week program, starter kit" value={form.product} onChange={(v) => updateField("product", v)} />
                  <Field label="Main pain point" placeholder="Unclear messaging, low confidence, no time" value={form.painPoint} onChange={(v) => updateField("painPoint", v)} />
                  <Field label="Price range" placeholder="€99–€299, premium, monthly retainer" value={form.priceRange} onChange={(v) => updateField("priceRange", v)} />

                  <label className="block">
                    <span className="mb-1.5 block text-sm font-bold text-[#3b332b]">Tone</span>
                    <select value={form.tone} onChange={(e) => updateField("tone", e.target.value)} className="w-full rounded-2xl border border-[#eadfce] bg-[#fffaf2] px-4 py-3.5 text-sm font-medium outline-none transition focus:border-[#1f1b16] focus:ring-4 focus:ring-amber-100">
                      <option>Warm and premium</option>
                      <option>Bold and punchy</option>
                      <option>Friendly and simple</option>
                      <option>Luxury and elegant</option>
                      <option>Direct and professional</option>
                    </select>
                  </label>

                  {error && <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</div>}

                  <Button onClick={generateOffer} disabled={loading} className="w-full rounded-2xl bg-[#1f1b16] py-6 text-base font-bold hover:bg-[#332b23]">
                    {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Wand2 className="mr-2 h-5 w-5" />}
                    {loading ? "Generating with AI..." : "Generate my offer"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[1.5rem] border-0 bg-[#1f1b16] text-white shadow-sm">
              <CardContent className="p-5 sm:p-7">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-200">Step 2</p>
                    <h2 className="mt-2 text-2xl font-black">Use the ready-made assets</h2>
                    <p className="mt-2 text-sm leading-6 text-white/65">Copy the output and use it on your website, Instagram, or email.</p>
                  </div>
                  <Button variant="secondary" onClick={copyOffer} className="rounded-2xl">
                    <Copy className="mr-2 h-4 w-4" /> {copied ? "Copied" : "Copy"}
                  </Button>
                </div>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <OutputSection title={offer ? "AI headline" : "Sample headline"} content={activeOffer.headline} featured />
                  <OutputSection title="Core offer" content={activeOffer.coreOffer} />
                  <OutputSection title="Promise" content={activeOffer.promise} />

                  <div className="rounded-[1.5rem] bg-white p-5 text-[#1f1b16]">
                    <h3 className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-[#b46c2f]">Why it works</h3>
                    <ul className="space-y-2 text-sm leading-6">
                      {activeOffer.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-2 rounded-2xl bg-[#fbf7f0] px-4 py-3">
                          <Check className="mt-0.5 h-4 w-4 shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <OutputSection title="Instagram post" content={activeOffer.instagram} pre />
                  <OutputSection title="Email pitch" content={activeOffer.email} pre />
                </motion.div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}

function Field({ label, placeholder, value, onChange }: { label: string; placeholder: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-bold text-[#3b332b]">{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full rounded-2xl border border-[#eadfce] bg-[#fffaf2] px-4 py-3.5 text-sm font-medium outline-none transition placeholder:text-[#a9957e] focus:border-[#1f1b16] focus:ring-4 focus:ring-amber-100" />
    </label>
  );
}

function OutputSection({ title, content, pre = false, featured = false }: { title: string; content: string; pre?: boolean; featured?: boolean }) {
  return (
    <div className={`rounded-[1.5rem] bg-white p-5 text-[#1f1b16] ${featured ? "ring-4 ring-amber-200" : ""}`}>
      <h3 className="mb-2 text-sm font-black uppercase tracking-[0.18em] text-[#b46c2f]">{title}</h3>
      {pre ? <pre className="whitespace-pre-wrap font-sans text-sm leading-6 text-[#4f4439]">{content}</pre> : <p className={`${featured ? "text-xl font-black leading-8" : "text-sm leading-6 text-[#4f4439]"}`}>{content}</p>}
    </div>
  );
}

function MiniPreview({ title, text, large = false }: { title: string; text: string; large?: boolean }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#b46c2f]">{title}</p>
      <p className={`${large ? "text-xl font-black leading-8" : "text-sm leading-6 text-[#6c5e4e]"}`}>{text}</p>
    </div>
  );
}
