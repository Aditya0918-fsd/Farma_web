import { useState } from "react";
import { Wallet, Plus, ArrowUpRight, ArrowDownRight, ArrowRight, Shield, Eye, EyeOff, CreditCard, Clock, CheckCircle2, UserPlus, Search, ShoppingBag, Receipt, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
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
  const { t, user, kccApplicationStatus, kccDetails, hasAppliedKcc, dealerApplyFarmerKcc, checkFarmerCardBalance, chargeFarmerCard } = useApp();
  const [showBalance, setShowBalance] = useState(true);
  const [addAmount, setAddAmount] = useState("");

  // Dealer Feature 1: Apply KCC for Other Farmers state
  const [isDealerApplyModalOpen, setIsDealerApplyModalOpen] = useState(false);
  const [farmerForm, setFarmerForm] = useState({
    fullName: "",
    phone: "",
    aadhaar: "",
    address: "",
    district: "",
    landSize: "",
  });

  // Dealer Feature 2: POS Balance Check & Billing state
  const [isPosModalOpen, setIsPosModalOpen] = useState(false);
  const [searchCardNum, setSearchCardNum] = useState("");
  const [foundCardInfo, setFoundCardInfo] = useState<any>(null);
  const [billAmount, setBillAmount] = useState("");
  const [billItem, setBillItem] = useState("");

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

        {/* === DEALER SPECIAL WALLET ACTION BANNER === */}
        {user?.role === "dealer" && (
          <div className="mb-8 bg-linear-to-r from-[#142314] via-[#111] to-[#1a180f] border border-amber-500/30 rounded-2xl p-5 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
                <CreditCard className="h-6 w-6 text-amber-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-[10px]">DEALER SUITE</Badge>
                  <span className="text-xs text-gray-400">KCC Services & Billing POS</span>
                </div>
                <h3 className="text-lg font-bold text-white">Dealer KCC & Customer Payment Gateway</h3>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <Button
                onClick={() => setIsDealerApplyModalOpen(true)}
                className="flex-1 md:flex-none bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs py-2.5 px-4 rounded-xl"
              >
                <UserPlus className="h-4 w-4 mr-1.5" /> Apply KCC for Farmers
              </Button>
              <Button
                onClick={() => { setIsPosModalOpen(true); setFoundCardInfo(null); setSearchCardNum(""); }}
                className="flex-1 md:flex-none bg-primary hover:bg-primary/90 text-black font-bold text-xs py-2.5 px-4 rounded-xl shadow-lg shadow-primary/20"
              >
                <Receipt className="h-4 w-4 mr-1.5" /> Farmer KCC POS Billing
              </Button>
            </div>
          </div>
        )}

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

      {/* === MODAL 1: DEALER APPLY KCC FOR OTHER FARMERS === */}
      {isDealerApplyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#111] border border-amber-500/30 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-amber-500/10">
              <div className="flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-amber-400" />
                <h3 className="font-bold text-white text-base">Dealer Portal: Apply KCC for Farmer</h3>
              </div>
              <button onClick={() => setIsDealerApplyModalOpen(false)} className="text-gray-400 hover:text-white font-bold text-lg cursor-pointer">✕</button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!farmerForm.fullName || !farmerForm.phone || !farmerForm.aadhaar) {
                  toast.error("Please fill all required fields");
                  return;
                }
                dealerApplyFarmerKcc(farmerForm);
                toast.success(`Kishan Credit Card Application for ${farmerForm.fullName} submitted successfully!`);
                setIsDealerApplyModalOpen(false);
                setFarmerForm({ fullName: "", phone: "", aadhaar: "", address: "", district: "", landSize: "" });
              }}
              className="p-5 space-y-4"
            >
              <div>
                <Label className="text-xs text-gray-300">Farmer Full Name *</Label>
                <Input
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={farmerForm.fullName}
                  onChange={(e) => setFarmerForm({ ...farmerForm, fullName: e.target.value })}
                  className="mt-1 bg-white/5 border-white/10 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-gray-300">Farmer Phone Number *</Label>
                  <Input
                    required
                    type="tel"
                    placeholder="10-digit Mobile"
                    value={farmerForm.phone}
                    onChange={(e) => setFarmerForm({ ...farmerForm, phone: e.target.value })}
                    className="mt-1 bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-300">Aadhaar Card Number *</Label>
                  <Input
                    required
                    placeholder="12-digit Aadhaar"
                    value={farmerForm.aadhaar}
                    onChange={(e) => setFarmerForm({ ...farmerForm, aadhaar: e.target.value })}
                    className="mt-1 bg-white/5 border-white/10 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-gray-300">District / Village</Label>
                  <Input
                    placeholder="e.g. Patna / Danapur"
                    value={farmerForm.district}
                    onChange={(e) => setFarmerForm({ ...farmerForm, district: e.target.value })}
                    className="mt-1 bg-white/5 border-white/10 text-white"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-300">Land Size (Acres / Bigha)</Label>
                  <Input
                    placeholder="e.g. 3 Acres"
                    value={farmerForm.landSize}
                    onChange={(e) => setFarmerForm({ ...farmerForm, landSize: e.target.value })}
                    className="mt-1 bg-white/5 border-white/10 text-white"
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs text-gray-300">Full Address</Label>
                <Input
                  placeholder="Village, Post Office, Block"
                  value={farmerForm.address}
                  onChange={(e) => setFarmerForm({ ...farmerForm, address: e.target.value })}
                  className="mt-1 bg-white/5 border-white/10 text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <Button type="button" variant="ghost" onClick={() => setIsDealerApplyModalOpen(false)} className="text-xs text-gray-400">
                  Cancel
                </Button>
                <Button type="submit" className="bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs px-6">
                  Submit Application
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* === MODAL 2: DEALER POS - FARMER KCC BALANCE CHECK & CARD BILLING === */}
      {isPosModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#111] border border-primary/40 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-primary/10">
              <div className="flex items-center gap-2">
                <Receipt className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-white text-base">Dealer POS: Farmer KCC Card Billing</h3>
              </div>
              <button onClick={() => setIsPosModalOpen(false)} className="text-gray-400 hover:text-white font-bold text-lg cursor-pointer">✕</button>
            </div>

            <div className="p-5 space-y-5">
              {/* Step 1: Search Farmer Card */}
              <div>
                <Label className="text-xs text-gray-300 font-semibold mb-1 block">Enter Farmer's KCC Card Number</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="e.g. KCC-BH-2026-9041"
                    value={searchCardNum}
                    onChange={(e) => setSearchCardNum(e.target.value)}
                    className="bg-white/5 border-white/10 text-white font-mono text-xs"
                  />
                  <Button
                    onClick={() => {
                      if (!searchCardNum.trim()) {
                        toast.error("Please enter a valid card number");
                        return;
                      }
                      const res = checkFarmerCardBalance(searchCardNum);
                      if (res && res.exists) {
                        setFoundCardInfo(res);
                        toast.success(`Card verified! Holder: ${res.cardHolder}`);
                      } else {
                        setFoundCardInfo({ exists: false });
                        toast.error("Card number not found or inactive.");
                      }
                    }}
                    className="bg-primary text-black font-bold text-xs shrink-0"
                  >
                    <Search className="h-4 w-4 mr-1" /> Check Balance
                  </Button>
                </div>
                <div className="text-[10px] text-gray-500 mt-1">
                  Demo card numbers: <code className="text-primary">KCC-BH-2026-9041</code>, <code className="text-primary">KCC-BH-2026-1002</code>
                </div>
              </div>

              {/* Step 2: Show Verified Card Info */}
              {foundCardInfo && (
                <div>
                  {foundCardInfo.exists ? (
                    <div className="bg-linear-to-r from-primary/10 to-amber-500/10 border border-primary/30 rounded-xl p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-[10px] text-gray-400 uppercase font-bold">Card Holder</div>
                          <div className="text-base font-black text-white">{foundCardInfo.cardHolder}</div>
                        </div>
                        <Badge className="bg-primary/20 text-primary border-primary/30 text-[10px]">
                          ✅ Active Card
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-white/10">
                        <div>
                          <div className="text-[10px] text-gray-400 uppercase font-bold">Available KCC Credit Limit</div>
                          <div className="text-2xl font-black text-primary" style={{ fontFamily: "Rajdhani, sans-serif" }}>
                            ₹{foundCardInfo.balance?.toLocaleString()}.00
                          </div>
                        </div>
                        <ShoppingBag className="h-8 w-8 text-primary/40" />
                      </div>

                      {/* Billing Form */}
                      <div className="pt-3 border-t border-white/10 space-y-3">
                        <div className="text-xs font-bold text-white flex items-center gap-1.5">
                          <Receipt className="h-3.5 w-3.5 text-amber-400" /> Create Shop Bill & Debit Card
                        </div>
                        <div>
                          <Label className="text-[11px] text-gray-300">Product / Service Description</Label>
                          <Input
                            placeholder="e.g. 2 Bags NPK Fertilizer + Pesticides"
                            value={billItem}
                            onChange={(e) => setBillItem(e.target.value)}
                            className="mt-1 bg-white/5 border-white/10 text-white text-xs"
                          />
                        </div>
                        <div>
                          <Label className="text-[11px] text-gray-300">Bill Amount (₹)</Label>
                          <Input
                            type="number"
                            placeholder="e.g. 1450"
                            value={billAmount}
                            onChange={(e) => setBillAmount(e.target.value)}
                            className="mt-1 bg-white/5 border-white/10 text-xs font-bold text-primary"
                          />
                        </div>
                        <Button
                          onClick={() => {
                            const amt = parseFloat(billAmount);
                            if (!amt || amt <= 0) {
                              toast.error("Please enter a valid bill amount");
                              return;
                            }
                            if (!billItem.trim()) {
                              toast.error("Please enter product details");
                              return;
                            }
                            const res = chargeFarmerCard(searchCardNum, amt, billItem);
                            if (res.success) {
                              toast.success(res.message);
                              setFoundCardInfo({
                                ...foundCardInfo,
                                balance: res.remainingBalance
                              });
                              setBillAmount("");
                              setBillItem("");
                            } else {
                              toast.error(res.message);
                            }
                          }}
                          className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs py-2.5 rounded-xl shadow-lg"
                        >
                          Confirm & Debit ₹{billAmount || "0"} from Farmer's Card
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
                      <AlertCircle className="h-6 w-6 text-red-400 mx-auto mb-1" />
                      <div className="text-sm font-bold text-red-400">Card Not Found</div>
                      <div className="text-xs text-gray-400 mt-1">Please re-check card number with the farmer.</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
