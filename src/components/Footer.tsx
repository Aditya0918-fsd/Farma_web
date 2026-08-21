import { Link } from "react-router-dom";
import { Phone, Mail, Globe, MapPin } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#080808] border-t border-white/10 text-sm">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <img
                src="/krivexa-logo.jpg"
                alt="KRIVEXA"
                className="h-8 w-8 object-cover rounded-lg border border-primary/40"
              />
              <span className="text-white font-bold text-base tracking-widest" style={{ fontFamily: "Rajdhani, sans-serif" }}>
                KRIV<span className="text-primary">E</span>XA
              </span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed mb-4">
              Krivexa is a complete digital platform for farmers. Empowering agriculture with technology.
            </p>
            <div className="flex gap-3">
              {["f", "ig", "yt", "tw", "in"].map((s) => (
                <a key={s} href="#" className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-black transition-colors text-xs font-bold">
                  {s === "f" ? "f" : s === "ig" ? "in" : s === "yt" ? "yt" : s === "tw" ? "tw" : "li"}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              {[
                { label: "Home", href: "/" },
                { label: "Mandi Bhav", href: "/mandi-bhav" },
                { label: "Buy Inputs", href: "/agri-market" },
                { label: "Sell Crops", href: "/agri-market" },
                { label: "Machinery Booking", href: "/machinery-booking" },
                { label: "Labour Booking", href: "/labour-booking" },
                { label: "Expert Advice", href: "/expert-advice" },
              ].map((item) => (
                <li key={item.label}><Link to={item.href} className="hover:text-primary transition-colors">{item.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-3">Services</h4>
            <ul className="space-y-2 text-gray-400">
              {[
                { label: "Mandi Bhav", href: "/mandi-bhav" },
                { label: "Buy Inputs", href: "/agri-market" },
                { label: "Sell Crops", href: "/agri-market" },
                { label: "Machinery Booking", href: "/machinery-booking" },
                { label: "Soil Testing", href: "/soil-testing" },
                { label: "Weather Update", href: "/weather" },
                { label: "Kisan Wallet", href: "/wallet" },
              ].map((item) => (
                <li key={item.label}><Link to={item.href} className="hover:text-primary transition-colors">{item.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-3">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              {[
                { label: "Blog", href: "/blog" },
                { label: "Crop Calendar", href: "/crop-calendar" },
                { label: "Government Schemes", href: "/government-schemes" },
                { label: "Weather News", href: "/weather" },
                { label: "Farming Tips", href: "/farming-tips" },
                { label: "Help Center", href: "/help-center" },
              ].map((item) => (
                <li key={item.label}><Link to={item.href} className="hover:text-primary transition-colors">{item.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-3">Contact Us</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2"><Phone className="h-3 w-3 text-primary" /> +91 87087 42170</li>
              <li className="flex items-center gap-2"><Mail className="h-3 w-3 text-primary" /> support@krivexa.com</li>
              <li className="flex items-center gap-2"><Globe className="h-3 w-3 text-primary" /> www.krivexa.com</li>
              <li className="flex items-start gap-2"><MapPin className="h-3 w-3 text-primary mt-0.5 shrink-0" /> Kanpur, Uttar Pradesh, India</li>
            </ul>
            <div className="mt-4">
              <p className="text-gray-500 text-xs mb-2">Download App</p>
              <div className="flex flex-col gap-2">
                <a href="#" className="bg-black border border-white/20 rounded-lg px-3 py-1.5 text-xs text-white hover:border-primary transition-colors">
                  Google Play
                </a>
                <a href="#" className="bg-black border border-white/20 rounded-lg px-3 py-1.5 text-xs text-white hover:border-primary transition-colors">
                  App Store
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto">
        <p className="text-gray-500 text-xs">© {year} Krivexa. All Rights Reserved.</p>
        <div className="flex gap-4 text-xs text-gray-500">
          <a href="#" className="hover:text-primary">Privacy Policy</a>
          <a href="#" className="hover:text-primary">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  );
}
