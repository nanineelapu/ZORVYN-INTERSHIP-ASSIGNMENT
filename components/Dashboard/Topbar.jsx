"use client";

import React from "react";
import { User, Search } from "lucide-react";
import { useDashboard } from "@/lib/context/DashboardContext";

export default function Topbar() {
  const { role, setRole, search, setSearch } = useDashboard();

  return (
    <header className="h-20 bg-white border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-10">

      {/* 1. Page Title */}
      <h1 className="text-lg font-black tracking-tighter">Dashboard</h1>

      <div className="flex items-center gap-8">

        {/* 2. Small Search (Optional but useful) */}
        <div className="hidden md:flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100 focus-within:border-slate-300 transition-all">
          <Search size={14} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search activity..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-xs font-bold outline-none w-32 xl:w-48 placeholder:text-slate-300"
          />
        </div>

        {/* 3. Role Switch (Required) */}
        <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
          {["Admin", "Viewer"].map(r => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`px-5 py-2 text-[10px] font-black rounded-lg transition-all ${role === r ? "bg-white text-slate-900 shadow-sm" : "text-slate-400"
                }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* User profile identifier */}
        <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
          <span className="text-xs font-black hidden sm:block">Nani</span>
          <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center text-white">
            <User size={16} />
          </div>
        </div>
      </div>
    </header>
  );
}
