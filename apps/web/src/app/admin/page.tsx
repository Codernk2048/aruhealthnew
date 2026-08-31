"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useI18n, pickLang } from "@/i18n/provider";
import { http, tokenStore, ApiClientError } from "@/lib/api";
import type { Post, PublicUser } from "@aruhealth/shared";

interface FormState {
  slug: string;
  titleEn: string;
  titleNe: string;
  excerptEn: string;
  excerptNe: string;
  contentEn: string;
  contentNe: string;
  coverImage: string;
  tags: string;
  published: boolean;
}

const EMPTY: FormState = {
  slug: "",
  titleEn: "",
  titleNe: "",
  excerptEn: "",
  excerptNe: "",
  contentEn: "<p></p>",
  contentNe: "<p></p>",
  coverImage: "",
  tags: "",
  published: true,
};

export default function AdminPage() {
  const { t, lang } = useI18n();
  const router = useRouter();
  const [user, setUser] = useState<PublicUser | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(() => {
    http.get<{ posts: Post[] }>("/posts/all").then((r) => setPosts(r.posts)).catch(() => setPosts([]));
  }, []);

  useEffect(() => {
    if (!tokenStore.get()) {
      router.replace("/login");
      return;
    }
    http
      .get<{ user: PublicUser }>("/auth/me")
      .then((r) => {
        setUser(r.user);
        if (r.user.role !== "ADMIN") {
          router.replace("/dashboard");
        } else {
          load();
        }
      })
      .catch((e) => {
        if (e instanceof ApiClientError) router.replace("/login");
      });
  }, [router, load]);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMsg("");
    try {
      await http.post<{ post: Post }>("/posts", form);
      setForm(EMPTY);
      setMsg(t("admin.saved"));
      load();
    } catch (err) {
      setMsg(err instanceof ApiClientError ? err.message : "error");
    } finally {
      setBusy(false);
    }
  };

  const del = async (id: number) => {
    await http.del(`/posts/${id}`);
    load();
  };

  const togglePublish = async (post: Post) => {
    await http.patch(`/posts/${post.id}`, { published: !post.published });
    load();
  };

  const field = (
    label: string,
    key: keyof FormState,
    multi = false,
  ) => (
    <label className="block text-sm font-medium text-muted">
      {label}
      {multi ? (
        <textarea
          rows={4}
          className="input-neu mt-1"
          value={String(form[key])}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        />
      ) : (
        <input
          className="input-neu mt-1"
          value={String(form[key])}
          onChange={(e) =>
            setForm({
              ...form,
              [key]: key === "published" ? e.target.checked : e.target.value,
            })
          }
          type={key === "published" ? "checkbox" : "text"}
        />
      )}
    </label>
  );

  if (user && user.role !== "ADMIN") {
    return <p className="py-24 text-center text-muted">{t("admin.adminOnly")}</p>;
  }

  return (
    <div className="mx-auto max-w-4xl space-y-10 px-4 pb-16 pt-12 sm:px-6">
      <div>
        <span className="eyebrow">🛠️</span>
        <h1 className="text-3xl font-bold text-primary-dark">{t("admin.title")}</h1>
      </div>

      {!user ? (
        <p className="text-center text-muted">{t("common.loading")}</p>
      ) : (
        <>
          <form onSubmit={create} className="neu space-y-4 p-8">
            <h2 className="text-lg font-semibold text-primary-dark">{t("admin.newPost")}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {field(t("admin.slug"), "slug")}
              {field(t("admin.cover"), "coverImage")}
              {field(t("admin.titleEn"), "titleEn")}
              {field(t("admin.titleNe"), "titleNe")}
              {field(t("admin.excerptEn"), "excerptEn")}
              {field(t("admin.excerptNe"), "excerptNe")}
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {field(t("admin.contentEn"), "contentEn", true)}
              {field(t("admin.contentNe"), "contentNe", true)}
            </div>
            <label className="flex items-center gap-2 text-sm font-medium text-muted">
              {t("admin.published")}
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
                className="accent-primary"
              />
            </label>
            {msg && <p className="text-sm text-sage">{msg}</p>}
            <button type="submit" disabled={busy} className="btn-primary">
              {t("admin.create")}
            </button>
          </form>

          <div className="space-y-3">
            {posts.length === 0 && <p className="neu p-6 text-center text-muted">{t("admin.empty")}</p>}
            {posts.map((p) => (
              <div key={p.id} className="neu-sm flex flex-wrap items-center justify-between gap-3 p-4">
                <div className="min-w-0">
                  <p className="font-semibold text-primary-dark">
                    {pickLang(lang, p.titleEn, p.titleNe)}
                  </p>
                  <p className="truncate text-xs text-muted">/{p.slug} · {p.views} 👁</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => void togglePublish(p)}
                    className={`chip ${p.published ? "bg-sage/20 text-sage" : "bg-rose/20 text-primary-dark"}`}
                  >
                    {p.published ? t("admin.published") : "·"}
                  </button>
                  <button onClick={() => void del(p.id)} className="chip neu-sm text-rose">
                    {t("admin.delete")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}