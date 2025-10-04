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
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
