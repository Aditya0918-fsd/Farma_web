import { useState } from "react";
import { TrendingUp, ArrowUpRight, ArrowDownRight, Search, MapPin, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import Navbar from "@/components/Navbar.tsx";
import Footer from "@/components/Footer.tsx";

const CROPS = [
  { name: "Wheat", hindi: "गेहूं", min: 2150, max: 2400, modal: 2275, unit: "Quintal", change: 2.35, img: "🌾" },
  { name: "Paddy (Common)", hindi: "धान", min: 1750, max: 1950, modal: 1860, unit: "Quintal", change: 1.78, img: "🌾" },
  { name: "Soyabean", hindi: "सोयाबीन", min: 4800, max: 5050, modal: 4920, unit: "Quintal", change: 3.12, img: "🟡" },
  { name: "Maize", hindi: "मक्का", min: 1850, max: 2000, modal: 1920, unit: "Quintal", change: 0.91, img: "🌽" },
  { name: "Mustard", hindi: "सरसों", min: 5100, max: 5400, modal: 5250, unit: "Quintal", change: -0.5, img: "🌼" },
  { name: "Gram", hindi: "चना", min: 4600, max: 4900, modal: 4750, unit: "Quintal", change: 1.2, img: "🟤" },
  { name: "Onion", hindi: "प्याज", min: 800, max: 1200, modal: 1050, unit: "Quintal", change: -2.1, img: "🧅" },
  { name: "Tomato", hindi: "टमाटर", min: 600, max: 1000, modal: 800, unit: "Quintal", change: 4.5, img: "🍅" },
  { name: "Potato", hindi: "आलू", min: 700, max: 950, modal: 840, unit: "Quintal", change: -1.3, img: "🥔" },
  { name: "Cotton", hindi: "कपास", min: 5800, max: 6200, modal: 6050, unit: "Quintal", change: 0.7, img: "🌱" },
  { name: "Sugarcane", hindi: "गन्ना", min: 285, max: 310, modal: 295, unit: "Quintal", change: 0.2, img: "🎋" },
  { name: "Urad Dal", hindi: "उड़द", min: 6200, max: 6600, modal: 6400, unit: "Quintal", change: 2.8, img: "🫘" },
];

const MANDIS = ["Kanpur Mandi", "Lucknow Mandi", "Bhopal Mandi", "Nagpur Mandi", "Indore Mandi", "Jaipur Mandi"];

export default function MandiBhavPage() {
  const [search, setSearch] = useState("");
  const [selectedMandi, setSelectedMandi] = useState("Kanpur Mandi");

  const filtered = CROPS.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <div className="relative h-36 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1200&q=80" alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a] flex items-center px-6">
          <div className="max-w-7xl mx-auto w-full">
            <h1 className="text-3xl font-black" style={{ fontFamily: "Rajdhani, sans-serif" }}>
              <span className="text-primary">Mandi</span> Bhav
            </h1>
            <p className="text-gray-400 text-sm">Live market prices from all major mandis across India</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search crop name..."
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
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  selectedMandi === m ? "bg-primary text-black" : "bg-white/5 border border-white/10 text-gray-300 hover:border-primary/40"
                }`}
              >
                <MapPin className="h-3 w-3 inline mr-1" />{m}
              </button>
            ))}
          </div>
          <Button size="sm" variant="ghost" className="border border-white/10 text-gray-300 shrink-0">
            <RefreshCw className="h-4 w-4 mr-2" /> Refresh
          </Button>
        </div>

        {/* Table */}
        <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="font-bold">{selectedMandi} — Today's Prices</h2>
            </div>
            <div className="text-xs text-gray-500">Updated: {new Date().toLocaleTimeString()}</div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="text-left px-4 py-3 text-xs text-gray-400 font-medium">Crop</th>
                  <th className="text-right px-4 py-3 text-xs text-gray-400 font-medium">Min Price</th>
                  <th className="text-right px-4 py-3 text-xs text-gray-400 font-medium">Max Price</th>
                  <th className="text-right px-4 py-3 text-xs text-gray-400 font-medium">Modal Price</th>
                  <th className="text-right px-4 py-3 text-xs text-gray-400 font-medium">Unit</th>
                  <th className="text-right px-4 py-3 text-xs text-gray-400 font-medium">Change</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => (
                  <tr key={c.name} className={`border-b border-white/5 hover:bg-white/3 transition-colors ${i % 2 === 0 ? "" : "bg-white/2"}`}>
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
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
