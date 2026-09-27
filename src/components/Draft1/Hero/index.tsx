import React, { Suspense } from "react";

export interface HeroProps {
  className?: string;
  name?: string;
  role?: string;
  positioning?: string;
}

/**
 * Draft 1 Hero Component
 * Preserves the exact Nudge Framer design language, DOM hierarchy, animations, and responsive variants.
 * Converted to Yug's identity and positioning.
 */
export default function Hero({ className = "" }: HeroProps) {
  // Letters for animated name display: "Yug"
  const nameLetters = ["Y", "u", "g"];

  return (
    <section className={`framer-15n2sit draft1-hero ${className}`} data-framer-name="Hero Section">
      <div className="framer-syyabg" data-framer-name="Contain">
        {/* Top Ruler Bar with Live Clock */}
        <div className="framer-gjl2ae" data-framer-name="Ruler" id="ruler">
          <div className="framer-o2c88a" data-framer-name="Contain">
            <div className="framer-1ao907p-container">
              <Suspense fallback={null}>
                <div style={{ width: "100%", height: "40px", overflow: "hidden", borderBottom: "1px solid rgba(0,0,0,0.2)", display: "flex", alignItems: "flex-start" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", willChange: "transform" }} />
                </div>
              </Suspense>
            </div>
            <div className="framer-1x2dk32" data-framer-name="Time">
              <div className="framer-1frrjid-container">
                <Suspense fallback={null}>
                  <div style={{ fontFamily: "\"DM Mono\", \"DM Mono Placeholder\", monospace", fontSize: "14px", fontStyle: "normal", fontWeight: "500", letterSpacing: "-0.02em", lineHeight: "120%", color: "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))" }}>
                    {"7:31:16 PM IST"}
                  </div>
                </Suspense>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Content Area */}
        <div className="framer-sggs4x" data-framer-name="Content">
          {/* Avatar / Profile Image */}
          <div className="framer-1myc1q3-container hidden-7h10me" style={{ willChange: "transform", opacity: "0", transform: "translate(-50%, -50%)" }}>
            <div className="framer-8TsPJ framer-SwHTo framer-1b4chb6 framer-v-1b4chb6" data-framer-name="Default" style={{ backgroundColor: "var(--token-a40bc7b7-fed8-4930-b9f7-5dc39bc097a2, rgb(164, 229, 248))", borderBottomRightRadius: "56px", borderTopLeftRadius: "56px", borderTopRightRadius: "56px" }}>
              <div className="framer-qajkzl" style={{ borderBottomLeftRadius: "40px", borderBottomRightRadius: "40px", borderTopLeftRadius: "40px", borderTopRightRadius: "40px" }}>
                <div style={{ position: "absolute", borderRadius: "inherit", cornerShape: "inherit", top: "0", right: "0", bottom: "0", left: "0" }} data-framer-background-image-wrapper="true">
                  <img width="870" height="869" sizes="(min-width: 1200px) max(40px, calc(162px - 16px)), (min-width: 810px) and (max-width: 1199.98px) max(40px, calc(162px - 16px)), (max-width: 809.98px) max(40px, calc(162px - 16px))" srcSet="/assets/img/d15774e64fdfb82a.webp 512w, /assets/img/ae83aba71780ab07.webp 870w" src="/assets/img/ae83aba71780ab07.webp" alt="Yug" style={{ display: "block", width: "100%", height: "100%", borderRadius: "inherit", cornerShape: "inherit", objectPosition: "center", objectFit: "cover" }} loading="eager" fetchPriority="high" />
                </div>
              </div>
            </div>
          </div>
          <div className="framer-1eo2c47-container hidden-7h10me" style={{ willChange: "transform", opacity: "0", transform: "translate(-50%, -50%)" }}>
            <div className="framer-8TsPJ framer-SwHTo framer-1b4chb6 framer-v-1b4chb6" data-framer-name="Default" style={{ backgroundColor: "var(--token-a40bc7b7-fed8-4930-b9f7-5dc39bc097a2, rgb(164, 229, 248))", borderBottomRightRadius: "56px", borderTopLeftRadius: "56px", borderTopRightRadius: "56px" }}>
              <div className="framer-qajkzl" style={{ borderBottomLeftRadius: "40px", borderBottomRightRadius: "40px", borderTopLeftRadius: "40px", borderTopRightRadius: "40px" }}>
                <div style={{ position: "absolute", borderRadius: "inherit", cornerShape: "inherit", top: "0", right: "0", bottom: "0", left: "0" }} data-framer-background-image-wrapper="true">
                  <img width="870" height="869" sizes="(min-width: 1200px) max(40px, calc(162px - 16px)), (min-width: 810px) and (max-width: 1199.98px) max(40px, calc(162px - 16px)), (max-width: 809.98px) max(40px, calc(162px - 16px))" srcSet="/assets/img/d15774e64fdfb82a.webp 512w, /assets/img/ae83aba71780ab07.webp 870w" src="/assets/img/ae83aba71780ab07.webp" alt="Yug" style={{ display: "block", width: "100%", height: "100%", borderRadius: "inherit", cornerShape: "inherit", objectPosition: "center", objectFit: "cover" }} loading="eager" />
                </div>
              </div>
            </div>
          </div>

          {/* Name Tag & Badges */}
          <div className="framer-165flm4" data-framer-name="Tag Name">
            <div className="framer-1q491kj" data-framer-name="My name is">
              <div className="framer-1nkgmoe" data-framer-component-type="RichTextContainer" style={{ transform: "none" }}>
                <h5 className="framer-text framer-styles-preset-2lfg8k" data-styles-preset="R28tD7UOw" dir="auto">
                  {"my name is"}
                </h5>
              </div>
              <div className="framer-YHfrK framer-184iwix" />
            </div>

            {/* Desktop Name Badge */}
            <div className="ssr-variant hidden-7h10me">
              <div className="framer-tumop7" data-border="true" data-framer-cursor="11fq7c3" data-framer-name="Name">
                <div className="framer-1qnwds4" data-framer-name="Border">
                  <div className="framer-a9zkj0" data-border="true" data-framer-name="rectangle" />
                  <div className="framer-1hdo3ag" data-border="true" data-framer-name="rectangle" />
                  <div className="framer-ez7aco" data-border="true" data-framer-name="rectangle" />
                  <div className="framer-1a67jnk" data-border="true" data-framer-name="rectangle" />
                </div>
                <div className="framer-tdbbdt" data-framer-component-type="RichTextContainer" style={{ transform: "none" }}>
                  <h1 className="framer-text framer-styles-preset-4nri6j" data-styles-preset="Iep6i79Kc" dir="auto" style={{ "--framer-text-color": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))" }}>
                    <span style={{ whiteSpace: "nowrap" }}>
                      {nameLetters.map((char, index) => (
                        <span key={`first-${index}`} style={{ display: "inline-block", opacity: "0.001", transform: "translateX(40px) translateY(0px) scale(0.9) rotate(0deg) skewX(0deg) skewY(0deg)" }}>
                          {char}
                        </span>
                      ))}
                    </span>
                  </h1>
                </div>
                {/* Floating Role Tags */}
                <div className="framer-3uhcie" data-framer-name="Tag" style={{ transform: "rotate(14deg)" }}>
                  <div className="framer-1j2twoc" data-framer-component-type="RichTextContainer" style={{ transform: "none" }}>
                    <p className="framer-text framer-styles-preset-163ovsm" data-styles-preset="ptQSvPZIk" dir="auto" style={{ "--framer-text-color": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))" }}>
                      {"Still curious, still leveling up"}
                    </p>
                  </div>
                </div>
                <div className="framer-l9afbe" data-framer-name="Tag" style={{ transform: "rotate(-8deg)" }}>
                  <div className="framer-1hfuatx" data-framer-component-type="RichTextContainer" style={{ transform: "none" }}>
                    <p className="framer-text framer-styles-preset-163ovsm" data-styles-preset="ptQSvPZIk" dir="auto" style={{ "--framer-text-color": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))" }}>
                      {"Chasing the next hard problem"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile/Tablet Name Badge */}
            <div className="ssr-variant hidden-s8d5gr hidden-6kqop5">
              <div className="framer-tumop7" data-border="true" data-framer-name="Name">
                <div className="framer-1qnwds4" data-framer-name="Border">
                  <div className="framer-a9zkj0" data-border="true" data-framer-name="rectangle" />
                  <div className="framer-1hdo3ag" data-border="true" data-framer-name="rectangle" />
                  <div className="framer-ez7aco" data-border="true" data-framer-name="rectangle" />
                  <div className="framer-1a67jnk" data-border="true" data-framer-name="rectangle" />
                </div>
                <div className="framer-tdbbdt" data-framer-component-type="RichTextContainer" style={{ transform: "none" }}>
                  <h1 className="framer-text framer-styles-preset-4nri6j" data-styles-preset="Iep6i79Kc" dir="auto" style={{ "--framer-text-color": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))" }}>
                    <span style={{ whiteSpace: "nowrap" }}>
                      {nameLetters.map((char, index) => (
                        <span key={`m-first-${index}`} style={{ display: "inline-block", opacity: "0.001", transform: "translateX(40px) translateY(0px) scale(0.9) rotate(0deg) skewX(0deg) skewY(0deg)" }}>
                          {char}
                        </span>
                      ))}
                    </span>
                  </h1>
                </div>
                <div className="framer-3uhcie" data-framer-name="Tag" style={{ transform: "rotate(14deg)" }}>
                  <div className="framer-1j2twoc" data-framer-component-type="RichTextContainer" style={{ transform: "none" }}>
                    <p className="framer-text framer-styles-preset-163ovsm" data-styles-preset="ptQSvPZIk" dir="auto" style={{ "--framer-text-color": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))" }}>
                      {"Still curious, still leveling up"}
                    </p>
                  </div>
                </div>
                <div className="framer-l9afbe" data-framer-name="Tag" style={{ transform: "rotate(-8deg)" }}>
                  <div className="framer-1hfuatx" data-framer-component-type="RichTextContainer" style={{ transform: "none" }}>
                    <p className="framer-text framer-styles-preset-163ovsm" data-styles-preset="ptQSvPZIk" dir="auto" style={{ "--framer-text-color": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))" }}>
                      {"Chasing the next hard problem"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

            {/* Availability Pill */}
            <div className="framer-uudsqs" data-framer-name="Available">
              <div className="framer-1rsoydm" data-framer-name="Circle" />
              <div className="framer-1f1f750" data-framer-component-type="RichTextContainer" style={{ transform: "none" }}>
                <p className="framer-text framer-styles-preset-1833qg6" data-styles-preset="jB2nPzqr7" dir="auto">
                  <span style={{ whiteSpace: "nowrap" }}>
                    {"Available".split("").map((c, i) => (
                      <span key={`avail-${i}`} style={{ display: "inline-block", opacity: "0.001", transform: "translateX(0px) translateY(40px) scale(1) rotate(0deg) skewX(0deg) skewY(0deg)" }}>
                        {c}
                      </span>
                    ))}
                  </span>
                  {" "}
                  <span style={{ whiteSpace: "nowrap" }}>
                    {"for".split("").map((c, i) => (
                      <span key={`for-${i}`} style={{ display: "inline-block", opacity: "0.001", transform: "translateX(0px) translateY(40px) scale(1) rotate(0deg) skewX(0deg) skewY(0deg)" }}>
                        {c}
                      </span>
                    ))}
                  </span>
                  {" "}
                  <span style={{ whiteSpace: "nowrap" }}>
                    {"thoughtful".split("").map((c, i) => (
                      <span key={`thought-${i}`} style={{ display: "inline-block", opacity: "0.001", transform: "translateX(0px) translateY(40px) scale(1) rotate(0deg) skewX(0deg) skewY(0deg)" }}>
                        {c}
                      </span>
                    ))}
                  </span>
                  {" "}
                  <span style={{ whiteSpace: "nowrap" }}>
                    {"projects".split("").map((c, i) => (
                      <span key={`proj-${i}`} style={{ display: "inline-block", opacity: "0.001", transform: "translateX(0px) translateY(40px) scale(1) rotate(0deg) skewX(0deg) skewY(0deg)" }}>
                        {c}
                      </span>
                    ))}
                  </span>
                </p>
              </div>
            </div>

          {/* Positioning Headline & Contact CTA Button */}
          <div className="framer-glj4ua" data-framer-name="Text + button">
            <div className="framer-f7coxl-container">
              <Suspense fallback={null}>
                {/* Desktop Headline */}
                <div className="ssr-variant hidden-6kqop5 hidden-7h10me">
                  <div style={{ width: "100%", transform: "translateZ(0)" }}>
                    <p style={{ fontFamily: "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", fontWeight: "500", fontSize: "40px", lineHeight: "1.1", letterSpacing: "-0.03em", color: "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))", textAlign: "center", margin: "0", padding: "0", display: "block", width: "100%", whiteSpace: "pre-wrap" }}>
                      {"Messy problems, clean screens 🎯."}
                    </p>
                  </div>
                </div>

                {/* Tablet Headline */}
                <div className="ssr-variant hidden-s8d5gr hidden-7h10me">
                  <div style={{ width: "100%", transform: "translateZ(0)" }}>
                    <p style={{ fontFamily: "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", fontWeight: "500", fontSize: "32px", lineHeight: "1.1", letterSpacing: "-0.03em", color: "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))", textAlign: "center", margin: "0", padding: "0", display: "block", width: "100%", whiteSpace: "pre-wrap" }}>
                      {"Messy problems, clean screens 🎯."}
                    </p>
                  </div>
                </div>

                {/* Mobile Headline */}
                <div className="ssr-variant hidden-s8d5gr hidden-6kqop5">
                  <div style={{ width: "100%", transform: "translateZ(0)" }}>
                    <p style={{ fontFamily: "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", fontWeight: "500", fontSize: "28px", lineHeight: "1.1", letterSpacing: "-0.03em", color: "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))", textAlign: "center", margin: "0", padding: "0", display: "block", width: "100%", whiteSpace: "pre-wrap" }}>
                      {"Messy problems, clean screens 🎯."}
                    </p>
                  </div>
                </div>
              </Suspense>
            </div>

            {/* Contact CTA Action Button */}
            <Suspense fallback={null}>
              <div className="framer-16s9x6s-container">
                <Suspense fallback={null}>
                  <a className="framer-JoWOw framer-erhBl framer-1drrvrm framer-v-1drrvrm framer-nypwqp" data-framer-name="Default" data-highlight="true" href="./contact" style={{ borderBottomLeftRadius: "0px", borderBottomRightRadius: "0px", borderTopLeftRadius: "0px", borderTopRightRadius: "0px" }}>
                    <div className="framer-1orb80w" data-framer-name="Border">
                      <div className="framer-1430xyk" data-border="true" data-framer-name="Fill Color" style={{ "--border-bottom-width": "1px", "--border-color": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", backgroundColor: "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))" }} />
                      <div className="framer-12gtyfi" data-border="true" data-framer-name="Dot" style={{ "--border-bottom-width": "1px", "--border-color": "rgb(34, 34, 34)", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", backgroundColor: "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))", opacity: "0" }} />
                      <div className="framer-jamzew" data-border="true" data-framer-name="Dot" style={{ "--border-bottom-width": "1px", "--border-color": "rgb(34, 34, 34)", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", backgroundColor: "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))", opacity: "0" }} />
                      <div className="framer-hd5jfx" data-border="true" data-framer-name="Dot" style={{ "--border-bottom-width": "1px", "--border-color": "rgb(34, 34, 34)", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", backgroundColor: "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))", opacity: "0" }} />
                      <div className="framer-q2mch0" data-border="true" data-framer-name="Dot" style={{ "--border-bottom-width": "1px", "--border-color": "rgb(34, 34, 34)", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", backgroundColor: "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))", opacity: "0" }} />
                    </div>
                    <div className="framer-12c9etj" data-framer-name="Icon" style={{ backgroundColor: "var(--token-1892785e-8581-4826-b411-015017430ad3, rgb(194, 217, 231))" }}>
                      <div className="framer-co8rw2" data-framer-name="Icon" style={{ transform: "translate(-50%, -50%)" }}>
                        <div className="framer-6c5w67-container" data-code-component-plugin-id="84d4c1" style={{ opacity: "1", transform: "none" }}>
                          <Suspense fallback={null}>
                            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                              <svg width="100%" height="100%" viewBox="0 0 200 200" fill="var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M4.37114e-06 2.76541e-06L7.54022e-06 50L100 100L2.18557e-06 150L0 200L100 150V200L200 150V100V50L100 0V50L4.37114e-06 2.76541e-06ZM100 50V100V150L200 100L100 50Z" fill="var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))" />
                              </svg>
                            </div>
                          </Suspense>
                        </div>
                      </div>
                      <div className="framer-bn8oa5-container" data-code-component-plugin-id="84d4c1">
                        <Suspense fallback={null}>
                          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                            <svg width="100%" height="100%" viewBox="0 0 357 357" fill="var(--token-e22e0fe6-83a6-4381-a625-c6f173619c49, rgb(224, 30, 90))" xmlns="http://www.w3.org/2000/svg">
                              <path d="M35.6354 178.175C114.686 178.175 178.769 98.4032 178.769 0C178.769 98.4032 242.852 178.175 321.903 178.175C242.852 178.175 178.769 257.946 178.769 356.35C178.769 257.946 114.686 178.175 35.6354 178.175Z" fill="var(--token-e22e0fe6-83a6-4381-a625-c6f173619c49, rgb(224, 30, 90))" />
                            </svg>
                          </div>
                        </Suspense>
                      </div>
                    </div>
                    <div className="framer-p0e2c4" data-framer-component-type="RichTextContainer" style={{ "--extracted-r6o4lv": "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                      <p className="framer-text framer-styles-preset-1833qg6" data-styles-preset="jB2nPzqr7" dir="auto" style={{ "--framer-text-color": "var(--extracted-r6o4lv, var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255)))" }}>
                        {"Contact me"}
                      </p>
                    </div>
                  </a>
                </Suspense>
              </div>
            </Suspense>

            {/* Sticker Badge: Product Designer */}
            <div className="framer-ie8nfk hidden-7h10me" data-border="true" data-framer-name="Product Designer" style={{ opacity: "1", transform: "translate(-50%, -50%)" }}>
              <div className="framer-1e7c3jc-container">
                <Suspense fallback={null}>
                  <div style={{ width: "0px", height: "0px" }} />
                </Suspense>
              </div>
              <div className="framer-4kd0m0" data-framer-component-type="RichTextContainer" style={{ transform: "none" }}>
                <p className="framer-text framer-styles-preset-1833qg6" data-styles-preset="jB2nPzqr7" dir="auto">
                  {"Product Designer"}
                </p>
              </div>
              <div data-framer-component-type="SVG" parentsize="0" _constraints="[object Object]" rotation="0" shadows="" className="framer-ebfb9u" aria-hidden="true" style={{ imageRendering: "pixelated", flexShrink: "0", transform: "rotate(99deg)" }}>
                <div className="svgContainer" style={{ width: "100%", height: "100%", aspectRatio: "inherit" }}>
                  <svg style={{ width: "100%", height: "100%", overflow: "visible" }}>
                    <use href="#svg1378496346_348" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Cursor Chip: New Delhi NCR */}
            <div className="framer-1m00fsl hidden-7h10me" data-border="true" data-framer-name="New Delhi NCR" style={{ opacity: "1", transform: "translate(-50%, -50%) rotate(-15deg)" }}>
              <div data-framer-component-type="SVG" data-framer-name="Cursor" parentsize="0" _constraints="[object Object]" rotation="0" shadows="" className="framer-1u3kovf" aria-hidden="true" style={{ imageRendering: "pixelated", flexShrink: "0" }}>
                <div className="svgContainer" style={{ width: "100%", height: "100%", aspectRatio: "inherit" }}>
                  <svg style={{ width: "100%", height: "100%", overflow: "visible" }}>
                    <use href="#svg-241345994_348" />
                  </svg>
                </div>
              </div>
              <div className="framer-yvptgo" data-framer-component-type="RichTextContainer" style={{ transform: "none" }}>
                <p className="framer-text framer-styles-preset-1833qg6" data-styles-preset="jB2nPzqr7" dir="auto" style={{ "--framer-text-color": "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))" }}>
                  {"New Delhi NCR"}
                </p>
              </div>
              <div className="framer-1oacudz-container">
                <Suspense fallback={null}>
                  <div style={{ width: "0px", height: "0px" }} />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
