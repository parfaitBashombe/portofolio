import dynamic from "next/dynamic";
import { Hero } from "@/components/hero";
import { getSkills } from "@/lib/api/skills";
import { getProjects } from "@/lib/api/projects";
import { getRecentPosts } from "@/lib/api/blogs";
import { getContactInfo } from "@/lib/api/contact-info";
import { getSocialLinks } from "@/lib/api/social-links";
import {
  PersonStructuredData,
  WebsiteStructuredData,
} from "@/components/structured-data";
import { LoadingSkeleton } from "@/components/loading-skeleton";

// Dynamic imports for below-the-fold components
const About = dynamic(() => import("@/components/about").then(mod => ({ default: mod.About })), {
  loading: () => <LoadingSkeleton />,
  ssr: true,
});

const Projects = dynamic(() => import("@/components/projects").then(mod => ({ default: mod.Projects })), {
  loading: () => <LoadingSkeleton />,
  ssr: true,
});

const Blog = dynamic(() => import("@/components/blog").then(mod => ({ default: mod.Blog })), {
  loading: () => <LoadingSkeleton />,
  ssr: true,
});

const Contact = dynamic(() => import("@/components/contact").then(mod => ({ default: mod.Contact })), {
  loading: () => <LoadingSkeleton />,
  ssr: true,
});

export default async function Home() {
  const [skills, projects, posts, contactInfo, socialLinks] = await Promise.all([
    getSkills(),
    getProjects(),
    getRecentPosts(),
    getContactInfo(),
    getSocialLinks(),
  ]);

  return (
    <>
      <PersonStructuredData />
      <WebsiteStructuredData />
      <Hero resumeUrl={contactInfo?.resume_url} />
      <About skills={skills} />
      <Projects projects={projects} />
      <Blog posts={posts} />
      <Contact contactInfo={contactInfo} socialLinks={socialLinks} />
    </>
  );
}
