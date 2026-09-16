"use client";

import { LayoutDashboard, TrendingUp, FileText, DollarSign, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const routes = [
  {
    id: "management",
    label: "Management",
    icon: LayoutDashboard,
  },
  {
    id: "sales",
    label: "Sales",
    icon: TrendingUp,
  },
  {
    id: "claims",
    label: "Claims",
    icon: FileText,
  },
  {
    id: "accounting",
    label: "Accounting",
    icon: DollarSign,
  },
];

interface SidebarProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <div className="flex flex-col h-full w-64 bg-slate-900 text-slate-300 shrink-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">I</span>
          </div>
          InsureCorp
        </h1>
      </div>
      
      <div className="flex-1 px-4 py-4 space-y-2">
        {routes.map((route) => (
          <button
            key={route.id}
            onClick={() => setActiveTab(route.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-slate-800 hover:text-white",
              activeTab === route.id ? "bg-slate-800 text-blue-400" : ""
            )}
          >
            <route.icon className="w-5 h-5" />
            <span className="font-medium">{route.label}</span>
          </button>
        ))}
      </div>
      
      <div className="p-4 border-t border-slate-800">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </button>
      </div>
    </div>
  );
}
