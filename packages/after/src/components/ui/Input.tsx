import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // 1. Base Styles (Light Mode)
        // bg-background와 text-foreground는 Light Mode에서 흰색/검은색이 됩니다.
        "bg-background text-foreground file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground border-input h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",

        // 2. ✅ DARK MODE OVERRIDES (Lighter Surface / Dark Text)
        // Global DM (Dark BG / Light Text) 규칙을 깨고, Input만 밝게 만듭니다.
        "dark:bg-gray-100 dark:text-gray-900 dark:border-gray-400 dark:placeholder:text-gray-600",

        // 3. Focus/Invalid
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  );
}

export { Input };
