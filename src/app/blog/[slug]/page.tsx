import { getPostBySlug } from "@/lib/api/blogs";
import { BlogPostClient } from "@/components/blog-post-client";
import { notFound } from "next/navigation";

interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  return <BlogPostClient post={post} />;
}
