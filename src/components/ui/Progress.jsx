import React from "react";

export default function Progress({value}) {
  return (
    <div className="w-full bg-shadcn-border rounded-full h-2 overflow-hidden">
      <div
        className="h-2 bg-gradient-to-r from-shadcn-primary/90 to-shadcn-primary"
        style={{width: value + "%"}}
      />
    </div>
  );
}
