"use client";

import React from "react";
import { Search, Download, Plus, X, Trash2 } from "lucide-react";
import { useDashboard } from "@/lib/context/DashboardContext";

export default function Transactions() {
  const { transactions, search, setSearch, filter, setFilter, role, addTx, removeTx } = useDashboard();
  const [sort, setSort] = React.useState({ key: 'date', order: 'desc' });
  const [isAdding, setIsAdding] = React.useState(false);
  const [form, setForm] = React.useState({ date: new Date().toISOString().split('T')[0], category: "", amount: "", type: "Expense" });

  const isAdmin = role === "Admin";

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!form.category || !form.amount) return alert("Fill all fields");

    addTx({
      id: "TX-" + Date.now(),
      date: form.date,
      category: form.category,
      amount: parseFloat(form.amount),
      type: form.type,
      status: "Success"
    });

    setIsAdding(false);
    setForm({ date: new Date().toISOString().split('T')[0], category: "", amount: "", type: "Expense" });
  };

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

  return (
    <div id="transactions" className="bg-white rounded-xl border border-slate-100 shadow-sm mt-6 overflow-hidden">

      {/* Modal - Admin Only */}
      {isAdding && isAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsAdding(false)} />
          <form onSubmit={handleAddSubmit} className="relative bg-white w-full max-w-sm rounded-xl shadow-2xl p-6 md:p-8 space-y-5">
            <div className="flex justify-between items-center">
              <h4 className="text-xl font-black">Add Entry</h4>
              <button type="button" onClick={() => setIsAdding(false)} className="text-slate-400 hover:text-slate-900"><X size={20} /></button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Category</label>
                <input required value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:bg-white outline-none" placeholder="e.g. Salary, Rent" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Amount (₹)</label>
                  <input required type="number" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:bg-white outline-none" placeholder="0.00" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Type</label>
                  <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:bg-white outline-none">
                    <option value="Income">Income</option>
                    <option value="Expense">Expense</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Date</label>
                <input required type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:bg-white outline-none" />
              </div>
            </div>

            <button type="submit" className="w-full bg-slate-900 text-white p-4 rounded-xl font-black uppercase text-xs shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all active:scale-95">
              Confirm Transaction
            </button>
          </form>
        </div>
      )}

      <header className="p-5 md:p-6 border-b border-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-black tracking-tight">Recent Activity</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Transaction log</p>
        </div>

        <div className="flex flex-wrap items-center gap-2 md:gap-3 w-full sm:w-auto">
          {/* Search */}
          <div className="relative flex-1 sm:flex-initial">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
            <input
              placeholder="Find..."
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
                className={`px-3 py-1.5 rounded-md text-[9px] font-black uppercase transition-all ${filter === t ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Admin Add Entry Button */}
          {isAdmin && (
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-2 p-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all active:scale-95 text-[10px] font-black uppercase"
            >
              <Plus size={14} />
              <span className="hidden lg:inline">Add Entry</span>
            </button>
          )}

          <button onClick={exportCSV} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-400 hover:text-slate-900 transition-all">
            <Download size={14} />
          </button>
        </div>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead className="bg-slate-50/50 text-slate-400 font-bold uppercase tracking-widest border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 cursor-pointer" onClick={() => handleSort('date')}>Date</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4 cursor-pointer" onClick={() => handleSort('amount')}>Amount</th>
              <th className="px-6 py-4">Type</th>
              {isAdmin && <th className="px-6 py-4 text-right pr-12">Action</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {items.length > 0 ? items.map(t => (
              <tr key={t.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4 text-slate-400">{t.date}</td>
                <td className="px-6 py-4 font-bold">{t.category}</td>
                <td className={`px-6 py-4 font-black ${t.type === 'Income' ? 'text-green-600' : 'text-red-600'}`}>
                  {t.type === 'Income' ? '+' : '-'}{format(t.amount)}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${t.type === 'Income' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {t.type}
                  </span>
                </td>
                {isAdmin && (
                  <td className="px-6 py-4 text-right pr-12">
                    <button
                      onClick={() => removeTx(t.id)}
                      className="text-slate-200 hover:text-red-600 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                )}
              </tr>
            )) : (
              <tr>
                <td colSpan="4" className="px-6 py-12 text-center text-slate-400 font-bold uppercase">No data found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
