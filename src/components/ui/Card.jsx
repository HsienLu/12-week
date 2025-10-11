import React from "react";

export default function Card({children, className}) {
  return (
    <div
      className={`bg-shadcn-card rounded-sh-md shadow-sh-sm p-4 ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
}
