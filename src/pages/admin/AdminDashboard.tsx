import { useState } from "react";
import {
  Shield, LogOut, Package, Users, MessageSquare, TrendingUp, CreditCard,
  CheckCircle, XCircle, Clock, Plus, Trash2, Edit2, Save, X, Tractor, Bell, ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { useApp } from "@/context/AppContext.tsx";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import type { MandiRate } from "@/context/AppContext.tsx";

type Tab = "crops" | "dealerListings" | "machinery" | "labour" | "expert" | "mandi" | "kcc" | "labourTypes" | "notifications";

export default function AdminDashboard() {
  const {
    adminLogout,
    cropListings, approveCropListing, rejectCropListing,
    dealerListings, approveDealerListing, rejectDealerListing,
    machineryBookings, allotMachineryBooking, rejectMachineryBooking,
    labourBookings, assignLaboursToBooking,
    expertAdviceQueries, updateExpertQueryStatus,
    mandiRates, addMandiRate, updateMandiRate, deleteMandiRate,
    labourTypes, addLabourType, removeLabourType,
    kccApplications, approveKccApplication, rejectKccApplication,
    toggleKccDemoStatus, isKccIssued, notifications, markNotificationAsRead, deleteNotification
  } = useApp();

  const [tab, setTab] = useState<Tab>("crops");
  const [newLabourType, setNewLabourType] = useState("");
  const [editingRate, setEditingRate] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<MandiRate>>({});
  const [newRate, setNewRate] = useState({ name: "", hindi: "", min: "", max: "", modal: "", change: "", img: "🌾", unit: "Quintal" });
  const [assignForm, setAssignForm] = useState<{ [id: string]: { name: string; phone: string; charges: string }[] }>({});
  const [machineryAllotForm, setMachineryAllotForm] = useState<{ [id: string]: string }>({});

  // Labour assignment helpers
  const getAssign = (id: string) => assignForm[id] || [{ name: "", phone: "", charges: "" }];
  const setAssign = (id: string, val: { name: string; phone: string; charges: string }[]) =>
    setAssignForm(f => ({ ...f, [id]: val }));

  const TABS: { id: Tab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "notifications", label: "Global Activity Log", icon: Bell },
    { id: "dealerListings", label: "Dealer Listings Approval", icon: Package },
    { id: "crops", label: "Crop Listings", icon: Package },
    { id: "machinery", label: "Machinery Booking", icon: Tractor },
    { id: "labour", label: "Labour Requests", icon: Users },
    { id: "labourTypes", label: "Labour Types", icon: Users },
    { id: "expert", label: "Expert Queries", icon: MessageSquare },
    { id: "mandi", label: "Mandi Bhav", icon: TrendingUp },
    { id: "kcc", label: "KCC Applications", icon: CreditCard },
  ];

  const StatusBadge = ({ status }: { status: string }) => {
    const map: Record<string, string> = {
      pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      approved: "bg-primary/10 text-primary border-primary/20",
      allotted: "bg-primary/10 text-primary border-primary/20",
      rejected: "bg-red-500/10 text-red-400 border-red-500/20",
      assigned: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      resolved: "bg-primary/10 text-primary border-primary/20",
      contacted: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    };
    return <span className={`text-xs border rounded-full px-2 py-0.5 font-medium ${map[status] || ""}`}>{status}</span>;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Admin Header */}
      <header className="sticky top-0 z-50 bg-[#0e0e0e] border-b border-white/10 px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <span className="font-bold text-sm" style={{ fontFamily: "Rajdhani, sans-serif" }}>KRIVEXA ADMIN PANEL</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-xs text-gray-400">
            KCC Demo:{" "}
            <button onClick={toggleKccDemoStatus} className={`font-bold cursor-pointer ${isKccIssued ? "text-primary" : "text-amber-400"}`}>
              {isKccIssued ? "ACTIVE" : "NOT ISSUED"}
            </button>
          </div>
          <Button size="sm" variant="ghost" onClick={adminLogout} className="text-red-400 hover:text-red-300 border border-red-500/20 text-xs">
            <LogOut className="h-3.5 w-3.5 mr-1" /> Logout
          </Button>
        </div>
      </header>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="md:w-48 bg-[#0d0d0d] border-r border-white/10 md:min-h-screen p-3 flex md:flex-col gap-1 overflow-x-auto md:overflow-visible">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors whitespace-nowrap ${tab === t.id ? "bg-primary/10 text-primary border border-primary/20" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
            >
              <t.icon className="h-4 w-4 shrink-0" />
              {t.label}
            </button>
          ))}
        </aside>

        <main className="flex-1 p-4 md:p-6 space-y-4 max-w-5xl">

          {/* DEALER PRODUCT/SERVICE LISTINGS APPROVAL */}
          {tab === "dealerListings" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Dealer Products & Services Submissions</h2>
              {dealerListings.length === 0 && <p className="text-gray-500 text-sm">No dealer products/services submitted yet.</p>}
              <div className="space-y-3">
                {dealerListings.map(d => (
                  <div key={d.id} className="bg-[#111] border border-white/10 rounded-xl p-4">
                    <div className="flex items-start gap-4">
                      {d.image && <img src={d.image} alt={d.title} className="w-16 h-16 rounded-lg object-cover shrink-0" />}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-bold">{d.title}</h3>
                          <Badge className="bg-white/10 text-gray-300 text-[10px] uppercase font-mono">{d.type}</Badge>
                          <StatusBadge status={d.status} />
                        </div>
                        <p className="text-sm text-gray-400">Dealer: <strong className="text-white">{d.dealerName}</strong> · Location: {d.location || "Bihar"}</p>
                        <p className="text-sm text-gray-300">Price: <span className="text-primary font-bold">₹{d.price}</span> ({d.unit || "unit"})</p>
                        {d.description && <p className="text-xs text-gray-400 mt-1">{d.description}</p>}
                      </div>
                      {d.status === "pending" && (
                        <div className="flex gap-2 shrink-0">
                          <Button size="sm" onClick={() => { approveDealerListing(d.id); toast.success("Dealer listing approved!"); }} className="bg-primary text-black font-bold text-xs h-8">
                            <CheckCircle className="h-3.5 w-3.5 mr-1" /> Approve
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => { rejectDealerListing(d.id); toast.error("Dealer listing rejected."); }} className="border border-red-500/20 text-red-400 text-xs h-8">
                            <XCircle className="h-3.5 w-3.5 mr-1" /> Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CROP LISTINGS */}
          {tab === "crops" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Sell Crop Requests</h2>
              {cropListings.length === 0 && <p className="text-gray-500 text-sm">No crop listing requests yet.</p>}
              <div className="space-y-3">
                {cropListings.map(c => (
                  <div key={c.id} className="bg-[#111] border border-white/10 rounded-xl p-4">
                    <div className="flex items-start gap-4">
                      {c.image && <img src={c.image} alt={c.cropName} className="w-16 h-16 rounded-lg object-cover shrink-0" />}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-bold">{c.cropName}</h3>
                          <StatusBadge status={c.status} />
                        </div>
                        <p className="text-sm text-gray-400">{c.sellerName} · {c.phone} · {c.district}, {c.city}</p>
                        <p className="text-sm text-gray-400">{c.weight} · ₹{c.price}/Qtl</p>
                      </div>
                      {c.status === "pending" && (
                        <div className="flex gap-2 shrink-0">
                          <Button size="sm" onClick={() => { approveCropListing(c.id); toast.success("Listing approved!"); }} className="bg-primary text-black font-bold text-xs h-8">
                            <CheckCircle className="h-3.5 w-3.5 mr-1" /> Approve
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => { rejectCropListing(c.id); toast.error("Listing rejected."); }} className="border border-red-500/20 text-red-400 text-xs h-8">
                            <XCircle className="h-3.5 w-3.5 mr-1" /> Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MACHINERY BOOKINGS & ALLOTMENT */}
          {tab === "machinery" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Machinery Booking Requests & Allotment</h2>
                <span className="text-xs text-gray-400">{machineryBookings.length} Requests</span>
              </div>
              {machineryBookings.length === 0 && <p className="text-gray-500 text-sm">No machinery booking requests yet.</p>}
              <div className="space-y-4">
                {machineryBookings.map((m) => (
                  <div key={m.id} className="bg-[#111] border border-white/10 rounded-xl p-4">
                    <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <Tractor className="h-5 w-5 text-primary" />
                        <h3 className="font-bold text-base text-white">{m.machineryType}</h3>
                        <StatusBadge status={m.status} />
                      </div>
                      <span className="text-xs text-gray-500">Requested: {new Date(m.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-xs text-gray-300 mb-1 font-semibold">Farmer: {m.userName} ({m.phone})</p>
                    <p className="text-xs text-gray-400 mb-3">Required Date: <span className="text-white font-medium">{m.bookingDate}</span> · Duration: <span className="text-white font-medium">{m.durationHours} Hours</span> · Location: <span className="text-white font-medium">{m.location}</span></p>

                    {m.status === "pending" && (
                      <div className="border-t border-white/10 pt-3 space-y-3">
                        <div>
                          <Label className="text-xs text-gray-300 font-semibold mb-1 block">Machine Allotment Details (Driver Name, Phone, Vehicle No.):</Label>
                          <Input
                            value={machineryAllotForm[m.id] || ""}
                            onChange={(e) => setMachineryAllotForm({ ...machineryAllotForm, [m.id]: e.target.value })}
                            placeholder="e.g. Mahindra Tractor BR-01-AB-1234 + Driver Ramesh (9876543210)"
                            className="bg-white/5 border-white/10 text-white text-xs h-9"
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => {
                              const details = machineryAllotForm[m.id] || "Mahindra 45HP Tractor + Driver Assigned";
                              allotMachineryBooking(m.id, details);
                              toast.success("Machinery allotted successfully! User notified.");
                            }}
                            className="bg-primary text-black font-bold text-xs h-8"
                          >
                            <CheckCircle className="h-3.5 w-3.5 mr-1" /> Allot Machine & Notify User
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              rejectMachineryBooking(m.id);
                              toast.error("Machinery booking rejected.");
                            }}
                            className="border border-red-500/20 text-red-400 text-xs h-8"
                          >
                            <XCircle className="h-3.5 w-3.5 mr-1" /> Reject Request
                          </Button>
                        </div>
                      </div>
                    )}

                    {m.status === "allotted" && (
                      <div className="mt-2 p-3 bg-primary/10 border border-primary/20 rounded-lg text-xs text-primary">
                        <span className="font-bold">✓ Allotted Details:</span> {m.allottedMachineDetails}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* LABOUR REQUESTS */}
          {tab === "labour" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Labour Booking Requests</h2>
              {labourBookings.length === 0 && <p className="text-gray-500 text-sm">No labour booking requests yet.</p>}
              <div className="space-y-4">
                {labourBookings.map(b => (
                  <div key={b.id} className="bg-[#111] border border-white/10 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h3 className="font-bold text-sm">{b.labourType}</h3>
                      <StatusBadge status={b.status} />
                    </div>
                    <p className="text-xs text-gray-400 mb-1">{b.userName} · {b.phone} · {b.location}</p>
                    <p className="text-xs text-gray-400 mb-3">{b.count} workers · {b.days} days · From: {b.startDate} {b.endDate ? `To: ${b.endDate}` : ""}</p>
                    {b.status === "pending" && (
                      <div className="border-t border-white/10 pt-3 space-y-2">
                        <p className="text-xs font-semibold text-gray-400">Assign Labours:</p>
                        {getAssign(b.id).map((a, i) => (
                          <div key={i} className="grid grid-cols-3 gap-2">
                            <Input value={a.name} onChange={e => { const v = [...getAssign(b.id)]; v[i] = { ...v[i], name: e.target.value }; setAssign(b.id, v); }} placeholder="Labour Name" className="bg-white/5 border-white/10 text-white text-xs h-8" />
                            <Input value={a.phone} onChange={e => { const v = [...getAssign(b.id)]; v[i] = { ...v[i], phone: e.target.value }; setAssign(b.id, v); }} placeholder="Phone" className="bg-white/5 border-white/10 text-white text-xs h-8" />
                            <Input value={a.charges} onChange={e => { const v = [...getAssign(b.id)]; v[i] = { ...v[i], charges: e.target.value }; setAssign(b.id, v); }} placeholder="Charges e.g. ₹600/day" className="bg-white/5 border-white/10 text-white text-xs h-8" />
                          </div>
                        ))}
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost" onClick={() => setAssign(b.id, [...getAssign(b.id), { name: "", phone: "", charges: "" }])} className="text-xs border border-white/10 text-gray-300">+ Add Labour</Button>
                          <Button size="sm" className="bg-primary text-black font-bold text-xs" onClick={() => {
                            const labours = getAssign(b.id).filter(a => a.name && a.phone);
                            if (!labours.length) { toast.error("Add at least one labour."); return; }
                            assignLaboursToBooking(b.id, labours);
                            toast.success("Labours assigned! User notified.");
                          }}>
                            <CheckCircle className="h-3.5 w-3.5 mr-1" /> Assign & Notify
                          </Button>
                        </div>
                      </div>
                    )}
                    {b.assignedLabours && (
                      <div className="mt-2 text-xs text-primary">✓ {b.assignedLabours.length} labour(s) assigned</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* LABOUR TYPES */}
          {tab === "labourTypes" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Manage Labour Types</h2>
              <div className="flex gap-2 mb-4">
                <Input value={newLabourType} onChange={e => setNewLabourType(e.target.value)} placeholder="New labour type name" className="bg-white/5 border-white/10 text-white" />
                <Button onClick={() => { addLabourType(newLabourType); setNewLabourType(""); toast.success("Labour type added!"); }} className="bg-primary text-black font-bold shrink-0">
                  <Plus className="h-4 w-4 mr-1" /> Add
                </Button>
              </div>
              <div className="space-y-2">
                {labourTypes.map(lt => (
                  <div key={lt} className="flex items-center justify-between bg-[#111] border border-white/10 rounded-xl px-4 py-3">
                    <span className="text-sm">{lt}</span>
                    <Button size="sm" variant="ghost" onClick={() => { removeLabourType(lt); toast.success("Removed."); }} className="text-red-400 h-8 border border-red-500/20 text-xs">
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EXPERT QUERIES */}
          {tab === "expert" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Expert Advice Queries</h2>
              {expertAdviceQueries.length === 0 && <p className="text-gray-500 text-sm">No expert advice queries yet.</p>}
              <div className="space-y-3">
                {expertAdviceQueries.map(q => (
                  <div key={q.id} className="bg-[#111] border border-white/10 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-bold text-sm">{q.farmerName}</h3>
                      <StatusBadge status={q.status} />
                    </div>
                    <p className="text-xs text-gray-400">{q.phone} · {q.address}</p>
                    <p className="text-xs text-gray-300 mt-1"><span className="text-primary font-medium">Crop:</span> {q.cropName}</p>
                    <p className="text-xs text-gray-300 mt-1 bg-white/5 rounded-lg p-2">{q.problemDetails}</p>
                    {q.status === "pending" && (
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" onClick={() => { updateExpertQueryStatus(q.id, "contacted"); toast.success("Marked as Contacted."); }} className="bg-primary text-black font-bold text-xs h-8">
                          <CheckCircle className="h-3.5 w-3.5 mr-1" /> Mark Contacted
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => { updateExpertQueryStatus(q.id, "resolved"); toast.success("Marked Resolved."); }} className="border border-white/10 text-gray-300 text-xs h-8">
                          Mark Resolved
                        </Button>
                        <a href={`tel:${q.phone}`} className="flex items-center gap-1 text-xs text-primary border border-primary/20 rounded-lg px-3 py-1.5 hover:bg-primary/10">
                          Call Farmer
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MANDI BHAV */}
          {tab === "mandi" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Manage Mandi Rates</h2>
              {/* Add new rate */}
              <div className="bg-[#111] border border-white/10 rounded-xl p-4 mb-6">
                <p className="text-sm font-semibold mb-3 text-gray-400">Add New Rate</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2">
                  <Input value={newRate.name} onChange={e => setNewRate(r => ({ ...r, name: e.target.value }))} placeholder="Crop Name" className="bg-white/5 border-white/10 text-white text-xs" />
                  <Input value={newRate.hindi} onChange={e => setNewRate(r => ({ ...r, hindi: e.target.value }))} placeholder="Hindi Name" className="bg-white/5 border-white/10 text-white text-xs" />
                  <Input value={newRate.img} onChange={e => setNewRate(r => ({ ...r, img: e.target.value }))} placeholder="Emoji 🌾" className="bg-white/5 border-white/10 text-white text-xs" />
                  <Input value={newRate.unit} onChange={e => setNewRate(r => ({ ...r, unit: e.target.value }))} placeholder="Unit" className="bg-white/5 border-white/10 text-white text-xs" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
                  <Input type="number" value={newRate.min} onChange={e => setNewRate(r => ({ ...r, min: e.target.value }))} placeholder="Min Price" className="bg-white/5 border-white/10 text-white text-xs" />
                  <Input type="number" value={newRate.max} onChange={e => setNewRate(r => ({ ...r, max: e.target.value }))} placeholder="Max Price" className="bg-white/5 border-white/10 text-white text-xs" />
                  <Input type="number" value={newRate.modal} onChange={e => setNewRate(r => ({ ...r, modal: e.target.value }))} placeholder="Modal Price" className="bg-white/5 border-white/10 text-white text-xs" />
                  <Input type="number" value={newRate.change} onChange={e => setNewRate(r => ({ ...r, change: e.target.value }))} placeholder="% Change" className="bg-white/5 border-white/10 text-white text-xs" />
                </div>
                <Button size="sm" onClick={() => {
                  if (!newRate.name || !newRate.min) { toast.error("Fill crop name and min price."); return; }
                  addMandiRate({ name: newRate.name, hindi: newRate.hindi, min: +newRate.min, max: +newRate.max, modal: +newRate.modal, change: +newRate.change, img: newRate.img, unit: newRate.unit, mandi: "Kanpur Mandi" });
                  setNewRate({ name: "", hindi: "", min: "", max: "", modal: "", change: "", img: "🌾", unit: "Quintal" });
                  toast.success("Rate added!");
                }} className="bg-primary text-black font-bold text-xs">
                  <Plus className="h-3.5 w-3.5 mr-1" /> Add Rate
                </Button>
              </div>

              {/* Existing rates */}
              <div className="space-y-2">
                {mandiRates.map(r => (
                  <div key={r.id} className="bg-[#111] border border-white/10 rounded-xl p-3">
                    {editingRate === r.id ? (
                      <div className="space-y-2">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          <Input value={editValues.min ?? r.min} onChange={e => setEditValues(v => ({ ...v, min: +e.target.value }))} placeholder="Min" className="bg-white/5 border-white/10 text-white text-xs h-8" />
                          <Input value={editValues.max ?? r.max} onChange={e => setEditValues(v => ({ ...v, max: +e.target.value }))} placeholder="Max" className="bg-white/5 border-white/10 text-white text-xs h-8" />
                          <Input value={editValues.modal ?? r.modal} onChange={e => setEditValues(v => ({ ...v, modal: +e.target.value }))} placeholder="Modal" className="bg-white/5 border-white/10 text-white text-xs h-8" />
                          <Input value={editValues.change ?? r.change} onChange={e => setEditValues(v => ({ ...v, change: +e.target.value }))} placeholder="% Change" className="bg-white/5 border-white/10 text-white text-xs h-8" />
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => { updateMandiRate(r.id, editValues); setEditingRate(null); toast.success("Updated!"); }} className="bg-primary text-black font-bold text-xs h-7">
                            <Save className="h-3 w-3 mr-1" /> Save
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => setEditingRate(null)} className="text-xs h-7 border border-white/10 text-gray-300">
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{r.img}</span>
                          <div>
                            <p className="text-sm font-semibold">{r.name} <span className="text-gray-500 text-xs">{r.hindi}</span></p>
                            <p className="text-xs text-gray-400">Min: ₹{r.min} · Max: ₹{r.max} · Modal: ₹{r.modal} · {r.change > 0 ? "+" : ""}{r.change}%</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost" onClick={() => { setEditingRate(r.id); setEditValues({}); }} className="border border-white/10 text-gray-300 text-xs h-7">
                            <Edit2 className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => { deleteMandiRate(r.id); toast.success("Deleted."); }} className="border border-red-500/20 text-red-400 text-xs h-7">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* KCC APPLICATIONS */}
          {tab === "kcc" && (
            <div>
              <h2 className="text-xl font-bold mb-4">KCC Applications</h2>
              {kccApplications.length === 0 && <p className="text-gray-500 text-sm">No KCC applications yet.</p>}
              <div className="space-y-3">
                {kccApplications.map(a => (
                  <div key={a.id} className="bg-[#111] border border-white/10 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-bold text-sm">{a.fullName}</h3>
                      <StatusBadge status={a.status} />
                      {a.cardNumber && <span className="text-xs text-primary">Card: {a.cardNumber}</span>}
                    </div>
                    <p className="text-xs text-gray-400">{a.phone} · {a.district} · Land: {a.landSize} acres</p>
                    <p className="text-xs text-gray-400">Aadhaar: {a.aadhaar} · Address: {a.address}</p>
                    {a.status === "pending" && (
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" onClick={() => { approveKccApplication(a.id); toast.success("KCC Approved & Issued!"); }} className="bg-primary text-black font-bold text-xs h-8">
                          <CheckCircle className="h-3.5 w-3.5 mr-1" /> Approve & Issue Card
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => { rejectKccApplication(a.id); toast.error("KCC Rejected."); }} className="border border-red-500/20 text-red-400 text-xs h-8">
                          <XCircle className="h-3.5 w-3.5 mr-1" /> Reject
                        </Button>
                      </div>
                    )}
                    {a.status === "approved" && <p className="text-xs text-primary mt-2">✓ Issued on {a.issueDate}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* GLOBAL ACTIVITY LOG & NOTIFICATIONS */}
          {tab === "notifications" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Global Farmer & Dealer Activity Feed</h2>
                  <p className="text-xs text-gray-400">Real-time alerts and activity history across all panels</p>
                </div>
                <Badge className="bg-primary/20 text-primary border-primary/30">
                  {notifications.length} Total System Alerts
                </Badge>
              </div>

              {notifications.length === 0 ? (
                <div className="bg-[#111] border border-white/10 rounded-xl p-8 text-center text-gray-500 text-sm">
                  No notifications recorded yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {notifications.map((n) => (
                    <div key={n.id} className="bg-[#111] border border-white/10 rounded-xl p-4 flex items-center justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 text-primary">
                          <Bell className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-sm text-white">{n.title}</h3>
                            <Badge className="text-[10px] bg-white/5 border-white/10 text-gray-400 capitalize">{n.category || "General"}</Badge>
                          </div>
                          <p className="text-xs text-gray-300 mt-0.5">{n.message}</p>
                          <span className="text-[10px] text-gray-500 mt-1 block">{n.time}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {n.link && (
                          <Link to={n.link} className="flex items-center gap-1 text-xs text-primary hover:underline bg-primary/10 border border-primary/20 rounded-lg px-2.5 py-1.5 font-bold">
                            View <ExternalLink className="h-3 w-3" />
                          </Link>
                        )}
                        <Button size="sm" variant="ghost" onClick={() => deleteNotification(n.id)} className="text-xs text-red-400 hover:text-red-300 border border-red-500/20 h-8">
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
