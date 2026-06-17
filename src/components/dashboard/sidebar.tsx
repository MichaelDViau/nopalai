"use client";

import { useState } from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import {
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
import { ThemeToggle } from "@/components/theme/theme-toggle";
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
  /** Collapsed = icon-only rail. Expanded = full panel with labels. */
  collapsed?: boolean;
  /** Whether the sidebar is pinned open (desktop only). */
  pinned?: boolean;
  /** Toggle the pinned state. Omitted on mobile, where there's no rail. */
  onTogglePin?: () => void;
}

/**
 * Conversation sidebar.
 *
 * On desktop it renders as a narrow icon rail by default and expands to a
 * full panel on hover (driven by the `collapsed` prop from the parent).
 * Labels and the chat list fade in as it widens, so the same markup serves
 * both states without a jarring content swap.
 */
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
  pinned = false,
  onTogglePin,
}: SidebarProps) {
  const [renaming, setRenaming] = useState<ChatSummary | null>(null);
  const [deleting, setDeleting] = useState<ChatSummary | null>(null);
  const [title, setTitle] = useState("");

  return (
    <div className="flex h-full flex-col bg-secondary/30">
      {/* Header — logo + pin toggle */}
      <div className="flex h-14 items-center gap-2 px-3">
        <Link
          href="/"
          aria-label="Inicio"
          className="flex h-8 w-8 shrink-0 items-center justify-center"
        >
          <LogoMark className="h-7 w-7" />
        </Link>
        {!collapsed && (
          <>
            <span className="flex-1 whitespace-nowrap text-lg font-semibold tracking-tight text-foreground">
              Nopal<span className="text-primary">AI</span>
            </span>
            {onTogglePin && (
              <button
                type="button"
                onClick={onTogglePin}
                aria-label={
                  pinned ? "Contraer barra lateral" : "Fijar barra lateral"
                }
                title={pinned ? "Contraer" : "Fijar abierta"}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {pinned ? (
                  <PanelLeftClose className="h-4 w-4" />
                ) : (
                  <PanelLeftOpen className="h-4 w-4" />
                )}
              </button>
            )}
          </>
        )}
      </div>

      {/* New chat */}
      <div className="px-3 pb-2">
        <Button
          onClick={onNewChat}
          aria-label="Nuevo chat"
          className={cn(
            "h-10 w-full gap-2 overflow-hidden",
            collapsed ? "justify-center px-0" : "justify-start px-3",
          )}
        >
          <Plus className="h-4 w-4 shrink-0" />
          {!collapsed && <span className="whitespace-nowrap">Nuevo chat</span>}
        </Button>
      </div>

      {/* Chat list — titles need width, so it only shows in the full panel */}
      {collapsed ? (
        <div className="flex-1" />
      ) : (
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-2">
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
      )}

      {/* Footer */}
      <div className="border-t border-border p-3">
        {collapsed ? (
          // Rail: compact icon controls only.
          <div className="flex flex-col items-center gap-2">
            {usage.plan === "free" && (
              <button
                type="button"
                onClick={onUpgrade}
                aria-label="Mejorar plan"
                title="Mejorar plan"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors hover:bg-primary/15"
              >
                <Zap className="h-4 w-4 fill-current" />
              </button>
            )}
            <ThemeToggle />
            <UserButton
              appearance={{ elements: { avatarBox: "h-8 w-8" } }}
              afterSignOutUrl="/"
            />
          </div>
        ) : (
          // Full panel.
          <div className="space-y-3">
            <UsageMeter usage={usage} onUpgrade={onUpgrade} />
            {usage.plan === "free" && <AdPlaceholder />}
            <div className="flex items-center gap-2 px-1">
              <UserButton
                appearance={{ elements: { avatarBox: "h-8 w-8" } }}
                afterSignOutUrl="/"
              />
              <span className="flex-1 truncate text-sm font-medium text-muted-foreground">
                Mi cuenta
              </span>
              <ThemeToggle />
            </div>
          </div>
        )}
      </div>

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
            aria-label="Nombre del chat"
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
    </div>
  );
}
