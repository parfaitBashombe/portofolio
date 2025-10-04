"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const blogPosts = [
  {
    id: 1,
    title: "Building Scalable React Applications with TypeScript",
    excerpt:
      "Learn how to structure large React applications using TypeScript, best practices for component organization, and maintainable code patterns.",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "React",
    slug: "building-scalable-react-applications",
  },
  {
    id: 2,
    title: "The Future of Web Development: What to Expect in 2024",
    excerpt:
      "Exploring upcoming trends in web development, from AI integration to new frameworks and tools that will shape the future of the web.",
    date: "2024-01-08",
    readTime: "6 min read",
    category: "Trends",
    slug: "future-of-web-development-2024",
  },
  {
    id: 3,
    title: "Optimizing Web Performance: A Complete Guide",
    excerpt:
      "Comprehensive guide to web performance optimization, covering everything from image optimization to code splitting and caching strategies.",
    date: "2024-01-01",
    readTime: "12 min read",
    category: "Performance",
    slug: "optimizing-web-performance-guide",
  },
];

export function Blog() {
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="card-elegant h-full flex flex-col">
                {/* Category Badge */}
                <div className="mb-4">
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                    {post.category}
                  </Badge>
                </div>

                {/* Post Content */}
                <div className="flex-1 space-y-4">
                  <h3 className="text-xl font-semibold leading-tight group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Meta Information */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border/50">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {post.readTime}
                      </span>
                    </div>

                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg" className="group">
            View All Posts
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>

        {/* Coming Soon Message */}
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
}
