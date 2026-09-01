import { useState, useRef } from "react";
import { Package, MapPin, Phone, IndianRupee, Image, Camera, Upload, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import Navbar from "@/components/Navbar.tsx";
import Footer from "@/components/Footer.tsx";
import { toast } from "sonner";
import { useApp } from "@/context/AppContext.tsx";
import FormPreviewModal from "@/components/FormPreviewModal.tsx";
import { generateFormPdf } from "@/lib/pdfGenerator.ts";

export default function SellCropsPage() {
  const { addCropListing, checkKccPermission, isKccIssued, setIsKccAppModalOpen, addNotification, user, t } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [showPreview, setShowPreview] = useState(false);
  const [form, setForm] = useState({
    sellerName: "",
    district: "",
    city: "",
    address: "",
    pincode: "",
    phone: "",
    cropName: "",
    weight: "",
    price: "",
  });

  const handleImageFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (ev) => setPreviewImage(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkKccPermission()) return;
    if (!form.sellerName || !form.phone || !form.cropName || !form.weight || !form.price || !form.district) {
      toast.error("Please fill in all required fields.");
      return;
    }
    // Open preview step
    setShowPreview(true);
  };

  const handleConfirmSubmit = () => {
    setShowPreview(false);
    setLoading(true);

    setTimeout(() => {
      const refId = `CRP-${Math.floor(100000 + Math.random() * 900000)}`;
      
      // Generate PDF
      const { dataUrl, fileName } = generateFormPdf({
        formTitle: "Sell Crops Listing Request",
        referenceId: refId,
        userName: form.sellerName,
        userPhone: form.phone,
        userRole: user?.role === "farmer" ? "Farmer" : "Dealer",
        details: {
          "Seller Name": form.sellerName,
          "Contact Phone": form.phone,
          "Crop Name": form.cropName,
          "Weight/Quantity": form.weight,
          "Target Price": `₹${form.price} / Qtl`,
          "District": form.district,
          "City/Village": form.city || "Not Specified",
          "Address details": form.address || "Not Specified",
          "Pincode": form.pincode || "Not Specified",
        },
      });

      addCropListing({
        sellerName: form.sellerName,
        district: form.district,
        city: form.city,
        address: form.address,
        pincode: form.pincode,
        phone: form.phone,
        cropName: form.cropName,
        weight: form.weight,
        price: parseFloat(form.price),
        image: previewImage || "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&q=80",
      });

      // Send to notifications with pdfDataUrl
      addNotification(
        "Crop Listing Submitted 🌾",
        `Your listing request for ${form.cropName} (${form.weight}) has been received (Ref: ${refId}). Download your official receipt PDF.`,
        "success",
        "/sell-crops",
        "crops",
        dataUrl,
        fileName
      );

      setLoading(false);
      setSubmitted(true);
      toast.success(t.sellCrops.submittedMsg);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      {/* Header */}
      <div className="relative h-44 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1200&q=80" alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a] flex items-end px-6 pb-6">
          <div className="max-w-7xl mx-auto w-full">
            <h1 className="text-4xl font-black" style={{ fontFamily: "Rajdhani, sans-serif" }}>
              {t.sellCrops.title}
            </h1>
            <p className="text-gray-400 text-sm mt-1">{t.sellCrops.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10">
        {submitted ? (
          <div className="bg-[#111] border border-primary/30 rounded-2xl p-10 text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-2xl font-black mb-3" style={{ fontFamily: "Rajdhani, sans-serif" }}>
              {t.sellCrops.submittedTitle}
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">{t.sellCrops.submittedMsg}</p>
            <div className="bg-white/5 rounded-xl p-4 text-left text-sm text-gray-300 mb-6 space-y-1">
              <p>📦 <strong>Crop:</strong> {form.cropName}</p>
              <p>⚖️ <strong>Weight:</strong> {form.weight}</p>
              <p>💰 <strong>Price:</strong> ₹{form.price}</p>
              <p>👨‍🌾 <strong>Seller:</strong> {form.sellerName}</p>
            </div>
            <p className="text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-lg px-4 py-2 inline-block">
              ⏳ {t.sellCrops.pendingNote}
            </p>
            <div className="mt-6">
              <Button onClick={() => { setSubmitted(false); setForm({ sellerName: "", district: "", city: "", address: "", pincode: "", phone: "", cropName: "", weight: "", price: "" }); setPreviewImage(""); }} className="bg-primary text-black font-bold">
                {t.sellCrops.submitAnother}
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-bold">{t.sellCrops.formHeader}</h2>
                <p className="text-xs text-gray-400">{t.sellCrops.formSubheader}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Seller Info */}
              <div>
                <Label className="text-gray-300 text-sm mb-1.5 block">{t.sellCrops.sellerName} *</Label>
                <Input value={form.sellerName} onChange={e => setForm(f => ({ ...f, sellerName: e.target.value }))} placeholder="Your full name" className="bg-white/5 border-white/10 text-white" required />
              </div>

              {/* Address Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300 text-sm mb-1.5 block">{t.sellCrops.district} *</Label>
                  <Input value={form.district} onChange={e => setForm(f => ({ ...f, district: e.target.value }))} placeholder="e.g. Patna" className="bg-white/5 border-white/10 text-white" required />
                </div>
                <div>
                  <Label className="text-gray-300 text-sm mb-1.5 block">{t.sellCrops.city}</Label>
                  <Input value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} placeholder="e.g. Danapur" className="bg-white/5 border-white/10 text-white" />
                </div>
              </div>

              <div>
                <Label className="text-gray-300 text-sm mb-1.5 block">{t.sellCrops.address}</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} placeholder="Village, Block, PO" className="pl-10 bg-white/5 border-white/10 text-white" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300 text-sm mb-1.5 block">{t.sellCrops.pincode}</Label>
                  <Input value={form.pincode} onChange={e => setForm(f => ({ ...f, pincode: e.target.value }))} placeholder="6-digit PIN" maxLength={6} className="bg-white/5 border-white/10 text-white" />
                </div>
                <div>
                  <Label className="text-gray-300 text-sm mb-1.5 block">{t.sellCrops.phone} *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="10-digit number" className="pl-10 bg-white/5 border-white/10 text-white" required />
                  </div>
                </div>
              </div>

              {/* Crop Details */}
              <div className="border-t border-white/10 pt-5">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-4 font-semibold">Crop Details</p>
                <div className="space-y-4">
                  <div>
                    <Label className="text-gray-300 text-sm mb-1.5 block">{t.sellCrops.cropName} *</Label>
                    <Input value={form.cropName} onChange={e => setForm(f => ({ ...f, cropName: e.target.value }))} placeholder="e.g. Sharbati Wheat, Basmati Paddy" className="bg-white/5 border-white/10 text-white" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-300 text-sm mb-1.5 block">{t.sellCrops.weight} *</Label>
                      <Input value={form.weight} onChange={e => setForm(f => ({ ...f, weight: e.target.value }))} placeholder="e.g. 50 Quintal" className="bg-white/5 border-white/10 text-white" required />
                    </div>
                    <div>
                      <Label className="text-gray-300 text-sm mb-1.5 block">{t.sellCrops.price} *</Label>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} type="number" placeholder="per quintal" className="pl-10 bg-white/5 border-white/10 text-white" required />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image Upload */}
              <div className="border-t border-white/10 pt-5">
                <Label className="text-gray-300 text-sm mb-3 block">{t.sellCrops.imageUpload}</Label>
                {previewImage ? (
                  <div className="relative rounded-xl overflow-hidden h-40 mb-3">
                    <img src={previewImage} alt="Crop preview" className="w-full h-full object-cover" />
                    <button type="button" onClick={() => setPreviewImage("")}
                      className="absolute top-2 right-2 bg-black/70 text-white rounded-full p-1 hover:bg-red-600 cursor-pointer text-xs">✕</button>
                  </div>
                ) : null}
                <div className="grid grid-cols-2 gap-3">
                  <button type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 bg-white/5 text-gray-300 hover:border-primary/40 hover:bg-primary/5 transition-colors cursor-pointer text-sm font-medium">
                    <Image className="h-4 w-4 text-primary" />
                    {t.sellCrops.gallery}
                  </button>
                  <button type="button"
                    onClick={() => cameraInputRef.current?.click()}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 bg-white/5 text-gray-300 hover:border-primary/40 hover:bg-primary/5 transition-colors cursor-pointer text-sm font-medium">
                    <Camera className="h-4 w-4 text-primary" />
                    {t.sellCrops.camera}
                  </button>
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && handleImageFile(e.target.files[0])} />
                <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={e => e.target.files?.[0] && handleImageFile(e.target.files[0])} />
              </div>

              <Button type="submit" disabled={loading} className="w-full bg-primary text-black font-bold py-5 text-base hover:bg-primary/90 rounded-xl">
                {loading ? <><Loader2 className="h-5 w-5 mr-2 animate-spin" /> Submitting...</> : <><Upload className="h-5 w-5 mr-2" />{t.sellCrops.submit}</>}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                Your listing will be sent to the admin for approval. After approval it will appear in Buy Inputs.
              </p>
            </form>
          </div>
        )}
      </div>

      <FormPreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        onConfirm={handleConfirmSubmit}
        title="Sell Crop Listing Preview"
        data={{
          "Seller Name": form.sellerName,
          "Contact Phone": form.phone,
          "Crop Name": form.cropName,
          "Estimated Weight": form.weight,
          "Expected Price": `₹${form.price} / Qtl`,
          "District Location": form.district,
          "City / Town": form.city || "N/A",
          "Postal Code": form.pincode || "N/A",
          "Full Address": form.address || "N/A"
        }}
        loading={loading}
      />

      <Footer />
    </div>
  );
}
