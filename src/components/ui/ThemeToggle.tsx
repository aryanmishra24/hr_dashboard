"use client";
import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, toggleTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Initialize theme on mount and prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, [setTheme]);
  
  const handleClick = () => {
    toggleTheme();
  };
  
  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <button
        aria-label="Toggle dark mode"
        className="rounded-full p-2 hover:bg-accent transition-colors"
      >
        <Moon className="w-5 h-5" />
      </button>
    );
  }
  
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