import React from "react";

export default function Checkbox({checked, onChange, ...props}) {
  return (
    <input
      type="checkbox"
      className="h-4 w-4 rounded-sm border border-shadcn-border text-shadcn-primary bg-white focus:ring-2 focus:ring-shadcn-primary/30"
      checked={checked}
      onChange={onChange}
      {...props}
    />
  );
}
