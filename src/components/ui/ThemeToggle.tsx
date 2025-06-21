"use client";
import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";

export default function ThemeToggle() {
  const { theme, toggleTheme, setTheme } = useTheme();
  
  // Initialize theme on mount
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, [setTheme]);
  
  const handleClick = () => {
    console.log('ThemeToggle clicked, current theme:', theme);
    toggleTheme();
    console.log('ThemeToggle clicked, new theme should be:', theme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <button
      aria-label="Toggle dark mode"
      onClick={handleClick}
      className="rounded-full p-2 hover:bg-accent transition-colors"
    >
      {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
} 