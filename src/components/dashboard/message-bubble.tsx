"use client";

import { memo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Check, Copy } from "lucide-react";

import { LogoMark } from "@/components/brand/logo";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system" | "data";
  content: string;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      // `navigator.clipboard` is undefined on insecure origins / old browsers.
      await navigator.clipboard?.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard blocked — fail silently rather than throw in the UI */
    }
  }

  return (
    <button
      onClick={copy}
      className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground opacity-0 transition-opacity hover:bg-accent group-hover:opacity-100"
      aria-label="Copiar respuesta"
    >
      {copied ? (
        <>
          <Check className="h-3 w-3" /> Copiado
        </>
      ) : (
        <>
          <Copy className="h-3 w-3" /> Copiar
        </>
      )}
    </button>
  );
}

function MessageBubbleImpl({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] whitespace-pre-wrap break-words rounded-2xl rounded-br-md bg-secondary px-4 py-2.5 text-[15px] leading-7 text-foreground shadow-sm">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="group flex gap-3">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center">
        <LogoMark className="h-8 w-8" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="prose-chat max-w-none break-words pt-0.5 text-foreground">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {message.content}
          </ReactMarkdown>
        </div>
        {message.content.length > 0 && (
          <div className="mt-1">
            <CopyButton text={message.content} />
          </div>
        )}
      </div>
    </div>
  );
}

export const MessageBubble = memo(MessageBubbleImpl);

export function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center">
        <LogoMark className="h-8 w-8" />
      </div>
      <div className="flex items-center gap-1.5 rounded-lg rounded-tl-sm bg-secondary/60 px-4 py-4">
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
      </div>
    </div>
  );
}
