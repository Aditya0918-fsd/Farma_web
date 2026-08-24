import { useState } from "react";
import { CreditCard, X, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { useApp } from "@/context/AppContext.tsx";
import { toast } from "sonner";

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

/** Full KCC Application Form Modal */
export function KccApplicationModal() {
  const { isKccAppModalOpen, setIsKccAppModalOpen, submitKccApplication, t } = useApp();
  const [form, setForm] = useState({ fullName: "", phone: "", aadhaar: "", address: "", district: "", landSize: "" });
  const [submitted, setSubmitted] = useState(false);

  if (!isKccAppModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.phone || !form.aadhaar || !form.district) {
      toast.error("Please fill in all required fields.");
      return;
    }
    submitKccApplication(form);
    setSubmitted(true);
    toast.success(t.kccModal.success);
  };

  const handleClose = () => {
    setIsKccAppModalOpen(false);
    setSubmitted(false);
    setForm({ fullName: "", phone: "", aadhaar: "", address: "", district: "", landSize: "" });
  };

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative bg-[#141414] border border-primary/30 rounded-2xl max-w-lg w-full shadow-2xl shadow-primary/10 z-10 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-[#141414] border-b border-white/10 p-5 flex items-center justify-between rounded-t-2xl">
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

        <div className="p-5">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{t.kccModal.submittedTitle}</h3>
              <p className="text-gray-400 text-sm mb-6">{t.kccModal.success}</p>
              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-2 text-amber-400 text-sm">
                <Clock className="h-4 w-4" />{t.kccModal.statusPending}
              </div>
              <div className="mt-6">
                <Button onClick={handleClose} className="bg-primary text-black font-bold">{t.kccModal.close}</Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
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
        </div>
      </div>
    </div>
  );
}
