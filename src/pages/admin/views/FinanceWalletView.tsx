import { useState } from "react";
import {
  Wallet, TrendingUp, TrendingDown, DollarSign, CreditCard,
  Building2, RotateCcw, Plus, Search, ArrowUpRight, ArrowDownLeft,
  CheckCircle, Clock, XCircle, Filter
} from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Badge } from "@/components/ui/badge.tsx";

type FinanceTab = "overview" | "transactions" | "payments" | "add_money" | "bank_accounts" | "refunds" | "gst_reports";

export default function FinanceWalletView() {
  const [activeTab, setActiveTab] = useState<FinanceTab>("overview");
  const [search, setSearch] = useState("");

  const TABS: { id: FinanceTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "overview", label: "Wallet Overview", icon: Wallet },
    { id: "transactions", label: "Transactions", icon: TrendingUp },
    { id: "payments", label: "Payments & Withdrawals", icon: CreditCard },
    { id: "add_money", label: "Add Money to Wallet", icon: Plus },
    { id: "bank_accounts", label: "Bank Accounts", icon: Building2 },
    { id: "refunds", label: "Refunds", icon: RotateCcw },
    { id: "gst_reports", label: "GST Reports", icon: DollarSign },
  ];

  const STAT_CARDS = [
    { label: "Total Wallet Balance", value: "₹0.00", icon: Wallet, color: "emerald", trend: "+0%" },
    { label: "Total Collections", value: "₹0.00", icon: TrendingUp, color: "blue", trend: "+0%" },
    { label: "Total Withdrawals", value: "₹0.00", icon: TrendingDown, color: "amber", trend: "0%" },
    { label: "Pending Payouts", value: "₹0.00", icon: Clock, color: "purple", trend: "0 pending" },
  ];

  const colorMap: Record<string, { border: string; icon: string; text: string }> = {
    emerald: { border: "border-emerald-500/20", icon: "bg-emerald-500/10 text-emerald-400", text: "text-emerald-400" },
    blue: { border: "border-blue-500/20", icon: "bg-blue-500/10 text-blue-400", text: "text-blue-400" },
    amber: { border: "border-amber-500/20", icon: "bg-amber-500/10 text-amber-400", text: "text-amber-400" },
    purple: { border: "border-purple-500/20", icon: "bg-purple-500/10 text-purple-400", text: "text-purple-400" },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#111] border border-white/10 rounded-2xl p-5 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Wallet className="h-5 w-5 text-emerald-400" /> Finance & Wallet Management
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Manage all financial operations — wallets, transactions, payments, and refunds.
          </p>
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="bg-[#111] border border-white/10 rounded-2xl p-2 flex gap-2 overflow-x-auto custom-scrollbar">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STAT_CARDS.map((card) => {
              const Icon = card.icon;
              const colors = colorMap[card.color];
              return (
                <div key={card.label} className={`bg-[#111] border ${colors.border} rounded-2xl p-4 shadow-lg`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-gray-400">{card.label}</span>
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${colors.icon}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>
                  <div className={`text-2xl font-black ${colors.text}`} style={{ fontFamily: "Rajdhani, sans-serif" }}>
                    {card.value}
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1">{card.trend}</p>
                </div>
              );
            })}
          </div>

          {/* Wallet Overview Table */}
          <div className="bg-[#111] border border-white/10 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-sm text-white">All User Wallets</h3>
              <div className="relative w-56">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search user wallet..."
                  className="bg-white/5 border-white/10 text-white text-xs pl-9 h-9 rounded-xl"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10 text-gray-400 font-bold uppercase tracking-wider">
                    <th className="py-3 px-4">User</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">Wallet Balance</th>
                    <th className="py-3 px-4">Farmer Balance</th>
                    <th className="py-3 px-4">Dealer Balance</th>
                    <th className="py-3 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={6} className="text-center py-16 text-gray-500">
                      <Wallet className="h-12 w-12 mx-auto mb-3 opacity-20" />
                      <p className="font-semibold">No wallet data yet</p>
                      <p className="text-[10px] mt-1 text-gray-600">Wallet records will appear here once users transact on the platform.</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Transactions Tab */}
      {activeTab === "transactions" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Total Transactions", value: "0", color: "emerald" },
              { label: "Total Collection", value: "₹0.00", color: "blue" },
              { label: "Total Paid Out", value: "₹0.00", color: "amber" },
              { label: "Platform Balance", value: "₹0.00", color: "purple" },
            ].map((s) => (
              <div key={s.label} className={`bg-[#111] border ${colorMap[s.color].border} rounded-2xl p-4`}>
                <p className="text-xs text-gray-400 font-bold">{s.label}</p>
                <p className={`text-xl font-black mt-2 ${colorMap[s.color].text}`} style={{ fontFamily: "Rajdhani, sans-serif" }}>{s.value}</p>
              </div>
            ))}
          </div>
          <div className="bg-[#111] border border-white/10 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-sm text-white">All Transactions</h3>
              <div className="flex gap-2">
                <select className="bg-[#1a1a1a] border border-white/10 text-white text-xs rounded-xl px-3 py-2 outline-none">
                  <option>All Types</option>
                  <option>Payment</option>
                  <option>Payout</option>
                  <option>Refund</option>
                </select>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                  <Input placeholder="Search..." className="bg-white/5 border-white/10 text-white text-xs pl-9 h-9 rounded-xl w-48" />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10 text-gray-400 font-bold uppercase">
                    <th className="py-3 px-4">Txn ID</th>
                    <th className="py-3 px-4">User</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Method</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={7} className="text-center py-16 text-gray-500">
                      <TrendingUp className="h-12 w-12 mx-auto mb-3 opacity-20" />
                      <p className="font-semibold">No transactions recorded yet</p>
                      <p className="text-[10px] mt-1 text-gray-600">All platform transactions will be recorded here automatically.</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Payments & Withdrawals Tab */}
      {activeTab === "payments" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Total Payments In", value: "₹0.00", color: "emerald" },
              { label: "Total Withdrawals", value: "₹0.00", color: "amber" },
              { label: "Pending Withdrawals", value: "₹0.00", color: "blue" },
              { label: "Failed Payments", value: "₹0.00", color: "purple" },
            ].map((s) => (
              <div key={s.label} className={`bg-[#111] border ${colorMap[s.color].border} rounded-2xl p-4`}>
                <p className="text-xs text-gray-400 font-bold">{s.label}</p>
                <p className={`text-xl font-black mt-2 ${colorMap[s.color].text}`} style={{ fontFamily: "Rajdhani, sans-serif" }}>{s.value}</p>
              </div>
            ))}
          </div>
          <EmptyTableCard icon={<CreditCard className="h-12 w-12 mx-auto mb-3 opacity-20" />} title="No payments recorded" subtitle="All payment and withdrawal activities will appear here." />
        </div>
      )}

      {/* Add Money to Wallet Tab */}
      {activeTab === "add_money" && (
        <div className="space-y-4">
          <div className="bg-[#111] border border-white/10 rounded-2xl p-6 max-w-md shadow-xl">
            <h3 className="font-bold text-sm text-white mb-4 flex items-center gap-2">
              <Plus className="h-4 w-4 text-emerald-400" /> Add Money to User Wallet
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-gray-400 font-semibold mb-1 block">Search User (Phone / Name)</label>
                <Input placeholder="Search user..." className="bg-white/5 border-white/10 text-white text-xs h-9" />
              </div>
              <div>
                <label className="text-gray-400 font-semibold mb-1 block">Amount (₹)</label>
                <Input type="number" placeholder="Enter amount..." className="bg-white/5 border-white/10 text-white text-xs h-9" />
              </div>
              <div>
                <label className="text-gray-400 font-semibold mb-1 block">Reason / Note</label>
                <Input placeholder="e.g. Subsidy credit, refund..." className="bg-white/5 border-white/10 text-white text-xs h-9" />
              </div>
              <Button className="w-full bg-emerald-500 text-black font-bold text-xs mt-2">
                <Plus className="h-3.5 w-3.5 mr-1.5" /> Add to Wallet
              </Button>
            </div>
          </div>

          <div className="bg-[#111] border border-white/10 rounded-2xl p-5">
            <h3 className="font-bold text-sm text-white mb-4">Recent Wallet Credits by Admin</h3>
            <EmptyTableCard icon={<Wallet className="h-12 w-12 mx-auto mb-3 opacity-20" />} title="No credits added yet" subtitle="Wallet credits added by admin will be listed here." />
          </div>
        </div>
      )}

      {/* Bank Accounts Tab */}
      {activeTab === "bank_accounts" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: "Total Bank Accounts", value: "0", color: "emerald" },
              { label: "Verified Accounts", value: "0", color: "blue" },
              { label: "Pending Verification", value: "0", color: "amber" },
            ].map((s) => (
              <div key={s.label} className={`bg-[#111] border ${colorMap[s.color].border} rounded-2xl p-4`}>
                <p className="text-xs text-gray-400 font-bold">{s.label}</p>
                <p className={`text-xl font-black mt-2 ${colorMap[s.color].text}`} style={{ fontFamily: "Rajdhani, sans-serif" }}>{s.value}</p>
              </div>
            ))}
          </div>
          <EmptyTableCard icon={<Building2 className="h-12 w-12 mx-auto mb-3 opacity-20" />} title="No bank accounts registered" subtitle="Farmer and dealer bank accounts will appear here for verification." />
        </div>
      )}

      {/* Refunds Tab */}
      {activeTab === "refunds" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Total Refunds", value: "0", color: "emerald" },
              { label: "Amount Refunded", value: "₹0.00", color: "amber" },
              { label: "Pending Refunds", value: "0", color: "blue" },
              { label: "Failed Refunds", value: "0", color: "purple" },
            ].map((s) => (
              <div key={s.label} className={`bg-[#111] border ${colorMap[s.color].border} rounded-2xl p-4`}>
                <p className="text-xs text-gray-400 font-bold">{s.label}</p>
                <p className={`text-xl font-black mt-2 ${colorMap[s.color].text}`} style={{ fontFamily: "Rajdhani, sans-serif" }}>{s.value}</p>
              </div>
            ))}
          </div>
          <EmptyTableCard icon={<RotateCcw className="h-12 w-12 mx-auto mb-3 opacity-20" />} title="No refunds recorded" subtitle="All refund requests and processed refunds will be tracked here." />
        </div>
      )}

      {/* GST Reports Tab */}
      {activeTab === "gst_reports" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Total GST Collected", value: "₹0.00", color: "emerald" },
              { label: "GST Payable", value: "₹0.00", color: "amber" },
              { label: "Input Tax Credit", value: "₹0.00", color: "blue" },
              { label: "Net GST Liability", value: "₹0.00", color: "purple" },
            ].map((s) => (
              <div key={s.label} className={`bg-[#111] border ${colorMap[s.color].border} rounded-2xl p-4`}>
                <p className="text-xs text-gray-400 font-bold">{s.label}</p>
                <p className={`text-xl font-black mt-2 ${colorMap[s.color].text}`} style={{ fontFamily: "Rajdhani, sans-serif" }}>{s.value}</p>
              </div>
            ))}
          </div>
          <div className="bg-[#111] border border-white/10 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-sm text-white">GST Reports by Period</h3>
              <div className="flex gap-2">
                <select className="bg-[#1a1a1a] border border-white/10 text-white text-xs rounded-xl px-3 py-2 outline-none">
                  <option>All Months</option>
                  <option>September 2026</option>
                  <option>August 2026</option>
                  <option>July 2026</option>
                </select>
                <Button size="sm" className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs h-9">
                  Export GSTR-1
                </Button>
              </div>
            </div>
            <EmptyTableCard icon={<DollarSign className="h-12 w-12 mx-auto mb-3 opacity-20" />} title="No GST data available yet" subtitle="GST reports will be auto-generated from platform transactions." />
          </div>
        </div>
      )}
    </div>
  );
}

function EmptyTableCard({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="bg-[#111] border border-white/10 rounded-2xl p-5">
      <div className="text-center py-12 text-gray-500">
        {icon}
        <p className="font-semibold text-sm">{title}</p>
        <p className="text-[11px] mt-1 text-gray-600">{subtitle}</p>
      </div>
    </div>
  );
}
