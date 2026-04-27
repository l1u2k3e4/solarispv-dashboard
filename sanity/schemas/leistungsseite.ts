import { defineField, defineType } from "sanity";

export const leistungsseite = defineType({
  name: "leistungsseite",
  title: "Leistungsseite",
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
      name: "kurzbeschreibung",
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
      name: "body",
      title: "Body (Portable Text)",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "faq",
      title: "FAQ",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "frage", type: "string", title: "Frage" },
            { name: "antwort", type: "text", title: "Antwort", rows: 3 },
          ],
        },
      ],
    }),
  ],
});
