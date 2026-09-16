/** Slug used for both a heading's id and the jump link that points at it. */
export const tocId = (heading: string) =>
  heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
