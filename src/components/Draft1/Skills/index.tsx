import React, { Suspense } from "react";

export interface SkillItem {
  name: string;
  category?: string;
  theme?: "default" | "dark" | "blue" | "cyan" | "orange" | "pink" | "mint" | "yellow";
}

export interface SkillsProps {
  skills?: (SkillItem | string)[];
  title?: string;
  className?: string;
  children?: React.ReactNode;
}

// 4 portfolio skills and specializations
export const DEFAULT_SKILLS: SkillItem[] = [
  { name: "Research", theme: "pink" },
  { name: "Wireframes", theme: "yellow" },
  { name: "Prototypes", theme: "mint" },
  { name: "UI Design", theme: "blue" },
];

/**
 * Draft 1 Skills Component
 * Preserves the exact Nudge Framer design language, interactive animation icons,
 * hover states, colored pill badges, and responsive wrapping behavior.
 */
export default function Skills({
  skills = DEFAULT_SKILLS,
  title,
  className = "",
  children,
}: SkillsProps) {
  if (children) {
    return <section className={`draft1-skills ${className}`}>{children}</section>;
  }

  // Normalize skills array into SkillItem objects
  const normalizedSkills: SkillItem[] = skills.map((s, idx) => {
    if (typeof s === "string") {
      const defaultMatch = DEFAULT_SKILLS.find((d) => d.name.toLowerCase() === s.toLowerCase());
      return defaultMatch || { name: s, theme: DEFAULT_SKILLS[idx % DEFAULT_SKILLS.length].theme };
    }
    return s;
  });

  const getThemeStyle = (theme?: string) => {
    switch (theme) {
      case "blue":
        return {
          backgroundColor: "var(--token-1892785e-8581-4826-b411-015017430ad3, rgb(0, 94, 217))",
          textColor: "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))",
        };
      case "dark":
        return {
          backgroundColor: "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))",
          textColor: "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))",
        };
      case "cyan":
        return {
          backgroundColor: "var(--token-a40bc7b7-fed8-4930-b9f7-5dc39bc097a2, rgb(164, 229, 248))",
          textColor: "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))",
        };
      case "orange":
        return {
          backgroundColor: "var(--token-29f9695a-09e2-4c55-ace7-e9873233e207, rgb(254, 161, 37))",
          textColor: "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))",
        };
      case "pink":
        return {
          backgroundColor: "var(--token-e22e0fe6-83a6-4381-a625-c6f173619c49, rgb(230, 57, 155))",
          textColor: "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))",
        };
      case "mint":
        return {
          backgroundColor: "var(--token-3b25897c-a78c-4fb0-9a93-831975a769c1, rgb(161, 223, 197))",
          textColor: "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))",
        };
      case "yellow":
        return {
          backgroundColor: "var(--token-cd9da077-16e0-46f3-9a80-6bf4c2a79928, rgb(245, 221, 161))",
          textColor: "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))",
        };
      case "default":
      default:
        return {
          backgroundColor: "var(--token-341b58e0-d728-43ce-a1dc-e77a522cab4f, rgb(255, 255, 255))",
          textColor: "var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))",
        };
    }
  };

  return (
    <div className={`draft1-skills ${className}`}>
      {title && (
        <div className="framer-1qxp96" data-framer-name="Decoration" style={{ marginBottom: "24px" }}>
          <div className="framer-372ism" data-framer-component-type="RichTextContainer">
            <h3 className="framer-text framer-styles-preset-1o05o96" data-styles-preset="H8WdmyHet" dir="auto">
              {title}
            </h3>
          </div>
        </div>
      )}

      {/* Interactive Tag List with Nudge Animation Badges */}
      <div className="framer-1btv9kp" data-framer-name="List Tag">
        {normalizedSkills.map((skill, index) => {
          const { backgroundColor, textColor } = getThemeStyle(skill.theme);

          return (
            <React.Fragment key={index}>
              {/* Skill Badge */}
              <div
                className="framer-54pl82"
                data-framer-name="Tag"
                style={{ backgroundColor }}
              >
                <div className="framer-31wgst" data-framer-component-type="RichTextContainer" style={{ transform: "none" }}>
                  <h4
                    className="framer-text framer-styles-preset-jjv5nu"
                    data-styles-preset="TI_CAjGBM"
                    dir="auto"
                    style={{ "--framer-text-color": textColor } as React.CSSProperties}
                  >
                    {skill.name}
                  </h4>
                </div>
              </div>

              {/* Interspersed Nudge Interactive Icons */}
              {index === 0 && (
                <div className="framer-ge2k9a" data-border="true" data-framer-name="Icon">
                  <Suspense fallback={null}>
                    <div className="framer-14tvjdo" data-framer-name="Interactive" style={{ transform: "translate(-50%, -50%)" }} />
                  </Suspense>
                </div>
              )}

              {index === 2 && (
                <div className="framer-4njtx0" data-framer-name="Icon">
                  <div className="framer-nkhlih" data-framer-name="Interactive">
                    <Suspense fallback={null}>
                      <div className="framer-1rci139" data-framer-name="Prototype animate" style={{ transform: "translate(-50%, -50%)" }} />
                    </Suspense>
                    <div className="framer-fl9u67" />
                  </div>
                </div>
              )}

              {index === 4 && (
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
              )}

              {index === 6 && (
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
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
