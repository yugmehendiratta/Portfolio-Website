import React, { Suspense } from "react";

export interface AboutProps {
  className?: string;
  name?: string;
  positioning?: string;
  focusAreas?: string[];
}

/**
 * Draft 1 About Component
 * Preserves the exact Nudge Framer design language, SVG filter effects, draggable polaroids,
 * responsive typography variants, and interactive design tags.
 * Converted to Yug's identity, positioning, and design focus.
 */
export default function About({ className = "" }: AboutProps) {
  const focusSkills = [
    "Product Design",
    "UI/UX Design",
    "Interaction Design",
    "Design Systems",
    "Prototyping",
    "SaaS & AI Products",
  ];

  return (
    <section className={`framer-1u3kxkv draft1-about ${className}`} data-framer-name="About">
      {/* Background with Displacement Map Wave Filter */}
      <div className="framer-bxohin-container">
        <Suspense fallback={null}>
          <div style={{ width: "100%", height: "100%" }}>
            <svg width="0" height="0">
              <filter id=":R6mjlalp:">
                <feTurbulence type="turbulence" baseFrequency="0.01" numOctaves="2" seed="2" result="turbulence" />
                <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="6" xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </svg>
            <img src="/assets/img/9086265bb6179508.svg" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "url(#:R6mjlalp:)" }} loading="lazy" decoding="async" alt="" />
          </div>
        </Suspense>
      </div>

      <div className="framer-12ykyxy" data-framer-name="Contain" id="about" style={{ originY: "0" }}>
        <div className="framer-1hfxr5x" data-framer-name="Content">
          {/* Header Badges & Decorative Sticker */}
          <div className="framer-1qxp9j6" data-framer-name="Decoration">
            <div className="framer-372ism" data-framer-component-type="RichTextContainer" style={{ transform: "rotate(14deg)" }}>
              <h2 className="framer-text framer-styles-preset-1o05o96" data-styles-preset="H8WdmyHet" dir="auto">
                {"about me!"}
              </h2>
            </div>
          </div>
          <div className="framer-12cun56" data-border="true" data-framer-name="Text" style={{ willChange: "transform", opacity: "1", transform: "rotate(-10deg)" }}>
            <div className="framer-11hf68e" data-framer-name="Border">
              <div className="framer-lz4pc4" data-border="true" data-framer-name="rectangle" />
              <div className="framer-5e70fl" data-border="true" data-framer-name="rectangle" />
              <div className="framer-1fib0fp" data-border="true" data-framer-name="rectangle" />
              <div className="framer-6r03wo" data-border="true" data-framer-name="rectangle" />
            </div>
            <div className="framer-i77336" data-framer-component-type="RichTextContainer" style={{ transform: "none" }}>
              <h4 className="framer-text framer-styles-preset-jjv5nu" data-styles-preset="TI_CAjGBM" dir="auto">
                {"what's up"}
              </h4>
            </div>
          </div>

          {/* Draggable Polaroid Elements */}
          <div className="framer-ljnwxn" data-framer-name="Image">
            <div className="framer-1usv7ks-container" draggable="false" tabIndex={0} style={{ opacity: "1", transform: "rotate(12deg)", WebkitTouchCallout: "none", WebkitUserSelect: "none", userSelect: "none", touchAction: "none" }}>
              <div className="framer-bPcig framer-EjAzI framer-zl9qtm framer-v-zl9qtm" data-framer-name="Default" style={{ height: "100%", width: "100%", boxShadow: "0px 0.6021873017743928px 1.8065619053231785px -0.8333333333333333px rgba(0, 0, 0, 0.13), 0px 2.288533303243457px 6.8655999097303715px -1.6666666666666665px rgba(0, 0, 0, 0.13), 0px 10px 30px -2.5px rgba(0, 0, 0, 0.13)" }}>
                <div className="framer-82wh8q" data-framer-name="Polaroid" style={{ backgroundColor: "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))" }}>
                  <div className="framer-1ywu17f">
                    <div style={{ position: "absolute", borderRadius: "inherit", cornerShape: "inherit", top: "0", right: "0", bottom: "0", left: "0" }} data-framer-background-image-wrapper="true">
                      <img width="870" height="869" sizes="(min-width: 1200px) max(40px, calc(162px - 16px)), (min-width: 810px) and (max-width: 1199.98px) max(40px, calc(162px - 16px)), (max-width: 809.98px) max(40px, calc(162px - 16px))" srcSet="/assets/img/d15774e64fdfb82a.webp 512w, /assets/img/ae83aba71780ab07.webp 870w" src="/assets/img/ae83aba71780ab07.webp" alt="Yug" style={{ display: "block", width: "100%", height: "100%", borderRadius: "inherit", cornerShape: "inherit", objectPosition: "center", objectFit: "cover" }} loading="eager" />
                    </div>
                  </div>
                </div>
                <div className="framer-1a9jrm3" data-framer-name="Polaroid" style={{ backgroundColor: "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))" }}>
                  <div className="framer-1wh2zmo" data-framer-component-type="RichTextContainer" style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                    <h5 className="framer-text framer-styles-preset-1v53mqb" data-styles-preset="qvOJ3gdiv" dir="auto">
                      {"2026"}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="framer-1g6trdm-container" draggable="false" style={{ opacity: "1", transform: "rotate(-14deg)", WebkitTouchCallout: "none", WebkitUserSelect: "none", userSelect: "none", touchAction: "none" }}>
              <div className="framer-bPcig framer-EjAzI framer-zl9qtm framer-v-zl9qtm" data-framer-name="Default" style={{ height: "100%", width: "100%", boxShadow: "0px 0.6021873017743928px 1.8065619053231785px -0.8333333333333333px rgba(0, 0, 0, 0.13), 0px 2.288533303243457px 6.8655999097303715px -1.6666666666666665px rgba(0, 0, 0, 0.13), 0px 10px 30px -2.5px rgba(0, 0, 0, 0.13)" }}>
                <div className="framer-82wh8q" data-framer-name="Polaroid" style={{ backgroundColor: "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))" }}>
                  <div className="framer-1ywu17f">
                    <div style={{ position: "absolute", borderRadius: "inherit", cornerShape: "inherit", top: "0", right: "0", bottom: "0", left: "0" }} data-framer-background-image-wrapper="true">
                      <img decoding="async" width="683" height="1024" sizes="(min-width: 1200px) calc(162px - 16px), (min-width: 810px) and (max-width: 1199.98px) calc(162px - 16px), (max-width: 809.98px) calc(162px - 16px)" srcSet="/assets/img/2df96adc70b14976.webp 683w" src="/assets/img/2df96adc70b14976.webp" alt="Design workspace" style={{ display: "block", width: "100%", height: "100%", borderRadius: "inherit", cornerShape: "inherit", objectPosition: "center", objectFit: "cover" }} loading="lazy" />
                    </div>
                  </div>
                </div>
                <div className="framer-1a9jrm3" data-framer-name="Polaroid" style={{ backgroundColor: "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))" }}>
                  <div className="framer-1wh2zmo" data-framer-component-type="RichTextContainer" style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                    <h5 className="framer-text framer-styles-preset-1v53mqb" data-styles-preset="qvOJ3gdiv" dir="auto">
                      {"my workspace"}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Positioning Paragraph across Breakpoints */}
          <div className="framer-1r6gymq-container">
            <Suspense fallback={null}>
              {/* Desktop Viewport */}
              <div className="ssr-variant hidden-6kqop5 hidden-7h10me">
                <div style={{ width: "100%", transform: "translateZ(0)" }}>
                  <p style={{ fontFamily: "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", fontWeight: "500", fontSize: "68px", lineHeight: "1.1", letterSpacing: "-0.03em", color: "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))", textAlign: "center", margin: "0", padding: "0", display: "block", width: "100%", whiteSpace: "pre-wrap" }}>
                    {"‎‎I’m Yug "}
                    <span style={{ display: "inline-flex", alignItems: "center", height: "1em", margin: "0 0.1em", verticalAlign: "middle", transformOrigin: "center", willChange: "transform" }}>
                      <img src="/assets/img/f8bcca3b7e63b449.webp" alt="" style={{ height: "100%", width: "auto", display: "block", objectFit: "contain" }} loading="lazy" decoding="async" />
                    </span>
                    {", a UI/UX and Product Designer focused on creating clear, thoughtful digital experiences. I work across SaaS, AI products, e-commerce, and digital platforms "}
                    <span style={{ display: "inline-flex", alignItems: "center", height: "1em", margin: "0 0.1em", verticalAlign: "middle", transformOrigin: "center", willChange: "transform" }}>
                      <img src="/assets/img/879e5ff02dd6933a.webp" alt="" style={{ height: "100%", width: "auto", display: "block", objectFit: "contain" }} loading="lazy" decoding="async" />
                    </span>
                    {", turning complex ideas into simple and usable interfaces "}
                    <span style={{ display: "inline-flex", alignItems: "center", height: "1em", margin: "0 0.1em", verticalAlign: "middle", transformOrigin: "center", willChange: "transform" }}>
                      <img src="/assets/img/105ba28fe00f997a.webp" alt="" style={{ height: "100%", width: "auto", display: "block", objectFit: "contain" }} loading="lazy" decoding="async" />
                    </span>
                    {"."}
                  </p>
                </div>
              </div>

              {/* Tablet Viewport */}
              <div className="ssr-variant hidden-s8d5gr hidden-7h10me">
                <div style={{ width: "100%", transform: "translateZ(0)" }}>
                  <p style={{ fontFamily: "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", fontWeight: "500", fontSize: "44px", lineHeight: "1.1", letterSpacing: "-0.03em", color: "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))", textAlign: "center", margin: "0", padding: "0", display: "block", width: "100%", whiteSpace: "pre-wrap" }}>
                    {"‎‎I’m Yug "}
                    <span style={{ display: "inline-flex", alignItems: "center", height: "1em", margin: "0 0.1em", verticalAlign: "middle", transformOrigin: "center", willChange: "transform" }}>
                      <img src="/assets/img/f8bcca3b7e63b449.webp" alt="" style={{ height: "100%", width: "auto", display: "block", objectFit: "contain" }} loading="lazy" decoding="async" />
                    </span>
                    {", a UI/UX and Product Designer focused on creating clear, thoughtful digital experiences. I work across SaaS, AI products, e-commerce, and digital platforms "}
                    <span style={{ display: "inline-flex", alignItems: "center", height: "1em", margin: "0 0.1em", verticalAlign: "middle", transformOrigin: "center", willChange: "transform" }}>
                      <img src="/assets/img/879e5ff02dd6933a.webp" alt="" style={{ height: "100%", width: "auto", display: "block", objectFit: "contain" }} loading="lazy" decoding="async" />
                    </span>
                    {", turning complex ideas into simple and usable interfaces "}
                    <span style={{ display: "inline-flex", alignItems: "center", height: "1em", margin: "0 0.1em", verticalAlign: "middle", transformOrigin: "center", willChange: "transform" }}>
                      <img src="/assets/img/105ba28fe00f997a.webp" alt="" style={{ height: "100%", width: "auto", display: "block", objectFit: "contain" }} loading="lazy" decoding="async" />
                    </span>
                    {"."}
                  </p>
                </div>
              </div>

              {/* Mobile Viewport */}
              <div className="ssr-variant hidden-s8d5gr hidden-6kqop5">
                <div style={{ width: "100%", transform: "translateZ(0)" }}>
                  <p style={{ fontFamily: "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", fontWeight: "500", fontSize: "32px", lineHeight: "1.1", letterSpacing: "-0.03em", color: "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))", textAlign: "center", margin: "0", padding: "0", display: "block", width: "100%", whiteSpace: "pre-wrap" }}>
                    {"‎‎I’m Yug "}
                    <span style={{ display: "inline-flex", alignItems: "center", height: "1em", margin: "0 0.1em", verticalAlign: "middle", transformOrigin: "center", willChange: "transform" }}>
                      <img src="/assets/img/f8bcca3b7e63b449.webp" alt="" style={{ height: "100%", width: "auto", display: "block", objectFit: "contain" }} loading="lazy" decoding="async" />
                    </span>
                    {", a UI/UX and Product Designer focused on creating clear, thoughtful digital experiences. I work across SaaS, AI products, e-commerce, and digital platforms "}
                    <span style={{ display: "inline-flex", alignItems: "center", height: "1em", margin: "0 0.1em", verticalAlign: "middle", transformOrigin: "center", willChange: "transform" }}>
                      <img src="/assets/img/879e5ff02dd6933a.webp" alt="" style={{ height: "100%", width: "auto", display: "block", objectFit: "contain" }} loading="lazy" decoding="async" />
                    </span>
                    {", turning complex ideas into simple and usable interfaces "}
                    <span style={{ display: "inline-flex", alignItems: "center", height: "1em", margin: "0 0.1em", verticalAlign: "middle", transformOrigin: "center", willChange: "transform" }}>
                      <img src="/assets/img/105ba28fe00f997a.webp" alt="" style={{ height: "100%", width: "auto", display: "block", objectFit: "contain" }} loading="lazy" decoding="async" />
                    </span>
                    {"."}
                  </p>
                </div>
              </div>
            </Suspense>
          </div>

          {/* Design Focus & Specialization Interactive Tags */}
          <div className="framer-1btv9kp" data-framer-name="List Tag">
            {/* Tag 1: Product Design */}
            <div className="framer-54pl82" data-framer-name="Tag">
              <div className="framer-31wgst" data-framer-component-type="RichTextContainer" style={{ transform: "none" }}>
                <h4 className="framer-text framer-styles-preset-jjv5nu" data-styles-preset="TI_CAjGBM" dir="auto" style={{ "--framer-text-color": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))" }}>
                  {focusSkills[0]}
                </h4>
              </div>
            </div>
            <div className="framer-ge2k9a" data-border="true" data-framer-name="Icon">
              <Suspense fallback={null}>
                <div className="framer-14tvjdo" data-framer-name="Interactive" style={{ transform: "translate(-50%, -50%)" }} />
              </Suspense>
            </div>

            {/* Tag 2: UI/UX Design */}
            <div className="framer-1yf7kob" data-framer-name="Tag">
              <div className="framer-qyyr1q" data-framer-component-type="RichTextContainer" style={{ transform: "none" }}>
                <h4 className="framer-text framer-styles-preset-jjv5nu" data-styles-preset="TI_CAjGBM" dir="auto" style={{ "--framer-text-color": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))" }}>
                  {focusSkills[1]}
                </h4>
              </div>
            </div>
            <div className="framer-4njtx0" data-framer-name="Icon">
              <div className="framer-nkhlih" data-framer-name="Interactive">
                <Suspense fallback={null}>
                  <div className="framer-1rci139" data-framer-name="Prototype animate" style={{ transform: "translate(-50%, -50%)" }} />
                </Suspense>
                <div className="framer-fl9u67" />
              </div>
            </div>

            {/* Tag 3: Interaction Design */}
            <div className="framer-zperoz" data-framer-name="Tag">
              <div className="framer-eoyoj8" data-framer-component-type="RichTextContainer" style={{ transform: "none" }}>
                <h4 className="framer-text framer-styles-preset-jjv5nu" data-styles-preset="TI_CAjGBM" dir="auto" style={{ "--framer-text-color": "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))" }}>
                  {focusSkills[2]}
                </h4>
              </div>
            </div>
            <div className="framer-gnsd3i" data-framer-name="Icon">
              <div className="framer-1mkjmyx" data-framer-name="Interactive">
                <div className="framer-189qpoq-container" data-code-component-plugin-id="84d4c1">
                  <Suspense fallback={null}>
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                      <svg width="100%" height="100%" viewBox="0 0 732 395" fill="var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M365.914 394.012C516.48 394.012 647.127 297.818 712.173 239.865C738.38 216.516 738.38 177.497 712.173 154.147C647.127 96.1942 516.48 0 365.914 0C215.348 0 84.702 96.1942 19.6557 154.147C-6.55192 177.497 -6.55188 216.516 19.6557 239.865C84.702 297.818 215.348 394.012 365.914 394.012ZM365.914 334.452C441.965 334.452 503.615 272.916 503.615 197.005C503.615 121.096 441.965 59.5597 365.914 59.5597C289.865 59.5597 228.215 121.096 228.215 197.005C228.215 272.916 289.865 334.452 365.914 334.452Z" fill="var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))" />
                      </svg>
                    </div>
                  </Suspense>
                </div>
              </div>
              <Suspense fallback={null}>
                <div className="framer-iw497p" data-framer-name="Star" style={{ transform: "translate(-50%, -50%)" }} />
              </Suspense>
            </div>

            {/* Tag 4: Design Systems */}
            <div className="framer-1qr8pew" data-framer-name="Tag">
              <div className="framer-vyqlo8" data-framer-component-type="RichTextContainer" style={{ transform: "none" }}>
                <h4 className="framer-text framer-styles-preset-jjv5nu" data-styles-preset="TI_CAjGBM" dir="auto" style={{ "--framer-text-color": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))" }}>
                  {focusSkills[3]}
                </h4>
              </div>
            </div>
            <div className="framer-xoi2wh" data-framer-name="Icon">
              <div className="framer-b1sd0p">
                <Suspense fallback={null}>
                  <div className="framer-10nh4p1" />
                </Suspense>
                <Suspense fallback={null}>
                  <div className="framer-mv0yts" />
                </Suspense>
                <Suspense fallback={null}>
                  <div className="framer-15ym2yx" />
                </Suspense>
                <Suspense fallback={null}>
                  <div className="framer-ahwnzz" />
                </Suspense>
              </div>
              <div className="framer-1q80jof" />
              <div className="framer-m8f5ce" />
              <div className="framer-x7ek3a" />
              <div className="framer-sjjzc6" />
            </div>

            {/* Tag 5: Prototyping */}
            <div className="framer-54pl82" data-framer-name="Tag" style={{ backgroundColor: "var(--token-1892785e-8581-4826-b411-015017430ad3, rgb(0, 94, 217))" }}>
              <div className="framer-31wgst" data-framer-component-type="RichTextContainer" style={{ transform: "none" }}>
                <h4 className="framer-text framer-styles-preset-jjv5nu" data-styles-preset="TI_CAjGBM" dir="auto" style={{ "--framer-text-color": "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))" }}>
                  {focusSkills[4]}
                </h4>
              </div>
            </div>

            {/* Tag 6: SaaS & AI Products */}
            <div className="framer-1yf7kob" data-framer-name="Tag" style={{ backgroundColor: "var(--token-a40bc7b7-fed8-4930-b9f7-5dc39bc097a2, rgb(164, 229, 248))" }}>
              <div className="framer-qyyr1q" data-framer-component-type="RichTextContainer" style={{ transform: "none" }}>
                <h4 className="framer-text framer-styles-preset-jjv5nu" data-styles-preset="TI_CAjGBM" dir="auto" style={{ "--framer-text-color": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))" }}>
                  {focusSkills[5]}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
