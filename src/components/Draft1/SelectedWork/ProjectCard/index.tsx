import React, { Suspense } from "react";

export interface ProjectCardData {
  id: string;
  projectNumber: string;
  title: string;
  category: string;
  tags: string[];
  description: string;
  date?: string;
  href: string;
  theme?: "blue" | "dark" | "orange" | "pink";
  imageSrc: string;
  imageSrcSet?: string;
  imageAlt?: string;
}

export interface ProjectCardProps {
  project?: ProjectCardData;
  id?: string;
  projectNumber?: string;
  title?: string;
  category?: string;
  tags?: string[];
  description?: string;
  date?: string;
  href?: string;
  theme?: "blue" | "dark" | "orange" | "pink";
  imageSrc?: string;
  imageSrcSet?: string;
  imageAlt?: string;
  className?: string;
  children?: React.ReactNode;
}

// Theme configuration mapping tokens, colors and border styles
const themeConfigs = {
  blue: {
    bgColor: "var(--token-1892785e-8581-4826-b411-015017430ad3, rgb(0, 94, 217))",
    textColor: "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))",
    borderColor: "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))",
    dateBg: "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))",
    dateText: "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))",
    tagBg: "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))",
    tagText: "var(--token-1892785e-8581-4826-b411-015017430ad3, rgb(0, 94, 217))",
    buttonType: "dark" as const,
    numFill: "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))",
    numTextFill: "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))",
    cornerBadgeBg: "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))",
    cornerBadgeFill: "var(--token-1892785e-8581-4826-b411-015017430ad3, rgb(0, 94, 217))",
  },
  dark: {
    bgColor: "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))",
    textColor: "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))",
    borderColor: "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))",
    dateBg: "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))",
    dateText: "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))",
    tagBg: "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))",
    tagText: "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))",
    buttonType: "white" as const,
    numFill: "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))",
    numTextFill: "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))",
    cornerBadgeBg: "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))",
    cornerBadgeFill: "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))",
  },
  orange: {
    bgColor: "var(--token-29f9695a-09e2-4c55-ace7-e9873233e207, rgb(254, 161, 37))",
    textColor: "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))",
    borderColor: "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))",
    dateBg: "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))",
    dateText: "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))",
    tagBg: "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))",
    tagText: "var(--token-29f9695a-09e2-4c55-ace7-e9873233e207, rgb(254, 161, 37))",
    buttonType: "dark" as const,
    numFill: "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))",
    numTextFill: "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))",
    cornerBadgeBg: "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))",
    cornerBadgeFill: "var(--token-29f9695a-09e2-4c55-ace7-e9873233e207, rgb(254, 161, 37))",
  },
  pink: {
    bgColor: "var(--token-e22e0fe6-83a6-4381-a625-c6f173619c49, rgb(230, 57, 155))",
    textColor: "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))",
    borderColor: "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))",
    dateBg: "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))",
    dateText: "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))",
    tagBg: "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))",
    tagText: "var(--token-e22e0fe6-83a6-4381-a625-c6f173619c49, rgb(230, 57, 155))",
    buttonType: "white" as const,
    numFill: "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))",
    numTextFill: "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))",
    cornerBadgeBg: "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))",
    cornerBadgeFill: "var(--token-e22e0fe6-83a6-4381-a625-c6f173619c49, rgb(230, 57, 155))",
  },
};

/**
 * Splits a string into word spans and character spans for Framer letter-by-letter animations.
 */
function renderAnimatedText(text: string) {
  const words = text.split(" ");
  return words.map((word, wIdx) => (
    <React.Fragment key={wIdx}>
      {wIdx > 0 && " "}
      <span style={{ whiteSpace: "nowrap" }}>
        {Array.from(word).map((char, cIdx) => (
          <span
            key={cIdx}
            style={{
              display: "inline-block",
              opacity: "0.001",
              transform: "translateX(0px) translateY(40px) scale(1) rotate(0deg) skewX(0deg) skewY(0deg)",
            }}
          >
            {char}
          </span>
        ))}
      </span>
    </React.Fragment>
  ));
}

/**
 * Draft 1 ProjectCard Component
 * Preserves the exact Nudge Framer design language, SVG shapes, hover interactions,
 * tag styles, button styling, and responsive breakpoint variants (Desktop / Tablet / Mobile).
 */
export default function ProjectCard(props: ProjectCardProps) {
  if (props.children) {
    return <article className={`draft1-project-card ${props.className || ""}`}>{props.children}</article>;
  }

  const data: ProjectCardData = props.project || {
    id: props.id || "pj1",
    projectNumber: props.projectNumber || "project 01",
    title: props.title || "ArkCV Builder",
    category: props.category || "AI Product / SaaS / UX",
    tags: props.tags || ["AI Product", "SaaS", "UX"],
    description:
      props.description ||
      "An AI-powered career platform that helps users create, analyze, improve, and optimize resumes and job applications.",
    date: props.date,
    href: props.href || "./case-study/meridian-health",
    theme: props.theme || "blue",
    imageSrc: props.imageSrc || "/assets/img/783ca641ce37d469.webp",
    imageSrcSet:
      props.imageSrcSet ||
      "/assets/img/def7fcbbf9a18bac.webp 512w, /assets/img/60fbb70e12edcae6.webp 1024w, /assets/img/a38c616b6df6d929.webp 2048w, /assets/img/783ca641ce37d469.webp 2400w",
    imageAlt: props.imageAlt || props.title || "Project preview",
  };

  const currentTheme = themeConfigs[data.theme || "blue"] || themeConfigs.blue;

  // Project container class mappings
  const containerClassMap: Record<string, string> = {
    pj1: "framer-18wve3s",
    pj2: "framer-p33u8m",
    pj3: "framer-1fslhha",
    pj4: "framer-x9srd7",
  };

  const numberContainerClassMap: Record<string, string> = {
    pj1: "framer-4y8o6z",
    pj2: "framer-1g6boc",
    pj3: "framer-irv8gb",
    pj4: "framer-d8peec",
  };

  const numberInnerClassMap: Record<string, string> = {
    pj1: "framer-pt1129",
    pj2: "framer-k3lm5r",
    pj3: "framer-1agqeaq",
    pj4: "framer-1jk9lsi",
  };

  const numberSvgContainerClassMap: Record<string, string> = {
    pj1: "framer-1crst57-container",
    pj2: "framer-1idmj2u-container",
    pj3: "framer-s3knzg-container",
    pj4: "framer-myc5to-container",
  };

  const numberTextClassMap: Record<string, string> = {
    pj1: "framer-qzezvq",
    pj2: "framer-109h8t8",
    pj3: "framer-1dyi6se",
    pj4: "framer-a8vh6j",
  };

  const lineClassMap: Record<string, string> = {
    pj1: "framer-jlsvtj",
    pj2: "framer-b3njjt",
    pj3: "framer-ujfd83",
    pj4: "framer-tbl449",
  };

  const contentOuterClassMap: Record<string, string> = {
    pj1: "framer-j7hiuq",
    pj2: "framer-58rg3w",
    pj3: "framer-10jhctw",
    pj4: "framer-1t3wxo8",
  };

  const contentInnerClassMap: Record<string, string> = {
    pj1: "framer-1h5ehf4",
    pj2: "framer-1jr2fr1",
    pj3: "framer-qbv3fl",
    pj4: "framer-1mej3y4",
  };

  const desktopContainerClassMap: Record<string, string> = {
    pj1: "framer-x6epao-container",
    pj2: "framer-r9fiij-container",
    pj3: "framer-1x5iykb-container",
    pj4: "framer-nfc599-container",
  };

  const containerClass = containerClassMap[data.id] || "framer-18wve3s";
  const numberContainerClass = numberContainerClassMap[data.id] || "framer-4y8o6z";
  const numberInnerClass = numberInnerClassMap[data.id] || "framer-pt1129";
  const numberSvgContainerClass = numberSvgContainerClassMap[data.id] || "framer-1crst57-container";
  const numberTextClass = numberTextClassMap[data.id] || "framer-qzezvq";
  const lineClass = lineClassMap[data.id] || "framer-jlsvtj";
  const contentOuterClass = contentOuterClassMap[data.id] || "framer-j7hiuq";
  const contentInnerClass = contentInnerClassMap[data.id] || "framer-1h5ehf4";
  const desktopContainerClass = desktopContainerClassMap[data.id] || "framer-x6epao-container";

  // Render Inner Card content for a given variant (desktop, tablet, mobile)
  const renderCardContent = (variantClass: string) => (
    <div
      className={`framer-uaooh framer-NkuHG framer-VBAiE framer-SwHTo framer-erhBl framer-17joz88 ${variantClass}`}
      data-framer-name={variantClass.includes("y0jxmb") ? "Tablet" : variantClass.includes("1y8p46f") ? "Mobile" : "Desktop"}
      style={{ backgroundColor: currentTheme.bgColor, height: variantClass.includes("1y8p46f") ? undefined : "100%", width: "100%" }}
    >
      <div className="framer-1iqx81u" data-framer-name="Fix Color" style={{ backgroundColor: currentTheme.bgColor }} />
      <div className="framer-zqpo5p" data-framer-name="Content">
        <div className="framer-tf09wj" data-framer-name="Text" style={{ willChange: "transform", opacity: "1", transform: "none" }}>
          <div className="framer-clg0ld" data-framer-name="Text">
            <div className="framer-97t7mi" data-framer-name="Text + date">
              {data.date && (
                <div className="framer-w5n1wd" data-framer-name="Date">
                  <div
                    className="framer-1tdrzuz"
                    style={{
                      backgroundColor: currentTheme.dateBg,
                      borderBottomLeftRadius: "8px",
                      borderBottomRightRadius: "8px",
                      borderTopLeftRadius: "8px",
                      borderTopRightRadius: "8px",
                    }}
                  />
                  <div
                    className="framer-jg01a3"
                    data-framer-component-type="RichTextContainer"
                    style={
                      {
                        "--extracted-r6o4lv": currentTheme.dateText,
                        "--variable-reference-JDs6Ey0E7-vqnJudyFq": currentTheme.dateText,
                        transform: "none",
                      } as React.CSSProperties
                    }
                  >
                    <p
                      className="framer-text framer-styles-preset-27ku3y"
                      data-styles-preset="MffBJovlA"
                      dir="auto"
                      style={
                        {
                          "--framer-text-alignment": "left",
                          "--framer-text-color": currentTheme.dateText,
                        } as React.CSSProperties
                      }
                    >
                      {data.date}
                    </p>
                  </div>
                </div>
              )}

              {/* Title with letter animations */}
              <div
                className="framer-ce3686"
                data-framer-component-type="RichTextContainer"
                style={
                  {
                    "--extracted-a0htzi": currentTheme.textColor,
                    "--framer-link-text-color": "rgb(0, 153, 255)",
                    "--framer-link-text-decoration": "underline",
                    "--variable-reference-JDs6Ey0E7-vqnJudyFq": currentTheme.textColor,
                    transform: "none",
                  } as React.CSSProperties
                }
              >
                <h3
                  className="framer-text framer-styles-preset-16swsjh"
                  data-styles-preset="G6r9h69Ct"
                  dir="auto"
                  style={
                    {
                      "--framer-text-color": currentTheme.textColor,
                    } as React.CSSProperties
                  }
                >
                  {renderAnimatedText(data.title)}
                </h3>
              </div>
            </div>

            {/* Description with word/letter animations */}
            <div
              className="framer-4rnzul"
              data-framer-component-type="RichTextContainer"
              style={
                {
                  "--extracted-r6o4lv": currentTheme.textColor,
                  "--variable-reference-JDs6Ey0E7-vqnJudyFq": currentTheme.textColor,
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
                    "--framer-text-alignment": "left",
                    "--framer-text-color": currentTheme.textColor,
                  } as React.CSSProperties
                }
              >
                {renderAnimatedText(data.description)}
              </p>
            </div>
          </div>

          {/* Action Button: View Project */}
          <div className="framer-1nmyz7r-container">
            <Suspense fallback={null}>
              {currentTheme.buttonType === "white" ? (
                <a
                  className="framer-YVcpB framer-NkuHG framer-9o7ndm framer-v-kxlijb framer-11o3b02"
                  data-border="true"
                  data-framer-name="White Button"
                  data-highlight="true"
                  href={data.href}
                  tabIndex={0}
                  style={
                    {
                      "--border-bottom-width": "1px",
                      "--border-color": "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))",
                      "--border-left-width": "0px",
                      "--border-right-width": "0px",
                      "--border-style": "solid",
                      "--border-top-width": "0px",
                      backgroundColor: "rgba(0, 0, 0, 0)",
                    } as React.CSSProperties
                  }
                >
                  <div className="framer-ijnmpo-container" data-code-component-plugin-id="84d4c1" style={{ transform: "rotate(-45deg)" }}>
                    <Suspense fallback={null}>
                      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                        <svg width="100%" height="100%" viewBox="0 0 24 24" fill="var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3.99984 13.0001L3.99984 11.0001L15.9998 11.0001L10.4998 5.50008L11.9198 4.08008L19.8398 12.0001L11.9198 19.9201L10.4998 18.5001L15.9998 13.0001L3.99984 13.0001Z" fill="var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))" />
                        </svg>
                      </div>
                    </Suspense>
                  </div>
                  <div className="framer-ar7qgq" data-framer-component-type="RichTextContainer" style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" } as React.CSSProperties}>
                    <p className="framer-text framer-styles-preset-27ku3y" data-styles-preset="MffBJovlA" dir="auto" style={{ "--framer-text-color": "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))" } as React.CSSProperties}>
                      {"View Project"}
                    </p>
                  </div>
                </a>
              ) : (
                <a
                  className="framer-YVcpB framer-NkuHG framer-9o7ndm framer-v-11ob9oj framer-11o3b02"
                  data-border="true"
                  data-framer-name="Dark Button"
                  data-highlight="true"
                  href={data.href}
                  tabIndex={0}
                  style={
                    {
                      "--border-bottom-width": "1px",
                      "--border-color": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))",
                      "--border-left-width": "0px",
                      "--border-right-width": "0px",
                      "--border-style": "solid",
                      "--border-top-width": "0px",
                      backgroundColor: "rgba(0, 0, 0, 0)",
                    } as React.CSSProperties
                  }
                >
                  <div className="framer-ijnmpo-container" data-code-component-plugin-id="84d4c1" style={{ transform: "rotate(-45deg)" }}>
                    <Suspense fallback={null}>
                      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                        <svg width="100%" height="100%" viewBox="0 0 24 24" fill="var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3.99984 13.0001L3.99984 11.0001L15.9998 11.0001L10.4998 5.50008L11.9198 4.08008L19.8398 12.0001L11.9198 19.9201L10.4998 18.5001L15.9998 13.0001L3.99984 13.0001Z" fill="var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))" />
                        </svg>
                      </div>
                    </Suspense>
                  </div>
                  <div className="framer-ar7qgq" data-framer-component-type="RichTextContainer" style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" } as React.CSSProperties}>
                    <p className="framer-text framer-styles-preset-27ku3y" data-styles-preset="MffBJovlA" dir="auto">
                      {"View Project"}
                    </p>
                  </div>
                </a>
              )}
            </Suspense>
          </div>
        </div>

        {/* Project Tags */}
        <div className="framer-jethw" data-framer-name="Tags">
          {data.tags.map((tag, idx) => (
            <div key={idx} className={idx === 0 ? "framer-1ox4haq-container" : "framer-6wop43-container"}>
              <div className="framer-6Zk6H framer-erhBl framer-gdwy14 framer-v-gdwy14" data-framer-name="Default">
                <div className="framer-30fysw">
                  <div className="framer-ma96le" data-framer-name="Frame" style={{ backgroundColor: currentTheme.tagBg }} />
                  <div className="framer-5AqzK framer-udsone" style={{ "--omwlqg": currentTheme.tagBg } as React.CSSProperties} />
                </div>
                <div className="framer-evvvbg" data-framer-name="Content" style={{ backgroundColor: currentTheme.tagBg }}>
                  <div className="framer-s1tccs" data-framer-component-type="RichTextContainer" style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" } as React.CSSProperties}>
                    <p className="framer-text framer-styles-preset-1833qg6" data-styles-preset="jB2nPzqr7" dir="auto" style={{ "--framer-text-color": currentTheme.tagText } as React.CSSProperties}>
                      {tag}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Image & Decorative Borders */}
      <div className="framer-f233jw" data-framer-name="IMG">
        <div className="framer-186ax1i" data-framer-name="Image">
          <div className="framer-25tfn4" data-framer-name="Image">
            <div style={{ position: "absolute", borderRadius: "inherit", top: "0", right: "0", bottom: "0", left: "0" }} data-framer-background-image-wrapper="true">
              <img
                decoding="async"
                width="2400"
                height="1603"
                sizes="(min-width: 1200px) max((max(min(100vw - 200px, 1800px), 1px) - 32px) / 2, 1px), (min-width: 810px) and (max-width: 1199.98px) max((max(min(100vw - 80px, 1800px), 1px) - 32px) / 2, 1px), (max-width: 809.98px) calc(max(min(100vw - 32px, 1800px), 1px) - 32px)"
                srcSet={data.imageSrcSet}
                src={data.imageSrc}
                alt={data.imageAlt || data.title}
                style={{ display: "block", width: "100%", height: "100%", borderRadius: "inherit", objectPosition: "center", objectFit: "cover" }}
                loading="lazy"
              />
            </div>
            <div className="framer-nlfnxy" data-framer-name="Border">
              <div className="framer-2wtkhw" data-border="true" style={{ "--border-bottom-width": "2px", "--border-color": currentTheme.borderColor, "--border-left-width": "2px", "--border-right-width": "2px", "--border-style": "solid", "--border-top-width": "2px", backgroundColor: currentTheme.bgColor } as React.CSSProperties} />
              <div className="framer-17azylh" data-border="true" style={{ "--border-bottom-width": "2px", "--border-color": currentTheme.borderColor, "--border-left-width": "2px", "--border-right-width": "2px", "--border-style": "solid", "--border-top-width": "2px", backgroundColor: currentTheme.bgColor } as React.CSSProperties} />
              <div className="framer-pzbn2t" data-border="true" style={{ "--border-bottom-width": "2px", "--border-color": currentTheme.borderColor, "--border-left-width": "2px", "--border-right-width": "2px", "--border-style": "solid", "--border-top-width": "2px", backgroundColor: currentTheme.bgColor } as React.CSSProperties} />
              <div className="framer-1a84a36" data-border="true" style={{ "--border-bottom-width": "2px", "--border-color": currentTheme.borderColor, "--border-left-width": "2px", "--border-right-width": "2px", "--border-style": "solid", "--border-top-width": "2px", backgroundColor: currentTheme.bgColor } as React.CSSProperties} />
              <div className="framer-sa2o8o" data-border="true" data-framer-name="border" style={{ "--border-bottom-width": "2px", "--border-color": currentTheme.borderColor, "--border-left-width": "2px", "--border-right-width": "2px", "--border-style": "solid", "--border-top-width": "2px" } as React.CSSProperties} />
            </div>
            <div className="framer-4g5dgx" style={{ backgroundColor: currentTheme.cornerBadgeBg }}>
              <div className="framer-jar8ki-container" data-code-component-plugin-id="84d4c1">
                <Suspense fallback={null}>
                  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                    <svg width="100%" height="100%" viewBox="0 0 23 23" fill={currentTheme.cornerBadgeFill} xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.7334 12.2667H11.5001C11.7034 12.2667 11.8984 12.186 12.0422 12.0422C12.186 11.8984 12.2667 11.7034 12.2667 11.5001C12.2667 11.2967 12.186 11.1017 12.0422 10.958C11.8984 10.8142 11.7034 10.7334 11.5001 10.7334H10.7334V12.2667Z" fill={currentTheme.cornerBadgeFill} />
                      <path fillRule="evenodd" clipRule="evenodd" d="M1.5332 2.3C1.5332 1.69 1.77552 1.10499 2.20686 0.673654C2.63819 0.242321 3.22321 0 3.8332 0L16.4173 0L21.4665 5.04927V20.7C21.4665 21.31 21.2242 21.895 20.7929 22.3263C20.3615 22.7577 19.7765 23 19.1665 23H3.8332C3.22321 23 2.63819 22.7577 2.20686 22.3263C1.77552 21.895 1.5332 21.31 1.5332 20.7V2.3ZM6.1332 10.7333H3.06654V9.2H7.66654V16.8667H3.06654V13.8H4.59987V15.3333H6.1332V10.7333ZM9.19987 9.2H11.4999C12.1099 9.2 12.6949 9.44232 13.1262 9.87365C13.5575 10.305 13.7999 10.89 13.7999 11.5C13.7999 12.11 13.5575 12.695 13.1262 13.1263C12.6949 13.5577 12.1099 13.8 11.4999 13.8H10.7332V16.8667H9.19987V9.2ZM15.3332 9.2H19.9332V10.7333H16.8665V15.3333H18.3999V13.0333H19.9332V16.8667H15.3332V9.2Z" fill={currentTheme.cornerBadgeFill} />
                    </svg>
                  </div>
                </Suspense>
              </div>
              <div className="framer-nzuz47" data-framer-component-type="RichTextContainer" style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "none" } as React.CSSProperties}>
                <p className="framer-text framer-styles-preset-1833qg6" data-styles-preset="jB2nPzqr7" dir="auto" style={{ "--framer-text-color": currentTheme.cornerBadgeFill } as React.CSSProperties}>
                  {"Image.jpg"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`${containerClass} draft1-project-item ${props.className || ""}`} data-framer-name={`Project ${data.projectNumber.replace("project 0", "")}`} id={data.id}>
      {/* Project Number Indicator */}
      <div className={numberContainerClass} data-framer-name="Number">
        {(data.id === "pj3" || data.id === "pj4") && (
          <div className="framer-1u06bnp hidden-7h10me" data-framer-name="20% Space" />
        )}
        {(data.id === "pj2" || data.id === "pj3" || data.id === "pj4") && (
          <div className={`framer-tOfnx ${data.id === "pj2" ? "framer-1wgs5fj" : data.id === "pj3" ? "framer-skepkl" : "framer-6w51yr"} hidden-7h10me`} />
        )}
        <div className={numberInnerClass} data-framer-name="Project Number">
          <div className={`${numberSvgContainerClass} hidden-6kqop5 hidden-7h10me`} data-code-component-plugin-id="84d4c1">
            <Suspense fallback={null}>
              <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                <svg width="100%" height="100%" viewBox="0 0 357 357" fill={currentTheme.numFill} xmlns="http://www.w3.org/2000/svg">
                  <path d="M356.35 0H237.566V118.783H118.783V237.566H0V356.35H356.35V0Z" fill={currentTheme.numFill} />
                </svg>
              </div>
            </Suspense>
          </div>
          <div className={numberTextClass} data-framer-component-type="RichTextContainer" style={{ transform: "none" }}>
            <p className="framer-text framer-styles-preset-1833qg6" data-styles-preset="jB2nPzqr7" dir="auto" style={{ "--framer-text-color": currentTheme.numTextFill } as React.CSSProperties}>
              {data.projectNumber}
            </p>
          </div>
        </div>
        <div className={`framer-5AqzK ${lineClass}`} />
      </div>

      {/* Project Card Content (Desktop / Tablet / Mobile variants) */}
      <div className={contentOuterClass}>
        <Suspense fallback={null}>
          <div className={contentInnerClass}>
            <Suspense fallback={null}>
              {/* Desktop Breakpoint */}
              <div className="ssr-variant hidden-6kqop5 hidden-7h10me">
                <div className={desktopContainerClass}>
                  {renderCardContent("framer-v-17joz88")}
                </div>
              </div>

              {/* Tablet Breakpoint */}
              <div className="ssr-variant hidden-s8d5gr hidden-7h10me">
                <div className={desktopContainerClass}>
                  {renderCardContent("framer-v-y0jxmb")}
                </div>
              </div>

              {/* Mobile Breakpoint */}
              <div className="ssr-variant hidden-s8d5gr hidden-6kqop5">
                <div className={desktopContainerClass}>
                  {renderCardContent("framer-v-1y8p46f")}
                </div>
              </div>
            </Suspense>
          </div>
        </Suspense>
      </div>
    </div>
  );
}
