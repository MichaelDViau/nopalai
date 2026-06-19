"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { Menu, SquarePen } from "lucide-react";
import { toast } from "sonner";

import { cn, deriveChatTitle } from "@/lib/utils";
import { getMode, isModeId, type ModeId } from "@/lib/modes";
import { track, EVENTS } from "@/lib/analytics";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/logo";
import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Composer } from "@/components/dashboard/composer";
import { EmptyState } from "@/components/dashboard/empty-state";
import { UpgradeDialog } from "@/components/dashboard/upgrade-dialog";
import { AdPlaceholder } from "@/components/dashboard/ad-placeholder";
import {
  MessageBubble,
  TypingIndicator,
  type ChatMessage,
} from "@/components/dashboard/message-bubble";
import type { ChatSummary, UsageState } from "@/types/chat";

interface ChatAppProps {
  initialChats: ChatSummary[];
  initialUsage: UsageState;
}

const SIDEBAR_EXPANDED = 288;
const SIDEBAR_RAIL = 72;
const PIN_STORAGE_KEY = "nopal:sidebar-pinned";

/** Lightweight shimmer shown while an existing conversation loads. */
function ConversationSkeleton() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-8 px-4 py-6">
      <div className="flex justify-end">
        <Skeleton className="h-10 w-56 rounded-2xl" />
      </div>
      <div className="flex gap-3">
        <Skeleton className="h-8 w-8 shrink-0 rounded-lg" />
        <div className="w-full max-w-xl space-y-2.5">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[92%]" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
      <div className="flex justify-end">
        <Skeleton className="h-10 w-40 rounded-2xl" />
      </div>
      <div className="flex gap-3">
        <Skeleton className="h-8 w-8 shrink-0 rounded-lg" />
        <div className="w-full max-w-md space-y-2.5">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    </div>
  );
}

export function ChatApp({ initialChats, initialUsage }: ChatAppProps) {
  const { t } = useLanguage();
  const [chats, setChats] = useState<ChatSummary[]>(initialChats);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [mode, setMode] = useState<ModeId>("general");
  const [usage, setUsage] = useState<UsageState>(initialUsage);
  const [input, setInput] = useState("");
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Desktop sidebar: pinned (fixed-open) vs. collapsed icon rail. The state is
  // fully user-controlled via the collapse/expand button — there is no
  // hover-to-expand, so the rail never changes width on its own.
  const [pinned, setPinned] = useState(true);
  const [pinLoaded, setPinLoaded] = useState(false);

  const [upgrade, setUpgrade] = useState<{
    open: boolean;
    reason: "limit" | "manual";
  }>({ open: false, reason: "manual" });

  const activeChatIdRef = useRef<string | null>(null);
  activeChatIdRef.current = activeChatId;

  const scrollRef = useRef<HTMLDivElement>(null);

  // Restore the pinned preference.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(PIN_STORAGE_KEY);
      if (saved !== null) setPinned(saved === "1");
    } catch {
      /* ignore */
    }
    setPinLoaded(true);
  }, []);

  // Honor a `?mode=` deep-link from the marketing/landing CTAs so the assistant
  // intent carries into a fresh chat. Read once on mount; ignored if invalid.
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("mode");
    if (param && isModeId(param)) setMode(param);
  }, []);

  const togglePin = useCallback(() => {
    setPinned((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(PIN_STORAGE_KEY, next ? "1" : "0");
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const refreshUsage = useCallback(async () => {
    try {
      const res = await fetch("/api/usage");
      if (res.ok) setUsage(await res.json());
    } catch {
      /* non-critical */
    }
  }, []);

  const { messages, append, status, stop, setMessages } = useChat({
    api: "/api/chat",
    onFinish() {
      refreshUsage();
      const id = activeChatIdRef.current;
      if (!id) return;
      setChats((prev) => {
        const idx = prev.findIndex((c) => c.id === id);
        if (idx < 0) return prev;
        const updated = {
          ...prev[idx],
          updated_at: new Date().toISOString(),
        };
        return [updated, ...prev.filter((_, i) => i !== idx)];
      });
    },
    onError(err) {
      const text = err?.message ?? "";
      if (text.includes("limit_reached") || text.includes("429")) {
        setMessages((prev) =>
          prev.length && prev[prev.length - 1].role === "user"
            ? prev.slice(0, -1)
            : prev,
        );
        track(EVENTS.LIMIT_REACHED, { plan: usage.plan });
        setUpgrade({ open: true, reason: "limit" });
        refreshUsage();
      } else {
        toast.error(t.dash.errSend);
      }
    },
  });

  const isStreaming = status === "submitted" || status === "streaming";

  // Auto-scroll to the latest message.
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, status]);

  // Surface a success toast after a Stripe upgrade.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("upgraded") === "1") {
      track(EVENTS.PREMIUM_UPGRADED);
      toast.success(t.dash.upgraded);
      refreshUsage();
      window.history.replaceState({}, "", "/dashboard");
    }
  }, [refreshUsage, t.dash.upgraded]);

  async function ensureChat(text: string): Promise<string | null> {
    if (activeChatId) return activeChatId;
    try {
      const res = await fetch("/api/chats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, title: deriveChatTitle(text) }),
      });
      if (!res.ok) throw new Error();
      const { chat } = await res.json();
      const summary: ChatSummary = {
        id: chat.id,
        title: chat.title,
        mode: chat.mode,
        created_at: chat.created_at,
        updated_at: chat.updated_at,
      };
      setChats((prev) => [summary, ...prev]);
      setActiveChatId(chat.id);
      activeChatIdRef.current = chat.id;
      track(EVENTS.CHAT_STARTED, { mode });
      return chat.id;
    } catch {
      toast.error(t.dash.errCreate);
      return null;
    }
  }

  const send = useCallback(
    async (raw?: string) => {
      const text = (raw ?? input).trim();
      if (!text || isStreaming || loadingMessages) return;

      if (usage.plan === "free" && usage.used >= usage.limit) {
        setUpgrade({ open: true, reason: "limit" });
        return;
      }

      setInput("");
      const id = await ensureChat(text);
      if (!id) return;

      setUsage((u) => ({
        ...u,
        used: u.used + 1,
        remaining: Math.max(0, u.remaining - 1),
      }));
      track(EVENTS.MESSAGE_SENT, { mode });

      append({ role: "user", content: text }, { body: { chatId: id, mode } });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [input, isStreaming, loadingMessages, usage, mode, activeChatId],
  );

  async function selectChat(id: string) {
    if (id === activeChatId || loadingMessages) return;
    setActiveChatId(id);
    activeChatIdRef.current = id;
    const chat = chats.find((c) => c.id === id);
    if (chat) setMode(getMode(chat.mode).id);
    setLoadingMessages(true);
    try {
      const res = await fetch(`/api/chats/${id}`);
      if (res.ok) {
        const data = await res.json();
        setMessages(
          (data.messages as ChatMessage[]).map((m) => ({
            id: m.id,
            role: m.role,
            content: m.content,
          })),
        );
      }
    } catch {
      toast.error(t.dash.errOpen);
    } finally {
      setLoadingMessages(false);
    }
  }

  function newChat() {
    if (isStreaming) stop();
    setActiveChatId(null);
    activeChatIdRef.current = null;
    setMessages([]);
    setInput("");
    setMode("general");
  }

  async function renameChat(id: string, title: string) {
    setChats((prev) => prev.map((c) => (c.id === id ? { ...c, title } : c)));
    try {
      await fetch(`/api/chats/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
    } catch {
      toast.error(t.dash.errRename);
    }
  }

  async function deleteChat(id: string) {
    setChats((prev) => prev.filter((c) => c.id !== id));
    if (activeChatId === id) newChat();
    try {
      await fetch(`/api/chats/${id}`, { method: "DELETE" });
    } catch {
      toast.error(t.dash.errDelete);
    }
  }

  function openUpgrade() {
    track(EVENTS.UPGRADE_CLICKED, { source: "sidebar" });
    setUpgrade({ open: true, reason: "manual" });
  }

  function handleModeChange(next: ModeId) {
    setMode(next);
    track(EVENTS.MODE_SELECTED, { mode: next });
  }

  const hasMessages = messages.length > 0;

  const railExpanded = pinned;
  const transitionCls = pinLoaded
    ? "transition-[width,box-shadow] duration-300 ease-out"
    : "";

  return (
    <div className="flex h-dvh overflow-hidden">
      {/* Desktop sidebar — collapsible icon rail, toggled by the user only */}
      <div
        className={cn("relative z-30 hidden shrink-0 md:block", transitionCls)}
        style={{ width: pinned ? SIDEBAR_EXPANDED : SIDEBAR_RAIL }}
        aria-label="Barra lateral"
      >
        <div
          className={cn(
            "glass-panel absolute inset-y-0 left-0 flex h-full flex-col overflow-hidden border-r border-border/60",
            transitionCls,
          )}
          style={{ width: railExpanded ? SIDEBAR_EXPANDED : SIDEBAR_RAIL }}
        >
          <Sidebar
            chats={chats}
            activeChatId={activeChatId}
            usage={usage}
            onSelect={selectChat}
            onNewChat={newChat}
            onRename={renameChat}
            onDelete={deleteChat}
            onUpgrade={openUpgrade}
            collapsed={!railExpanded}
            pinned={pinned}
            onTogglePin={togglePin}
          />
        </div>
      </div>

      {/* Mobile drawer */}
      <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
        <SheetContent
          side="left"
          className="w-[300px] max-w-[88vw] border-r border-border/60 bg-background/90 p-0 backdrop-blur-xl backdrop-saturate-150"
        >
          <SheetTitle className="sr-only">{t.dash.openMenu}</SheetTitle>
          <Sidebar
            chats={chats}
            activeChatId={activeChatId}
            usage={usage}
            onSelect={(id) => {
              setMobileNavOpen(false);
              void selectChat(id);
            }}
            onNewChat={() => {
              setMobileNavOpen(false);
              newChat();
            }}
            onRename={renameChat}
            onDelete={deleteChat}
            onUpgrade={openUpgrade}
          />
        </SheetContent>
      </Sheet>

      {/* Main */}
      <main className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border/60 bg-background/80 px-3 backdrop-blur md:px-4">
          <div className="flex min-w-0 items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 md:hidden"
              onClick={() => setMobileNavOpen(true)}
              aria-label={t.dash.openMenu}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Logo />
          </div>
          <div className="ml-auto flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 md:hidden"
              onClick={newChat}
              aria-label={t.dash.newChat}
            >
              <SquarePen className="h-[18px] w-[18px]" />
            </Button>
          </div>
        </header>

        {/* Conversation */}
        <div ref={scrollRef} className="chat-scroll min-h-0 flex-1">
          {loadingMessages ? (
            <ConversationSkeleton />
          ) : !hasMessages ? (
            <EmptyState
              mode={mode}
              onModeChange={handleModeChange}
              onPick={send}
            />
          ) : (
            <div className="mx-auto w-full max-w-3xl space-y-7 px-4 py-6 md:px-6">
              {messages.map((m) => (
                <MessageBubble
                  key={m.id}
                  message={{ id: m.id, role: m.role, content: m.content }}
                />
              ))}
              {status === "submitted" && <TypingIndicator />}
              {usage.plan === "free" && hasMessages && (
                <AdPlaceholder className="mx-auto max-w-md" />
              )}
            </div>
          )}
        </div>

        {/* Composer */}
        <div className="pb-safe shrink-0 border-t border-border/60 bg-background/80 px-3 pt-3 backdrop-blur md:px-6">
          <Composer
            value={input}
            onChange={setInput}
            onSubmit={() => send()}
            onStop={stop}
            isLoading={isStreaming}
            disabled={loadingMessages}
            placeholder={`${t.dash.askPrefix} ${t.dash.modes[mode].name}…`}
          />
        </div>
      </main>

      <UpgradeDialog
        open={upgrade.open}
        reason={upgrade.reason}
        onOpenChange={(o) => setUpgrade((s) => ({ ...s, open: o }))}
      />
    </div>
  );
}
