"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useI18n, pickLang } from "@/i18n/provider";
import { http } from "@/lib/api";
import { SectionHeading } from "@/components/Sections";
import type { PostSummary } from "@aruhealth/shared";

export default function BlogPage() {
  const { t, lang } = useI18n();
  const [posts, setPosts] = useState<PostSummary[]>([]);

  useEffect(() => {
    http
      .get<{ posts: PostSummary[] }>("/posts")
      .then((r) => setPosts(r.posts))
      .catch(() => setPosts([]));
  }, []);

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 pb-16 pt-14 sm:px-6">
      <SectionHeading eyebrow="📖" title={t("blog.title")} subtitle={t("blog.subtitle")} />

      {posts.length === 0 ? (
        <p className="neu p-8 text-center text-muted">{t("blog.empty")}</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <article key={p.id} className="neu flex flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-lift">
              <div className="aspect-[16/9] w-full overflow-hidden bg-mist">
                {p.coverImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.coverImage} alt={pickLang(lang, p.titleEn, p.titleNe)} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-4xl">📖</div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-semibold leading-snug text-primary-dark">
                  {pickLang(lang, p.titleEn, p.titleNe)}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                  {pickLang(lang, p.excerptEn, p.excerptNe)}
                </p>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <span className="text-xs text-muted">
                    {p.publishedAt ? new Date(p.publishedAt).toLocaleDateString() : ""} · {p.views} 👁
                  </span>
                  <Link href={`/blog/${p.slug}`} className="text-sm font-semibold text-primary hover:text-primary-dark">
                    {t("blog.readMore")} →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}