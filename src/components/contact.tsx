"use client";

import { ComponentType, SVGProps, useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Phone, MapPin } from "lucide-react";
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { IContactInfo, ISocialLink } from "@/types";
import { contactSchema } from "@/lib/validators/contact";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

const socialIconMap: Record<string, IconType> = {
  GitHub: FaGithub,
  LinkedIn: FaLinkedin,
  Twitter: RiTwitterXLine,
  X: RiTwitterXLine,
  Facebook: FaFacebook,
  Instagram: FaInstagram,
  Email: Mail,
};

interface ContactProps {
  contactInfo: IContactInfo | null;
  socialLinks: ISocialLink[];
}

export const Contact = ({ contactInfo, socialLinks }: ContactProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const flattened = result.error.flatten().fieldErrors;
      Object.values(flattened).forEach((messages) => {
        messages?.forEach((msg) => toast.error(msg));
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to send message");
      toast.success("Message sent!", {
        description: "Thank you for your message. I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error: unknown) {
      toast.error("Failed to send message", {
        description: (error as Error).message || "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayContactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: contactInfo?.email || "Not set",
      href: contactInfo?.email ? `mailto:${contactInfo.email}` : null,
    },
    {
      icon: Phone,
      label: "Phone",
      value: contactInfo?.phone || "Not set",
      href: contactInfo?.phone ? `tel:${contactInfo.phone}` : null,
    },
    {
      icon: MapPin,
      label: "Location",
      value: contactInfo?.address || "Not set",
      href: null,
    },
  ];

  return (
    <section id="contact" className="section-padding bg-accent">
      <div className="container-custom">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            Contact
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I&apos;d love to hear
            from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left — info + social */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            <div className="space-y-3">
              <h3 className="text-2xl font-bold">Let&apos;s Connect</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                I&apos;m always open to new opportunities and interesting
                projects. Whether you have a question or just want to say hi,
                feel free to reach out!
              </p>
            </div>

            {/* Contact info — 2 top, then location + social side by side */}
            <div className="flex flex-col gap-3">
              {/* Top row: Email + Phone */}
              <div className="grid grid-cols-2 gap-3">
                {displayContactInfo.slice(0, 2).map((info, index) => (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 px-4 py-3 bg-card border border-border/60 rounded-2xl hover:border-primary/30 transition-all duration-200"
                  >
                    <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                      <info.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-0.5">
                        {info.label}
                      </p>
                      {info.href ? (
                        <a href={info.href} className="text-sm font-medium truncate block hover:text-primary transition-colors">
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium truncate">{info.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Bottom row: Location + Social links */}
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Location card */}
                {(() => {
                  const loc = displayContactInfo[2];
                  if (!loc) return null;
                  const LocIcon = loc.icon;
                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.16 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3 px-4 py-3 bg-card border border-border/60 rounded-2xl hover:border-primary/30 transition-all duration-200 flex-1"
                    >
                      <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                        <LocIcon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-0.5">
                          {loc.label}
                        </p>
                        <p className="text-sm font-medium truncate">{loc.value}</p>
                      </div>
                    </motion.div>
                  );
                })()}

                {/* Social links card */}
                {socialLinks.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.22 }}
                    viewport={{ once: true }}
                    className="flex flex-col justify-center gap-2 px-4 py-3 bg-card border border-border/60 rounded-2xl"
                  >
                    <p className="text-xs font-semibold text-primary uppercase tracking-widest">
                      Follow Me
                    </p>
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
                            className="p-2 rounded-lg bg-background border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-200"
                          >
                            <Icon className="h-3.5 w-3.5" />
                          </motion.a>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-card border border-border/60 rounded-2xl p-4 sm:p-6 flex flex-col gap-5"
            >
              <div className="space-y-1">
                <p className="text-xs font-semibold text-primary uppercase tracking-widest">
                  Send a Message
                </p>
                <h3 className="text-xl font-bold">Drop me a line</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-background border-border/60 focus-visible:ring-primary/30"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-background border-border/60 focus-visible:ring-primary/30"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="subject" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Subject *</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="What's this about?"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="bg-background border-border/60 focus-visible:ring-primary/30"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project or idea..."
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="bg-background border-border/60 focus-visible:ring-primary/30 resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
