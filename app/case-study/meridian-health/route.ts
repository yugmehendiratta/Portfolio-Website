import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { pageFor, renderPage } from "../../../src/render";
import View from "../../../src/views/CaseStudyMeridianHealthPage";

export const dynamic = "force-static";

export async function GET() {
  // In development, render the component on every request so that editing a
  // section and refreshing shows the change — without this the page served is
  // whatever the prerender step captured when `npm run dev` started, and
  // edits appear to do nothing. Production serves the prerendered bytes.
  const renderedPath = join(process.cwd(), ".rendered", "case-study-meridian-health.html");
  let html: string;
  if (process.env.NODE_ENV !== "development" && existsSync(renderedPath)) {
    try {
      html = readFileSync(renderedPath, "utf8");
    } catch {
      html = await renderPage(pageFor("case-study-meridian-health.html"), View);
    }
  } else {
    html = await renderPage(pageFor("case-study-meridian-health.html"), View);
  }
  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
