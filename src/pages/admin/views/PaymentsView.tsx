import { useState } from "react";
import { Search, CreditCard, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import type { TransactionItem } from "../types.ts";

interface PaymentsViewProps {
  transactions: TransactionItem[];
}

export default function PaymentsView({ transactions }: PaymentsViewProps) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredTransactions = transactions.filter((t) => {
    const matchSearch =
      t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.user.toLowerCase().includes(search.toLowerCase()) ||
      t.method.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "all" || t.type.toLowerCase() === typeFilter.toLowerCase();
    const matchStatus = statusFilter === "all" || t.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <div className="bg-[#111] border border-white/10 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-[#1a1a1a] border border-white/10 text-white text-xs rounded-xl px-3 py-2 outline-none cursor-pointer"
          >
            <option value="all">All Types</option>
            <option value="payment">Payment</option>
            <option value="payout">Payout</option>
            <option value="refund">Refund</option>
            <option value="commission">Commission</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#1a1a1a] border border-white/10 text-white text-xs rounded-xl px-3 py-2 outline-none cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="success">Success</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>

          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search txn ID, user, payment method..."
              className="bg-white/5 border-white/10 text-white text-xs pl-9 h-9 rounded-xl"
            />
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10 text-gray-400 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Txn ID</th>
                <th className="py-3.5 px-4">User</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Method</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredTransactions.map((t) => (
                <tr key={t.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">{t.id}</td>
                  <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                    <CreditCard className="h-3.5 w-3.5 text-emerald-400" />
                    {t.user}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="flex items-center gap-1 font-semibold text-gray-300">
                      {t.type === "Payment" ? (
                        <ArrowDownLeft className="h-3.5 w-3.5 text-emerald-400" />
                      ) : (
                        <ArrowUpRight className="h-3.5 w-3.5 text-amber-400" />
                      )}
                      {t.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-emerald-400">₹{t.amount.toLocaleString("en-IN")}</td>
                  <td className="py-3.5 px-4 text-gray-300 font-medium">{t.method}</td>
                  <td className="py-3.5 px-4 text-gray-400 font-mono">{t.date}</td>
                  <td className="py-3.5 px-4 text-right">
                    <Badge
                      className={
                        t.status === "success"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : t.status === "pending"
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          : "bg-red-500/10 text-red-400 border-red-500/20"
                      }
                    >
                      {t.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
