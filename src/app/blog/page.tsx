import { BlogClient } from "@/components/posts/blog-client";
import { IPost } from "@/types";
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
    description: "Technical articles and web development insights",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

const Blog = async () => {
  let posts: IPost[] = [];

  try {
    const res = await fetch(`${BASE_URL}/api/posts`, {
      next: { revalidate: 60 },
    });
    if (res.ok) posts = await res.json();
  } catch (error) {
    console.error(error);
  }

  const categories = ["All", ...new Set(posts.map((post) => post.category))];

  return <BlogClient initialPosts={posts} categories={categories} />;
};

export default Blog;
