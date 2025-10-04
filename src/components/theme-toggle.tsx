import { useAtom } from "jotai";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { themeAtom, toggleThemeAtom } from "@/lib/stores/theme";

export function ThemeToggle() {
  const [theme] = useAtom(themeAtom);
  const [, toggleTheme] = useAtom(toggleThemeAtom);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => toggleTheme()}
      className="relative h-10 w-10 rounded-full transition-all duration-300 hover:bg-accent"
    >
      <Sun
        className={`h-5 w-5 transition-all duration-300 ${
          theme === "light" ? "rotate-90 scale-0" : "rotate-0 scale-100"
        }`}
      />
      <Moon
        className={`absolute h-5 w-5 transition-all duration-300 ${
          theme === "light" ? "rotate-0 scale-100" : "-rotate-90 scale-0"
        }`}
      />

      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
