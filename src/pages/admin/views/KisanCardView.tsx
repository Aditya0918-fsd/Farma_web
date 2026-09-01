import { useState } from "react";
import { CreditCard, Search, CheckCircle, XCircle, Clock, Plus, Eye } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { useApp } from "@/context/AppContext.tsx";
import { toast } from "sonner";

export default function KisanCardView() {
  const { kccApplications, approveKccApplication, rejectKccApplication } = useApp();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedApp, setSelectedApp] = useState<any>(null);

  const filtered = kccApplications.filter((app) => {
    const matchSearch =
      app.fullName.toLowerCase().includes(search.toLowerCase()) ||
      app.phone.includes(search) ||
      app.aadhaar?.includes(search);
    const matchStatus = statusFilter === "all" || app.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const total = kccApplications.length;
  const pending = kccApplications.filter((a) => a.status === "pending").length;
  const approved = kccApplications.filter((a) => a.status === "approved").length;
  const rejected = kccApplications.filter((a) => a.status === "rejected").length;

  const handleApprove = (id: string) => {
    approveKccApplication(id);
    toast.success("KCC Application approved! Card number generated.");
    setSelectedApp(null);
  };

  const handleReject = (id: string) => {
    rejectKccApplication(id);
    toast.error("KCC Application rejected.");
    setSelectedApp(null);
  };

  const statusStyle: Record<string, string> = {
    pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    approved: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    rejected: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-linear-to-r from-emerald-900/30 to-[#111] border border-emerald-500/20 rounded-2xl p-5 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-emerald-400" /> Krivexa Kisan Card Management
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Review, approve or reject KCC applications. Manage all issued cards.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Applications", value: total, color: "emerald" },
          { label: "Pending Review", value: pending, color: "amber" },
          { label: "Cards Approved", value: approved, color: "blue" },
          { label: "Rejected", value: rejected, color: "red" },
        ].map((s) => {
          const colorMap: Record<string, string> = {
            emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
            amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
            blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
            red: "bg-red-500/10 text-red-400 border-red-500/20",
          };
          return (
            <div key={s.label} className={`bg-[#111] border rounded-2xl p-4 shadow-lg ${colorMap[s.color]}`}>
              <p className="text-xs text-gray-400 font-bold">{s.label}</p>
              <p className="text-2xl font-black mt-2" style={{ fontFamily: "Rajdhani, sans-serif" }}>{s.value}</p>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-[#111] border border-white/10 rounded-2xl p-4 flex flex-wrap gap-3 items-center">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-[#1a1a1a] border border-white/10 text-white text-xs rounded-xl px-3 py-2 outline-none"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
        <div className="relative flex-1 min-w-52">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, phone, Aadhaar..."
            className="bg-white/5 border-white/10 text-white text-xs pl-9 h-9 rounded-xl"
          />
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10 text-gray-400 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Applicant</th>
                <th className="py-3.5 px-4">Phone</th>
                <th className="py-3.5 px-4">District</th>
                <th className="py-3.5 px-4">Land Size</th>
                <th className="py-3.5 px-4">Card Number</th>
                <th className="py-3.5 px-4">Applied On</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-16 text-gray-500">
                    <CreditCard className="h-12 w-12 mx-auto mb-3 opacity-20" />
                    <p className="font-semibold text-sm">No KCC applications yet</p>
                    <p className="text-[11px] mt-1 text-gray-600">
                      Kisan Credit Card applications from farmers will appear here.
                    </p>
                  </td>
                </tr>
              ) : (
                filtered.map((app) => (
                  <tr key={app.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-white">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                          {app.fullName.charAt(0)}
                        </div>
                        {app.fullName}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-gray-300">{app.phone}</td>
                    <td className="py-3.5 px-4 text-gray-300">{app.district || "—"}</td>
                    <td className="py-3.5 px-4 text-gray-300">{app.landSize || "—"}</td>
                    <td className="py-3.5 px-4 font-mono text-emerald-400">{app.cardNumber || "—"}</td>
                    <td className="py-3.5 px-4 text-gray-400 font-mono">
                      {app.createdAt ? new Date(app.createdAt).toLocaleDateString("en-IN") : "—"}
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge className={statusStyle[app.status]}>{app.status}</Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setSelectedApp(app)}
                        className="text-xs text-blue-400 border border-blue-500/20 h-7 px-2"
                      >
                        <Eye className="h-3 w-3 mr-1" /> View
                      </Button>
                      {app.status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleApprove(app.id)}
                            className="text-xs text-emerald-400 border border-emerald-500/20 h-7 px-2"
                          >
                            <CheckCircle className="h-3 w-3 mr-1" /> Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleReject(app.id)}
                            className="text-xs text-red-400 border border-red-500/20 h-7 px-2"
                          >
                            <XCircle className="h-3 w-3" />
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white">KCC Application Details</h3>
              <button onClick={() => setSelectedApp(null)} className="text-gray-400 hover:text-white">✕</button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              {[
                { label: "Full Name", value: selectedApp.fullName },
                { label: "Phone", value: selectedApp.phone },
                { label: "Aadhaar", value: selectedApp.aadhaar },
                { label: "District", value: selectedApp.district },
                { label: "Land Size", value: selectedApp.landSize },
                { label: "Status", value: selectedApp.status },
                { label: "Applied On", value: selectedApp.createdAt ? new Date(selectedApp.createdAt).toLocaleDateString("en-IN") : "—" },
                { label: "Card Number", value: selectedApp.cardNumber || "Not issued yet" },
              ].map((f) => (
                <div key={f.label} className="bg-white/5 rounded-xl p-3">
                  <p className="text-gray-500 text-[10px] mb-0.5">{f.label}</p>
                  <p className="font-semibold text-white">{f.value || "—"}</p>
                </div>
              ))}
            </div>
            {selectedApp.address && (
              <div className="bg-white/5 rounded-xl p-3 text-xs">
                <p className="text-gray-500 text-[10px] mb-0.5">Address</p>
                <p className="font-semibold text-white">{selectedApp.address}</p>
              </div>
            )}
            {selectedApp.status === "pending" && (
              <div className="flex gap-3 pt-2">
                <Button
                  className="flex-1 bg-emerald-500 text-black font-bold text-xs"
                  onClick={() => handleApprove(selectedApp.id)}
                >
                  <CheckCircle className="h-3.5 w-3.5 mr-1.5" /> Approve Application
                </Button>
                <Button
                  variant="ghost"
                  className="flex-1 border border-red-500/30 text-red-400 font-bold text-xs"
                  onClick={() => handleReject(selectedApp.id)}
                >
                  <XCircle className="h-3.5 w-3.5 mr-1.5" /> Reject
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
