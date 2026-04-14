import { BlogPostClient } from "@/components/posts/blog-post-client";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { siteMetadata } from "@/lib/metadata";
import { IPost } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

const getPostBySlug = async (slug: string): Promise<IPost | null> => {
  try {
    const res = await fetch(`${BASE_URL}/api/posts/${slug}`, {
      cache: "no-store",
    });
    if (res.status === 404) return null;
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
};

interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

export const generateMetadata = async ({
  params,
}: BlogPostProps): Promise<Metadata> => {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  const publishedTime = new Date(post.date).toISOString();

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: siteMetadata.author.name }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime,
      authors: [siteMetadata.author.name],
      tags: post.tags,
      url: `${siteMetadata.url}/blog/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
    alternates: {
      canonical: `${siteMetadata.url}/blog/${post.slug}`,
    },
  };
};

const BlogPost = async ({ params }: BlogPostProps) => {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return notFound();

  return <BlogPostClient post={post} />;
};

export default BlogPost;
