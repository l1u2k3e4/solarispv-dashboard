import { writeFileSync } from "node:fs";

const ORIGIN = "http://localhost:3016";
const visited = new Set();
const queue = ["/"];
const links = [];

const fetchTextOrNull = async (url) => {
  try {
    const r = await fetch(url, { redirect: "manual" });
    if (r.status === 200 && r.headers.get("content-type")?.includes("text/html")) {
      return await r.text();
    }
    return null;
  } catch {
    return null;
  }
};

const fetchStatus = async (url, method = "GET") => {
  try {
    const r = await fetch(url, { method, redirect: "manual" });
    return r.status;
  } catch {
    return 0;
  }
};

while (queue.length) {
  const path = queue.shift();
  if (visited.has(path)) continue;
  visited.add(path);

  const html = await fetchTextOrNull(ORIGIN + path);
  if (!html) continue;

  const matches = [...html.matchAll(/<a\s[^>]*href="([^"]+)"[^>]*>([^<]{0,80})/g)];
  for (const m of matches) {
    const href = m[1];
    const text = m[2].trim();
    let type = "internal";
    if (href.startsWith("mailto:")) type = "mailto";
    else if (href.startsWith("tel:")) type = "tel";
    else if (href.startsWith("#")) type = "anchor";
    else if (href.startsWith("http") && !href.startsWith(ORIGIN) && !href.startsWith("/")) type = "external";

    let status = null;
    if (type === "internal") {
      const target = href.startsWith("/") ? ORIGIN + href : ORIGIN + "/" + href;
      const cleanPath = href.split("#")[0].split("?")[0];
      status = await fetchStatus(target);
      if ([200, 301, 308].includes(status) && cleanPath.startsWith("/") && !visited.has(cleanPath) && !queue.includes(cleanPath) && !cleanPath.startsWith("/studio") && !cleanPath.startsWith("/admin")) {
        queue.push(cleanPath);
      }
    } else if (type === "external") {
      // skip external check (network-heavy); list only
      status = "skip";
    }

    links.push({ from: path, href, text, type, status });
  }
}

const dead = links.filter((l) => l.type === "internal" && l.status !== 200 && l.status !== 308 && l.status !== 301);
const internal = links.filter((l) => l.type === "internal");
const external = links.filter((l) => l.type === "external");
const anchors = links.filter((l) => l.type === "anchor");

const summary = {
  visited_pages: visited.size,
  total_links: links.length,
  internal_links: internal.length,
  internal_ok: internal.filter((l) => l.status === 200).length,
  internal_redirect: internal.filter((l) => l.status === 308 || l.status === 301).length,
  internal_dead: dead.length,
  external_links: external.length,
  anchor_links: anchors.length,
  dead_samples: dead.slice(0, 20),
};

writeFileSync("/Users/lukekozik/Documents/Jobs/SolarisPv/_internal-links-crawl.json", JSON.stringify({ summary, links }, null, 2));
console.log(JSON.stringify(summary, null, 2));
