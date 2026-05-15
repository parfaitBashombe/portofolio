"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { IPost } from "@/types";

interface BlogDetailModalProps {
  post: IPost | null;
  onClose: () => void;
}

const BlogDetailModal = ({ post, onClose }: BlogDetailModalProps) => {
  useEffect(() => {
    if (!post) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [post]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {post && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Card */}
          <motion.div
            className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-background border border-border rounded-2xl shadow-2xl"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Sticky close bar */}
            <div className="flex-none flex items-center justify-end px-6 pt-4 pb-2">
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-muted border border-border hover:bg-accent transition-colors"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-6 pb-8 md:px-8 space-y-5">
              {/* Header */}
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-3">
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
                </div>

                <h2 className="text-3xl font-bold mb-3">{post.title}</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
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
                </div>
              )}

              {/* Divider */}
              <div className="border-b border-border/50" />

              {/* Content */}
              <div
                className="prose prose-sm dark:prose-invert max-w-none overflow-hidden"
                dangerouslySetInnerHTML={{ __html: post.content || "" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BlogDetailModal;
