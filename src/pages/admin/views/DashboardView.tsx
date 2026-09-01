import { Users, Store, ShoppingCart, CreditCard, TrendingUp, ArrowUpRight, Activity, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge.tsx";
import { Button } from "@/components/ui/button.tsx";
import type { Farmer } from "../types.ts";
import type { Dealer, OrderItem } from "../types.ts";
import type { KccApplication } from "@/context/AppContext.tsx";
import { useApp } from "@/context/AppContext.tsx";

interface DashboardViewProps {
  onNavigate: (tab: string) => void;
  farmers?: Farmer[];
  dealers?: Dealer[];
  orders?: OrderItem[];
  kccApplications?: KccApplication[];
}

export default function DashboardView({
  onNavigate,
  farmers = [],
  dealers = [],
  orders = [],
  kccApplications = [],
}: DashboardViewProps) {
  const { adminName } = useApp();
  // ─── Live Stats from real data ───
  const totalFarmers = farmers.length;
  const activeFarmers = farmers.filter((f) => f.status === "active").length;
  const totalDealers = dealers.length;
  const activeDealers = dealers.filter((d) => d.status === "active").length;
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "placed" || o.status === "processing").length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.amount || 0), 0);
  const kccTotal = kccApplications.length;
  const kccPending = kccApplications.filter((k) => k.status === "pending").length;
  const kccApproved = kccApplications.filter((k) => k.status === "approved").length;

  const STAT_CARDS = [
    { title: "Total Farmers", value: totalFarmers.toLocaleString("en-IN"), icon: Users, color: "emerald", tab: "farmers", sub: `${activeFarmers} Active` },
    { title: "Total Dealers", value: totalDealers.toLocaleString("en-IN"), icon: Store, color: "blue", tab: "dealers", sub: `${activeDealers} Active` },
    { title: "Total Orders", value: totalOrders.toLocaleString("en-IN"), icon: ShoppingCart, color: "amber", tab: "orders", sub: `${pendingOrders} Pending` },
    { title: "Total Revenue", value: `₹${totalRevenue.toLocaleString("en-IN")}`, icon: CreditCard, color: "emerald", tab: "payments", sub: "Lifetime" },
    { title: "KCC Applications", value: kccTotal.toLocaleString("en-IN"), icon: TrendingUp, color: "purple", tab: "kisan_card", sub: `${kccPending} Pending` },
    { title: "KCC Approved", value: kccApproved.toLocaleString("en-IN"), icon: CheckCircle2, color: "emerald", tab: "kisan_card", sub: "Cards Issued" },
    { title: "Pending Verifications", value: "0", icon: Activity, color: "amber", tab: "verifications", sub: "Documents" },
    { title: "Support Tickets", value: "0", icon: Activity, color: "red", tab: "support_tickets", sub: "Open Tickets" },
  ];

  const colorMap: Record<string, string> = {
    emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    red: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  const iconColorMap: Record<string, string> = {
    emerald: "bg-emerald-500/10 text-emerald-400",
    blue: "bg-blue-500/10 text-blue-400",
    amber: "bg-amber-500/10 text-amber-400",
    purple: "bg-purple-500/10 text-purple-400",
    red: "bg-red-500/10 text-red-400",
  };

  // Registrations donut calc
  const totalUsers = totalFarmers + totalDealers;
  const farmerPct = totalUsers > 0 ? Math.round((totalFarmers / totalUsers) * 100) : 0;
  const dealerPct = totalUsers > 0 ? Math.round((totalDealers / totalUsers) * 100) : 0;

  // Recent KCC applications
  const recentKcc = kccApplications.slice(0, 5);

  // Recent orders
  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-linear-to-r from-emerald-900/30 to-[#111] border border-emerald-500/20 rounded-2xl p-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-white" style={{ fontFamily: "Rajdhani, sans-serif" }}>
            Welcome back, {adminName || "Aditya Saha"}! 👋
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })} — Here's what's happening on Krivexa today.
          </p>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs text-emerald-400 font-semibold">Live Data</span>
        </div>
      </div>

      {/* 8 Stat Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STAT_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              onClick={() => onNavigate(card.tab)}
              className={`bg-[#111] border rounded-2xl p-4 cursor-pointer transition-all hover:scale-[1.02] shadow-lg ${colorMap[card.color]}`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-gray-400">{card.title}</span>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${iconColorMap[card.color]}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-white" style={{ fontFamily: "Rajdhani, sans-serif" }}>
                {card.value}
              </div>
              <p className="text-[10px] text-gray-500 mt-1 font-medium">{card.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders Overview Chart */}
        <div className="lg:col-span-2 bg-[#111] border border-white/10 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-base text-white">Platform Overview</h3>
              <p className="text-xs text-gray-400">Real-time activity summary</p>
            </div>
            <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ArrowUpRight className="h-3 w-3 mr-1" /> Live
            </Badge>
          </div>

          {/* Activity Bars */}
          <div className="h-64 w-full flex items-end justify-between gap-2 pt-6 pb-2 px-2 relative">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="border-b border-white w-full" />
              ))}
            </div>
            {[
              { label: "Farmers", val: totalFarmers, max: Math.max(totalFarmers, totalDealers, totalOrders, kccTotal) || 1, color: "emerald" },
              { label: "Dealers", val: totalDealers, max: Math.max(totalFarmers, totalDealers, totalOrders, kccTotal) || 1, color: "blue" },
              { label: "Orders", val: totalOrders, max: Math.max(totalFarmers, totalDealers, totalOrders, kccTotal) || 1, color: "amber" },
              { label: "KCC Apps", val: kccTotal, max: Math.max(totalFarmers, totalDealers, totalOrders, kccTotal) || 1, color: "purple" },
              { label: "Approved", val: kccApproved, max: Math.max(totalFarmers, totalDealers, totalOrders, kccTotal) || 1, color: "emerald" },
              { label: "Pending", val: kccPending, max: Math.max(totalFarmers, totalDealers, totalOrders, kccTotal) || 1, color: "red" },
            ].map((d) => (
              <div key={d.label} className="flex-1 flex flex-col items-center gap-2 group z-10">
                <div
                  className={`w-full rounded-t-lg transition-all relative flex items-end justify-center ${
                    d.color === "emerald" ? "bg-emerald-500/20 hover:bg-emerald-500/40" :
                    d.color === "blue" ? "bg-blue-500/20 hover:bg-blue-500/40" :
                    d.color === "amber" ? "bg-amber-500/20 hover:bg-amber-500/40" :
                    d.color === "purple" ? "bg-purple-500/20 hover:bg-purple-500/40" :
                    "bg-red-500/20 hover:bg-red-500/40"
                  }`}
                  style={{ height: `${Math.max((d.val / d.max) * 180, 8)}px` }}
                >
                  <div className={`w-2.5 h-2.5 rounded-full mb-1 group-hover:scale-125 transition-transform ${
                    d.color === "emerald" ? "bg-emerald-400 shadow-emerald-400/50" :
                    d.color === "blue" ? "bg-blue-400 shadow-blue-400/50" :
                    d.color === "amber" ? "bg-amber-400 shadow-amber-400/50" :
                    d.color === "purple" ? "bg-purple-400 shadow-purple-400/50" :
                    "bg-red-400 shadow-red-400/50"
                  } shadow-md`} />
                </div>
                <span className="text-[10px] font-mono text-gray-400">{d.label}</span>
                <span className="text-[10px] font-bold text-white">{d.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* User Distribution Donut Chart */}
        <div className="bg-[#111] border border-white/10 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-base text-white mb-1">User Distribution</h3>
            <p className="text-xs text-gray-400">Farmers vs Dealers</p>
          </div>

          <div className="py-6 flex flex-col items-center justify-center relative">
            <svg className="w-44 h-44 transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-gray-800"
                strokeWidth="4"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              {totalUsers > 0 && (
                <>
                  <path
                    className="text-emerald-500"
                    strokeDasharray={`${farmerPct}, 100`}
                    strokeWidth="4"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-blue-500"
                    strokeDasharray={`${dealerPct}, 100`}
                    strokeDashoffset={`-${farmerPct}`}
                    strokeWidth="4"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </>
              )}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-black text-white" style={{ fontFamily: "Rajdhani, sans-serif" }}>
                {totalUsers.toLocaleString("en-IN")}
              </span>
              <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Total Users</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <div>
                <p className="text-xs font-bold text-white">{totalFarmers.toLocaleString("en-IN")}</p>
                <p className="text-[10px] text-gray-400">Farmers ({farmerPct}%)</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <div>
                <p className="text-xs font-bold text-white">{totalDealers.toLocaleString("en-IN")}</p>
                <p className="text-[10px] text-gray-400">Dealers ({dealerPct}%)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Row: Recent KCC Applications & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent KCC Applications */}
        <div className="bg-[#111] border border-white/10 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-base text-white">Recent KCC Applications</h3>
            <Button variant="link" onClick={() => onNavigate("kisan_card")} className="text-xs text-emerald-400 p-0 h-auto">
              View All →
            </Button>
          </div>
          {recentKcc.length === 0 ? (
            <div className="text-center py-8 text-gray-500 text-xs">
              <p>No KCC applications yet.</p>
              <p className="mt-1 text-gray-600">Applications will appear here when farmers apply.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentKcc.map((app) => (
                <div key={app.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                  <div>
                    <p className="text-xs font-bold text-white">{app.fullName}</p>
                    <p className="text-[10px] text-gray-400">{app.phone} · {app.district}</p>
                  </div>
                  <Badge className={
                    app.status === "approved"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : app.status === "pending"
                      ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                      : "bg-red-500/10 text-red-400 border-red-500/20"
                  }>
                    {app.status}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Orders */}
        <div className="bg-[#111] border border-white/10 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-base text-white">Recent Orders</h3>
            <Button variant="link" onClick={() => onNavigate("orders")} className="text-xs text-emerald-400 p-0 h-auto">
              View All Orders →
            </Button>
          </div>
          {recentOrders.length === 0 ? (
            <div className="text-center py-8 text-gray-500 text-xs">
              <p>No orders yet.</p>
              <p className="mt-1 text-gray-600">Orders from farmers and dealers will appear here.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                  <div>
                    <p className="text-xs font-bold text-white font-mono">{order.id}</p>
                    <p className="text-[10px] text-gray-400">{order.buyer} · {order.product}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-emerald-400">₹{order.amount.toLocaleString("en-IN")}</p>
                    <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-[10px]">{order.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
