import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="
        flex
        h-9
        w-9
        items-center
        justify-center
        rounded-lg
        border
        border-slate-200
        bg-white
        text-slate-600
        shadow-sm
        transition-all
        duration-200

        hover:border-slate-300
        hover:bg-slate-50
        hover:text-slate-900

        active:scale-95

        dark:border-slate-700
        dark:bg-slate-800
        dark:text-slate-300
        dark:hover:border-slate-600
        dark:hover:bg-slate-700
        dark:hover:text-white
      "
    >
      {isDark ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  );
}