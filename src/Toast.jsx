import React from "react";

export default function Toast({msg, show}) {
  if (!show) return null;
  return (
    <div className="fixed bottom-6 right-6 bg-black text-white px-4 py-2 rounded shadow">
      {msg}
    </div>
  );
}
