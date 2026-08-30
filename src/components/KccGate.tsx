import { useState } from "react";
import { CreditCard, X, AlertTriangle, CheckCircle2, Clock, Crown, Star, ArrowRight, Check, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { useApp } from "@/context/AppContext.tsx";
import { toast } from "sonner";
import FormPreviewModal from "@/components/FormPreviewModal.tsx";
import { generateFormPdf } from "@/lib/pdfGenerator.ts";

/** KCC blocked-action alert */
export function KccAlertModal() {
  const { isKccAlertOpen, setIsKccAlertOpen, setIsKccAppModalOpen, t } = useApp();
  if (!isKccAlertOpen) return null;

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsKccAlertOpen(false)} />
      <div className="relative bg-[#141414] border border-amber-500/40 rounded-2xl p-6 max-w-md w-full shadow-2xl shadow-amber-500/10 z-10">
        <button onClick={() => setIsKccAlertOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white cursor-pointer">
          <X className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
            <AlertTriangle className="h-6 w-6 text-amber-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{t.kccModal.alertTitle}</h3>
            <p className="text-xs text-amber-400 font-medium">{t.kccModal.restrictedBadge}</p>
          </div>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed mb-6">{t.kccModal.alertDesc}</p>
        <div className="flex gap-3">
          <Button
            className="flex-1 bg-amber-500 hover:bg-amber-400 text-black font-bold"
            onClick={() => { setIsKccAlertOpen(false); setIsKccAppModalOpen(true); }}
          >
            <CreditCard className="h-4 w-4 mr-2" />
            {t.kccModal.applyNow}
          </Button>
          <Button variant="ghost" className="border border-white/10 text-gray-300" onClick={() => setIsKccAlertOpen(false)}>
            {t.kccModal.cancel}
          </Button>
        </div>
      </div>
    </div>
  );
}

const KCC_TIERS = [
  {
    id: "nex" as const,
    name: "Krivexa Nex Card",
    price: 299,
    color: "border-blue-500/60 bg-blue-500/10",
    activeColor: "border-blue-400 bg-blue-500/20 shadow-blue-500/20",
    badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    icon: Star,
    iconColor: "text-blue-400",
    limit: "₹1,00,000",
    features: ["Annual membership at ₹299 only", "Credit limit up to ₹1,00,000", "Valid at all Krivexa partner stores", "Digital e-Card instantly issued"],
  },
  {
    id: "prime" as const,
    name: "Krivexa Prime Card",
    price: 999,
    color: "border-amber-500/60 bg-amber-500/10",
    activeColor: "border-amber-400 bg-amber-500/20 shadow-amber-500/20",
    badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    icon: Crown,
    iconColor: "text-amber-400",
    limit: "₹3,00,000",
    features: ["Premium membership at ₹999/year", "Credit limit up to ₹3,00,000", "Priority processing & approvals", "Physical gold-plated card issued"],
  },
];

type Step = "tier" | "pay" | "form" | "done";

/** Full KCC Application Form Modal */
export function KccApplicationModal() {
  const { isKccAppModalOpen, setIsKccAppModalOpen, submitKccApplication, addNotification, user, t } = useApp();

  const [step, setStep] = useState<Step>("tier");
  const [selectedTier, setSelectedTier] = useState<"nex" | "prime">("nex");
  const [upiId, setUpiId] = useState("");
  const [payOtp, setPayOtp] = useState("");
  const [generatedPayOtp, setGeneratedPayOtp] = useState("");
  const [payOtpSent, setPayOtpSent] = useState(false);
  const [payOtpVerified, setPayOtpVerified] = useState(false);
  const [payLoading, setPayLoading] = useState(false);

  const [form, setForm] = useState({ fullName: "", phone: "", aadhaar: "", address: "", district: "", landSize: "" });
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isKccAppModalOpen) return null;

  const tier = KCC_TIERS.find(t => t.id === selectedTier)!;

  const handleSendPayOtp = () => {
    if (!upiId.trim()) { toast.error("Please enter your UPI ID."); return; }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedPayOtp(otp);
    setPayOtpSent(true);
    toast.success(`Demo OTP sent: ${otp}`, { duration: 8000 });
  };

  const handleVerifyPayOtp = () => {
    setPayLoading(true);
    setTimeout(() => {
      if (payOtp.trim() === generatedPayOtp) {
        setPayOtpVerified(true);
        setPayLoading(false);
        toast.success(`₹${tier.price} subscription fee paid successfully!`);
        setTimeout(() => setStep("form"), 600);
      } else {
        toast.error("Incorrect OTP. Please try again.");
        setPayOtp("");
        setPayLoading(false);
      }
    }, 800);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.phone || !form.aadhaar || !form.district) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setShowPreview(true);
  };

  const handleConfirmSubmit = () => {
    setShowPreview(false);
    setLoading(true);
    setTimeout(() => {
      const refId = `KCC-${Math.floor(100000 + Math.random() * 900000)}`;
      const { dataUrl, fileName } = generateFormPdf({
        formTitle: `Kishan Credit Card Application (${tier.name})`,
        referenceId: refId,
        userName: form.fullName,
        userPhone: form.phone,
        userRole: user?.role === "farmer" ? "Farmer" : "Dealer",
        details: {
          "Applicant Full Name": form.fullName,
          "Contact Phone": form.phone,
          "Aadhaar UIDAI Number": form.aadhaar,
          "Land Ownership Size": form.landSize ? `${form.landSize} Acres` : "Not Specified",
          "District Zone": form.district,
          "Permanent Address": form.address || "Not Specified",
          "Card Type Selected": tier.name,
          "Subscription Amount Paid": `₹${tier.price}`,
          "Credit Limit": tier.limit,
        },
      });

      submitKccApplication({ ...form, cardTier: selectedTier, paymentStatus: "paid", paymentAmount: tier.price });

      addNotification(
        "KCC Application Logged 💳",
        `Your ${tier.name} application for ${form.fullName} is received (Ref: ${refId}). Subscription of ₹${tier.price} paid. Download PDF receipt.`,
        "success",
        "/dashboard",
        "kcc",
        dataUrl,
        fileName
      );

      setLoading(false);
      setStep("done");
      toast.success(t.kccModal.success);
    }, 1000);
  };

  const handleClose = () => {
    setIsKccAppModalOpen(false);
    setStep("tier");
    setSelectedTier("nex");
    setUpiId("");
    setPayOtp("");
    setGeneratedPayOtp("");
    setPayOtpSent(false);
    setPayOtpVerified(false);
    setForm({ fullName: "", phone: "", aadhaar: "", address: "", district: "", landSize: "" });
  };

  const STEP_LABELS = ["Choose Card", "Pay Fee", "Fill Form", "Done"];
  const STEP_INDEX: Record<Step, number> = { tier: 0, pay: 1, form: 2, done: 3 };

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative bg-[#141414] border border-primary/30 rounded-2xl max-w-xl w-full shadow-2xl shadow-primary/10 z-10 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#141414] border-b border-white/10 p-5 flex items-center justify-between rounded-t-2xl z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{t.kccModal.title}</h2>
              <p className="text-xs text-gray-400">{t.kccModal.subtitle}</p>
            </div>
          </div>
          <button onClick={handleClose} className="text-gray-500 hover:text-white cursor-pointer"><X className="h-5 w-5" /></button>
        </div>

        {/* Progress Steps */}
        <div className="px-5 pt-4 pb-2">
          <div className="flex items-center gap-1">
            {STEP_LABELS.map((label, i) => {
              const currentIdx = STEP_INDEX[step];
              const isActive = i === currentIdx;
              const isDone = i < currentIdx;
              return (
                <div key={label} className="flex items-center gap-1 flex-1">
                  <div className={`flex items-center gap-1.5 flex-1 ${i < STEP_LABELS.length - 1 ? "" : ""}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 border ${
                      isDone ? "bg-primary border-primary text-black" :
                      isActive ? "bg-primary/20 border-primary text-primary" :
                      "bg-white/5 border-white/20 text-gray-500"
                    }`}>
                      {isDone ? <Check className="h-3 w-3" /> : i + 1}
                    </div>
                    <span className={`text-[10px] font-medium hidden sm:block ${isActive ? "text-primary" : isDone ? "text-gray-300" : "text-gray-500"}`}>{label}</span>
                  </div>
                  {i < STEP_LABELS.length - 1 && (
                    <div className={`h-px flex-1 mx-1 ${isDone ? "bg-primary" : "bg-white/10"}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-5">
          {/* STEP 1: Choose Card Tier */}
          {step === "tier" && (
            <div className="space-y-4">
              <p className="text-sm text-gray-300">Select your Krivexa Credit Card plan to get started:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {KCC_TIERS.map(t => {
                  const Icon = t.icon;
                  const isSelected = selectedTier === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTier(t.id)}
                      className={`text-left rounded-2xl p-5 border-2 transition-all cursor-pointer shadow-lg ${isSelected ? t.activeColor : t.color} hover:scale-[1.02]`}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Icon className={`h-5 w-5 ${t.iconColor}`} />
                        <span className="font-bold text-white text-sm">{t.name}</span>
                        {isSelected && <Check className="h-4 w-4 text-white ml-auto" />}
                      </div>
                      <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black border mb-3 ${t.badge}`}>
                        ₹{t.price}/year
                      </div>
                      <div className="text-xs text-gray-300 font-semibold mb-2">Credit Limit: <span className="text-white font-black">{t.limit}</span></div>
                      <ul className="space-y-1">
                        {t.features.map((f, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-[11px] text-gray-400">
                            <Check className="h-3 w-3 text-primary shrink-0 mt-0.5" /> {f}
                          </li>
                        ))}
                      </ul>
                    </button>
                  );
                })}
              </div>
              <Button
                onClick={() => setStep("pay")}
                className="w-full bg-primary text-black font-bold py-5 text-base hover:bg-primary/90"
              >
                Continue with {tier.name} – ₹{tier.price} <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          )}

          {/* STEP 2: Pay Subscription Fee */}
          {step === "pay" && (
            <div className="space-y-5">
              <div className={`rounded-xl p-4 border ${tier.color}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-400">Paying for</div>
                    <div className="font-bold text-white">{tier.name}</div>
                    <div className="text-xs text-gray-400 mt-0.5">Annual Subscription Fee</div>
                  </div>
                  <div className={`text-2xl font-black ${tier.iconColor}`} style={{ fontFamily: "Rajdhani, sans-serif" }}>
                    ₹{tier.price}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-gray-300 text-sm mb-1.5 block font-semibold">Pay via UPI ID</Label>
                <div className="flex gap-2">
                  <Input
                    value={upiId}
                    onChange={e => setUpiId(e.target.value)}
                    placeholder="e.g. 9876543210@upi or name@okicici"
                    className="bg-white/5 border-white/10 text-white flex-1"
                    disabled={payOtpSent}
                  />
                  <Button
                    onClick={handleSendPayOtp}
                    disabled={payOtpSent}
                    className="bg-primary text-black font-bold px-4 shrink-0"
                  >
                    {payOtpSent ? <Check className="h-4 w-4" /> : "Send OTP"}
                  </Button>
                </div>

                {payOtpSent && !payOtpVerified && (
                  <div className="space-y-2 animate-in fade-in">
                    <Label className="text-gray-300 text-sm block">Enter 6-digit OTP sent to your UPI linked mobile</Label>
                    <div className="flex gap-2">
                      <Input
                        value={payOtp}
                        onChange={e => setPayOtp(e.target.value)}
                        placeholder="Enter OTP"
                        maxLength={6}
                        className="bg-white/5 border-white/10 text-white font-mono text-center tracking-widest"
                      />
                      <Button
                        onClick={handleVerifyPayOtp}
                        disabled={payLoading || !payOtp}
                        className="bg-primary text-black font-bold px-4 shrink-0"
                      >
                        {payLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : "Verify & Pay"}
                      </Button>
                    </div>
                    <p className="text-[10px] text-amber-400">Demo: OTP shown in top notification bar</p>
                  </div>
                )}

                {payOtpVerified && (
                  <div className="flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-xl p-3 animate-in fade-in">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <div className="text-sm font-bold text-primary">₹{tier.price} Payment Successful!</div>
                      <div className="text-xs text-gray-400">Proceeding to application form...</div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <Button variant="ghost" onClick={() => setStep("tier")} className="border border-white/10 text-gray-300 flex-1">
                  Back
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: Application Form */}
          {step === "form" && (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                <div className="text-xs text-gray-300">
                  Payment of <span className="text-primary font-bold">₹{tier.price}</span> confirmed for <span className="font-bold text-white">{tier.name}</span>. Now fill in your details.
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Label className="text-gray-300 text-sm mb-1.5 block">{t.kccModal.fullName} *</Label>
                  <Input value={form.fullName} onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))} placeholder="Your full name" className="bg-white/5 border-white/10 text-white" required />
                </div>
                <div>
                  <Label className="text-gray-300 text-sm mb-1.5 block">{t.kccModal.phone} *</Label>
                  <Input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="10-digit number" className="bg-white/5 border-white/10 text-white" required />
                </div>
                <div>
                  <Label className="text-gray-300 text-sm mb-1.5 block">{t.kccModal.aadhaar} *</Label>
                  <Input value={form.aadhaar} onChange={e => setForm(f => ({ ...f, aadhaar: e.target.value }))} placeholder="XXXX-XXXX-XXXX" className="bg-white/5 border-white/10 text-white" required />
                </div>
                <div>
                  <Label className="text-gray-300 text-sm mb-1.5 block">{t.kccModal.district} *</Label>
                  <Input value={form.district} onChange={e => setForm(f => ({ ...f, district: e.target.value }))} placeholder="Your district" className="bg-white/5 border-white/10 text-white" required />
                </div>
                <div>
                  <Label className="text-gray-300 text-sm mb-1.5 block">{t.kccModal.landSize}</Label>
                  <Input value={form.landSize} onChange={e => setForm(f => ({ ...f, landSize: e.target.value }))} placeholder="Acres" className="bg-white/5 border-white/10 text-white" />
                </div>
                <div className="sm:col-span-2">
                  <Label className="text-gray-300 text-sm mb-1.5 block">{t.kccModal.address}</Label>
                  <Input value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} placeholder="Village, Block, District" className="bg-white/5 border-white/10 text-white" />
                </div>
              </div>
              <Button type="submit" className="w-full bg-primary text-black font-bold py-5 text-base hover:bg-primary/90">
                <CreditCard className="h-5 w-5 mr-2" />{t.kccModal.submit}
              </Button>
            </form>
          )}

          {/* STEP 4: Done */}
          {step === "done" && (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{t.kccModal.submittedTitle}</h3>
              <p className="text-gray-400 text-sm mb-4">{t.kccModal.success}</p>
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 mb-6 text-xs text-gray-300">
                <span className="text-primary font-bold">{tier.name}</span> subscription of <span className="font-bold text-white">₹{tier.price}</span> paid. Your application is under review.
              </div>
              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-2 text-amber-400 text-sm">
                <Clock className="h-4 w-4" />{t.kccModal.statusPending}
              </div>
              <div className="mt-6">
                <Button onClick={handleClose} className="bg-primary text-black font-bold">{t.kccModal.close}</Button>
              </div>
            </div>
          )}
        </div>

        <FormPreviewModal
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          onConfirm={handleConfirmSubmit}
          title={`KCC Application Preview — ${tier.name}`}
          data={{
            "Card Plan": `${tier.name} (₹${tier.price}/year)`,
            "Credit Limit": tier.limit,
            "Full Name": form.fullName,
            "Contact Phone": form.phone,
            "Aadhaar Number": form.aadhaar,
            "District Location": form.district,
            "Land Ownership Size": form.landSize ? `${form.landSize} Acres` : "N/A",
            "Permanent Address": form.address || "N/A"
          }}
          loading={loading}
        />
      </div>
    </div>
  );
}
