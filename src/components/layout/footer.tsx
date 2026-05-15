"use client";

import { useState } from "react";
import { ComponentType } from "react";
import { LucideProps } from "lucide-react";
import { IconBaseProps } from "react-icons";
import { quickLinks } from "@/lib/constants";
import { motion } from "framer-motion";
import { Heart, Mail, ArrowUp } from "lucide-react";
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { toast } from "sonner";
import { ISocialLink } from "@/types";

const socialIconMap: Record<
  string,
  ComponentType<LucideProps | IconBaseProps>
> = {
  GitHub: FaGithub,
  LinkedIn: FaLinkedin,
  Twitter: RiTwitterXLine,
  X: RiTwitterXLine,
  Facebook: FaFacebook,
  Instagram: FaInstagram,
  Email: Mail,
};

interface FooterProps {
  socialLinks: ISocialLink[];
}

const Footer = ({ socialLinks }: FooterProps) => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) {
      toast.error("Email required", { description: "Please enter your email address." });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newsletterEmail)) {
      toast.error("Invalid email", { description: "Please enter a valid email address." });
      return;
    }
    setIsSubscribing(true);
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to subscribe");
      toast.success("Subscribed!", { description: "You'll receive our latest updates in your inbox." });
      setNewsletterEmail("");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Please try again later.";
      toast.error("Subscription failed", { description: message });
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="bg-card border-t border-border/50">
      <div className="container-custom px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-5"
          >
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                PB
              </span>
              <span className="text-xl font-bold text-gradient">Parfait Bashombe</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Fullstack Developer specialized in Front-End. I craft complete web
              experiences — from robust APIs to polished interfaces.
            </p>

            {/* Social icons */}
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((social, index) => {
                const Icon = socialIconMap[social.platform] || FaGithub;
                return (
                  <motion.a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.06 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.platform}
                    className="p-2.5 rounded-xl bg-background border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <p className="text-xs font-semibold text-foreground uppercase tracking-widest">
              Quick Links
            </p>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <p className="text-xs font-semibold text-foreground uppercase tracking-widest">
              Stay Updated
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Get notified about new projects and blog posts.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-border/60 bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/60"
              />
              <button
                type="submit"
                disabled={isSubscribing}
                className="w-full px-3 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-xl hover:bg-primary/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubscribing ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-border/50 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>© {new Date().getFullYear()} Parfait Bashombe. Made with</span>
            <Heart className="h-3.5 w-3.5 text-red-500 animate-pulse mx-0.5" />
            <span>and React</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-background border border-border/60 text-sm text-muted-foreground hover:text-primary hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-200"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
