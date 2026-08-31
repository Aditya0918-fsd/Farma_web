import { useState, useRef } from "react";
import { Search, Star, Filter, Phone, X, MapPin, MessageCircle, Package, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import Navbar from "@/components/Navbar.tsx";
import Footer from "@/components/Footer.tsx";
import { toast } from "sonner";
import { useApp } from "@/context/AppContext.tsx";
import type { CropListing } from "@/context/AppContext.tsx";

const CATEGORIES_EN = ["All", "Seeds", "Fertilizers", "Pesticides", "Farm Tools", "Organic", "Farmer Crops"];

const STATIC_PRODUCTS = [
  { id: "p1", name: "Hybrid Wheat Seeds", category: "Seeds", price: 450, unit: "5 kg bag", rating: 4.8, reviews: 124, img: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=80", badge: "Best Seller" },
  { id: "p2", name: "NPK Fertilizer 19:19:19", category: "Fertilizers", price: 1200, unit: "50 kg bag", rating: 4.6, reviews: 89, img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80", badge: "Top Rated" },
  { id: "p3", name: "Neem-based Pesticide", category: "Pesticides", price: 350, unit: "1 litre", rating: 4.7, reviews: 156, img: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&q=80", badge: "Organic" },
  { id: "p4", name: "Drip Irrigation Kit", category: "Farm Tools", price: 3500, unit: "1 acre kit", rating: 4.9, reviews: 67, img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&q=80", badge: "" },
  { id: "p5", name: "Paddy Seeds IR-64", category: "Seeds", price: 380, unit: "5 kg bag", rating: 4.5, reviews: 203, img: "https://images.unsplash.com/photo-1536054993300-0b00f01ee72a?w=400&q=80", badge: "" },
  { id: "p6", name: "DAP Fertilizer", category: "Fertilizers", price: 1350, unit: "50 kg bag", rating: 4.7, reviews: 312, img: "https://images.unsplash.com/photo-1551836022-b06985bceb24?w=400&q=80", badge: "Popular" },
  { id: "p7", name: "Bio Compost 25kg", category: "Organic", price: 800, unit: "25 kg bag", rating: 4.8, reviews: 45, img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80", badge: "Organic" },
  { id: "p8", name: "Hand Weeder (Khurpi)", category: "Farm Tools", price: 120, unit: "1 piece", rating: 4.4, reviews: 78, img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80", badge: "" },
];

interface CropDetailModalProps {
  crop: CropListing;
  onClose: () => void;
}

function CropDetailModal({ crop, onClose }: CropDetailModalProps) {
  const { t } = useApp();
  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#141414] border border-white/10 rounded-2xl max-w-md w-full z-10 overflow-hidden shadow-2xl">
        <div className="relative h-52 overflow-hidden">
          <img src={crop.image || "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&q=80"} alt={crop.cropName} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
          <button onClick={onClose} className="absolute top-3 right-3 bg-black/50 rounded-full p-1.5 text-white hover:bg-black cursor-pointer">
            <X className="h-4 w-4" />
          </button>
          <div className="absolute bottom-0 left-0 p-4">
            <Badge className="bg-primary/90 text-black text-xs font-bold mb-1">{t.buyInputs.farmerListedBadge}</Badge>
            <h3 className="text-xl font-black text-white">{crop.cropName}</h3>
          </div>
        </div>
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 rounded-xl p-3">
              <p className="text-xs text-gray-500">{t.buyInputs.weight}</p>
              <p className="text-sm font-bold text-white">{crop.weight}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-3">
              <p className="text-xs text-gray-500">{t.buyInputs.askingPrice}</p>
              <p className="text-sm font-black text-primary">₹{crop.price}/Qtl</p>
            </div>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-2 font-semibold uppercase tracking-wider">{t.buyInputs.sellerDetails}</p>
            <p className="text-sm font-bold text-white">{crop.sellerName}</p>
            <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1">
              <MapPin className="h-3 w-3 text-primary" />
              {crop.address}, {crop.city}, {crop.district} — {crop.pincode}
            </div>
          </div>
          <div className="flex gap-3">
            <a
              href={`tel:${crop.phone}`}
              className="flex-1 flex items-center justify-center gap-2 bg-primary text-black font-bold py-3 rounded-xl text-sm hover:bg-primary/90 transition-colors"
            >
              <Phone className="h-4 w-4" /> {t.buyInputs.callSeller}
            </a>
            <a
              href={`https://wa.me/91${crop.phone}?text=Hi, I saw your ${crop.cropName} listing on Krivexa. I am interested in buying.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white font-bold py-3 rounded-xl text-sm hover:bg-green-500 transition-colors"
            >
              <MessageCircle className="h-4 w-4" /> {t.buyInputs.whatsappSeller}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AgriMarketPage() {
  const { cropListings, checkKccPermission, isKccIssued, setIsKccAppModalOpen, addToCart, t } = useApp();
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedCrop, setSelectedCrop] = useState<CropListing | null>(null);

  const approvedCrops = cropListings.filter(c => c.status === "approved");

  const filteredStatic = category === "All" || category === "Farmer Crops"
    ? category === "Farmer Crops" ? [] : STATIC_PRODUCTS.filter(p =>
        (category === "All" || p.category === category) &&
        p.name.toLowerCase().includes(search.toLowerCase())
      )
    : STATIC_PRODUCTS.filter(p =>
        p.category === category && p.name.toLowerCase().includes(search.toLowerCase())
      );

  const showFarmerCrops = category === "All" || category === "Farmer Crops";
  const filteredCrops = approvedCrops.filter(c =>
    c.cropName.toLowerCase().includes(search.toLowerCase())
  );

  const handleViewDetails = (crop: CropListing) => {
    if (!checkKccPermission()) return;
    setSelectedCrop(crop);
  };

  const handleAddToCart = (product: { id: string; name: string; category?: string; price: number; unit?: string; img?: string }) => {
    if (!checkKccPermission()) return;
    addToCart({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      unit: product.unit,
      image: product.img,
    });
    toast.success(`${product.name} added to cart!`, {
      action: {
        label: "View Cart",
        onClick: () => window.location.href = "/cart"
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      {selectedCrop && <CropDetailModal crop={selectedCrop} onClose={() => setSelectedCrop(null)} />}

      {/* Header */}
      <div className="relative h-44 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&q=80" alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a] flex items-end px-6 pb-6">
          <div className="max-w-7xl mx-auto w-full">
            <h1 className="text-4xl font-black" style={{ fontFamily: "Rajdhani, sans-serif" }}>
              <span className="text-primary">{t.buyInputs.title}</span> {t.buyInputs.titleHighlight}
            </h1>
            <p className="text-gray-400 text-sm mt-1">{t.buyInputs.subtitle}</p>
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
                  Agri Market Buying Gated — Apply for KCC Now
                </h3>
                <p className="text-xs text-gray-300 max-w-2xl">
                  Card-holder verification required to purchase seeds, fertilizers &amp; farm inputs. Apply for KCC now to issue your verified card.
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
        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input placeholder={t.buyInputs.searchPlaceholder} value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 bg-white/5 border-white/10 text-white" />
          </div>
          <Button variant="ghost" className="border border-white/10 text-gray-300 shrink-0">
            <Filter className="h-4 w-4 mr-2" /> {t.buyInputs.filter}
          </Button>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 flex-wrap mb-8">
          {[
            { key: "All", label: t.buyInputs.all },
            { key: "Seeds", label: t.buyInputs.seeds },
            { key: "Fertilizers", label: t.buyInputs.fertilizers },
            { key: "Pesticides", label: t.buyInputs.pesticides },
            { key: "Farm Tools", label: t.buyInputs.farmTools },
            { key: "Organic", label: t.buyInputs.organic },
            { key: "Farmer Crops", label: `🌾 ${t.buyInputs.userCrops}` },
          ].map((c) => (
            <button key={c.key} onClick={() => setCategory(c.key)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${category === c.key ? "bg-primary text-black shadow-lg shadow-primary/20 scale-105" : "bg-white/5 border border-white/10 text-gray-300 hover:border-primary/40 hover:bg-primary/5"}`}>
              {c.label}
            </button>
          ))}
        </div>

        {/* Farmer-listed Crops Section */}
        {showFarmerCrops && filteredCrops.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <Package className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold">{t.buyInputs.farmerCropsTitle}</h2>
              <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">{filteredCrops.length} {t.buyInputs.available}</Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredCrops.map((crop) => (
                <div key={crop.id}
                  className="bg-[#111] border border-amber-500/20 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all group hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-500/10">
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={crop.image || "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=80"}
                      alt={crop.cropName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
                    <Badge className="absolute top-2 left-2 bg-amber-500/90 text-black text-[10px] font-bold">{t.buyInputs.farmerListedBadge}</Badge>
                    <div className="absolute bottom-0 left-0 p-3">
                      <p className="text-xs text-gray-300 flex items-center gap-1"><MapPin className="h-3 w-3" />{crop.district}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-bold mb-1 text-white">{crop.cropName}</h3>
                    <p className="text-xs text-gray-400 mb-2">{t.buyInputs.by} {crop.sellerName} · {crop.weight}</p>
                    <div className="flex items-end justify-between">
                      <div className="text-xl font-black text-amber-400" style={{ fontFamily: "Rajdhani, sans-serif" }}>₹{crop.price}<span className="text-xs text-gray-500 font-normal">/Qtl</span></div>
                      <div className="flex gap-1.5">
                        <Button size="sm" onClick={() => {
                          if (!checkKccPermission()) return;
                          addToCart({
                            id: crop.id,
                            name: crop.cropName,
                            category: "Farmer Crops",
                            price: crop.price,
                            unit: crop.weight,
                            image: crop.image,
                            sellerName: crop.sellerName
                          });
                          toast.success(`${crop.cropName} added to cart!`);
                        }} className="bg-primary hover:bg-primary/90 text-black text-xs font-bold h-8 px-2.5 rounded-lg">
                          + Cart
                        </Button>
                        <Button size="sm" onClick={() => handleViewDetails(crop)}
                          className="bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold h-8 px-2.5 rounded-lg">
                          {t.buyInputs.viewDetails} <ChevronRight className="h-3 w-3 ml-0.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Static Agri Products */}
        {filteredStatic.length > 0 && (
          <div>
            {showFarmerCrops && filteredCrops.length > 0 && (
              <div className="flex items-center gap-3 mb-5">
                <h2 className="text-xl font-bold">{t.buyInputs.agriInputsTitle}</h2>
              </div>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4">
              {filteredStatic.map((p) => (
                <div key={p.id}
                  className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden hover:border-primary/40 transition-all group hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10">
                  <div className="relative h-40 overflow-hidden">
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    {p.badge && (
                      <Badge className="absolute top-2 left-2 bg-primary text-black text-[10px] font-bold">{p.badge}</Badge>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="text-[10px] text-primary mb-1 font-medium uppercase tracking-wider">{p.category}</div>
                    <h3 className="text-sm font-bold mb-1.5 line-clamp-2 text-white leading-tight">{p.name}</h3>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs font-semibold">{p.rating}</span>
                      <span className="text-xs text-gray-500">({p.reviews})</span>
                    </div>
                    <div className="flex items-end justify-between mt-2">
                      <div>
                        <div className="text-lg font-black text-primary" style={{ fontFamily: "Rajdhani, sans-serif" }}>₹{p.price}</div>
                        <div className="text-[10px] text-gray-500">{p.unit}</div>
                      </div>
                      <Button size="sm"
                        onClick={() => handleAddToCart(p)}
                        className="bg-primary text-black text-xs font-semibold h-8 px-3 rounded-lg hover:bg-primary/90">
                        {t.buyInputs.addToCart}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {filteredStatic.length === 0 && filteredCrops.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <Package className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p>{t.buyInputs.noProducts}</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
