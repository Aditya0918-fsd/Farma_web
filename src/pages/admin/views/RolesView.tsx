import { useState } from "react";
import { ShieldCheck, Plus, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import type { RoleItem } from "../types.ts";
import { toast } from "sonner";

interface RolesViewProps {
  roles: RoleItem[];
  setRoles: React.Dispatch<React.SetStateAction<RoleItem[]>>;
}

export default function RolesView({ roles, setRoles }: RolesViewProps) {
  const [selectedRole, setSelectedRole] = useState<RoleItem>(roles[0]);

  const handleTogglePermission = (moduleName: string, permKey: "view" | "create" | "edit" | "delete" | "approve") => {
    const updated = {
      ...selectedRole,
      permissions: selectedRole.permissions.map((p) =>
        p.module === moduleName ? { ...p, [permKey]: !p[permKey] } : p
      )
    };
    setSelectedRole(updated);
    setRoles((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
    toast.success("Permission updated.");
  };

  return (
    <div className="space-y-6">
      {/* Roles List */}
      <div className="bg-[#111] border border-white/10 rounded-2xl p-5 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-400" /> Admin Roles & Access Control
          </h2>
          <Button onClick={() => toast.info("Create Role modal ready.")} className="bg-emerald-500 text-black font-bold text-xs h-8">
            <Plus className="h-4 w-4 mr-1" /> Add Role
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {roles.map((r) => (
            <div
              key={r.id}
              onClick={() => setSelectedRole(r)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selectedRole.id === r.id
                  ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400"
                  : "bg-white/5 border-white/10 text-gray-300 hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <p className="font-bold text-white text-xs">{r.roleName}</p>
                <Badge className="bg-white/10 text-[10px]">{r.userCount} Users</Badge>
              </div>
              <p className="text-[10px] text-gray-400 leading-tight">{r.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Permission Matrix Table */}
      <div className="bg-[#111] border border-white/10 rounded-2xl p-5 space-y-4 shadow-xl">
        <h3 className="font-bold text-sm text-white">
          Permission Matrix for <span className="text-emerald-400 font-bold">{selectedRole.roleName}</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10 text-gray-400 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Module</th>
                <th className="py-3.5 px-4 text-center">View</th>
                <th className="py-3.5 px-4 text-center">Create</th>
                <th className="py-3.5 px-4 text-center">Edit</th>
                <th className="py-3.5 px-4 text-center">Delete</th>
                <th className="py-3.5 px-4 text-center">Approve</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {selectedRole.permissions.map((perm) => (
                <tr key={perm.module} className="hover:bg-white/5 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">{perm.module}</td>
                  {(["view", "create", "edit", "delete", "approve"] as const).map((key) => {
                    const isChecked = perm[key];
                    return (
                      <td key={key} className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => handleTogglePermission(perm.module, key)}
                          className={`w-6 h-6 rounded-md flex items-center justify-center mx-auto cursor-pointer transition-colors ${
                            isChecked ? "bg-emerald-500 text-black font-bold" : "bg-white/10 text-gray-500"
                          }`}
                        >
                          {isChecked ? <Check className="h-3.5 w-3.5" /> : <X className="h-3 w-3" />}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
