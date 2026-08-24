import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  TrendingUp, ShoppingCart, Users, MessageSquare, CloudSun, Wallet,
  ChevronRight, Star, Shield, CheckCircle, ArrowRight, Package, Leaf,
  CreditCard, Sprout
} from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import Navbar from "@/components/Navbar.tsx";
import Footer from "@/components/Footer.tsx";
import { useApp } from "@/context/AppContext.tsx";

const TESTIMONIALS = [
  { name: "Ramesh Yadav", location: "Patna, Bihar", text: "Krivexa has changed the way I farm. I now sell my crops at better prices and can book labour with just one tap.", stars: 5 },
  { name: "Suresh Patel", location: "Nalanda, Bihar", text: "The expert advice feature helped me save my entire paddy crop from blight disease. The admin responded within 2 hours!", stars: 5 },
  { name: "Anita Singh", location: "Bhagalpur, Bihar", text: "Mandi Bhav prices are very accurate. I sold my wheat at the highest price this season thanks to Krivexa.", stars: 5 },
];

export default function Index() {
  const { t, setIsKccAppModalOpen } = useApp();

  const SERVICES = [
    { icon: TrendingUp, label: t.services.mandiBhavTitle, desc: t.services.mandiBhavDesc, href: "/mandi-bhav" },
    { icon: ShoppingCart, label: t.services.buyInputsTitle, desc: t.services.buyInputsDesc, href: "/agri-market" },
    { icon: Package, label: t.services.sellCropsTitle, desc: t.services.sellCropsDesc, href: "/sell-crops" },
    { icon: Users, label: t.services.labourBookingTitle, desc: t.services.labourBookingDesc, href: "/labour-booking" },
    { icon: MessageSquare, label: t.services.expertAdviceTitle, desc: t.services.expertAdviceDesc, href: "/expert-advice" },
    { icon: CloudSun, label: t.services.weatherTitle, desc: t.services.weatherDesc, href: "/weather" },
    { icon: Wallet, label: t.services.walletTitle, desc: t.services.walletDesc, href: "/wallet" },
  ];

  const FEATURES = [
    { icon: TrendingUp, title: t.farmerNeeds.f1Title, desc: t.farmerNeeds.f1Desc, href: "/mandi-bhav", badge: t.farmerNeeds.f1Badge },
    { icon: ShoppingCart, title: t.farmerNeeds.f2Title, desc: t.farmerNeeds.f2Desc, href: "/agri-market", badge: t.farmerNeeds.f2Badge },
    { icon: Package, title: t.farmerNeeds.f3Title, desc: t.farmerNeeds.f3Desc, href: "/sell-crops", badge: t.farmerNeeds.f3Badge },
    { icon: Users, title: t.farmerNeeds.f4Title, desc: t.farmerNeeds.f4Desc, href: "/labour-booking", badge: t.farmerNeeds.f4Badge },
    { icon: MessageSquare, title: t.farmerNeeds.f5Title, desc: t.farmerNeeds.f5Desc, href: "/expert-advice", badge: t.farmerNeeds.f5Badge },
    { icon: CloudSun, title: t.farmerNeeds.f6Title, desc: t.farmerNeeds.f6Desc, href: "/weather", badge: t.farmerNeeds.f6Badge },
  ];

  const STATS = [
    { value: "50,000+", label: t.hero.farmersCount },
    { value: "500+", label: t.hero.mandisCount },
    { value: "1000+", label: t.hero.expertsCount },
    { value: "24/7", label: t.hero.supportCount },
  ];

  const TRUST_BADGES = [
    { icon: Shield, label: t.home.trustSecure, desc: t.home.trustSecureDesc },
    { icon: Users, label: t.home.trustPlatform, desc: t.home.trustPlatformDesc },
    { icon: CheckCircle, label: t.home.trustPrice, desc: t.home.trustPriceDesc },
    { icon: MessageSquare, label: t.home.trustSupport, desc: t.home.trustSupportDesc },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=90"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ opacity: 0.5 }}
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-1.5 mb-6">
                <Leaf className="h-4 w-4 text-primary" />
                <span className="text-primary text-sm font-medium">{t.hero.badge}</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black mb-6 leading-none tracking-tight" style={{ fontFamily: "Rajdhani, sans-serif" }}>
                <span className="text-white">{t.hero.title1}</span><br />
                <span className="text-primary">{t.hero.title2}</span><br />
                <span className="text-white">{t.hero.title3}</span><br />
                <span className="text-primary">{t.hero.title4}</span>
              </h1>
              <p className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed max-w-2xl">{t.hero.desc}</p>
              <div className="flex flex-wrap gap-4 mb-12">
                <Link to="/register">
                  <Button size="lg" className="bg-primary text-black font-bold text-base px-8 hover:bg-primary/90 rounded-full">
                    {t.hero.getStarted} <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  onClick={() => setIsKccAppModalOpen(true)}
                  className="bg-amber-500 hover:bg-amber-400 text-black font-bold text-base px-8 rounded-full border-0"
                >
                  <CreditCard className="mr-2 h-5 w-5" />
                  {t.hero.applyKcc}
                </Button>
              </div>
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

      {/* Our Services — icon grid */}
      <section className="py-16 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-black mb-2" style={{ fontFamily: "Rajdhani, sans-serif" }}>
              {t.services.title} <span className="text-primary">{t.services.titleHighlight}</span>
            </h2>
            <p className="text-gray-400 text-sm">{t.services.subtitle}</p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-3">
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
                  className="flex flex-col items-center gap-2 p-3 rounded-xl bg-[#111] border border-white/10 hover:border-primary/40 transition-all group cursor-pointer hover:bg-primary/5 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <s.icon className="h-6 w-6 text-primary" />
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

      {/* Everything a Farmer Needs — Simple, Mobile-Optimized Grid */}
      <section className="py-14 sm:py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-14">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-3.5 py-1 mb-3">
              <Sprout className="h-3.5 w-3.5 text-primary" />
              <span className="text-primary text-xs font-semibold tracking-wide">{t.farmerNeeds.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-2 sm:mb-3" style={{ fontFamily: "Rajdhani, sans-serif" }}>
              {t.farmerNeeds.title} <span className="text-primary">{t.farmerNeeds.titleHighlight}</span>
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm max-w-xl mx-auto">{t.farmerNeeds.subtitle}</p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={f.href}
                  className="flex flex-col h-full bg-[#121212] border border-white/10 hover:border-primary/50 hover:bg-primary/5 rounded-2xl p-4 sm:p-5 transition-all group cursor-pointer hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-colors">
                      <f.icon className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-semibold bg-primary/10 text-primary border border-primary/20 rounded-full px-2 py-0.5">
                      {f.badge}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-white mb-1 group-hover:text-primary transition-colors">
                    {f.title}
                  </h3>

                  <p className="text-xs text-gray-400 leading-relaxed flex-1">
                    {f.desc}
                  </p>

                  <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-primary opacity-90 group-hover:opacity-100">
                    {t.farmerNeeds.explore} <ChevronRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* KCC promo strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 rounded-2xl bg-linear-to-r from-amber-900/30 via-amber-800/20 to-amber-900/30 border border-amber-500/30 p-6 flex flex-col sm:flex-row items-center gap-4"
          >
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
              <CreditCard className="h-7 w-7 text-amber-400" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <p className="text-amber-300 font-bold text-lg">{t.home.kccPromoTitle}</p>
              <p className="text-amber-500/80 text-sm">{t.home.kccPromoDesc}</p>
            </div>
            <Button
              onClick={() => setIsKccAppModalOpen(true)}
              className="bg-amber-500 hover:bg-amber-400 text-black font-bold shrink-0"
            >
              {t.home.applyNow}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-black" style={{ fontFamily: "Rajdhani, sans-serif" }}>
              {t.home.trustedBy} <span className="text-primary">{t.home.trustedHighlight}</span>
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
                className="bg-[#111] border border-white/10 rounded-2xl p-6 hover:border-primary/20 transition-colors"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-5">"{t.text}"</p>
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

      {/* Join CTA */}
      <section className="py-24 bg-linear-to-b from-[#0d0d0d] to-[#0a0a0a]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ fontFamily: "Rajdhani, sans-serif" }}>
              {t.home.joinTitle} <span className="text-primary">{t.home.joinHighlight}</span>
            </h2>
            <p className="text-gray-400 mb-8 text-lg">{t.home.joinDesc}</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="bg-primary text-black font-bold px-10 text-base hover:bg-primary/90 rounded-full">
                  {t.home.registerNow} <ChevronRight className="ml-1 h-5 w-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="ghost"
                onClick={() => setIsKccAppModalOpen(true)}
                className="border border-amber-500/40 text-amber-400 hover:bg-amber-500/10 rounded-full px-8"
              >
                <CreditCard className="mr-2 h-5 w-5" /> {t.hero.applyKcc}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
