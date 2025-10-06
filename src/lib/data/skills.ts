import { Palette } from "lucide-react";
import { LuGitBranch, LuMonitorSmartphone } from "react-icons/lu";
import {
  RiNextjsFill,
  RiReactjsFill,
  RiSupabaseFill,
  RiTailwindCssFill,
} from "react-icons/ri";
import { SiTypescript } from "react-icons/si";

export const skills = [
  { name: "React", icon: RiReactjsFill, level: 95 },
  { name: "Next.js", icon: RiNextjsFill, level: 80 },
  { name: "TypeScript", icon: SiTypescript, level: 80 },
  { name: "Tailwind CSS", icon: RiTailwindCssFill, level: 82 },
  { name: "Supabase", icon: RiSupabaseFill, level: 75 },
  { name: "Git", icon: LuGitBranch, level: 70 },
  { name: "Responsive Design", icon: LuMonitorSmartphone, level: 94 },
  { name: "UI/UX Design", icon: Palette, level: 62 },
];
