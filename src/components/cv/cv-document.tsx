import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
import { ISkill, IProject, IContactInfo, ISocialLink } from "@/types";

interface CVDocumentProps {
  skills: ISkill[];
  projects: IProject[];
  contactInfo: IContactInfo | null;
  socialLinks: ISocialLink[];
}

const c = {
  primary: "#7c3aed",
  primaryMid: "#a78bfa",
  primaryLight: "#ede9fe",
  primarySoft: "#faf8ff",
  text: "#1e293b",
  textMid: "#334155",
  muted: "#64748b",
  subtle: "#94a3b8",
  border: "#e2e8f0",
  bgLight: "#f8fafc",
  white: "#ffffff",
};

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    backgroundColor: c.white,
    color: c.text,
    fontSize: 9,
    flexDirection: "column",
  },

  // ── Header ──────────────────────────────────────
  header: {
    backgroundColor: c.primary,
    paddingTop: 28,
    paddingBottom: 24,
    paddingLeft: 40,
    paddingRight: 40,
  },
  headerInner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerLeft: {
    flex: 1,
  },
  name: {
    fontSize: 26,
    fontFamily: "Helvetica-Bold",
    color: c.white,
    marginBottom: 3,
    letterSpacing: 0.3,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  titleText: {
    fontSize: 11,
    color: "#c4b5fd",
    letterSpacing: 0.4,
  },
  titleDot: {
    fontSize: 11,
    color: "#a78bfa",
    marginHorizontal: 6,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  contactSeparator: {
    fontSize: 8,
    color: "#6d4bb8",
    marginHorizontal: 8,
  },
  contactItem: {
    fontSize: 8,
    color: "#ddd6fe",
  },
  contactLink: {
    fontSize: 8,
    color: "#ddd6fe",
    textDecoration: "none",
  },

  // Accent line below header
  accentLine: {
    height: 3,
    backgroundColor: c.primaryMid,
  },

  // ── About strip ──────────────────────────────────
  aboutStrip: {
    backgroundColor: c.primarySoft,
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 40,
    paddingRight: 40,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  aboutText: {
    fontSize: 9,
    color: c.textMid,
    lineHeight: 1.75,
  },

  // ── Body ─────────────────────────────────────────
  body: {
    flexDirection: "row",
    flex: 1,
  },

  // Left column
  leftCol: {
    width: "36%",
    backgroundColor: c.bgLight,
    borderRightWidth: 1,
    borderRightColor: c.border,
    paddingTop: 22,
    paddingBottom: 22,
    paddingLeft: 24,
    paddingRight: 20,
  },

  // Right column
  rightCol: {
    flex: 1,
    paddingTop: 22,
    paddingBottom: 22,
    paddingLeft: 24,
    paddingRight: 36,
  },

  // ── Sections ─────────────────────────────────────
  section: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 6.5,
    fontFamily: "Helvetica-Bold",
    color: c.primary,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 10,
    paddingBottom: 6,
    borderBottomWidth: 1.5,
    borderBottomColor: c.primaryLight,
  },

  // ── Skills — flex-wrap tags (scales to any count) ─
  skillTagsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  skillTag: {
    backgroundColor: c.primaryLight,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 7,
    paddingRight: 7,
    borderRadius: 4,
    marginRight: 5,
    marginBottom: 5,
  },
  skillTagText: {
    fontSize: 7.5,
    color: "#5b21b6",
    fontFamily: "Helvetica-Bold",
  },
  skillTagPct: {
    fontSize: 6.5,
    color: c.primary,
  },

  // ── Links ─────────────────────────────────────────
  linkItem: {
    marginBottom: 8,
  },
  linkPlatform: {
    fontSize: 6.5,
    color: c.subtle,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 2,
  },
  linkUrl: {
    fontSize: 8,
    color: c.primary,
    textDecoration: "none",
  },

  // ── Projects ─────────────────────────────────────
  projectCard: {
    marginBottom: 14,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
    paddingLeft: 10,
    borderLeftWidth: 2.5,
    borderLeftColor: c.primaryMid,
  },
  projectCardLast: {
    paddingLeft: 10,
    borderLeftWidth: 2.5,
    borderLeftColor: c.primaryMid,
  },
  projectHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  projectTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: c.text,
    flex: 1,
  },
  projectBadge: {
    fontSize: 6.5,
    color: c.primary,
    backgroundColor: c.primaryLight,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 6,
    paddingRight: 6,
    borderRadius: 10,
  },
  projectDesc: {
    fontSize: 8.5,
    color: c.muted,
    lineHeight: 1.6,
    marginBottom: 6,
  },
  techRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 5,
  },
  techBadge: {
    fontSize: 6.5,
    color: c.muted,
    backgroundColor: c.border,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 3,
    marginRight: 4,
    marginBottom: 3,
  },
  projectLinksRow: {
    flexDirection: "row",
  },
  projectLink: {
    fontSize: 7.5,
    color: c.primary,
    textDecoration: "none",
    marginRight: 12,
    fontFamily: "Helvetica-Bold",
  },

  // ── Footer ───────────────────────────────────────
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 9,
    paddingBottom: 9,
    paddingLeft: 40,
    paddingRight: 40,
    backgroundColor: c.primarySoft,
    borderTopWidth: 1,
    borderTopColor: c.border,
  },
  footerLeft: {
    fontSize: 7,
    color: c.subtle,
  },
  footerRight: {
    fontSize: 7,
    color: c.subtle,
  },
});

export const CVDocument = ({
  skills,
  projects,
  contactInfo,
  socialLinks,
}: CVDocumentProps) => {
  const githubLink = socialLinks.find((s) =>
    s.platform.toLowerCase().includes("github"),
  );
  const linkedinLink = socialLinks.find((s) =>
    s.platform.toLowerCase().includes("linkedin"),
  );

  const displayedProjects = projects.slice(0, 4);

  const contactItems: { label: string; href?: string }[] = [];
  if (contactInfo?.email)
    contactItems.push({ label: contactInfo.email, href: `mailto:${contactInfo.email}` });
  if (contactInfo?.phone) contactItems.push({ label: contactInfo.phone });
  if (contactInfo?.address) contactItems.push({ label: contactInfo.address });
  if (githubLink) contactItems.push({ label: "github.com/parfaitBashombe", href: githubLink.url });
  if (linkedinLink) contactItems.push({ label: "LinkedIn", href: linkedinLink.url });

  return (
    <Document
      title="Parfait Bashombe — CV"
      author="Parfait Bashombe"
      subject="Fullstack Developer specialized in Front-End"
    >
      <Page size="A4" style={styles.page}>
        {/* ── Header ── */}
        <View style={styles.header}>
          <View style={styles.headerInner}>
            <View style={styles.headerLeft}>
              <Text style={styles.name}>Parfait Bashombe</Text>
              <View style={styles.titleRow}>
                <Text style={styles.titleText}>Fullstack Developer</Text>
                <Text style={styles.titleDot}>·</Text>
                <Text style={styles.titleText}>Front-End Specialist</Text>
              </View>

              {/* Contact row with separators */}
              <View style={styles.contactRow}>
                {contactItems.map((item, i) => (
                  <View key={i} style={{ flexDirection: "row", alignItems: "center" }}>
                    {i > 0 && (
                      <Text style={styles.contactSeparator}>|</Text>
                    )}
                    {item.href ? (
                      <Link src={item.href} style={styles.contactLink}>
                        {item.label}
                      </Link>
                    ) : (
                      <Text style={styles.contactItem}>{item.label}</Text>
                    )}
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Purple accent line */}
        <View style={styles.accentLine} />

        {/* ── About strip (full width) ── */}
        <View style={styles.aboutStrip}>
          <Text style={styles.aboutText}>
            Fullstack developer with a strong specialization in front-end engineering. With 3+ years of
            experience, I build complete web applications — solid back-end APIs paired with polished,
            responsive interfaces that users love. My stack includes Next.js, React, TypeScript, Tailwind
            CSS, Node.js, Express, and Supabase.
          </Text>
        </View>

        {/* ── Two-column body ── */}
        <View style={styles.body}>
          {/* Left column */}
          <View style={styles.leftCol}>
            {/* Skills — flex-wrap tags: scales to any number of skills */}
            {skills.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionLabel}>Technical Skills</Text>
                <View style={styles.skillTagsWrap}>
                  {skills.map((skill) => (
                    <View key={skill.id} style={styles.skillTag}>
                      <Text style={styles.skillTagText}>{skill.name}</Text>
                      <Text style={styles.skillTagPct}> {skill.proficiency}%</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Links */}
            {socialLinks.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionLabel}>Links</Text>
                {socialLinks.map((social) => (
                  <View key={social.id} style={styles.linkItem}>
                    <Text style={styles.linkPlatform}>{social.platform}</Text>
                    <Link src={social.url} style={styles.linkUrl}>
                      {social.url.replace(/^https?:\/\/(www\.)?/, "")}
                    </Link>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Right column */}
          <View style={styles.rightCol}>
            {displayedProjects.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionLabel}>Featured Projects</Text>
                {displayedProjects.map((project, i) => (
                  <View
                    key={project.id}
                    style={
                      i < displayedProjects.length - 1
                        ? styles.projectCard
                        : styles.projectCardLast
                    }
                  >
                    <View style={styles.projectHeader}>
                      <Text style={styles.projectTitle}>{project.title}</Text>
                      {project.category && (
                        <Text style={styles.projectBadge}>{project.category}</Text>
                      )}
                    </View>

                    <Text style={styles.projectDesc}>{project.description}</Text>

                    {project.technologies?.length > 0 && (
                      <View style={styles.techRow}>
                        {project.technologies.slice(0, 6).map((tech) => (
                          <Text key={tech} style={styles.techBadge}>
                            {tech}
                          </Text>
                        ))}
                        {project.technologies.length > 6 && (
                          <Text style={styles.techBadge}>
                            +{project.technologies.length - 6}
                          </Text>
                        )}
                      </View>
                    )}

                    {(project.github || project.live) && (
                      <View style={styles.projectLinksRow}>
                        {project.github && (
                          <Link src={project.github} style={styles.projectLink}>
                            GitHub
                          </Link>
                        )}
                        {project.live && (
                          <Link src={project.live} style={styles.projectLink}>
                            Live Demo
                          </Link>
                        )}
                      </View>
                    )}
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* ── Footer ── */}
        <View style={styles.footer}>
          <Text style={styles.footerLeft}>
            Parfait Bashombe · Fullstack Developer · Front-End Specialist
          </Text>
          <Text style={styles.footerRight}>
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </Text>
        </View>
      </Page>
    </Document>
  );
};
