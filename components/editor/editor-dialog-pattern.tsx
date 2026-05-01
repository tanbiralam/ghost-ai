import type { ReactNode } from "react";

import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface EditorDialogPatternProps {
  title: string;
  description: string;
  footer: ReactNode;
  children?: ReactNode;
  className?: string;
}

export function EditorDialogPattern({
  title,
  description,
  footer,
  children,
  className,
}: EditorDialogPatternProps) {
  return (
    <div
      className={cn(
        "grid gap-5 rounded-3xl bg-elevated text-copy-primary",
        className
      )}
    >
      <DialogHeader>
        <DialogTitle className="text-copy-primary">{title}</DialogTitle>
        <DialogDescription className="text-copy-secondary">
          {description}
        </DialogDescription>
      </DialogHeader>

      {children ? <div className="grid gap-4">{children}</div> : null}

      <DialogFooter className="border-surface-border bg-subtle/70">
        {footer}
      </DialogFooter>
    </div>
  );
}
