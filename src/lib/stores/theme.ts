import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const themeAtom = atomWithStorage<"light" | "dark">("theme", "dark");

export const toggleThemeAtom = atom(null, (get, set) => {
  const currentTheme = get(themeAtom);
  const newTheme = currentTheme === "light" ? "dark" : "light";
  set(themeAtom, newTheme);
});
