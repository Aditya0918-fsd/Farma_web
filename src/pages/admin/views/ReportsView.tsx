import { Download, TrendingUp, Users, Store, ShoppingCart, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { toast } from "sonner";

export default function ReportsView() {
  const handleExport = (type: string) => {
    toast.success(`${type} Report exported successfully! Downloading...`);
  };

  return (
    <div className="space-y-6">
      {/* Top Bar with Export Actions */}
      <div className="bg-[#111] border border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-400" /> Platform Financial & Growth Analytics
          </h2>
          <p className="text-xs text-gray-400">Deep-dive metrics across revenue, sales, registered accounts, and market performance.</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => handleExport("PDF")} variant="outline" className="text-xs border-white/10 text-gray-300">
            <Download className="h-3.5 w-3.5 mr-1.5 text-emerald-400" /> Export PDF
          </Button>
          <Button onClick={() => handleExport("CSV")} className="bg-emerald-500 text-black font-bold text-xs">
            <Download className="h-3.5 w-3.5 mr-1.5" /> Export CSV Data
          </Button>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#111] border border-white/10 rounded-2xl p-4">
          <p className="text-xs text-gray-400 font-semibold mb-1">Total Revenue</p>
          <p className="text-2xl font-black text-emerald-400" style={{ fontFamily: "Rajdhani, sans-serif" }}>₹48,75,230</p>
          <span className="text-[10px] text-emerald-500 font-bold">+24.5% vs last month</span>
        </div>
        <div className="bg-[#111] border border-white/10 rounded-2xl p-4">
          <p className="text-xs text-gray-400 font-semibold mb-1">Total Orders</p>
          <p className="text-2xl font-black text-white" style={{ fontFamily: "Rajdhani, sans-serif" }}>8,765</p>
          <span className="text-[10px] text-emerald-500 font-bold">+18.2% vs last month</span>
        </div>
        <div className="bg-[#111] border border-white/10 rounded-2xl p-4">
          <p className="text-xs text-gray-400 font-semibold mb-1">Total Farmers</p>
          <p className="text-2xl font-black text-white" style={{ fontFamily: "Rajdhani, sans-serif" }}>12,540</p>
          <span className="text-[10px] text-emerald-500 font-bold">+12.0% new signups</span>
        </div>
        <div className="bg-[#111] border border-white/10 rounded-2xl p-4">
          <p className="text-xs text-gray-400 font-semibold mb-1">Total Dealers</p>
          <p className="text-2xl font-black text-white" style={{ fontFamily: "Rajdhani, sans-serif" }}>2,145</p>
          <span className="text-[10px] text-emerald-500 font-bold">+8.4% growth</span>
        </div>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Overview Chart */}
        <div className="lg:col-span-2 bg-[#111] border border-white/10 rounded-2xl p-5 shadow-xl">
          <h3 className="font-bold text-sm text-white mb-4">Revenue Overview Trend</h3>
          <div className="h-64 w-full flex items-end justify-between gap-3 pt-6 pb-2 px-2 relative">
            {[45, 60, 52, 75, 88, 70, 95, 120, 105, 135, 150, 175].map((val, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                <div
                  className="w-full bg-linear-to-t from-emerald-500/20 to-emerald-400 rounded-t-md transition-all relative group-hover:bg-emerald-400"
                  style={{ height: `${(val / 175) * 190}px` }}
                ></div>
                <span className="text-[9px] text-gray-400 font-mono">M{idx + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Categories Donut Chart */}
        <div className="bg-[#111] border border-white/10 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <h3 className="font-bold text-sm text-white mb-2">Top Crop Products Share</h3>
          <div className="space-y-4 py-4">
            <div>
              <div className="flex justify-between text-xs font-bold text-white mb-1">
                <span>Wheat</span>
                <span>40%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-emerald-500 w-[40%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold text-white mb-1">
                <span>Rice / Paddy</span>
                <span>30%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-amber-500 w-[30%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold text-white mb-1">
                <span>Maize</span>
                <span>18%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-blue-500 w-[18%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold text-white mb-1">
                <span>Others & Inputs</span>
                <span>12%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-purple-500 w-[12%]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
