import { CreditCard, Lock } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { useApp } from "@/context/AppContext.tsx";

export default function KccRequiredBanner() {
  const { isKccIssued, isAdminLoggedIn, setIsKccAppModalOpen, user } = useApp();

  if (!user || isKccIssued || isAdminLoggedIn) {
    return null;
  }

  return (
    <div className="bg-linear-to-r from-amber-950/90 via-amber-900/60 to-black border-b border-amber-500/40 px-4 py-3 text-amber-200 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-xs sm:text-sm">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 text-amber-400">
            <Lock className="h-4 w-4" />
          </div>
          <div>
            <span className="font-bold text-amber-300">⚠️ KCC Card Verification Required: </span>
            <span className="text-gray-300">
              {user?.role === "dealer"
                ? "Platform buying, crop selling & bookings are locked until KCC application is verified (Customer Service & Listings remain accessible)."
                : "Buying crops/inputs, selling harvest, labour & machinery bookings are locked until you apply and get verified for a Kisan Credit Card (KCC)."}
            </span>
          </div>
        </div>
        <Button
          onClick={() => setIsKccAppModalOpen(true)}
          size="sm"
          className="bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs py-1.5 px-4 shrink-0 rounded-xl cursor-pointer shadow-md"
        >
          <CreditCard className="h-3.5 w-3.5 mr-1.5" /> Apply for KCC Card →
        </Button>
      </div>
    </div>
  );
}
