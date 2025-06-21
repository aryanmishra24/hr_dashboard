"use client";
import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      aria-label="Toggle dark mode"
      onClick={toggleTheme}
      className="rounded-full p-2 hover:bg-accent transition-colors"
    >
      {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
} 