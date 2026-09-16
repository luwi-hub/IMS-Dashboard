"use client";

import { Sidebar } from "@/components/Sidebar";
import { MetricCard } from "@/components/MetricCard";
import { ChartWrapper } from "@/components/ChartWrapper";
import { UrgentRenewalsDropdown } from "@/components/UrgentRenewalsDropdown";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useEffect, useState } from "react";

// Management Data
const revenueData = [
  { name: "Q1", revenue: 400, expenses: 240 },
  { name: "Q2", revenue: 300, expenses: 139 },
  { name: "Q3", revenue: 200, expenses: 980 },
  { name: "Q4", revenue: 278, expenses: 390 },
];
const accountData = [
  { name: "Renewed", value: 65, color: "#3b82f6" },
  { name: "New", value: 25, color: "#10b981" },
  { name: "Churned", value: 10, color: "#f43f5e" },
];

// Sales Data
const pipelineData = [
  { stage: "Leads", count: 1245 },
  { stage: "Qualified", count: 670 },
  { stage: "Proposal", count: 312 },
  { stage: "Negotiation", count: 145 },
  { stage: "Closed Won", count: 98 },
];
const recentDeals = [
  { name: "Quantum Dynamics", stage: "Closed Won", value: "$125,000", owner: "A. Chen" },
  { name: "Stark Industries", stage: "Negotiation", value: "$450,000", owner: "J. Smith" },
  { name: "Wayne Enterprises", stage: "Proposal", value: "$80,000", owner: "S. Williams" },
  { name: "Cyberdyne Systems", stage: "Closed Won", value: "$320,000", owner: "A. Chen" },
  { name: "Massive Dynamic", stage: "Qualified", value: "$95,000", owner: "M. Johnson" },
];

// Claims Data
const resolutionData = [
  { day: "Oct 1", open: 120, closed: 80 },
  { day: "Oct 5", open: 135, closed: 95 },
  { day: "Oct 11", open: 150, closed: 110 },
  { day: "Oct 15", open: 145, closed: 125 },
  { day: "Oct 20", open: 130, closed: 140 },
  { day: "Oct 25", open: 115, closed: 155 },
];

// Accounting Data
const arAgingData = [
  { range: "1-30 Days", amount: 45000 },
  { range: "31-60 Days", amount: 25000 },
  { range: "61-90 Days", amount: 12000 },
  { range: ">90 Days", amount: 7750 },
];
const invoices = [
  { id: "INV08451", client: "Acme Corp", date: "10/28/23", amount: "$12,500", status: "Paid" },
  { id: "INV08450", client: "Globex", date: "10/27/23", amount: "$8,200", status: "Pending" },
  { id: "INV08449", client: "Stark", date: "10/25/23", amount: "$15,000", status: "Overdue" },
];

export default function SinglePageDashboard() {
  const [activeTab, setActiveTab] = useState("management");

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderManagement = () => (
    <div id="management" className="space-y-6 pt-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Good Morning, Sarah!</h1>
        <p className="text-slate-500 mt-1">Here's your cross-departmental overview for today.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Sales (New Business)" value="$1.2M" trend="12%" trendUp={true} />
        <MetricCard title="Sales (Renewals)" value="$4.8M" trend="8.1%" trendUp={true} />
        <MetricCard title="Total Active Claims" value="345" trend="2%" trendUp={false} />
        <MetricCard title="Total Revenue" value="$6.0M" trend="9.3%" trendUp={true} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ChartWrapper title="Account Status">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={accountData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {accountData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              {accountData.map((entry) => (
                <div key={entry.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                    <span className="text-slate-600">{entry.name}</span>
                  </div>
                  <span className="font-medium">{entry.value}%</span>
                </div>
              ))}
            </div>
          </ChartWrapper>
        </div>
        <div className="lg:col-span-2">
          <ChartWrapper title="Revenue vs Expenses">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} name="Revenue ($K)" />
                <Line type="monotone" dataKey="expenses" stroke="#f43f5e" strokeWidth={2} name="Expenses ($K)" />
              </LineChart>
            </ResponsiveContainer>
          </ChartWrapper>
        </div>
      </div>
    </div>
  );

  const renderSales = () => (
    <div id="sales" className="space-y-6 pt-12 mt-12 border-t border-slate-200">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Sales Dashboard</h1>
          <p className="text-slate-500 mt-1">Pipeline velocity and retention metrics.</p>
        </div>
        <UrgentRenewalsDropdown />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard title="Q4 Revenue Goal" value="$2.45M" trend="70% achieved" trendUp={true} />
        <MetricCard title="New Business Pipeline" value="$5.12M" trend="$2.1M Qualified" trendUp={true} />
        <MetricCard title="Renewal Rate" value="88.4%" trend="1.2%" trendUp={true} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartWrapper title="Pipeline Status">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={pipelineData} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
              <XAxis type="number" stroke="#64748b" />
              <YAxis dataKey="stage" type="category" stroke="#64748b" width={80} />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartWrapper>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col h-full">
          <h3 className="text-slate-800 font-semibold mb-6">Recent Deals</h3>
          <div className="flex-1 overflow-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-slate-500 border-b border-slate-200">
                <tr><th className="pb-3 font-medium">Deal Name</th><th className="pb-3 font-medium">Stage</th><th className="pb-3 font-medium">Value</th><th className="pb-3 font-medium">Owner</th></tr>
              </thead>
              <tbody>
                {recentDeals.map((deal, index) => (
                  <tr key={index} className="border-b border-slate-100 last:border-0">
                    <td className="py-3 font-medium text-slate-800">{deal.name}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${deal.stage === "Closed Won" ? "bg-emerald-100 text-emerald-700" : deal.stage === "Negotiation" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"}`}>{deal.stage}</span>
                    </td>
                    <td className="py-3 text-slate-600">{deal.value}</td>
                    <td className="py-3 text-slate-600">{deal.owner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const renderClaims = () => (
    <div id="claims" className="space-y-6 pt-12 mt-12 border-t border-slate-200">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Claims Dashboard</h1>
        <p className="text-slate-500 mt-1">Claims processing efficiency and resolution tracking.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard title="Total Claims" value="1,482" trend="5.3%" trendUp={true} />
        <MetricCard title="Open Claims" value="315" trend="21.3%" trendUp={false} />
        <MetricCard title="Closed Claims" value="1,167" trend="78.7%" trendUp={true} />
        <MetricCard title="Avg. Resolution" value="14.2 Days" trend="1.1 Days" trendUp={true} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartWrapper title="Open vs Closed Claims Trend">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={resolutionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="day" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Line type="monotone" dataKey="open" stroke="#f59e0b" strokeWidth={2} name="Open Claims" />
              <Line type="monotone" dataKey="closed" stroke="#10b981" strokeWidth={2} name="Closed Claims" />
            </LineChart>
          </ResponsiveContainer>
        </ChartWrapper>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-slate-800 font-semibold mb-6">Processing Stage Breakdown</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1"><span className="font-medium text-slate-700">FNOL</span><span className="text-slate-500">220</span></div>
              <div className="w-full bg-slate-100 rounded-full h-2.5"><div className="bg-sky-400 h-2.5 rounded-full" style={{ width: "45%" }}></div></div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1"><span className="font-medium text-slate-700">Investigation</span><span className="text-slate-500">195</span></div>
              <div className="w-full bg-slate-100 rounded-full h-2.5"><div className="bg-orange-400 h-2.5 rounded-full" style={{ width: "40%" }}></div></div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1"><span className="font-medium text-slate-700">Evaluation</span><span className="text-slate-500">160</span></div>
              <div className="w-full bg-slate-100 rounded-full h-2.5"><div className="bg-emerald-400 h-2.5 rounded-full" style={{ width: "32%" }}></div></div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1"><span className="font-medium text-slate-700">Settlement</span><span className="text-slate-500">145</span></div>
              <div className="w-full bg-slate-100 rounded-full h-2.5"><div className="bg-slate-400 h-2.5 rounded-full" style={{ width: "28%" }}></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAccounting = () => (
    <div id="accounting" className="space-y-6 pt-12 mt-12 border-t border-slate-200 pb-20">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Accounting Dashboard</h1>
        <p className="text-slate-500 mt-1">Financial overview, invoicing, and cash flow tracking.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard title="Total Revenue" value="$185,420" trend="12% MoM" trendUp={true} />
        <MetricCard title="Accounts Receivable" value="$89,750" trend="78% collected" trendUp={true} />
        <MetricCard title="Accounts Payable" value="$42,100" trend="15 Overdue" trendUp={false} />
        <MetricCard title="Net Cash Flow" value="$53,570" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartWrapper title="AR Aging Summary">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={arAgingData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="range" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip cursor={{ fill: '#f1f5f9' }} />
              <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartWrapper>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col h-full">
          <h3 className="text-slate-800 font-semibold mb-6">Latest Invoices</h3>
          <div className="flex-1 overflow-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-slate-500 border-b border-slate-200">
                <tr><th className="pb-3 font-medium">ID</th><th className="pb-3 font-medium">Client</th><th className="pb-3 font-medium">Amount</th><th className="pb-3 font-medium">Status</th></tr>
              </thead>
              <tbody>
                {invoices.map((inv, index) => (
                  <tr key={index} className="border-b border-slate-100 last:border-0">
                    <td className="py-3 font-medium text-slate-800">{inv.id}</td>
                    <td className="py-3 text-slate-600">{inv.client}</td>
                    <td className="py-3 font-medium text-slate-800">{inv.amount}</td>
                    <td className="py-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${inv.status === "Paid" ? "bg-emerald-100 text-emerald-700" : inv.status === "Pending" ? "bg-amber-100 text-amber-700" : "bg-rose-100 text-rose-700"}`}>{inv.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen w-full">
      <Sidebar activeTab={activeTab} setActiveTab={scrollToSection} />
      <main className="flex-1 overflow-y-auto px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          {renderManagement()}
          {renderSales()}
          {renderClaims()}
          {renderAccounting()}
        </div>
      </main>
    </div>
  );
}
