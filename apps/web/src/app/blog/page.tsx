"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useI18n, pickLang } from "@/i18n/provider";
import { http } from "@/lib/api";
import { SectionHeading } from "@/components/Sections";
import { healthArticles } from "@/data/healthArticles";
import type { PostSummary } from "@aruhealth/shared";

const categoryLabels: Record<string, string> = {
  all: "All topics", nutrition: "Nutrition", heart: "Heart health", conditions: "Conditions",
  womens: "Women's health", pregnancy: "Pregnancy", family: "Family health",
  mental: "Mental wellbeing", sleep: "Sleep", fitness: "Movement", skin: "Skin", prevention: "Prevention",
};

export default function BlogPage() {
  const { t, lang } = useI18n();
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    http.get<{ posts: PostSummary[] }>("/posts").then((r) => setPosts(r.posts)).catch(() => setPosts([]));
  }, []);

  const categories = useMemo(() => ["all", ...new Set(healthArticles.map((article) => article.category))], []);
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return healthArticles.filter((article) => {
      const inCategory = category === "all" || article.category === category;
      const searchable = [article.title, article.summary, ...article.takeaways].join(" ").toLowerCase();
      return inCategory && (!needle || searchable.includes(needle));
    });
  }, [category, query]);

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 pb-16 pt-14 sm:px-6">
      <section className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary-dark via-primary to-sky p-7 text-white shadow-lift sm:p-12">
        <p className="text-xs font-bold uppercase tracking-[.22em] text-white/75">ARUHEALTH Library</p>
        <h1 className="mt-3 max-w-3xl text-balance text-4xl font-extrabold tracking-tight sm:text-6xl">Clear health information, carefully sourced.</h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">Original, practical summaries with a direct trail back to trusted NHS guidance. No copied articles and no miracle claims.</p>
        <div className="mt-7 flex flex-wrap gap-2 text-xs font-semibold">
          <span className="rounded-full bg-white/15 px-4 py-2">55 source-linked guides</span>
          <span className="rounded-full bg-white/15 px-4 py-2">Searchable by topic</span>
          <span className="rounded-full bg-white/15 px-4 py-2">Reviewed September 2026</span>
        </div>
      </section>

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950">
        <strong>For information, not diagnosis.</strong> Call 999 for a medical emergency. For urgent advice in the UK, use NHS 111.
      </div>

      {posts.length > 0 && (
        <section className="space-y-5">
          <SectionHeading eyebrow="✦" title={t("blog.title")} subtitle={t("blog.subtitle")} />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article key={post.id} className="neu flex flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-lift">
                <div className="aspect-[16/9] w-full overflow-hidden bg-mist">
                  {post.coverImage ? <img src={post.coverImage} alt={pickLang(lang, post.titleEn, post.titleNe)} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-4xl">📖</div>}
                </div>
                <div className="flex flex-1 flex-col p-5"><h2 className="text-lg font-semibold leading-snug text-primary-dark">{pickLang(lang, post.titleEn, post.titleNe)}</h2><p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{pickLang(lang, post.excerptEn, post.excerptNe)}</p><Link href={`/blog/${post.slug}`} className="mt-auto pt-4 text-sm font-semibold text-primary hover:text-primary-dark">{t("blog.readMore")} →</Link></div>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="space-y-6" aria-labelledby="trusted-guides">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div><p className="text-xs font-bold uppercase tracking-[.2em] text-primary">Trusted guidance</p><h2 id="trusted-guides" className="mt-2 text-3xl font-extrabold text-primary-dark sm:text-4xl">Browse the health library</h2></div>
          <label className="relative block w-full lg:max-w-md"><span className="sr-only">Search health guides</span><input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Search symptoms, conditions or wellbeing…" className="w-full rounded-2xl border border-primary/15 bg-white px-5 py-4 pr-12 text-sm shadow-neu outline-none transition focus:border-primary focus:ring-4 focus:ring-sky/20" /><span className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-primary" aria-hidden="true">⌕</span></label>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2" aria-label="Filter guides by topic">
          {categories.map((item) => <button key={item} type="button" onClick={() => setCategory(item)} aria-pressed={category === item} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${category === item ? "bg-primary text-white shadow-soft" : "bg-white text-muted shadow-neu hover:text-primary"}`}>{categoryLabels[item] ?? item}</button>)}
        </div>
        <p className="text-xs font-bold uppercase tracking-[.16em] text-muted">{filtered.length} guides shown</p>

        {filtered.length === 0 ? <div className="neu p-10 text-center"><h3 className="font-bold text-primary-dark">No matching guides</h3><p className="mt-2 text-sm text-muted">Try a broader search or another topic.</p></div> : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((article, index) => (
              <article key={article.id} className="neu group flex min-h-[330px] flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-lift">
                <div className="relative h-24 overflow-hidden bg-gradient-to-br from-mist to-sky/30 p-5"><span className="text-3xl font-black text-primary/20">{String(index + 1).padStart(2, "0")}</span><span className="absolute -right-6 -top-10 h-28 w-28 rounded-full bg-sky/25" /></div>
                <div className="flex flex-1 flex-col p-5"><span className="text-xs font-bold uppercase tracking-[.14em] text-primary">{categoryLabels[article.category] ?? article.category}</span><h3 className="mt-2 text-xl font-bold leading-tight text-primary-dark">{article.title}</h3><p className="mt-3 line-clamp-4 text-sm leading-relaxed text-muted">{article.summary}</p><Link href={`/blog/${article.id}`} className="mt-auto pt-5 text-sm font-bold text-primary group-hover:text-primary-dark">Read guide →</Link></div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
