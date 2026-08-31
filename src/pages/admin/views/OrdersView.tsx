import { useState } from "react";
import { Search, Eye, ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Button } from "@/components/ui/button.tsx";
import type { OrderItem } from "../types.ts";
import OrderDetailsView from "./OrderDetailsView.tsx";

interface OrdersViewProps {
  orders: OrderItem[];
  setOrders: React.Dispatch<React.SetStateAction<OrderItem[]>>;
}

export default function OrdersView({ orders, setOrders }: OrdersViewProps) {
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);
  const [search, setSearch] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders = orders.filter((o) => {
    const matchSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.buyer.toLowerCase().includes(search.toLowerCase()) ||
      o.dealer.toLowerCase().includes(search.toLowerCase()) ||
      o.product.toLowerCase().includes(search.toLowerCase());
    const matchPayment = paymentFilter === "all" || o.paymentStatus === paymentFilter;
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    return matchSearch && matchPayment && matchStatus;
  });

  const handleOrderChange = (updated: OrderItem) => {
    setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
    setSelectedOrder(updated);
  };

  if (selectedOrder) {
    return (
      <OrderDetailsView
        order={selectedOrder}
        onOrderChange={handleOrderChange}
        onBack={() => setSelectedOrder(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <div className="bg-[#111] border border-white/10 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Payment Filter */}
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="bg-[#1a1a1a] border border-white/10 text-white text-xs rounded-xl px-3 py-2 outline-none cursor-pointer"
          >
            <option value="all">All Payment</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="refunded">Refunded</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#1a1a1a] border border-white/10 text-white text-xs rounded-xl px-3 py-2 outline-none cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="placed">Placed</option>
            <option value="confirmed">Confirmed</option>
            <option value="processing">Processing</option>
            <option value="dispatched">Dispatched</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>

          {/* Search Input */}
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search order ID, buyer, dealer..."
              className="bg-white/5 border-white/10 text-white text-xs pl-9 h-9 rounded-xl"
            />
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10 text-gray-400 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Order ID</th>
                <th className="py-3.5 px-4">Buyer</th>
                <th className="py-3.5 px-4">Dealer</th>
                <th className="py-3.5 px-4">Product</th>
                <th className="py-3.5 px-4">Qty</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Payment</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredOrders.map((o) => (
                <tr key={o.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">{o.id}</td>
                  <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                    <ShoppingCart className="h-3.5 w-3.5 text-emerald-400" />
                    {o.buyer}
                  </td>
                  <td className="py-3.5 px-4 text-gray-300">{o.dealer}</td>
                  <td className="py-3.5 px-4 text-gray-200">{o.product}</td>
                  <td className="py-3.5 px-4 text-gray-300 font-mono">{o.qty}</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-400">₹{o.amount.toLocaleString("en-IN")}</td>
                  <td className="py-3.5 px-4">
                    <Badge
                      className={
                        o.status === "confirmed" || o.status === "delivered" || o.status === "completed"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : o.status === "processing" || o.status === "dispatched"
                          ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                          : "bg-red-500/10 text-red-400 border-red-500/20"
                      }
                    >
                      {o.status}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge className="bg-emerald-500/10 text-emerald-400">{o.paymentStatus}</Badge>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setSelectedOrder(o)}
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
