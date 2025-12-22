"use client";

import { useEffect, useState } from "react";

export default function Loading() {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const timer = setInterval(() => {
      setDots((prev) => (prev.length === 3 ? "." : prev + "."));
    }, 300);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-[#f6fbff] px-6">
      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow">
        <span className="h-3 w-3 animate-pulse rounded-full bg-emerald-500" />
        <span className="text-sm font-semibold text-slate-800">
          Loading{dots}
        </span>
      </div>
    </div>
  );
}
