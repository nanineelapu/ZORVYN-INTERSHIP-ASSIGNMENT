"use client";

import React from "react";
import { Search, ArrowUpDown, Lock, Download, Plus, Pencil } from "lucide-react";
import { useDashboard } from "@/lib/context/DashboardContext";

export default function Transactions() {
  const { transactions, search, setSearch, filter, setFilter, role } = useDashboard();
  const [sort, setSort] = React.useState({ key: 'date', order: 'desc' });

  const format = (val) => new Intl.NumberFormat('en-IN', {
    style: 'currency', currency: 'INR', maximumFractionDigits: 0
  }).format(val);

  const items = transactions
    .filter(t => {
      const matchSearch = t.category.toLowerCase().includes(search.toLowerCase());
      const matchType = filter === "All" || t.type === filter;
      return matchSearch && matchType;
    })
    .sort((a, b) => {
      const aVal = sort.key === 'date' ? new Date(a[sort.key]) : a[sort.key];
      const bVal = sort.key === 'date' ? new Date(b[sort.key]) : b[sort.key];
      return sort.order === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
    });

  const handleSort = (key) => {
    setSort(prev => ({ key, order: prev.key === key && prev.order === 'desc' ? 'asc' : 'desc' }));
  };

  const exportCSV = () => {
    const headers = "Date,Category,Amount,Type\n";
    const csvContent = items.map(t => `${t.date},${t.category},${t.amount},${t.type}`).join("\n");
    const blob = new Blob([headers + csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const isAdmin = role === "Admin";

  return (
    <div id="transactions" className="bg-white rounded-xl border border-slate-100 shadow-sm mt-6 overflow-hidden">
      <header className="p-5 md:p-6 border-b border-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-black tracking-tight">Recent Activity</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Transaction log</p>
        </div>

        {isAdmin && (
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {/* Search */}
            <div className="relative flex-1 sm:flex-initial">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
              <input
                placeholder="Find category..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg py-2 pl-9 pr-3 text-xs w-full sm:w-32 outline-none focus:bg-white transition-all"
              />
            </div>

            {/* Filter Toggle */}
            <div className="flex bg-slate-100 p-1 rounded-lg">
              {['All', 'Income', 'Expense'].map(t => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`px-3 py-1.5 rounded-md text-[9px] font-black uppercase transition-all ${
                    filter === t ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Export */}
            <button onClick={exportCSV} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-400 hover:text-slate-900 transition-all">
              <Download size={14} />
            </button>
          </div>
        )}
      </header>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead className="bg-slate-50/50 text-slate-400 font-bold uppercase tracking-widest border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 cursor-pointer" onClick={() => handleSort('date')}>Date</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4 cursor-pointer" onClick={() => handleSort('amount')}>Amount</th>
              <th className="px-6 py-4 text-right">Type</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {items.map(t => (
              <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 text-slate-400">{t.date}</td>
                <td className="px-6 py-4 font-bold">{t.category}</td>
                <td className={`px-6 py-4 font-black ${t.type === 'Income' ? 'text-green-600' : 'text-red-600'}`}>
                  {t.type === 'Income' ? '+' : '-'}{format(t.amount)}
                </td>
                <td className="px-6 py-4 text-right">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${t.type === 'Income' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {t.type}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
