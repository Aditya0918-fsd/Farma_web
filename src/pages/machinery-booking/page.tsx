import { useState } from "react";
import { Tractor, Calendar, MapPin, Clock, CheckCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import Navbar from "@/components/Navbar.tsx";
import Footer from "@/components/Footer.tsx";
import { toast } from "sonner";

const MACHINERY = [
  { name: "Tractor (45 HP)", price: "₹800/hr", availability: "Available", rating: 4.8, img: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=300&q=80" },
  { name: "Rotavator", price: "₹600/hr", availability: "Available", rating: 4.7, img: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=300&q=80" },
  { name: "Harvester (Combine)", price: "₹1500/hr", availability: "Booked", rating: 4.9, img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=300&q=80" },
  { name: "Power Tiller", price: "₹400/hr", availability: "Available", rating: 4.6, img: "https://images.unsplash.com/photo-1573156782454-9c8c99c4be21?w=300&q=80" },
  { name: "Seed Drill", price: "₹500/hr", availability: "Available", rating: 4.5, img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&q=80" },
  { name: "Sprayer (Boom)", price: "₹350/hr", availability: "Available", rating: 4.7, img: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=300&q=80" },
];

export default function MachineryBookingPage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <div className="relative h-36 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=1200&q=80" alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a] flex items-center px-6">
          <div className="max-w-7xl mx-auto w-full">
            <h1 className="text-3xl font-black" style={{ fontFamily: "Rajdhani, sans-serif" }}>
              <span className="text-primary">Machinery</span> Booking
            </h1>
            <p className="text-gray-400 text-sm">Book tractors, harvesters and farm machinery instantly</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {MACHINERY.map((m) => (
            <div key={m.name} className={`bg-[#111] border rounded-2xl overflow-hidden transition-all cursor-pointer ${selected === m.name ? "border-primary" : "border-white/10 hover:border-primary/40"}`}
              onClick={() => m.availability === "Available" ? setSelected(m.name) : null}>
              <div className="relative h-44 overflow-hidden">
                <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
                <div className={`absolute top-2 right-2 text-xs font-semibold px-2 py-1 rounded-full ${m.availability === "Available" ? "bg-primary/20 text-primary border border-primary/30" : "bg-red-500/20 text-red-400 border border-red-500/30"}`}>
                  {m.availability}
                </div>
                {selected === m.name && (
                  <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                    <CheckCircle className="h-10 w-10 text-primary" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold">{m.name}</h3>
                  <div className="flex items-center gap-1 text-xs">
                    <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                    <span>{m.rating}</span>
                  </div>
                </div>
                <div className="text-primary font-bold" style={{ fontFamily: "Rajdhani, sans-serif" }}>{m.price}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Booking Form */}
        <div className="max-w-xl mx-auto bg-[#111] border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <Tractor className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold">Book Machinery</h2>
          </div>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); toast.success("Machinery booked successfully!"); }}>
            <div>
              <Label className="text-gray-300 text-sm mb-1.5 block">Select Machinery</Label>
              <Select>
                <SelectTrigger className="bg-white/5 border-white/10 text-gray-300">
                  <SelectValue placeholder={selected ?? "Choose machinery"} />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-white/10">
                  {MACHINERY.filter((m) => m.availability === "Available").map((m) => (
                    <SelectItem key={m.name} value={m.name}>{m.name} — {m.price}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300 text-sm mb-1.5 block">Booking Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input type="date" className="pl-10 bg-white/5 border-white/10 text-white" />
                </div>
              </div>
              <div>
                <Label className="text-gray-300 text-sm mb-1.5 block">Duration (hours)</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input type="number" placeholder="e.g. 4" className="pl-10 bg-white/5 border-white/10 text-white" min="1" />
                </div>
              </div>
            </div>
            <div>
              <Label className="text-gray-300 text-sm mb-1.5 block">Location / Village</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input placeholder="Enter your village/location" className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-600" />
              </div>
            </div>
            <Button type="submit" className="w-full bg-primary text-black font-bold py-5 text-base hover:bg-primary/90">
              Book Now →
            </Button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
