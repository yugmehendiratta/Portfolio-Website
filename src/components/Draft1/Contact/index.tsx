import React, { Suspense } from "react";

export interface ContactProps {
  className?: string;
  heading?: string;
  supportingCopy?: string;
  ctaText?: string;
}

/**
 * Draft 1 Contact Component
 * Preserves the exact Nudge Framer design language, DOM hierarchy, animations, and responsive variants.
 * Converted for Yug's portfolio.
 */
export default function Contact({
  className = "",
  heading = "Let's work together.",
  supportingCopy = "Have a product, website, SaaS, or digital experience that needs thoughtful UX and UI? Let's talk.",
  ctaText = "Let's Talk",
}: ContactProps) {
  return (
    <section className={`framer-18s9aw8 draft1-contact ${className}`} data-framer-name="Content">
      {/* Top Ruler Bar */}
      <div className="framer-2g48jk" data-framer-name="Ruler">
        <div className="framer-1ss7azh-container">
          <Suspense fallback={null}>
            <div style={{ width: "100%", height: "40px", overflow: "hidden", borderBottom: "1px solid rgba(0,0,0,0.2)", display: "flex", alignItems: "flex-start" }}>
              <div style={{ display: "flex", alignItems: "flex-start", willChange: "transform" }} />
            </div>
          </Suspense>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="framer-1jzctws" data-framer-name="Main Content">
        {/* Floating Decorative Polaroids (Desktop/Tablet) */}
        <div className="framer-dmkmmb hidden-135mmp3" data-framer-name="Polaroid">
          {/* Polaroid 1 */}
          <div className="framer-aqm8nu-container" draggable="false" style={{ opacity: "1", transform: "rotate(-20deg)", WebkitTouchCallout: "none", WebkitUserSelect: "none", userSelect: "none", touchAction: "none" }}>
            <div className="framer-bPcig framer-EjAzI framer-zl9qtm framer-v-zl9qtm" data-framer-name="Default" style={{ height: "100%", width: "100%", boxShadow: "0px 0.6px 1.8px -0.83px rgba(0, 0, 0, 0.13), 0px 2.3px 6.9px -1.67px rgba(0, 0, 0, 0.13), 0px 10px 30px -2.5px rgba(0, 0, 0, 0.13)" }}>
              <div className="framer-82wh8q" data-framer-name="Polaroid" style={{ backgroundColor: "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))" }}>
                <div className="framer-1ywu17f">
                  <div style={{ position: "absolute", borderRadius: "inherit", cornerShape: "inherit", top: "0", right: "0", bottom: "0", left: "0" }} data-framer-background-image-wrapper="true">
                    <img width="938" height="898" sizes="(min-width: 1200px) calc(calc((min(100vw, 1400px) - 112px) * 0.17) - 16px), (min-width: 810px) and (max-width: 1199.98px) calc(calc((min(100vw, 1400px) - 112px) * 0.17) - 16px), (max-width: 809.98px) calc(calc((min(100vw, 1400px) - 112px) * 0.17) - 16px)" srcSet="/assets/img/e13ac167615ff339.webp 512w, /assets/img/cfee386c5d59b88e.webp 938w" src="/assets/img/cfee386c5d59b88e.webp" alt="Design snapshot" style={{ display: "block", width: "100%", height: "100%", borderRadius: "inherit", cornerShape: "inherit", objectPosition: "center", objectFit: "cover" }} loading="eager" />
                  </div>
                </div>
              </div>
              <div className="framer-1a9jrm3" data-framer-name="Polaroid" style={{ backgroundColor: "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))" }}>
                <div className="framer-1wh2zmo" data-framer-component-type="RichTextContainer" style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                  <h5 className="framer-text framer-styles-preset-1v53mqb" data-styles-preset="qvOJ3gdiv" dir="auto">
                    {"let's connect"}
                  </h5>
                </div>
              </div>
            </div>
          </div>

          {/* Polaroid 2 */}
          <div className="framer-1ojpf9-container" draggable="false" style={{ opacity: "1", transform: "rotate(27deg)", WebkitTouchCallout: "none", WebkitUserSelect: "none", userSelect: "none", touchAction: "none" }}>
            <div className="framer-bPcig framer-EjAzI framer-zl9qtm framer-v-zl9qtm" data-framer-name="Default" style={{ height: "100%", width: "100%", boxShadow: "0px 0.6px 1.8px -0.83px rgba(0, 0, 0, 0.13), 0px 2.3px 6.9px -1.67px rgba(0, 0, 0, 0.13), 0px 10px 30px -2.5px rgba(0, 0, 0, 0.13)" }}>
              <div className="framer-82wh8q" data-framer-name="Polaroid" style={{ backgroundColor: "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))" }}>
                <div className="framer-1ywu17f">
                  <div style={{ position: "absolute", borderRadius: "inherit", cornerShape: "inherit", top: "0", right: "0", bottom: "0", left: "0" }} data-framer-background-image-wrapper="true">
                    <img width="1269" height="1270" sizes="(min-width: 1200px) calc(calc((min(100vw, 1400px) - 112px) * 0.17) - 16px), (min-width: 810px) and (max-width: 1199.98px) calc(calc((min(100vw, 1400px) - 112px) * 0.17) - 16px), (max-width: 809.98px) calc(calc((min(100vw, 1400px) - 112px) * 0.17) - 16px)" srcSet="/assets/img/aaef20a9d6cf55a5.webp 1023w, /assets/img/10bf4a03b2536938.webp 1269w" src="/assets/img/10bf4a03b2536938.webp" alt="Creative work" style={{ display: "block", width: "100%", height: "100%", borderRadius: "inherit", cornerShape: "inherit", objectPosition: "center", objectFit: "cover" }} loading="eager" fetchPriority="high" />
                  </div>
                </div>
              </div>
              <div className="framer-1a9jrm3" data-framer-name="Polaroid" style={{ backgroundColor: "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))" }}>
                <div className="framer-1wh2zmo" data-framer-component-type="RichTextContainer" style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                  <h5 className="framer-text framer-styles-preset-1v53mqb" data-styles-preset="qvOJ3gdiv" dir="auto">
                    {"start a project"}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Center Content & Form Box */}
        <div className="framer-1d2cjsc" data-framer-name="Content">
          {/* Note Banner */}
          <div className="framer-3h1dq5" data-framer-name="My name is" style={{ transform: "rotate(-3deg)" }}>
            <div className="framer-1l1ol1" data-framer-component-type="RichTextContainer" style={{ transform: "none" }}>
              <h1 className="framer-text framer-styles-preset-1o05o96" data-styles-preset="H8WdmyHet" dir="auto">
                {"leave me a note"}
              </h1>
            </div>
            <div data-framer-name="Arrow" className="framer-YHfrK framer-460z9e" />
          </div>

          {/* Heading Box */}
          <div className="framer-6sk12e" data-border="true" data-framer-name="Text" style={{ transform: "rotate(3deg)" }}>
            <div className="framer-1cfkqbg" data-framer-name="Border">
              <div className="framer-16g7q1f" data-border="true" data-framer-name="LT" />
              <div className="framer-daodqy" data-border="true" data-framer-name="LB" />
              <div className="framer-13rmqh4" data-border="true" data-framer-name="RT" />
              <div className="framer-3auxiv" data-border="true" data-framer-name="RB" />
            </div>
            <div className="framer-tm4l6c" data-framer-component-type="RichTextContainer" style={{ transform: "none" }}>
              <h1 className="framer-text framer-styles-preset-4nri6j" data-styles-preset="Iep6i79Kc" dir="auto" style={{ "--framer-text-color": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))" }}>
                {heading}
              </h1>
            </div>
          </div>

          {/* Contact Interactive Form */}
          <div className="ssr-variant">
            <div className="framer-1t8lw4v-container">
              <form className="framer-wHBv2 framer-erhBl framer-NkuHG framer-1wt6bqy framer-v-1wt6bqy" data-framer-name="Message" style={{ maxWidth: "100%", width: "100%" }} onSubmit={(e) => e.preventDefault()}>
                {/* Email Field */}
                <label className="framer-7nw6i1" data-framer-name="Email" style={{ backgroundColor: "var(--token-cd9da077-16e0-46f3-9a80-6bf4c2a79928, rgb(245, 221, 161))", opacity: "0" }}>
                  <div className="framer-1crp85u" data-framer-component-type="RichTextContainer" style={{ transform: "none" }}>
                    <p className="framer-text framer-styles-preset-1833qg6" data-styles-preset="jB2nPzqr7" dir="auto">
                      {"Where to find you?"}
                    </p>
                  </div>
                  <div className="framer-form-text-input framer-form-input-wrapper framer-ob6hus framer-form-textarea-input-type" style={{ "--framer-input-font-color": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))", "--framer-input-icon-mask-image": "none", "--framer-input-placeholder-color": "var(--token-9aa8d99c-a5bb-4541-a292-62e252d963bf, rgb(69, 71, 71))" }}>
                    <textarea required name="Email" placeholder="hello@yourmail.com" className="framer-form-input" />
                  </div>
                </label>

                {/* Message Field */}
                <label className="framer-xiv7xx" data-framer-name="Message" style={{ backgroundColor: "var(--token-cd9da077-16e0-46f3-9a80-6bf4c2a79928, rgb(245, 221, 161))", opacity: "1" }}>
                  <div className="framer-qdtym2" data-framer-component-type="RichTextContainer" style={{ transform: "none" }}>
                    <p className="framer-text framer-styles-preset-1833qg6" data-styles-preset="jB2nPzqr7" dir="auto">
                      {"What's on your mind?"}
                    </p>
                  </div>
                  <div className="framer-form-text-input framer-form-input-wrapper framer-1ispb5p framer-form-textarea-input-type" style={{ "--framer-input-font-color": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))", "--framer-input-icon-mask-image": "none", "--framer-input-placeholder-color": "var(--token-9aa8d99c-a5bb-4541-a292-62e252d963bf, rgb(69, 71, 71))" }}>
                    <textarea required name="Message" placeholder={supportingCopy} className="framer-form-input" />
                  </div>
                </label>

                {/* CTA Action Button */}
                <div className="framer-mtu3d9" data-framer-name="Next">
                  <div className="framer-12hbfkr" data-framer-name="Next" data-highlight="true" tabIndex={0} style={{ backgroundColor: "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))", cursor: "pointer" }}>
                    <div className="framer-1cqhfxk" data-framer-component-type="RichTextContainer" style={{ "--extracted-r6o4lv": "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                      <p className="framer-text framer-styles-preset-27ku3y" data-styles-preset="MffBJovlA" dir="auto" style={{ "--framer-text-color": "var(--extracted-r6o4lv, var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255)))" }}>
                        {ctaText}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Anti-spam hidden honeypots preserved */}
                <input type="text" name="website" tabIndex={-1} autoComplete="one-time-code" aria-hidden="true" style={{ position: "absolute", transform: "scale(0)" }} data-1p-ignore="true" data-lpignore="true" data-form-type="other" data-bwignore="true" defaultValue="" />
                <input type="text" name="company" tabIndex={-1} autoComplete="one-time-code" aria-hidden="true" style={{ position: "absolute", transform: "scale(0)" }} data-1p-ignore="true" data-lpignore="true" data-form-type="other" data-bwignore="true" defaultValue="" />
                <input type="text" name="message" tabIndex={-1} autoComplete="one-time-code" aria-hidden="true" style={{ position: "absolute", transform: "scale(0)" }} data-1p-ignore="true" data-lpignore="true" data-form-type="other" data-bwignore="true" defaultValue="" />
              </form>
            </div>
          </div>
        </div>

        {/* Availability Quote Tag */}
        <div className="framer-7qkk4t" data-framer-name="Quote">
          <div data-framer-name="Arrow" className="framer-Ikgpl framer-n46j0m" />
          <div className="framer-16zmmio" data-framer-component-type="RichTextContainer" style={{ transform: "none" }}>
            <h5 className="framer-text framer-styles-preset-1o05o96" data-styles-preset="H8WdmyHet" dir="auto">
              {"I'm available for new projects!"}
            </h5>
          </div>
        </div>
      </div>

      {/* Social Navigation Bar */}
      <div className="framer-15ncfh8" data-framer-name="Social">
        <div className="framer-nulj9" data-framer-name="Nav Sticky">
          <div className="ssr-variant">
            <div className="framer-nm8fhl-container">
              <Suspense fallback={null}>
                <a className="framer-891Ch framer-NkuHG framer-1m3kj3m framer-v-2tyaa4 framer-t8qzwo" data-framer-name="Inactive" href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" style={{ backgroundColor: "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))", borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px", borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}>
                  <div className="framer-7vz0jb" data-framer-name="Icon">
                    <div className="framer-sn5788-container" data-code-component-plugin-id="84d4c1">
                      <Suspense fallback={null}>
                        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                          <svg width="100%" height="100%" viewBox="0 0 24 24" fill="var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.771 2.00928C20.3599 2.00928 20.9246 2.24319 21.3409 2.65955C21.7573 3.07591 21.9912 3.64061 21.9912 4.22944V19.7706C21.9912 20.3594 21.7573 20.9241 21.3409 21.3405C20.9246 21.7568 20.3599 21.9907 19.771 21.9907H4.22993C3.6411 21.9907 3.0764 21.7568 2.66004 21.3405C2.24367 20.9241 2.00977 20.3594 2.00977 19.7706V4.22944C2.00977 3.64061 2.24367 3.07591 2.66004 2.65955C3.0764 2.24319 3.6411 2.00928 4.22993 2.00928H19.771ZM19.216 19.2155V13.3321C19.216 12.3723 18.8347 11.4518 18.1561 10.7732C17.4774 10.0945 16.5569 9.71323 15.5971 9.71323C14.6536 9.71323 13.5546 10.2905 13.0218 11.1563V9.92415H9.92464V19.2155H13.0218V13.7428C13.0218 12.8881 13.71 12.1887 14.5648 12.1887C14.9769 12.1887 15.3722 12.3524 15.6637 12.6439C15.9551 12.9354 16.1189 13.3306 16.1189 13.7428V19.2155H19.216ZM6.31688 8.18132C6.81149 8.18132 7.28584 7.98484 7.63559 7.6351C7.98533 7.28535 8.18181 6.811 8.18181 6.31639C8.18181 5.28401 7.34925 4.44035 6.31688 4.44035C5.81932 4.44035 5.34214 4.63801 4.99032 4.98983C4.63849 5.34166 4.44084 5.81883 4.44084 6.31639C4.44084 7.34876 5.2845 8.18132 6.31688 8.18132ZM7.85989 19.2155V9.92415H4.78497V19.2155H7.85989Z" fill="var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))" />
                          </svg>
                        </div>
                      </Suspense>
                    </div>
                  </div>
                  <div className="framer-1ucsmrf" data-framer-component-type="RichTextContainer" style={{ "--extracted-r6o4lv": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" }}>
                    <p className="framer-text framer-styles-preset-27ku3y" data-styles-preset="MffBJovlA" dir="auto" style={{ "--framer-text-color": "var(--extracted-r6o4lv, var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18)))" }}>
                      {"LinkedIn"}
                    </p>
                  </div>
                </a>
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
