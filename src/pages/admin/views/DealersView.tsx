import { useState } from "react";
import { Search, Plus, Eye, Trash2, CheckCircle, Clock, AlertCircle, Store } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import type { Dealer } from "../types.ts";
import DealerProfileView from "./DealerProfileView.tsx";
import { toast } from "sonner";

interface DealersViewProps {
  dealers: Dealer[];
  setDealers: React.Dispatch<React.SetStateAction<Dealer[]>>;
}

export default function DealersView({ dealers, setDealers }: DealersViewProps) {
  const [selectedDealer, setSelectedDealer] = useState<Dealer | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newDealer, setNewDealer] = useState<Partial<Dealer>>({
    businessName: "",
    owner: "",
    phone: "",
    email: "",
    location: "Delhi",
    businessType: "Wholesale Seeds & Fertilizer",
    gstin: "07ABCDE1234F1Z5",
    address: ""
  });

  const filteredDealers = dealers.filter((d) => {
    const matchSearch =
      d.businessName.toLowerCase().includes(search.toLowerCase()) ||
      d.owner.toLowerCase().includes(search.toLowerCase()) ||
      d.phone.includes(search) ||
      d.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || d.status === statusFilter;
    const matchLoc = locationFilter === "all" || d.location.toLowerCase() === locationFilter.toLowerCase();
    return matchSearch && matchStatus && matchLoc;
  });

  const handleAddDealer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDealer.businessName || !newDealer.owner || !newDealer.phone) {
      toast.error("Business Name, Owner & Phone are required.");
      return;
    }
    const created: Dealer = {
      id: `DLR${Math.floor(200 + Math.random() * 800)}`,
      businessName: newDealer.businessName || "New Dealer",
      owner: newDealer.owner || "Owner Name",
      phone: newDealer.phone || "9876543201",
      email: newDealer.email || "dealer@email.com",
      location: newDealer.location || "Delhi",
      status: "active",
      verified: "verified",
      totalOrders: 0,
      totalPurchases: 0,
      outstanding: 0,
      businessType: newDealer.businessType || "General Agri Store",
      gstin: newDealer.gstin || "07ABCDE1234F1Z5",
      address: newDealer.address || "Main Market",
      createdAt: new Date().toISOString().split("T")[0]
    };
    setDealers((prev) => [created, ...prev]);
    setIsAddModalOpen(false);
    toast.success(`Dealer ${created.businessName} added successfully!`);
  };

  const handleDeleteDealer = (id: string) => {
    setDealers((prev) => prev.filter((d) => d.id !== id));
    toast.success("Dealer record deleted.");
  };

  if (selectedDealer) {
    return <DealerProfileView dealer={selectedDealer} onBack={() => setSelectedDealer(null)} />;
  }

  return (
    <div className="space-y-6">
      {/* Top Filter Bar */}
      <div className="bg-[#111] border border-white/10 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#1a1a1a] border border-white/10 text-white text-xs rounded-xl px-3 py-2 outline-none cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
          </select>

          {/* Location Filter */}
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="bg-[#1a1a1a] border border-white/10 text-white text-xs rounded-xl px-3 py-2 outline-none cursor-pointer"
          >
            <option value="all">All Location</option>
            <option value="delhi">Delhi</option>
            <option value="mumbai">Mumbai</option>
            <option value="punjab">Punjab</option>
            <option value="jaipur">Jaipur</option>
            <option value="lucknow">Lucknow</option>
          </select>

          {/* Search Input */}
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search dealer business, owner, phone..."
              className="bg-white/5 border-white/10 text-white text-xs pl-9 h-9 rounded-xl"
            />
          </div>
        </div>

        <Button onClick={() => setIsAddModalOpen(true)} className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs h-9">
          <Plus className="h-4 w-4 mr-1" /> Add Dealer
        </Button>
      </div>

      {/* Dealers Table */}
      <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10 text-gray-400 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Dealer ID</th>
                <th className="py-3.5 px-4">Business Name</th>
                <th className="py-3.5 px-4">Owner</th>
                <th className="py-3.5 px-4">Phone</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Verified</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredDealers.map((d) => (
                <tr key={d.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-amber-400">{d.id}</td>
                  <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                      <Store className="h-4 w-4" />
                    </div>
                    {d.businessName}
                  </td>
                  <td className="py-3.5 px-4 text-gray-300">{d.owner}</td>
                  <td className="py-3.5 px-4 text-gray-300 font-mono">{d.phone}</td>
                  <td className="py-3.5 px-4 text-gray-300">{d.location}</td>
                  <td className="py-3.5 px-4">
                    <Badge
                      className={
                        d.status === "active"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : d.status === "pending"
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          : "bg-red-500/10 text-red-400 border-red-500/20"
                      }
                    >
                      {d.status}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4">
                    {d.verified === "verified" ? (
                      <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                        <CheckCircle className="h-3.5 w-3.5" /> Verified
                      </span>
                    ) : d.verified === "pending" ? (
                      <span className="text-amber-400 flex items-center gap-1 font-semibold">
                        <Clock className="h-3.5 w-3.5" /> Pending
                      </span>
                    ) : (
                      <span className="text-red-400 flex items-center gap-1 font-semibold">
                        <AlertCircle className="h-3.5 w-3.5" /> Not Verified
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setSelectedDealer(d)}
                      className="text-xs text-amber-400 hover:text-amber-300 border border-amber-500/20 h-7 px-2.5"
                    >
                      <Eye className="h-3.5 w-3.5 mr-1" /> View Profile
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteDealer(d.id)}
                      className="text-xs text-red-400 hover:text-red-300 border border-red-500/20 h-7 px-2"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Dealer Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white border-b border-white/10 pb-3">Add New Dealer</h3>
            <form onSubmit={handleAddDealer} className="space-y-3 text-xs">
              <div>
                <label className="text-gray-300 mb-1 block font-semibold">Business Name *</label>
                <Input
                  value={newDealer.businessName}
                  onChange={(e) => setNewDealer({ ...newDealer, businessName: e.target.value })}
                  placeholder="e.g. ABC Agro Traders"
                  className="bg-white/5 border-white/10 text-white text-xs h-9"
                  required
                />
              </div>
              <div>
                <label className="text-gray-300 mb-1 block font-semibold">Owner Name *</label>
                <Input
                  value={newDealer.owner}
                  onChange={(e) => setNewDealer({ ...newDealer, owner: e.target.value })}
                  placeholder="e.g. Amit Sharma"
                  className="bg-white/5 border-white/10 text-white text-xs h-9"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-gray-300 mb-1 block font-semibold">Phone *</label>
                  <Input
                    value={newDealer.phone}
                    onChange={(e) => setNewDealer({ ...newDealer, phone: e.target.value })}
                    placeholder="9876543201"
                    className="bg-white/5 border-white/10 text-white text-xs h-9"
                    required
                  />
                </div>
                <div>
                  <label className="text-gray-300 mb-1 block font-semibold">Location</label>
                  <Input
                    value={newDealer.location}
                    onChange={(e) => setNewDealer({ ...newDealer, location: e.target.value })}
                    placeholder="City / State"
                    className="bg-white/5 border-white/10 text-white text-xs h-9"
                  />
                </div>
              </div>
              <div>
                <label className="text-gray-300 mb-1 block font-semibold">GSTIN No.</label>
                <Input
                  value={newDealer.gstin}
                  onChange={(e) => setNewDealer({ ...newDealer, gstin: e.target.value })}
                  placeholder="07ABCDE1234F1Z5"
                  className="bg-white/5 border-white/10 text-white text-xs h-9"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <Button type="button" variant="ghost" onClick={() => setIsAddModalOpen(false)} className="text-xs text-gray-300 border border-white/10">
                  Cancel
                </Button>
                <Button type="submit" className="bg-emerald-500 text-black font-bold text-xs">
                  Save Dealer
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
