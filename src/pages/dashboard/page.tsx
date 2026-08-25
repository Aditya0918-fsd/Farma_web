import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, TrendingUp, ShoppingCart, Leaf, Tractor, Users, MessageSquare,
  FlaskConical, CloudSun, Wallet, FileText, Bell, User, HelpCircle, Menu, X,
  Search, ArrowUpRight, Plus, Eye, LogOut, CheckCheck, Home, CreditCard,
  CheckCircle2, Clock, Filter, MapPin, Calendar, Tag, ChevronRight, Package
} from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { useApp } from "@/context/AppContext.tsx";

export default function DashboardPage() {
  const {
    user,
    logoutUser,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    setIsKccAppModalOpen,
    cropListings,
    machineryBookings,
    hasAppliedKcc
  } = useApp();

  const location = useLocation();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Modals state for Crops & Orders
  const [isCropsModalOpen, setIsCropsModalOpen] = useState(false);
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);
  const [ordersFilter, setOrdersFilter] = useState<"all" | "inputs" | "machinery" | "labour">("all");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<any>(null);

  // Dealer Dashboard Timeframe Analytics state
  const [dealerTimeframe, setDealerTimeframe] = useState<"1day" | "weekly" | "monthly" | "quarterly" | "yearly">("monthly");

  const DEALER_ANALYTICS: Record<string, { income: string; orders: number; sales: string; growth: string }> = {
    "1day": { income: "₹18,450", orders: 14, sales: "₹42,800", growth: "+4.2% vs yesterday" },
    "weekly": { income: "₹1,24,500", orders: 86, sales: "₹3,10,000", growth: "+8.5% vs last week" },
    "monthly": { income: "₹5,42,000", orders: 342, sales: "₹14,20,000", growth: "+14.2% vs last month" },
    "quarterly": { income: "₹16,80,000", orders: 1050, sales: "₹45,60,000", growth: "+18.1% vs Q1" },
    "yearly": { income: "₹68,50,000", orders: 4200, sales: "₹1,85,000,00", growth: "+22.4% YoY" },
  };

  const unreadNotifCount = notifications.filter((n) => !n.read).length;

  const SIDEBAR_ITEMS = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: TrendingUp, label: "Mandi Bhav", href: "/mandi-bhav" },
    { icon: ShoppingCart, label: "Buy Inputs", href: "/agri-market" },
    { icon: Leaf, label: "Sell Crops", href: "/sell-crops" },
    { icon: Tractor, label: "Machinery Booking", href: "/machinery-booking" },
    { icon: Users, label: "Labour Booking", href: "/labour-booking" },
    { icon: MessageSquare, label: "Expert Advice", href: "/expert-advice" },
    { icon: CloudSun, label: "Weather Update", href: "/weather" },
    { icon: Wallet, label: "Wallet", href: "/wallet" },
    { icon: FileText, label: "Orders", action: () => setIsOrdersModalOpen(true) },
    { icon: Bell, label: "Notifications", href: "/notifications" },
    { icon: User, label: "Profile", href: "/profile" },
    { icon: HelpCircle, label: "Help & Support", href: "/help-center" },
  ];

  const MANDI_PRICES = [
    { crop: "Wheat", price: "₹2,275", unit: "/Quintal", change: "+2.35%", up: true },
    { crop: "Paddy", price: "₹1,860", unit: "/Quintal", change: "+1.78%", up: true },
    { crop: "Soyabean", price: "₹4,920", unit: "/Quintal", change: "+3.12%", up: true },
    { crop: "Maize", price: "₹1,920", unit: "/Quintal", change: "+0.91%", up: true },
  ];

  // Listed Crops Data (combining AppContext cropListings + demo listed crops)
  const defaultListedCrops = [
    {
      id: "crop-demo-1",
      cropName: "Sharbati Wheat",
      weight: "50 Quintal",
      price: 2275,
      district: "Patna",
      city: "Danapur",
      sellerName: user?.name || "Ram Das",
      phone: user?.phone || "8906554583",
      status: "approved",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&q=80",
      createdAt: "2026-08-20T10:30:00.000Z",
    },
    {
      id: "crop-demo-2",
      cropName: "Basmati Paddy",
      weight: "35 Quintal",
      price: 1860,
      district: "Nalanda",
      city: "Rajgir",
      sellerName: user?.name || "Ram Das",
      phone: user?.phone || "8906554583",
      status: "growing",
      image: "https://images.unsplash.com/photo-1536054993300-0b00f01ee72a?w=500&q=80",
      createdAt: "2026-08-18T14:15:00.000Z",
    },
    {
      id: "crop-demo-3",
      cropName: "Organic Soyabean",
      weight: "20 Quintal",
      price: 4920,
      district: "Varanasi",
      city: "Rajpur",
      sellerName: user?.name || "Ram Das",
      phone: user?.phone || "8906554583",
      status: "pending",
      image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&q=80",
      createdAt: "2026-08-24T09:00:00.000Z",
    },
  ];

  const allUserCrops = [...cropListings, ...defaultListedCrops];

  // All Orders & Bookings History Data
  const ALL_ORDERS = [
    {
      id: "ORD-1256",
      type: "inputs",
      categoryName: "Input Purchase",
      title: "NPK 19:19:19 Fertilizer (50kg Bag)",
      vendor: "Krivexa Agro Supplies",
      date: "12 May, 2026",
      amount: "₹1,450.00",
      status: "Delivered",
      statusBadge: "bg-primary/20 text-primary border-primary/30",
      icon: ShoppingCart,
      details: "Delivered to Rajpur Farm. Payment mode: Kisan Wallet.",
    },
    {
      id: "TRAC-256",
      type: "machinery",
      categoryName: "Machinery Booking",
      title: "Mahindra 45HP Tractor + Rotavator",
      vendor: "Varanasi Machinery Hub",
      date: "11 May, 2026",
      amount: "₹2,400.00 (4 Hours)",
      status: "Confirmed",
      statusBadge: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      icon: Tractor,
      details: "Operator: Rajesh Kumar. Scheduled for 28 Aug 2026, 08:00 AM.",
    },
    {
      id: "SEED-178",
      type: "inputs",
      categoryName: "Input Purchase",
      title: "Hybrid Wheat Seeds (25kg)",
      vendor: "Bihar Agro Seed Corp",
      date: "10 May, 2026",
      amount: "₹1,850.00",
      status: "Shipped",
      statusBadge: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      icon: Package,
      details: "Dispatched via Express Courier. Tracking ID: EXP908712.",
    },
    {
      id: "LAB-405",
      type: "labour",
      categoryName: "Labour Booking",
      title: "Paddy Harvesting Workers (4 Labours)",
      vendor: "Krivexa Labour Network",
      date: "08 May, 2026",
      amount: "₹2,000.00 (Full Day)",
      status: "Completed",
      statusBadge: "bg-primary/20 text-primary border-primary/30",
      icon: Users,
      details: "4 skilled farm workers dispatched for 1.5 Acre harvesting.",
    },
    {
      id: "SOIL-802",
      type: "inputs",
      categoryName: "Soil Test Consultation",
      title: "Full NPK & pH Soil Testing Kit + Report",
      vendor: "Patna Central Agri Lab",
      date: "02 May, 2026",
      amount: "₹499.00",
      status: "Report Ready",
      statusBadge: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      icon: FlaskConical,
      details: "Soil health score: 8.2/10. Recommended: Organic bio-fertilizer.",
    },
  ];

  // Merge dynamic machinery bookings from AppContext into orders
  const dynamicMachineryOrders = machineryBookings.map((b) => ({
    id: b.id.toUpperCase(),
    type: "machinery",
    categoryName: "Machinery Booking",
    title: b.machineryType,
    vendor: "Krivexa Machine Fleet",
    date: b.bookingDate,
    amount: `${b.durationHours} Hours Booking`,
    status: b.status === "allotted" ? "Confirmed" : b.status === "rejected" ? "Cancelled" : "Pending",
    statusBadge:
      b.status === "allotted"
        ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
        : b.status === "rejected"
        ? "bg-red-500/20 text-red-400 border-red-500/30"
        : "bg-amber-500/20 text-amber-400 border-amber-500/30",
    icon: Tractor,
    details: `Location: ${b.location}. Phone: ${b.phone}. ${b.allottedMachineDetails || "Waiting for admin allotment."}`,
  }));

  const fullOrdersList = [...ALL_ORDERS, ...dynamicMachineryOrders];

  const filteredOrders = fullOrdersList.filter((o) => {
    if (ordersFilter === "all") return true;
    return o.type === ordersFilter;
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/agri-market?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white overflow-hidden font-sans">
      
      {/* SIDEBAR PANEL */}
      <aside className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 fixed md:relative z-50 w-64 h-full bg-[#0c0c0c] border-r border-white/10 flex flex-col transition-transform duration-300`}>
        
        {/* Brand Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="/krivexa-logo.jpg" alt="KRIVEXA" className="h-8 w-8 object-cover rounded-lg border border-primary/40" />
            <div>
              <div className="text-sm font-black tracking-widest text-white" style={{ fontFamily: "Rajdhani, sans-serif" }}>KRIV<span className="text-primary">E</span>XA</div>
              <div className="text-[9px] text-primary tracking-wider font-semibold">SMART FARMING</div>
            </div>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* User Info Bar in Sidebar */}
        <div className="p-3 mx-3 my-2 bg-white/5 border border-white/10 rounded-xl flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary text-black font-black flex items-center justify-center text-sm shrink-0">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-white truncate">{user?.name || "Ram Das"}</div>
            <div className="text-[10px] text-primary font-medium capitalize truncate">{user?.role || "farmer"} partner</div>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 overflow-y-auto py-2 px-3 space-y-1">
          {SIDEBAR_ITEMS.map((item) => {
            const isActive = item.href ? location.pathname === item.href : false;
            if (item.action) {
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    setSidebarOpen(false);
                    item.action();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-gray-400 hover:bg-white/5 hover:text-white transition-all cursor-pointer text-left"
                >
                  <item.icon className="h-4 w-4 shrink-0 text-primary" />
                  {item.label}
                </button>
              );
            }
            return (
              <Link
                key={item.label}
                to={item.href!}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? "bg-primary text-black font-bold shadow-md shadow-primary/20"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon className={`h-4 w-4 shrink-0 ${isActive ? "text-black" : "text-primary"}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions in Sidebar */}
        <div className="p-3 border-t border-white/10 space-y-2">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 rounded-xl text-xs font-semibold transition-colors"
          >
            <Home className="h-3.5 w-3.5 text-primary" /> Back to Website
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5" /> Logout Session
          </button>
        </div>
      </aside>

      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/70 backdrop-blur-xs md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* MAIN CONTENT WINDOW */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* TOP HEADER */}
        <header className="h-16 bg-[#0c0c0c] border-b border-white/10 flex items-center px-4 md:px-6 gap-3 shrink-0 justify-between">
          <div className="flex items-center gap-3 flex-1 max-w-xl">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden text-gray-300 p-2 rounded-lg bg-white/5 border border-white/10">
              <Menu className="h-5 w-5 text-primary" />
            </button>
            <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center bg-white/5 border border-white/10 rounded-xl px-3 py-2">
              <Search className="h-4 w-4 text-gray-500 mr-2 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search crops, mandi prices, machinery..."
                className="bg-transparent text-xs text-white placeholder:text-gray-500 outline-none flex-1"
              />
            </form>
          </div>

          <div className="flex items-center gap-3">
            
            {/* Notifications Bell Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowNotifMenu(!showNotifMenu)}
                className="relative p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-primary transition-colors cursor-pointer"
              >
                <Bell className="h-4 w-4 text-primary" />
                {unreadNotifCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-black text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {unreadNotifCount}
                  </span>
                )}
              </button>

              {showNotifMenu && (
                <div className="absolute right-0 top-full mt-2 w-76 sm:w-80 bg-[#111] border border-white/10 rounded-2xl shadow-2xl z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-white/10">
                    <div className="font-bold text-xs text-white flex items-center gap-2">
                      <Bell className="h-4 w-4 text-primary" /> Notifications ({unreadNotifCount})
                    </div>
                    {unreadNotifCount > 0 && (
                      <button onClick={markAllNotificationsAsRead} className="text-[10px] text-primary hover:underline flex items-center gap-1 cursor-pointer">
                        <CheckCheck className="h-3 w-3" /> Mark read
                      </button>
                    )}
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="py-6 text-center text-gray-500 text-xs">No notifications yet.</div>
                    ) : (
                      notifications.slice(0, 5).map((n) => (
                        <div
                          key={n.id}
                          onClick={() => { markNotificationAsRead(n.id); setShowNotifMenu(false); navigate(n.link || "/notifications"); }}
                          className={`p-3 border-b border-white/5 last:border-0 hover:bg-white/5 cursor-pointer text-xs ${!n.read ? "bg-primary/5" : ""}`}
                        >
                          <div className="font-semibold text-white">{n.title}</div>
                          <div className="text-[11px] text-gray-400 mt-0.5">{n.message}</div>
                          <div className="text-[9px] text-gray-600 mt-1">{n.time}</div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="p-3 border-t border-white/10 text-center">
                    <Link to="/notifications" onClick={() => setShowNotifMenu(false)} className="text-xs text-primary hover:underline font-bold">
                      View All Notifications →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-primary/40 transition-colors cursor-pointer"
              >
                <div className="w-7 h-7 rounded-lg bg-primary text-black font-black text-xs flex items-center justify-center">
                  {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
                <div className="hidden sm:block text-left pr-1">
                  <div className="text-xs font-bold text-white leading-tight">{user?.name || "Ram Das"}</div>
                  <div className="text-[10px] text-primary capitalize font-medium">{user?.role || "Farmer"}</div>
                </div>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-[#111] border border-white/10 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="p-3 bg-white/5 rounded-xl mb-2">
                    <div className="text-xs font-bold text-white">{user?.name || "Ram Das"}</div>
                    <div className="text-[10px] text-gray-400">{user?.phone || "8906554583"}</div>
                  </div>
                  <div className="space-y-1">
                    <Link
                      to="/profile"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-white hover:bg-white/5"
                    >
                      <User className="h-3.5 w-3.5 text-primary" /> View User Profile
                    </Link>
                    <Link
                      to="/wallet"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-gray-300 hover:bg-white/5"
                    >
                      <Wallet className="h-3.5 w-3.5 text-primary" /> Kisan Wallet
                    </Link>
                    <button
                      onClick={() => { setShowUserMenu(false); setIsOrdersModalOpen(true); }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-gray-300 hover:bg-white/5 text-left cursor-pointer"
                    >
                      <FileText className="h-3.5 w-3.5 text-primary" /> All Orders & Bookings
                    </button>
                  </div>
                  <div className="pt-2 border-t border-white/10 mt-2">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 py-1.5 rounded-lg text-xs font-bold text-red-400 bg-red-500/10 hover:bg-red-500/20 cursor-pointer"
                    >
                      <LogOut className="h-3.5 w-3.5" /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </header>

        {/* DASHBOARD CONTENT BODY */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          
          {/* === DEALER SPECIAL TOP DASHBOARD ANALYTICS BAR === */}
          {user?.role === "dealer" && (
            <div className="bg-linear-to-r from-[#121212] via-[#1a251a] to-[#121212] border border-primary/30 rounded-2xl p-5 shadow-xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5 border-b border-white/10 pb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary/20 text-primary border border-primary/30 mb-1">
                    <CheckCircle2 className="h-3 w-3" /> VERIFIED DEALER PANEL
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white" style={{ fontFamily: "Rajdhani, sans-serif" }}>
                    Dealer Business Analytics
                  </h2>
                  <p className="text-xs text-gray-400">Track total income, orders, and sales performance</p>
                </div>

                {/* Timeframe Filter Selector */}
                <div className="flex items-center gap-1 bg-black/60 p-1 border border-white/10 rounded-xl overflow-x-auto max-w-full">
                  {[
                    { key: "1day", label: "1 Day" },
                    { key: "weekly", label: "Weekly" },
                    { key: "monthly", label: "Monthly" },
                    { key: "quarterly", label: "Quarterly" },
                    { key: "yearly", label: "Yearly" },
                  ].map((tf) => (
                    <button
                      key={tf.key}
                      onClick={() => setDealerTimeframe(tf.key as any)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                        dealerTimeframe === tf.key
                          ? "bg-primary text-black shadow-md shadow-primary/20"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {tf.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3 Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Total Income */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-400 font-semibold mb-1">Total Income</div>
                    <div className="text-2xl font-black text-primary" style={{ fontFamily: "Rajdhani, sans-serif" }}>
                      {DEALER_ANALYTICS[dealerTimeframe].income}
                    </div>
                    <div className="text-[10px] text-emerald-400 font-semibold mt-1">
                      {DEALER_ANALYTICS[dealerTimeframe].growth}
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                </div>

                {/* Total Orders */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-400 font-semibold mb-1">Total Orders</div>
                    <div className="text-2xl font-black text-white" style={{ fontFamily: "Rajdhani, sans-serif" }}>
                      {DEALER_ANALYTICS[dealerTimeframe].orders}
                    </div>
                    <div className="text-[10px] text-primary font-semibold mt-1">
                      Fulfilled & Delivered
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <ShoppingCart className="h-5 w-5" />
                  </div>
                </div>

                {/* Total Sales */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-400 font-semibold mb-1">Total Sales Revenue</div>
                    <div className="text-2xl font-black text-amber-400" style={{ fontFamily: "Rajdhani, sans-serif" }}>
                      {DEALER_ANALYTICS[dealerTimeframe].sales}
                    </div>
                    <div className="text-[10px] text-amber-300 font-semibold mt-1">
                      Fertilizer & Machine Fleet
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <Wallet className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Wallet Balance Card */}
            <div className="bg-[#111] border border-white/10 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-primary/10 rounded-full blur-xl pointer-events-none" />
              <div>
                <div className="text-xs text-gray-400 font-medium mb-1">Wallet Balance</div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <Wallet className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-3xl font-black text-primary" style={{ fontFamily: "Rajdhani, sans-serif" }}>₹4,250.00</div>
                    <div className="text-[11px] text-gray-400">Krivexa Kisan Wallet</div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Link to="/wallet" className="flex-1">
                  <Button size="sm" className="w-full bg-primary text-black font-bold text-xs py-2">
                    <Plus className="h-3.5 w-3.5 mr-1" /> Add Money
                  </Button>
                </Link>
                <Link to="/wallet" className="flex-1">
                  <Button size="sm" variant="ghost" className="w-full border border-white/10 text-xs font-semibold text-gray-300 hover:text-white">
                    <Eye className="h-3.5 w-3.5 mr-1" /> View Wallet
                  </Button>
                </Link>
              </div>
            </div>

            {/* Mandi Highlights Card */}
            <div className="bg-[#111] border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-bold text-white">Today's Mandi Highlights</div>
                  <Link to="/mandi-bhav" className="text-xs text-primary hover:underline font-bold">View All →</Link>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {MANDI_PRICES.map((p) => (
                    <div key={p.crop} className="bg-white/5 border border-white/5 rounded-xl p-2.5 hover:border-primary/30 transition-colors">
                      <div className="text-xs text-gray-400 font-medium">{p.crop}</div>
                      <div className="text-sm font-bold text-white">{p.price}</div>
                      <div className="text-[10px] text-gray-500">{p.unit}</div>
                      <div className="text-[10px] font-semibold text-primary flex items-center gap-0.5 mt-0.5">
                        <ArrowUpRight className="h-3 w-3" /> {p.change}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Weather Card */}
            <div className="bg-[#111] border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-bold text-white">Weather Forecast</div>
                  <Link to="/weather" className="text-xs text-primary hover:underline font-bold">View Full Forecast →</Link>
                </div>
                <div className="text-xs text-gray-400 mb-3">Patna, Bihar • Live Update</div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl font-black text-white" style={{ fontFamily: "Rajdhani, sans-serif" }}>28°C</div>
                  <div>
                    <div className="text-2xl">⛅</div>
                    <div className="text-xs text-gray-300 font-semibold">Partly Cloudy</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  {[
                    { label: "Humidity", value: "62%" },
                    { label: "Wind", value: "12 km/h" },
                    { label: "Rain Chance", value: "20%" },
                  ].map((w) => (
                    <div key={w.label} className="bg-white/5 border border-white/5 rounded-xl p-2">
                      <div className="text-xs font-bold text-white">{w.value}</div>
                      <div className="text-[10px] text-gray-500">{w.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Middle Row: My Crops, Recent Orders, Live Notifications */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Requirement 1: My Crops & Cultivation with Manage Crops Modal */}
            <div className="bg-[#111] border border-white/10 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-bold text-white">My Crops & Cultivation</div>
                <button
                  type="button"
                  onClick={() => setIsCropsModalOpen(true)}
                  className="text-xs text-primary hover:underline font-bold cursor-pointer"
                >
                  Manage Crops →
                </button>
              </div>
              <div className="space-y-3">
                {allUserCrops.slice(0, 3).map((c) => (
                  <div
                    key={c.id}
                    onClick={() => setIsCropsModalOpen(true)}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-primary/40 cursor-pointer transition-all"
                  >
                    <img src={c.image} alt={c.cropName} className="w-10 h-10 rounded-lg object-cover border border-white/10 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-white truncate">{c.cropName}</div>
                      <div className="text-[10px] text-gray-400">{c.weight} • ₹{c.price}/Qtl</div>
                    </div>
                    <Badge className="bg-primary/20 text-primary border-primary/30 text-[10px] px-2 py-0.5 capitalize">
                      {c.status || "Growing"}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirement 2: Recent Orders & Bookings with View All History Modal */}
            <div className="bg-[#111] border border-white/10 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-bold text-white">Recent Orders & Bookings</div>
                <button
                  type="button"
                  onClick={() => setIsOrdersModalOpen(true)}
                  className="text-xs text-primary hover:underline font-bold cursor-pointer"
                >
                  View All →
                </button>
              </div>
              <div className="space-y-3">
                {fullOrdersList.slice(0, 3).map((o) => (
                  <div
                    key={o.id}
                    onClick={() => setIsOrdersModalOpen(true)}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-primary/40 cursor-pointer transition-all"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      <o.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-white truncate">{o.title}</div>
                      <div className="text-[10px] text-gray-400">Order ID: #{o.id}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <Badge className={`text-[10px] border px-2 py-0.5 ${o.statusBadge}`}>{o.status}</Badge>
                      <div className="text-[9px] text-gray-500 mt-0.5">{o.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Notifications */}
            <div className="bg-[#111] border border-white/10 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  System Alerts & Activity
                </div>
                <Link to="/notifications" className="text-xs text-primary hover:underline font-bold">View All →</Link>
              </div>
              <div className="space-y-3">
                {notifications.slice(0, 3).map((n) => (
                  <div
                    key={n.id}
                    onClick={() => navigate(n.link || "/notifications")}
                    className="flex items-start gap-3 p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-primary/30 cursor-pointer transition-colors"
                  >
                    <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${!n.read ? "bg-primary" : "bg-gray-600"}`} />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-white">{n.title}</div>
                      <div className="text-[11px] text-gray-400 truncate mt-0.5">{n.message}</div>
                    </div>
                    <div className="text-[9px] text-gray-500 shrink-0">{n.time}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Requirement 3: OUR SERVICES & FEATURES SECTION AND THE NEXT FEATURED CARDS SECTION REMOVED AS INSTRUCTED */}

        </main>
      </div>

      {/* REQUIREMENT 1 MODAL: MY LISTED CROPS & CULTIVATION HISTORY */}
      {isCropsModalOpen && (
        <div className="fixed inset-0 z-200 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#111] border border-white/10 rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                  <Leaf className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">My Listed Crops & Cultivation History</h2>
                  <p className="text-xs text-gray-400">All crops listed for sale and active cultivation details</p>
                </div>
              </div>
              <button
                onClick={() => setIsCropsModalOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-semibold text-gray-400">
                  Total Listed Crops: <span className="text-white font-bold">{allUserCrops.length}</span>
                </div>
                <Link to="/sell-crops" onClick={() => setIsCropsModalOpen(false)}>
                  <Button size="sm" className="bg-primary text-black font-bold text-xs">
                    <Plus className="h-3.5 w-3.5 mr-1" /> Sell New Crop
                  </Button>
                </Link>
              </div>

              {allUserCrops.length === 0 ? (
                <div className="text-center py-12 text-gray-500 text-sm">
                  No crop listings found. Click "Sell New Crop" to list your first harvest!
                </div>
              ) : (
                allUserCrops.map((crop) => (
                  <div
                    key={crop.id}
                    className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:border-primary/40 transition-all"
                  >
                    <img
                      src={crop.image}
                      alt={crop.cropName}
                      className="w-full sm:w-24 h-24 rounded-xl object-cover border border-white/10 shrink-0"
                    />
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-white">{crop.cropName}</h3>
                        <Badge
                          className={`text-[10px] px-2 py-0.5 capitalize border ${
                            crop.status === "approved"
                              ? "bg-primary/20 text-primary border-primary/30"
                              : crop.status === "rejected"
                              ? "bg-red-500/20 text-red-400 border-red-500/30"
                              : "bg-amber-500/20 text-amber-400 border-amber-500/30"
                          }`}
                        >
                          {crop.status === "approved" ? "Approved ✅" : crop.status === "growing" ? "Active Cultivation 🌾" : "Pending Review ⏳"}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-300">
                        <div><span className="text-gray-500">Weight / Quantity:</span> <span className="font-semibold text-white">{crop.weight}</span></div>
                        <div><span className="text-gray-500">Listing Price:</span> <span className="font-semibold text-primary">₹{crop.price}/Quintal</span></div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-gray-500 shrink-0" />
                          <span className="text-gray-400 truncate">{crop.district}, {crop.city || "Bihar"}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-gray-500 shrink-0" />
                          <span className="text-gray-400">{new Date(crop.createdAt).toLocaleDateString("en-IN")}</span>
                        </div>
                      </div>

                      <div className="text-[11px] text-gray-400 pt-1">
                        Seller: <span className="text-white font-medium">{crop.sellerName}</span> ({crop.phone})
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-white/10 bg-white/5 flex items-center justify-between">
              <span className="text-xs text-gray-400">Manage all your listed crop stock & prices dynamically</span>
              <Button variant="ghost" size="sm" onClick={() => setIsCropsModalOpen(false)} className="border border-white/10 text-xs">
                Close
              </Button>
            </div>

          </div>
        </div>
      )}

      {/* REQUIREMENT 2 MODAL: ALL ORDERS & BOOKING HISTORY */}
      {isOrdersModalOpen && (
        <div className="fixed inset-0 z-200 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#111] border border-white/10 rounded-2xl max-w-4xl w-full max-h-[88vh] flex flex-col shadow-2xl overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">All Orders & Booking History</h2>
                  <p className="text-xs text-gray-400">Complete record of fertilizers, seeds, crops, labour & machinery bookings</p>
                </div>
              </div>
              <button
                onClick={() => setIsOrdersModalOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Filter Tabs Header */}
            <div className="px-5 pt-3 border-b border-white/10 flex items-center gap-2 overflow-x-auto bg-[#0d0d0d]">
              {[
                { id: "all", label: `All Bookings & Orders (${fullOrdersList.length})` },
                { id: "inputs", label: "Input Purchases & Fertilizers" },
                { id: "machinery", label: "Machinery Bookings" },
                { id: "labour", label: "Labour Bookings" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setOrdersFilter(tab.id as any)}
                  className={`px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all border-t border-x cursor-pointer shrink-0 ${
                    ordersFilter === tab.id
                      ? "bg-[#111] text-primary border-primary/40 border-b-transparent -mb-px"
                      : "text-gray-400 border-transparent hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Modal Content List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {filteredOrders.length === 0 ? (
                <div className="text-center py-12 text-gray-500 text-sm">
                  No orders found under this category.
                </div>
              ) : (
                filteredOrders.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-primary/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3.5 flex-1 min-w-0">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs text-gray-400 font-mono font-bold">#{item.id}</span>
                          <Badge className="bg-white/10 text-gray-300 border-white/10 text-[10px] font-medium">
                            {item.categoryName}
                          </Badge>
                        </div>
                        <h3 className="text-sm font-bold text-white truncate mt-0.5">{item.title}</h3>
                        <div className="text-xs text-gray-400 flex items-center gap-3 mt-1">
                          <span>Vendor/Provider: <strong className="text-gray-300">{item.vendor}</strong></span>
                          <span>• {item.date}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5 gap-2">
                      <div className="text-right">
                        <div className="text-sm font-black text-primary">{item.amount}</div>
                        <Badge className={`text-[10px] border px-2 py-0.5 mt-0.5 ${item.statusBadge}`}>
                          {item.status}
                        </Badge>
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedOrderDetails(selectedOrderDetails?.id === item.id ? null : item)}
                        className="text-xs text-gray-400 hover:text-white underline flex items-center gap-1 cursor-pointer"
                      >
                        {selectedOrderDetails?.id === item.id ? "Hide Details" : "View Invoice"}
                      </button>
                    </div>

                    {/* Detailed Invoice Breakdown view */}
                    {selectedOrderDetails?.id === item.id && (
                      <div className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-gray-300 space-y-1.5 animate-in fade-in">
                        <div className="font-bold text-white text-xs border-b border-white/10 pb-1">
                          Booking Details & Log Summary
                        </div>
                        <p>ℹ️ <strong>Status Log:</strong> {item.details}</p>
                        <p>📅 <strong>Date Registered:</strong> {item.date}</p>
                        <p>💳 <strong>Payment Status:</strong> Paid via Kisan Wallet / COD</p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-white/10 bg-white/5 flex items-center justify-between">
              <span className="text-xs text-gray-400">All bookings are tracked with real-time status updates</span>
              <Button variant="ghost" size="sm" onClick={() => setIsOrdersModalOpen(false)} className="border border-white/10 text-xs">
                Close
              </Button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
