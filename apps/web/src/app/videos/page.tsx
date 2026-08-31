"use client";

import { useEffect, useState } from "react";
import { useI18n, pickLang } from "@/i18n/provider";
import { http } from "@/lib/api";
import { SectionHeading } from "@/components/Sections";
import type { Video } from "@aruhealth/shared";

export default function VideosPage() {
  const { t, lang } = useI18n();
  const [videos, setVideos] = useState<Video[]>([]);
  const [cat, setCat] = useState("all");

  useEffect(() => {
    const q = cat === "all" ? "" : `?category=${cat}`;
    http
      .get<{ videos: Video[] }>(`/videos${q}`)
      .then((r) => setVideos(r.videos))
      .catch(() => setVideos([]));
  }, [cat]);

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 pb-16 pt-14 sm:px-6">
      <SectionHeading eyebrow="🎬" title={t("videos.title")} subtitle={t("videos.subtitle")} />

      <div className="flex flex-wrap gap-2">
        {["all", "meditation", "yoga", "sleep"].map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`chip ${cat === c ? "bg-primary-soft text-primary" : "neu-sm text-muted"}`}
          >
            {c === "all" ? "All" : t(`videos.${c}`)}
          </button>
        ))}
      </div>

      {videos.length === 0 ? (
        <p className="neu p-8 text-center text-muted">{t("videos.empty")}</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {videos.map((v) => (
            <div key={v.id} className="neu overflow-hidden p-3">
              <div className="aspect-video overflow-hidden rounded-2xl bg-mist">
                <iframe
                  src={v.url}
                  title={pickLang(lang, v.titleEn, v.titleNe)}
                  className="h-full w-full"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="flex items-center justify-between px-2 py-3">
                <p className="font-semibold text-primary-dark">
                  {pickLang(lang, v.titleEn, v.titleNe)}
                </p>
                <span className="chip bg-mist text-xs text-muted">
                  {t(`videos.${v.category}`)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}