"use client";

import { useEffect, useRef } from "react";
import { ArrowUp, Square } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";

interface ComposerProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onStop?: () => void;
  isLoading: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export function Composer({
  value,
  onChange,
  onSubmit,
  onStop,
  isLoading,
  disabled,
  placeholder,
}: ComposerProps) {
  const { t } = useLanguage();
  const ref = useRef<HTMLTextAreaElement>(null);

  // Auto-grow the textarea up to a max height.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  }, [value]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading && value.trim()) onSubmit();
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div
        className={cn(
          "relative flex items-end gap-2 rounded-2xl border border-border bg-card p-1.5 shadow-sm transition-all focus-within:border-primary/50 focus-within:shadow-md focus-within:ring-1 focus-within:ring-primary/20",
          disabled && "opacity-60",
        )}
      >
        <textarea
          ref={ref}
          rows={1}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder ?? `${t.dash.askPrefix}…`}
          enterKeyHint="send"
          className="max-h-[200px] flex-1 resize-none bg-transparent px-3 py-2.5 text-base leading-6 outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
        />
        {isLoading ? (
          <Button
            size="icon"
            variant="secondary"
            className="h-10 w-10 shrink-0 rounded-xl"
            onClick={onStop}
            aria-label={t.dash.stop}
          >
            <Square className="h-4 w-4 fill-current" />
          </Button>
        ) : (
          <Button
            size="icon"
            className="h-10 w-10 shrink-0 rounded-xl transition-transform"
            onClick={onSubmit}
            disabled={disabled || !value.trim()}
            aria-label={t.dash.send}
          >
            <ArrowUp className="h-[18px] w-[18px]" />
          </Button>
        )}
      </div>
      <p className="mt-2 text-center text-[11px] leading-4 text-muted-foreground sm:text-xs">
        {t.dash.disclaimer}
      </p>
    </div>
  );
}
