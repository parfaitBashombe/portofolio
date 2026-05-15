import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Link,
  Image,
} from "@react-pdf/renderer";
import { ISkill, IProject, IContactInfo, ISocialLink } from "@/types";

interface CVDocumentProps {
  skills: ISkill[];
  projects: IProject[];
  contactInfo: IContactInfo | null;
  socialLinks: ISocialLink[];
  avatarDataUrl?: string | null;
}

const c = {
  primary: "#5b21b6",
  primaryBright: "#7c3aed",
  primaryMid: "#a78bfa",
  primaryLight: "#ede9fe",
  primarySoft: "#f5f3ff",
  text: "#0f172a",
  textMid: "#1e293b",
  muted: "#475569",
  subtle: "#94a3b8",
  border: "#e2e8f0",
  borderLight: "#f1f5f9",
  bgLeft: "#faf9ff",
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

  // ── Header ─────────────────────────────────────────────
  header: {
    backgroundColor: c.primary,
    paddingTop: 26,
    paddingBottom: 20,
    paddingLeft: 38,
    paddingRight: 38,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerLeft: { flex: 1 },
  headerRight: {
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 4,
    gap: 10,
  },
  avatar: {
    width: 66,
    height: 66,
    borderRadius: 33,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
  },
  name: {
    fontSize: 26,
    fontFamily: "Helvetica-Bold",
    color: c.white,
    marginBottom: 4,
    letterSpacing: 0.4,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  titleText: { fontSize: 10, color: "#c4b5fd", letterSpacing: 0.3 },
  titleDot: { fontSize: 10, color: "#a78bfa", marginHorizontal: 6 },
  availableBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.12)",
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  availableDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#4ade80",
    marginRight: 5,
  },
  availableText: {
    fontSize: 7.5,
    color: "#bbf7d0",
    fontFamily: "Helvetica-Bold",
    letterSpacing: 0.5,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  contactItem: { fontSize: 8, color: "#ddd6fe" },
  contactLink: { fontSize: 8, color: "#ddd6fe", textDecoration: "none" },
  contactSep: { fontSize: 8, color: "#7c3aed", marginHorizontal: 7 },

  // ── Accent line ────────────────────────────────────────
  accentLine: { height: 3, backgroundColor: c.primaryMid },

  // ── Profile strip ──────────────────────────────────────
  profileStrip: {
    backgroundColor: c.primarySoft,
    paddingTop: 11,
    paddingBottom: 11,
    paddingLeft: 38,
    paddingRight: 38,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  profileLabel: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    color: c.primaryBright,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  profileText: {
    fontSize: 8.5,
    color: c.textMid,
    lineHeight: 1.65,
  },

  // ── Body ───────────────────────────────────────────────
  body: { flexDirection: "row", flex: 1 },

  leftCol: {
    width: "36%",
    backgroundColor: c.bgLeft,
    borderRightWidth: 1,
    borderRightColor: c.border,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 20,
    paddingRight: 16,
  },
  rightCol: {
    flex: 1,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 20,
    paddingRight: 32,
  },

  // ── Sections ───────────────────────────────────────────
  section: { marginBottom: 14 },
  sectionLabel: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    color: c.primaryBright,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 8,
    paddingBottom: 4,
    borderBottomWidth: 1.5,
    borderBottomColor: c.primaryLight,
  },

  // ── Skills — 2-column pill grid ────────────────────────
  skillGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  skillPill: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 10,
    marginBottom: 6,
  },
  skillName: {
    fontSize: 8,
    color: c.textMid,
    fontFamily: "Helvetica-Bold",
    flex: 1,
  },
  skillPct: {
    fontSize: 7.5,
    color: c.primaryBright,
    fontFamily: "Helvetica-Bold",
    marginLeft: 4,
  },

  // ── Bullets ────────────────────────────────────────────
  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  bulletArrow: {
    fontSize: 7.5,
    color: c.primaryBright,
    marginRight: 5,
    marginTop: 0.5,
  },
  bulletText: {
    fontSize: 8,
    color: c.muted,
    lineHeight: 1.5,
    flex: 1,
  },

  // ── Links ─────────────────────────────────────────────
  linkItem: { marginBottom: 8 },
  linkPlatform: {
    fontSize: 7,
    color: c.subtle,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 2,
  },
  linkUrl: {
    fontSize: 8,
    color: c.primaryBright,
    textDecoration: "none",
  },

  // ── Right col body text ────────────────────────────────
  bodyText: {
    fontSize: 8.5,
    color: c.muted,
    lineHeight: 1.65,
    marginBottom: 7,
  },

  // ── Projects ──────────────────────────────────────────
  projectCard: {
    marginBottom: 9,
    paddingBottom: 9,
    paddingLeft: 9,
    borderLeftWidth: 2,
    borderLeftColor: c.primaryMid,
    borderBottomWidth: 1,
    borderBottomColor: c.borderLight,
  },
  projectCardLast: {
    marginBottom: 9,
    paddingLeft: 9,
    borderLeftWidth: 2,
    borderLeftColor: c.primaryMid,
  },
  projectHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
  },
  projectTitle: {
    fontSize: 9.5,
    fontFamily: "Helvetica-Bold",
    color: c.textMid,
    flex: 1,
  },
  projectBadge: {
    fontSize: 7,
    color: c.primaryBright,
    backgroundColor: c.primaryLight,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 6,
    paddingRight: 6,
    borderRadius: 10,
  },
  projectDesc: {
    fontSize: 8,
    color: c.muted,
    lineHeight: 1.55,
    marginBottom: 5,
  },
  techRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  techBadge: {
    fontSize: 7,
    color: c.muted,
    backgroundColor: c.borderLight,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 3,
  },

  // ── Portfolio CTA ─────────────────────────────────────
  portfolioCta: {
    backgroundColor: c.primarySoft,
    borderWidth: 1,
    borderColor: c.primaryLight,
    borderRadius: 5,
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  ctaText: { fontSize: 8, color: c.muted, marginRight: 4 },
  ctaLink: {
    fontSize: 8,
    color: c.primaryBright,
    fontFamily: "Helvetica-Bold",
    textDecoration: "none",
  },

  // ── Footer ────────────────────────────────────────────
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 38,
    paddingRight: 38,
    backgroundColor: c.primarySoft,
    borderTopWidth: 1,
    borderTopColor: c.border,
  },
  footerLeft: { fontSize: 7.5, color: c.subtle },
  footerRight: { fontSize: 7.5, color: c.subtle },
});

const specializations = [
  "React & Next.js application architecture",
  "TypeScript — strict, type-safe codebases",
  "REST API design with Node.js & Express",
  "Database modeling with Supabase & PostgreSQL",
  "Responsive UI, smooth animations & accessibility",
  "Full-stack feature delivery end-to-end",
];

const whatIBuild = [
  "Production-grade web apps from back-end to polished UI",
  "RESTful APIs with authentication & Zod validation",
  "Interactive, animated front-ends with Framer Motion",
  "Admin dashboards and content management systems",
  "SEO-optimised, performance-first Next.js applications",
];

export const CVDocument = ({
  skills,
  projects,
  contactInfo,
  socialLinks,
  avatarDataUrl,
}: CVDocumentProps) => {
  const githubLink = socialLinks.find((s) =>
    s.platform.toLowerCase().includes("github"),
  );
  const linkedinLink = socialLinks.find((s) =>
    s.platform.toLowerCase().includes("linkedin"),
  );

  const displayedProjects = projects.slice(0, 3);

  const contactItems: { label: string; href?: string }[] = [];
  if (contactInfo?.email)
    contactItems.push({
      label: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
    });
  if (contactInfo?.phone) contactItems.push({ label: contactInfo.phone });
  if (contactInfo?.address) contactItems.push({ label: contactInfo.address });
  if (githubLink)
    contactItems.push({
      label: "github.com/parfaitBashombe",
      href: githubLink.url,
    });
  if (linkedinLink)
    contactItems.push({ label: "LinkedIn", href: linkedinLink.url });

  return (
    <Document
      title="Parfait Bashombe — CV"
      author="Parfait Bashombe"
      subject="Fullstack Developer specialized in Front-End"
    >
      <Page size="A4" style={styles.page}>
        {/* ── Header ── */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.name}>Parfait Bashombe</Text>
            <View style={styles.titleRow}>
              <Text style={styles.titleText}>Fullstack Developer</Text>
              <Text style={styles.titleDot}>·</Text>
              <Text style={styles.titleText}>Front-End Specialist</Text>
            </View>
            <View style={styles.contactRow}>
              {contactItems.map((item, i) => (
                <View
                  key={i}
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  {i > 0 && <Text style={styles.contactSep}>|</Text>}
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
          <View style={styles.headerRight}>
            {avatarDataUrl && (
              // eslint-disable-next-line jsx-a11y/alt-text
              <Image src={avatarDataUrl} style={styles.avatar} />
            )}
            <View style={styles.availableBadge}>
              <View style={styles.availableDot} />
              <Text style={styles.availableText}>Available for work</Text>
            </View>
          </View>
        </View>

        {/* Accent line */}
        <View style={styles.accentLine} />

        {/* ── Profile strip ── */}
        <View style={styles.profileStrip}>
          <Text style={styles.profileLabel}>Profile</Text>
          <Text style={styles.profileText}>
            Fullstack developer with 3+ years of experience building
            production-grade web applications. My focus is front-end engineering
            — crafting clean, responsive, and animated interfaces — while
            staying fully capable across the back-end. I work with React,
            Next.js, TypeScript, and Tailwind CSS on the front end, and Node.js,
            Express, Supabase, and PostgreSQL on the back end. I care about code
            quality, user experience, and shipping things that actually work.
          </Text>
        </View>

        {/* ── Body ── */}
        <View style={styles.body}>
          {/* Left column */}
          <View style={styles.leftCol}>
            {/* Technical Skills */}
            {skills.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionLabel}>Technical Skills</Text>
                <View style={styles.skillGrid}>
                  {skills.map((skill) => (
                    <View key={skill.id} style={styles.skillPill}>
                      <Text style={styles.skillName}>{skill.name}</Text>
                      <Text style={styles.skillPct}>{skill.proficiency}%</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Specializations */}
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Specializations</Text>
              {specializations.map((item) => (
                <View key={item} style={styles.bulletRow}>
                  <Text style={styles.bulletArrow}>▸</Text>
                  <Text style={styles.bulletText}>{item}</Text>
                </View>
              ))}
            </View>

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
            {/* What I Build */}
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>What I Build</Text>
              <Text style={styles.bodyText}>
                I deliver complete features — from designing the database schema
                and building the API, to crafting the interface users interact
                with. Front-end is where I bring the most value: pixel-perfect
                layouts, smooth animations, and experiences that feel fast and
                intuitive.
              </Text>
              {whatIBuild.map((item) => (
                <View key={item} style={styles.bulletRow}>
                  <Text style={styles.bulletArrow}>▸</Text>
                  <Text style={styles.bulletText}>{item}</Text>
                </View>
              ))}
            </View>

            {/* Featured Projects */}
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
                        <Text style={styles.projectBadge}>
                          {project.category}
                        </Text>
                      )}
                    </View>
                    <Text style={styles.projectDesc}>
                      {project.description}
                    </Text>
                    {project.technologies?.length > 0 && (
                      <View style={styles.techRow}>
                        {project.technologies.slice(0, 5).map((tech) => (
                          <Text key={tech} style={styles.techBadge}>
                            {tech}
                          </Text>
                        ))}
                        {project.technologies.length > 5 && (
                          <Text style={styles.techBadge}>
                            +{project.technologies.length - 5}
                          </Text>
                        )}
                      </View>
                    )}
                  </View>
                ))}

                {/* Portfolio CTA */}
                <View style={styles.portfolioCta}>
                  <Text style={styles.ctaText}>
                    Full project details, live demos & more work —
                  </Text>
                  <Link
                    src="https://portofolio-beryl-psi.vercel.app"
                    style={styles.ctaLink}
                  >
                    portofolio-beryl-psi.vercel.app
                  </Link>
                </View>
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
