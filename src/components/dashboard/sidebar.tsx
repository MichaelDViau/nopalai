"use client";

import { useState } from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import {
  Home,
  MessageSquare,
  MoreHorizontal,
  Pencil,
  PencilLine,
  PanelLeft,
  Pin,
  PinOff,
  Plus,
  Search,
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
import { UsageMeter } from "@/components/dashboard/usage-meter";
import { AdPlaceholder } from "@/components/dashboard/ad-placeholder";
import type { ChatSummary, UsageState } from "@/types/chat";

interface SidebarProps {
  chats: ChatSummary[];
  pinned?: boolean;
  onPinnedChange?: (pinned: boolean) => void;
  activeChatId: string | null;
  usage: UsageState;
  onSelect: (id: string) => void;
  onNewChat: () => void;
  onRename: (id: string, title: string) => void;
  onDelete: (id: string) => void;
  onUpgrade: () => void;
}

export function Sidebar({
  chats,
  pinned = false,
  onPinnedChange,
  activeChatId,
  usage,
  onSelect,
  onNewChat,
  onRename,
  onDelete,
  onUpgrade,
}: SidebarProps) {
  const [renaming, setRenaming] = useState<ChatSummary | null>(null);
  const [deleting, setDeleting] = useState<ChatSummary | null>(null);
  const [title, setTitle] = useState("");

  const labelClass = cn(
    "min-w-0 whitespace-nowrap transition-[opacity,width] duration-200 ease-out",
    !pinned && "md:w-0 md:opacity-0 md:group-hover/sidebar:w-auto md:group-hover/sidebar:opacity-100 md:group-focus-within/sidebar:w-auto md:group-focus-within/sidebar:opacity-100",
  );
  const expandedOnlyClass = cn(
    "transition-[opacity,max-height] duration-200 ease-out",
    !pinned && "md:max-h-0 md:overflow-hidden md:opacity-0 md:group-hover/sidebar:max-h-[999px] md:group-hover/sidebar:opacity-100 md:group-focus-within/sidebar:max-h-[999px] md:group-focus-within/sidebar:opacity-100",
  );

  const fullSidebarClass = cn(
    "relative z-10 flex h-full w-full flex-col bg-secondary/30 transition-opacity duration-200 ease-out dark:bg-black/20",
    !pinned && "md:pointer-events-none md:opacity-0 md:group-hover/sidebar:pointer-events-auto md:group-hover/sidebar:opacity-100 md:group-focus-within/sidebar:pointer-events-auto md:group-focus-within/sidebar:opacity-100",
  );
  const railButtonClass =
    "flex h-12 w-12 items-center justify-center rounded-2xl text-foreground/85 transition-all hover:bg-foreground/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:text-white/90 dark:hover:bg-white/15";

  return (
    <div className="relative h-full w-full overflow-hidden bg-background/70 transition-all duration-300 ease-out backdrop-blur-xl dark:bg-black/70">
      {!pinned && (
        <div className="absolute inset-0 z-20 hidden flex-col items-center border-r border-border/70 bg-background/55 px-3 py-4 backdrop-blur-xl transition-opacity duration-150 group-hover/sidebar:pointer-events-none group-hover/sidebar:opacity-0 group-focus-within/sidebar:pointer-events-none group-focus-within/sidebar:opacity-0 dark:border-white/10 dark:bg-black/65 md:flex">
          <div className="flex flex-col items-center gap-5">
            <button
              type="button"
              className={cn(railButtonClass, "bg-foreground/10 dark:bg-white/15")}
              aria-label="Abrir barra lateral"
              title="Abrir barra lateral"
              onClick={() => onPinnedChange?.(true)}
            >
              <PanelLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              className={railButtonClass}
              aria-label="Nuevo chat"
              title="Nuevo chat"
              onClick={onNewChat}
            >
              <PencilLine className="h-6 w-6" />
            </button>
            <button
              type="button"
              className={railButtonClass}
              aria-label="Buscar chats"
              title="Buscar chats"
              onClick={() => onPinnedChange?.(true)}
            >
              <Search className="h-6 w-6" />
            </button>
            <button
              type="button"
              className={railButtonClass}
              aria-label="Chats"
              title="Chats"
              onClick={() => onPinnedChange?.(true)}
            >
              <MessageSquare className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-auto flex h-12 w-12 items-center justify-center overflow-hidden rounded-full ring-1 ring-border/80 dark:ring-white/15">
            <UserButton
              appearance={{ elements: { avatarBox: "h-10 w-10" } }}
              afterSignOutUrl="/"
            />
          </div>
        </div>
      )}

      <div className={fullSidebarClass}>
      {/* Header */}
      <div className="flex items-center justify-between gap-2 p-3">
        <Button variant="ghost" asChild className="min-w-0 flex-1 justify-start gap-2 px-2">
          <Link href="/" aria-label="Volver al sitio principal">
            <Home className="h-4 w-4 shrink-0" />
            <span className={labelClass}>Inicio</span>
          </Link>
        </Button>
        {onPinnedChange && (
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0"
            aria-label={pinned ? "Contraer barra lateral" : "Fijar barra lateral"}
            title={pinned ? "Contraer barra lateral" : "Fijar barra lateral"}
            onClick={() => onPinnedChange(!pinned)}
          >
            {pinned ? <PinOff className="h-4 w-4" /> : <Pin className="h-4 w-4" />}
          </Button>
        )}
      </div>
      <div className="px-3 pb-2">
        <Button onClick={onNewChat} className="h-10 w-full justify-start gap-2 rounded-xl">
          <Plus className="h-4 w-4 shrink-0" />
          <span className={labelClass}>Nuevo chat</span>
        </Button>
      </div>

      {/* Chat list */}
      <div className={cn("flex-1 overflow-y-auto px-2 py-2", expandedOnlyClass)}>
        {chats.length === 0 ? (
          <p className={cn("px-3 py-8 text-center text-sm text-muted-foreground", !pinned && "md:hidden md:group-hover/sidebar:block md:group-focus-within/sidebar:block")}>
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
                    className="flex min-w-0 flex-1 items-center gap-2 px-3 py-2 text-left text-sm text-foreground"
                    title={chat.title}
                  >
                    <MessageSquare className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className={cn("truncate", labelClass)}>{chat.title || "Nuevo chat"}</span>
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

      {/* Footer */}
      <div className="space-y-3 border-t border-border p-3">
        <UsageMeter usage={usage} onUpgrade={onUpgrade} compact={!pinned} />
        {usage.plan === "free" && (
          <div className={expandedOnlyClass}>
            <AdPlaceholder />
          </div>
        )}
        <div className="flex items-center gap-2 rounded-lg px-1 py-1">
          <UserButton
            appearance={{ elements: { avatarBox: "h-8 w-8" } }}
            afterSignOutUrl="/"
          />
          <span className={cn("text-sm font-medium text-muted-foreground", labelClass)}>
            Mi cuenta
          </span>
        </div>
      </div>

      {/* Rename dialog */}
      <Dialog
        open={!!renaming}
        onOpenChange={(o) => !o && setRenaming(null)}
      >
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
      <Dialog
        open={!!deleting}
        onOpenChange={(o) => !o && setDeleting(null)}
      >
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
    </div>
  );
}
