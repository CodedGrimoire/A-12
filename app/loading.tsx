"use client";

import { useEffect, useState } from "react";

export default function Loading() {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setAngle((prev) => (prev + 45) % 360);
    }, 120);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-[#f6fbff] px-6">
      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow">
        <span
          className="inline-block h-5 w-5 rounded-full border-2 border-emerald-500 border-t-transparent"
          style={{
            transform: `rotate(${angle}deg)`,
            transition: "transform 0.12s linear",
          }}
          aria-hidden="true"
        />
        <span className="text-sm font-semibold text-slate-800">Loading</span>
      </div>
    </div>
  );
}
