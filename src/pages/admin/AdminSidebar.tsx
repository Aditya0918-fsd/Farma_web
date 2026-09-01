import React from "react";
import {
  LayoutDashboard,
  Users,
  Store,
  BadgeCheck,
  MessageSquareText,
  Package,
  ShoppingCart,
  CreditCard,
  Banknote,
  AlertTriangle,
  Megaphone,
  BarChart3,
  ShieldCheck,
  UserCheck,
  ClipboardList,
  Settings,
  LogOut,
  ChevronRight,
  ExternalLink,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";

export type AdminTab =
  | "dashboard"
  | "farmers"
  | "farmer_profile"
  | "dealers"
  | "dealer_profile"
  | "verifications"
  | "requests"
  | "request_details"
  | "products"
  | "orders"
  | "order_details"
  | "payments"
  | "payouts"
  | "complaints"
  | "announcements"
  | "reports"
  | "roles"
  | "admin_users"
  | "audit_logs"
  | "settings";

interface AdminSidebarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  pendingVerificationsCount: number;
  pendingRequestsCount: number;
  onLogout: () => void;
  sidebarOpen?: boolean;
  setSidebarOpen?: (open: boolean) => void;
}

export default function AdminSidebar({
  activeTab,
  setActiveTab,
  pendingVerificationsCount,
  pendingRequestsCount,
  onLogout,
  sidebarOpen = false,
  setSidebarOpen
}: AdminSidebarProps) {
  const MENU_GROUPS: {
    groupTitle: string;
    items: {
      id: AdminTab;
      label: string;
      icon: React.ComponentType<{ className?: string }>;
      badge?: number;
    }[];
  }[] = [
    {
      groupTitle: "Core Management",
      items: [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
        { id: "farmers", label: "Farmers Management", icon: Users },
        { id: "dealers", label: "Dealers Management", icon: Store },
        { id: "verifications", label: "Verifications", icon: BadgeCheck, badge: pendingVerificationsCount }
      ]
    },
    {
      groupTitle: "Business & Orders",
      items: [
        { id: "requests", label: "Requests / Forms", icon: MessageSquareText, badge: pendingRequestsCount },
        { id: "products", label: "Products Management", icon: Package },
        { id: "orders", label: "Orders Management", icon: ShoppingCart },
        { id: "payments", label: "Payments & Txns", icon: CreditCard },
        { id: "payouts", label: "Payouts & Commissions", icon: Banknote }
      ]
    },
    {
      groupTitle: "Support & Content",
      items: [
        { id: "complaints", label: "Complaints & Disputes", icon: AlertTriangle },
        { id: "announcements", label: "Announcements", icon: Megaphone },
        { id: "reports", label: "Reports & Analytics", icon: BarChart3 }
      ]
    },
    {
      groupTitle: "System Administration",
      items: [
        { id: "roles", label: "Roles & Permissions", icon: ShieldCheck },
        { id: "admin_users", label: "Admin Users", icon: UserCheck },
        { id: "audit_logs", label: "Audit Logs", icon: ClipboardList },
        { id: "settings", label: "Settings", icon: Settings }
      ]
    }
  ];

  const isTabActive = (tabId: AdminTab) => {
    if (activeTab === tabId) return true;
    if (tabId === "farmers" && activeTab === "farmer_profile") return true;
    if (tabId === "dealers" && activeTab === "dealer_profile") return true;
    if (tabId === "requests" && activeTab === "request_details") return true;
    if (tabId === "orders" && activeTab === "order_details") return true;
    return false;
  };

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-xs md:hidden"
          onClick={() => setSidebarOpen?.(false)}
        />
      )}

      <aside
        className={`w-64 bg-[#0d0d0d] border-r border-white/10 flex flex-col h-screen fixed md:sticky top-0 left-0 z-50 shrink-0 select-none overflow-y-auto custom-scrollbar transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Brand Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-900/30">
              <span className="text-xl">🌿</span>
            </div>
            <div>
              <h1 className="text-lg font-black tracking-wider text-white" style={{ fontFamily: "Rajdhani, sans-serif" }}>
                KRIV<span className="text-emerald-400">E</span>XA
              </h1>
              <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">
                Admin Panel
              </p>
            </div>
          </div>
          {setSidebarOpen && (
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-gray-400 hover:text-white p-1 rounded-lg bg-white/5 border border-white/10 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

      {/* Navigation Menu */}
      <div className="flex-1 p-3 space-y-6">
        {MENU_GROUPS.map((group) => (
          <div key={group.groupTitle} className="space-y-1">
            <div className="px-3 text-[11px] font-extrabold uppercase tracking-wider text-gray-500 mb-2">
              {group.groupTitle}
            </div>
            {group.items.map((item) => {
              const active = isTabActive(item.id);
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen?.(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-all duration-150 ${
                    active
                      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-4 w-4 ${active ? "text-emerald-400" : "text-gray-400"}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && item.badge > 0 ? (
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500 text-black">
                      {item.badge}
                    </span>
                  ) : active ? (
                    <ChevronRight className="h-3.5 w-3.5 text-emerald-400" />
                  ) : null}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer Controls */}
      <div className="p-3 border-t border-white/10 space-y-2 bg-[#090909]">
        <Link to="/" target="_blank">
          <Button
            variant="ghost"
            className="w-full justify-start text-xs text-gray-400 hover:text-white hover:bg-white/5 border border-white/5 h-9"
          >
            <ExternalLink className="h-3.5 w-3.5 mr-2 text-emerald-400" />
            Open Public Website
          </Button>
        </Link>
        <Button
          onClick={onLogout}
          variant="ghost"
          className="w-full justify-start text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/20 h-9 font-bold"
        >
          <LogOut className="h-3.5 w-3.5 mr-2" />
          Logout Admin
        </Button>
      </div>
    </aside>
  </>
);
}
