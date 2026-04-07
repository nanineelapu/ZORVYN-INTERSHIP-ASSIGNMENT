"use client";

import { useDashboard } from "@/lib/context/DashboardContext";

export default function Insights() {
  const { transactions } = useDashboard();
  const getSum = (type) => transactions.filter(t => t.type === type).reduce((s, t) => s + t.amount, 0);

  const income = getSum('Income');
  const expense = getSum('Expense');
  const savings = income - expense;

  // Find top category
  const counts = {};
  transactions.filter(t => t.type === 'Expense').forEach(t => {
    counts[t.category] = (counts[t.category] || 0) + t.amount;
  });
  const topCat = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b, "None");

  const fmt = (n) => "₹" + n.toLocaleString("en-IN");

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm mt-8">
      <h3 className="text-lg font-bold text-slate-900 mb-6">Quick Insights</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
            <span className="text-sm text-slate-500">Income</span>
            <span className="text-sm font-bold text-green-600">{fmt(income)}</span>
          </div>
          <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
            <span className="text-sm text-slate-500">Expenses</span>
            <span className="text-sm font-bold text-red-600">{fmt(expense)}</span>
          </div>
          <div className="flex justify-between p-3 bg-slate-900 text-white rounded-lg">
            <span className="text-sm">Savings</span>
            <span className="text-sm font-bold">{fmt(savings)}</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between p-3 border border-slate-50 rounded-lg">
            <span className="text-sm text-slate-500">Top Spend</span>
            <span className="text-sm font-bold">{topCat}</span>
          </div>
          <div className="flex justify-between p-3 border border-slate-50 rounded-lg">
            <span className="text-sm text-slate-500">Burn Rate</span>
            <span className="text-sm font-bold text-red-500">{((expense / income) * 100).toFixed(0)}%</span>
          </div>
          <p className="text-[10px] text-slate-400 italic px-1 pt-2">
            * Tracking {transactions.length} sequence points
          </p>
        </div>
      </div>
    </div>
  );
}
