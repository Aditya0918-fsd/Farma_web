import { useState } from "react";
import { Search, Plus, Eye, Edit, Trash2, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import type { Farmer } from "../types.ts";
import FarmerProfileView from "./FarmerProfileView.tsx";
import { toast } from "sonner";

interface FarmersViewProps {
  farmers: Farmer[];
  setFarmers: React.Dispatch<React.SetStateAction<Farmer[]>>;
}

export default function FarmersView({ farmers, setFarmers }: FarmersViewProps) {
  const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Farmer Form State
  const [newFarmer, setNewFarmer] = useState<Partial<Farmer>>({
    name: "",
    phone: "",
    email: "",
    location: "Bihar",
    crops: "Wheat, Rice",
    farmName: "",
    totalLand: "5 Acre",
    landType: "Irrigated",
    address: ""
  });

  const filteredFarmers = farmers.filter((f) => {
    const matchSearch =
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.phone.includes(search) ||
      f.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || f.status === statusFilter;
    const matchLoc = locationFilter === "all" || f.location.toLowerCase() === locationFilter.toLowerCase();
    return matchSearch && matchStatus && matchLoc;
  });

  const handleAddFarmer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFarmer.name || !newFarmer.phone) {
      toast.error("Please fill name and phone number.");
      return;
    }
    const created: Farmer = {
      id: `FRM${Math.floor(100 + Math.random() * 900)}`,
      name: newFarmer.name || "New Farmer",
      phone: newFarmer.phone || "9876543210",
      email: newFarmer.email || `${newFarmer.name?.toLowerCase().replace(/\s+/g, "")}@email.com`,
      location: newFarmer.location || "Bihar",
      crops: newFarmer.crops || "Wheat, Rice",
      status: "active",
      verified: "verified",
      totalProducts: 0,
      totalOrders: 0,
      totalSales: 0,
      totalEarnings: 0,
      farmName: newFarmer.farmName || `${newFarmer.name} Farm`,
      totalLand: newFarmer.totalLand || "5 Acre",
      landType: newFarmer.landType || "Irrigated",
      mainCrops: newFarmer.crops || "Wheat, Rice",
      organicCertified: "Yes",
      address: newFarmer.address || "Patna, Bihar",
      dob: "01 Jan 1990",
      createdAt: new Date().toISOString().split("T")[0]
    };
    setFarmers((prev) => [created, ...prev]);
    setIsAddModalOpen(false);
    toast.success(`Farmer ${created.name} added successfully!`);
  };

  const handleDeleteFarmer = (id: string) => {
    setFarmers((prev) => prev.filter((f) => f.id !== id));
    toast.success("Farmer record deleted.");
  };

  if (selectedFarmer) {
    return <FarmerProfileView farmer={selectedFarmer} onBack={() => setSelectedFarmer(null)} />;
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
            <option value="punjab">Punjab</option>
            <option value="gujarat">Gujarat</option>
            <option value="uttar pradesh">Uttar Pradesh</option>
            <option value="bihar">Bihar</option>
            <option value="mp">MP</option>
          </select>

          {/* Search Input */}
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search farmer name, ID, phone..."
              className="bg-white/5 border-white/10 text-white text-xs pl-9 h-9 rounded-xl"
            />
          </div>
        </div>

        <Button onClick={() => setIsAddModalOpen(true)} className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs h-9">
          <Plus className="h-4 w-4 mr-1" /> Add Farmer
        </Button>
      </div>

      {/* Farmers Table */}
      <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10 text-gray-400 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Farmer ID</th>
                <th className="py-3.5 px-4">Name</th>
                <th className="py-3.5 px-4">Phone</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Crops</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Verified</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredFarmers.map((f) => (
                <tr key={f.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">{f.id}</td>
                  <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                      {f.name.charAt(0)}
                    </div>
                    {f.name}
                  </td>
                  <td className="py-3.5 px-4 text-gray-300 font-mono">{f.phone}</td>
                  <td className="py-3.5 px-4 text-gray-300">{f.location}</td>
                  <td className="py-3.5 px-4 text-gray-300">{f.crops}</td>
                  <td className="py-3.5 px-4">
                    <Badge
                      className={
                        f.status === "active"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : f.status === "pending"
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          : "bg-red-500/10 text-red-400 border-red-500/20"
                      }
                    >
                      {f.status}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4">
                    {f.verified === "verified" ? (
                      <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                        <CheckCircle className="h-3.5 w-3.5" /> Verified
                      </span>
                    ) : f.verified === "pending" ? (
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
                      onClick={() => setSelectedFarmer(f)}
                      className="text-xs text-emerald-400 hover:text-emerald-300 border border-emerald-500/20 h-7 px-2.5"
                    >
                      <Eye className="h-3.5 w-3.5 mr-1" /> View Profile
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteFarmer(f.id)}
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

      {/* Add Farmer Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white border-b border-white/10 pb-3">Add New Farmer</h3>
            <form onSubmit={handleAddFarmer} className="space-y-3 text-xs">
              <div>
                <label className="text-gray-300 mb-1 block font-semibold">Farmer Name *</label>
                <Input
                  value={newFarmer.name}
                  onChange={(e) => setNewFarmer({ ...newFarmer, name: e.target.value })}
                  placeholder="e.g. Rajesh Kumar"
                  className="bg-white/5 border-white/10 text-white text-xs h-9"
                  required
                />
              </div>
              <div>
                <label className="text-gray-300 mb-1 block font-semibold">Phone Number *</label>
                <Input
                  value={newFarmer.phone}
                  onChange={(e) => setNewFarmer({ ...newFarmer, phone: e.target.value })}
                  placeholder="e.g. 9876543210"
                  className="bg-white/5 border-white/10 text-white text-xs h-9"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-gray-300 mb-1 block font-semibold">Location</label>
                  <Input
                    value={newFarmer.location}
                    onChange={(e) => setNewFarmer({ ...newFarmer, location: e.target.value })}
                    placeholder="State/District"
                    className="bg-white/5 border-white/10 text-white text-xs h-9"
                  />
                </div>
                <div>
                  <label className="text-gray-300 mb-1 block font-semibold">Total Land</label>
                  <Input
                    value={newFarmer.totalLand}
                    onChange={(e) => setNewFarmer({ ...newFarmer, totalLand: e.target.value })}
                    placeholder="e.g. 10 Acre"
                    className="bg-white/5 border-white/10 text-white text-xs h-9"
                  />
                </div>
              </div>
              <div>
                <label className="text-gray-300 mb-1 block font-semibold">Main Crops</label>
                <Input
                  value={newFarmer.crops}
                  onChange={(e) => setNewFarmer({ ...newFarmer, crops: e.target.value })}
                  placeholder="Wheat, Paddy, Maize"
                  className="bg-white/5 border-white/10 text-white text-xs h-9"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <Button type="button" variant="ghost" onClick={() => setIsAddModalOpen(false)} className="text-xs text-gray-300 border border-white/10">
                  Cancel
                </Button>
                <Button type="submit" className="bg-emerald-500 text-black font-bold text-xs">
                  Save Farmer
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
