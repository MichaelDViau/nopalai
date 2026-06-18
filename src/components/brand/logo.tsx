import { cn } from "@/lib/utils";

/**
 * Minimal, abstract nopal mark — two rounded paddles forming an "N".
 * Pro and geometric rather than literal/decorative.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-7 w-7", className)}
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="8" className="fill-primary" />
      <path
        d="M12.5 9.5c0-1.1.9-2 2-2s2 .9 2 2v5.2c0 .9.4 1.3 1.1 1.3.8 0 1.1-.5 1.1-1.5v-1.2c0-1.1.9-2 2-2s2 .9 2 2v2.1c0 3.2-2 5.1-5 5.1-1.2 0-2.2-.4-2.9-1v3.7c0 1.1-.9 2-2 2s-2-.9-2-2V9.5Z"
        className="fill-primary-foreground"
      />
      <circle cx="10.6" cy="11" r="1.6" className="fill-primary-foreground" />
    </svg>
  );
}

export function Logo({
  className,
  showText = true,
}: {
  className?: string;
  showText?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark />
      {showText && (
        <span className="text-lg font-semibold tracking-tight text-foreground">
          Nopal<span className="text-primary">AI</span>
        </span>
      )}
    </span>
  );
}
