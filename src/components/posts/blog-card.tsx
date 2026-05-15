import { motion } from "framer-motion";
import { Calendar, Clock, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { IPost } from "@/types";

type Props = {
  post: IPost;
  index: number;
  onView?: (post: IPost) => void;
};

const BlogCard = ({ post, index, onView }: Props) => {
  const handleClick = () => {
    if (onView) onView(post);
  };

  const content = (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true }}
      className="group bg-card border border-border/60 rounded-2xl overflow-hidden flex flex-col hover:border-primary/30 hover:shadow-xl transition-all duration-300 h-full"
    >
      {/* Top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-primary/60 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="flex-1 flex flex-col p-5 gap-3">
        {/* Category + read time */}
        <div className="flex items-center justify-between">
          <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-semibold">
            {post.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {post.readTime}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold leading-snug group-hover:text-primary transition-colors line-clamp-2 flex-none">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
          {post.excerpt}
        </p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer row */}
        <div className="flex items-center justify-between pt-3 border-t border-border/50">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
            Read more
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </motion.article>
  );

  if (onView) {
    return (
      <button type="button" onClick={handleClick} className="block w-full text-left h-full">
        {content}
      </button>
    );
  }

  return (
    <Link href={`/blog/${post.slug}`} className="block h-full">
      {content}
    </Link>
  );
};

export default BlogCard;
