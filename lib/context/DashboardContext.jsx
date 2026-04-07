"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { transactions as initialData } from "@/lib/data/transactions";

const DashboardContext = createContext();

export function DashboardProvider({ children }) {
  const [role, setRole] = useState("Admin");
  const [transactions, setTransactions] = useState(initialData);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // Local storage persistence
  useEffect(() => {
    const savedRole = localStorage.getItem("zorvyn_role");
    const savedTx = localStorage.getItem("zorvyn_tx");
    if (savedRole) setRole(savedRole);
    if (savedTx) setTransactions(JSON.parse(savedTx));
  }, []);

  useEffect(() => {
    localStorage.setItem("zorvyn_role", role);
    localStorage.setItem("zorvyn_tx", JSON.stringify(transactions));
  }, [role, transactions]);

  // Handle adding of a new transaction entry
  const addTx = (newRecord) => {
    setTransactions(prev => [newRecord, ...prev]);
  };

  // Logout mockup
  const logout = () => {
    localStorage.removeItem("zorvyn_role");
    localStorage.removeItem("zorvyn_tx");
    setRole("Viewer");
    setTransactions(initialData);
    window.location.reload();
  };

  return (
    <DashboardContext.Provider
      value={{
        role, setRole,
        transactions, setTransactions,
        addTx,
        search, setSearch,
        filter, setFilter,
        logout,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) throw new Error("useDashboard must be used within DashboardProvider");
  return context;
}
