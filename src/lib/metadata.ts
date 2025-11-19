export const siteMetadata = {
  title: "Parfait Bashombe - Front-End & Website Developer",
  description: "Portfolio showcasing modern web applications built with React, Next.js, and TypeScript. Explore projects, read technical blog posts, and get in touch.",
  url: "https://portofolio-beryl-psi.vercel.app",
  author: {
    name: "Parfait Bashombe",
    email: "parfaitbashombe@gmail.com", 
    github: "https://github.com/parfaitBashombe", 
    linkedin: "https://www.linkedin.com/in/parfait-bashombe-7b3866316/", 
    twitter: "@parfaitbashombe", 
  },
  keywords: [
    "Front-End Developer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "Full-Stack Developer",
    "Portfolio",
    "UI/UX Design",
    "Responsive Design",
    "Modern Web Development",
  ],
  ogImage: "/og-image.png", 
};

export function generatePageMetadata({
  title,
  description,
  keywords,
  ogImage,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  noIndex?: boolean;
}) {
  return {
    title,
    description: description || siteMetadata.description,
    keywords: keywords || siteMetadata.keywords,
    openGraph: {
      title: title || siteMetadata.title,
      description: description || siteMetadata.description,
      images: ogImage ? [ogImage] : [siteMetadata.ogImage],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: title || siteMetadata.title,
      description: description || siteMetadata.description,
      images: ogImage ? [ogImage] : [siteMetadata.ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
