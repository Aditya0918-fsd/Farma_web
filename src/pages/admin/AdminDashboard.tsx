import { useState } from "react";
import AdminSidebar from "./AdminSidebar.tsx";
import AdminHeader from "./AdminHeader.tsx";
import type { AdminTab } from "./AdminSidebar.tsx";

import {
  INITIAL_FARMERS,
  INITIAL_DEALERS,
  INITIAL_VERIFICATIONS,
  INITIAL_REQUESTS,
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_TRANSACTIONS,
  INITIAL_PAYOUTS,
  INITIAL_COMPLAINTS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_ROLES,
  INITIAL_ADMIN_USERS,
  INITIAL_AUDIT_LOGS,
  INITIAL_SETTINGS
} from "./mockData.ts";

import DashboardView from "./views/DashboardView.tsx";
import FarmersView from "./views/FarmersView.tsx";
import DealersView from "./views/DealersView.tsx";
import VerificationsView from "./views/VerificationsView.tsx";
import RequestsView from "./views/RequestsView.tsx";
import ProductsView from "./views/ProductsView.tsx";
import OrdersView from "./views/OrdersView.tsx";
import PaymentsView from "./views/PaymentsView.tsx";
import PayoutsView from "./views/PayoutsView.tsx";
import ComplaintsView from "./views/ComplaintsView.tsx";
import AnnouncementsView from "./views/AnnouncementsView.tsx";
import ReportsView from "./views/ReportsView.tsx";
import RolesView from "./views/RolesView.tsx";
import AdminUsersView from "./views/AdminUsersView.tsx";
import AuditLogsView from "./views/AuditLogsView.tsx";
import SettingsView from "./views/SettingsView.tsx";

import { useApp } from "@/context/AppContext.tsx";

export default function AdminDashboard() {
  const { adminLogout } = useApp();
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Data Stores
  const [farmers, setFarmers] = useState(INITIAL_FARMERS);
  const [dealers, setDealers] = useState(INITIAL_DEALERS);
  const [verifications, setVerifications] = useState(INITIAL_VERIFICATIONS);
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [transactions] = useState(INITIAL_TRANSACTIONS);
  const [payouts, setPayouts] = useState(INITIAL_PAYOUTS);
  const [complaints, setComplaints] = useState(INITIAL_COMPLAINTS);
  const [announcements, setAnnouncements] = useState(INITIAL_ANNOUNCEMENTS);
  const [roles, setRoles] = useState(INITIAL_ROLES);
  const [adminUsers, setAdminUsers] = useState(INITIAL_ADMIN_USERS);
  const [auditLogs] = useState(INITIAL_AUDIT_LOGS);
  const [settings, setSettings] = useState(INITIAL_SETTINGS);

  const pendingVerificationsCount = verifications.filter((v) => v.status === "pending").length;
  const pendingRequestsCount = requests.filter((r) => r.status === "new" || r.status === "in_review").length;

  const TAB_LABELS: Record<AdminTab, string> = {
    dashboard: "Dashboard Overview",
    farmers: "Farmers Management",
    farmer_profile: "Farmer Profile Details",
    dealers: "Dealers Management",
    dealer_profile: "Dealer Profile Details",
    verifications: "Verifications Center",
    requests: "Requests & Inquiries",
    request_details: "Request Details & Resolution",
    products: "Products Management",
    orders: "Orders Management",
    order_details: "Order Tracking & Details",
    payments: "Payments & Transactions",
    payouts: "Payouts & Commissions",
    complaints: "Complaints & Disputes",
    announcements: "Communications & Announcements",
    reports: "Reports & Analytics",
    roles: "Roles & Permissions Matrix",
    admin_users: "Admin Users Management",
    audit_logs: "System Audit Logs",
    settings: "Platform Configuration Settings"
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      {/* Left Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        pendingVerificationsCount={pendingVerificationsCount}
        pendingRequestsCount={pendingRequestsCount}
        onLogout={adminLogout}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <AdminHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeTabLabel={TAB_LABELS[activeTab]}
          onOpenSidebar={() => setSidebarOpen(true)}
        />

        {/* View Component Render */}
        <main className="flex-1 p-3 sm:p-6 overflow-y-auto">
          {activeTab === "dashboard" && (
            <DashboardView onNavigate={(tab) => setActiveTab(tab as AdminTab)} />
          )}
          {activeTab === "farmers" && (
            <FarmersView farmers={farmers} setFarmers={setFarmers} />
          )}
          {activeTab === "dealers" && (
            <DealersView dealers={dealers} setDealers={setDealers} />
          )}
          {activeTab === "verifications" && (
            <VerificationsView verifications={verifications} setVerifications={setVerifications} />
          )}
          {activeTab === "requests" && (
            <RequestsView requests={requests} setRequests={setRequests} />
          )}
          {activeTab === "products" && (
            <ProductsView products={products} setProducts={setProducts} />
          )}
          {activeTab === "orders" && (
            <OrdersView orders={orders} setOrders={setOrders} />
          )}
          {activeTab === "payments" && (
            <PaymentsView transactions={transactions} />
          )}
          {activeTab === "payouts" && (
            <PayoutsView payouts={payouts} setPayouts={setPayouts} />
          )}
          {activeTab === "complaints" && (
            <ComplaintsView complaints={complaints} setComplaints={setComplaints} />
          )}
          {activeTab === "announcements" && (
            <AnnouncementsView announcements={announcements} setAnnouncements={setAnnouncements} />
          )}
          {activeTab === "reports" && <ReportsView />}
          {activeTab === "roles" && (
            <RolesView roles={roles} setRoles={setRoles} />
          )}
          {activeTab === "admin_users" && (
            <AdminUsersView adminUsers={adminUsers} setAdminUsers={setAdminUsers} />
          )}
          {activeTab === "audit_logs" && (
            <AuditLogsView auditLogs={auditLogs} />
          )}
          {activeTab === "settings" && (
            <SettingsView settings={settings} setSettings={setSettings} />
          )}
        </main>
      </div>
    </div>
  );
}
