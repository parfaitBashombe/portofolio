"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IPost } from "@/lib/types";
import BlogCard from "./blog-card";
import Link from "next/link";

interface BlogProps {
  posts: IPost[];
}

export const Blog = ({ posts }: BlogProps) => {
  return (
    <section id="blog" className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Latest Blog Posts
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sharing insights, tutorials, and thoughts about web development and
            technology
          </p>
        </motion.div>

        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <BlogCard post={post} index={index} key={post.id ?? index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center py-20 gap-4 text-muted-foreground"
          >
            <BookOpen className="h-12 w-12 opacity-40" />
            <p className="text-lg font-medium">No posts published yet</p>
            <p className="text-sm opacity-70">Check back soon!</p>
          </motion.div>
        )}

        {posts.length > 0 && (
          <Link href="/blog">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Button
                variant="outline"
                size="lg"
                className="group cursor-pointer"
              >
                View All Posts
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </Link>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-8 p-6 rounded-lg bg-muted/50 border border-border/50"
        >
          <p className="text-muted-foreground">
            <span className="font-semibold">Coming Soon:</span> Full blog
            functionality with comments, search, and categories. Stay tuned for
            more insightful content!
          </p>
        </motion.div>
      </div>
    </section>
  );
};
