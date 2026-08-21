import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard, TrendingUp, ShoppingCart, Leaf, Tractor, Users, MessageSquare,
  FlaskConical, CloudSun, Wallet, FileText, Bell, User, HelpCircle, Menu, X,
  Search, Globe, ChevronDown, ArrowUpRight, ArrowDownRight, Plus, Eye
} from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Badge } from "@/components/ui/badge.tsx";

const SIDEBAR_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard", active: true },
  { icon: TrendingUp, label: "Mandi Bhav", href: "/mandi-bhav" },
  { icon: ShoppingCart, label: "Buy Inputs", href: "/agri-market" },
  { icon: Leaf, label: "Sell Crops", href: "/agri-market" },
  { icon: Tractor, label: "Machinery Booking", href: "/machinery-booking" },
  { icon: Users, label: "Labour Booking", href: "#" },
  { icon: MessageSquare, label: "Expert Advice", href: "/expert-advice" },
  { icon: FlaskConical, label: "Soil Testing", href: "/soil-testing" },
  { icon: CloudSun, label: "Weather Update", href: "/weather" },
  { icon: Wallet, label: "Wallet", href: "/wallet" },
  { icon: FileText, label: "Orders", href: "#" },
  { icon: Bell, label: "Notifications", href: "#" },
  { icon: User, label: "Profile", href: "#" },
  { icon: HelpCircle, label: "Help & Support", href: "#" },
];

const MANDI_PRICES = [
  { crop: "Wheat", icon: "🌾", price: "₹2275", unit: "/Quintal", change: "+2.35%", up: true },
  { crop: "Paddy", icon: "🌾", price: "₹1860", unit: "/Quintal", change: "+1.78%", up: true },
  { crop: "Soyabean", icon: "🟡", price: "₹4920", unit: "/Quintal", change: "+3.12%", up: true },
  { crop: "Maize", icon: "🌽", price: "₹1920", unit: "/Quintal", change: "+0.91%", up: true },
];

const MY_CROPS = [
  { name: "Wheat", area: "2 Acre", yield: "25 Quintal", status: "Growing", img: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=60&q=80" },
  { name: "Paddy", area: "1.5 Acre", yield: "18 Quintal", status: "Growing", img: "https://images.unsplash.com/photo-1536054993300-0b00f01ee72a?w=60&q=80" },
  { name: "Soyabean", area: "1 Acre", yield: "12 Quintal", status: "Growing", img: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=60&q=80" },
];

const RECENT_ORDERS = [
  { name: "Pesticides Order", id: "#ORD1256", status: "Delivered", statusColor: "text-primary", date: "12 May, 2024" },
  { name: "Tractor Booking", id: "#TRAC256", status: "Confirmed", statusColor: "text-blue-400", date: "11 May, 2024" },
  { name: "Seeds Order", id: "#SEED178", status: "Shipped", statusColor: "text-yellow-400", date: "10 May, 2024" },
];

const NOTIFICATIONS = [
  { title: "Mandi Price Alert", desc: "Wheat price increased in Kanpur Mandi", time: "10 min ago", dot: "bg-primary" },
  { title: "Weather Alert", desc: "Heavy rain expected in next 2 days", time: "1 hour ago", dot: "bg-blue-400" },
  { title: "Order Update", desc: "Your order #ORD1256 has been delivered", time: "2 hours ago", dot: "bg-yellow-400" },
];

const SERVICES_GRID = [
  { icon: TrendingUp, label: "Mandi Bhav", desc: "Live Market Rates", href: "/mandi-bhav" },
  { icon: ShoppingCart, label: "Buy Inputs", desc: "Seeds, Fertilizer, Pesticides", href: "/agri-market" },
  { icon: Leaf, label: "Sell Crops", desc: "Best Price Marketplace", href: "/agri-market" },
  { icon: Tractor, label: "Machinery Booking", desc: "Tractors & Implements", href: "/machinery-booking" },
  { icon: Users, label: "Labour Booking", desc: "Skilled Labour", href: "#" },
  { icon: MessageSquare, label: "Expert Advice", desc: "Talk to Experts", href: "/expert-advice" },
  { icon: FlaskConical, label: "Soil Testing", desc: "Test Soil Health", href: "/soil-testing" },
  { icon: CloudSun, label: "Weather Update", desc: "Live Forecast", href: "/weather" },
  { icon: Wallet, label: "Kisan Wallet", desc: "Secure Payments", href: "/wallet" },
  { icon: FileText, label: "KCC & Loan", desc: "Easy Credit Facility", href: "#" },
];

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 fixed md:relative z-50 w-60 h-full bg-[#0c0c0c] border-r border-white/10 flex flex-col transition-transform duration-300`}>
        <div className="p-4 border-b border-white/10 flex items-center gap-2">
          <img src="/krivexa-logo.jpg" alt="KRIVEXA" className="h-8 w-8 object-cover rounded-lg border border-primary/40" />
          <div>
            <div className="text-sm font-bold tracking-widest" style={{ fontFamily: "Rajdhani, sans-serif" }}>KRIV<span className="text-primary">E</span>XA</div>
            <div className="text-[9px] text-primary tracking-wider">SMART FARMING</div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {SIDEBAR_ITEMS.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                item.active
                  ? "bg-primary text-black font-semibold"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* App Download */}
        <div className="p-3 m-3 bg-primary/10 border border-primary/20 rounded-xl text-center">
          <div className="text-xs font-bold text-primary mb-1">Krivexa App</div>
          <div className="text-[10px] text-gray-400 mb-2">All farming solutions in your pocket</div>
          <Button size="sm" className="bg-primary text-black text-xs w-full font-semibold py-1">Download Now</Button>
          <div className="flex gap-1 mt-1.5">
            <Button size="sm" variant="ghost" className="flex-1 border border-white/10 text-[9px] py-0.5 h-6">Google Play</Button>
            <Button size="sm" variant="ghost" className="flex-1 border border-white/10 text-[9px] py-0.5 h-6">App Store</Button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="h-14 bg-[#0c0c0c] border-b border-white/10 flex items-center px-4 gap-3 shrink-0">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden cursor-pointer">
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <div className="flex-1 flex items-center bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 max-w-sm">
            <Search className="h-4 w-4 text-gray-500 mr-2 shrink-0" />
            <input placeholder="Search for crops, products, services..." className="bg-transparent text-sm text-white placeholder:text-gray-600 outline-none flex-1" />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button className="relative cursor-pointer p-2 hover:bg-white/5 rounded-lg">
              <Bell className="h-5 w-5 text-gray-300" />
              <span className="absolute top-1.5 right-1.5 w-3 h-3 bg-primary rounded-full text-[8px] text-black flex items-center justify-center font-bold">3</span>
            </button>
            <button className="relative cursor-pointer p-2 hover:bg-white/5 rounded-lg">
              <MessageSquare className="h-5 w-5 text-gray-300" />
              <span className="absolute top-1.5 right-1.5 w-3 h-3 bg-blue-400 rounded-full text-[8px] text-black flex items-center justify-center font-bold">2</span>
            </button>
            <button className="flex items-center gap-2 cursor-pointer hover:bg-white/5 rounded-lg px-2 py-1">
              <Globe className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-300 hidden sm:block">English</span>
              <ChevronDown className="h-3 w-3 text-gray-500" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold text-sm">R</div>
              <div className="hidden sm:block">
                <div className="text-sm font-semibold">Ramesh Yadav</div>
                <div className="text-[11px] text-gray-500">Farmer</div>
              </div>
              <ChevronDown className="h-3 w-3 text-gray-500" />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Top row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Wallet */}
            <div className="bg-[#111] border border-white/10 rounded-2xl p-5">
              <div className="text-sm text-gray-400 mb-1">Wallet Balance</div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Wallet className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-black text-primary" style={{ fontFamily: "Rajdhani, sans-serif" }}>₹4,250.00</div>
                  <div className="text-xs text-gray-500">Krivexa Wallet</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1 bg-primary text-black font-semibold text-xs">
                  <Plus className="h-3 w-3 mr-1" /> Add Money
                </Button>
                <Button size="sm" variant="ghost" className="flex-1 border border-white/10 text-xs">
                  <Eye className="h-3 w-3 mr-1" /> View Wallet
                </Button>
              </div>
            </div>

            {/* Mandi Highlights */}
            <div className="bg-[#111] border border-white/10 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-semibold">{"Today's Mandi Highlights"}</div>
                <Link to="/mandi-bhav" className="text-xs text-primary hover:underline">View All</Link>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {MANDI_PRICES.map((p) => (
                  <div key={p.crop} className="bg-white/5 rounded-xl p-2.5">
                    <div className="text-xs text-gray-400">{p.crop}</div>
                    <div className="text-sm font-bold">{p.price}</div>
                    <div className="text-[10px] text-gray-500">{p.unit}</div>
                    <div className={`text-[10px] font-semibold flex items-center gap-0.5 ${p.up ? "text-primary" : "text-red-400"}`}>
                      {p.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                      {p.change}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weather */}
            <div className="bg-[#111] border border-white/10 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-semibold">Weather Update</div>
                <Link to="/weather" className="text-xs text-primary hover:underline">View Full Forecast</Link>
              </div>
              <div className="text-xs text-gray-500 mb-3">Kanpur, Uttar Pradesh</div>
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl font-black" style={{ fontFamily: "Rajdhani, sans-serif" }}>28°C</div>
                <div>
                  <div className="text-2xl">⛅</div>
                  <div className="text-xs text-gray-400">Partly Cloudy</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  { label: "Humidity", value: "62%" },
                  { label: "Wind", value: "12 km/h" },
                  { label: "Rain Chance", value: "20%" },
                ].map((w) => (
                  <div key={w.label} className="bg-white/5 rounded-lg p-2">
                    <div className="text-xs font-semibold">{w.value}</div>
                    <div className="text-[10px] text-gray-500">{w.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Middle row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* My Crops */}
            <div className="bg-[#111] border border-white/10 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-semibold">My Crops</div>
                <button className="text-xs text-primary hover:underline cursor-pointer">View All</button>
              </div>
              <div className="space-y-3">
                {MY_CROPS.map((c) => (
                  <div key={c.name} className="flex items-center gap-3">
                    <img src={c.img} alt={c.name} className="w-10 h-10 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold">{c.name}</div>
                      <div className="text-xs text-gray-500">{c.area}</div>
                    </div>
                    <Badge className="bg-primary/20 text-primary border-primary/30 text-[10px]">{c.status}</Badge>
                    <div className="text-right text-xs">
                      <div className="text-gray-300 font-medium">Expected Yield</div>
                      <div className="text-primary font-bold">{c.yield}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-[#111] border border-white/10 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-semibold">Recent Orders</div>
                <button className="text-xs text-primary hover:underline cursor-pointer">View All</button>
              </div>
              <div className="space-y-3">
                {RECENT_ORDERS.map((o) => (
                  <div key={o.id} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                      <ShoppingCart className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold">{o.name}</div>
                      <div className="text-xs text-gray-500">Order ID : {o.id}</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-xs font-semibold ${o.statusColor}`}>{o.status}</div>
                      <div className="text-[10px] text-gray-500">{o.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-[#111] border border-white/10 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-semibold">Notifications</div>
                <button className="text-xs text-primary hover:underline cursor-pointer">View All</button>
              </div>
              <div className="space-y-3">
                {NOTIFICATIONS.map((n) => (
                  <div key={n.title} className="flex items-start gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full ${n.dot} mt-1.5 shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold">{n.title}</div>
                      <div className="text-[11px] text-gray-500 truncate">{n.desc}</div>
                    </div>
                    <div className="text-[10px] text-gray-600 shrink-0">{n.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Our Services */}
          <div className="bg-[#111] border border-white/10 rounded-2xl p-5">
            <div className="text-sm font-semibold mb-4">Our Services</div>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {SERVICES_GRID.map((s) => (
                <Link key={s.label} to={s.href} className="flex flex-col items-center gap-2 p-2 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer">
                  <div className="w-11 h-11 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <s.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-[10px] text-gray-400 text-center leading-tight">{s.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "Book Machinery Instantly", desc: "Tractors, Rotavators, Harvesters and more at your fingertips.", img: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400&q=80", btn: "Book Now", href: "/machinery-booking" },
              { title: "Soil Testing for Better Yield", desc: "Know your soil health and get personalized fertilizer advice.", img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80", btn: "Book Soil Test", href: "/soil-testing" },
              { title: "Talk to Expert", desc: "Get solution for your crop problems from experts.", img: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=400&q=80", btn: "Chat Now", href: "/expert-advice" },
            ].map((card) => (
              <div key={card.title} className="relative rounded-2xl overflow-hidden h-40 group">
                <img src={card.img} alt={card.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-70" />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-sm font-bold mb-0.5">{card.title}</h3>
                  <p className="text-[10px] text-gray-300 mb-2 line-clamp-1">{card.desc}</p>
                  <Link to={card.href}>
                    <Button size="sm" className="bg-primary text-black font-semibold text-xs py-1 h-7">{card.btn}</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
