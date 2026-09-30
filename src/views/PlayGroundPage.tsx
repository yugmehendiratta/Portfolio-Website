import React, { Suspense } from "react";
import HeaderLine from "@/src/sections/play-ground/HeaderLine";

/** The "/play-ground" page, composed from its Framer sections.
 *
 *  Rendered to static HTML by scripts/prerender.mts at build time — never
 *  shipped as a page.tsx, which would duplicate every byte of this markup into
 *  the RSC flight payload on top of the HTML itself. */
export default function PlayGroundPage() {
  return (
    <body>
      {"\n\t\n\t"}
      <span data-fnj-slot={"0"} />
      {"\n    \n    "}
      <span data-fnj-slot={"1"} />
      {"\n\t\n\t"}
      <div id="main" data-framer-hydrate-v2={"{\"routeId\":\"OZ8sqXvDF\",\"localeId\":\"default\",\"breakpoints\":[{\"hash\":\"sezhfj\",\"mediaQuery\":\"(min-width: 1200px)\"},{\"hash\":\"151jsl5\",\"mediaQuery\":\"(min-width: 810px) and (max-width: 1199.98px)\"},{\"hash\":\"1isfees\",\"mediaQuery\":\"(max-width: 809.98px)\"},{\"hash\":\"7f13km\",\"mediaQuery\":\"(min-width: 1200px)\"},{\"hash\":\"17tolvd\",\"mediaQuery\":\"(min-width: 810px) and (max-width: 1199.98px)\"},{\"hash\":\"vb5p67\",\"mediaQuery\":\"(max-width: 809.98px)\"}]}"} data-framer-ssr-released-at="2026-08-12T12:02:11.066Z" data-framer-page-optimized-at="2026-08-18T02:31:15.988Z" data-framer-generated-page="">
        <Suspense fallback={null}>
          <style data-framer-html-style="" dangerouslySetInnerHTML={{ __html: ":root body { background: var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255)); }" }} />
          <div className="framer-ABWci framer-pDysL framer-SwHTo framer-erhBl framer-7f13km" data-framer-cursor="10lja5m" data-layout-template="true" style={{ minHeight: "100vh", width: "auto" }}>
            <div className="framer-b1hv7o-container" data-code-component-plugin-id="84d4c1" style={{ transformOrigin: "50% 0% 0" }}>
              <Suspense fallback={null}>
                <div style={{ width: "100%", height: "100%", position: "relative", boxSizing: "border-box", backgroundColor: "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))", boxShadow: "none", borderColor: "rgba(242, 242, 242, 0)", borderStyle: "solid", borderWidth: "1px" }}>
                  <svg width="100%" height="100%" style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%" }}>
                    <defs>
                      <pattern id="paper-pattern-grid-c78gi4us9" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                        <line x1="0" y1="100" x2="100" y2="100" stroke="var(--token-eee4728f-06ef-4d99-9d02-ac8944e7f6dd, rgb(226, 226, 226))" strokeWidth="1" opacity="1" />
                        <line x1="100" y1="0" x2="100" y2="100" stroke="var(--token-eee4728f-06ef-4d99-9d02-ac8944e7f6dd, rgb(226, 226, 226))" strokeWidth="1" opacity="1" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#paper-pattern-grid-c78gi4us9)" />
                  </svg>
                </div>
              </Suspense>
            </div>
            <style data-framer-html-style="" dangerouslySetInnerHTML={{ __html: "html body { background: var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255)); }" }} />
            <div data-framer-root="" className="framer-LfXkz framer-sezhfj" style={{ minHeight: "100vh", width: "auto", display: "contents" }}>
              <div className="framer-cxn5ob-container" data-framer-name="Smooth Scroll" name="Smooth Scroll">
                <Suspense fallback={null}>
                  <style dangerouslySetInnerHTML={{ __html: "html.lenis,\nhtml.lenis body {\n  height: auto;\n}\n\n.lenis:not(.lenis-autoToggle).lenis-stopped {\n  overflow: clip;\n}\n\n.lenis [data-lenis-prevent],\n.lenis [data-lenis-prevent-wheel],\n.lenis [data-lenis-prevent-touch],\n.lenis [data-lenis-prevent-vertical],\n.lenis [data-lenis-prevent-horizontal] {\n  overscroll-behavior: contain;\n}\n\n.lenis.lenis-smooth iframe {\n  pointer-events: none;\n}\n\n.lenis.lenis-autoToggle {\n  transition-property: overflow;\n  transition-duration: 1ms;\n  transition-behavior: allow-discrete;\n}" }} />
                </Suspense>
              </div>
              <div className="framer-42pi2o-container">
                <Suspense fallback={null}>
                  <div style={{ width: "100%", height: "100vh", overflow: "hidden", position: "relative", cursor: "grab", userSelect: "none", WebkitUserSelect: "none", touchAction: "none" }}>
                    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                      <div data-image="true" style={{ position: "absolute", width: "300px", height: "300px", cursor: "pointer", transformOrigin: "center center", willChange: "transform" }}>
                        <img src="/assets/img/playground_spotify.jpg" draggable="false" style={{ width: "100%", height: "100%", objectFit: "cover", userSelect: "none", pointerEvents: "none", borderRadius: "4px" }} loading="eager" alt="Spotify Music" />
                        <div style={{ position: "absolute", padding: "8px 12px", background: "var(--token-3b25897c-a78c-4fb0-9a93-831975a769c1, rgb(161, 223, 197))", color: "rgb(0, 0, 0)", fontSize: "32px", fontFamily: "Just me again down here", whiteSpace: "nowrap", pointerEvents: "none", bottom: "calc(100% + -30px)", left: "50%", transform: "translate(calc(-50% + -55.54838px), 0)" }}>
                          {"on repeat 🎧"}
                        </div>
                      </div>
                      <div data-image="true" style={{ position: "absolute", width: "280px", height: "280px", cursor: "pointer", transformOrigin: "center center", willChange: "transform" }}>
                        <img src="/assets/img/playground_notepad.jpg" draggable="false" style={{ width: "100%", height: "100%", objectFit: "cover", userSelect: "none", pointerEvents: "none", borderRadius: "4px" }} loading="lazy" decoding="async" alt="Checklist Notepad" />
                        <div style={{ position: "absolute", padding: "8px 12px", background: "var(--token-cd9da077-16e0-46f3-9a80-6bf4c2a79928, rgb(245, 221, 161))", color: "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))", fontSize: "32px", fontFamily: "Just me again down here", whiteSpace: "nowrap", pointerEvents: "none", top: "calc(100% + -20px)", left: "50%", transform: "translate(calc(-50% + -49.2109px), 0)" }}>
                          {"current wip & research 📌"}
                        </div>
                      </div>
                      <div data-image="true" style={{ position: "absolute", width: "260px", height: "260px", cursor: "grab", transformOrigin: "center center", willChange: "transform" }}>
                        <img src="/assets/img/playground_sunset.jpg" draggable="false" style={{ width: "100%", height: "100%", objectFit: "cover", userSelect: "none", pointerEvents: "none", borderRadius: "4px" }} loading="lazy" decoding="async" alt="Sunset Photography" />
                        <div style={{ position: "absolute", padding: "8px 12px", background: "var(--token-221f5458-30ad-42f0-b005-7c3d9fe30e8d, rgb(250, 190, 209))", color: "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))", fontSize: "32px", fontFamily: "Just me again down here", whiteSpace: "nowrap", pointerEvents: "none", bottom: "calc(100% + -20px)", left: "50%", transform: "translate(calc(-50% + -60px), 0)" }}>
                          {"golden hour glow 🌅"}
                        </div>
                      </div>
                      <div data-image="true" style={{ position: "absolute", width: "320px", height: "320px", cursor: "grab", transformOrigin: "center center", willChange: "transform" }}>
                        <img src="/assets/img/playground_netflix.jpg" draggable="false" style={{ width: "100%", height: "100%", objectFit: "cover", userSelect: "none", pointerEvents: "none", borderRadius: "4px" }} loading="lazy" decoding="async" alt="Netflix Movie Night" />
                        <div style={{ position: "absolute", padding: "8px 12px", background: "var(--token-a40bc7b7-fed8-4930-b9f7-5dc39bc097a2, rgb(164, 229, 248))", color: "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))", fontSize: "32px", fontFamily: "Just me again down here", whiteSpace: "nowrap", pointerEvents: "none", top: "calc(100% + -20px)", left: "50%", transform: "translate(calc(-50% + 20px), 0)" }}>
                          {"movie night 🍿"}
                        </div>
                      </div>
                      <div data-image="true" style={{ position: "absolute", width: "250px", height: "250px", cursor: "grab", transformOrigin: "center center", willChange: "transform" }}>
                        <img src="/assets/img/playground_coffee.jpg" draggable="false" style={{ width: "100%", height: "100%", objectFit: "cover", userSelect: "none", pointerEvents: "none", borderRadius: "4px" }} loading="lazy" decoding="async" alt="Coffee Latte" />
                        <div style={{ position: "absolute", padding: "8px 12px", background: "var(--token-cd9da077-16e0-46f3-9a80-6bf4c2a79928, rgb(245, 221, 161))", color: "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))", fontSize: "32px", fontFamily: "Just me again down here", whiteSpace: "nowrap", pointerEvents: "none", left: "calc(100% + -20px)", top: "50%", transform: "translate(0, calc(-50% + -20px))" }}>
                          {"coffee & pixels ☕"}
                        </div>
                      </div>
                      <div data-image="true" style={{ position: "absolute", width: "340px", height: "340px", cursor: "grab", transformOrigin: "center center", willChange: "transform" }}>
                        <img src="/assets/img/playground_desk.jpg" draggable="false" style={{ width: "100%", height: "100%", objectFit: "cover", userSelect: "none", pointerEvents: "none", borderRadius: "4px" }} loading="lazy" decoding="async" alt="Designer Desk" />
                        <div style={{ position: "absolute", padding: "8px 12px", background: "var(--token-3b25897c-a78c-4fb0-9a93-831975a769c1, rgb(161, 223, 197))", color: "rgb(0, 0, 0)", fontSize: "32px", fontFamily: "Just me again down here", whiteSpace: "nowrap", pointerEvents: "none", right: "calc(100% + -30px)", top: "50%", transform: "translate(0, calc(-50% + -15px))" }}>
                          {"where ideas grow 💡"}
                        </div>
                      </div>
                      <div data-image="true" style={{ position: "absolute", width: "280px", height: "280px", cursor: "grab", transformOrigin: "center center", willChange: "transform" }}>
                        <img src="/assets/img/e60d1ad393b6febd.webp" draggable="false" style={{ width: "100%", height: "100%", objectFit: "cover", userSelect: "none", pointerEvents: "none", borderRadius: "4px" }} loading="lazy" decoding="async" alt="Architecture Patterns" />
                        <div style={{ position: "absolute", padding: "8px 12px", background: "var(--token-a40bc7b7-fed8-4930-b9f7-5dc39bc097a2, rgb(164, 229, 248))", color: "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))", fontSize: "32px", fontFamily: "Just me again down here", whiteSpace: "nowrap", pointerEvents: "none", bottom: "calc(100% + -20px)", left: "50%", transform: "translate(calc(-50% + 80px), 0)" }}>
                          {"finding patterns 📐"}
                        </div>
                      </div>
                      <div data-image="true" style={{ position: "absolute", width: "240px", height: "240px", cursor: "grab", transformOrigin: "center center", willChange: "transform" }}>
                        <img src="/assets/img/f585d81b1e9c01d8.webp" draggable="false" style={{ width: "100%", height: "100%", objectFit: "cover", userSelect: "none", pointerEvents: "none", borderRadius: "4px" }} loading="lazy" decoding="async" alt="Tiny Moments" />
                        <div style={{ position: "absolute", padding: "8px 12px", background: "var(--token-221f5458-30ad-42f0-b005-7c3d9fe30e8d, rgb(250, 190, 209))", color: "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))", fontSize: "32px", fontFamily: "Just me again down here", whiteSpace: "nowrap", pointerEvents: "none", right: "calc(100% + -30px)", top: "50%", transform: "translate(0, calc(-50% + 20px))" }}>
                          {"tiny moments ✨"}
                        </div>
                      </div>
                    </div>
                  </div>
                </Suspense>
              </div>
              <div className="framer-1ltaivp" data-framer-name="All Content">
                <div className="framer-ptg9fe-container">
                  <Suspense fallback={null}>
                    <div style={{ width: "100%", height: "40px", overflow: "hidden", borderBottom: "1px solid rgba(0,0,0,0.2)", display: "flex", alignItems: "flex-start" }}>
                      <div style={{ display: "flex", alignItems: "flex-start", willChange: "transform" }} />
                    </div>
                  </Suspense>
                </div>
              </div>
            </div>
            <div id="overlay" />
            <div className="framer-1smnmk7" />
            <HeaderLine />
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
      {"\n\t"}
      <span data-fnj-slot={"5"} />
      {"\n\t"}
      <span data-fnj-slot={"6"} />
      <span data-fnj-slot={"7"} />
      <span data-fnj-slot={"8"} />
      <span data-fnj-slot={"9"} />
      <span data-fnj-slot={"10"} />
      <span data-fnj-slot={"11"} />
      <span data-fnj-slot={"12"} />
      <span data-fnj-slot={"13"} />
      <span data-fnj-slot={"14"} />
      <span data-fnj-slot={"15"} />
      <span data-fnj-slot={"16"} />
      <span data-fnj-slot={"17"} />
      <span data-fnj-slot={"18"} />
      <span data-fnj-slot={"19"} />
      <span data-fnj-slot={"20"} />
      <span data-fnj-slot={"21"} />
      <span data-fnj-slot={"22"} />
      <span data-fnj-slot={"23"} />
      <div id="svg-templates" style={{ position: "absolute", overflow: "hidden", bottom: "0", left: "0", width: "0", height: "0", zIndex: "0", contain: "strict" }} aria-hidden="true">
        {"\n"}
      </div>
      {"\n\t"}
      <span data-fnj-slot={"24"} />
      {"\n    \n    "}
      <span data-fnj-slot={"25"} />
      {"\n\n\n"}
    </body>
  );
}
