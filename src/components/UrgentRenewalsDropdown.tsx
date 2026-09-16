"use client";

import { useState, useRef, useEffect } from "react";
import { AlertCircle, ChevronDown, Calendar, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

const urgentRenewals = [
  { id: 1, client: "Apex Logistics", date: "Tomorrow", value: "$45,000" },
  { id: 2, client: "Starlight Corp", date: "In 2 days", value: "$120,000" },
  { id: 3, client: "Nebula Systems", date: "In 3 days", value: "$85,000" },
  { id: 4, client: "Omega Industries", date: "In 5 days", value: "$210,000" },
];

export function UrgentRenewalsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleItemClick = (clientName: string) => {
    alert(`Navigating to ${clientName} renewal details page...`);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors border",
          isOpen 
            ? "bg-rose-50 border-rose-200 text-rose-700" 
            : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
        )}
      >
        <div className="relative flex items-center justify-center">
          <AlertCircle className="w-5 h-5 text-rose-500" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full animate-pulse"></span>
        </div>
        <span>Urgent Renewals</span>
        <div className="bg-rose-100 text-rose-700 text-xs px-2 py-0.5 rounded-full font-bold ml-1">
          {urgentRenewals.length}
        </div>
        <ChevronDown className={cn("w-4 h-4 ml-1 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-semibold text-slate-800 text-sm">Action Required</h3>
            <span className="text-xs text-slate-500">Expiring within 7 days</span>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {urgentRenewals.map((renewal) => (
              <button
                key={renewal.id}
                onClick={() => handleItemClick(renewal.client)}
                className="w-full text-left px-4 py-3 border-b border-slate-100 hover:bg-slate-50 transition-colors last:border-0 group"
              >
                <div className="font-medium text-slate-800 group-hover:text-blue-600 transition-colors">
                  {renewal.client}
                </div>
                <div className="flex items-center gap-4 mt-1">
                  <div className="flex items-center gap-1 text-xs text-rose-600 font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    {renewal.date}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <DollarSign className="w-3.5 h-3.5" />
                    {renewal.value}
                  </div>
                </div>
              </button>
            ))}
          </div>
          
          <div className="p-2 border-t border-slate-100 bg-slate-50">
            <button 
              className="w-full py-2 text-sm text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-colors"
              onClick={() => alert('Navigating to full renewals list...')}
            >
              View All Renewals
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
