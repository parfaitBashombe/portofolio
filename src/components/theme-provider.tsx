"use client";

import { useEffect } from "react";
import { useAtom } from "jotai";
import { themeAtom } from "@/lib/stores/theme";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme] = useAtom(themeAtom);

  useEffect(() => {
    const root = document.documentElement;

    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  return <>{children}</>;
}
