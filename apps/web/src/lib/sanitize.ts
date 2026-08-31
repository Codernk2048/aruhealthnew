const ALLOWED_TAGS = new Set([
  "h1", "h2", "h3", "p", "ul", "ol", "li", "strong", "em", "b", "i", "br", "a", "blockquote",
]);

// Minimal server-style sanitizer: strips scripts, event handlers and unknown tags.
// MVP-level control; swap for a real sanitizer lib (e.g. sanitize-html / DOMPurify) in production.
export function sanitizeHtml(input: string): string {
  let out = input.replace(/<script[\s\S]*?<\/script>/gi, "");
  out = out.replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "");
  out = out.replace(/<\/?([a-zA-Z0-9]+)([^>]*)>/g, (tag, name: string, attrs: string) => {
    const tagName = name.toLowerCase();
    if (!ALLOWED_TAGS.has(tagName)) return "";
    if (tagName === "a") {
      const href = attrs.match(/href="([^"]*)"/i)?.[1] ?? "";
      if (!/^https?:\/\//.test(href)) return `<a>`;
      return `<a href="${href}" rel="noopener noreferrer" target="_blank">`;
    }
    return `<${tagName}>`;
  });
  out = out.replace(/<(h1|h2|h3)>/g, '<$1 class="text-xl font-bold text-primary-dark mt-6 mb-2">');
  out = out.replace(/<(p|blockquote)>/g, '<$1 class="my-3 leading-relaxed">');
  out = out.replace(/<ul>/g, '<ul class="list-disc pl-6 my-3 space-y-1">');
  return out;
}