import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Projects } from "@/components/projects/projects";
import { Blog } from "@/components/posts/blog";
import { Contact } from "@/components/contact";
import {
  PersonStructuredData,
  WebsiteStructuredData,
} from "@/components/structured-data";
import { IContactInfo, IPost, IProject, ISkill, ISocialLink } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

async function fetchApi<T>(path: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      cache: "no-store",
    });
    if (!res.ok) return fallback;
    return res.json();
  } catch {
    return fallback;
  }
}

const Home = async () => {
  const [skills, projects, posts, contactResponse, socialLinks] =
    await Promise.all([
      fetchApi<ISkill[]>("/api/skills", []),
      fetchApi<IProject[]>("/api/projects?limit=6", []),
      fetchApi<IPost[]>("/api/posts?limit=3", []),
      fetchApi<{ data: IContactInfo | null }>("/api/contact", { data: null }),
      fetchApi<ISocialLink[]>("/api/social-links", []),
    ]);

  const contactInfo = contactResponse?.data ?? null;

  return (
    <>
      <PersonStructuredData />
      <WebsiteStructuredData />
      <Hero />
      <About skills={skills} />
      <Projects projects={projects} />
      <Blog posts={posts} />
      <Contact contactInfo={contactInfo} socialLinks={socialLinks} />
    </>
  );
};

export default Home;
