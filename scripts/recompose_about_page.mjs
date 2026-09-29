import fs from 'node:fs';

// 1. Recompose src/sections/about/AllContent.tsx
const allContentCode = `import React, { Suspense } from "react";

/** Generated from the Framer section "All content".
 *  Renders to the same DOM as the original — the Suspense boundaries here are
 *  Framer's hydration markers, so removing them would break its runtime.
 *  Everything else is ordinary JSX: edit it like any other component. */
export default function AllContent() {
  return (
    <div className="framer-1akwkpq" data-framer-name="All content">
      <div className="framer-3w7je1-container">
        <Suspense fallback={null}>
          <div style={{ width: "100%", height: "40px", overflow: "hidden", borderBottom: "1px solid rgba(0,0,0,0.2)", display: "flex", alignItems: "flex-start" }}>
            <div style={{ display: "flex", alignItems: "flex-start", willChange: "transform" }} />
          </div>
        </Suspense>
      </div>
      <div className="framer-1hsbhf7" data-framer-name="Content">
        <div className="framer-1u3qm76" data-framer-name="Contain">
          <div className="framer-1ukjnmv" data-framer-name="Contain Nav sticky">
            <div className="framer-qu7yco" data-framer-name="List">
              <div className="framer-rmz83s" data-framer-name="Nav Sticky">
                <Suspense fallback={null}>
                  <div className="ssr-variant">
                    <div className="framer-6rgt2z-container">
                      <Suspense fallback={null}>
                        <a className="framer-891Ch framer-NkuHG framer-1m3kj3m framer-v-1m3kj3m framer-t8qzwo" data-framer-name="Active" href="./about#mainbio" style={{ backgroundColor: "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))", width: "100%", borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px", borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}>
                          <div className="framer-7vz0jb" data-framer-name="Icon">
                            <div className="framer-sn5788-container" data-code-component-plugin-id="84d4c1">
                              <Suspense fallback={null}>
                                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                                  <svg width="100%" height="100%" viewBox="0 0 200 200" fill="var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M18.4294 66.2123C15.6458 53.315 19.2658 39.3128 29.2893 29.2893C39.3129 19.2658 53.315 15.6458 66.2123 18.4293C73.3638 7.34131 85.8246 0 100 0C114.175 0 126.636 7.34133 133.788 18.4294C146.685 15.6458 160.687 19.2658 170.711 29.2893C180.734 39.3129 184.354 53.315 181.571 66.2123C192.659 73.3638 200 85.8246 200 100C200 114.175 192.659 126.636 181.571 133.788C184.354 146.685 180.734 160.687 170.711 170.711C160.687 180.734 146.685 184.354 133.788 181.571C126.636 192.659 114.175 200 100 200C85.8246 200 73.3639 192.659 66.2123 181.571C53.315 184.354 39.3129 180.734 29.2893 170.711C19.2658 160.687 15.6458 146.685 18.4294 133.788C7.34132 126.636 0 114.175 0 100C0 85.8246 7.34132 73.3638 18.4294 66.2123ZM71.4555 128.495C87.1454 144.184 112.584 144.184 128.274 128.495C143.964 112.805 143.964 87.3662 128.274 71.6762C112.584 55.9863 87.1454 55.9863 71.4555 71.6762C55.7656 87.3662 55.7656 112.805 71.4555 128.495Z" fill="var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))" />
                                  </svg>
                                </div>
                              </Suspense>
                            </div>
                          </div>
                          <div className="framer-1ucsmrf" data-framer-component-type="RichTextContainer" style={{ "--extracted-r6o4lv": "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                            <p className="framer-text framer-styles-preset-27ku3y" data-styles-preset="MffBJovlA" dir="auto" style={{ "--framer-text-color": "var(--extracted-r6o4lv, var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255)))" }}>
                              {"Bio"}
                            </p>
                          </div>
                        </a>
                      </Suspense>
                    </div>
                  </div>
                </Suspense>
                <Suspense fallback={null}>
                  <div className="ssr-variant">
                    <div className="framer-1pd4qj9-container">
                      <Suspense fallback={null}>
                        <a className="framer-891Ch framer-NkuHG framer-1m3kj3m framer-v-2tyaa4 framer-t8qzwo" data-framer-name="Inactive" href="./about#my-story" style={{ backgroundColor: "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))", width: "100%", borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px", borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}>
                          <div className="framer-7vz0jb" data-framer-name="Icon">
                            <div className="framer-sn5788-container" data-code-component-plugin-id="84d4c1">
                              <Suspense fallback={null}>
                                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                                  <svg width="100%" height="100%" viewBox="0 0 200 200" fill="var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M100 22C100 9.84974 90.1503 0 78 0H22C9.84974 0 0 9.84972 0 22V78.7194C0 90.8697 9.84974 100.719 22 100.719H78C90.1503 100.719 100 110.569 100 122.719V178C100 190.15 109.85 200 122 200H178C190.15 200 200 190.15 200 178V121.28C200 109.13 190.15 99.2805 178 99.2805H122C109.85 99.2805 100 89.4308 100 77.2805V22Z" fill="var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))" />
                                  </svg>
                                </div>
                              </Suspense>
                            </div>
                          </div>
                          <div className="framer-1ucsmrf" data-framer-component-type="RichTextContainer" style={{ "--extracted-r6o4lv": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                            <p className="framer-text framer-styles-preset-27ku3y" data-styles-preset="MffBJovlA" dir="auto" style={{ "--framer-text-color": "var(--extracted-r6o4lv, var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18)))" }}>
                              {"Story"}
                            </p>
                          </div>
                        </a>
                      </Suspense>
                    </div>
                  </div>
                </Suspense>
                <Suspense fallback={null}>
                  <div className="ssr-variant">
                    <div className="framer-1q98y8i-container">
                      <Suspense fallback={null}>
                        <a className="framer-891Ch framer-NkuHG framer-1m3kj3m framer-v-2tyaa4 framer-t8qzwo" data-framer-name="Inactive" href="./about#work" style={{ backgroundColor: "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))", width: "100%", borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px", borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}>
                          <div className="framer-7vz0jb" data-framer-name="Icon">
                            <div className="framer-sn5788-container" data-code-component-plugin-id="84d4c1">
                              <Suspense fallback={null}>
                                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                                  <svg width="100%" height="100%" viewBox="0 0 200 200" fill="var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M0 100L7.62939e-06 0H100H200V100C144.78 100 100.013 55.2417 100 0.0239258C99.987 55.2417 55.2204 100 0 100ZM100 200C100 144.771 144.772 100 200 100V200H100ZM100 200C100 144.771 55.2285 100 0 100V200H100Z" fill="var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))" />
                                  </svg>
                                </div>
                              </Suspense>
                            </div>
                          </div>
                          <div className="framer-1ucsmrf" data-framer-component-type="RichTextContainer" style={{ "--extracted-r6o4lv": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                            <p className="framer-text framer-styles-preset-27ku3y" data-styles-preset="MffBJovlA" dir="auto" style={{ "--framer-text-color": "var(--extracted-r6o4lv, var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18)))" }}>
                              {"Work"}
                            </p>
                          </div>
                        </a>
                      </Suspense>
                    </div>
                  </div>
                </Suspense>
                <Suspense fallback={null}>
                  <div className="ssr-variant">
                    <div className="framer-1q98y8i-container">
                      <Suspense fallback={null}>
                        <a className="framer-891Ch framer-NkuHG framer-1m3kj3m framer-v-2tyaa4 framer-t8qzwo" data-framer-name="Inactive" href="./about#awards" style={{ backgroundColor: "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))", width: "100%", borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px", borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}>
                          <div className="framer-7vz0jb" data-framer-name="Icon">
                            <div className="framer-sn5788-container" data-code-component-plugin-id="84d4c1">
                              <Suspense fallback={null}>
                                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                                  <svg width="100%" height="100%" viewBox="0 0 200 200" fill="var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M40 30H160V85C160 118.137 133.137 145 100 145C66.8629 145 40 118.137 40 85V30ZM20 45C20 40.5817 23.5817 37 28 37H40V78H28C23.5817 78 20 74.4183 20 70V45ZM160 78H172C176.418 78 180 74.4183 180 70V45C180 40.5817 176.418 37 172 37H160V78ZM88 147V168H60C55.5817 168 52 171.582 52 176C52 180.418 55.5817 184 60 184H140C144.418 184 148 180.418 148 176C148 171.582 144.418 168 140 168H112V147C108.064 147.66 104.072 148 100 148C95.928 148 91.936 147.66 88 147Z" fill="var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))" />
                                  </svg>
                                </div>
                              </Suspense>
                            </div>
                          </div>
                          <div className="framer-1ucsmrf" data-framer-component-type="RichTextContainer" style={{ "--extracted-r6o4lv": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                            <p className="framer-text framer-styles-preset-27ku3y" data-styles-preset="MffBJovlA" dir="auto" style={{ "--framer-text-color": "var(--extracted-r6o4lv, var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18)))" }}>
                              {"Awards"}
                            </p>
                          </div>
                        </a>
                      </Suspense>
                    </div>
                  </div>
                </Suspense>
              </div>
            </div>
          </div>
          <div className="framer-94tkti" data-framer-name="Content">
            <div className="framer-1pltn3m" data-framer-name="Heading">
              <div className="framer-n5931f" data-framer-component-type="RichTextContainer" style={{ transform: "none" }}>
                <h1 className="framer-text framer-styles-preset-4nri6j" data-styles-preset="Iep6i79Kc" dir="auto" style={{ "--framer-text-color": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))" }}>
                  {"About"}
                </h1>
              </div>
            </div>
            <div className="framer-me803a" data-framer-name="List Content">
              <section className="framer-1q34n9d" data-framer-name="Bio " id="mainbio">
                <div className="framer-13tnzw6" data-framer-name="Tag">
                  <div className="framer-1m4k8ak" data-framer-name="Text">
                    <div className="framer-n067kb" data-framer-component-type="RichTextContainer" style={{ transform: "none" }}>
                      <h2 className="framer-text framer-styles-preset-27ku3y" data-styles-preset="MffBJovlA" dir="auto" style={{ "--framer-text-color": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))" }}>
                        {"Main bio"}
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="framer-1y1mzru" data-border="true" data-framer-name="Bio">
                  <div className="framer-154vkhg" data-framer-name="Border">
                    <div className="framer-7saf92" data-border="true" data-framer-name="Rectangle" />
                    <div className="framer-ze7fwm" data-border="true" data-framer-name="Rectangle" />
                    <div className="framer-h8548a" data-border="true" data-framer-name="Rectangle" />
                    <div className="framer-1909pth" data-border="true" data-framer-name="Rectangle" />
                  </div>
                  <div className="framer-1vsjwpg-container">
                    <Suspense fallback={null}>
                      <div className="ssr-variant hidden-1hh7fxx hidden-y5t7zo">
                        <div style={{ width: "100%", transform: "translateZ(0)" }}>
                          <p style={{ fontFamily: "\\"Inter Display\\", \\"Inter Display Placeholder\\", sans-serif", fontWeight: "500", fontSize: "40px", lineHeight: "1.1", letterSpacing: "-0.03em", color: "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))", textAlign: "left", margin: "0", padding: "0", display: "block", width: "100%", whiteSpace: "pre-wrap" }}>
                            {"I'm Yug 🧠, a product designer obsessed with the \\"why\\" before the \\"how.\\""}
                          </p>
                        </div>
                      </div>
                      <div className="ssr-variant hidden-1fzvxue hidden-y5t7zo">
                        <div style={{ width: "100%", transform: "translateZ(0)" }}>
                          <p style={{ fontFamily: "\\"Inter Display\\", \\"Inter Display Placeholder\\", sans-serif", fontWeight: "500", fontSize: "28px", lineHeight: "1.1", letterSpacing: "-0.03em", color: "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))", textAlign: "left", margin: "0", padding: "0", display: "block", width: "100%", whiteSpace: "pre-wrap" }}>
                            {"I'm Yug 🧠, a product designer obsessed with the \\"why\\" before the \\"how.\\""}
                          </p>
                        </div>
                      </div>
                      <div className="ssr-variant hidden-1fzvxue hidden-1hh7fxx">
                        <div style={{ width: "100%", transform: "translateZ(0)" }}>
                          <p style={{ fontFamily: "\\"Inter Display\\", \\"Inter Display Placeholder\\", sans-serif", fontWeight: "500", fontSize: "32px", lineHeight: "1.1", letterSpacing: "-0.03em", color: "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))", textAlign: "left", margin: "0", padding: "0", display: "block", width: "100%", whiteSpace: "pre-wrap" }}>
                            {"I'm Yug 🧠, a product designer obsessed with the \\"why\\" before the \\"how.\\""}
                          </p>
                        </div>
                      </div>
                    </Suspense>
                  </div>
                  <div className="framer-1af8o5" data-framer-name="List content">
                    <div className="framer-1lxxv7w" data-framer-component-type="RichTextContainer" style={{ transform: "none" }}>
                      <p className="framer-text framer-styles-preset-163ovsm" data-styles-preset="ptQSvPZIk" dir="auto" style={{ "--framer-text-color": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))" }}>
                        {"I design for SaaS products, e-commerce platforms, and community websites — places where people don't have time to \\"figure it out.\\" My job is to make the path so obvious they never notice the design at all."}
                      </p>
                    </div>
                    <div className="framer-t4ear5" data-framer-component-type="RichTextContainer" style={{ transform: "none" }}>
                      <p className="framer-text framer-styles-preset-163ovsm" data-styles-preset="ptQSvPZIk" dir="auto" style={{ "--framer-text-color": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))" }}>
                        {"I've taken products from a blank page to developer handoff — user flows, wireframes, high-fidelity Figma screens. I've been the founding designer building from zero, and I've worked inside agile sprints with PMs and engineers, turning half-formed feedback into decisions that actually ship."}
                      </p>
                    </div>
                    <div className="framer-2vhojh" data-framer-name="Text + Polaroid">
                      <div className="ssr-variant">
                        <div className="framer-1qahak7-container">
                          <div className="framer-6A3Mg framer-62fp8 framer-SwHTo framer-1sbsau2 framer-v-1gflzdq" data-framer-name="Only Content" style={{ backgroundColor: "var(--token-cd9da077-16e0-46f3-9a80-6bf4c2a79928, rgb(245, 221, 161))", maxWidth: "100%", width: "100%" }}>
                            <div className="framer-lbfqwd" data-framer-component-type="RichTextContainer" style={{ "--extracted-r6o4lv": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                              <p className="framer-text framer-styles-preset-163ovsm" data-styles-preset="ptQSvPZIk" dir="auto" style={{ "--framer-text-color": "var(--extracted-r6o4lv, var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18)))" }}>
                                {"Currently, I'm a UX Analyst at "}
                                <strong className="framer-text">
                                  {"Arkanj Tech Solutions"}
                                </strong>
                                {", owning end-to-end UX for client SaaS products. Before that, I was the founding designer on "}
                                <strong className="framer-text">
                                  {"ArkCV"}
                                </strong>
                                {", an AI resume platform."}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="ssr-variant">
                        <div className="framer-4hsz50-container" draggable="false" style={{ opacity: "1", transform: "rotate(6deg)", WebkitTouchCallout: "none", WebkitUserSelect: "none", userSelect: "none", touchAction: "none" }}>
                          <div className="framer-bPcig framer-EjAzI framer-zl9qtm framer-v-zl9qtm" data-framer-name="Default" style={{ height: "100%", maxWidth: "100%", width: "100%", boxShadow: "0px 0.6021873017743928px 1.8065619053231785px -0.8333333333333333px rgba(0, 0, 0, 0.13), 0px 2.288533303243457px 6.8655999097303715px -1.6666666666666665px rgba(0, 0, 0, 0.13), 0px 10px 30px -2.5px rgba(0, 0, 0, 0.13)" }}>
                            <div className="framer-82wh8q" data-framer-name="Polaroid" style={{ backgroundColor: "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))" }}>
                              <div className="framer-1ywu17f">
                                <div style={{ position: "absolute", borderRadius: "inherit", cornerShape: "inherit", top: "0", right: "0", bottom: "0", left: "0" }} data-framer-background-image-wrapper="true">
                                  <img loading="eager" width="870" height="869" sizes="(min-width: 1200px) calc(100vw - 16px), (max-width: 809.98px) calc(min((min(min(100vw - 32px, 1800px), 800px) - 48px) * 0.56, 200px) - 16px), (min-width: 810px) and (max-width: 1199.98px) calc(100vw - 16px)" srcSet="/assets/img/d15774e64fdfb82a.webp 512w, /assets/img/ae83aba71780ab07.webp 870w" src="/assets/img/ae83aba71780ab07.webp" alt="" style={{ display: "block", width: "100%", height: "100%", borderRadius: "inherit", cornerShape: "inherit", objectPosition: "center", objectFit: "cover" }} fetchPriority="high" />
                                </div>
                              </div>
                            </div>
                            <div className="framer-1a9jrm3" data-framer-name="Polaroid" style={{ backgroundColor: "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))" }}>
                              <div className="framer-1wh2zmo" data-framer-component-type="RichTextContainer" style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                                <h5 className="framer-text framer-styles-preset-1v53mqb" data-styles-preset="qvOJ3gdiv" dir="auto">
                                  {"it's me"}
                                </h5>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="framer-9u3yg7" data-framer-name="Text Box">
                      <div className="ssr-variant hidden-1hh7fxx">
                        <div className="framer-1t1zpi3-container" style={{ transform: "rotate(5deg)" }}>
                          <div className="framer-6A3Mg framer-62fp8 framer-SwHTo framer-1sbsau2 framer-v-1gflzdq" data-framer-name="Only Content" style={{ backgroundColor: "var(--token-cd9da077-16e0-46f3-9a80-6bf4c2a79928, rgb(245, 221, 161))", width: "100%" }}>
                            <div className="framer-lbfqwd" data-framer-component-type="RichTextContainer" style={{ "--extracted-r6o4lv": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                              <p className="framer-text framer-styles-preset-163ovsm" data-styles-preset="ptQSvPZIk" dir="auto" style={{ "--framer-text-color": "var(--extracted-r6o4lv, var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18)))" }}>
                                {"When I'm not designing, there's usually a song playing in the background — it doesn't pick my color palette, but it tells me when a screen has too much going on."}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="ssr-variant hidden-1fzvxue hidden-y5t7zo">
                        <div className="framer-1t1zpi3-container">
                          <div className="framer-6A3Mg framer-62fp8 framer-SwHTo framer-1sbsau2 framer-v-1gflzdq" data-framer-name="Only Content" style={{ backgroundColor: "var(--token-cd9da077-16e0-46f3-9a80-6bf4c2a79928, rgb(245, 221, 161))", width: "100%" }}>
                            <div className="framer-lbfqwd" data-framer-component-type="RichTextContainer" style={{ "--extracted-r6o4lv": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                              <p className="framer-text framer-styles-preset-163ovsm" data-styles-preset="ptQSvPZIk" dir="auto" style={{ "--framer-text-color": "var(--extracted-r6o4lv, var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18)))" }}>
                                {"When I'm not designing, there's usually a song playing in the background — it doesn't pick my color palette, but it tells me when a screen has too much going on."}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="framer-1yo890v hidden-1hh7fxx" data-border="true" data-framer-name="Cursor Tag" style={{ opacity: "1", transform: "translateY(-50%) rotate(-11deg)" }}>
                    <div className="framer-13xxg5d-container">
                      <Suspense fallback={null}>
                        <div style={{ width: "0px", height: "0px" }} />
                      </Suspense>
                    </div>
                    <div data-framer-component-type="SVG" data-framer-name="Cursor" parentsize="0" _constraints="[object Object]" rotation="0" shadows="" className="framer-5ogdh7" aria-hidden="true" style={{ imageRendering: "pixelated", flexShrink: "0" }}>
                      <div className="svgContainer" style={{ width: "100%", height: "100%", aspectRatio: "inherit" }}>
                        <svg style={{ width: "100%", height: "100%", overflow: "visible" }}>
                          <use href="#svg1378496346_348" />
                        </svg>
                      </div>
                    </div>
                    <div className="framer-1yusfv1" data-framer-component-type="RichTextContainer" style={{ transform: "none" }}>
                      <p className="framer-text framer-styles-preset-1833qg6" data-styles-preset="jB2nPzqr7" dir="auto">
                        {"Yug"}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
              <section className="framer-1q34n9d" data-framer-name="My Story" id="my-story">
                <div className="framer-13tnzw6" data-framer-name="Tag">
                  <div className="framer-71winf" data-framer-name="Text">
                    <div className="framer-19x1pr" data-framer-component-type="RichTextContainer" style={{ transform: "none" }}>
                      <h2 className="framer-text framer-styles-preset-27ku3y" data-styles-preset="MffBJovlA" dir="auto" style={{ "--framer-text-color": "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))" }}>
                        {"How I approach my work"}
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="framer-ixsok6" data-border="true" data-framer-name="Bio">
                  <div className="framer-mpn7rf">
                    <div className="framer-15xqkt6-container">
                      <div className="framer-6A3Mg framer-62fp8 framer-SwHTo framer-1sbsau2 framer-v-1sbsau2" data-framer-name="Heading + Content" style={{ backgroundColor: "var(--token-a40bc7b7-fed8-4930-b9f7-5dc39bc097a2, rgb(164, 229, 248))", width: "100%" }}>
                        <div className="framer-1jcsxx1" data-framer-component-type="RichTextContainer" style={{ "--extracted-1eung3n": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                          <h4 className="framer-text framer-styles-preset-jjv5nu" data-styles-preset="TI_CAjGBM" dir="auto" style={{ "--framer-text-color": "var(--extracted-1eung3n, var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18)))" }}>
                            {"Research before wireframes"}
                          </h4>
                        </div>
                        <div className="framer-lbfqwd" data-framer-component-type="RichTextContainer" style={{ "--extracted-r6o4lv": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                          <p className="framer-text framer-styles-preset-163ovsm" data-styles-preset="ptQSvPZIk" dir="auto" style={{ "--framer-text-color": "var(--extracted-r6o4lv, var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18)))" }}>
                            {"Before I open Figma, I want to know what's actually breaking for the user. Half the time, what someone asks for isn't what they need — the real problem is one layer deeper. My best work starts with a good question, not a good screen."}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="framer-1mk7bzi" data-framer-name="Note">
                      <div className="framer-1lnd6n7" data-framer-name="Decoration">
                        <div data-framer-name="Arrow" className="framer-Ikgpl framer-fm2tup" />
                        <div className="framer-13p3nrk" data-framer-component-type="RichTextContainer" style={{ transform: "rotate(-15deg)" }}>
                          <h5 className="framer-text framer-styles-preset-1o05o96" data-styles-preset="H8WdmyHet" dir="auto">
                            {"understand first, design second"}
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div className="framer-rvqxqo" data-framer-name="Note">
                      <div className="framer-3w4or8" data-framer-name="Decoration">
                        <div className="framer-u6fwr5" data-framer-component-type="RichTextContainer" style={{ transform: "rotate(9deg)" }}>
                          <h5 className="framer-text framer-styles-preset-1o05o96" data-styles-preset="H8WdmyHet" dir="auto">
                            {"sprints don't wait for perfect"}
                          </h5>
                        </div>
                        <div data-framer-name="Arrow" className="framer-ZtICC framer-1ugaiiq" />
                      </div>
                    </div>
                    <div className="framer-705mjb-container">
                      <div className="framer-6A3Mg framer-62fp8 framer-SwHTo framer-1sbsau2 framer-v-1sbsau2" data-framer-name="Heading + Content" style={{ backgroundColor: "var(--token-cd9da077-16e0-46f3-9a80-6bf4c2a79928, rgb(245, 221, 161))", width: "100%" }}>
                        <div className="framer-1jcsxx1" data-framer-component-type="RichTextContainer" style={{ "--extracted-1eung3n": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                          <h4 className="framer-text framer-styles-preset-jjv5nu" data-styles-preset="TI_CAjGBM" dir="auto" style={{ "--framer-text-color": "var(--extracted-1eung3n, var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18)))" }}>
                            {"Designing inside real limitations"}
                          </h4>
                        </div>
                        <div className="framer-lbfqwd" data-framer-component-type="RichTextContainer" style={{ "--extracted-r6o4lv": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                          <p className="framer-text framer-styles-preset-163ovsm" data-styles-preset="ptQSvPZIk" dir="auto" style={{ "--framer-text-color": "var(--extracted-r6o4lv, var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18)))" }}>
                            {"Agile sprints don't leave room for ideal conditions. Timelines are tight, feedback is half-formed, and sometimes the ask changes mid-sprint. I've learned to make confident calls with incomplete information instead of waiting for a perfect brief."}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="framer-bml7qr-container">
                      <div className="framer-6A3Mg framer-62fp8 framer-SwHTo framer-1sbsau2 framer-v-1sbsau2" data-framer-name="Heading + Content" style={{ backgroundColor: "var(--token-3b25897c-a78c-4fb0-9a93-831975a769c1, rgb(161, 223, 197))", width: "100%" }}>
                        <div className="framer-1jcsxx1" data-framer-component-type="RichTextContainer" style={{ "--extracted-1eung3n": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                          <h4 className="framer-text framer-styles-preset-jjv5nu" data-styles-preset="TI_CAjGBM" dir="auto" style={{ "--framer-text-color": "var(--extracted-1eung3n, var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18)))" }}>
                            {"Design + dev, not design vs. dev"}
                          </h4>
                        </div>
                        <div className="framer-lbfqwd" data-framer-component-type="RichTextContainer" style={{ "--extracted-r6o4lv": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                          <p className="framer-text framer-styles-preset-163ovsm" data-styles-preset="ptQSvPZIk" dir="auto" style={{ "--framer-text-color": "var(--extracted-r6o4lv, var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18)))" }}>
                            {"I've sat close enough to engineers to know a design isn't done when it's \\"handed off\\" — it's done when it actually ships the way it was meant to. I'd rather loop in developers early than fix things after the fact."}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="framer-h7eo1w" data-framer-name="Note">
                      <div className="framer-enz7kh" data-framer-name="Decoration">
                        <div data-framer-name="Arrow" className="framer-Ikgpl framer-1a3z98x" />
                        <div className="framer-1j4k69v" data-framer-component-type="RichTextContainer" style={{ transform: "rotate(-15deg)" }}>
                          <h5 className="framer-text framer-styles-preset-1o05o96" data-styles-preset="H8WdmyHet" dir="auto">
                            {"handoff isn't the finish line"}
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div className="framer-li1ezw" data-framer-name="Note">
                      <div className="framer-1m7msg9" data-framer-name="Decoration">
                        <div className="framer-1xesv5c" data-framer-component-type="RichTextContainer" style={{ transform: "rotate(9deg)" }}>
                          <h5 className="framer-text framer-styles-preset-1o05o96" data-styles-preset="H8WdmyHet" dir="auto">
                            {"AI helps me move fast, taste tells me where to stop"}
                          </h5>
                        </div>
                        <div data-framer-name="Arrow" className="framer-ZtICC framer-1t5eghs" />
                      </div>
                    </div>
                    <div className="framer-1pbq76w-container">
                      <div className="framer-6A3Mg framer-62fp8 framer-SwHTo framer-1sbsau2 framer-v-1sbsau2" data-framer-name="Heading + Content" style={{ backgroundColor: "var(--token-221f5458-30ad-42f0-b005-7c3d9fe30e8d, rgb(250, 190, 209))", width: "100%" }}>
                        <div className="framer-1jcsxx1" data-framer-component-type="RichTextContainer" style={{ "--extracted-1eung3n": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                          <h4 className="framer-text framer-styles-preset-jjv5nu" data-styles-preset="TI_CAjGBM" dir="auto" style={{ "--framer-text-color": "var(--extracted-1eung3n, var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18)))" }}>
                            {"Small details, real trust"}
                          </h4>
                        </div>
                        <div className="framer-lbfqwd" data-framer-component-type="RichTextContainer" style={{ "--extracted-r6o4lv": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                          <p className="framer-text framer-styles-preset-163ovsm" data-styles-preset="ptQSvPZIk" dir="auto" style={{ "--framer-text-color": "var(--extracted-r6o4lv, var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18)))" }}>
                            {"AI speeds up variations, layouts, even copy — but it doesn't know when a screen has one element too many. That judgment call, the one that makes something feel trustworthy instead of just functional, is still mine to make."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="framer-w1h06a" data-framer-name="Border">
                    <div className="framer-19dxwmd" data-border="true" data-framer-name="LT" />
                    <div className="framer-1a4182c" data-border="true" data-framer-name="Rectangle" />
                    <div className="framer-15z12r4" data-border="true" data-framer-name="Rectangle" />
                    <div className="framer-sat85g" data-border="true" data-framer-name="Rectangle" />
                  </div>
                  <div className="framer-1h2do80 hidden-1hh7fxx" data-border="true" data-framer-name="Cursor Tag" style={{ opacity: "1", transform: "translateY(-50%) rotate(-11deg)" }}>
                    <div className="framer-1f6mfj4-container">
                      <Suspense fallback={null}>
                        <div style={{ width: "0px", height: "0px" }} />
                      </Suspense>
                    </div>
                    <div data-framer-component-type="SVG" data-framer-name="Cursor" parentsize="0" _constraints="[object Object]" rotation="0" shadows="" className="framer-1slwc7v" aria-hidden="true" style={{ imageRendering: "pixelated", flexShrink: "0" }}>
                      <div className="svgContainer" style={{ width: "100%", height: "100%", aspectRatio: "inherit" }}>
                        <svg style={{ width: "100%", height: "100%", overflow: "visible" }}>
                          <use href="#svg1439459110_387" />
                        </svg>
                      </div>
                    </div>
                    <div className="framer-1k7dwc9" data-framer-component-type="RichTextContainer" style={{ transform: "none" }}>
                      <p className="framer-text framer-styles-preset-1833qg6" data-styles-preset="jB2nPzqr7" dir="auto" style={{ "--framer-text-color": "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))" }}>
                        {"My story"}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
              <section className="framer-1q34n9d" data-framer-name="Work" id="work">
                <div className="framer-13tnzw6" data-framer-name="Tag">
                  <div className="framer-nc06ra" data-framer-name="Text">
                    <div className="framer-tzv26k" data-framer-component-type="RichTextContainer" style={{ transform: "none" }}>
                      <h2 className="framer-text framer-styles-preset-27ku3y" data-styles-preset="MffBJovlA" dir="auto" style={{ "--framer-text-color": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))" }}>
                        {"My work"}
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="framer-1ql5gwc" data-border="true" data-framer-name="Content">
                  <div className="framer-6aawbq" data-framer-name="Border">
                    <div className="framer-3cixhw" data-border="true" data-framer-name="Rectangle" />
                    <div className="framer-iw10lq" data-border="true" data-framer-name="Rectangle" />
                    <div className="framer-11qzkjj" data-border="true" data-framer-name="Rectangle" />
                    <div className="framer-cis23f" data-border="true" data-framer-name="Rectangle" />
                  </div>
                  <div className="framer-6p0jh5" data-framer-name="Comment">
                    <div className="framer-xanzq5" data-framer-component-type="RichTextContainer" style={{ transform: "none" }}>
                      <h5 className="framer-text framer-styles-preset-7q6rdi" data-styles-preset="JCTbwXFKE" dir="auto" style={{ "--framer-text-color": "var(--token-94d217a4-b19e-496f-a9f0-41c83f611b07, rgb(118, 119, 119))" }}>
                        {"Timeline"}
                      </h5>
                    </div>
                    <div className="framer-4y5xew" data-framer-name="Line" />
                    <div className="framer-1no5cfb" data-framer-name="List works">
                      <div className="framer-n3c4-container" style={{ width: "100%" }}>
                        <div className="framer-ec48W framer-62fp8 framer-SwHTo framer-erhBl framer-10gofpt framer-v-10gofpt" data-framer-name="Current" style={{ width: "100%" }}>
                          <div className="framer-17g34jv" style={{ borderBottomLeftRadius: "32px", borderBottomRightRadius: "32px", borderTopLeftRadius: "32px", borderTopRightRadius: "32px" }}>
                            <div style={{ position: "absolute", borderRadius: "inherit", cornerShape: "inherit", top: "0", right: "0", bottom: "0", left: "0" }} data-framer-background-image-wrapper="true">
                              <img decoding="async" loading="lazy" width="78" height="32" src="/assets/img/bcafdd9b85e25ea4.svg" alt="" style={{ display: "block", width: "100%", height: "100%", borderRadius: "inherit", cornerShape: "inherit", objectPosition: "center", objectFit: "contain" }} />
                            </div>
                          </div>
                          <div className="framer-13hmzbm" data-framer-name="Text + Icon">
                            <div className="framer-10vmn3d" data-framer-name="Text">
                              <div className="framer-wbeqe6" data-framer-component-type="RichTextContainer" style={{ "--extracted-1eung3n": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                                <h4 className="framer-text framer-styles-preset-jjv5nu" data-styles-preset="TI_CAjGBM" dir="auto" style={{ "--framer-text-color": "var(--extracted-1eung3n, var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18)))" }}>
                                  {"Arkanj Tech Solutions"}
                                </h4>
                                <p className="framer-text framer-styles-preset-1833qg6" data-styles-preset="jB2nPzqr7" dir="auto" style={{ "--framer-text-color": "var(--token-94d217a4-b19e-496f-a9f0-41c83f611b07, rgb(118, 119, 119))", marginTop: "2px" }}>
                                  {"UX Analyst"}
                                </p>
                              </div>
                              <div className="framer-zkzmni" data-framer-component-type="RichTextContainer" style={{ "--extracted-r6o4lv": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                                <p className="framer-text framer-styles-preset-163ovsm" data-styles-preset="ptQSvPZIk" dir="auto" style={{ "--framer-text-color": "var(--extracted-r6o4lv, var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18)))" }}>
                                  {"Owning end-to-end UX for client SaaS products — from user research and information architecture through wireframes to developer-ready Figma prototypes. The challenge is staying consistent across multiple products while working inside agile sprints, translating half-formed stakeholder feedback into decisions engineers can actually build."}
                                </p>
                              </div>
                            </div>
                            <div className="framer-1m7f4yp" data-border="true" data-framer-name="React" style={{ "--border-bottom-width": "2px", "--border-color": "var(--token-1892785e-8581-4826-b411-015017430ad3, rgb(0, 94, 217))", "--border-left-width": "2px", "--border-right-width": "2px", "--border-style": "solid", "--border-top-width": "2px", backgroundColor: "var(--token-a40bc7b7-fed8-4930-b9f7-5dc39bc097a2, rgb(164, 229, 248))", borderBottomLeftRadius: "4px", borderBottomRightRadius: "4px", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>
                              <div className="framer-1qlx9ve-container" data-code-component-plugin-id="84d4c1">
                                <Suspense fallback={null}>
                                  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                                    <svg width="100%" height="100%" viewBox="0 0 357 357" fill="var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))" xmlns="http://www.w3.org/2000/svg">
                                      <path fillRule="evenodd" clipRule="evenodd" d="M161.287 0H279.807L203.041 101.593H346.847L91.972 355.528L169.695 184.3H26.7266L161.287 0Z" fill="var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))" />
                                    </svg>
                                  </div>
                                </Suspense>
                              </div>
                              <div className="framer-lnnxhg" data-framer-component-type="RichTextContainer" style={{ "--extracted-r6o4lv": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                                <p className="framer-text framer-styles-preset-1833qg6" data-styles-preset="jB2nPzqr7" dir="auto" style={{ "--framer-text-color": "var(--extracted-r6o4lv, var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18)))" }}>
                                  {"APR 2026 - CURRENT"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="framer-1sty39j hidden-1hh7fxx" data-border="true" data-framer-name="Cursor Tag" style={{ opacity: "1", transform: "translateY(-50%) rotate(-11deg)" }}>
                    <div className="framer-161e4g2-container">
                      <Suspense fallback={null}>
                        <div style={{ width: "0px", height: "0px" }} />
                      </Suspense>
                    </div>
                    <div data-framer-component-type="SVG" data-framer-name="Cursor" parentsize="0" _constraints="[object Object]" rotation="0" shadows="" className="framer-1mrct6g" aria-hidden="true" style={{ imageRendering: "pixelated", flexShrink: "0" }}>
                      <div className="svgContainer" style={{ width: "100%", height: "100%", aspectRatio: "inherit" }}>
                        <svg style={{ width: "100%", height: "100%", overflow: "visible" }}>
                          <use href="#svg52684662_392" />
                        </svg>
                      </div>
                    </div>
                    <div className="framer-n52824" data-framer-component-type="RichTextContainer" style={{ transform: "none" }}>
                      <p className="framer-text framer-styles-preset-1833qg6" data-styles-preset="jB2nPzqr7" dir="auto" style={{ "--framer-text-color": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))" }}>
                        {"My work"}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
              <section className="framer-1q34n9d" data-framer-name="Awards" id="awards">
                <div className="framer-13tnzw6" data-framer-name="Tag">
                  <div className="framer-nc06ra" data-framer-name="Text">
                    <div className="framer-tzv26k" data-framer-component-type="RichTextContainer" style={{ transform: "none" }}>
                      <h2 className="framer-text framer-styles-preset-27ku3y" data-styles-preset="MffBJovlA" dir="auto" style={{ "--framer-text-color": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))" }}>
                        {"Awards & Achievements"}
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="framer-1ql5gwc" data-border="true" data-framer-name="Content">
                  <div className="framer-6aawbq" data-framer-name="Border">
                    <div className="framer-3cixhw" data-border="true" data-framer-name="Rectangle" />
                    <div className="framer-iw10lq" data-border="true" data-framer-name="Rectangle" />
                    <div className="framer-11qzkjj" data-border="true" data-framer-name="Rectangle" />
                    <div className="framer-cis23f" data-border="true" data-framer-name="Rectangle" />
                  </div>
                  <div className="framer-6p0jh5" data-framer-name="Comment" style={{ gap: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                      <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "var(--token-cd9da077-16e0-46f3-9a80-6bf4c2a79928, rgb(245, 221, 161))", padding: "4px 10px", borderRadius: "4px", border: "2px solid var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))" }}>
                        <span style={{ fontSize: "14px", lineHeight: "1" }}>🏆</span>
                        <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.04em", color: "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))" }}>Q2 2026</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="framer-text framer-styles-preset-jjv5nu" data-styles-preset="TI_CAjGBM" dir="auto" style={{ fontSize: "24px", fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 6px 0", color: "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))" }}>
                        {"EMPLOYEE OF THE QUARTER"}
                      </h3>
                      <p className="framer-text framer-styles-preset-1833qg6" data-styles-preset="jB2nPzqr7" dir="auto" style={{ fontSize: "14px", fontWeight: 500, color: "var(--token-94d217a4-b19e-496f-a9f0-41c83f611b07, rgb(118, 119, 119))", margin: "0" }}>
                        {"Yug Mehendiratta · UX Designer · Arkanj Tech Solutions Pvt. Ltd."}
                      </p>
                    </div>
                    <div className="framer-4y5xew" data-framer-name="Line" />
                    <div style={{ display: "flex", flexDirection: "column", gap: "14px", width: "100%" }}>
                      <p className="framer-text framer-styles-preset-163ovsm" data-styles-preset="ptQSvPZIk" dir="auto" style={{ "--framer-text-color": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))", margin: "0", lineHeight: "1.6" }}>
                        {"Huge congratulations to Yug Mehendiratta, our Q2 2026 Employee of the Quarter!"}
                      </p>
                      <p className="framer-text framer-styles-preset-163ovsm" data-styles-preset="ptQSvPZIk" dir="auto" style={{ "--framer-text-color": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))", margin: "0", lineHeight: "1.6" }}>
                        {"Yug Mehendiratta has truly shined this quarter as our UX designer. Their exceptional dedication to UX design and Video editing has made a massive impact on our team and our clients. Thank you for your hard work and outstanding results!"}
                      </p>
                      <p className="framer-text framer-styles-preset-163ovsm" data-styles-preset="ptQSvPZIk" dir="auto" style={{ "--framer-text-color": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))", margin: "0", lineHeight: "1.6" }}>
                        {"At Arkanj Tech Solutions Pvt. Ltd., we strive to build the best place to work and grow. Seeing team members like Yug Mehendiratta thrive and advance their careers is exactly what our culture is all about."}
                      </p>
                    </div>
                    <div style={{ paddingTop: "8px" }}>
                      <a
                        href="https://www.linkedin.com/in/yugmehendiratta"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          backgroundColor: "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))",
                          color: "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))",
                          padding: "10px 20px",
                          borderRadius: "8px",
                          fontSize: "13px",
                          fontWeight: 500,
                          textDecoration: "none",
                          boxShadow: "0 2px 4px rgba(17, 18, 18, 0.1)"
                        }}
                      >
                        <span>View LinkedIn Post</span>
                        <span>↗</span>
                      </a>
                    </div>
                  </div>
                  <div className="framer-1sty39j hidden-1hh7fxx" data-border="true" data-framer-name="Cursor Tag" style={{ opacity: "1", transform: "translateY(-50%) rotate(-11deg)" }}>
                    <div className="framer-161e4g2-container">
                      <Suspense fallback={null}>
                        <div style={{ width: "0px", height: "0px" }} />
                      </Suspense>
                    </div>
                    <div data-framer-component-type="SVG" data-framer-name="Cursor" parentsize="0" _constraints="[object Object]" rotation="0" shadows="" className="framer-1mrct6g" aria-hidden="true" style={{ imageRendering: "pixelated", flexShrink: "0" }}>
                      <div className="svgContainer" style={{ width: "100%", height: "100%", aspectRatio: "inherit" }}>
                        <svg style={{ width: "100%", height: "100%", overflow: "visible" }}>
                          <use href="#svg52684662_392" />
                        </svg>
                      </div>
                    </div>
                    <div className="framer-n52824" data-framer-component-type="RichTextContainer" style={{ transform: "none" }}>
                      <p className="framer-text framer-styles-preset-1833qg6" data-styles-preset="jB2nPzqr7" dir="auto" style={{ "--framer-text-color": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))" }}>
                        {"Awards"}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
`;

fs.writeFileSync('src/sections/about/AllContent.tsx', allContentCode);
console.log('Updated src/sections/about/AllContent.tsx');
