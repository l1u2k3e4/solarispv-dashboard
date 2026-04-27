import { defineField, defineType } from "sanity";

export const blogartikel = defineType({
  name: "blogartikel",
  title: "Blog-Artikel",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titel (H1)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Veröffentlicht am",
      type: "datetime",
    }),
    defineField({
      name: "excerpt",
      title: "Kurzbeschreibung",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "metaDescription",
      title: "Meta-Description",
      type: "text",
      rows: 2,
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: "coverImage",
      title: "Cover-Bild",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "body",
      title: "Body (Portable Text)",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
    }),
  ],
});
