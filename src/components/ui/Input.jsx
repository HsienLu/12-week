import React from "react";

export default function Input(props) {
  return (
    <input
      className="border border-shadcn-border bg-transparent rounded-sh-md px-2 py-1 text-shadcn-foreground"
      {...props}
    />
  );
}
