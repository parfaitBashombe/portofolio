import { atom } from "jotai";

export const themeAtom = atom<"light" | "dark">("light");

export const toggleThemeAtom = atom(null, (get, set) => {
  const currentTheme = get(themeAtom);
  const newTheme = currentTheme === "light" ? "dark" : "light";
  set(themeAtom, newTheme);

  if (typeof document !== "undefined") {
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  }
});
