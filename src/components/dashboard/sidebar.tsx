"use client";

import { useState } from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import {
  MoreHorizontal,
  PanelLeft,
  PanelLeftClose,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LogoMark } from "@/components/brand/logo";
import { UsageMeter } from "@/components/dashboard/usage-meter";
import { AdPlaceholder } from "@/components/dashboard/ad-placeholder";
import { useLanguage } from "@/components/i18n/language-provider";
import type { ChatSummary, UsageState } from "@/types/chat";

interface SidebarProps {
  chats: ChatSummary[];
  activeChatId: string | null;
  usage: UsageState;
  onSelect: (id: string) => void;
  onNewChat: () => void;
  onRename: (id: string, title: string) => void;
  onDelete: (id: string) => void;
  onUpgrade: () => void;
  /** Whether the sidebar is currently showing its full contents. */
  expanded?: boolean;
  /** Whether the user has pinned the sidebar open. */
  pinned?: boolean;
  onTogglePin?: () => void;
  /** Show the pin control (desktop only). */
  showPin?: boolean;
}

export function Sidebar({
  chats,
  activeChatId,
  usage,
  onSelect,
  onNewChat,
  onRename,
  onDelete,
  onUpgrade,
  expanded = true,
  pinned = false,
  onTogglePin,
  showPin = false,
}: SidebarProps) {
  const { t } = useLanguage();
  const [renaming, setRenaming] = useState<ChatSummary | null>(null);
  const [deleting, setDeleting] = useState<ChatSummary | null>(null);
  const [title, setTitle] = useState("");

  // Content keeps a fixed width so it doesn't reflow while the rail animates;
  // the parent clips it to the collapsed width when not expanded.
  const fade = cn(
    "transition-opacity duration-200",
    expanded ? "opacity-100" : "pointer-events-none opacity-0",
  );

  return (
    <div className="flex h-full w-[280px] flex-col bg-secondary/30">
      {/* Header */}
      <div className="flex h-16 items-center gap-2 px-5">
        <Link
          href="/"
          aria-label={t.dashboard.home}
          className="flex min-w-0 items-center gap-2"
        >
          <LogoMark className="h-7 w-7 shrink-0" />
          <span
            className={cn(
              "whitespace-nowrap text-lg font-semibold tracking-tight text-foreground",
              fade,
            )}
          >
            Nopal<span className="text-primary">AI</span>
          </span>
        </Link>
        {showPin && onTogglePin && (
          <button
            type="button"
            onClick={onTogglePin}
            aria-label={pinned ? t.dashboard.unpin : t.dashboard.pin}
            title={pinned ? t.dashboard.unpin : t.dashboard.pin}
            aria-pressed={pinned}
            className={cn(
              "ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
              fade,
            )}
          >
            {pinned ? (
              <PanelLeftClose className="h-[1.1rem] w-[1.1rem]" />
            ) : (
              <PanelLeft className="h-[1.1rem] w-[1.1rem]" />
            )}
          </button>
        )}
      </div>

      {/* New chat */}
      <div className="px-3 pb-2">
        <Button
          onClick={onNewChat}
          className="w-full justify-start gap-2 px-3"
        >
          <Plus className="h-4 w-4 shrink-0" />
          <span className={cn("whitespace-nowrap", fade)}>
            {t.dashboard.newChat}
          </span>
        </Button>
      </div>

      {/* Chat list */}
      <div className={cn("flex-1 overflow-y-auto px-2 py-2", fade)}>
        {chats.length === 0 ? (
          <p className="px-3 py-8 text-center text-sm text-muted-foreground">
            {t.dashboard.emptyConversations}
          </p>
        ) : (
          <ul className="space-y-0.5">
            {chats.map((chat) => (
              <li key={chat.id}>
                <div
                  className={cn(
                    "group flex items-center gap-1 rounded-lg pr-1 transition-colors",
                    activeChatId === chat.id
                      ? "bg-accent"
                      : "hover:bg-accent/60",
                  )}
                >
                  <button
                    onClick={() => onSelect(chat.id)}
                    className="flex-1 truncate px-3 py-2 text-left text-sm text-foreground"
                    title={chat.title}
                  >
                    {chat.title || t.dashboard.untitled}
                  </button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground opacity-0 transition-opacity hover:bg-background group-hover:opacity-100 data-[state=open]:opacity-100"
                        aria-label={t.dashboard.chatOptions}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem
                        onClick={() => {
                          setRenaming(chat);
                          setTitle(chat.title);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                        {t.dashboard.rename}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => setDeleting(chat)}
                      >
                        <Trash2 className="h-4 w-4" />
                        {t.dashboard.delete}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer */}
      <div className="space-y-3 border-t border-border p-3">
        <div
          className={cn(
            "space-y-3 overflow-hidden transition-all duration-200",
            expanded ? "max-h-80 opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <UsageMeter usage={usage} onUpgrade={onUpgrade} />
          {usage.plan === "free" && <AdPlaceholder />}
        </div>
        <div className="flex items-center gap-2 rounded-lg px-1 py-1">
          <UserButton
            appearance={{ elements: { avatarBox: "h-8 w-8" } }}
            afterSignOutUrl="/"
          />
          <span
            className={cn(
              "whitespace-nowrap text-sm font-medium text-muted-foreground",
              fade,
            )}
          >
            {t.dashboard.myAccount}
          </span>
        </div>
      </div>

      {/* Rename dialog */}
      <Dialog open={!!renaming} onOpenChange={(o) => !o && setRenaming(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{t.dashboard.renameTitle}</DialogTitle>
          </DialogHeader>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={80}
            placeholder={t.dashboard.chatNamePlaceholder}
            onKeyDown={(e) => {
              if (e.key === "Enter" && renaming && title.trim()) {
                onRename(renaming.id, title.trim());
                setRenaming(null);
              }
            }}
            autoFocus
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setRenaming(null)}>
              {t.dashboard.cancel}
            </Button>
            <Button
              disabled={!title.trim()}
              onClick={() => {
                if (renaming) onRename(renaming.id, title.trim());
                setRenaming(null);
              }}
            >
              {t.dashboard.save}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirm */}
      <Dialog open={!!deleting} onOpenChange={(o) => !o && setDeleting(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{t.dashboard.deleteTitle}</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            {t.dashboard.deleteDesc(deleting?.title || t.dashboard.untitled)}
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleting(null)}>
              {t.dashboard.cancel}
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (deleting) onDelete(deleting.id);
                setDeleting(null);
              }}
            >
              {t.dashboard.delete}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
