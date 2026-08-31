import React, { useState } from "react";
import { Search, Plus, Trash2, Package } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import type { ProductItem } from "../types.ts";
import { toast } from "sonner";

interface ProductsViewProps {
  products: ProductItem[];
  setProducts: React.Dispatch<React.SetStateAction<ProductItem[]>>;
}

export default function ProductsView({ products, setProducts }: ProductsViewProps) {
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newProd, setNewProd] = useState<Partial<ProductItem>>({
    name: "",
    seller: "Rajesh Kumar",
    category: "Grains",
    quantity: "100 Quintal",
    price: 2200,
    status: "active"
  });

  const filteredProducts = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.seller.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === "all" || p.category.toLowerCase() === catFilter.toLowerCase();
    const matchStatus = statusFilter === "all" || p.status === statusFilter;
    return matchSearch && matchCat && matchStatus;
  });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProd.name || !newProd.price) {
      toast.error("Product name and price are required.");
      return;
    }
    const created: ProductItem = {
      id: `PROD${Math.floor(100 + Math.random() * 900)}`,
      name: newProd.name || "New Product",
      seller: newProd.seller || "Rajesh Kumar",
      sellerType: "Farmer",
      category: newProd.category || "Grains",
      quantity: newProd.quantity || "50 Quintal",
      price: Number(newProd.price) || 2000,
      status: "active"
    };
    setProducts((prev) => [created, ...prev]);
    setIsAddModalOpen(false);
    toast.success(`Product ${created.name} added!`);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    toast.success("Product deleted.");
  };

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <div className="bg-[#111] border border-white/10 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Category Filter */}
          <select
            value={catFilter}
            onChange={(e) => setCatFilter(e.target.value)}
            className="bg-[#1a1a1a] border border-white/10 text-white text-xs rounded-xl px-3 py-2 outline-none cursor-pointer"
          >
            <option value="all">All Categories</option>
            <option value="grains">Grains</option>
            <option value="cash crops">Cash Crops</option>
            <option value="inputs">Inputs & Fertilizers</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#1a1a1a] border border-white/10 text-white text-xs rounded-xl px-3 py-2 outline-none cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="out_of_stock">Out of Stock</option>
          </select>

          {/* Search Input */}
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search product name, seller..."
              className="bg-white/5 border-white/10 text-white text-xs pl-9 h-9 rounded-xl"
            />
          </div>
        </div>

        <Button onClick={() => setIsAddModalOpen(true)} className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs h-9">
          <Plus className="h-4 w-4 mr-1" /> Add Product
        </Button>
      </div>

      {/* Products Table */}
      <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10 text-gray-400 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Product ID</th>
                <th className="py-3.5 px-4">Name</th>
                <th className="py-3.5 px-4">Seller</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Quantity</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">{p.id}</td>
                  <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                    <Package className="h-4 w-4 text-emerald-400" />
                    {p.name}
                  </td>
                  <td className="py-3.5 px-4 text-gray-300">{p.seller}</td>
                  <td className="py-3.5 px-4 text-gray-300">{p.category}</td>
                  <td className="py-3.5 px-4 text-gray-300 font-mono">{p.quantity}</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-400">₹{p.price.toLocaleString("en-IN")}</td>
                  <td className="py-3.5 px-4">
                    <Badge
                      className={
                        p.status === "active"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : p.status === "pending"
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          : "bg-red-500/10 text-red-400 border-red-500/20"
                      }
                    >
                      {p.status}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteProduct(p.id)}
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

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white border-b border-white/10 pb-3">Add New Product</h3>
            <form onSubmit={handleAddProduct} className="space-y-3 text-xs">
              <div>
                <label className="text-gray-300 mb-1 block font-semibold">Product Name *</label>
                <Input
                  value={newProd.name}
                  onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                  placeholder="e.g. Organic Wheat"
                  className="bg-white/5 border-white/10 text-white text-xs h-9"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-gray-300 mb-1 block font-semibold">Category</label>
                  <Input
                    value={newProd.category}
                    onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}
                    placeholder="Grains / Seeds"
                    className="bg-white/5 border-white/10 text-white text-xs h-9"
                  />
                </div>
                <div>
                  <label className="text-gray-300 mb-1 block font-semibold">Price (₹/Qtl or Bag)</label>
                  <Input
                    type="number"
                    value={newProd.price}
                    onChange={(e) => setNewProd({ ...newProd, price: Number(e.target.value) })}
                    placeholder="2350"
                    className="bg-white/5 border-white/10 text-white text-xs h-9"
                  />
                </div>
              </div>
              <div>
                <label className="text-gray-300 mb-1 block font-semibold">Quantity Available</label>
                <Input
                  value={newProd.quantity}
                  onChange={(e) => setNewProd({ ...newProd, quantity: e.target.value })}
                  placeholder="e.g. 150 Quintal"
                  className="bg-white/5 border-white/10 text-white text-xs h-9"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <Button type="button" variant="ghost" onClick={() => setIsAddModalOpen(false)} className="text-xs text-gray-300 border border-white/10">
                  Cancel
                </Button>
                <Button type="submit" className="bg-emerald-500 text-black font-bold text-xs">
                  Save Product
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
