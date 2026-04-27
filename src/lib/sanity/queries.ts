// Sanity-Queries (zentralisiert) — wird in Phase 1 mit echten GROQ-Queries gefüllt.

export const standortseiteBySlugQuery = `*[_type == "standortseite" && slug.current == $slug][0]`;
export const allStandortseitenQuery = `*[_type == "standortseite"]{ _id, title, slug, stadtteil, standortReferenz }`;

export const leistungsseiteBySlugQuery = `*[_type == "leistungsseite" && slug.current == $slug][0]`;
export const allLeistungsseitenQuery = `*[_type == "leistungsseite"]{ _id, title, slug, kurzbeschreibung }`;

export const blogartikelBySlugQuery = `*[_type == "blogartikel" && slug.current == $slug][0]`;
export const allBlogartikelQuery = `*[_type == "blogartikel"] | order(publishedAt desc){ _id, title, slug, publishedAt, excerpt, coverImage }`;
