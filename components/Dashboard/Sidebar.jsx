"use client";

import React from "react";
import { LayoutDashboard, Wallet, LogOut } from "lucide-react";
import { useDashboard } from "@/lib/context/DashboardContext";

export default function Sidebar() {
  const { logout } = useDashboard();

  const menu = [
    { label: "Dashboard", icon: <LayoutDashboard size={18} />, active: true },
    { label: "Transactions", icon: <Wallet size={18} />, active: false },
  ];

  return (
    <div className="w-full bg-white h-full flex flex-col">
      {/* Logo */}
      <div className="p-8">
        <h1 className="text-xl font-black tracking-tighter">ZORVYN</h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 space-y-1">
        {menu.map((item, i) => (
          <a
            key={i}
            href={item.label === "Dashboard" ? "#" : "#transactions"}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${item.active
                ? "bg-slate-900 text-white shadow-lg shadow-slate-200"
                : "text-slate-400 hover:bg-slate-50 hover:text-slate-900"
              }`}
          >
            {item.icon}
            {item.label}
          </a>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 mt-auto">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-600 rounded-xl text-sm font-bold transition-colors"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </div>
  );
}
