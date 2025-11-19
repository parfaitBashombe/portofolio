import { About } from "@/components/about";
import { Blog } from "@/components/blog";
import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { getSkills } from "@/lib/api/skills";
import { getProjects } from "@/lib/api/projects";
import { getRecentPosts } from "@/lib/api/blogs";
import { getContactInfo } from "@/lib/api/contact-info";
import { getSocialLinks } from "@/lib/api/social-links";
import {
  PersonStructuredData,
  WebsiteStructuredData,
} from "@/components/structured-data";

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
