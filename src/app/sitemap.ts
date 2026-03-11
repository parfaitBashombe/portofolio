import { createServerClient } from "@/lib/supabase/create-server-client";

const BASE_URL = "https://portofolio-beryl-psi.vercel.app";

type SitemapEntry = {
  url: string;
  lastModified: Date;
  changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority: number;
};

const sitemap = async (): Promise<SitemapEntry[]> => {
  const supabase = await createServerClient();

  const [{ data: posts }, { data: projects }] = await Promise.all([
    supabase.from("posts").select("slug, date"),
    supabase.from("projects").select("id, date"),
  ]);

  const blogPosts = (posts ?? []).map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const projectPages = (projects ?? []).map((project) => ({
    url: `${BASE_URL}/projects/${project.id}`,
    lastModified: new Date(project.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...blogPosts,
    ...projectPages,
  ];
};

export default sitemap;
