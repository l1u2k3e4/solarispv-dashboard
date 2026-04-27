import { defineField, defineType } from "sanity";

export const standortseite = defineType({
  name: "standortseite",
  title: "Standortseite",
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
      name: "stadtteil",
      title: "Stadtteil-Name",
      type: "string",
    }),
    defineField({
      name: "hauptkeyword",
      title: "Haupt-Keyword",
      type: "string",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta-Description",
      type: "text",
      rows: 2,
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: "intro",
      title: "Intro-Text",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "body",
      title: "Body (Portable Text)",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "standortReferenz",
      title: "Standort-Referenz",
      type: "string",
      options: {
        list: [
          { title: "Bochum (Hauptsitz)", value: "bochum" },
          { title: "Castrop-Rauxel (Filiale)", value: "castrop" },
        ],
      },
    }),
  ],
  preview: {
    select: { title: "title", stadtteil: "stadtteil" },
    prepare: ({ title, stadtteil }) => ({
      title: title || "Standortseite",
      subtitle: stadtteil,
    }),
  },
});
