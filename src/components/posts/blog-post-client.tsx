"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IPost } from "@/types";

interface BlogPostClientProps {
  post: IPost;
}

export function BlogPostClient({ post }: BlogPostClientProps) {
  const router = useRouter();

  return (
    <main className="min-h-screen pb-16">
      {/* Hero Area */}
      <div className="bg-accent/30 border-b border-border/50 pt-24 pb-12 px-6">
        <div className="container-custom max-w-3xl">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Button
              variant="ghost"
              onClick={() => router.push("/blog")}
              className="cursor-pointer -ml-2"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </motion.div>

          {/* Category + Meta */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap items-center gap-3 mb-4"
          >
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
              {post.category}
            </Badge>
            <span className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-3.5 w-3.5 mr-1.5" />
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-3.5 w-3.5 mr-1.5" />
              {post.readTime}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
          >
            {post.title}
          </motion.h1>

          {/* Excerpt */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-xl text-muted-foreground"
          >
            {post.excerpt}
          </motion.p>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-2 mt-6"
            >
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="flex items-center gap-1"
                >
                  <Tag className="h-3 w-3" />
                  {tag}
                </Badge>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Article Content */}
      <div className="container-custom max-w-3xl px-6 mt-12">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-card border border-border/50 rounded-xl p-8"
        >
          <div
            className="prose prose-lg dark:prose-invert max-w-none overflow-hidden"
            dangerouslySetInnerHTML={{ __html: post.content || "" }}
          />
        </motion.article>

        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            View all posts
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
