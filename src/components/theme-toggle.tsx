"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ThemeToggleProps {
  /** "icon" → compact icon button (navbar). "nav" → full-width sidebar row. */
  variant?: "icon" | "nav";
  /** In the "nav" variant, render an icon-only rail item with a tooltip. */
  collapsed?: boolean;
  className?: string;
}

export function ThemeToggle({
  variant = "icon",
  collapsed = false,
  className,
}: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";
  const label = isDark ? "Modo claro" : "Modo oscuro";
  const Icon = isDark ? Sun : Moon;
  const toggle = () => setTheme(isDark ? "light" : "dark");

  if (variant === "icon") {
    return (
      <Button
        variant="ghost"
        size="icon"
        aria-label={label}
        onClick={toggle}
        className={className}
      >
        {/* Cross-fade the icon for a premium feel. */}
        <Sun className="h-4 w-4 rotate-0 scale-100 transition-transform duration-300 dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-transform duration-300 dark:rotate-0 dark:scale-100" />
        <span className="sr-only">{label}</span>
      </Button>
    );
  }

  const button = (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      className={cn(
        "flex h-10 items-center rounded-lg text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
        collapsed ? "w-10 justify-center px-0" : "w-full gap-3 px-3",
        className,
      )}
    >
      <Icon className="h-[18px] w-[18px] shrink-0" />
      {!collapsed && <span className="truncate">{label}</span>}
    </button>
  );

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent side="right">{label}</TooltipContent>
      </Tooltip>
    );
  }

  return button;
}
