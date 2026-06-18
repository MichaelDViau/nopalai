"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { Menu, Plus } from "lucide-react";
import { toast } from "sonner";

import { cn, deriveChatTitle } from "@/lib/utils";
import { getMode, type ModeId } from "@/lib/modes";
import { track, EVENTS } from "@/lib/analytics";
import { useLanguage } from "@/components/i18n/language-provider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Logo } from "@/components/brand/logo";
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

export function ChatApp({ initialChats, initialUsage }: ChatAppProps) {
  const { t } = useLanguage();
  const [chats, setChats] = useState<ChatSummary[]>(initialChats);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [mode, setMode] = useState<ModeId>("general");
  const [usage, setUsage] = useState<UsageState>(initialUsage);
  const [input, setInput] = useState("");
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [upgrade, setUpgrade] = useState<{
    open: boolean;
    reason: "limit" | "manual";
  }>({ open: false, reason: "manual" });

  const sidebarExpanded = pinned || hovered;

  // Restore the pin preference set on a previous visit.
  useEffect(() => {
    setPinned(localStorage.getItem("sidebarPinned") === "1");
  }, []);

  const togglePin = useCallback(() => {
    setPinned((prev) => {
      const next = !prev;
      localStorage.setItem("sidebarPinned", next ? "1" : "0");
      return next;
    });
  }, []);

  const activeChatIdRef = useRef<string | null>(null);
  activeChatIdRef.current = activeChatId;

  const scrollRef = useRef<HTMLDivElement>(null);

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
        toast.error(t.dashboard.toasts.genError);
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
      toast.success(t.dashboard.toasts.welcome);
      refreshUsage();
      window.history.replaceState({}, "", "/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshUsage]);

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
      toast.error(t.dashboard.toasts.createChatError);
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
    setSidebarOpen(false);
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
      toast.error(t.dashboard.toasts.openChatError);
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
    setSidebarOpen(false);
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
      toast.error(t.dashboard.toasts.renameError);
    }
  }

  async function deleteChat(id: string) {
    setChats((prev) => prev.filter((c) => c.id !== id));
    if (activeChatId === id) newChat();
    try {
      await fetch(`/api/chats/${id}`, { method: "DELETE" });
    } catch {
      toast.error(t.dashboard.toasts.deleteError);
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

  const activeMode = useMemo(() => getMode(mode), [mode]);
  const hasMessages = messages.length > 0;

  const sidebarProps = {
    chats,
    activeChatId,
    usage,
    onSelect: selectChat,
    onNewChat: newChat,
    onRename: renameChat,
    onDelete: deleteChat,
    onUpgrade: openUpgrade,
  };

  return (
    <div className="flex h-dvh overflow-hidden">
      {/* Desktop sidebar — collapses to a compact rail, expands on hover,
          and can be pinned permanently open. */}
      <aside
        className={cn(
          "relative hidden shrink-0 transition-[width] duration-300 ease-in-out md:block",
          pinned ? "w-[280px]" : "w-[68px]",
        )}
      >
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocusCapture={() => setHovered(true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
              setHovered(false);
            }
          }}
          className={cn(
            "absolute inset-y-0 left-0 z-40 overflow-hidden border-r border-border bg-background transition-[width] duration-300 ease-in-out",
            sidebarExpanded ? "w-[280px]" : "w-[68px]",
            !pinned && sidebarExpanded && "shadow-2xl",
          )}
        >
          <Sidebar
            {...sidebarProps}
            expanded={sidebarExpanded}
            pinned={pinned}
            onTogglePin={togglePin}
            showPin
          />
        </div>
      </aside>

      {/* Mobile sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-[280px] p-0">
          <SheetTitle className="sr-only">{t.dashboard.chatsMenu}</SheetTitle>
          <Sidebar {...sidebarProps} expanded />
        </SheetContent>
      </Sheet>

      {/* Main */}
      <main className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="flex h-14 items-center justify-between gap-2 border-b border-border px-3 md:px-5">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSidebarOpen(true)}
              aria-label={t.dashboard.openMenu}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Badge variant="secondary" className="gap-1.5">
              <activeMode.icon className="h-3.5 w-3.5" />
              {t.modes[activeMode.id].short}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 md:hidden"
            onClick={newChat}
          >
            <Plus className="h-4 w-4" />
            {t.dashboard.new}
          </Button>
          <div className="hidden md:block">
            <Logo showText={false} />
          </div>
        </header>

        {/* Conversation */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto">
          {!hasMessages && !loadingMessages ? (
            <EmptyState
              mode={mode}
              onModeChange={handleModeChange}
              onPick={send}
            />
          ) : (
            <div className="mx-auto w-full max-w-3xl space-y-6 px-4 py-6">
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
        <div className="border-t border-border bg-background/80 px-4 py-4 backdrop-blur">
          <Composer
            value={input}
            onChange={setInput}
            onSubmit={() => send()}
            onStop={stop}
            isLoading={isStreaming}
            disabled={loadingMessages}
            placeholder={t.dashboard.composer.placeholder(
              t.modes[activeMode.id].short,
            )}
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
