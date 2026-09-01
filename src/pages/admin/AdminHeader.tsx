import { useState, useRef, useEffect } from "react";
import { Search, Bell, Shield, User, Globe, Menu, CheckCheck, Trash2, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { useApp } from "@/context/AppContext.tsx";

interface AdminHeaderProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeTabLabel: string;
  adminName?: string;
  adminRole?: string;
  onOpenSidebar?: () => void;
  onNavigateTab?: (tab: string) => void;
}

export default function AdminHeader({
  searchQuery,
  setSearchQuery,
  activeTabLabel,
  adminName = "Aditya Saha",
  adminRole = "Super Admin",
  onOpenSidebar,
  onNavigateTab,
}: AdminHeaderProps) {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead, clearAllNotifications } = useApp();
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close notification popover on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[#0e0e0e]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
      {/* Mobile Sidebar Toggle & View Title */}
      <div className="flex items-center gap-2.5">
        {onOpenSidebar && (
          <button
            type="button"
            onClick={onOpenSidebar}
            className="md:hidden text-gray-300 p-2 rounded-lg bg-white/5 border border-white/10 hover:text-emerald-400 cursor-pointer"
          >
            <Menu className="h-5 w-5 text-emerald-400" />
          </button>
        )}
        <h2 className="text-base sm:text-lg font-bold text-white tracking-wide truncate max-w-40 sm:max-w-none" style={{ fontFamily: "Rajdhani, sans-serif" }}>
          {activeTabLabel}
        </h2>
        <Badge className="hidden sm:inline-flex bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px]">
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

        {/* Notifications Interactive Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => setShowNotifMenu(!showNotifMenu)}
            className={`relative p-2 rounded-xl border transition-all cursor-pointer ${
              showNotifMenu
                ? "bg-emerald-500/15 border-emerald-500/50 text-emerald-400"
                : "bg-white/5 border-white/10 text-gray-300 hover:text-white hover:border-emerald-500/40"
            }`}
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-4.5 h-4.5 px-1 bg-emerald-500 text-black font-extrabold text-[10px] rounded-full flex items-center justify-center animate-bounce">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          {showNotifMenu && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#111] border border-white/15 rounded-2xl shadow-2xl z-50 overflow-hidden text-xs">
              {/* Dropdown Header */}
              <div className="p-3.5 border-b border-white/10 bg-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-emerald-400" />
                  <span className="font-bold text-white text-xs">System Notifications</span>
                  {unreadCount > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={() => markAllNotificationsAsRead()}
                      className="text-[11px] text-emerald-400 hover:underline flex items-center gap-1 font-medium cursor-pointer"
                      title="Mark all as read"
                    >
                      <CheckCheck className="h-3 w-3" /> Read all
                    </button>
                  )}
                  {notifications.length > 0 && (
                    <button
                      onClick={() => clearAllNotifications()}
                      className="text-[11px] text-gray-400 hover:text-red-400 flex items-center gap-1 cursor-pointer"
                      title="Clear notifications"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>

              {/* Notification List */}
              <div className="max-h-80 overflow-y-auto divide-y divide-white/5 custom-scrollbar">
                {notifications.length === 0 ? (
                  <div className="py-10 text-center text-gray-500">
                    <Bell className="h-8 w-8 mx-auto mb-2 opacity-20" />
                    <p className="font-medium text-xs">No notifications yet</p>
                    <p className="text-[10px] text-gray-600 mt-0.5">Live platform notifications will appear here.</p>
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationAsRead(n.id)}
                      className={`p-3.5 hover:bg-white/5 transition-colors cursor-pointer flex items-start gap-3 ${
                        !n.read ? "bg-emerald-500/5" : ""
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${!n.read ? "bg-emerald-400" : "bg-transparent"}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <p className={`font-semibold text-xs truncate ${!n.read ? "text-white" : "text-gray-300"}`}>
                            {n.title}
                          </p>
                          <span className="text-[10px] text-gray-500 shrink-0 font-mono">{n.time}</span>
                        </div>
                        <p className="text-gray-400 text-[11px] mt-0.5 line-clamp-2 leading-relaxed">
                          {n.message}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Dropdown Footer */}
              <div className="p-2.5 border-t border-white/10 bg-white/5 text-center">
                <button
                  onClick={() => {
                    setShowNotifMenu(false);
                    if (onNavigateTab) onNavigateTab("notifications_mgmt");
                  }}
                  className="w-full text-[11px] text-emerald-400 hover:text-emerald-300 font-bold py-1 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  Go to Notifications Management <ExternalLink className="h-3 w-3" />
                </button>
              </div>
            </div>
          )}
        </div>

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
