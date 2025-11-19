import { getPosts } from "@/lib/api/blogs";
import { BlogClient } from "@/components/blog-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical articles, tutorials, and insights about web development, React, Next.js, TypeScript, and modern JavaScript technologies.",
  openGraph: {
    title: "Blog - Parfait Bashombe",
    description:
      "Technical articles and web development insights from a Front-End Developer",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - Parfait Bashombe",
    description:
      "Technical articles and web development insights",
  },
};

export default async function Blog() {
  const posts = await getPosts();
  const categories = ["All", ...new Set(posts.map((blog) => blog.category))];

  return <BlogClient initialPosts={posts} categories={categories} />;
}
