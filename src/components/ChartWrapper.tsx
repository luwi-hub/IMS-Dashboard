"use client";

import { ReactNode, useState, useEffect } from "react";

interface ChartWrapperProps {
  title: string;
  children: ReactNode;
}

export function ChartWrapper({ title, children }: ChartWrapperProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-slate-800 font-semibold">{title}</h3>
      </div>
      <div className="w-full h-[300px] min-h-[300px]">
        {mounted ? children : (
          <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">
            Loading chart...
          </div>
        )}
      </div>
    </div>
  );
}
