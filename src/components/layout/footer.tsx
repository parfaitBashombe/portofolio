"use client";

import { useState } from "react";

import { ComponentType } from "react";
import { LucideProps } from "lucide-react";
import { IconBaseProps } from "react-icons";

import { quickLinks } from "@/lib/constants";
import { motion } from "framer-motion";
import { Heart, Mail } from "lucide-react";
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
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!newsletterEmail.trim()) {
      toast.error("Email required", {
        description: "Please enter your email address.",
      });
      return;
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newsletterEmail)) {
      toast.error("Invalid email", {
        description: "Please enter a valid email address.",
      });
      return;
    }

    setIsSubscribing(true);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: newsletterEmail }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to subscribe");
      }

      toast.success("Successfully subscribed!", {
        description: "You'll receive our latest updates in your inbox.",
      });
      setNewsletterEmail("");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Please try again later.";
      toast.error("Subscription failed", {
        description: message,
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="bg-card border-t border-border/50">
      <div className="container-custom px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-4"
          >
            <h3 className="text-2xl font-bold text-gradient">
              Parfait Bashombe
            </h3>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              Front-End & Website Developer passionate about creating beautiful,
              functional web experiences. Let&apos;s build something amazing
              together.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4 pt-4">
              {socialLinks.map((social, index) => {
                const Icon = socialIconMap[social.platform] || FaGithub;
                return (
                  <motion.a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-2 rounded-lg bg-background border border-border/50 text-muted-foreground transition-all duration-300 hover:text-primary hover:shadow-card hover:-translate-y-1`}
                    aria-label={social.platform}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className="font-semibold text-foreground">Stay Updated</h4>
            <p className="text-muted-foreground text-sm">
              Get notified about new projects and blog posts.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-border/50 bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <button
                type="submit"
                disabled={isSubscribing}
                className="w-full px-3 py-2 text-sm font-medium text-white bg-accent-foreground rounded-lg hover:shadow-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubscribing ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-border/50 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <span>
                © {new Date().getFullYear()} Parfait Bashombe. Made with
              </span>
              <Heart className="h-4 w-4 text-red-500 animate-pulse" />
              <span>and React</span>
            </div>

            <button
              onClick={scrollToTop}
              className="group flex items-center space-x-2 px-4 py-2 rounded-lg bg-background border border-border/50 hover:bg-accent transition-all duration-300 hover:shadow-card hover:-translate-y-1"
            >
              <span>Back to top</span>
              <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                ↑
              </motion.div>
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
