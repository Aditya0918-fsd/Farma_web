import { useState } from "react";
import {
  Headphones, Search, Plus, Eye, MessageSquare, CheckCircle,
  Clock, XCircle, AlertTriangle, Filter, ChevronDown, ChevronUp
} from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { toast } from "sonner";

interface SupportTicket {
  id: string;
  ticketNumber: string;
  user: string;
  userRole: "Farmer" | "Dealer";
  subject: string;
  category: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  status: "open" | "in_progress" | "resolved" | "closed";
  createdAt: string;
  lastUpdated: string;
  messages: number;
}

export default function SupportTicketsView() {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newForm, setNewForm] = useState({ user: "", subject: "", category: "General", priority: "Medium", message: "" });

  const stats = [
    { label: "Total Tickets", value: tickets.length, icon: Headphones, color: "emerald" },
    { label: "Open Tickets", value: tickets.filter(t => t.status === "open").length, icon: AlertTriangle, color: "amber" },
    { label: "In Progress", value: tickets.filter(t => t.status === "in_progress").length, icon: Clock, color: "blue" },
    { label: "Resolved", value: tickets.filter(t => t.status === "resolved" || t.status === "closed").length, icon: CheckCircle, color: "purple" },
  ];

  const filteredTickets = tickets.filter((t) => {
    const matchSearch = t.ticketNumber.toLowerCase().includes(search.toLowerCase()) ||
      t.user.toLowerCase().includes(search.toLowerCase()) ||
      t.subject.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || t.status === statusFilter;
    const matchPriority = priorityFilter === "all" || t.priority.toLowerCase() === priorityFilter;
    return matchSearch && matchStatus && matchPriority;
  });

  const statusColor: Record<string, string> = {
    open: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    in_progress: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    resolved: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    closed: "bg-gray-500/10 text-gray-400 border-gray-500/20",
  };

  const priorityColor: Record<string, string> = {
    Low: "bg-gray-500/10 text-gray-400 border-gray-500/20",
    Medium: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    High: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    Critical: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newForm.user || !newForm.subject || !newForm.message) {
      toast.error("Please fill all required fields.");
      return;
    }
    const ticket: SupportTicket = {
      id: `ticket-${Date.now()}`,
      ticketNumber: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
      user: newForm.user,
      userRole: "Farmer",
      subject: newForm.subject,
      category: newForm.category,
      priority: newForm.priority as SupportTicket["priority"],
      status: "open",
      createdAt: new Date().toLocaleDateString("en-IN"),
      lastUpdated: new Date().toLocaleDateString("en-IN"),
      messages: 1,
    };
    setTickets(prev => [ticket, ...prev]);
    setShowCreateModal(false);
    setNewForm({ user: "", subject: "", category: "General", priority: "Medium", message: "" });
    toast.success("Support ticket created.");
  };

  const handleChangeStatus = (id: string, status: SupportTicket["status"]) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status, lastUpdated: new Date().toLocaleDateString("en-IN") } : t));
    toast.success(`Ticket status updated to ${status.replace("_", " ")}.`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#111] border border-white/10 rounded-2xl p-5 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Headphones className="h-5 w-5 text-emerald-400" /> Support Tickets
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Manage all user support requests and resolve tickets efficiently.
          </p>
        </div>
        <Button onClick={() => setShowCreateModal(true)} className="bg-emerald-500 text-black font-bold text-xs h-9">
          <Plus className="h-3.5 w-3.5 mr-1.5" /> New Ticket
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          const colorMap: Record<string, string> = {
            emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
            amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
            blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
            purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
          };
          return (
            <div key={s.label} className={`bg-[#111] border rounded-2xl p-4 shadow-lg ${colorMap[s.color]}`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-gray-400">{s.label}</span>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${colorMap[s.color]}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className="text-2xl font-black" style={{ fontFamily: "Rajdhani, sans-serif" }}>{s.value}</div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-[#111] border border-white/10 rounded-2xl p-4 flex flex-wrap gap-3 items-center">
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="bg-[#1a1a1a] border border-white/10 text-white text-xs rounded-xl px-3 py-2 outline-none"
        >
          <option value="all">All Status</option>
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>
        <select
          value={priorityFilter}
          onChange={e => setPriorityFilter(e.target.value)}
          className="bg-[#1a1a1a] border border-white/10 text-white text-xs rounded-xl px-3 py-2 outline-none"
        >
          <option value="all">All Priorities</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search ticket number, user, subject..."
            className="bg-white/5 border-white/10 text-white text-xs pl-9 h-9 rounded-xl"
          />
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10 text-gray-400 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Ticket #</th>
                <th className="py-3.5 px-4">User</th>
                <th className="py-3.5 px-4">Subject</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Priority</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Created</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredTickets.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-16 text-gray-500">
                    <Headphones className="h-12 w-12 mx-auto mb-3 opacity-20" />
                    <p className="font-semibold text-sm">No support tickets yet</p>
                    <p className="text-[11px] mt-1 text-gray-600">Support tickets from farmers and dealers will appear here.</p>
                  </td>
                </tr>
              ) : (
                filteredTickets.map((t) => (
                  <tr key={t.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">{t.ticketNumber}</td>
                    <td className="py-3.5 px-4">
                      <div>
                        <p className="font-bold text-white">{t.user}</p>
                        <p className="text-gray-500 text-[10px]">{t.userRole}</p>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-gray-200 max-w-50 truncate">{t.subject}</td>
                    <td className="py-3.5 px-4 text-gray-400">{t.category}</td>
                    <td className="py-3.5 px-4">
                      <Badge className={priorityColor[t.priority]}>{t.priority}</Badge>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge className={statusColor[t.status]}>{t.status.replace("_", " ")}</Badge>
                    </td>
                    <td className="py-3.5 px-4 text-gray-400 font-mono">{t.createdAt}</td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      {t.status !== "resolved" && t.status !== "closed" && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleChangeStatus(t.id, "resolved")}
                          className="text-xs text-emerald-400 hover:text-emerald-300 border border-emerald-500/20 h-7 px-2"
                        >
                          <CheckCircle className="h-3 w-3 mr-1" /> Resolve
                        </Button>
                      )}
                      {t.status !== "closed" && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleChangeStatus(t.id, "closed")}
                          className="text-xs text-gray-400 hover:text-white border border-white/10 h-7 px-2"
                        >
                          <XCircle className="h-3 w-3" />
                        </Button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Ticket Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <h3 className="text-sm font-bold text-white border-b border-white/10 pb-3">Create Support Ticket</h3>
            <form onSubmit={handleCreateTicket} className="space-y-3 text-xs">
              <div>
                <label className="text-gray-400 font-semibold mb-1 block">User Name *</label>
                <Input
                  value={newForm.user}
                  onChange={(e) => setNewForm({ ...newForm, user: e.target.value })}
                  placeholder="Farmer/Dealer name"
                  className="bg-white/5 border-white/10 text-white text-xs h-9"
                  required
                />
              </div>
              <div>
                <label className="text-gray-400 font-semibold mb-1 block">Subject *</label>
                <Input
                  value={newForm.subject}
                  onChange={(e) => setNewForm({ ...newForm, subject: e.target.value })}
                  placeholder="Brief description of issue"
                  className="bg-white/5 border-white/10 text-white text-xs h-9"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-gray-400 font-semibold mb-1 block">Category</label>
                  <select
                    value={newForm.category}
                    onChange={(e) => setNewForm({ ...newForm, category: e.target.value })}
                    className="w-full bg-[#1a1a1a] border border-white/10 text-white text-xs rounded-xl px-3 py-2 outline-none"
                  >
                    <option>General</option>
                    <option>Payment Issue</option>
                    <option>Account Issue</option>
                    <option>Order Issue</option>
                    <option>Technical</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-400 font-semibold mb-1 block">Priority</label>
                  <select
                    value={newForm.priority}
                    onChange={(e) => setNewForm({ ...newForm, priority: e.target.value })}
                    className="w-full bg-[#1a1a1a] border border-white/10 text-white text-xs rounded-xl px-3 py-2 outline-none"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Critical</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-gray-400 font-semibold mb-1 block">Message *</label>
                <textarea
                  value={newForm.message}
                  onChange={(e) => setNewForm({ ...newForm, message: e.target.value })}
                  placeholder="Describe the issue..."
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 text-white text-xs rounded-xl px-3 py-2 outline-none resize-none"
                  required
                />
              </div>
              <div className="flex gap-2 pt-2">
                <Button type="button" variant="ghost" onClick={() => setShowCreateModal(false)} className="flex-1 text-xs border border-white/10">Cancel</Button>
                <Button type="submit" className="flex-1 bg-emerald-500 text-black font-bold text-xs">Create Ticket</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
