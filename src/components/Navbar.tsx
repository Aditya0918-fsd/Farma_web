import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Globe, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { cn } from "@/lib/utils.ts";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "#",
    children: [
      { label: "Mandi Bhav", href: "/mandi-bhav" },
      { label: "Agri Market", href: "/agri-market" },
      { label: "Machinery Booking", href: "/machinery-booking" },
      { label: "Labour Booking", href: "/labour-booking" },
      { label: "Expert Advice", href: "/expert-advice" },
      { label: "Soil Testing", href: "/soil-testing" },
      { label: "Weather Update", href: "/weather" },
      { label: "Krivexa Wallet", href: "/wallet" },
    ],
  },
  { label: "Mandi Bhav", href: "/mandi-bhav" },
  { label: "Shop", href: "/agri-market" },
  {
    label: "Resources",
    href: "#",
    children: [
      { label: "Blog", href: "/blog" },
      { label: "Crop Calendar", href: "/crop-calendar" },
      { label: "Government Schemes", href: "/government-schemes" },
      { label: "Weather News", href: "/weather" },
      { label: "Farming Tips", href: "/farming-tips" },
      { label: "Help Center", href: "/help-center" },
    ],
  },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img
            src="/krivexa-logo.jpg"
            alt="KRIVEXA"
            className="h-10 w-10 object-cover rounded-xl border border-primary/40 shadow-sm"
          />
          <div className="leading-tight">
            <span className="text-white font-bold text-lg tracking-widest" style={{ fontFamily: "Rajdhani, sans-serif" }}>
              KRIV<span className="text-primary">E</span>XA
            </span>
            <div className="text-[9px] text-primary tracking-widest hidden sm:block">SMART FARMING. SMARTER FUTURE.</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) =>
            link.children ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className="flex items-center gap-1 px-3 py-2 text-sm text-gray-300 hover:text-primary transition-colors cursor-pointer">
                  {link.label} <ChevronDown className="h-3 w-3" />
                </button>
                {openDropdown === link.label && (
                  <div className="absolute top-full left-0 bg-[#141414] border border-white/10 rounded-lg py-2 min-w-50 shadow-xl z-50">
                    {link.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.href}
                        className="block px-4 py-2 text-sm text-gray-300 hover:text-primary hover:bg-white/5 transition-colors"
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
                  "px-3 py-2 text-sm transition-colors",
                  location.pathname === link.href
                    ? "text-primary"
                    : "text-gray-300 hover:text-primary"
                )}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <button className="flex items-center gap-1 text-sm text-gray-300 hover:text-primary px-2 cursor-pointer">
            <Globe className="h-4 w-4" /> English
          </button>
          <Link to="/login">
            <Button variant="ghost" size="sm" className="text-gray-300 hover:text-primary">
              <LogIn className="h-4 w-4 mr-1" /> Login
            </Button>
          </Link>
          <Link to="/register">
            <Button size="sm" className="bg-primary text-black font-semibold hover:bg-primary/90">
              Register
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-gray-300 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#0e0e0e] border-t border-white/10 px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
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
          <div className="flex gap-2 pt-3 border-t border-white/10">
            <Link to="/login" onClick={() => setMenuOpen(false)} className="flex-1">
              <Button variant="ghost" className="w-full text-gray-300">Login</Button>
            </Link>
            <Link to="/register" onClick={() => setMenuOpen(false)} className="flex-1">
              <Button className="w-full bg-primary text-black font-semibold">Register</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
