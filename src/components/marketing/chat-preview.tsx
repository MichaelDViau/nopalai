"use client";

import { useEffect, useState } from "react";
import { GraduationCap, Languages, Megaphone, MessageSquare } from "lucide-react";

import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/brand/logo";
import { useLanguage } from "@/components/i18n/language-provider";

const TABS = [
  { id: "general", icon: MessageSquare },
  { id: "translation", icon: Languages },
  { id: "school", icon: GraduationCap },
  { id: "content", icon: Megaphone },
] as const;

export function ChatPreview() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const i = setInterval(() => setActive((n) => (n + 1) % TABS.length), 5000);
    return () => clearInterval(i);
  }, []);

  const tab = TABS[active];
  const content = t.chatPreview.tabs[tab.id];

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-border bg-secondary/60 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-muted-foreground/30" />
        <span className="h-3 w-3 rounded-full bg-muted-foreground/30" />
        <span className="h-3 w-3 rounded-full bg-muted-foreground/30" />
        <div className="ml-3 hidden text-xs text-muted-foreground sm:block">
          nopalai.mx/dashboard
        </div>
      </div>

      {/* mode tabs */}
      <div className="flex flex-wrap gap-2 border-b border-border px-4 py-3">
        {TABS.map((tabItem, i) => (
          <button
            key={tabItem.id}
            onClick={() => setActive(i)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
              i === active
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-accent",
            )}
          >
            <tabItem.icon className="h-3.5 w-3.5" />
            {t.modes[tabItem.id].short}
          </button>
        ))}
      </div>

      {/* conversation */}
      <div className="space-y-5 p-5 sm:p-7">
        <div className="flex justify-end">
          <div className="max-w-[80%] rounded-lg rounded-br-sm bg-secondary px-4 py-2.5 text-[15px] text-foreground">
            {content.q}
          </div>
        </div>
        <div className="flex gap-3">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center">
            <LogoMark className="h-8 w-8" />
          </div>
          <div
            key={tab.id}
            className="max-w-[85%] animate-fade-in rounded-lg rounded-tl-sm bg-secondary/70 px-4 py-3 text-[15px] leading-7 text-foreground"
          >
            {content.a}
          </div>
        </div>
      </div>
    </div>
  );
}
