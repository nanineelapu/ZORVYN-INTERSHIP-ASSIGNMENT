"use client";

import { Wallet, ArrowUp, ArrowDown } from "lucide-react";
import { useDashboard } from "@/lib/context/DashboardContext";

export default function SummaryCards() {
  const { transactions } = useDashboard();
  
  const incomeTot = transactions.filter(t => t.type === 'Income').reduce((s, t) => s + t.amount, 0);
  const expenseTot = transactions.filter(t => t.type === 'Expense').reduce((s, t) => s + t.amount, 0);
  const balance = incomeTot - expenseTot;

  const format = (num) => "₹" + num.toLocaleString("en-IN");

  const data = [
    { name: "Balance", amt: balance, trend: "+2.4%", icon: <Wallet size={20} />, bg: "bg-slate-900" },
    { name: "Income", amt: incomeTot, trend: "+12%", icon: <ArrowUp size={20} />, bg: "bg-green-500" },
    { name: "Expense", amt: expenseTot, trend: "-5%", icon: <ArrowDown size={20} />, bg: "bg-red-500" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {data.map((item, idx) => (
        <div key={idx} className="bg-white p-5 md:p-6 rounded-xl border border-slate-100 shadow-sm transition-all hover:border-slate-300">
          <div className="flex justify-between items-start mb-4">
            <div className={`${item.bg} text-white p-2 rounded-lg`}>
              {item.icon}
            </div>
            <span className={`text-xs font-bold ${item.trend.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
              {item.trend}
            </span>
          </div>
          <p className="text-slate-500 text-[10px] md:text-xs font-bold uppercase mb-1">{item.name}</p>
          <h3 className="text-xl md:text-2xl font-black text-slate-900">{format(item.amt)}</h3>
        </div>
      ))}
    </div>
  );
}
