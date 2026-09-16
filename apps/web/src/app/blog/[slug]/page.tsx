"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useI18n, pickLang } from "@/i18n/provider";
import { http, ApiClientError } from "@/lib/api";
import { sanitizeHtml } from "@/lib/sanitize";
import { healthArticles } from "@/data/healthArticles";
import type { Post } from "@aruhealth/shared";

export default function BlogPostPage() {
  const { t, lang } = useI18n();
  const params = useParams<{ slug: string }>();
  const libraryArticle = healthArticles.find((article) => article.id === params?.slug);
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!params?.slug || libraryArticle) return;
    http
      .get<{ post: Post }>(`/posts/${params.slug}`)
      .then((r) => setPost(r.post))
      .catch((e) => setError(e instanceof ApiClientError ? e.message : String(e)));
  }, [libraryArticle, params?.slug]);

  if (libraryArticle) {
    return (
      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <Link href="/blog" className="text-sm font-semibold text-muted hover:text-primary">← Health library</Link>
        <p className="mt-8 text-xs font-bold uppercase tracking-[.18em] text-primary">{libraryArticle.category.replace("womens", "Women's health")}</p>
        <h1 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-primary-dark sm:text-5xl">{libraryArticle.title}</h1>
        <div className="mt-7 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950"><strong>For information, not diagnosis.</strong> Call 999 for an emergency or use NHS 111 for urgent UK advice.</div>
        <div className="prose-health mt-8 rounded-[1.5rem] bg-white p-6 shadow-neu sm:p-10">
          <p className="text-lg leading-relaxed text-muted">{libraryArticle.summary}</p>
          <h2>Key points</h2>
          <ul>{libraryArticle.takeaways.map((point) => <li key={point}>{point}</li>)}</ul>
          <div className="mt-8 rounded-2xl bg-mist p-5">
            <p className="text-xs font-bold uppercase tracking-[.16em] text-muted">Primary source</p>
            <a href={libraryArticle.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block font-bold text-primary hover:text-primary-dark">Read the full guidance on {libraryArticle.source} →</a>
          </div>
        </div>
        <p className="mt-8 text-xs text-muted/80">ARUHEALTH summary · Source checked 16 September 2026 · {t("common.disclaimer")}</p>
      </article>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <p className="text-4xl">😴</p>
        <h1 className="mt-4 text-2xl font-bold text-primary-dark">{t("notFound.title")}</h1>
        <p className="mt-2 text-muted">{error}</p>
        <Link href="/blog" className="btn-primary mt-6">
          {t("notFound.home")}
        </Link>
      </div>
    );
  }

  if (!post) {
    return <p className="py-24 text-center text-muted">{t("common.loading")}</p>;
  }

  const title = pickLang(lang, post.titleEn, post.titleNe);
  const content = pickLang(lang, post.contentEn, post.contentNe);

  return (
    <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <Link href="/blog" className="text-sm text-muted hover:text-primary">
        ← {t("nav.blog")}
      </Link>
      <h1 className="mt-4 text-balance text-3xl font-extrabold tracking-tight text-primary-dark sm:text-4xl">
        {title}
      </h1>
      <p className="mt-4 text-muted">
        {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ""} · {post.views} 👁
      </p>
      {post.coverImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.coverImage} alt={title} className="mt-6 aspect-[16/9] w-full rounded-[1.5rem] object-cover shadow-lift" />
      )}
      <div
        className="prose-health mt-8 rounded-[1.5rem] bg-white p-6 shadow-neu sm:p-10"
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }}
      />
      <p className="mt-8 text-xs text-muted/80">{t("common.disclaimer")}</p>
    </article>
  );
}
