"use client";

import React from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";
import { useDashboard } from "@/lib/context/DashboardContext";
import { monthlyData } from "@/lib/data/chartData";

const COLORS = ["#0f172a", "#10b981", "#ef4444", "#6366f1", "#f59e0b"];

export default function Charts() {
  const { transactions } = useDashboard();
  
  const expenseData = transactions
    .filter(t => t.type === 'Expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const pieData = Object.keys(expenseData).map(name => ({
    name,
    value: expenseData[name]
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mt-6">
      {/* Line Chart */}
      <div className="bg-white p-5 md:p-6 rounded-xl border border-slate-100 shadow-sm h-64 md:h-80 flex flex-col">
        <div className="mb-4">
          <h3 className="text-sm font-bold text-slate-800">Monthly Balance</h3>
          <p className="text-[10px] text-slate-400">Total growth history</p>
        </div>

        <div className="flex-1 min-h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <XAxis dataKey="month" hide />
              <YAxis hide />
              <Tooltip />
              <Line type="monotone" dataKey="balance" stroke="#0f172a" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-white p-5 md:p-6 rounded-xl border border-slate-100 shadow-sm h-auto md:h-80 flex flex-col">
        <div className="mb-4">
          <h3 className="text-sm font-bold text-slate-800">Spending Overview</h3>
          <p className="text-[10px] text-slate-400">Categorical breakdown</p>
        </div>

        <div className="flex-1 flex flex-col sm:flex-row items-center gap-6 pb-2 min-h-[250px]">
          <div className="flex-1 h-48 sm:h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius="50%"
                  outerRadius="80%"
                  dataKey="value"
                >
                  {pieData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap sm:flex-col gap-x-4 gap-y-1 justify-center">
            {pieData.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                <span className="text-[9px] font-bold text-slate-500 uppercase">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
