import { useState } from "react";
import { Bell, Send, Trash2, CheckCircle, AlertCircle, Info, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { toast } from "sonner";
import { useApp } from "@/context/AppContext.tsx";

export default function NotificationsManagementView() {
  const { notifications, addNotification, markNotificationAsRead, markAllNotificationsAsRead, deleteNotification, clearAllNotifications } = useApp();
  const [activeTab, setActiveTab] = useState<"send" | "history">("send");
  const [form, setForm] = useState({
    title: "",
    message: "",
    audience: "all",
    type: "info",
  });
  const [sending, setSending] = useState(false);
  const [search, setSearch] = useState("");

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.message.trim()) {
      toast.error("Please fill in title and message.");
      return;
    }
    setSending(true);
    try {
      addNotification(
        form.title.trim(),
        form.message.trim(),
        form.type as "info" | "success" | "warning",
        undefined,
        "account"
      );
      toast.success("Broadcast notification sent successfully!");
      setForm({ title: "", message: "", audience: "all", type: "info" });
      setActiveTab("history");
    } catch (err) {
      toast.error("Failed to send notification.");
    } finally {
      setSending(false);
    }
  };

  const totalSent = notifications.length;
  const unreadCount = notifications.filter((n) => !n.read).length;
  const readCount = notifications.filter((n) => n.read).length;

  const STAT_CARDS = [
    { label: "Total Notifications", value: totalSent, icon: Bell, color: "emerald" },
    { label: "Unread", value: unreadCount, icon: AlertCircle, color: "amber" },
    { label: "Read", value: readCount, icon: CheckCircle, color: "blue" },
  ];

  const filteredHistory = notifications.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#111] border border-white/10 rounded-2xl p-5 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Bell className="h-5 w-5 text-emerald-400" /> Notifications Management
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Send real-time system notifications to farmers, dealers, or all platform users.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {STAT_CARDS.map((card) => {
          const Icon = card.icon;
          const colorMap: Record<string, string> = {
            emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
            amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
            blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
          };
          return (
            <div key={card.label} className={`bg-[#111] border rounded-2xl p-4 shadow-lg ${colorMap[card.color]}`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-gray-400">{card.label}</span>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${colorMap[card.color]}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-white" style={{ fontFamily: "Rajdhani, sans-serif" }}>
                {card.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="bg-[#111] border border-white/10 rounded-2xl p-2 flex gap-2">
        {[
          { id: "send" as const, label: "Send Notification", icon: Send },
          { id: "history" as const, label: `History (${totalSent})`, icon: Bell },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className="h-3.5 w-3.5" /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* Send Form */}
      {activeTab === "send" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#111] border border-white/10 rounded-2xl p-6 shadow-xl">
            <h3 className="font-bold text-sm text-white mb-4 flex items-center gap-2">
              <Send className="h-4 w-4 text-emerald-400" /> Send Broadcast Notification
            </h3>
            <form onSubmit={handleSend} className="space-y-4 text-xs">
              <div>
                <label className="text-gray-400 font-semibold mb-1 block">Target Audience</label>
                <select
                  value={form.audience}
                  onChange={(e) => setForm({ ...form, audience: e.target.value })}
                  className="w-full bg-[#1a1a1a] border border-white/10 text-white text-xs rounded-xl px-3 py-2.5 outline-none"
                >
                  <option value="all">All Users (Farmers & Dealers)</option>
                  <option value="farmers">Farmers Only</option>
                  <option value="dealers">Dealers Only</option>
                </select>
              </div>
              <div>
                <label className="text-gray-400 font-semibold mb-1 block">Notification Type</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full bg-[#1a1a1a] border border-white/10 text-white text-xs rounded-xl px-3 py-2.5 outline-none"
                >
                  <option value="info">Info / General</option>
                  <option value="success">Success / Announcement</option>
                  <option value="warning">Warning / Alert</option>
                </select>
              </div>
              <div>
                <label className="text-gray-400 font-semibold mb-1 block">Title *</label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Subsidy Update for Kharif Crops"
                  className="bg-white/5 border-white/10 text-white text-xs h-9"
                  required
                />
              </div>
              <div>
                <label className="text-gray-400 font-semibold mb-1 block">Message *</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Write notification content here..."
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 text-white text-xs rounded-xl px-3 py-2 outline-none resize-none"
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={sending}
                className="w-full bg-emerald-500 text-black font-bold text-xs"
              >
                {sending ? (
                  <span className="flex items-center gap-2"><div className="w-3 h-3 border border-black border-t-transparent rounded-full animate-spin" /> Sending...</span>
                ) : (
                  <><Send className="h-3.5 w-3.5 mr-1.5" /> Broadcast Now</>
                )}
              </Button>
            </form>
          </div>

          {/* Preview */}
          <div className="bg-[#111] border border-white/10 rounded-2xl p-6 shadow-xl">
            <h3 className="font-bold text-sm text-white mb-4 flex items-center gap-2">
              <Info className="h-4 w-4 text-blue-400" /> Live Preview
            </h3>
            <div className={`border rounded-2xl p-4 transition-all ${
              form.type === "success" ? "border-emerald-500/30 bg-emerald-500/5" :
              form.type === "warning" ? "border-amber-500/30 bg-amber-500/5" :
              "border-blue-500/30 bg-blue-500/5"
            }`}>
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  form.type === "success" ? "bg-emerald-500/20 text-emerald-400" :
                  form.type === "warning" ? "bg-amber-500/20 text-amber-400" :
                  "bg-blue-500/20 text-blue-400"
                }`}>
                  <Bell className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-bold text-white text-xs">{form.title || "Notification Title"}</p>
                  <p className="text-gray-400 text-[11px] mt-0.5 leading-relaxed">{form.message || "Your broadcast content will appear here..."}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className="text-[10px] bg-white/10 text-gray-400">
                      {form.audience === "all" ? "All Users" : form.audience === "farmers" ? "Farmers Only" : "Dealers Only"}
                    </Badge>
                    <span className="text-[10px] text-gray-500">Just now</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* History Tab */}
      {activeTab === "history" && (
        <div className="bg-[#111] border border-white/10 rounded-2xl p-5 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
            <h3 className="font-bold text-sm text-white">Live Notification Records</h3>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search history..."
                className="bg-white/5 border-white/10 text-white text-xs h-9 rounded-xl w-full sm:w-48"
              />
              {notifications.length > 0 && (
                <Button
                  onClick={() => clearAllNotifications()}
                  variant="outline"
                  className="text-xs border-red-500/30 text-red-400 hover:bg-red-500/10 h-9 shrink-0"
                >
                  <Trash2 className="h-3.5 w-3.5 mr-1" /> Clear All
                </Button>
              )}
            </div>
          </div>

          {filteredHistory.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <Bell className="h-12 w-12 mx-auto mb-3 opacity-20" />
              <p className="font-semibold text-sm">No notifications sent yet</p>
              <p className="text-[11px] mt-1 text-gray-600">Send your first notification using the "Send Notification" tab above.</p>
            </div>
          ) : (
            <div className="divide-y divide-white/5 border border-white/10 rounded-xl overflow-hidden">
              {filteredHistory.map((n) => (
                <div key={n.id} className="p-4 bg-white/5 hover:bg-white/10 transition-colors flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Bell className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-white text-xs">{n.title}</p>
                        <Badge className={`text-[9px] ${n.read ? "bg-gray-500/20 text-gray-400" : "bg-emerald-500/20 text-emerald-400"}`}>
                          {n.read ? "Read" : "Unread"}
                        </Badge>
                      </div>
                      <p className="text-gray-400 text-[11px] mt-1">{n.message}</p>
                      <span className="text-[10px] text-gray-500 mt-1 block font-mono">{n.time}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    {!n.read && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => markNotificationAsRead(n.id)}
                        className="text-[11px] text-emerald-400 hover:text-emerald-300 h-7 px-2"
                      >
                        <CheckCheck className="h-3 w-3 mr-1" /> Read
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteNotification(n.id)}
                      className="text-xs text-gray-400 hover:text-red-400 h-7 px-2"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
