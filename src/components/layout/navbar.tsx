"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "../theme-toggle";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Blog", href: "#blog" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  const handleRefresh = useCallback(() => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    router.refresh();
    setTimeout(() => setIsRefreshing(false), 1000);
  }, [isRefreshing, router]);

  const scrollToSection = (section: string) => {
    requestAnimationFrame(() => {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    });
  };

  const handleNavClick = async (href: string) => {
    const section = href.slice(1);

    if (pathname === "/") {
      scrollToSection(section);
    } else {
      if (section === "projects") {
        router.push("/projects");
      } else if (section === "blog") {
        router.push("/blog");
      } else {
        router.push(`/#${section}`);
        setTimeout(() => {
          scrollToSection(section);
        }, 500);
      }
    }

    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/50"
          : ""
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16 px-4">
          {/* Logo */}
          <motion.div
            onClick={() => handleNavClick("#home")}
            className="flex items-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <span className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-sm font-bold text-primary">
              PB
            </span>
            <span className="text-xl font-bold text-gradient">Parfait B.</span>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium cursor-pointer"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                whileHover={{ y: -2 }}
              >
                {item.name}
              </motion.button>
            ))}

            {/* Hire Me CTA */}
            <motion.button
              onClick={() => handleNavClick("#contact")}
              className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors cursor-pointer"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navItems.length * 0.1 + 0.3 }}
              whileHover={{ y: -2 }}
            >
              Hire Me
            </motion.button>

            {/* Reload Button */}
            <motion.button
              onClick={handleRefresh}
              title="Reload page content"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.span
                animate={isRefreshing ? { rotate: 360 } : { rotate: 0 }}
                transition={
                  isRefreshing
                    ? { duration: 0.7, ease: "linear", repeat: Infinity }
                    : { duration: 0 }
                }
                style={{ display: "inline-flex" }}
              >
                <RefreshCw className="h-4 w-4" />
              </motion.span>
            </motion.button>

            <ThemeToggle />
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center space-x-1">
            {/* Reload Button — mobile */}
            <motion.button
              onClick={handleRefresh}
              title="Reload page content"
              className="h-10 w-10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              whileTap={{ scale: 0.9 }}
            >
              <motion.span
                animate={isRefreshing ? { rotate: 360 } : { rotate: 0 }}
                transition={
                  isRefreshing
                    ? { duration: 0.7, ease: "linear", repeat: Infinity }
                    : { duration: 0 }
                }
                style={{ display: "inline-flex" }}
              >
                <RefreshCw className="h-4 w-4" />
              </motion.span>
            </motion.button>

            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="h-10 w-10"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 flex justify-end z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Drawer Panel — slides from right */}
            <motion.div
              className="relative w-72 bg-background h-full flex flex-col shadow-2xl border-l border-border/50"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                    PB
                  </span>
                  <span className="text-lg font-bold text-gradient">
                    Parfait B.
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-accent transition-colors text-muted-foreground"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Nav Items */}
              <nav className="flex-1 px-4 py-6 space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className="block w-full text-left px-3 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200 font-medium"
                  >
                    {item.name}
                  </button>
                ))}
              </nav>

              {/* Hire Me Button */}
              <div className="px-4 pb-8">
                <button
                  onClick={() => handleNavClick("#contact")}
                  className="w-full py-3 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors"
                >
                  Hire Me
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
