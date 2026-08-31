import { Users, Store, ShoppingCart, CreditCard, TrendingUp, ArrowUpRight, CheckCircle2, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge.tsx";
import { Button } from "@/components/ui/button.tsx";

interface DashboardViewProps {
  onNavigate: (tab: string) => void;
}

export default function DashboardView({ onNavigate }: DashboardViewProps) {
  const STAT_CARDS = [
    { title: "Total Farmers", value: "12,540", icon: Users, color: "emerald", tab: "farmers" },
    { title: "Pending Farmers", value: "320", icon: Clock, color: "amber", tab: "farmers" },
    { title: "Total Dealers", value: "2,145", icon: Store, color: "emerald", tab: "dealers" },
    { title: "Pending Dealers", value: "96", icon: Clock, color: "amber", tab: "dealers" },
    { title: "Total Orders", value: "8,765", icon: ShoppingCart, color: "emerald", tab: "orders" },
    { title: "Pending Orders", value: "645", icon: Clock, color: "amber", tab: "orders" },
    { title: "Total Revenue", value: "₹48,75,230", icon: CreditCard, color: "emerald", tab: "payments" },
    { title: "Pending Payments", value: "₹6,75,420", icon: TrendingUp, color: "amber", tab: "payments" },
  ];

  const RECENT_ACTIVITIES = [
    { title: "New Farmer registration by Rajesh Kumar", time: "10 mins ago", type: "farmer" },
    { title: "Dealer ABC Agro placed a new order (#ORD8756)", time: "25 mins ago", type: "order" },
    { title: "Farmer Suresh updated key crop product listing", time: "1 hour ago", type: "product" },
    { title: "KCC Application approved for Manoj Yadav", time: "2 hours ago", type: "kcc" },
    { title: "Payout ₹1,09,250 processed for ABC Agro Traders", time: "3 hours ago", type: "payout" },
  ];

  const TOP_PRODUCTS = [
    { name: "Wheat (Grade A)", sales: "₹8,45,000", qty: "320 Qtl", growth: "+14%" },
    { name: "Rice (Basmati 1121)", sales: "₹6,80,000", qty: "210 Qtl", growth: "+18%" },
    { name: "Tomato (Hybrid)", sales: "₹4,12,000", qty: "180 Qtl", growth: "+8%" },
    { name: "NPK Fertilizer 50kg", sales: "₹3,95,000", qty: "450 Bags", growth: "+22%" },
  ];

  return (
    <div className="space-y-6">
      {/* 8 Stat Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STAT_CARDS.map((card) => {
          const Icon = card.icon;
          const isAmber = card.color === "amber";
          return (
            <div
              key={card.title}
              onClick={() => onNavigate(card.tab)}
              className={`bg-[#111] border rounded-2xl p-4 cursor-pointer transition-all hover:scale-[1.02] shadow-lg ${
                isAmber ? "border-amber-500/20 hover:border-amber-500/40" : "border-white/10 hover:border-emerald-500/40"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-gray-400">{card.title}</span>
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    isAmber ? "bg-amber-500/10 text-amber-400" : "bg-emerald-500/10 text-emerald-400"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-white" style={{ fontFamily: "Rajdhani, sans-serif" }}>
                {card.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row: Orders Overview Line Chart & Registrations Donut Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders Overview SVG Chart (2 cols) */}
        <div className="lg:col-span-2 bg-[#111] border border-white/10 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-base text-white">Orders Overview</h3>
              <p className="text-xs text-gray-400">Monthly order volume and revenue growth</p>
            </div>
            <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ArrowUpRight className="h-3 w-3 mr-1" /> +24.5% vs Last Month
            </Badge>
          </div>

          {/* SVG Line Chart Representation */}
          <div className="h-64 w-full flex items-end justify-between gap-2 pt-6 pb-2 px-2 relative">
            {/* Background Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
              <div className="border-b border-white w-full"></div>
              <div className="border-b border-white w-full"></div>
              <div className="border-b border-white w-full"></div>
              <div className="border-b border-white w-full"></div>
            </div>

            {/* Bars/Points */}
            {[
              { month: "Jan", val: 40 },
              { month: "Feb", val: 55 },
              { month: "Mar", val: 48 },
              { month: "Apr", val: 70 },
              { month: "May", val: 85 },
              { month: "Jun", val: 65 },
              { month: "Jul", val: 90 },
              { month: "Aug", val: 110 },
              { month: "Sep", val: 95 },
              { month: "Oct", val: 125 },
              { month: "Nov", val: 140 },
              { month: "Dec", val: 160 },
            ].map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-2 group z-10">
                <div className="w-full bg-emerald-500/10 hover:bg-emerald-500/30 rounded-t-lg transition-all relative flex items-end justify-center" style={{ height: `${(d.val / 160) * 180}px` }}>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-md shadow-emerald-400/50 mb-1 group-hover:scale-125 transition-transform"></div>
                </div>
                <span className="text-[10px] font-mono text-gray-400">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Registrations Overview Donut Chart */}
        <div className="bg-[#111] border border-white/10 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-base text-white mb-1">Registrations Overview</h3>
            <p className="text-xs text-gray-400">Farmers vs Dealers Distribution</p>
          </div>

          {/* SVG Donut */}
          <div className="py-6 flex flex-col items-center justify-center relative">
            <svg className="w-44 h-44 transform -rotate-90" viewBox="0 0 36 36">
              {/* Outer circle background */}
              <path
                className="text-gray-800"
                strokeWidth="4"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              {/* Farmers segment (85%) */}
              <path
                className="text-emerald-500"
                strokeDasharray="85, 100"
                strokeWidth="4"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              {/* Dealers segment (15%) */}
              <path
                className="text-amber-500"
                strokeDasharray="15, 100"
                strokeDashoffset="-85"
                strokeWidth="4"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-black text-white" style={{ fontFamily: "Rajdhani, sans-serif" }}>
                14,685
              </span>
              <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Total Users</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <div>
                <p className="text-xs font-bold text-white">12,540</p>
                <p className="text-[10px] text-gray-400">Farmers (85%)</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <div>
                <p className="text-xs font-bold text-white">2,145</p>
                <p className="text-[10px] text-gray-400">Dealers (15%)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Row: Recent Activities & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities Feed */}
        <div className="bg-[#111] border border-white/10 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-base text-white">Recent Activities</h3>
            <Button variant="link" onClick={() => onNavigate("audit_logs")} className="text-xs text-emerald-400 p-0 h-auto">
              View Audit Logs →
            </Button>
          </div>
          <div className="space-y-3">
            {RECENT_ACTIVITIES.map((act, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-medium text-gray-200">{act.title}</span>
                </div>
                <span className="text-[10px] text-gray-500 font-mono shrink-0">{act.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-[#111] border border-white/10 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-base text-white">Top Performing Products</h3>
            <Button variant="link" onClick={() => onNavigate("products")} className="text-xs text-emerald-400 p-0 h-auto">
              View All Products →
            </Button>
          </div>
          <div className="space-y-3">
            {TOP_PRODUCTS.map((prod) => (
              <div key={prod.name} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                <div>
                  <p className="text-xs font-bold text-white">{prod.name}</p>
                  <p className="text-[10px] text-gray-400">{prod.qty} Sold</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-emerald-400">{prod.sales}</p>
                  <span className="text-[10px] text-emerald-500 font-semibold">{prod.growth}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
