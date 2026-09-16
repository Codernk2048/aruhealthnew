"use client";

import { useMemo, useState } from "react";

const products = [
  { name: "Aurum Daily Multivitamin", category: "Supplements", price: "£48", icon: "💊", summary: "24 bioavailable nutrients · 60 servings", details: ["Third-party tested for purity and potency", "Iron-free evening variant available"] },
  { name: "Omega Elite Ultra", category: "Supplements", price: "£56", icon: "🐟", summary: "EPA and DHA · 90 softgels", details: ["Molecularly distilled", "Independent heavy-metal testing claimed"] },
  { name: "Hydra-Veil Serum", category: "Skincare", price: "£72", icon: "💧", summary: "Triple hyaluronic complex · 30 ml", details: ["Fragrance and alcohol free", "Designed for sensitive skin"] },
  { name: "Ceramide Repair Cream", category: "Skincare", price: "£64", icon: "🫧", summary: "Barrier-supporting lipids · 50 ml", details: ["Non-comedogenic formula", "Recyclable vessel"] },
  { name: "Pulse Vitality Monitor", category: "Devices", price: "£189", icon: "💙", summary: "HRV and resting-pulse trends", details: ["14-day stated battery life", "Health data is not sold"] },
  { name: "Lumen Sleep Therapy Lamp", category: "Devices", price: "£149", icon: "🌅", summary: "Dawn simulation · amber evening mode", details: ["30-minute sunrise cycle", "Blue-light-free evening setting"] },
  { name: "Adaptogen Complex", category: "Supplements", price: "£52", icon: "🌿", summary: "Ashwagandha, rhodiola and lion’s mane", details: ["Caffeine free", "60 capsules"] },
  { name: "Ionic Facial Steamer", category: "Devices", price: "£119", icon: "♨️", summary: "Nano-ionic mist · UV-clean reservoir", details: ["Auto shut-off", "Aromatherapy basket included"] },
] as const;

const categories = ["All", "Supplements", "Skincare", "Devices"] as const;

export default function ShopPage() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [selected, setSelected] = useState<(typeof products)[number] | null>(null);
  const visible = useMemo(() => category === "All" ? products : products.filter((product) => product.category === category), [category]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <section className="rounded-3xl bg-gradient-to-br from-primary-soft via-white to-blue-50 px-6 py-12 text-center shadow-sm sm:px-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">ARU HEALTH Collection</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-primary-dark sm:text-5xl">Wellness products, clearly presented</h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted">The original ARU HEALTH catalogue is now part of this website. This is a browse-only preview; online purchasing is not yet available.</p>
      </section>

      <div className="my-8 flex flex-wrap justify-center gap-2" aria-label="Filter products">
        {categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={category === item ? "btn-primary !px-4 !py-2 text-sm" : "neu-sm chip text-sm text-muted"}>{item}</button>)}
      </div>

      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {visible.map((product) => (
          <article key={product.name} className="rounded-3xl border border-primary-soft bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="flex h-32 items-center justify-center rounded-2xl bg-primary-soft text-6xl" aria-hidden="true">{product.icon}</div>
            <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-primary">{product.category}</p>
            <h2 className="mt-1 text-xl font-bold text-primary-dark">{product.name}</h2>
            <p className="mt-2 text-sm text-muted">{product.summary}</p>
            <div className="mt-5 flex items-center justify-between"><strong className="text-lg text-primary-dark">{product.price}</strong><button onClick={() => setSelected(product)} className="text-sm font-semibold text-primary hover:underline">View details</button></div>
          </article>
        ))}
      </section>

      <aside className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-950"><strong>Product notice:</strong> Product descriptions are informational previews, not medical advice or verified treatment claims. Consult a pharmacist or clinician before taking supplements, particularly during pregnancy or when using medicines.</aside>

      {selected && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4" role="dialog" aria-modal="true" aria-labelledby="product-title" onClick={() => setSelected(null)}><div className="w-full max-w-lg rounded-3xl bg-white p-7 shadow-xl" onClick={(event) => event.stopPropagation()}><button className="float-right text-2xl text-muted" onClick={() => setSelected(null)} aria-label="Close">×</button><div className="text-5xl">{selected.icon}</div><p className="mt-5 text-sm font-semibold text-primary">{selected.category}</p><h2 id="product-title" className="mt-1 text-2xl font-bold text-primary-dark">{selected.name}</h2><p className="mt-2 text-lg font-semibold">{selected.price}</p><p className="mt-3 text-muted">{selected.summary}</p><ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-ink/80">{selected.details.map((detail) => <li key={detail}>{detail}</li>)}</ul><p className="mt-5 rounded-xl bg-primary-soft p-3 text-sm text-primary-dark">Browse-only preview — purchasing will be available in a future release.</p></div></div>}
    </main>
  );
}
