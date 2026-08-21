import { useState } from "react";
import { Users, MapPin, Calendar, Star, Phone, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import Navbar from "@/components/Navbar.tsx";
import Footer from "@/components/Footer.tsx";
import { toast } from "sonner";

const LABOUR_TYPES = [
  { type: "Harvesting Labour", rate: "₹600/day", available: 24, rating: 4.7, skills: ["Wheat Harvest", "Paddy Harvest", "Soyabean"], img: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=300&q=80" },
  { type: "Sowing Labour", rate: "₹500/day", available: 18, rating: 4.6, skills: ["Seed Sowing", "Transplanting", "Row Planting"], img: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=300&q=80" },
  { type: "Irrigation Labour", rate: "₹450/day", available: 12, rating: 4.5, skills: ["Canal Irrigation", "Drip Setup", "Sprinkler"], img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=300&q=80" },
  { type: "Weeding Labour", rate: "₹400/day", available: 30, rating: 4.8, skills: ["Manual Weeding", "Chemical Spray", "Hoeing"], img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&q=80" },
  { type: "Crop Loading Labour", rate: "₹550/day", available: 8, rating: 4.6, skills: ["Loading", "Unloading", "Transport"], img: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=300&q=80" },
  { type: "Orchard Labour", rate: "₹650/day", available: 10, rating: 4.9, skills: ["Fruit Picking", "Pruning", "Spraying"], img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=300&q=80" },
];

export default function LabourBookingPage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <div className="relative h-36 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=1200&q=80" alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a] flex items-center px-6">
          <div className="max-w-7xl mx-auto w-full">
            <h1 className="text-3xl font-black" style={{ fontFamily: "Rajdhani, sans-serif" }}>
              <span className="text-primary">Labour</span> Booking
            </h1>
            <p className="text-gray-400 text-sm">Book skilled agricultural workers for your farm instantly</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-10">
          {LABOUR_TYPES.map((l) => (
            <div
              key={l.type}
              onClick={() => setSelected(l.type)}
              className={`bg-[#111] border rounded-2xl overflow-hidden cursor-pointer transition-all hover:border-primary/40 ${selected === l.type ? "border-primary" : "border-white/10"}`}
            >
              <div className="relative h-40 overflow-hidden">
                <img src={l.img} alt={l.type} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                {selected === l.type && (
                  <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                    <CheckCircle className="h-10 w-10 text-primary" />
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <Badge className="bg-primary/90 text-black text-[10px] font-bold">{l.available} Available</Badge>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-sm">{l.type}</h3>
                  <div className="flex items-center gap-1 text-xs">
                    <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                    <span>{l.rating}</span>
                  </div>
                </div>
                <div className="text-primary font-black mb-3" style={{ fontFamily: "Rajdhani, sans-serif" }}>{l.rate}</div>
                <div className="flex gap-1 flex-wrap">
                  {l.skills.map((s) => (
                    <span key={s} className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded-full text-gray-400">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Booking Form */}
        <div className="max-w-xl mx-auto bg-[#111] border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <Users className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold">Book Labour</h2>
          </div>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); toast.success("Labour booked successfully! We will contact you shortly."); }}>
            <div>
              <Label className="text-gray-300 text-sm mb-1.5 block">Labour Type</Label>
              <Select>
                <SelectTrigger className="bg-white/5 border-white/10 text-gray-300">
                  <SelectValue placeholder={selected ?? "Select labour type"} />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-white/10">
                  {LABOUR_TYPES.map((l) => (
                    <SelectItem key={l.type} value={l.type}>{l.type} — {l.rate}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300 text-sm mb-1.5 block">Number of Workers</Label>
                <Input type="number" placeholder="e.g. 5" min="1" className="bg-white/5 border-white/10 text-white" />
              </div>
              <div>
                <Label className="text-gray-300 text-sm mb-1.5 block">Number of Days</Label>
                <Input type="number" placeholder="e.g. 3" min="1" className="bg-white/5 border-white/10 text-white" />
              </div>
            </div>
            <div>
              <Label className="text-gray-300 text-sm mb-1.5 block">Start Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input type="date" className="pl-10 bg-white/5 border-white/10 text-white" />
              </div>
            </div>
            <div>
              <Label className="text-gray-300 text-sm mb-1.5 block">Village / Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input placeholder="Enter your village/location" className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-600" />
              </div>
            </div>
            <div>
              <Label className="text-gray-300 text-sm mb-1.5 block">Contact Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input placeholder="Your mobile number" className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-600" />
              </div>
            </div>
            <Button type="submit" className="w-full bg-primary text-black font-bold py-5 text-base hover:bg-primary/90">
              Book Labour Now →
            </Button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
