import { getPosts } from "@/lib/api/blogs";
import { BlogClient } from "@/components/blog-client";

export default async function Blog() {
  const posts = await getPosts();
  const categories = ["All", ...new Set(posts.map((blog) => blog.category))];

  return <BlogClient initialPosts={posts} categories={categories} />;
}
