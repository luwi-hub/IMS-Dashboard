"use client";

import { useState } from "react";
import { AlertCircle, X, Search, Filter, Calendar, DollarSign, Activity, ChevronRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const urgentRenewals = [
  { id: 1, client: "Apex Logistics", date: "Tomorrow", mrr: "$3,750", health: "Poor", status: "At Risk" },
  { id: 2, client: "Starlight Corp", date: "In 2 days", mrr: "$10,000", health: "Fair", status: "Needs Outreach" },
  { id: 3, client: "Nebula Systems", date: "In 3 days", mrr: "$7,080", health: "Good", status: "Pending Reply" },
  { id: 4, client: "Omega Industries", date: "In 5 days", mrr: "$17,500", health: "Fair", status: "Negotiating" },
  { id: 5, client: "Vertex Tech", date: "In 7 days", mrr: "$4,200", health: "Poor", status: "At Risk" },
];

export function UrgentRenewalsDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filteredRenewals = urgentRenewals.filter(r => 
    r.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors border bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100 shadow-sm"
      >
        <div className="relative flex items-center justify-center">
          <AlertCircle className="w-5 h-5 text-rose-500" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full animate-pulse"></span>
        </div>
        <span>Urgent Renewals</span>
        <div className="bg-rose-500 text-white text-xs px-2 py-0.5 rounded-full font-bold ml-1 shadow-inner">
          {urgentRenewals.length} Urgent
        </div>
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div 
        className={cn(
          "fixed inset-y-0 right-0 w-full sm:w-[450px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-rose-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Urgent Renewals</h2>
              <p className="text-sm text-slate-500">{urgentRenewals.length} accounts require attention</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 border-b border-slate-100 bg-slate-50 shrink-0">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search clients..." 
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="p-2 border border-slate-200 rounded-lg bg-white text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-slate-50 p-6 space-y-3">
          {filteredRenewals.map((renewal) => (
            <div key={renewal.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-200 hover:border-slate-300">
              <button 
                onClick={() => setExpandedId(expandedId === renewal.id ? null : renewal.id)}
                className="w-full p-4 flex items-center justify-between transition-colors text-left group"
              >
                <div>
                  <h3 className="font-semibold text-slate-900 flex items-center gap-2 group-hover:text-blue-600 transition-colors">
                    {renewal.client}
                    {renewal.health === "Poor" && <span className="w-2 h-2 rounded-full bg-rose-500"></span>}
                  </h3>
                  <div className="flex items-center gap-4 mt-1">
                    <div className="flex items-center gap-1 text-xs text-rose-600 font-medium">
                      <Calendar className="w-3.5 h-3.5" /> {renewal.date}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <DollarSign className="w-3.5 h-3.5" /> MRR: {renewal.mrr}
                    </div>
                  </div>
                </div>
                <div className="p-1 rounded-full bg-slate-50 group-hover:bg-blue-50 text-slate-400 group-hover:text-blue-600 transition-colors">
                  {expandedId === renewal.id ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </div>
              </button>
              
              {expandedId === renewal.id && (
                <div className="px-4 pb-4 pt-2 border-t border-slate-100 bg-slate-50/50">
                  <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-white rounded-lg border border-slate-100">
                    <div>
                      <p className="text-xs text-slate-500 mb-1 flex items-center gap-1"><Activity className="w-3.5 h-3.5"/> Health Score</p>
                      <p className={cn(
                        "text-sm font-bold",
                        renewal.health === "Poor" ? "text-rose-600" : renewal.health === "Fair" ? "text-amber-600" : "text-emerald-600"
                      )}>{renewal.health}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Current Status</p>
                      <p className="text-sm font-medium text-slate-700">{renewal.status}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-lg transition-colors shadow-sm">
                      Log Activity
                    </button>
                    <button className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 text-sm font-medium py-2 rounded-lg transition-colors shadow-sm">
                      View Account
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {filteredRenewals.length === 0 && (
            <div className="text-center py-12 flex flex-col items-center text-slate-500">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                <Search className="w-6 h-6 text-slate-300" />
              </div>
              <p className="text-sm">No urgent renewals matching "{searchTerm}"</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
