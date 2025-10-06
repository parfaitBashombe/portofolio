"use client";

import { skills } from "@/lib/data/skills";
import { motion } from "framer-motion";

export function About() {
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get to know more about my background, skills, and passion for
            development
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
                className="relative"
              >
                <img
                  src="https://ik.imagekit.io/zzot6yvyh/incognito.jpeg?updatedAt=1756579630119"
                  alt="Parfait Bashombe - Profile Photo"
                  className="w-80 h-80 mx-auto lg:mx-0 rounded-2xl object-cover shadow-card"
                />
                <div className="absolute inset-0 bg-gradient-primary opacity-10 rounded-2xl"></div>
              </motion.div>
            </div>

            <div className="text-center lg:text-left space-y-4">
              <h3 className="text-2xl font-semibold">
                Hi, I&apos;m Parfait Bashombe
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                I&apos;m a passionate front-end developer with 2+ years of
                experience creating modern, responsive web applications. I love
                turning complex problems into simple, beautiful, and intuitive
                designs.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                When I&apos;m not coding, you can find me exploring new
                technologies, contributing to open-source projects, or sharing
                knowledge with the developer community.
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
              {skills.map((skill, index) => (
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
                      <skill.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h4 className="font-semibold">{skill.name}</h4>
                  </div>

                  <div className="w-full bg-muted rounded-full h-2">
                    <motion.div
                      className="bg-accent-foreground h-2 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                      viewport={{ once: true }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {skill.level}%
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
