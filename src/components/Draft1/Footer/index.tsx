import React, { Suspense } from "react";

export interface FooterProps {
  className?: string;
  name?: string;
  role?: string;
  headline?: string;
  copy?: string;
}

/**
 * Draft 1 Footer Component
 * Preserves the exact Nudge Framer design language, DOM hierarchy, animations, ticker, and responsive variants.
 * Converted for Yug's portfolio.
 */
export default function Footer({
  className = "",
  name = "Yug",
  role = "UI/UX Designer · Product Designer",
  headline = "Let's Talk",
  copy = "Have a product, website, SaaS, or digital experience that needs thoughtful UX and UI? Let's talk.",
}: FooterProps) {
  const headlineWords = headline.split(" ");

  return (
    <footer className={`framer-juqzm draft1-footer ${className}`} data-framer-name="CTA">
      <div className="framer-1i9p4au" data-framer-name="Contain">
        {/* Heading & Intro Section */}
        <div className="framer-1arg1x" data-framer-name="Heading">
          <div className="framer-asrmxz" data-framer-name="Img">
            <Suspense fallback={null}>
              <div className="framer-r2x21" data-framer-name="Rotate">
                <div className="framer-rlx4yx" data-framer-cursor="11fq7c3" data-framer-name="ICON" style={{ opacity: "1", transform: "none" }}>
                  <div className="framer-18lov11-container" data-code-component-plugin-id="84d4c1" style={{ transform: "translate(-50%, -50%) rotate(5deg)" }}>
                    <Suspense fallback={null}>
                      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                        <svg stroke="var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))" width="100%" height="100%" viewBox="0 0 200 200" fill="var(--token-5572d352-4df4-4ec3-ad7e-a66a084483f0, rgb(46, 182, 125))" xmlns="http://www.w3.org/2000/svg">
                          <path d="M99.9995 168.564C29.6713 227.335 -27.3348 170.329 31.4359 100C-27.3348 29.6718 29.6713 -27.3343 99.9995 31.4363C170.314 -27.3343 227.334 29.6718 168.563 100C227.334 170.275 170.314 227.335 99.9995 168.564Z" fill="var(--token-5572d352-4df4-4ec3-ad7e-a66a084483f0, rgb(46, 182, 125))" />
                        </svg>
                      </div>
                    </Suspense>
                  </div>
                  <Suspense fallback={null}>
                    <div className="framer-14ljxoe" style={{ transformOrigin: "center", transform: "translate(-50%, -50%)" }}>
                      <div className="framer-1ardh93" style={{ transform: "translate(-50%, -50%)" }} />
                      <div className="framer-1a9g2y" style={{ transform: "translate(-50%, -50%)" }} />
                    </div>
                  </Suspense>
                </div>
              </div>
            </Suspense>
          </div>
          <div className="framer-1fl8711" data-framer-name="Text">
            <div className="framer-7nz22a" data-framer-component-type="RichTextContainer" style={{ transform: "none" }}>
              <h2 className="framer-text framer-styles-preset-k31no2" data-styles-preset="to1tng0Qo" dir="auto" style={{ "--framer-text-color": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))" }}>
                {headlineWords.map((word, wIdx) => (
                  <React.Fragment key={wIdx}>
                    <span style={{ whiteSpace: "nowrap" }}>
                      {word.split("").map((letter, lIdx) => (
                        <span key={lIdx} style={{ display: "inline-block" }}>
                          {letter}
                        </span>
                      ))}
                    </span>
                    {wIdx < headlineWords.length - 1 ? " " : ""}
                  </React.Fragment>
                ))}
              </h2>
            </div>
            <div className="framer-1xqu2yd" data-framer-component-type="RichTextContainer" style={{ transform: "none" }}>
              <p className="framer-text framer-styles-preset-163ovsm" data-styles-preset="ptQSvPZIk" dir="auto" style={{ "--framer-text-alignment": "left", "--framer-text-color": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))" }}>
                {copy}
              </p>
            </div>
          </div>
        </div>
        {/* Large Interactive CTA Card */}
        <div className="framer-4s0jc9" data-framer-name="CTA">
          <div className="framer-fbqfrp" data-framer-name="CTA" style={{ backgroundColor: "#45231c", position: "relative", overflow: "visible" }}>
            <div className="framer-19jj8vj" data-framer-name="CTA Content">
              <div className="framer-1eu8vtl-container" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, overflow: "hidden", borderRadius: "32px", pointerEvents: "none" }}>
                <svg width="100%" height="100%" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
                  <defs>
                    <pattern id="contact-stripes-pattern" patternUnits="userSpaceOnUse" width="120" height="120" patternTransform="rotate(45)">
                      <rect width="60" height="120" fill="#e5a93c" />
                      <rect x="60" width="60" height="120" fill="#45231c" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#contact-stripes-pattern)" />
                </svg>
              </div>

              {/* Desktop CTA Button */}
              <Suspense fallback={null}>
                <div className="ssr-variant hidden-vb5p67">
                  <div className="framer-1hkwp2h-container" style={{ willChange: "transform", opacity: "1", transform: "translate(-50%, -50%) rotate(-10deg)" }}>
                    <div className="ssr-variant hidden-17tolvd">
                      <Suspense fallback={null}>
                        <a className="framer-X0qTJ framer-pDysL framer-k30lmw framer-v-k30lmw framer-6j6mvk" data-framer-name="Desktop" data-highlight="true" href="./contact">
                          <div className="framer-wt6zbe" data-border="true" data-framer-name="Fill Color" style={{ "--border-bottom-width": "3px", "--border-color": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))", "--border-left-width": "3px", "--border-right-width": "3px", "--border-style": "solid", "--border-top-width": "3px", backgroundColor: "var(--token-1892785e-8581-4826-b411-015017430ad3, rgb(0, 94, 217))" }} />
                          <div className="framer-f8h0d1" data-border="true" data-framer-name="Dot" style={{ "--border-bottom-width": "1px", "--border-color": "rgb(34, 34, 34)", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", backgroundColor: "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))", opacity: "0" }} />
                          <div className="framer-n2dh3i" data-border="true" data-framer-name="Dot" style={{ "--border-bottom-width": "1px", "--border-color": "rgb(34, 34, 34)", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", backgroundColor: "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))", opacity: "0" }} />
                          <div className="framer-ucocdx" data-border="true" data-framer-name="Dot" style={{ "--border-bottom-width": "1px", "--border-color": "rgb(34, 34, 34)", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", backgroundColor: "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))", opacity: "0" }} />
                          <div className="framer-18r1m1s" data-border="true" data-framer-name="Dot" style={{ "--border-bottom-width": "1px", "--border-color": "rgb(34, 34, 34)", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", backgroundColor: "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))", opacity: "0" }} />
                          <div className="framer-w1nxt7" data-framer-name="ICON">
                            <div className="framer-jn4guk" data-border="true" data-framer-name="Icon" style={{ "--border-bottom-width": "2px", "--border-color": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))", "--border-left-width": "2px", "--border-right-width": "2px", "--border-style": "solid", "--border-top-width": "2px", backgroundColor: "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))" }}>
                              <div className="framer-10vk680" data-framer-name="Pattern" style={{ opacity: "1", transform: "translate(-50%, -50%)" }}>
                                <div className="framer-15e3fym" style={{ backgroundColor: "var(--token-e22e0fe6-83a6-4381-a625-c6f173619c49, rgb(224, 30, 90))", transform: "translate(-50%, -50%) rotate(45deg)" }} />
                                <div className="framer-qcrqyc" style={{ backgroundColor: "var(--token-e22e0fe6-83a6-4381-a625-c6f173619c49, rgb(224, 30, 90))", transform: "translate(-50%, -50%) rotate(45deg)" }} />
                                <div className="framer-r77rjk" style={{ backgroundColor: "var(--token-e22e0fe6-83a6-4381-a625-c6f173619c49, rgb(224, 30, 90))", transform: "translate(-50%, -50%) rotate(45deg)" }} />
                                <div className="framer-1ml90n7" style={{ backgroundColor: "var(--token-e22e0fe6-83a6-4381-a625-c6f173619c49, rgb(224, 30, 90))", transform: "translate(-50%, -50%) rotate(45deg)" }} />
                              </div>
                              <div className="framer-1ux9orq" data-framer-name="Icon" style={{ transform: "translate(-50%, -50%)" }}>
                                <div className="framer-33uss9-container" data-code-component-plugin-id="84d4c1" style={{ opacity: "1", transform: "none" }}>
                                  <Suspense fallback={null}>
                                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                                      <svg width="100%" height="100%" viewBox="0 0 200 200" fill="var(--token-29f9695a-09e2-4c55-ace7-e9873233e207, rgb(236, 178, 46))" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M4.37114e-06 2.76541e-06L7.54022e-06 50L100 100L2.18557e-06 150L0 200L100 150V200L200 150V100V50L100 0V50L4.37114e-06 2.76541e-06ZM100 50V100V150L200 100L100 50Z" fill="var(--token-29f9695a-09e2-4c55-ace7-e9873233e207, rgb(236, 178, 46))" />
                                      </svg>
                                    </div>
                                  </Suspense>
                                </div>
                                <div className="framer-3s775y-container" data-code-component-plugin-id="84d4c1" style={{ opacity: "1", transform: "none" }}>
                                  <Suspense fallback={null}>
                                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                                      <svg width="100%" height="100%" viewBox="0 0 200 200" fill="var(--token-29f9695a-09e2-4c55-ace7-e9873233e207, rgb(236, 178, 46))" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M4.37114e-06 2.76541e-06L7.54022e-06 50L100 100L2.18557e-06 150L0 200L100 150V200L200 150V100V50L100 0V50L4.37114e-06 2.76541e-06ZM100 50V100V150L200 100L100 50Z" fill="var(--token-29f9695a-09e2-4c55-ace7-e9873233e207, rgb(236, 178, 46))" />
                                      </svg>
                                    </div>
                                  </Suspense>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="framer-1aqdnhb" data-framer-component-type="RichTextContainer" style={{ "--extracted-1of0zx5": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                            <h2 className="framer-text framer-styles-preset-k31no2" data-styles-preset="to1tng0Qo" dir="auto" style={{ "--framer-text-color": "var(--extracted-1of0zx5, var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18)))" }}>
                              {"Contact"}
                            </h2>
                          </div>
                          <div className="framer-193okg8" data-framer-name="ICON">
                            <div className="framer-103ms2q" data-border="true" data-framer-name="Icon" style={{ "--border-bottom-width": "2px", "--border-color": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))", "--border-left-width": "2px", "--border-right-width": "2px", "--border-style": "solid", "--border-top-width": "2px", backgroundColor: "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))" }}>
                              <div className="framer-by61wx" data-framer-name="Pattern" style={{ opacity: "1", transform: "translate(-50%, -50%)" }}>
                                <div className="framer-1j9zgno" style={{ backgroundColor: "var(--token-e22e0fe6-83a6-4381-a625-c6f173619c49, rgb(224, 30, 90))", transform: "translate(-50%, -50%) rotate(45deg)" }} />
                                <div className="framer-14figy6" style={{ backgroundColor: "var(--token-e22e0fe6-83a6-4381-a625-c6f173619c49, rgb(224, 30, 90))", transform: "translate(-50%, -50%) rotate(45deg)" }} />
                                <div className="framer-1mpqecq" style={{ backgroundColor: "var(--token-e22e0fe6-83a6-4381-a625-c6f173619c49, rgb(224, 30, 90))", transform: "translate(-50%, -50%) rotate(45deg)" }} />
                                <div className="framer-1tct7va" style={{ backgroundColor: "var(--token-e22e0fe6-83a6-4381-a625-c6f173619c49, rgb(224, 30, 90))", transform: "translate(-50%, -50%) rotate(45deg)" }} />
                              </div>
                              <div className="framer-1tsymnu" data-framer-name="Icon" style={{ transform: "translate(-50%, -50%)" }}>
                                <div className="framer-x88sjj-container" data-code-component-plugin-id="84d4c1" style={{ opacity: "1", transform: "none" }}>
                                  <Suspense fallback={null}>
                                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                                      <svg width="100%" height="100%" viewBox="0 0 200 200" fill="var(--token-29f9695a-09e2-4c55-ace7-e9873233e207, rgb(236, 178, 46))" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M4.37114e-06 2.76541e-06L7.54022e-06 50L100 100L2.18557e-06 150L0 200L100 150V200L200 150V100V50L100 0V50L4.37114e-06 2.76541e-06ZM100 50V100V150L200 100L100 50Z" fill="var(--token-29f9695a-09e2-4c55-ace7-e9873233e207, rgb(236, 178, 46))" />
                                      </svg>
                                    </div>
                                  </Suspense>
                                </div>
                                <div className="framer-i24ld9-container" data-code-component-plugin-id="84d4c1" style={{ opacity: "1", transform: "none" }}>
                                  <Suspense fallback={null}>
                                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                                      <svg width="100%" height="100%" viewBox="0 0 200 200" fill="var(--token-29f9695a-09e2-4c55-ace7-e9873233e207, rgb(236, 178, 46))" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M4.37114e-06 2.76541e-06L7.54022e-06 50L100 100L2.18557e-06 150L0 200L100 150V200L200 150V100V50L100 0V50L4.37114e-06 2.76541e-06ZM100 50V100V150L200 100L100 50Z" fill="var(--token-29f9695a-09e2-4c55-ace7-e9873233e207, rgb(236, 178, 46))" />
                                      </svg>
                                    </div>
                                  </Suspense>
                                </div>
                              </div>
                            </div>
                          </div>
                        </a>
                      </Suspense>
                    </div>
                    {/* Tablet CTA Button */}
                    <div className="ssr-variant hidden-7f13km">
                      <Suspense fallback={null}>
                        <a className="framer-X0qTJ framer-pDysL framer-k30lmw framer-v-16au33k framer-6j6mvk" data-framer-name="Tablet" data-highlight="true" href="./contact">
                          <div className="framer-wt6zbe" data-border="true" data-framer-name="Fill Color" style={{ "--border-bottom-width": "3px", "--border-color": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))", "--border-left-width": "3px", "--border-right-width": "3px", "--border-style": "solid", "--border-top-width": "3px", backgroundColor: "var(--token-1892785e-8581-4826-b411-015017430ad3, rgb(0, 94, 217))" }} />
                          <div className="framer-f8h0d1" data-border="true" data-framer-name="Dot" style={{ "--border-bottom-width": "1px", "--border-color": "rgb(34, 34, 34)", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", backgroundColor: "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))", opacity: "0" }} />
                          <div className="framer-n2dh3i" data-border="true" data-framer-name="Dot" style={{ "--border-bottom-width": "1px", "--border-color": "rgb(34, 34, 34)", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", backgroundColor: "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))", opacity: "0" }} />
                          <div className="framer-ucocdx" data-border="true" data-framer-name="Dot" style={{ "--border-bottom-width": "1px", "--border-color": "rgb(34, 34, 34)", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", backgroundColor: "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))", opacity: "0" }} />
                          <div className="framer-18r1m1s" data-border="true" data-framer-name="Dot" style={{ "--border-bottom-width": "1px", "--border-color": "rgb(34, 34, 34)", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", backgroundColor: "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))", opacity: "0" }} />
                          <div className="framer-w1nxt7" data-framer-name="ICON">
                            <div className="framer-jn4guk" data-border="true" data-framer-name="Icon" style={{ "--border-bottom-width": "2px", "--border-color": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))", "--border-left-width": "2px", "--border-right-width": "2px", "--border-style": "solid", "--border-top-width": "2px", backgroundColor: "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))" }}>
                              <div className="framer-10vk680" data-framer-name="Pattern" style={{ opacity: "1", transform: "translate(-50%, -50%)" }}>
                                <div className="framer-15e3fym" style={{ backgroundColor: "var(--token-e22e0fe6-83a6-4381-a625-c6f173619c49, rgb(224, 30, 90))", transform: "translate(-50%, -50%) rotate(45deg)" }} />
                                <div className="framer-qcrqyc" style={{ backgroundColor: "var(--token-e22e0fe6-83a6-4381-a625-c6f173619c49, rgb(224, 30, 90))", transform: "translate(-50%, -50%) rotate(45deg)" }} />
                                <div className="framer-r77rjk" style={{ backgroundColor: "var(--token-e22e0fe6-83a6-4381-a625-c6f173619c49, rgb(224, 30, 90))", transform: "translate(-50%, -50%) rotate(45deg)" }} />
                                <div className="framer-1ml90n7" style={{ backgroundColor: "var(--token-e22e0fe6-83a6-4381-a625-c6f173619c49, rgb(224, 30, 90))", transform: "translate(-50%, -50%) rotate(45deg)" }} />
                              </div>
                              <div className="framer-1ux9orq" data-framer-name="Icon" style={{ transform: "translate(-50%, -50%)" }}>
                                <div className="framer-33uss9-container" data-code-component-plugin-id="84d4c1" style={{ opacity: "1", transform: "none" }}>
                                  <Suspense fallback={null}>
                                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                                      <svg width="100%" height="100%" viewBox="0 0 200 200" fill="var(--token-29f9695a-09e2-4c55-ace7-e9873233e207, rgb(236, 178, 46))" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M4.37114e-06 2.76541e-06L7.54022e-06 50L100 100L2.18557e-06 150L0 200L100 150V200L200 150V100V50L100 0V50L4.37114e-06 2.76541e-06ZM100 50V100V150L200 100L100 50Z" fill="var(--token-29f9695a-09e2-4c55-ace7-e9873233e207, rgb(236, 178, 46))" />
                                      </svg>
                                    </div>
                                  </Suspense>
                                </div>
                                <div className="framer-3s775y-container" data-code-component-plugin-id="84d4c1" style={{ opacity: "1", transform: "none" }}>
                                  <Suspense fallback={null}>
                                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                                      <svg width="100%" height="100%" viewBox="0 0 200 200" fill="var(--token-29f9695a-09e2-4c55-ace7-e9873233e207, rgb(236, 178, 46))" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M4.37114e-06 2.76541e-06L7.54022e-06 50L100 100L2.18557e-06 150L0 200L100 150V200L200 150V100V50L100 0V50L4.37114e-06 2.76541e-06ZM100 50V100V150L200 100L100 50Z" fill="var(--token-29f9695a-09e2-4c55-ace7-e9873233e207, rgb(236, 178, 46))" />
                                      </svg>
                                    </div>
                                  </Suspense>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="framer-1aqdnhb" data-framer-component-type="RichTextContainer" style={{ "--extracted-1of0zx5": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                            <h2 className="framer-text framer-styles-preset-k31no2" data-styles-preset="to1tng0Qo" dir="auto" style={{ "--framer-text-color": "var(--extracted-1of0zx5, var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18)))" }}>
                              {"Contact"}
                            </h2>
                          </div>
                          <div className="framer-193okg8" data-framer-name="ICON">
                            <div className="framer-103ms2q" data-border="true" data-framer-name="Icon" style={{ "--border-bottom-width": "2px", "--border-color": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))", "--border-left-width": "2px", "--border-right-width": "2px", "--border-style": "solid", "--border-top-width": "2px", backgroundColor: "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))" }}>
                              <div className="framer-by61wx" data-framer-name="Pattern" style={{ opacity: "1", transform: "translate(-50%, -50%)" }}>
                                <div className="framer-1j9zgno" style={{ backgroundColor: "var(--token-e22e0fe6-83a6-4381-a625-c6f173619c49, rgb(224, 30, 90))", transform: "translate(-50%, -50%) rotate(45deg)" }} />
                                <div className="framer-14figy6" style={{ backgroundColor: "var(--token-e22e0fe6-83a6-4381-a625-c6f173619c49, rgb(224, 30, 90))", transform: "translate(-50%, -50%) rotate(45deg)" }} />
                                <div className="framer-1mpqecq" style={{ backgroundColor: "var(--token-e22e0fe6-83a6-4381-a625-c6f173619c49, rgb(224, 30, 90))", transform: "translate(-50%, -50%) rotate(45deg)" }} />
                                <div className="framer-1tct7va" style={{ backgroundColor: "var(--token-e22e0fe6-83a6-4381-a625-c6f173619c49, rgb(224, 30, 90))", transform: "translate(-50%, -50%) rotate(45deg)" }} />
                              </div>
                              <div className="framer-1tsymnu" data-framer-name="Icon" style={{ transform: "translate(-50%, -50%)" }}>
                                <div className="framer-x88sjj-container" data-code-component-plugin-id="84d4c1" style={{ opacity: "1", transform: "none" }}>
                                  <Suspense fallback={null}>
                                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                                      <svg width="100%" height="100%" viewBox="0 0 200 200" fill="var(--token-29f9695a-09e2-4c55-ace7-e9873233e207, rgb(236, 178, 46))" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M4.37114e-06 2.76541e-06L7.54022e-06 50L100 100L2.18557e-06 150L0 200L100 150V200L200 150V100V50L100 0V50L4.37114e-06 2.76541e-06ZM100 50V100V150L200 100L100 50Z" fill="var(--token-29f9695a-09e2-4c55-ace7-e9873233e207, rgb(236, 178, 46))" />
                                      </svg>
                                    </div>
                                  </Suspense>
                                </div>
                                <div className="framer-i24ld9-container" data-code-component-plugin-id="84d4c1" style={{ opacity: "1", transform: "none" }}>
                                  <Suspense fallback={null}>
                                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                                      <svg width="100%" height="100%" viewBox="0 0 200 200" fill="var(--token-29f9695a-09e2-4c55-ace7-e9873233e207, rgb(236, 178, 46))" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M4.37114e-06 2.76541e-06L7.54022e-06 50L100 100L2.18557e-06 150L0 200L100 150V200L200 150V100V50L100 0V50L4.37114e-06 2.76541e-06ZM100 50V100V150L200 100L100 50Z" fill="var(--token-29f9695a-09e2-4c55-ace7-e9873233e207, rgb(236, 178, 46))" />
                                      </svg>
                                    </div>
                                  </Suspense>
                                </div>
                              </div>
                            </div>
                          </div>
                        </a>
                      </Suspense>
                    </div>
                  </div>
                </div>

                {/* Mobile CTA Button */}
                <div className="ssr-variant hidden-7f13km hidden-17tolvd">
                  <div className="framer-1hkwp2h-container" style={{ willChange: "transform", opacity: "1", transform: "translate(-50%, -50%) rotate(-10deg)" }}>
                    <Suspense fallback={null}>
                      <a className="framer-X0qTJ framer-pDysL framer-k30lmw framer-v-9pudpy framer-6j6mvk" data-framer-name="Mobile" data-highlight="true" href="./contact">
                        <div className="framer-wt6zbe" data-border="true" data-framer-name="Fill Color" style={{ "--border-bottom-width": "3px", "--border-color": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))", "--border-left-width": "3px", "--border-right-width": "3px", "--border-style": "solid", "--border-top-width": "3px", backgroundColor: "var(--token-1892785e-8581-4826-b411-015017430ad3, rgb(0, 94, 217))" }} />
                        <div className="framer-f8h0d1" data-border="true" data-framer-name="Dot" style={{ "--border-bottom-width": "1px", "--border-color": "rgb(34, 34, 34)", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", backgroundColor: "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))", opacity: "0" }} />
                        <div className="framer-n2dh3i" data-border="true" data-framer-name="Dot" style={{ "--border-bottom-width": "1px", "--border-color": "rgb(34, 34, 34)", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", backgroundColor: "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))", opacity: "0" }} />
                        <div className="framer-ucocdx" data-border="true" data-framer-name="Dot" style={{ "--border-bottom-width": "1px", "--border-color": "rgb(34, 34, 34)", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", backgroundColor: "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))", opacity: "0" }} />
                        <div className="framer-18r1m1s" data-border="true" data-framer-name="Dot" style={{ "--border-bottom-width": "1px", "--border-color": "rgb(34, 34, 34)", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "solid", "--border-top-width": "1px", backgroundColor: "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))", opacity: "0" }} />
                        <div className="framer-1aqdnhb" data-framer-component-type="RichTextContainer" style={{ "--extracted-1of0zx5": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                          <h2 className="framer-text framer-styles-preset-k31no2" data-styles-preset="to1tng0Qo" dir="auto" style={{ "--framer-text-color": "var(--extracted-1of0zx5, var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18)))" }}>
                            {"Contact"}
                          </h2>
                        </div>
                      </a>
                    </Suspense>
                  </div>
                </div>
              </Suspense>
            </div>

            {/* Comment Card / Identity Badge */}
            <div className="framer-esbcc0" data-framer-name="Comment" style={{ willChange: "transform", opacity: "1", transform: "none", zIndex: 2 }}>
              <div className="framer-1n3mzrv" data-framer-component-type="RichTextContainer" style={{ transform: "none" }}>
                <p className="framer-text framer-styles-preset-163ovsm" data-styles-preset="ptQSvPZIk" dir="auto" style={{ "--framer-text-color": "var(--token-94d217a4-b19e-496f-a9f0-41c83f611b07, rgb(118, 119, 119))", fontSize: "12px", margin: "0 0 8px 0" }}>
                  {"Comment"}
                </p>
              </div>
              <div className="framer-v9ox4y" />
              <div className="framer-1dlc9z6" data-framer-name="Content" style={{ display: "flex", gap: "12px", alignItems: "flex-start", marginTop: "10px" }}>
                <div className="framer-1k7u3id" style={{ width: "36px", height: "36px", borderRadius: "50%", flexShrink: 0, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", borderRadius: "inherit", top: 0, right: 0, bottom: 0, left: 0 }} data-framer-background-image-wrapper="true">
                    <img decoding="async" loading="lazy" width="432" height="487" src="/assets/img/ae83aba71780ab07.webp" alt="Yug" style={{ display: "block", width: "100%", height: "100%", borderRadius: "inherit", objectPosition: "center", objectFit: "cover" }} />
                  </div>
                </div>
                <div className="framer-1xihdmg" data-framer-name="Text + Icon" style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <div className="framer-1s3tqzb" data-framer-name="Text" style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <p className="framer-text" style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))" }}>
                      {"Yug"}
                    </p>
                    <p className="framer-text framer-styles-preset-163ovsm" style={{ margin: 0, fontSize: "12px", lineHeight: "1.4", color: "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))" }}>
                      {"Open to contract work, full-time roles, and interesting conversations about weird design problems."}
                    </p>
                  </div>
                  <div style={{ marginTop: "4px" }}>
                    <div className="framer-1ppqlg2" data-border="true" data-framer-name="React" style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "#e0f2fe", border: "1.5px solid #0284c7", borderRadius: "4px", padding: "2px 8px" }}>
                      <span style={{ fontSize: "12px" }}>👍</span>
                      <span style={{ fontSize: "12px", fontWeight: 700, color: "#0284c7" }}>1</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Ticker / Ruler */}
      <div className="framer-xso6nc-container">
        <Suspense fallback={null}>
          <div style={{ width: "100%", height: "40px", overflow: "hidden", borderBottom: "1px solid rgba(0,0,0,0.2)", display: "flex", alignItems: "flex-start" }}>
            <div style={{ display: "flex", alignItems: "flex-start", willChange: "transform" }} />
          </div>
        </Suspense>
      </div>
    </footer>
  );
}
