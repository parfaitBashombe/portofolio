"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { ComponentType, SVGProps } from "react";

import { Palette } from "lucide-react";
import { FaNodeJs } from "react-icons/fa";
import { LuGitBranch, LuMonitorSmartphone } from "react-icons/lu";
import {
  RiNextjsFill,
  RiReactjsFill,
  RiSupabaseFill,
  RiTailwindCssFill,
} from "react-icons/ri";
import { SiTypescript } from "react-icons/si";
import { ISkill } from "@/types";

type IconComponent = ComponentType<
  SVGProps<SVGSVGElement> & { className?: string }
>;

const iconMap: Record<string, IconComponent> = {
  React: RiReactjsFill,
  "Next.js": RiNextjsFill,
  TypeScript: SiTypescript,
  "Tailwind CSS": RiTailwindCssFill,
  Supabase: RiSupabaseFill,
  "Node.js": FaNodeJs,
  Git: LuGitBranch,
  "Responsive Design": LuMonitorSmartphone,
  "UI/UX Design": Palette,
};

interface AboutProps {
  skills: ISkill[];
}

export function About({ skills }: AboutProps) {
  return (
    <section id="about" className="section-padding bg-accent">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Who I Am</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Fullstack developer with a front-end heart — building from APIs to
            pixel-perfect interfaces
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative w-80 h-80 mx-auto lg:mx-0"
              >
                <Image
                  src="https://ik.imagekit.io/zzot6yvyh/incognito.jpeg?tr=w-320,h-320,q-80,f-webp"
                  alt="Parfait Bashombe - Profile Photo"
                  width={320}
                  height={320}
                  className="rounded-2xl object-cover shadow-card"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAMEBQb/xAAjEAACAgIBAwUBAAAAAAAAAAABAgADBBEhBRIxIkFRcYGh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAWEQEBAQAAAAAAAAAAAAAAAAAAARH/2gAMAwEAAhEDEQA/APW85Vy0LW6k4BOuR7zB6jpBpVun3kBhlYz5E6XqRuQqK2NiWOxwPhm1PHEg61kUdk2gGVnRPPr7H/ZlVjk4O1/Jhq1v3D2jqPl4+P/Z"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-primary opacity-10 rounded-2xl pointer-events-none"></div>
              </motion.div>
            </div>

            <div className="text-center lg:text-left space-y-4">
              <h3 className="text-2xl font-semibold">
                Hi, I&apos;m Parfait Bashombe
              </h3>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                Fullstack Developer · Front-End Specialist
              </span>
              <p className="text-muted-foreground leading-relaxed">
                I&apos;m a fullstack developer with a strong specialization in
                front-end engineering. With 3+ years of experience, I build
                complete web applications — solid back-end APIs paired with
                polished, responsive interfaces that users love.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Front-end is where I truly shine: clean architecture, smooth
                animations, and pixel-perfect design are what I bring to every
                project. When I&apos;m not building, I&apos;m exploring new
                technologies and contributing to the developer community.
              </p>
            </div>
          </motion.div>

          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-center lg:text-left mb-8">
              Skills & Technologies
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {skills.map((skill, index) => {
                const Icon = iconMap[skill.name] || Palette; // Fallback icon
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="card-elegant group hover:scale-105"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <h4 className="font-semibold">{skill.name}</h4>
                    </div>

                    <div className="w-full bg-muted rounded-full h-2">
                      <motion.div
                        className="bg-accent-foreground h-2 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                        viewport={{ once: true }}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {skill.proficiency}%
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
