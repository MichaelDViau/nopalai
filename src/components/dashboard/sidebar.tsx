"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import {
  MoreHorizontal,
  PanelLeft,
  PanelLeftClose,
  Pencil,
  Plus,
  Trash2,
  Zap,
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
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { UsageMeter } from "@/components/dashboard/usage-meter";
import { AdPlaceholder } from "@/components/dashboard/ad-placeholder";
import type { ChatSummary, UsageState } from "@/types/chat";

const PIN_STORAGE_KEY = "nopalai:sidebar-pinned";

/** Square icon button used by the collapsed rail (new chat, pin, upgrade). */
const railIconClass =
  "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

interface SidebarProps {
  chats: ChatSummary[];
  activeChatId: string | null;
  usage: UsageState;
  onSelect: (id: string) => void;
  onNewChat: () => void;
  onRename: (id: string, title: string) => void;
  onDelete: (id: string) => void;
  onUpgrade: () => void;
  /**
   * Desktop rail behavior: icons-only by default, expand on hover, and a
   * pin toggle to keep it open. When false (mobile sheet) the full panel
   * is always shown.
   */
  collapsible?: boolean;
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
  collapsible = false,
}: SidebarProps) {
  const [renaming, setRenaming] = useState<ChatSummary | null>(null);
  const [deleting, setDeleting] = useState<ChatSummary | null>(null);
  const [title, setTitle] = useState("");

  // Pin preference is persisted; default collapsed (icons only).
  const [pinned, setPinned] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!collapsible) return;
    setPinned(localStorage.getItem(PIN_STORAGE_KEY) === "1");
  }, [collapsible]);

  function togglePin() {
    setPinned((prev) => {
      const next = !prev;
      localStorage.setItem(PIN_STORAGE_KEY, next ? "1" : "0");
      return next;
    });
  }

  // Mobile sheet (collapsible === false) is always expanded.
  const expanded = !collapsible || pinned || hovered;
  const isFree = usage.plan === "free";

  const body = (
    <>
      {/* Header: brand + (when expanded) pin toggle */}
      <div
        className={cn(
          "flex items-center gap-1 p-3",
          expanded ? "justify-between" : "justify-center",
        )}
      >
        <Link href="/" aria-label="Inicio" className="flex items-center">
          <Logo showText={expanded} />
        </Link>
        {collapsible && expanded && (
          <button
            type="button"
            onClick={togglePin}
            className={railIconClass}
            aria-label={pinned ? "Contraer barra lateral" : "Fijar barra lateral"}
            title={pinned ? "Contraer" : "Fijar abierta"}
          >
            {pinned ? (
              <PanelLeftClose className="h-4 w-4" />
            ) : (
              <PanelLeft className="h-4 w-4" />
            )}
          </button>
        )}
      </div>

      {/* New chat */}
      <div className={cn("pb-2", expanded ? "px-3" : "flex justify-center px-2")}>
        <Button
          onClick={onNewChat}
          aria-label="Nuevo chat"
          className={cn(
            "gap-2",
            expanded ? "w-full justify-start" : "h-10 w-10 justify-center p-0",
          )}
        >
          <Plus className="h-4 w-4" />
          {expanded && <span className="whitespace-nowrap">Nuevo chat</span>}
        </Button>
      </div>

      {/* Chat list — only meaningful when expanded */}
      {expanded ? (
        <div className="flex-1 overflow-y-auto px-2 py-2">
          {chats.length === 0 ? (
            <p className="px-3 py-8 text-center text-sm text-muted-foreground">
              Tus conversaciones aparecerán aquí.
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
                      {chat.title || "Nuevo chat"}
                    </button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground opacity-0 transition-opacity hover:bg-background group-hover:opacity-100 data-[state=open]:opacity-100"
                          aria-label="Opciones del chat"
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
                          Renombrar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => setDeleting(chat)}
                        >
                          <Trash2 className="h-4 w-4" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <div className="flex-1" />
      )}

      {/* Footer */}
      {expanded ? (
        <div className="space-y-3 border-t border-border p-3">
          <UsageMeter usage={usage} onUpgrade={onUpgrade} />
          {isFree && <AdPlaceholder />}
          <div className="flex items-center justify-between gap-2 px-1">
            <div className="flex min-w-0 items-center gap-2">
              <UserButton
                appearance={{ elements: { avatarBox: "h-8 w-8" } }}
                afterSignOutUrl="/"
              />
              <span className="truncate text-sm font-medium text-muted-foreground">
                Mi cuenta
              </span>
            </div>
            <ThemeToggle />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 border-t border-border p-2">
          <ThemeToggle />
          {isFree && (
            <button
              type="button"
              onClick={onUpgrade}
              className={cn(railIconClass, "text-primary hover:text-primary")}
              aria-label="Mejorar a Premium"
              title="Mejorar a Premium"
            >
              <Zap className="h-4 w-4" />
            </button>
          )}
          <UserButton
            appearance={{ elements: { avatarBox: "h-8 w-8" } }}
            afterSignOutUrl="/"
          />
        </div>
      )}

      {/* Rename dialog */}
      <Dialog open={!!renaming} onOpenChange={(o) => !o && setRenaming(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Renombrar chat</DialogTitle>
          </DialogHeader>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={80}
            placeholder="Nombre del chat"
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
              Cancelar
            </Button>
            <Button
              disabled={!title.trim()}
              onClick={() => {
                if (renaming) onRename(renaming.id, title.trim());
                setRenaming(null);
              }}
            >
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirm */}
      <Dialog open={!!deleting} onOpenChange={(o) => !o && setDeleting(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>¿Eliminar este chat?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Se eliminará “{deleting?.title}” y todos sus mensajes. Esta acción no
            se puede deshacer.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleting(null)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (deleting) onDelete(deleting.id);
                setDeleting(null);
              }}
            >
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );

  // Mobile / sheet: a plain, always-expanded panel.
  if (!collapsible) {
    return <div className="flex h-full flex-col bg-secondary/30">{body}</div>;
  }

  // Desktop: a width-reserving spacer holds the layout while the panel
  // itself floats (and casts a shadow) when expanded only on hover, so
  // hovering never reflows the conversation. Pinning reflows it open.
  return (
    <div
      className="relative hidden h-full shrink-0 transition-[width] duration-300 ease-out md:block"
      style={{ width: pinned ? 280 : 68 }}
    >
      <div
        onMouseEnter={() => !pinned && setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          "absolute inset-y-0 left-0 z-30 flex h-full flex-col overflow-hidden border-r border-border bg-secondary/30 transition-[width] duration-300 ease-out",
          expanded && !pinned && "shadow-xl",
        )}
        style={{ width: expanded ? 280 : 68 }}
      >
        {body}
      </div>
    </div>
  );
}
