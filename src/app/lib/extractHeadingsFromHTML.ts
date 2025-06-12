import { JSDOM } from "jsdom";

type TOCItem = {
  id: string;
  text: string;
  tag: string;
};

export function extractHeadingsFromHTML(html: string): { toc: TOCItem[]; htmlWithIds: string } {
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const headings = document.querySelectorAll("h1, h2, h3");

  const toc: TOCItem[] = [];

  headings.forEach((heading, index) => {
    const text = heading.textContent || "";
    const slug = text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "");
    const id = `${slug}-${index}`;
    heading.id = id;

    toc.push({ id, text, tag: heading.tagName });
  });

  return { toc, htmlWithIds: document.body.innerHTML };
}
