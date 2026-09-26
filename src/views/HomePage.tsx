import React, { Suspense } from "react";
import Loader from "@/src/sections/home/Loader";
import CTA from "@/src/sections/home/CTA";
import { Navbar, Hero, About, SelectedWork, Experience } from "@/src/components/Draft1";

/** The "/" page, composed from its Framer sections.
 *
 *  Rendered to static HTML by scripts/prerender.mts at build time — never
 *  shipped as a page.tsx, which would duplicate every byte of this markup into
 *  the RSC flight payload on top of the HTML itself. */
export default function HomePage() {
  return (
    <body>
      {"\n\t\n\t"}
      <span data-fnj-slot={"0"} />
      {"\n    \n    "}
      <span data-fnj-slot={"1"} />
      {"\n\t\n\t"}
      <div id="main">
        <Suspense fallback={null}>
          <style data-framer-html-style="" dangerouslySetInnerHTML={{ __html: ":root body { background: var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255)); }" }} />
          <div className="framer-ABWci framer-pDysL framer-SwHTo framer-erhBl framer-7f13km" data-framer-cursor="10lja5m" data-layout-template="true" style={{ minHeight: "100vh", width: "auto" }}>
            <div className="framer-b1hv7o-container" data-code-component-plugin-id="84d4c1" style={{ transformOrigin: "50% 0% 0" }}>
              <Suspense fallback={null}>
                <div style={{ width: "100%", height: "100%", position: "relative", boxSizing: "border-box", backgroundColor: "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))", boxShadow: "none", borderColor: "rgba(242, 242, 242, 0)", borderStyle: "solid", borderWidth: "1px" }}>
                  <svg width="100%" height="100%" style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%" }}>
                    <defs>
                      <pattern id="paper-pattern-grid-w5onegk7i" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                        <line x1="0" y1="100" x2="100" y2="100" stroke="var(--token-eee4728f-06ef-4d99-9d02-ac8944e7f6dd, rgb(226, 226, 226))" strokeWidth="1" opacity="1" />
                        <line x1="100" y1="0" x2="100" y2="100" stroke="var(--token-eee4728f-06ef-4d99-9d02-ac8944e7f6dd, rgb(226, 226, 226))" strokeWidth="1" opacity="1" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#paper-pattern-grid-w5onegk7i)" />
                  </svg>
                </div>
              </Suspense>
            </div>
            <style data-framer-html-style="" dangerouslySetInnerHTML={{ __html: "html body { background: var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255)); }" }} />
            <div data-framer-root="" className="framer-HRoKa framer-ZuNYE framer-9yfa1 framer-SwHTo framer-erhBl framer-0p8ff framer-62fp8 framer-pDysL framer-s8d5gr" style={{ minHeight: "100vh", width: "auto", display: "contents" }}>
              <div className="framer-e4j7mq-container" data-framer-name="Smooth Scroll" name="Smooth Scroll">
                <Suspense fallback={null}>
                  <style dangerouslySetInnerHTML={{ __html: "html.lenis,\nhtml.lenis body {\n  height: auto;\n}\n\n.lenis:not(.lenis-autoToggle).lenis-stopped {\n  overflow: clip;\n}\n\n.lenis [data-lenis-prevent],\n.lenis [data-lenis-prevent-wheel],\n.lenis [data-lenis-prevent-touch],\n.lenis [data-lenis-prevent-vertical],\n.lenis [data-lenis-prevent-horizontal] {\n  overscroll-behavior: contain;\n}\n\n.lenis.lenis-smooth iframe {\n  pointer-events: none;\n}\n\n.lenis.lenis-autoToggle {\n  transition-property: overflow;\n  transition-duration: 1ms;\n  transition-behavior: allow-discrete;\n}" }} />
                </Suspense>
              </div>
              <Loader />
              <div className="framer-bzok9y" data-framer-name="Hero + About">
                <Hero />
                <About />
              </div>
              <SelectedWork />
              <Experience />
            </div>
            <div id="overlay" />
            <div className="framer-1smnmk7" />
            <Navbar />
            <CTA />
            <div className="framer-187vpa3" data-framer-name="button">
              <div className="framer-tg9meo-container">
                <Suspense fallback={null}>
                  <div style={{ width: "100%", height: "40px" }} />
                </Suspense>
              </div>
            </div>
          </div>
          <div id="template-overlay" />
        </Suspense>
      </div>
      <span data-fnj-slot={"2"} />
      {"\n\t"}
      <span data-fnj-slot={"3"} />
      {"\n\t\n\t\n\t"}
      <span data-fnj-slot={"4"} />
      <span data-fnj-slot={"5"} />
      {"\n\t"}
      <span data-fnj-slot={"6"} />
      <div id="svg-templates" style={{ position: "absolute", overflow: "hidden", bottom: "0", left: "0", width: "0", height: "0", zIndex: "0", contain: "strict" }} aria-hidden="true">
        {"\n"}
        <svg viewBox="0 0 28 26" overflow="visible" id="svg1378496346_348">
          <path d="M 0 0 L 12 26 L 14 13 L 28 9.5 Z" fill="var(--token-29f9695a-09e2-4c55-ace7-e9873233e207, rgb(241, 231, 178))" strokeWidth="2" stroke="var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))" />
        </svg>
        {"\n"}
        <svg viewBox="0 0 28 26" overflow="visible" id="svg-241345994_348">
          <path d="M 0 0 L 12 26 L 14 13 L 28 9.5 Z" fill="var(--token-e22e0fe6-83a6-4381-a625-c6f173619c49, rgb(210, 197, 222))" strokeWidth="2" stroke="var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))" />
        </svg>
        {"\n"}
      </div>
      {"\n\t"}
      <span data-fnj-slot={"34"} />
      {"\n    \n    "}
      <span data-fnj-slot={"35"} />
      {"\n\n\n"}
    </body>
  );
}
