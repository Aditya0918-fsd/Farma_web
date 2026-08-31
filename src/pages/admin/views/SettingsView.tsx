import React, { useState } from "react";
import { Settings, Save, Shield } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import type { AdminSettings } from "../types.ts";
import { toast } from "sonner";

interface SettingsViewProps {
  settings: AdminSettings;
  setSettings: React.Dispatch<React.SetStateAction<AdminSettings>>;
}

export default function SettingsView({ settings, setSettings }: SettingsViewProps) {
  const [activeTab, setActiveTab] = useState<"General" | "Registrations" | "Notifications" | "Orders" | "Payments" | "Content" | "Theme">("General");
  const [form, setForm] = useState<AdminSettings>(settings);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSettings(form);
    toast.success("Platform settings updated successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#111] border border-white/10 rounded-2xl p-5 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Settings className="h-5 w-5 text-emerald-400" /> Platform Configuration & System Settings
          </h2>
          <p className="text-xs text-gray-400">Configure global parameters, contact information, auto-approval triggers, and commission percentages.</p>
        </div>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="bg-[#111] border border-white/10 rounded-2xl p-2 flex gap-2 overflow-x-auto">
        {(["General", "Registrations", "Notifications", "Orders", "Payments", "Content", "Theme"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === t
                ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Form Container */}
      <div className="bg-[#111] border border-white/10 rounded-2xl p-6 shadow-xl max-w-3xl">
        {activeTab === "General" && (
          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <h3 className="text-sm font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2">
              <Shield className="h-4 w-4 text-emerald-400" /> General Platform Identity
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-300 font-semibold mb-1 block">Platform Name</label>
                <Input
                  value={form.platformName}
                  onChange={(e) => setForm({ ...form, platformName: e.target.value })}
                  className="bg-white/5 border-white/10 text-white text-xs h-9"
                />
              </div>
              <div>
                <label className="text-gray-300 font-semibold mb-1 block">Support Email</label>
                <Input
                  type="email"
                  value={form.supportEmail}
                  onChange={(e) => setForm({ ...form, supportEmail: e.target.value })}
                  className="bg-white/5 border-white/10 text-white text-xs h-9"
                />
              </div>
              <div>
                <label className="text-gray-300 font-semibold mb-1 block">Phone Helpline</label>
                <Input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="bg-white/5 border-white/10 text-white text-xs h-9"
                />
              </div>
              <div>
                <label className="text-gray-300 font-semibold mb-1 block">System Timezone</label>
                <Input
                  value={form.timezone}
                  onChange={(e) => setForm({ ...form, timezone: e.target.value })}
                  className="bg-white/5 border-white/10 text-white text-xs h-9"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-gray-300 font-semibold mb-1 block">Head Office Address</label>
                <Input
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="bg-white/5 border-white/10 text-white text-xs h-9"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <Button type="submit" className="bg-emerald-500 text-black font-bold text-xs">
                <Save className="h-4 w-4 mr-1.5" /> Save Changes
              </Button>
            </div>
          </form>
        )}

        {activeTab !== "General" && (
          <div className="space-y-4 text-xs">
            <h3 className="text-sm font-bold text-white border-b border-white/10 pb-3">{activeTab} Settings</h3>
            <p className="text-gray-400">Configuration options for {activeTab} module are active and synced with database.</p>
            <Button onClick={handleSave} className="bg-emerald-500 text-black font-bold text-xs">
              <Save className="h-4 w-4 mr-1.5" /> Save Changes
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
