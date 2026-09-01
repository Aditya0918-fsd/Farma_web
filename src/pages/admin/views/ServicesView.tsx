import { useState } from "react";
import { Wrench, Search, CheckCircle, XCircle, Clock, Eye, Package, Tractor, Users } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { useApp } from "@/context/AppContext.tsx";
import { toast } from "sonner";

type ServiceTab = "labour" | "machinery" | "expert" | "dealer_listings";

export default function ServicesView() {
  const {
    labourBookings, assignLaboursToBooking,
    machineryBookings, allotMachineryBooking, rejectMachineryBooking,
    expertAdviceQueries, updateExpertQueryStatus,
    dealerListings, approveDealerListing, rejectDealerListing,
  } = useApp();

  const [activeTab, setActiveTab] = useState<ServiceTab>("labour");
  const [search, setSearch] = useState("");

  const pendingLabour = labourBookings.filter((l) => l.status === "pending").length;
  const pendingMachinery = machineryBookings.filter((m) => m.status === "pending").length;
  const pendingExpert = expertAdviceQueries.filter((e) => e.status === "pending").length;
  const pendingListings = dealerListings.filter((d) => d.status === "pending").length;

  const TABS = [
    { id: "labour" as ServiceTab, label: "Labour Bookings", icon: Users, count: pendingLabour },
    { id: "machinery" as ServiceTab, label: "Machinery Bookings", icon: Tractor, count: pendingMachinery },
    { id: "expert" as ServiceTab, label: "Expert Queries", icon: Wrench, count: pendingExpert },
    { id: "dealer_listings" as ServiceTab, label: "Dealer Listings", icon: Package, count: pendingListings },
  ];

  const statusStyle: Record<string, string> = {
    pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    assigned: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    allotted: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    completed: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    resolved: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    contacted: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    rejected: "bg-red-500/10 text-red-400 border-red-500/20",
    approved: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#111] border border-white/10 rounded-2xl p-5">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Wrench className="h-5 w-5 text-emerald-400" /> Services Management
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          Manage all service requests — labour bookings, machinery, expert advice, and dealer listings.
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Labour Bookings", value: labourBookings.length, pending: pendingLabour, color: "emerald" },
          { label: "Machinery Bookings", value: machineryBookings.length, pending: pendingMachinery, color: "blue" },
          { label: "Expert Queries", value: expertAdviceQueries.length, pending: pendingExpert, color: "amber" },
          { label: "Dealer Listings", value: dealerListings.length, pending: pendingListings, color: "purple" },
        ].map((s) => {
          const colorMap: Record<string, string> = {
            emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
            blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
            amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
            purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
          };
          return (
            <div key={s.label} className={`bg-[#111] border rounded-2xl p-4 shadow-lg ${colorMap[s.color]}`}>
              <p className="text-xs text-gray-400 font-bold">{s.label}</p>
              <p className="text-2xl font-black mt-2" style={{ fontFamily: "Rajdhani, sans-serif" }}>{s.value}</p>
              {s.pending > 0 && (
                <p className="text-[10px] text-amber-400 mt-1">{s.pending} pending action</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Sub-Tabs */}
      <div className="bg-[#111] border border-white/10 rounded-2xl p-2 flex gap-2 overflow-x-auto custom-scrollbar">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSearch(""); }}
              className={`flex items-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {tab.label}
              {tab.count > 0 && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-amber-500 text-black">{tab.count}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="relative w-full md:w-72">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="bg-white/5 border-white/10 text-white text-xs pl-9 h-9 rounded-xl"
        />
      </div>

      {/* Labour Bookings */}
      {activeTab === "labour" && (
        <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 text-gray-400 font-bold uppercase">
                  <th className="py-3 px-4">Booking ID</th>
                  <th className="py-3 px-4">Farmer</th>
                  <th className="py-3 px-4">Labour Type</th>
                  <th className="py-3 px-4">Count / Days</th>
                  <th className="py-3 px-4">Start Date</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {labourBookings.filter((l) =>
                  l.userName.toLowerCase().includes(search.toLowerCase()) ||
                  l.labourType.toLowerCase().includes(search.toLowerCase())
                ).length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-16 text-gray-500">
                      <Users className="h-12 w-12 mx-auto mb-3 opacity-20" />
                      <p className="font-semibold text-sm">No labour bookings yet</p>
                    </td>
                  </tr>
                ) : (
                  labourBookings
                    .filter((l) =>
                      l.userName.toLowerCase().includes(search.toLowerCase()) ||
                      l.labourType.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((l) => (
                      <tr key={l.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-3 px-4 font-mono text-emerald-400">{l.id.slice(0, 12)}</td>
                        <td className="py-3 px-4 font-bold text-white">{l.userName}</td>
                        <td className="py-3 px-4 text-gray-300">{l.labourType}</td>
                        <td className="py-3 px-4 text-gray-300">{l.count} labourers / {l.days} days</td>
                        <td className="py-3 px-4 text-gray-400">{l.startDate}</td>
                        <td className="py-3 px-4 text-gray-400">{l.location}</td>
                        <td className="py-3 px-4">
                          <Badge className={statusStyle[l.status]}>{l.status}</Badge>
                        </td>
                        <td className="py-3 px-4 text-right">
                          {l.status === "pending" && (
                            <Button
                              size="sm"
                              onClick={() => {
                                assignLaboursToBooking(l.id, [{ name: "Assigned Labour", phone: "9876543210", charges: "₹500/day" }], "Assigned by admin");
                                toast.success("Labour assigned successfully!");
                              }}
                              className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 h-7 px-2"
                            >
                              <CheckCircle className="h-3 w-3 mr-1" /> Assign
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
      )}

      {/* Machinery Bookings */}
      {activeTab === "machinery" && (
        <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 text-gray-400 font-bold uppercase">
                  <th className="py-3 px-4">Booking ID</th>
                  <th className="py-3 px-4">Farmer</th>
                  <th className="py-3 px-4">Machinery Type</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Duration</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {machineryBookings.filter((m) =>
                  m.userName.toLowerCase().includes(search.toLowerCase()) ||
                  m.machineryType.toLowerCase().includes(search.toLowerCase())
                ).length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-16 text-gray-500">
                      <Tractor className="h-12 w-12 mx-auto mb-3 opacity-20" />
                      <p className="font-semibold text-sm">No machinery bookings yet</p>
                    </td>
                  </tr>
                ) : (
                  machineryBookings
                    .filter((m) =>
                      m.userName.toLowerCase().includes(search.toLowerCase()) ||
                      m.machineryType.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((m) => (
                      <tr key={m.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-3 px-4 font-mono text-emerald-400">{m.id.slice(0, 12)}</td>
                        <td className="py-3 px-4 font-bold text-white">{m.userName}</td>
                        <td className="py-3 px-4 text-gray-300">{m.machineryType}</td>
                        <td className="py-3 px-4 text-gray-400">{m.bookingDate}</td>
                        <td className="py-3 px-4 text-gray-300">{m.durationHours}h</td>
                        <td className="py-3 px-4 text-gray-400">{m.location}</td>
                        <td className="py-3 px-4">
                          <Badge className={statusStyle[m.status]}>{m.status}</Badge>
                        </td>
                        <td className="py-3 px-4 text-right space-x-1">
                          {m.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => {
                                  allotMachineryBooking(m.id, `${m.machineryType} – Allotted`, "Approved by admin");
                                  toast.success("Machinery allotted!");
                                }}
                                className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 h-7 px-2"
                              >
                                <CheckCircle className="h-3 w-3 mr-1" /> Allot
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => {
                                  rejectMachineryBooking(m.id);
                                  toast.error("Booking rejected.");
                                }}
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
      )}

      {/* Expert Queries */}
      {activeTab === "expert" && (
        <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 text-gray-400 font-bold uppercase">
                  <th className="py-3 px-4">Farmer</th>
                  <th className="py-3 px-4">Crop</th>
                  <th className="py-3 px-4">Problem</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {expertAdviceQueries.filter((e) =>
                  e.farmerName.toLowerCase().includes(search.toLowerCase()) ||
                  e.cropName.toLowerCase().includes(search.toLowerCase())
                ).length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-16 text-gray-500">
                      <Wrench className="h-12 w-12 mx-auto mb-3 opacity-20" />
                      <p className="font-semibold text-sm">No expert queries yet</p>
                    </td>
                  </tr>
                ) : (
                  expertAdviceQueries
                    .filter((e) =>
                      e.farmerName.toLowerCase().includes(search.toLowerCase()) ||
                      e.cropName.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((e) => (
                      <tr key={e.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-3 px-4 font-bold text-white">{e.farmerName}</td>
                        <td className="py-3 px-4 text-gray-300">{e.cropName}</td>
                        <td className="py-3 px-4 text-gray-400 max-w-50 truncate">{e.problemDetails}</td>
                        <td className="py-3 px-4 font-mono text-gray-300">{e.phone}</td>
                        <td className="py-3 px-4">
                          <Badge className={statusStyle[e.status]}>{e.status}</Badge>
                        </td>
                        <td className="py-3 px-4 text-right space-x-1">
                          {e.status === "pending" && (
                            <Button
                              size="sm"
                              onClick={() => {
                                updateExpertQueryStatus(e.id, "resolved", "Contacted farmer and provided advice.");
                                toast.success("Query marked as resolved.");
                              }}
                              className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 h-7 px-2"
                            >
                              <CheckCircle className="h-3 w-3 mr-1" /> Resolve
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
      )}

      {/* Dealer Listings */}
      {activeTab === "dealer_listings" && (
        <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 text-gray-400 font-bold uppercase">
                  <th className="py-3 px-4">Dealer</th>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {dealerListings.filter((d) =>
                  d.dealerName.toLowerCase().includes(search.toLowerCase()) ||
                  d.title.toLowerCase().includes(search.toLowerCase())
                ).length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-16 text-gray-500">
                      <Package className="h-12 w-12 mx-auto mb-3 opacity-20" />
                      <p className="font-semibold text-sm">No dealer listings yet</p>
                    </td>
                  </tr>
                ) : (
                  dealerListings
                    .filter((d) =>
                      d.dealerName.toLowerCase().includes(search.toLowerCase()) ||
                      d.title.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((d) => (
                      <tr key={d.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-3 px-4 font-bold text-white">{d.dealerName}</td>
                        <td className="py-3 px-4 text-gray-300">{d.title}</td>
                        <td className="py-3 px-4 text-gray-400 capitalize">{d.type}</td>
                        <td className="py-3 px-4 text-emerald-400">₹{typeof d.price === "number" ? d.price.toLocaleString("en-IN") : d.price}</td>
                        <td className="py-3 px-4">
                          <Badge className={statusStyle[d.status]}>{d.status}</Badge>
                        </td>
                        <td className="py-3 px-4 text-right space-x-1">
                          {d.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => { approveDealerListing(d.id); toast.success("Listing approved!"); }}
                                className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 h-7 px-2"
                              >
                                <CheckCircle className="h-3 w-3 mr-1" /> Approve
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => { rejectDealerListing(d.id); toast.error("Listing rejected."); }}
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
      )}
    </div>
  );
}
