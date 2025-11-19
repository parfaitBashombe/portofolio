import { getPostBySlug } from "@/lib/api/blogs";
import { BlogPostClient } from "@/components/blog-post-client";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { siteMetadata } from "@/lib/metadata";

interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
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
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  return <BlogPostClient post={post} />;
}
