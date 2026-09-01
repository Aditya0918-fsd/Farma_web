import { Download, TrendingUp, Users, Store, ShoppingCart, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { toast } from "sonner";
import { useApp } from "@/context/AppContext.tsx";

export default function ReportsView() {
  const { kccApplications, cropListings, labourBookings, machineryBookings, orders } = useApp();

  const handleExport = (type: string) => {
    toast.success(`${type} Report exported successfully! Downloading...`);
  };

  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const totalOrders = orders.length;
  const kccApproved = kccApplications.filter((k) => k.status === "approved").length;
  const activeCrops = cropListings.filter((c) => c.status === "approved").length;

  return (
    <div className="space-y-6">
      {/* Top Bar with Export Actions */}
      <div className="bg-[#111] border border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-400" /> Platform Analytics & Reports
          </h2>
          <p className="text-xs text-gray-400">
            Live metrics across revenue, service bookings, KCC, and platform activity.
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => handleExport("PDF")} variant="outline" className="text-xs border-white/10 text-gray-300">
            <Download className="h-3.5 w-3.5 mr-1.5 text-emerald-400" /> Export PDF
          </Button>
          <Button onClick={() => handleExport("CSV")} className="bg-emerald-500 text-black font-bold text-xs">
            <Download className="h-3.5 w-3.5 mr-1.5" /> Export CSV
          </Button>
        </div>
      </div>

      {/* 4 Live Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#111] border border-emerald-500/20 rounded-2xl p-4">
          <p className="text-xs text-gray-400 font-semibold mb-1">Total Revenue</p>
          <p className="text-2xl font-black text-emerald-400" style={{ fontFamily: "Rajdhani, sans-serif" }}>
            ₹{totalRevenue.toLocaleString("en-IN")}
          </p>
          <span className="text-[10px] text-gray-500">Lifetime platform revenue</span>
        </div>
        <div className="bg-[#111] border border-white/10 rounded-2xl p-4">
          <p className="text-xs text-gray-400 font-semibold mb-1">Total Orders</p>
          <p className="text-2xl font-black text-white" style={{ fontFamily: "Rajdhani, sans-serif" }}>{totalOrders.toLocaleString("en-IN")}</p>
          <span className="text-[10px] text-gray-500">All time orders</span>
        </div>
        <div className="bg-[#111] border border-blue-500/20 rounded-2xl p-4">
          <p className="text-xs text-gray-400 font-semibold mb-1">KCC Cards Issued</p>
          <p className="text-2xl font-black text-blue-400" style={{ fontFamily: "Rajdhani, sans-serif" }}>{kccApproved}</p>
          <span className="text-[10px] text-gray-500">Kisan Credit Cards approved</span>
        </div>
        <div className="bg-[#111] border border-amber-500/20 rounded-2xl p-4">
          <p className="text-xs text-gray-400 font-semibold mb-1">Active Crop Listings</p>
          <p className="text-2xl font-black text-amber-400" style={{ fontFamily: "Rajdhani, sans-serif" }}>{activeCrops}</p>
          <span className="text-[10px] text-gray-500">Approved marketplace listings</span>
        </div>
      </div>

      {/* Service Analytics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#111] border border-white/10 rounded-2xl p-4">
          <p className="text-xs text-gray-400 font-semibold mb-2">Labour Bookings</p>
          <p className="text-xl font-black text-white" style={{ fontFamily: "Rajdhani, sans-serif" }}>{labourBookings.length}</p>
          <div className="mt-3 space-y-1">
            {["pending", "assigned", "completed"].map((s) => {
              const count = labourBookings.filter((l) => l.status === s).length;
              return (
                <div key={s} className="flex items-center justify-between text-[11px]">
                  <span className="text-gray-500 capitalize">{s}</span>
                  <span className="font-bold text-white">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="bg-[#111] border border-white/10 rounded-2xl p-4">
          <p className="text-xs text-gray-400 font-semibold mb-2">Machinery Bookings</p>
          <p className="text-xl font-black text-white" style={{ fontFamily: "Rajdhani, sans-serif" }}>{machineryBookings.length}</p>
          <div className="mt-3 space-y-1">
            {["pending", "allotted", "rejected"].map((s) => {
              const count = machineryBookings.filter((m) => m.status === s).length;
              return (
                <div key={s} className="flex items-center justify-between text-[11px]">
                  <span className="text-gray-500 capitalize">{s}</span>
                  <span className="font-bold text-white">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="bg-[#111] border border-white/10 rounded-2xl p-4">
          <p className="text-xs text-gray-400 font-semibold mb-2">KCC Applications</p>
          <p className="text-xl font-black text-white" style={{ fontFamily: "Rajdhani, sans-serif" }}>{kccApplications.length}</p>
          <div className="mt-3 space-y-1">
            {["pending", "approved", "rejected"].map((s) => {
              const count = kccApplications.filter((k) => k.status === s).length;
              return (
                <div key={s} className="flex items-center justify-between text-[11px]">
                  <span className="text-gray-500 capitalize">{s}</span>
                  <span className={`font-bold ${s === "approved" ? "text-emerald-400" : s === "rejected" ? "text-red-400" : "text-white"}`}>{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Crop Category Bar Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#111] border border-white/10 rounded-2xl p-5 shadow-xl">
          <h3 className="font-bold text-sm text-white mb-4">Crop Listings by Status</h3>
          <div className="space-y-4">
            {[
              { label: "Approved", count: cropListings.filter((c) => c.status === "approved").length, color: "emerald" },
              { label: "Pending Review", count: cropListings.filter((c) => c.status === "pending").length, color: "amber" },
              { label: "Rejected", count: cropListings.filter((c) => c.status === "rejected").length, color: "red" },
            ].map((item) => {
              const total = cropListings.length || 1;
              const pct = Math.round((item.count / total) * 100);
              const barColor = item.color === "emerald" ? "bg-emerald-500" : item.color === "amber" ? "bg-amber-500" : "bg-red-500";
              return (
                <div key={item.label}>
                  <div className="flex justify-between text-xs font-bold text-white mb-1">
                    <span>{item.label}</span>
                    <span>{item.count} ({pct}%)</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden">
                    <div className={`h-full ${barColor} transition-all duration-700`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-[#111] border border-white/10 rounded-2xl p-5 shadow-xl">
          <h3 className="font-bold text-sm text-white mb-4">Quick Report Links</h3>
          <div className="space-y-2">
            {[
              { label: "Farmer Registration Report", icon: Users },
              { label: "Order Summary Report", icon: ShoppingCart },
              { label: "KCC Cards Report", icon: CreditCard },
              { label: "Revenue Breakdown", icon: TrendingUp },
              { label: "Dealer Activity Report", icon: Store },
            ].map(({ label, icon: Icon }) => (
              <button
                key={label}
                onClick={() => handleExport(label)}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-xs text-gray-300 font-medium transition-all text-left"
              >
                <Icon className="h-4 w-4 text-emerald-400 shrink-0" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
