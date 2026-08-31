"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useI18n, pickLang } from "@/i18n/provider";
import { http, ApiClientError } from "@/lib/api";
import { sanitizeHtml } from "@/lib/sanitize";
import type { Post } from "@aruhealth/shared";

export default function BlogPostPage() {
  const { t, lang } = useI18n();
  const params = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!params?.slug) return;
    http
      .get<{ post: Post }>(`/posts/${params.slug}`)
      .then((r) => setPost(r.post))
      .catch((e) => setError(e instanceof ApiClientError ? e.message : String(e)));
  }, [params?.slug]);

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