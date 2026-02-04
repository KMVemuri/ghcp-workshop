"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { useEffect, useState } from "react";

export const DarkModeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Only render after mount to avoid SSR mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Show placeholder during SSR and initial load
  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="gap-2"
        disabled
        aria-label="Toggle dark mode"
      >
        <Moon className="h-4 w-4" />
        <span className="hidden md:inline">Dark</span>
      </Button>
    );
  }

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      size="sm"
      className="gap-2 transition-all duration-300 hover:scale-105"
      aria-label="Toggle dark mode"
    >
      {theme === 'light' ? (
        <>
          <Moon className="h-4 w-4" />
          <span className="hidden md:inline">Dark</span>
        </>
      ) : (
        <>
          <Sun className="h-4 w-4" />
          <span className="hidden md:inline">Light</span>
        </>
      )}
    </Button>
  );
};
