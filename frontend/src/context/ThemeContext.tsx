import { useEffect, useState } from "react";
import { ThemeContext, type Theme } from "./themeContext";

export const ThemeProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const savedTheme: Theme | null =
      storedTheme === "light" || storedTheme === "dark" ? storedTheme : null;

    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme)
    localStorage.setItem("theme", newTheme);

    document.documentElement.classList.toggle("dark", newTheme === "dark");
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
