"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react";

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/johndoe",
    color: "hover:text-gray-900 dark:hover:text-gray-100",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/johndoe",
    color: "hover:text-blue-600",
  },
  {
    icon: Twitter,
    label: "Twitter",
    href: "https://twitter.com/johndoe",
    color: "hover:text-blue-400",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:john.doe@example.com",
    color: "hover:text-green-600",
  },
];

const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Blog", href: "#blog" },
  { name: "Contact", href: "#contact" },
];

export function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 rounded-lg bg-background border border-border/50 text-muted-foreground transition-all duration-300 ${social.color} hover:shadow-card hover:-translate-y-1`}
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
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
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 text-sm rounded-lg border border-border/50 bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <button className="w-full px-3 py-2 text-sm font-medium text-white bg-gradient-primary rounded-lg hover:shadow-glow transition-all duration-300">
                Subscribe
              </button>
            </div>
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
}
