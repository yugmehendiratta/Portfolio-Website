import React from "react";
import ProjectCard, { ProjectCardData } from "./ProjectCard";

export interface SelectedWorkProps {
  className?: string;
  projects?: ProjectCardData[];
  children?: React.ReactNode;
}

// Yug's 4 actual portfolio projects
export const DEFAULT_PORTFOLIO_PROJECTS: ProjectCardData[] = [
  {
    id: "pj1",
    projectNumber: "project 01",
    title: "ArkCV Builder",
    category: "AI Product / SaaS / UX",
    tags: ["AI Product", "SaaS", "UX"],
    description:
      "An AI-powered career platform that helps users create, analyze, improve, and optimize resumes and job applications.",
    date: "Mar 19, 2026",
    href: "./case-study/meridian-health",
    theme: "blue",
    imageSrc: "/assets/img/783ca641ce37d469.webp",
    imageSrcSet:
      "/assets/img/def7fcbbf9a18bac.webp 512w, /assets/img/60fbb70e12edcae6.webp 1024w, /assets/img/a38c616b6df6d929.webp 2048w, /assets/img/783ca641ce37d469.webp 2400w",
    imageAlt: "ArkCV Builder",
  },
  {
    id: "pj2",
    projectNumber: "project 02",
    title: "German With Jai",
    category: "EdTech / Product Design",
    tags: ["EdTech", "Product Design"],
    description:
      "A German language learning platform focused on structured learning, practice, and gamified experiences.",
    date: "Mar 2, 2026",
    href: "./case-study/stylebook",
    theme: "dark",
    imageSrc: "/assets/img/80c1e70ab2d02dbd.webp",
    imageSrcSet:
      "/assets/img/05cfc4d4fa7dfbc7.webp 512w, /assets/img/8c93540d9f4e24ef.webp 1024w, /assets/img/283fa714ff94e0ca.webp 2048w, /assets/img/80c1e70ab2d02dbd.webp 2400w",
    imageAlt: "German With Jai",
  },
  {
    id: "pj3",
    projectNumber: "project 03",
    title: "Swagatham",
    category: "E-commerce / UX Design",
    tags: ["E-commerce", "UX Design"],
    description:
      "An Asian grocery e-commerce experience designed for customers in Germany, with a focus on simple product discovery and shopping.",
    date: "Jan 2, 2025",
    href: "./case-study/homestead",
    theme: "orange",
    imageSrc: "/assets/img/67d45ff5e560331c.webp",
    imageSrcSet:
      "/assets/img/b8cb4e73dbb60ea2.webp 512w, /assets/img/0d5b5bc2f190e25a.webp 1024w, /assets/img/66fe0f27c62955f0.webp 2048w, /assets/img/67d45ff5e560331c.webp 2400w",
    imageAlt: "Swagatham",
  },
  {
    id: "pj4",
    projectNumber: "project 04",
    title: "CreatorHQ",
    category: "SaaS / Dashboard Design",
    tags: ["SaaS", "Dashboard Design"],
    description:
      "A social media analytics and management dashboard designed to make content performance and creator workflows easier to understand.",
    href: "./case-study/north-light",
    theme: "pink",
    imageSrc: "/assets/img/99d088f4c1f4750e.webp",
    imageSrcSet:
      "/assets/img/1cf84382607fa665.webp 512w, /assets/img/9254c46f6345fc53.webp 1024w, /assets/img/8cbddbe3478952a2.webp 2048w, /assets/img/99d088f4c1f4750e.webp 2400w",
    imageAlt: "CreatorHQ",
  },
];

/**
 * Draft 1 SelectedWork Component
 * Preserves the exact Nudge Framer design language, typography treatment, letter animations,
 * sticker decoration, and project card listing layout.
 */
export default function SelectedWork({
  className = "",
  projects = DEFAULT_PORTFOLIO_PROJECTS,
  children,
}: SelectedWorkProps) {
  if (children) {
    return <section className={`framer-19ielic draft1-selected-work ${className}`}>{children}</section>;
  }

  return (
    <section className={`framer-19ielic draft1-selected-work ${className}`} data-framer-name="Feature Works">
      <div className="framer-1mtxyy5" data-framer-name="Contain">
        {/* Section Heading */}
        <div className="framer-fjvh5z" data-framer-name="Heading">
          <div className="framer-14228ju" data-framer-name="Decoration">
            <div className="framer-pdnjr" data-framer-component-type="RichTextContainer" style={{ transform: "none" }}>
              <p className="framer-text framer-styles-preset-1o05o96" data-styles-preset="H8WdmyHet" dir="auto">
                {"explore my work!"}
              </p>
            </div>
            <div className="framer-YHfrK framer-142e6a3" />
          </div>

          {/* Large Title: FEATURED WORKS */}
          <div className="framer-1fufr37" data-framer-component-type="RichTextContainer" style={{ transform: "none" }}>
            <h2
              className="framer-text framer-styles-preset-k31no2"
              data-styles-preset="to1tng0Qo"
              dir="auto"
              style={
                {
                  "--framer-text-alignment": "center",
                  "--framer-text-color": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))",
                } as React.CSSProperties
              }
            >
              <span style={{ whiteSpace: "nowrap" }}>
                {["F", "E", "A", "T", "U", "R", "E", "D"].map((char, index) => (
                  <span
                    key={`feat-${index}`}
                    style={{
                      display: "inline-block",
                      opacity: "0.001",
                      transform: "translateX(40px) translateY(0px) scale(0.9) rotate(0deg) skewX(0deg) skewY(0deg)",
                    }}
                  >
                    {char}
                  </span>
                ))}
              </span>
              <br className="framer-text" />
              <span style={{ whiteSpace: "nowrap" }}>
                {["W", "O", "R", "K", "S"].map((char, index) => (
                  <span
                    key={`work-${index}`}
                    style={{
                      display: "inline-block",
                      opacity: "0.001",
                      transform: "translateX(40px) translateY(0px) scale(0.9) rotate(0deg) skewX(0deg) skewY(0deg)",
                    }}
                  >
                    {char}
                  </span>
                ))}
              </span>
            </h2>
          </div>

          {/* Subheading Quote Card */}
          <div className="ssr-variant">
            <div className="framer-1ud755h-container" style={{ transform: "rotate(-3deg)" }}>
              <div
                className="framer-6A3Mg framer-62fp8 framer-SwHTo framer-1sbsau2 framer-v-1gflzdq"
                data-framer-name="Only Content"
                style={{
                  backgroundColor: "var(--token-cd9da077-16e0-46f3-9a80-6bf4c2a79928, rgb(245, 221, 161))",
                  maxWidth: "100%",
                  width: "100%",
                }}
              >
                <div
                  className="framer-lbfqwd"
                  data-framer-component-type="RichTextContainer"
                  style={
                    {
                      "--extracted-r6o4lv": "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))",
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
                    {"This is a showcase of what happens when curiosity drives the process."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* List of Portfolio Project Cards */}
        <div className="framer-4io9df" data-framer-name="List Project">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

export { ProjectCard };
export type { ProjectCardData };
