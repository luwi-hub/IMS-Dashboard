"use client";

import { ReactNode } from "react";

interface ChartWrapperProps {
  title: string;
  children: ReactNode;
}

export function ChartWrapper({ title, children }: ChartWrapperProps) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-slate-800 font-semibold">{title}</h3>
      </div>
      <div className="flex-1 min-h-[300px]">
        {children}
      </div>
    </div>
  );
}
