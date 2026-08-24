import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Globe, LogIn, CreditCard, Bell, User, LogOut, CheckCheck, MapPin, Store, Wallet, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { cn } from "@/lib/utils.ts";
import { useApp } from "@/context/AppContext.tsx";
import type { Language } from "@/lib/translations.ts";
import { toast } from "sonner";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const location = useLocation();
  const { 
    language, 
    setLanguage, 
    t, 
    setIsKccAppModalOpen, 
    user, 
    logoutUser, 
    notifications, 
    markAllNotificationsAsRead 
  } = useApp();

  const unreadCount = notifications.filter(n => !n.read).length;

  const LANG_OPTIONS: { code: Language; label: string; flag: string }[] = [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "hi", label: "हिंदी", flag: "🇮🇳" },
    { code: "bn", label: "বাংলা", flag: "🇧🇩" },
  ];

  const SERVICES_LINKS = [
    { label: t.nav.mandiBhav, href: "/mandi-bhav" },
    { label: t.nav.buyInputs, href: "/agri-market" },
    { label: t.nav.sellCrops, href: "/sell-crops" },
    { label: t.nav.labourBooking, href: "/labour-booking" },
    { label: t.nav.expertAdvice, href: "/expert-advice" },
    { label: t.nav.weather, href: "/weather" },
    { label: t.nav.wallet, href: "/wallet" },
  ];

  const RESOURCES_LINKS = [
    { label: t.nav.blog, href: "/blog" },
    { label: t.nav.cropCalendar, href: "/crop-calendar" },
    { label: t.nav.govSchemes, href: "/government-schemes" },
    { label: t.nav.farmingTips, href: "/farming-tips" },
    { label: t.nav.helpCenter, href: "/help-center" },
  ];

  const NAV_LINKS = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.aboutUs, href: "/about" },
    { label: t.nav.services, children: SERVICES_LINKS },
    { label: t.nav.resources, children: RESOURCES_LINKS },
    { label: t.nav.contactUs, href: "/contact" },
  ];

  const handleLogout = () => {
    logoutUser();
    setShowUserMenu(false);
    toast.info("Logged out successfully.");
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img 
              src="/krivexa-logo.jpg" 
              alt="KRIVEXA Logo" 
              className="h-10 w-10 object-cover rounded-xl border border-primary/40 group-hover:scale-105 transition-transform" 
            />
            <div>
              <span className="text-xl font-black tracking-wider text-white group-hover:text-primary transition-colors" style={{ fontFamily: "Rajdhani, sans-serif" }}>
                KRIVEXA
              </span>
              <span className="block text-[9px] text-gray-400 font-medium tracking-widest -mt-1 uppercase">
                Smart Agriculture
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button className="flex items-center gap-1 text-sm text-gray-300 hover:text-primary py-2 transition-colors cursor-pointer">
                    {link.label}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                  {openDropdown === link.label && (
                    <div className="absolute top-full left-0 w-48 bg-[#111] border border-white/10 rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.href}
                          className="block px-4 py-2 text-xs text-gray-300 hover:text-primary hover:bg-white/5 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className={cn(
                    "text-sm transition-colors py-2",
                    location.pathname === link.href ? "text-primary font-semibold border-b-2 border-primary" : "text-gray-300 hover:text-primary"
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Right Section Controls */}
          <div className="hidden lg:flex items-center gap-3">
            
            {/* KCC Fast Application Button */}
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsKccAppModalOpen(true)}
              className="border-primary/40 bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary text-xs font-bold"
            >
              <CreditCard className="h-3.5 w-3.5 mr-1" /> KCC Apply
            </Button>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-xs text-gray-300 hover:text-primary transition-colors cursor-pointer"
              >
                <Globe className="h-3.5 w-3.5 text-primary" />
                <span>{LANG_OPTIONS.find(l => l.code === language)?.flag}</span>
                <span>{LANG_OPTIONS.find(l => l.code === language)?.label}</span>
                <ChevronDown className="h-3 w-3" />
              </button>
              {showLangMenu && (
                <div className="absolute right-0 top-full mt-1 w-36 bg-[#111] border border-white/10 rounded-xl shadow-xl py-1 z-50">
                  {LANG_OPTIONS.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLanguage(l.code); setShowLangMenu(false); }}
                      className={`w-full flex items-center gap-2 px-4 py-2 text-sm cursor-pointer transition-colors ${language === l.code ? "text-primary bg-primary/5 font-semibold" : "text-gray-300 hover:text-primary hover:bg-white/5"}`}
                    >
                      <span>{l.flag}</span>{l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* LOGGED IN VIEW vs GUEST VIEW */}
            {user ? (
              <div className="flex items-center gap-3 pl-2 border-l border-white/10">
                
                {/* Notifications Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => { setShowNotifMenu(!showNotifMenu); setShowUserMenu(false); }}
                    className="relative p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-primary hover:border-primary/40 transition-colors cursor-pointer"
                  >
                    <Bell className="h-4 w-4" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-black text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {showNotifMenu && (
                    <div className="absolute right-0 top-full mt-2 w-80 bg-[#111] border border-white/10 rounded-2xl shadow-2xl z-50 p-4 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <div className="font-bold text-sm text-white flex items-center gap-2">
                          <Bell className="h-4 w-4 text-primary" /> Notifications
                        </div>
                        {unreadCount > 0 && (
                          <button
                            onClick={markAllNotificationsAsRead}
                            className="text-[11px] text-primary hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <CheckCheck className="h-3 w-3" /> Mark read
                          </button>
                        )}
                      </div>

                      <div className="space-y-2 mt-3 max-h-64 overflow-y-auto pr-1">
                        {notifications.map((n) => (
                          <div
                            key={n.id}
                            className={`p-2.5 rounded-xl border text-left transition-colors ${
                              n.read ? "bg-white/5 border-white/5 opacity-70" : "bg-primary/5 border-primary/20"
                            }`}
                          >
                            <div className="flex justify-between items-start mb-1">
                              <span className="text-xs font-bold text-white">{n.title}</span>
                              <span className="text-[10px] text-gray-500">{n.time}</span>
                            </div>
                            <p className="text-[11px] text-gray-300 leading-snug">{n.message}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* User Profile Menu */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => { setShowUserMenu(!showUserMenu); setShowNotifMenu(false); }}
                    className="flex items-center gap-2 p-1.5 pr-3 rounded-xl bg-white/5 border border-white/10 hover:border-primary/40 transition-colors cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-lg bg-primary text-black font-black flex items-center justify-center text-sm shadow-md">
                      {user.name ? user.name.charAt(0).toUpperCase() : (user.role === "farmer" ? "F" : "D")}
                    </div>
                    <div className="text-left text-xs">
                      <div className="font-bold text-white line-clamp-1">{user.name || "User"}</div>
                      <div className="text-[10px] text-primary capitalize font-medium">{user.role}</div>
                    </div>
                    <ChevronDown className="h-3 w-3 text-gray-400" />
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-[#111] border border-white/10 rounded-2xl shadow-2xl z-50 p-4 animate-in fade-in slide-in-from-top-2 duration-150">
                      
                      {/* User Header Info */}
                      <div className="pb-3 border-b border-white/10 mb-3">
                        <div className="font-bold text-sm text-white flex items-center gap-2">
                          {user.role === "farmer" ? <Sprout className="h-4 w-4 text-primary" /> : <Store className="h-4 w-4 text-primary" />}
                          {user.name}
                        </div>
                        <div className="text-xs text-primary font-semibold mt-0.5 capitalize">
                          Verified {user.role} Account
                        </div>
                        <div className="text-[11px] text-gray-400 flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3 text-gray-500 shrink-0" />
                          <span>{user.village ? `${user.village}, ` : ""}{user.district || "Patna"}, {user.state || "Bihar"}</span>
                        </div>
                      </div>

                      {/* User Links */}
                      <div className="space-y-1">
                        <Link
                          to="/wallet"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          <Wallet className="h-4 w-4 text-primary" /> My Wallet & Payments
                        </Link>
                        <Link
                          to="/sell-crops"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          <Sprout className="h-4 w-4 text-primary" /> Sell Crops & Produce
                        </Link>
                      </div>

                      <div className="pt-3 border-t border-white/10 mt-3">
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition-colors cursor-pointer"
                        >
                          <LogOut className="h-3.5 w-3.5" /> Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            ) : (
              /* GUEST VIEW */
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="text-gray-300 hover:text-primary">
                    <LogIn className="h-4 w-4 mr-1" /> {t.nav.login}
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="bg-primary text-black font-semibold hover:bg-primary/90">
                    {t.nav.register}
                  </Button>
                </Link>
              </div>
            )}

          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-gray-300 cursor-pointer p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu Content */}
        {menuOpen && (
          <div className="lg:hidden bg-[#0e0e0e] border-t border-white/10 px-4 py-4 space-y-3 max-h-[80vh] overflow-y-auto">
            
            {/* Logged in Mobile Header */}
            {user ? (
              <div className="p-3 bg-primary/10 border border-primary/20 rounded-xl mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary text-black font-bold flex items-center justify-center text-sm">
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{user.name}</div>
                    <div className="text-[10px] text-primary capitalize font-medium">{user.role} Partner</div>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-xs font-bold text-red-400 bg-red-500/10 border border-red-500/20 px-2.5 py-1 rounded-lg"
                >
                  Logout
                </button>
              </div>
            ) : null}

            {NAV_LINKS.map((link) =>
              link.children ? (
                <div key={link.label}>
                  <div className="text-xs font-semibold text-gray-500 py-2 uppercase tracking-wider">{link.label}</div>
                  {link.children.map((child) => (
                    <Link
                      key={child.label}
                      to={child.href}
                      onClick={() => setMenuOpen(false)}
                      className="block pl-3 py-1.5 text-sm text-gray-300 hover:text-primary border-l border-white/10 hover:border-primary/40 transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "block py-2 text-sm transition-colors",
                    location.pathname === link.href ? "text-primary font-semibold" : "text-gray-300 hover:text-primary"
                  )}
                >
                  {link.label}
                </Link>
              )
            )}

            {/* Mobile Language Picker */}
            <div className="pt-3 border-t border-white/10">
              <div className="text-xs font-semibold text-gray-500 pb-2 uppercase tracking-wider">{t.nav.language}</div>
              <div className="flex gap-2">
                {LANG_OPTIONS.map(l => (
                  <button
                    key={l.code}
                    onClick={() => setLanguage(l.code)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-medium border cursor-pointer transition-colors ${language === l.code ? "bg-primary/10 border-primary/40 text-primary" : "bg-white/5 border-white/10 text-gray-300"}`}
                  >
                    {l.flag} {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Guest Action Links in Mobile */}
            {!user && (
              <div className="flex gap-2 pt-3 border-t border-white/10">
                <Link to="/login" onClick={() => setMenuOpen(false)} className="flex-1">
                  <Button variant="ghost" className="w-full text-gray-300">{t.nav.login}</Button>
                </Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="flex-1">
                  <Button className="w-full bg-primary text-black font-semibold">{t.nav.register}</Button>
                </Link>
              </div>
            )}

          </div>
        )}
      </div>
    </header>
  );
}
