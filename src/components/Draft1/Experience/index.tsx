import React, { Suspense } from "react";

export interface ExperienceItem {
  company?: string;
  title?: string;
  role?: string;
  period?: string;
  description: string;
  logoSrc?: string;
  isCurrent?: boolean;
}

export interface ExperienceProps {
  items?: ExperienceItem[];
  title?: string;
  className?: string;
  children?: React.ReactNode;
}

// Neutral experience and project practice timeline based strictly on confirmed portfolio focus
export const DEFAULT_EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    title: "Product Design & UI/UX",
    role: "Product Designer / UI/UX Designer",
    period: "Current",
    description:
      "Designing digital products, SaaS experiences, and user-focused interfaces with a focus on usability, simplicity, and clear interaction patterns.",
    logoSrc: "/assets/img/bcafdd9b85e25ea4.svg",
    isCurrent: true,
  },
  {
    title: "AI Product & Career Platform Design",
    role: "Product Designer",
    period: "Featured Work",
    description:
      "Designed ArkCV Builder, an AI-powered career platform helping users create, analyze, improve, and optimize resumes and job applications.",
    logoSrc: "/assets/img/9f0a9fbfc3f4c8e7.svg",
    isCurrent: false,
  },
  {
    title: "EdTech & Learning Experience Design",
    role: "Product Designer",
    period: "Featured Work",
    description:
      "Designed German With Jai, a structured language learning platform focused on interactive practice and gamified user experiences.",
    logoSrc: "/assets/img/b7ee6584ea68ba7c.svg",
    isCurrent: false,
  },
  {
    title: "E-Commerce & Analytics Dashboard Design",
    role: "UX Designer",
    period: "Featured Work",
    description:
      "Designed Swagatham grocery e-commerce for seamless product discovery, and CreatorHQ dashboard for content analytics and workflows.",
    logoSrc: "/assets/img/5eb5ff7041abd860.svg",
    isCurrent: false,
  },
];

/**
 * Draft 1 Experience Component
 * Preserves the exact Nudge Framer design language, timeline layout, corner border elements,
 * cursor sticker tags, and responsive typography variants.
 */
export default function Experience({
  items = DEFAULT_EXPERIENCE_ITEMS,
  title = "What dive into my work",
  className = "",
  children,
}: ExperienceProps) {
  if (children) {
    return (
      <section className={`framer-o05pe9 draft1-experience ${className}`} data-framer-name="Work" id="work">
        {children}
      </section>
    );
  }

  const containerClasses = [
    "framer-n3c4-container",
    "framer-o62oz8-container",
    "framer-w7q4b1-container",
    "framer-16ez5zt-container",
  ];

  const lineClasses = ["framer-4y5xew", "framer-1k6gw7g", "framer-1lo4iwf", "framer-1q4r4qm"];

  return (
    <section className={`framer-o05pe9 draft1-experience ${className}`} data-framer-name="Work" id="work">
      <div className="framer-foyt4c" data-framer-name="Contain">
        {/* Section Tag */}
        <div className="framer-eox33i" data-framer-name="Tag">
          <div className="framer-nc06ra" data-framer-name="Text">
            <div className="framer-tzv26k" data-framer-component-type="RichTextContainer" style={{ transform: "none" }}>
              <h2
                className="framer-text framer-styles-preset-27ku3y"
                data-styles-preset="MffBJovlA"
                dir="auto"
                style={
                  {
                    "--framer-text-color": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))",
                  } as React.CSSProperties
                }
              >
                {title}
              </h2>
            </div>
          </div>
        </div>

        {/* Content Box with Corner Borders and Cursor Tag */}
        <div className="framer-1ql5gwc" data-border="true" data-framer-name="Content">
          <div className="framer-6aawbq" data-framer-name="Border">
            <div className="framer-3cixhw" data-border="true" data-framer-name="Rectangle" />
            <div className="framer-iw10lq" data-border="true" data-framer-name="Rectangle" />
            <div className="framer-11qzkjj" data-border="true" data-framer-name="Rectangle" />
            <div className="framer-cis23f" data-border="true" data-framer-name="Rectangle" />
          </div>

          {/* Floating Sticker: "My work" */}
          <div
            className="framer-1sty39j hidden-1hh7fxx"
            data-border="true"
            data-framer-name="Cursor Tag"
            style={{ opacity: "1", transform: "translateY(-50%) rotate(-11deg)" }}
          >
            <div className="framer-161e4g2-container">
              <Suspense fallback={null}>
                <div style={{ width: "0px", height: "0px" }} />
              </Suspense>
            </div>
            <div
              data-framer-component-type="SVG"
              data-framer-name="Cursor"
              aria-hidden="true"
              className="framer-1mrct6g"
              style={{ imageRendering: "pixelated", flexShrink: "0" }}
            >
              <div className="svgContainer" style={{ width: "100%", height: "100%", aspectRatio: "inherit" }}>
                <svg style={{ width: "100%", height: "100%", overflow: "visible" }}>
                  <use href="#svg52684662_392" />
                </svg>
              </div>
            </div>
            <div className="framer-n52824" data-framer-component-type="RichTextContainer" style={{ transform: "none" }}>
              <p
                className="framer-text framer-styles-preset-1833qg6"
                data-styles-preset="jB2nPzqr7"
                dir="auto"
                style={
                  {
                    "--framer-text-color": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))",
                  } as React.CSSProperties
                }
              >
                {"My work"}
              </p>
            </div>
          </div>

          {/* Timeline Wrapper */}
          <div className="framer-6p0jh5" data-framer-name="Comment">
            <div className="framer-xanzq5" data-framer-component-type="RichTextContainer" style={{ transform: "none" }}>
              <h5
                className="framer-text framer-styles-preset-7q6rdi"
                data-styles-preset="JCTbwXFKE"
                dir="auto"
                style={
                  {
                    "--framer-text-color": "var(--token-94d217a4-b19e-496f-a9f0-41c83f611b07, rgb(118, 119, 119))",
                  } as React.CSSProperties
                }
              >
                {"Timeline"}
              </h5>
            </div>
            <div className="framer-4y5xew" data-framer-name="Line" />

            {/* List of Timeline Works */}
            <div className="framer-1no5cfb" data-framer-name="List works">
              {items.map((item, index) => {
                const itemTitle = item.title || item.company || "";
                const containerClass = containerClasses[index % containerClasses.length];
                const isCurrent = item.isCurrent ?? index === 0;

                return (
                  <React.Fragment key={index}>
                    {index > 0 && <div className={lineClasses[index % lineClasses.length]} data-framer-name="Line" />}
                    <div className="ssr-variant">
                      <div className={containerClass}>
                        <div
                          className={`framer-ec48W framer-62fp8 framer-SwHTo framer-erhBl framer-10gofpt ${
                            isCurrent ? "framer-v-10gofpt" : "framer-v-12t281j"
                          }`}
                          data-framer-name={isCurrent ? "Current" : "Past"}
                          style={{ width: "100%" }}
                        >
                          {/* Logo Pill */}
                          <div
                            className="framer-17g34jv"
                            style={{
                              borderBottomLeftRadius: "32px",
                              borderBottomRightRadius: "32px",
                              borderTopLeftRadius: "32px",
                              borderTopRightRadius: "32px",
                            }}
                          >
                            <div
                              style={{
                                position: "absolute",
                                borderRadius: "inherit",
                                top: "0",
                                right: "0",
                                bottom: "0",
                                left: "0",
                              }}
                              data-framer-background-image-wrapper="true"
                            >
                              <img
                                decoding="async"
                                loading="lazy"
                                width="78"
                                height="32"
                                src={item.logoSrc || "/assets/img/bcafdd9b85e25ea4.svg"}
                                alt=""
                                style={{
                                  display: "block",
                                  width: "100%",
                                  height: "100%",
                                  borderRadius: "inherit",
                                  objectPosition: "center",
                                  objectFit: "contain",
                                }}
                              />
                            </div>
                          </div>

                          {/* Text + Date Badge */}
                          <div className="framer-13hmzbm" data-framer-name="Text + Icon">
                            <div className="framer-10vmn3d" data-framer-name="Text">
                              <div
                                className="framer-wbeqe6"
                                data-framer-component-type="RichTextContainer"
                                style={
                                  {
                                    "--extracted-1eung3n":
                                      "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))",
                                    "--framer-link-text-color": "rgb(0, 153, 255)",
                                    "--framer-link-text-decoration": "underline",
                                    transform: "none",
                                  } as React.CSSProperties
                                }
                              >
                                <h4
                                  className="framer-text framer-styles-preset-jjv5nu"
                                  data-styles-preset="TI_CAjGBM"
                                  dir="auto"
                                  style={
                                    {
                                      "--framer-text-color":
                                        "var(--extracted-1eung3n, var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18)))",
                                    } as React.CSSProperties
                                  }
                                >
                                  {itemTitle}
                                </h4>
                              </div>
                              <div
                                className="framer-zkzmni"
                                data-framer-component-type="RichTextContainer"
                                style={
                                  {
                                    "--extracted-r6o4lv":
                                      "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))",
                                    "--framer-link-text-color": "rgb(0, 153, 255)",
                                    "--framer-link-text-decoration": "underline",
                                    transform: "none",
                                  } as React.CSSProperties
                                }
                              >
                                <p
                                  className="framer-text framer-styles-preset-163ovsm"
                                  data-styles-preset="ptQSvPZIk"
                                  dir="auto"
                                  style={
                                    {
                                      "--framer-text-color":
                                        "var(--extracted-r6o4lv, var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18)))",
                                    } as React.CSSProperties
                                  }
                                >
                                  {item.description}
                                </p>
                              </div>
                            </div>

                            {/* Period Badge */}
                            <div
                              className="framer-1m7f4yp"
                              data-border="true"
                              data-framer-name="React"
                              style={
                                {
                                  "--border-bottom-width": "2px",
                                  "--border-color": isCurrent
                                    ? "var(--token-1892785e-8581-4826-b411-015017430ad3, rgb(0, 94, 217))"
                                    : "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))",
                                  "--border-left-width": "2px",
                                  "--border-right-width": "2px",
                                  "--border-style": "solid",
                                  "--border-top-width": "2px",
                                  backgroundColor: isCurrent
                                    ? "var(--token-a40bc7b7-fed8-4930-b9f7-5dc39bc097a2, rgb(164, 229, 248))"
                                    : "rgba(0, 0, 0, 0)",
                                  borderBottomLeftRadius: "4px",
                                  borderBottomRightRadius: "4px",
                                  borderTopLeftRadius: "4px",
                                  borderTopRightRadius: "4px",
                                } as React.CSSProperties
                              }
                            >
                              <div className="framer-1qlx9ve-container" data-code-component-plugin-id="84d4c1">
                                <Suspense fallback={null}>
                                  <div
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      position: "relative",
                                    }}
                                  >
                                    {isCurrent ? (
                                      <svg
                                        width="100%"
                                        height="100%"
                                        viewBox="0 0 357 357"
                                        fill="var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          d="M161.287 0H279.807L203.041 101.593H346.847L91.972 355.528L169.695 184.3H26.7266L161.287 0Z"
                                          fill="var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))"
                                        />
                                      </svg>
                                    ) : (
                                      <svg
                                        width="100%"
                                        height="100%"
                                        viewBox="0 0 200 200"
                                        fill="var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          d="M50 100C77.6142 100 100 77.6142 100 50C100 77.6142 122.386 100 150 100C122.386 100 100 122.386 100 150C100 122.386 77.6142 100 50 100ZM50 100C22.3858 100 0 122.386 0 150C0 177.614 22.3858 200 50 200C77.6142 200 100 177.614 100 150C100 177.614 122.386 200 150 200C177.614 200 200 177.614 200 150C200 122.386 177.614 100 150 100C177.614 100 200 77.6142 200 50C200 22.3858 177.614 0 150 0C122.386 0 100 22.3858 100 50C100 22.3858 77.6142 0 50 0C22.3858 0 0 22.3858 0 50C0 77.6142 22.3858 100 50 100Z"
                                          fill="var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))"
                                        />
                                      </svg>
                                    )}
                                  </div>
                                </Suspense>
                              </div>
                              {item.period && (
                                <div
                                  className="framer-lnnxhg"
                                  data-framer-component-type="RichTextContainer"
                                  style={
                                    {
                                      "--extracted-r6o4lv":
                                        "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))",
                                      "--framer-link-text-color": "rgb(0, 153, 255)",
                                      "--framer-link-text-decoration": "underline",
                                      transform: "none",
                                    } as React.CSSProperties
                                  }
                                >
                                  <p
                                    className="framer-text framer-styles-preset-1833qg6"
                                    data-styles-preset="jB2nPzqr7"
                                    dir="auto"
                                    style={
                                      {
                                        "--framer-text-color":
                                          "var(--extracted-r6o4lv, var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18)))",
                                      } as React.CSSProperties
                                    }
                                  >
                                    {item.period}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
