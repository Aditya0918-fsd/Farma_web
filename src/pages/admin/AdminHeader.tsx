import { Search, Bell, Shield, User, Globe } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";
import { Badge } from "@/components/ui/badge.tsx";

interface AdminHeaderProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeTabLabel: string;
  adminName?: string;
  adminRole?: string;
}

export default function AdminHeader({
  searchQuery,
  setSearchQuery,
  activeTabLabel,
  adminName = "Rahul Sharma",
  adminRole = "Super Admin"
}: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#0e0e0e]/90 backdrop-blur-md border-b border-white/10 px-6 h-16 flex items-center justify-between gap-4">
      {/* View Title & Breadcrumb */}
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-bold text-white tracking-wide" style={{ fontFamily: "Rajdhani, sans-serif" }}>
          {activeTabLabel}
        </h2>
        <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px]">
          Live System
        </Badge>
      </div>

      {/* Global Search Bar */}
      <div className="flex-1 max-w-md relative hidden md:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search here... (Farmers, Dealers, Orders, Products, Requests)"
          className="bg-white/5 border-white/10 text-white pl-9 pr-4 text-xs h-9 focus:border-emerald-500/50 rounded-xl"
        />
      </div>

      {/* Admin Controls */}
      <div className="flex items-center gap-4">
        {/* Status indicator */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <Globe className="h-3.5 w-3.5 text-gray-400" />
          <span>Bihar Region: Active</span>
        </div>

        {/* Notifications */}
        <button
          type="button"
          className="relative p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-emerald-500/40 transition-colors cursor-pointer"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-black font-extrabold text-[10px] rounded-full flex items-center justify-center">
            5
          </span>
        </button>

        {/* Admin Profile */}
        <div className="flex items-center gap-3 pl-3 border-l border-white/10">
          <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold">
            <User className="h-4 w-4" />
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-white leading-tight flex items-center gap-1">
              {adminName} <Shield className="h-3 w-3 text-emerald-400" />
            </p>
            <p className="text-[10px] text-gray-400">{adminRole}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
