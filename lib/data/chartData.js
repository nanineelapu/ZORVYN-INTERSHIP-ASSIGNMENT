/**
 * Synchronized Dashboard Chart Data
 * Mathematically aligned with client targets: 
 * Balance: 33,000 | Income: 75,000 | Expenses: 42,000
 */

// Monthly Balance Trend (Ending at the current balance of 33,000)
export const monthlyData = [
  { month: "Jan", balance: 12000 },
  { month: "Feb", balance: 18500 },
  { month: "Mar", balance: 15000 },
  { month: "Apr", balance: 24000 },
  { month: "May", balance: 29000 },
  { month: "Jun", balance: 33000 }, // Matches Override Balance
];

// Spending Breakdown (Summing exactly to 42,000 Expenses)
export const categoryData = [
  { name: "Studio Rent", value: 20000 },
  { name: "Cloud Infrastructure", value: 12000 },
  { name: "Digital Marketing", value: 6000 },
  { name: "Operational Misc", value: 4000 }, // Total: 42,000
];
