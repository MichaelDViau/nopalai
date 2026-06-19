"use client";

import { useState } from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import {
  Home,
  Languages,
  MessageSquare,
  MoreHorizontal,
  PanelLeftClose,
  PanelLeftOpen,
  Pencil,
  Plus,
  Trash2,
  Zap,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { useLanguage } from "@/components/language-provider";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UsageMeter } from "@/components/dashboard/usage-meter";
import { AdPlaceholder } from "@/components/dashboard/ad-placeholder";
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
  /** Render an icon-only rail (desktop, unpinned + not hovered). */
  collapsed?: boolean;
  /** Whether the sidebar is pinned open (drives the collapse/pin toggle). */
  pinned?: boolean;
  /** Toggle pinned state. When omitted (mobile drawer) the control is hidden. */
  onTogglePin?: () => void;
  /**
   * Notifies the host while a popover/menu is open so an auto-collapsing
   * sidebar stays expanded during the interaction.
   */
  onInteractingChange?: (interacting: boolean) => void;
}

/** A single icon + label navigation row that collapses to an icon with a tooltip. */
function NavRow({
  icon: Icon,
  label,
  collapsed,
  onClick,
  href,
  className,
}: {
  icon: typeof Home;
  label: string;
  collapsed: boolean;
  onClick?: () => void;
  href?: string;
  className?: string;
}) {
  const cls = cn(
    "flex h-10 items-center rounded-lg text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
    collapsed ? "w-10 justify-center px-0" : "w-full gap-3 px-3",
    className,
  );

  const inner = (
    <>
      <Icon className="h-[18px] w-[18px] shrink-0" />
      {!collapsed && <span className="truncate">{label}</span>}
    </>
  );

  const el = href ? (
    <Link href={href} className={cls} aria-label={label}>
      {inner}
    </Link>
  ) : (
    <button type="button" onClick={onClick} className={cls} aria-label={label}>
      {inner}
    </button>
  );

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{el}</TooltipTrigger>
        <TooltipContent side="right">{label}</TooltipContent>
      </Tooltip>
    );
  }
  return el;
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
  collapsed = false,
  pinned = true,
  onTogglePin,
  onInteractingChange,
}: SidebarProps) {
  const { t, lang, setLang } = useLanguage();
  const [renaming, setRenaming] = useState<ChatSummary | null>(null);
  const [deleting, setDeleting] = useState<ChatSummary | null>(null);
  const [title, setTitle] = useState("");

  const ToggleIcon = pinned ? PanelLeftClose : PanelLeftOpen;
  const toggleLabel = pinned ? t.dash.collapse : t.dash.pin;
  const toggleLang = () => setLang(lang === "es" ? "en" : "es");

  return (
    <TooltipProvider delayDuration={120}>
      <div className="flex h-full w-full flex-col">
        {/* Header — compact navigation icons + collapse/pin control */}
        <div
          className={cn(
            "flex h-14 items-center px-3",
            collapsed ? "justify-center" : "justify-between",
          )}
        >
          {!collapsed && (
            <div className="flex items-center gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-muted-foreground"
                    asChild
                  >
                    <Link href="/" aria-label={t.dash.home}>
                      <Home className="h-[18px] w-[18px]" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">{t.dash.home}</TooltipContent>
              </Tooltip>
              <ThemeToggle
                variant="icon"
                className="h-9 w-9 text-muted-foreground"
              />
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-muted-foreground"
                    onClick={toggleLang}
                    aria-label={t.nav.language}
                  >
                    <Languages className="h-[18px] w-[18px]" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">{t.nav.language}</TooltipContent>
              </Tooltip>
            </div>
          )}
          {onTogglePin &&
            (collapsed ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10"
                    onClick={onTogglePin}
                    aria-label={toggleLabel}
                  >
                    <ToggleIcon className="h-[18px] w-[18px]" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">{toggleLabel}</TooltipContent>
              </Tooltip>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 shrink-0 text-muted-foreground"
                onClick={onTogglePin}
                aria-label={toggleLabel}
              >
                <ToggleIcon className="h-[18px] w-[18px]" />
              </Button>
            ))}
        </div>

        {/* Primary actions */}
        <div
          className={cn(
            "flex flex-col gap-1 px-3 pb-2 pt-1",
            collapsed && "items-center",
          )}
        >
          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={onNewChat}
                  aria-label={t.dash.newChat}
                  className="flex h-10 w-10 items-center justify-center self-center rounded-lg bg-primary text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
                >
                  <Plus className="h-[18px] w-[18px]" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">{t.dash.newChat}</TooltipContent>
            </Tooltip>
          ) : (
            <Button
              onClick={onNewChat}
              className="h-10 w-full justify-start gap-3 rounded-lg shadow-sm"
            >
              <Plus className="h-[18px] w-[18px] shrink-0" />
              <span className="truncate">{t.dash.newChat}</span>
            </Button>
          )}

          {/* In the collapsed rail, Home + theme + language live here as icons. */}
          {collapsed && (
            <>
              <NavRow icon={Home} label={t.dash.home} collapsed href="/" />
              <ThemeToggle variant="nav" collapsed />
              <NavRow
                icon={Languages}
                label={t.nav.language}
                collapsed
                onClick={toggleLang}
              />
            </>
          )}
        </div>

        {/* Chat list — hidden in the collapsed rail */}
        {!collapsed && (
          <div className="chat-scroll min-h-0 flex-1 px-2 py-2">
            {chats.length === 0 ? (
              <p className="px-3 py-8 text-center text-sm text-muted-foreground">
                {t.dash.emptyChats}
              </p>
            ) : (
              <>
                <p className="px-3 pb-1.5 pt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground/70">
                  {t.dash.recents}
                </p>
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
                          className="flex min-w-0 flex-1 items-center gap-2.5 px-3 py-2 text-left text-sm text-foreground"
                          title={chat.title}
                        >
                          <MessageSquare className="h-4 w-4 shrink-0 text-muted-foreground" />
                          <span className="min-w-0 flex-1 truncate">
                            {chat.title || t.dash.newChat}
                          </span>
                        </button>
                        <DropdownMenu onOpenChange={onInteractingChange}>
                          <DropdownMenuTrigger asChild>
                            <button
                              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground opacity-0 transition-all hover:bg-background focus:opacity-100 group-hover:opacity-100 data-[state=open]:bg-background data-[state=open]:opacity-100"
                              aria-label={t.dash.chatOptions}
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
                              {t.dash.rename}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => setDeleting(chat)}
                            >
                              <Trash2 className="h-4 w-4" />
                              {t.dash.delete}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}

        {collapsed && <div className="flex-1" />}

        {/* Footer */}
        <div
          className={cn(
            "mt-auto border-t border-border/60 p-3",
            collapsed ? "flex flex-col items-center gap-3" : "space-y-3",
          )}
        >
          {collapsed ? (
            <>
              {usage.plan === "free" && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={onUpgrade}
                      aria-label={t.dash.upgrade}
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors hover:bg-primary/20"
                    >
                      <Zap className="h-[18px] w-[18px]" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right">{t.dash.upgrade}</TooltipContent>
                </Tooltip>
              )}
              <UserButton
                appearance={{ elements: { avatarBox: "h-8 w-8" } }}
                afterSignOutUrl="/"
              />
            </>
          ) : (
            <>
              <UsageMeter usage={usage} onUpgrade={onUpgrade} />
              {usage.plan === "free" && <AdPlaceholder />}
              <div className="flex items-center gap-2.5 rounded-lg px-1 py-1">
                <UserButton
                  appearance={{ elements: { avatarBox: "h-8 w-8" } }}
                  afterSignOutUrl="/"
                />
                <span className="truncate text-sm font-medium text-muted-foreground">
                  {t.dash.account}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Rename dialog */}
        <Dialog open={!!renaming} onOpenChange={(o) => !o && setRenaming(null)}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>{t.dash.renameTitle}</DialogTitle>
            </DialogHeader>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={80}
              placeholder={t.dash.chatNamePlaceholder}
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
                {t.dash.cancel}
              </Button>
              <Button
                disabled={!title.trim()}
                onClick={() => {
                  if (renaming) onRename(renaming.id, title.trim());
                  setRenaming(null);
                }}
              >
                {t.dash.save}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete confirm */}
        <Dialog open={!!deleting} onOpenChange={(o) => !o && setDeleting(null)}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>{t.dash.deleteTitle}</DialogTitle>
            </DialogHeader>
            <p className="text-sm text-muted-foreground">
              {t.dash.deleteBodyPre}
              {deleting?.title}
              {t.dash.deleteBodyPost}
            </p>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleting(null)}>
                {t.dash.cancel}
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  if (deleting) onDelete(deleting.id);
                  setDeleting(null);
                }}
              >
                {t.dash.delete}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}
