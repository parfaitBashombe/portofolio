import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { IPost } from "@/types";

type Props = {
  post: IPost;
  index: number;
};

const BlogCard = ({ post, index }: Props) => {
  return (
    <Link key={post.id} href={`/blog/${post.slug}`}>
      <motion.article
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
    </Link>
  );
};

export default BlogCard;
