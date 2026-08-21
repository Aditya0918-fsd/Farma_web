import { useState } from "react";
import { Search, Star, ShoppingCart, Filter } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import Navbar from "@/components/Navbar.tsx";
import Footer from "@/components/Footer.tsx";
import { toast } from "sonner";

const CATEGORIES = ["All", "Seeds", "Fertilizers", "Pesticides", "Farm Tools", "Irrigation", "Organic"];

const PRODUCTS = [
  { name: "Hybrid Wheat Seeds", category: "Seeds", price: 450, unit: "5 kg bag", rating: 4.8, reviews: 124, img: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&q=80", badge: "Best Seller" },
  { name: "NPK Fertilizer 19:19:19", category: "Fertilizers", price: 1200, unit: "50 kg bag", rating: 4.6, reviews: 89, img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&q=80", badge: "Top Rated" },
  { name: "Neem-based Pesticide", category: "Pesticides", price: 350, unit: "1 litre", rating: 4.7, reviews: 156, img: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=300&q=80", badge: "Organic" },
  { name: "Drip Irrigation Kit", category: "Irrigation", price: 3500, unit: "1 acre kit", rating: 4.9, reviews: 67, img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=300&q=80", badge: "" },
  { name: "Paddy Seeds (IR-64)", category: "Seeds", price: 380, unit: "5 kg bag", rating: 4.5, reviews: 203, img: "https://images.unsplash.com/photo-1536054993300-0b00f01ee72a?w=300&q=80", badge: "" },
  { name: "DAP Fertilizer", category: "Fertilizers", price: 1350, unit: "50 kg bag", rating: 4.7, reviews: 312, img: "https://images.unsplash.com/photo-1551836022-b06985bceb24?w=300&q=80", badge: "Popular" },
  { name: "Khurpi (Hand Weeder)", category: "Farm Tools", price: 120, unit: "1 piece", rating: 4.4, reviews: 78, img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&q=80", badge: "" },
  { name: "Bio Compost", category: "Organic", price: 800, unit: "25 kg bag", rating: 4.8, reviews: 45, img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&q=80", badge: "Organic" },
];

export default function AgriMarketPage() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = PRODUCTS.filter((p) => {
    const matchCat = category === "All" || p.category === category;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <div className="relative h-36 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&q=80" alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a] flex items-center px-6">
          <div className="max-w-7xl mx-auto w-full">
            <h1 className="text-3xl font-black" style={{ fontFamily: "Rajdhani, sans-serif" }}>
              <span className="text-primary">Agri</span> Market
            </h1>
            <p className="text-gray-400 text-sm">Buy seeds, fertilizers, pesticides and farm tools at best prices</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 bg-white/5 border-white/10 text-white" />
          </div>
          <Button variant="ghost" className="border border-white/10 text-gray-300 shrink-0">
            <Filter className="h-4 w-4 mr-2" /> Filter
          </Button>
        </div>

        <div className="flex gap-2 flex-wrap mb-6">
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setCategory(c)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${category === c ? "bg-primary text-black" : "bg-white/5 border border-white/10 text-gray-300 hover:border-primary/40"}`}>
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((p) => (
            <div key={p.name} className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden hover:border-primary/40 transition-colors group">
              <div className="relative h-44 overflow-hidden">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {p.badge && (
                  <Badge className="absolute top-2 left-2 bg-primary text-black text-[10px] font-bold">{p.badge}</Badge>
                )}
              </div>
              <div className="p-4">
                <div className="text-xs text-primary mb-1">{p.category}</div>
                <h3 className="text-sm font-bold mb-2 line-clamp-1">{p.name}</h3>
                <div className="flex items-center gap-1 mb-2">
                  <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs font-semibold">{p.rating}</span>
                  <span className="text-xs text-gray-500">({p.reviews})</span>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-lg font-black text-primary" style={{ fontFamily: "Rajdhani, sans-serif" }}>₹{p.price}</div>
                    <div className="text-[11px] text-gray-500">{p.unit}</div>
                  </div>
                  <Button size="sm" onClick={() => toast.success(`${p.name} added to cart!`)} className="bg-primary text-black text-xs font-semibold h-8">
                    <ShoppingCart className="h-3 w-3 mr-1" /> Add
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
