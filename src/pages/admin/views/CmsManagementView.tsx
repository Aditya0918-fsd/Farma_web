import { useState } from "react";
import { FileText, Plus, Eye, Edit, Trash2, Globe, FileCheck, Image, Search } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { toast } from "sonner";

interface CmsPage {
  id: string;
  title: string;
  slug: string;
  type: "Landing" | "About" | "Terms" | "Privacy" | "Blog" | "FAQ" | "Custom";
  status: "published" | "draft" | "archived";
  lastUpdated: string;
  author: string;
}

interface CmsBanner {
  id: string;
  title: string;
  location: string;
  image: string;
  status: "active" | "inactive";
  clicks: number;
}

export default function CmsManagementView() {
  const [activeTab, setActiveTab] = useState<"pages" | "banners" | "announcements">("pages");
  const [pages, setPages] = useState<CmsPage[]>([]);
  const [banners, setBanners] = useState<CmsBanner[]>([]);
  const [search, setSearch] = useState("");
  const [showPageModal, setShowPageModal] = useState(false);
  const [pageForm, setPageForm] = useState({ title: "", slug: "", type: "Custom", content: "" });

  const statusColor: Record<string, string> = {
    published: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    draft: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    archived: "bg-gray-500/10 text-gray-400 border-gray-500/20",
  };

  const filteredPages = pages.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.slug.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreatePage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pageForm.title || !pageForm.slug) {
      toast.error("Please fill title and slug.");
      return;
    }
    const page: CmsPage = {
      id: `page-${Date.now()}`,
      title: pageForm.title,
      slug: pageForm.slug,
      type: pageForm.type as CmsPage["type"],
      status: "draft",
      lastUpdated: new Date().toLocaleDateString("en-IN"),
      author: "Admin",
    };
    setPages((prev) => [page, ...prev]);
    setShowPageModal(false);
    setPageForm({ title: "", slug: "", type: "Custom", content: "" });
    toast.success("CMS page created as draft.");
  };

  const handleTogglePageStatus = (id: string) => {
    setPages((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const next = p.status === "published" ? "draft" : "published";
          return { ...p, status: next, lastUpdated: new Date().toLocaleDateString("en-IN") };
        }
        return p;
      })
    );
  };

  const handleDeletePage = (id: string) => {
    setPages((prev) => prev.filter((p) => p.id !== id));
    toast.success("Page deleted.");
  };

  const STATS = [
    { label: "Total Pages", value: pages.length, color: "emerald" },
    { label: "Published", value: pages.filter((p) => p.status === "published").length, color: "blue" },
    { label: "Drafts", value: pages.filter((p) => p.status === "draft").length, color: "amber" },
    { label: "Banners", value: banners.length, color: "purple" },
  ];

  const colorMap: Record<string, string> = {
    emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#111] border border-white/10 rounded-2xl p-5 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <FileText className="h-5 w-5 text-emerald-400" /> CMS / Pages Management
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Manage website pages, banners, and published content from one place.
          </p>
        </div>
        {activeTab === "pages" && (
          <Button onClick={() => setShowPageModal(true)} className="bg-emerald-500 text-black font-bold text-xs h-9">
            <Plus className="h-3.5 w-3.5 mr-1.5" /> New Page
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map((s) => (
          <div key={s.label} className={`bg-[#111] border rounded-2xl p-4 shadow-lg ${colorMap[s.color]}`}>
            <p className="text-xs text-gray-400 font-bold">{s.label}</p>
            <p className={`text-2xl font-black mt-2`} style={{ fontFamily: "Rajdhani, sans-serif" }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Sub Tabs */}
      <div className="bg-[#111] border border-white/10 rounded-2xl p-2 flex gap-2">
        {[
          { id: "pages" as const, label: "Pages", icon: FileText },
          { id: "banners" as const, label: "Banners & Media", icon: Image },
          { id: "announcements" as const, label: "Site Announcements", icon: Globe },
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

      {/* Pages Tab */}
      {activeTab === "pages" && (
        <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <h3 className="font-bold text-sm text-white">All Pages ({filteredPages.length})</h3>
            <div className="relative w-56">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search pages..."
                className="bg-white/5 border-white/10 text-white text-xs pl-9 h-9 rounded-xl"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 text-gray-400 font-bold uppercase">
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Slug / URL</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Author</th>
                  <th className="py-3 px-4">Last Updated</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredPages.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-16 text-gray-500">
                      <FileText className="h-12 w-12 mx-auto mb-3 opacity-20" />
                      <p className="font-semibold text-sm">No pages created yet</p>
                      <p className="text-[11px] mt-1 text-gray-600">Create your first page using the "New Page" button above.</p>
                    </td>
                  </tr>
                ) : (
                  filteredPages.map((p) => (
                    <tr key={p.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 font-bold text-white">{p.title}</td>
                      <td className="py-3 px-4 font-mono text-emerald-400">/{p.slug}</td>
                      <td className="py-3 px-4 text-gray-400">{p.type}</td>
                      <td className="py-3 px-4 text-gray-400">{p.author}</td>
                      <td className="py-3 px-4 text-gray-400">{p.lastUpdated}</td>
                      <td className="py-3 px-4">
                        <Badge className={statusColor[p.status]}>{p.status}</Badge>
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleTogglePageStatus(p.id)}
                          className="text-xs text-blue-400 border border-blue-500/20 h-7 px-2"
                        >
                          {p.status === "published" ? "Unpublish" : "Publish"}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeletePage(p.id)}
                          className="text-xs text-red-400 border border-red-500/20 h-7 px-2"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Banners Tab */}
      {activeTab === "banners" && (
        <div className="bg-[#111] border border-white/10 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sm text-white">Banners & Media</h3>
            <Button className="bg-emerald-500 text-black font-bold text-xs h-9">
              <Plus className="h-3.5 w-3.5 mr-1.5" /> Add Banner
            </Button>
          </div>
          <div className="text-center py-16 text-gray-500">
            <Image className="h-12 w-12 mx-auto mb-3 opacity-20" />
            <p className="font-semibold text-sm">No banners added yet</p>
            <p className="text-[11px] mt-1 text-gray-600">Add homepage banners, promotional images, and media here.</p>
          </div>
        </div>
      )}

      {/* Site Announcements Tab */}
      {activeTab === "announcements" && (
        <div className="bg-[#111] border border-white/10 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sm text-white">Site-Wide Announcements</h3>
            <Button className="bg-emerald-500 text-black font-bold text-xs h-9">
              <Plus className="h-3.5 w-3.5 mr-1.5" /> Add Announcement
            </Button>
          </div>
          <div className="text-center py-16 text-gray-500">
            <Globe className="h-12 w-12 mx-auto mb-3 opacity-20" />
            <p className="font-semibold text-sm">No site announcements</p>
            <p className="text-[11px] mt-1 text-gray-600">Site-wide banners and ticker messages will appear here.</p>
          </div>
        </div>
      )}

      {/* Create Page Modal */}
      {showPageModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <h3 className="text-sm font-bold text-white border-b border-white/10 pb-3">Create New Page</h3>
            <form onSubmit={handleCreatePage} className="space-y-3 text-xs">
              <div>
                <label className="text-gray-400 font-semibold mb-1 block">Page Title *</label>
                <Input
                  value={pageForm.title}
                  onChange={(e) => setPageForm({ ...pageForm, title: e.target.value })}
                  placeholder="e.g. About Krivexa"
                  className="bg-white/5 border-white/10 text-white text-xs h-9"
                  required
                />
              </div>
              <div>
                <label className="text-gray-400 font-semibold mb-1 block">URL Slug *</label>
                <Input
                  value={pageForm.slug}
                  onChange={(e) => setPageForm({ ...pageForm, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })}
                  placeholder="e.g. about-us"
                  className="bg-white/5 border-white/10 text-white text-xs h-9 font-mono"
                  required
                />
              </div>
              <div>
                <label className="text-gray-400 font-semibold mb-1 block">Page Type</label>
                <select
                  value={pageForm.type}
                  onChange={(e) => setPageForm({ ...pageForm, type: e.target.value })}
                  className="w-full bg-[#1a1a1a] border border-white/10 text-white text-xs rounded-xl px-3 py-2.5 outline-none"
                >
                  {["Landing", "About", "Terms", "Privacy", "Blog", "FAQ", "Custom"].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-gray-400 font-semibold mb-1 block">Page Content</label>
                <textarea
                  value={pageForm.content}
                  onChange={(e) => setPageForm({ ...pageForm, content: e.target.value })}
                  placeholder="Enter page content..."
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 text-white text-xs rounded-xl px-3 py-2 outline-none resize-none"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <Button type="button" variant="ghost" onClick={() => setShowPageModal(false)} className="flex-1 text-xs border border-white/10">Cancel</Button>
                <Button type="submit" className="flex-1 bg-emerald-500 text-black font-bold text-xs">Create Page</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
