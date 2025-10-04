import { About } from "@/components/about";
import { Blog } from "@/components/blog";
import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Blog />
      <Contact />
    </>
  );
}
