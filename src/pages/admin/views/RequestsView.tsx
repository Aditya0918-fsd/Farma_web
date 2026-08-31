import { useState } from "react";
import { Search, Eye, MessageSquareText } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Button } from "@/components/ui/button.tsx";
import type { RequestItem } from "../types.ts";
import RequestDetailsView from "./RequestDetailsView.tsx";

interface RequestsViewProps {
  requests: RequestItem[];
  setRequests: React.Dispatch<React.SetStateAction<RequestItem[]>>;
}

export default function RequestsView({ requests, setRequests }: RequestsViewProps) {
  const [selectedRequest, setSelectedRequest] = useState<RequestItem | null>(null);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredRequests = requests.filter((r) => {
    const matchSearch =
      r.subject.toLowerCase().includes(search.toLowerCase()) ||
      r.user.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "all" || r.type.toLowerCase().includes(typeFilter.toLowerCase());
    const matchStatus = statusFilter === "all" || r.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  const handleRequestChange = (updated: RequestItem) => {
    setRequests((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
    setSelectedRequest(updated);
  };

  if (selectedRequest) {
    return (
      <RequestDetailsView
        request={selectedRequest}
        onRequestChange={handleRequestChange}
        onBack={() => setSelectedRequest(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <div className="bg-[#111] border border-white/10 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-[#1a1a1a] border border-white/10 text-white text-xs rounded-xl px-3 py-2 outline-none cursor-pointer"
          >
            <option value="all">All Types</option>
            <option value="Product Request">Product Request</option>
            <option value="Contact Request">Contact Request</option>
            <option value="Support Request">Support Request</option>
            <option value="Requisition Request">Requisition Request</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#1a1a1a] border border-white/10 text-white text-xs rounded-xl px-3 py-2 outline-none cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="in_review">In Review</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>

          {/* Search Input */}
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search request ID, subject, user..."
              className="bg-white/5 border-white/10 text-white text-xs pl-9 h-9 rounded-xl"
            />
          </div>
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10 text-gray-400 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Req ID</th>
                <th className="py-3.5 px-4">User</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Subject</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredRequests.map((r) => (
                <tr key={r.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">{r.id}</td>
                  <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                    <MessageSquareText className="h-3.5 w-3.5 text-emerald-400" />
                    {r.user}
                  </td>
                  <td className="py-3.5 px-4 text-gray-300">{r.type}</td>
                  <td className="py-3.5 px-4 text-gray-200 font-medium">{r.subject}</td>
                  <td className="py-3.5 px-4 text-gray-400 font-mono">{r.date}</td>
                  <td className="py-3.5 px-4">
                    <Badge
                      className={
                        r.status === "resolved"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : r.status === "in_review"
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          : r.status === "new"
                          ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                          : "bg-gray-500/10 text-gray-400 border-gray-500/20"
                      }
                    >
                      {r.status.replace("_", " ")}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setSelectedRequest(r)}
                      className="text-xs text-emerald-400 hover:text-emerald-300 border border-emerald-500/20 h-7 px-2.5"
                    >
                      <Eye className="h-3.5 w-3.5 mr-1" /> View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
