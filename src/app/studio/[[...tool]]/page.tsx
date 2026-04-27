import { Studio } from "./Studio";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  // Demo-Build (Vercel): Sanity-Project-ID ist `demo-stub`. Echtes Studio würde
  // direkt beim Mount crashen, weil es versucht, sich mit einem nicht
  // existenten Sanity-Project zu verbinden. Stattdessen Hinweis-Page rendern.
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === "demo-stub") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-sternhoff-bg-light p-8 text-center">
        <div className="max-w-lg">
          <h1 className="mb-3 text-2xl font-bold text-sternhoff-primary">
            Sanity Studio · Aktivierung in Phase 2
          </h1>
          <p className="text-sm text-sternhoff-gray">
            Das CMS-Dashboard wird mit dem produktiven Sanity-Setup verbunden.
            In der Demo-Vorschau ist es ausgeblendet, damit der Build stabil
            bleibt.
          </p>
        </div>
      </div>
    );
  }

  return <Studio />;
}
