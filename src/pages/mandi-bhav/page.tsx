import { useState } from "react";
import { TrendingUp, ArrowUpRight, ArrowDownRight, Search, MapPin, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import Navbar from "@/components/Navbar.tsx";
import Footer from "@/components/Footer.tsx";
import { useApp } from "@/context/AppContext.tsx";

const MANDIS = ["Kanpur Mandi", "Lucknow Mandi", "Patna Mandi", "Bhopal Mandi", "Nagpur Mandi", "Jaipur Mandi"];

export default function MandiBhavPage() {
  const { mandiRates, isKccIssued, setIsKccAppModalOpen, t } = useApp();
  const [search, setSearch] = useState("");
  const [selectedMandi, setSelectedMandi] = useState("Kanpur Mandi");

  const filtered = mandiRates.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.hindi?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <div className="relative h-44 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1200&q=80" alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a] flex items-end px-6 pb-6">
          <div className="max-w-7xl mx-auto w-full">
            <h1 className="text-4xl font-black" style={{ fontFamily: "Rajdhani, sans-serif" }}>
              <span className="text-primary">{t.mandiBhav.title.split(" ")[0]}</span> {t.mandiBhav.title.split(" ").slice(1).join(" ")}
            </h1>
            <p className="text-gray-400 text-sm mt-1">{t.mandiBhav.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* KCC APPLICATION BANNER */}
        {!isKccIssued && (
          <div className="mb-6 bg-linear-to-r from-amber-950/90 via-amber-900/60 to-black border-2 border-amber-500/70 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 text-amber-400 font-bold">
                🔒
              </div>
              <div>
                <h3 className="text-base font-black text-amber-200">
                  Account Verification &amp; KCC Application Required
                </h3>
                <p className="text-xs text-gray-300 max-w-2xl">
                  You are viewing live Mandi rates. Apply for Kisan Credit Card (KCC) to enable direct crop selling &amp; full trading features!
                </p>
              </div>
            </div>
            <Button
              onClick={() => setIsKccAppModalOpen(true)}
              className="bg-amber-500 hover:bg-amber-400 text-black font-black text-xs py-2.5 px-6 rounded-xl shrink-0 shadow-md animate-pulse cursor-pointer border border-amber-300"
            >
              Apply for KCC Now →
            </Button>
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder={t.mandiBhav.searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {MANDIS.map((m) => (
              <button
                key={m}
                onClick={() => setSelectedMandi(m)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${selectedMandi === m ? "bg-primary text-black" : "bg-white/5 border border-white/10 text-gray-300 hover:border-primary/40"}`}
              >
                <MapPin className="h-3 w-3 inline mr-1" />{m}
              </button>
            ))}
          </div>
          <Button size="sm" variant="ghost" className="border border-white/10 text-gray-300 shrink-0" onClick={() => setSearch("")}>
            <RefreshCw className="h-4 w-4 mr-2" /> {t.mandiBhav.refresh}
          </Button>
        </div>

        <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="font-bold">{selectedMandi} — {t.mandiBhav.todaysPrices}</h2>
            </div>
            <div className="text-xs text-gray-500">Updated: {new Date().toLocaleTimeString()}</div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="text-left px-4 py-3 text-xs text-gray-400 font-medium">{t.mandiBhav.crop}</th>
                  <th className="text-right px-4 py-3 text-xs text-gray-400 font-medium">{t.mandiBhav.minPrice}</th>
                  <th className="text-right px-4 py-3 text-xs text-gray-400 font-medium">{t.mandiBhav.maxPrice}</th>
                  <th className="text-right px-4 py-3 text-xs text-gray-400 font-medium">{t.mandiBhav.modalPrice}</th>
                  <th className="text-right px-4 py-3 text-xs text-gray-400 font-medium">{t.mandiBhav.unit}</th>
                  <th className="text-right px-4 py-3 text-xs text-gray-400 font-medium">{t.mandiBhav.change}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => (
                  <tr key={c.id} className={`border-b border-white/5 hover:bg-white/3 transition-colors ${i % 2 === 0 ? "" : "bg-white/2"}`}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{c.img}</span>
                        <div>
                          <div className="text-sm font-semibold">{c.name}</div>
                          <div className="text-xs text-gray-500">{c.hindi}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right text-sm">₹{c.min.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-sm">₹{c.max.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-sm font-bold text-primary">₹{c.modal.toLocaleString()}</span>
                    </td>
                    <td className="px-4 py-3 text-right text-xs text-gray-400">/{c.unit}</td>
                    <td className="px-4 py-3 text-right">
                      <span className={`flex items-center justify-end gap-0.5 text-sm font-semibold ${c.change >= 0 ? "text-primary" : "text-red-400"}`}>
                        {c.change >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                        {Math.abs(c.change)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="text-center py-10 text-gray-500 text-sm">{t.mandiBhav.noCrops}</div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
