"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Dashboard/Sidebar";
import Topbar from "@/components/Dashboard/Topbar";
import SummaryCards from "@/components/Dashboard/SummaryCards";
import Charts from "@/components/Dashboard/Charts";
import Transactions from "@/components/Dashboard/Transactions";
import Insights from "@/components/Dashboard/Insights";
import { Plus, Menu, X } from "lucide-react";

export default function Dashboard() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden">

      {/* Sidebar - Desktop */}
      <aside className="hidden lg:block w-64 border-r border-slate-200 bg-white">
        <div className="sticky top-0 h-screen overflow-y-auto">
          <Sidebar />
        </div>
      </aside>

      {/* Mobile Drawer Overlay */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowMobileMenu(false)} />
          <div className="absolute inset-y-0 left-0 w-72 bg-white shadow-2xl transition-all duration-300">
            <button
              onClick={() => setShowMobileMenu(false)}
              className="absolute -right-12 top-4 p-2.5 bg-white rounded-xl shadow-lg border border-slate-100"
            >
              <X size={20} />
            </button>
            <div className="h-full overflow-y-auto">
              <Sidebar />
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Mobile Navbar Top */}
        <header className="lg:hidden h-14 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <div className="bg-slate-900 p-1 rounded-md text-white"><Plus size={14} /></div>
            <span className="font-black text-sm tracking-tighter">ZORVYN</span>
          </div>
          <button onClick={() => setShowMobileMenu(true)} className="p-2 bg-slate-50 border border-slate-200 rounded-lg active:scale-95 transition-all">
            <Menu size={20} />
          </button>
        </header>

        <Topbar />

        <main className="flex-1 p-4 md:p-8 lg:p-10 max-w-7xl w-full mx-auto space-y-6 md:space-y-10">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight leading-tight">Financial Workspace</h1>
              <p className="text-slate-400 text-sm mt-1">Activity Overview & Ledger</p>
            </div>
            <button className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all active:scale-[0.98] w-full sm:w-auto shadow-lg shadow-slate-200">
              <Plus size={20} />
              <span>Create Report</span>
            </button>
          </div>

          <SummaryCards />
          <Charts />
          <Transactions />
          <Insights />

          {/* Bottom Padding for Mobile */}
          <div className="h-4 lg:hidden" />
        </main>
      </div>
    </div>
  );
}