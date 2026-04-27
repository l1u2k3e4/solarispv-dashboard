/**
 * Tiny safe markdown renderer for chatbot bot replies.
 *
 * Scope (intentional minimal subset):
 *   - HTML escape `<`, `>`, `&` first (Sicherheit > Komfort)
 *   - **bold** -> <strong>
 *   - [text](url) -> <a target="_blank" rel="noopener noreferrer">
 *   - "\n- foo" lines -> <ul><li>...</li></ul>
 *   - Single newlines -> <br />
 *
 * Returns HTML that may be passed to `dangerouslySetInnerHTML` because
 * all user-provided characters were escaped before any markup was added.
 */

const escapeHtml = (raw: string): string =>
  raw
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const renderInline = (line: string): string => {
  let out = line;

  // Links [text](url) — only http(s)/mailto/tel allowed
  out = out.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+|mailto:[^\s)]+|tel:[^\s)]+)\)/g,
    (_match, text: string, href: string) =>
      `<a href="${href}" target="_blank" rel="noopener noreferrer" class="underline">${text}</a>`
  );

  // Bold **text**
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

  return out;
};

export function renderMarkdown(input: string): string {
  if (!input) return "";

  const escaped = escapeHtml(input);
  const lines = escaped.split(/\r?\n/);

  const blocks: string[] = [];
  let listBuffer: string[] = [];
  let paragraphBuffer: string[] = [];

  const flushList = () => {
    if (listBuffer.length === 0) return;
    const items = listBuffer.map((item) => `<li>${renderInline(item)}</li>`).join("");
    blocks.push(`<ul class="list-disc pl-5 space-y-1">${items}</ul>`);
    listBuffer = [];
  };

  const flushParagraph = () => {
    if (paragraphBuffer.length === 0) return;
    const joined = paragraphBuffer.map(renderInline).join("<br />");
    blocks.push(`<p>${joined}</p>`);
    paragraphBuffer = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    const listMatch = /^\s*-\s+(.*)$/.exec(line);

    if (listMatch) {
      flushParagraph();
      listBuffer.push(listMatch[1]);
      continue;
    }

    if (line.trim() === "") {
      flushList();
      flushParagraph();
      continue;
    }

    flushList();
    paragraphBuffer.push(line);
  }

  flushList();
  flushParagraph();

  return blocks.join("");
}
