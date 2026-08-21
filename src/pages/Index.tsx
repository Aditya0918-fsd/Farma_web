import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  TrendingUp, ShoppingCart, Tractor, MessageSquare, CloudSun, FlaskConical, Wallet,
  ChevronRight, Star, Users, Shield, CheckCircle, ArrowRight, Package, Leaf
} from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import Navbar from "@/components/Navbar.tsx";
import Footer from "@/components/Footer.tsx";

const SERVICES = [
  { icon: TrendingUp, label: "Mandi Bhav", desc: "Live Market Rates", href: "/mandi-bhav" },
  { icon: ShoppingCart, label: "Buy Inputs", desc: "Seeds, Fertilizer, Pesticides", href: "/agri-market" },
  { icon: Package, label: "Sell Crops", desc: "Best Price Marketplace", href: "/agri-market" },
  { icon: Tractor, label: "Machinery Booking", desc: "Tractors & Implements", href: "/machinery-booking" },
  { icon: Users, label: "Labour Booking", desc: "Skilled Labour", href: "/labour-booking" },
  { icon: MessageSquare, label: "Expert Advice", desc: "Talk to Experts", href: "/expert-advice" },
  { icon: FlaskConical, label: "Soil Testing", desc: "Test Soil Health", href: "/soil-testing" },
  { icon: CloudSun, label: "Weather Update", desc: "Live Forecast", href: "/weather" },
  { icon: Wallet, label: "Kisan Wallet", desc: "Secure Payments", href: "/wallet" },
];

const FEATURES = [
  { icon: TrendingUp, title: "Mandi Bhav", desc: "Get real-time mandi prices from all major markets across India." },
  { icon: Tractor, title: "Machinery Booking", desc: "Book tractors, rotavators, harvesters and more at your fingertips." },
  { icon: MessageSquare, title: "Expert Advice", desc: "Get solutions to your crop problems directly from agricultural experts." },
  { icon: FlaskConical, title: "Soil Testing", desc: "Know your soil health and get personalized fertilizer advice." },
  { icon: CloudSun, title: "Weather Update", desc: "Get accurate weather forecasts to plan your farming activities better." },
  { icon: Wallet, title: "Krivexa Wallet", desc: "Secure digital wallet for all your farming payments and transactions." },
];

const TESTIMONIALS = [
  { name: "Ramesh Yadav", location: "Kanpur, UP", text: "Krivexa has changed the way I farm. I get better prices for my crops and can book machinery easily.", stars: 5 },
  { name: "Suresh Patel", location: "Bhopal, MP", text: "The expert advice feature helped me save my entire soybean crop from disease. Excellent platform!", stars: 5 },
  { name: "Anita Singh", location: "Lucknow, UP", text: "Mandi Bhav is very accurate. I sold my wheat at the highest price this season thanks to Krivexa.", stars: 5 },
];

const STATS = [
  { value: "50,000+", label: "Farmers" },
  { value: "500+", label: "Mandis" },
  { value: "1000+", label: "Experts" },
  { value: "24/7", label: "Support" },
];

const TRUST_BADGES = [
  { icon: Shield, label: "100% Secure", desc: "Your data is always protected" },
  { icon: Users, label: "Trusted Platform", desc: "Join thousands of farmers" },
  { icon: CheckCircle, label: "Best Price Guarantee", desc: "Get the best market price" },
  { icon: MessageSquare, label: "24×7 Support", desc: "We are always here to help you" },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background image — much more visible, warm sunset farm */}
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=90"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ opacity: 0.55 }}
        />
        {/* Only a left-side gradient so text remains readable */}
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-1.5 mb-6">
                <Leaf className="h-4 w-4 text-primary" />
                <span className="text-primary text-sm font-medium">Smart Farming Platform for India</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black mb-6 leading-none tracking-tight" style={{ fontFamily: "Rajdhani, sans-serif" }}>
                <span className="text-white">SMART</span><br />
                <span className="text-primary">FARMING.</span><br />
                <span className="text-white">SMARTER</span><br />
                <span className="text-primary">FUTURE.</span>
              </h1>
              <p className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed max-w-2xl">
                Krivexa brings every farming solution to your fingertips — live mandi rates, machinery booking, expert advice, soil testing, and much more.
              </p>
              <div className="flex flex-wrap gap-4 mb-12">
                <Link to="/register">
                  <Button size="lg" className="bg-primary text-black font-bold text-base px-8 hover:bg-primary/90 rounded-full">
                    Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/mandi-bhav">
                  <Button size="lg" variant="ghost" className="border border-white/20 text-white hover:bg-white/10 text-base px-8 rounded-full">
                    View Mandi Bhav &gt;
                  </Button>
                </Link>
              </div>
              {/* Inline stats */}
              <div className="flex flex-wrap gap-8">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-black text-primary" style={{ fontFamily: "Rajdhani, sans-serif" }}>{s.value}</div>
                    <div className="text-xs text-gray-400">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Services grid */}
      <section className="py-16 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-black mb-2" style={{ fontFamily: "Rajdhani, sans-serif" }}>
              Our <span className="text-primary">Services</span>
            </h2>
            <p className="text-gray-400 text-sm">All farming solutions in one platform</p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3">
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={s.href}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl bg-[#111] border border-white/10 hover:border-primary/40 transition-colors group cursor-pointer"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <s.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-bold text-white leading-tight mb-0.5">{s.label}</div>
                    <div className="text-[10px] text-gray-500 leading-tight">{s.desc}</div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Everything a Farmer Needs — KEEP from existing project */}
      <section className="py-20 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-black mb-3" style={{ fontFamily: "Rajdhani, sans-serif" }}>
              Everything a Farmer <span className="text-primary">Needs</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">One platform for all your farming needs — from market prices to expert guidance.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-[#111] border border-white/10 rounded-2xl p-6 hover:border-primary/40 transition-colors group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Image Cards */}
      <section className="py-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative rounded-xl overflow-hidden h-52 group cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=600&q=80"
                alt="Machinery"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <h3 className="text-base font-bold mb-1">Book Machinery Instantly</h3>
                <p className="text-gray-300 text-xs mb-3">Tractors, Rotavators, Harvesters and more at your fingertips.</p>
                <Link to="/machinery-booking">
                  <Button size="sm" className="bg-primary text-black font-semibold text-xs h-8 px-4 rounded-md">Book Now</Button>
                </Link>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden h-52 group cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80"
                alt="Soil Testing"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <h3 className="text-base font-bold mb-1">Soil Testing for Better Yield</h3>
                <p className="text-gray-300 text-xs mb-3">Know your soil health and get personalized fertilizer advice.</p>
                <Link to="/soil-testing">
                  <Button size="sm" className="bg-primary text-black font-semibold text-xs h-8 px-4 rounded-md">Book Soil Test</Button>
                </Link>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden h-52 group cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=600&q=80"
                alt="Expert Advice"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <h3 className="text-base font-bold mb-1">Talk to Expert</h3>
                <p className="text-gray-300 text-xs mb-3">Get solution for your crop problems from experts.</p>
                <Link to="/expert-advice">
                  <Button size="sm" className="bg-primary text-black font-semibold text-xs h-8 px-4 rounded-md">Chat Now</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by Farmers — KEEP from existing project */}
      <section className="py-20 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-black" style={{ fontFamily: "Rajdhani, sans-serif" }}>
              Trusted by <span className="text-primary">Farmers</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#111] border border-white/10 rounded-2xl p-6"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-5">{'"'}{t.text}{'"'}</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.location}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-10 border-t border-white/10 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {TRUST_BADGES.map((b) => (
              <div key={b.label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <b.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-semibold">{b.label}</div>
                  <div className="text-xs text-gray-500">{b.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Krivexa Today CTA */}
      <section className="py-24 bg-linear-to-b from-[#0d0d0d] to-[#0a0a0a]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ fontFamily: "Rajdhani, sans-serif" }}>
              Join <span className="text-primary">Krivexa</span> Today
            </h2>
            <p className="text-gray-400 mb-8 text-lg">Register for free and start your smart farming journey.</p>
            <Link to="/register">
              <Button size="lg" className="bg-primary text-black font-bold px-10 text-base hover:bg-primary/90 rounded-full">
                Register Now <ChevronRight className="ml-1 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
