import { useState } from "react";
import { Wallet, Plus, ArrowUpRight, ArrowDownRight, ArrowRight, Shield, Eye, EyeOff, CreditCard, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import Navbar from "@/components/Navbar.tsx";
import Footer from "@/components/Footer.tsx";
import { toast } from "sonner";
import { useApp } from "@/context/AppContext.tsx";

const TRANSACTIONS = [
  { title: "Pesticides Purchase", type: "debit", amount: 850, date: "12 May 2024", category: "Purchase", id: "#TXN001" },
  { title: "Crop Sale - Wheat", type: "credit", amount: 12500, date: "10 May 2024", category: "Sale", id: "#TXN002" },
  { title: "Tractor Booking", type: "debit", amount: 2400, date: "9 May 2024", category: "Booking", id: "#TXN003" },
  { title: "Wallet Top-up", type: "credit", amount: 5000, date: "8 May 2024", category: "Top-up", id: "#TXN004" },
  { title: "Expert Consultation", type: "debit", amount: 200, date: "7 May 2024", category: "Service", id: "#TXN005" },
  { title: "Soil Test Booking", type: "debit", amount: 599, date: "5 May 2024", category: "Service", id: "#TXN006" },
  { title: "Seeds Purchase", type: "debit", amount: 1350, date: "3 May 2024", category: "Purchase", id: "#TXN007" },
  { title: "Crop Sale - Paddy", type: "credit", amount: 8200, date: "1 May 2024", category: "Sale", id: "#TXN008" },
];

export default function WalletPage() {
  const { t, user, kccApplicationStatus, kccDetails, hasAppliedKcc, setIsKccAppModalOpen } = useApp();
  const [showBalance, setShowBalance] = useState(true);
  const [addAmount, setAddAmount] = useState("");

  const balance = 4250;
  const totalIn = TRANSACTIONS.filter((t) => t.type === "credit").reduce((s, t) => s + t.amount, 0);
  const totalOut = TRANSACTIONS.filter((t) => t.type === "debit").reduce((s, t) => s + t.amount, 0);

  // KCC card number logic
  const isKccApproved = kccApplicationStatus === "approved";
  const kccCardNumber = isKccApproved && kccDetails?.cardNumber
    ? kccDetails.cardNumber
    : null;
  const kccHolderName = kccDetails?.fullName || user?.name || "KRIVEXA KISAN";
  const kccIssueDate = kccDetails?.issueDate || null;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <div className="relative h-36 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=80" alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a] flex items-center px-6">
          <div className="max-w-7xl mx-auto w-full">
            <h1 className="text-3xl font-black" style={{ fontFamily: "Rajdhani, sans-serif" }}>
              <span className="text-primary">{t.wallet.title.split(" ")[0]}</span> {t.wallet.title.split(" ").slice(1).join(" ")}
            </h1>
            <p className="text-gray-400 text-sm">{t.wallet.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* === WALLET BALANCE & TRANSACTIONS === */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Wallet Card / KCC Card */}
          <div className="space-y-4">
            {/* Real KCC Card in Wallet Box */}
            <div className="relative w-full overflow-hidden rounded-2xl border border-amber-500/30 shadow-2xl bg-[#111]">
              <img
                src="/KCC.png"
                alt="Kishan Credit Card"
                className="w-full h-auto object-cover"
              />

              {/* Wallet Balance Overlay (Top Right) */}
              <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-md border border-primary/40 rounded-xl px-3 py-1.5 flex items-center gap-2">
                <div>
                  <div className="text-[10px] text-gray-400 font-bold uppercase">Balance</div>
                  <div className="text-sm sm:text-base font-black text-primary" style={{ fontFamily: "Rajdhani, sans-serif" }}>
                    {showBalance ? `₹${balance.toLocaleString()}.00` : "₹ ****"}
                  </div>
                </div>
                <button onClick={() => setShowBalance(!showBalance)} className="text-gray-400 hover:text-primary cursor-pointer ml-1">
                  {showBalance ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                </button>
              </div>

              {/* Overlay: Card Number in Blank Space */}
              <div className="absolute left-[5.5%] top-[56%] w-[88%] flex items-center">
                <div
                  className="text-[#f5d77f] font-black tracking-[0.14em] leading-none drop-shadow-md truncate"
                  style={{
                    fontFamily: "Rajdhani, monospace",
                    fontSize: "clamp(0.65rem, 2.2vw, 1rem)",
                    textShadow: "0 2px 8px rgba(0,0,0,0.9)",
                  }}
                >
                  {hasAppliedKcc
                    ? (isKccApproved ? kccCardNumber : "Will be generated after verification")
                    : "Apply KCC to Generate Card"}
                </div>
              </div>

              {/* Overlay: Holder Name */}
              {hasAppliedKcc && (
                <div className="absolute left-[5.5%] top-[72%] w-[88%] flex items-center">
                  <div
                    className="text-[#f5d77f] font-black uppercase tracking-[0.12em] leading-none drop-shadow-md truncate"
                    style={{
                      fontFamily: "Rajdhani, sans-serif",
                      fontSize: "clamp(0.55rem, 1.8vw, 0.8rem)",
                      textShadow: "0 2px 6px rgba(0,0,0,0.9)",
                    }}
                  >
                    {kccHolderName}
                  </div>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 text-center">
                <ArrowUpRight className="h-5 w-5 text-primary mx-auto mb-1" />
                <div className="text-lg font-black text-primary" style={{ fontFamily: "Rajdhani, sans-serif" }}>₹{totalIn.toLocaleString()}</div>
                <div className="text-xs text-gray-400">{t.wallet.totalIn}</div>
              </div>
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
                <ArrowDownRight className="h-5 w-5 text-red-400 mx-auto mb-1" />
                <div className="text-lg font-black text-red-400" style={{ fontFamily: "Rajdhani, sans-serif" }}>₹{totalOut.toLocaleString()}</div>
                <div className="text-xs text-gray-400">{t.wallet.totalOut}</div>
              </div>
            </div>

            {/* Add Money */}
            <div className="bg-[#111] border border-white/10 rounded-2xl p-5">
              <h3 className="font-semibold mb-3">{t.wallet.addMoney}</h3>
              <div className="flex gap-2 mb-3 flex-wrap">
                {[500, 1000, 2000, 5000].map((amt) => (
                  <button key={amt} onClick={() => setAddAmount(String(amt))} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${addAmount === String(amt) ? "bg-primary text-black" : "bg-white/5 border border-white/10 text-gray-300"}`}>
                    ₹{amt}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder={t.wallet.enterAmount}
                  value={addAmount}
                  onChange={(e) => setAddAmount(e.target.value)}
                  className="bg-white/5 border-white/10 text-white"
                />
                <Button onClick={() => { if (addAmount) { toast.success(`₹${addAmount} added to wallet!`); setAddAmount(""); } }} className="bg-primary text-black font-semibold shrink-0">
                  <Plus className="h-4 w-4 mr-1" /> {t.wallet.add}
                </Button>
              </div>
            </div>
          </div>

          {/* Transactions */}
          <div className="lg:col-span-2 bg-[#111] border border-white/10 rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <h3 className="font-bold">{t.wallet.txHistory}</h3>
              <button className="text-xs text-primary hover:underline flex items-center gap-1 cursor-pointer">
                {t.wallet.viewAll} <ArrowRight className="h-3 w-3" />
              </button>
            </div>
            <div className="divide-y divide-white/5">
              {TRANSACTIONS.map((t) => (
                <div key={t.id} className="flex items-center gap-3 px-4 py-3 hover:bg-white/3 transition-colors">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${t.type === "credit" ? "bg-primary/20" : "bg-red-500/20"}`}>
                    {t.type === "credit" ? <ArrowUpRight className="h-4 w-4 text-primary" /> : <ArrowDownRight className="h-4 w-4 text-red-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold">{t.title}</div>
                    <div className="text-xs text-gray-500">{t.date} • {t.id}</div>
                  </div>
                  <Badge className={`text-[10px] ${t.type === "credit" ? "bg-primary/20 text-primary border-primary/30" : "bg-red-500/20 text-red-400 border-red-500/30"}`}>
                    {t.category}
                  </Badge>
                  <div className={`text-sm font-bold shrink-0 ${t.type === "credit" ? "text-primary" : "text-red-400"}`}>
                    {t.type === "credit" ? "+" : "-"}₹{t.amount.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
