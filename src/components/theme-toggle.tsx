"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  /** Show a text label next to the icon (used in the expanded sidebar). */
  withLabel?: boolean;
}

/**
 * Light/dark toggle. Renders an inert placeholder until mounted so the
 * server and client markup match (next-themes resolves the theme only on
 * the client). The sun/moon icons cross-fade on switch.
 */
export function ThemeToggle({ className, withLabel = false }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Activar modo claro" : "Activar modo oscuro"}
      title={isDark ? "Modo claro" : "Modo oscuro"}
      className={cn(
        "inline-flex h-9 items-center gap-2 rounded-lg px-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        !withLabel && "w-9 justify-center px-0",
        className,
      )}
    >
      <span className="relative h-[1.1rem] w-[1.1rem]">
        <Sun
          className={cn(
            "absolute inset-0 h-[1.1rem] w-[1.1rem] transition-all duration-300",
            mounted && isDark
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0",
          )}
        />
        <Moon
          className={cn(
            "absolute inset-0 h-[1.1rem] w-[1.1rem] transition-all duration-300",
            mounted && !isDark
              ? "rotate-0 scale-100 opacity-100"
              : "rotate-90 scale-0 opacity-0",
          )}
        />
      </span>
      {withLabel && (
        <span className="truncate">{isDark ? "Modo claro" : "Modo oscuro"}</span>
      )}
    </button>
  );
}
