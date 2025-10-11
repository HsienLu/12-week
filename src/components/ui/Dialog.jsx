import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

export function Dialog({open, onOpenChange, children, trigger}) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      {trigger}
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-black/40" />
        <DialogPrimitive.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-shadcn-card p-6 rounded-sh-md shadow-sh-md">
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
