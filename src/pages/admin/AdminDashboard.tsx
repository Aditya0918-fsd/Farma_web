import { useState, useEffect, useCallback } from "react";
import AdminSidebar from "./AdminSidebar.tsx";
import AdminHeader from "./AdminHeader.tsx";
import type { AdminTab } from "./AdminSidebar.tsx";
import type {
  Farmer, Dealer, VerificationItem, RequestItem, ProductItem,
  OrderItem, TransactionItem, PayoutItem, ComplaintItem,
  AnnouncementItem, RoleItem, AdminUserItem, AuditLogItem, AdminSettings
} from "./types.ts";

import DashboardView from "./views/DashboardView";
import FarmersView from "./views/FarmersView";
import DealersView from "./views/DealersView";
import VerificationsView from "./views/VerificationsView";
import RequestsView from "./views/RequestsView";
import ProductsView from "./views/ProductsView";
import OrdersView from "./views/OrdersView";
import PaymentsView from "./views/PaymentsView";
import PayoutsView from "./views/PayoutsView";
import ComplaintsView from "./views/ComplaintsView";
import AnnouncementsView from "./views/AnnouncementsView";
import ReportsView from "./views/ReportsView";
import RolesView from "./views/RolesView";
import AdminUsersView from "./views/AdminUsersView";
import AuditLogsView from "./views/AuditLogsView";
import SettingsView from "./views/SettingsView";
import FinanceWalletView from "./views/FinanceWalletView";
import NotificationsManagementView from "./views/NotificationsManagementView";
import SupportTicketsView from "./views/SupportTicketsView";
import CmsManagementView from "./views/CmsManagementView";
import KisanCardView from "./views/KisanCardView";
import ServicesView from "./views/ServicesView";

import { useApp } from "@/context/AppContext.tsx";
import { api } from "@/services/api.ts";

const EMPTY_SETTINGS: AdminSettings = {
  platformName: "Krivexa",
  supportEmail: "support@krivexa.in",
  phone: "+91 9876543210",
  address: "Patna, Bihar - 800001",
  timezone: "Asia/Kolkata",
  autoApproveFarmers: false,
  autoApproveDealers: false,
  commissionRatePct: 5,
  maintenanceMode: false,
};

export default function AdminDashboard() {
  const { adminLogout, adminName, kccApplications, loadAllKccApplications } = useApp();
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // ─── Data Stores (all empty by default — populated from DB) ───
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [verifications, setVerifications] = useState<VerificationItem[]>([]);
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [transactions, setTransactions] = useState<TransactionItem[]>([]);
  const [payouts, setPayouts] = useState<PayoutItem[]>([]);
  const [complaints, setComplaints] = useState<ComplaintItem[]>([]);
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [roles, setRoles] = useState<RoleItem[]>([]);
  const [adminUsers, setAdminUsers] = useState<AdminUserItem[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>([]);
  const [settings, setSettings] = useState<AdminSettings>(EMPTY_SETTINGS);

  // ─── Load data from MongoDB on mount ───
  const loadAdminData = useCallback(async () => {
    setLoading(true);
    try {
      // Load KCC applications from DB
      await loadAllKccApplications();

      // Load users as farmers/dealers
      const users = await api.getUsers();
      if (users && users.length > 0) {
        const farmerUsers = users.filter((u: any) => u.role === "farmer").map((u: any, idx: number) => ({
          id: u.id || `FRM${1000 + idx}`,
          name: u.fullName || u.name || "—",
          phone: u.phone || "—",
          email: u.email || "—",
          location: u.district || u.state || "—",
          crops: u.occupation || "—",
          status: "active" as const,
          verified: (u.verificationStatus === "Verified" ? "verified" : "pending") as "verified" | "pending" | "unverified",
          totalProducts: 0,
          totalOrders: 0,
          totalSales: 0,
          totalEarnings: 0,
          farmName: u.businessName || `${u.fullName || "Farmer"} Farm`,
          totalLand: u.landSize || "—",
          landType: "—",
          mainCrops: u.occupation || "—",
          organicCertified: "No" as const,
          address: [u.village, u.district, u.state].filter(Boolean).join(", ") || "—",
          dob: "—",
          createdAt: u.createdAt || new Date().toISOString().split("T")[0],
        }));

        const dealerUsers = users.filter((u: any) => u.role === "dealer").map((u: any, idx: number) => ({
          id: u.id || `DLR${2000 + idx}`,
          businessName: u.businessName || u.fullName || "—",
          owner: u.fullName || "—",
          phone: u.phone || "—",
          email: u.email || "—",
          location: u.district || u.state || "—",
          status: "active" as const,
          verified: (u.verificationStatus === "Verified" ? "verified" : "pending") as "verified" | "pending" | "unverified",
          totalOrders: 0,
          totalPurchases: 0,
          outstanding: 0,
          businessType: u.dealerType || "—",
          gstin: "—",
          address: [u.village, u.district, u.state].filter(Boolean).join(", ") || "—",
          createdAt: u.createdAt || new Date().toISOString().split("T")[0],
        }));

        if (farmerUsers.length > 0) setFarmers(farmerUsers);
        if (dealerUsers.length > 0) setDealers(dealerUsers);
      }

      // Load orders from DB
      const dbOrders = await api.getOrders();
      if (dbOrders && dbOrders.length > 0) {
        setOrders(dbOrders.map((o: any, idx: number) => ({
          id: o.id || `ORD${8000 + idx}`,
          buyer: o.userName || o.userId || "—",
          buyerId: o.userId || "—",
          dealer: o.assignedDealerName || "—",
          dealerId: "—",
          product: o.items?.[0]?.name || "—",
          qty: String(o.items?.length || 1),
          amount: o.totalAmount || 0,
          status: (o.status?.toLowerCase() || "placed") as OrderItem["status"],
          paymentStatus: "paid",
          paymentMethod: o.paymentMethod || "—",
          date: o.createdAt ? new Date(o.createdAt).toLocaleDateString("en-IN") : "—",
          tracking: [],
        })));
      }

      // Load crop listings as products
      const crops = await api.getCrops();
      if (crops && crops.length > 0) {
        setProducts(crops.map((c: any) => ({
          id: c.id || `PROD${Math.random()}`,
          name: c.cropName || "—",
          seller: c.sellerName || "—",
          sellerType: "Farmer" as const,
          category: "Crops",
          quantity: c.weight || "—",
          price: c.price || 0,
          status: (c.status || "pending") as ProductItem["status"],
          image: c.image,
        })));
      }

      // Dealer listings as products too
      const dealerListings = await api.getDealerListings();
      if (dealerListings && dealerListings.length > 0) {
        const dlProducts = dealerListings.map((d: any) => ({
          id: d.id || `PROD${Math.random()}`,
          name: d.title || "—",
          seller: d.dealerName || "—",
          sellerType: "Dealer" as const,
          category: d.category || d.type || "—",
          quantity: d.unit || "—",
          price: typeof d.price === "number" ? d.price : 0,
          status: (d.status || "pending") as ProductItem["status"],
          image: d.image,
        }));
        setProducts(prev => [...prev, ...dlProducts]);
      }

      // Labour/Machinery bookings as requests
      const labour = await api.getLabourBookings();
      const machinery = await api.getMachineryBookings();
      const expert = await api.getExpertQueries();
      const reqItems: RequestItem[] = [];

      if (labour && labour.length > 0) {
        labour.forEach((l: any, idx: number) => {
          reqItems.push({
            id: l.id || `RQ${3000 + idx}`,
            user: l.userName || "—",
            userType: "Farmer",
            type: "Labour Booking",
            subject: `${l.labourType} Request`,
            date: l.createdAt ? new Date(l.createdAt).toLocaleDateString("en-IN") : "—",
            status: l.status === "assigned" ? "resolved" : l.status === "pending" ? "new" : "in_review",
            priority: "Medium",
            description: `Need ${l.count} ${l.labourType}(s) for ${l.days} days from ${l.startDate}`,
            assignedTo: "—",
            conversation: [],
          });
        });
      }

      if (machinery && machinery.length > 0) {
        machinery.forEach((m: any, idx: number) => {
          reqItems.push({
            id: m.id || `RQ${4000 + idx}`,
            user: m.userName || "—",
            userType: "Farmer",
            type: "Machinery Booking",
            subject: `${m.machineryType} Booking`,
            date: m.createdAt ? new Date(m.createdAt).toLocaleDateString("en-IN") : "—",
            status: m.status === "allotted" ? "resolved" : m.status === "pending" ? "new" : "closed",
            priority: "Medium",
            description: `Machinery: ${m.machineryType}, Date: ${m.bookingDate}, Duration: ${m.durationHours}h`,
            assignedTo: "—",
            conversation: [],
          });
        });
      }

      if (expert && expert.length > 0) {
        expert.forEach((e: any, idx: number) => {
          reqItems.push({
            id: e.id || `RQ${5000 + idx}`,
            user: e.farmerName || "—",
            userType: "Farmer",
            type: "Expert Advice",
            subject: `${e.cropName} Problem`,
            date: e.createdAt ? new Date(e.createdAt).toLocaleDateString("en-IN") : "—",
            status: e.status === "resolved" ? "resolved" : "new",
            priority: "High",
            description: e.problemDetails || "—",
            assignedTo: "—",
            conversation: [],
          });
        });
      }

      if (reqItems.length > 0) setRequests(reqItems);

      // Notifications as audit logs
      const notifs = await api.getNotifications();
      if (notifs && notifs.length > 0) {
        setAuditLogs(notifs.map((n: any, idx: number) => ({
          id: n.id || `LOG${idx}`,
          adminName: "System",
          action: n.title || "Notification",
          module: n.category || "General",
          details: n.message || "—",
          dateTime: n.time || new Date().toISOString(),
          ipAddress: "—",
        })));
      }
    } catch (err) {
      console.warn("[Admin] Error loading data:", err);
    } finally {
      setLoading(false);
    }
  }, [loadAllKccApplications]);

  useEffect(() => {
    loadAdminData();
  }, [loadAdminData]);

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
    finance_wallet: "Finance & Wallet",
    notifications_mgmt: "Notifications Management",
    support_tickets: "Support Tickets",
    cms_management: "CMS / Pages Management",
    kisan_card: "Krivexa Kisan Card",
    services: "Services Management",
    roles: "Roles & Permissions Matrix",
    admin_users: "Admin Users Management",
    audit_logs: "System Audit Logs",
    settings: "Platform Configuration Settings"
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        pendingVerificationsCount={pendingVerificationsCount}
        pendingRequestsCount={pendingRequestsCount}
        onLogout={adminLogout}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeTabLabel={TAB_LABELS[activeTab]}
          adminName={adminName}
          onOpenSidebar={() => setSidebarOpen(true)}
          onNavigateTab={(tab) => setActiveTab(tab as AdminTab)}
        />

        <main className="flex-1 p-3 sm:p-6 overflow-y-auto">
          {loading && activeTab === "dashboard" && (
            <div className="flex items-center justify-center h-64">
              <div className="text-center space-y-3">
                <div className="w-10 h-10 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-gray-400 text-sm">Loading live data from database...</p>
              </div>
            </div>
          )}

          {!loading && activeTab === "dashboard" && (
            <DashboardView
              onNavigate={(tab) => setActiveTab(tab as AdminTab)}
              farmers={farmers}
              dealers={dealers}
              orders={orders}
              kccApplications={kccApplications}
            />
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
          {activeTab === "finance_wallet" && <FinanceWalletView />}
          {activeTab === "notifications_mgmt" && <NotificationsManagementView />}
          {activeTab === "support_tickets" && <SupportTicketsView />}
          {activeTab === "cms_management" && <CmsManagementView />}
          {activeTab === "kisan_card" && <KisanCardView />}
          {activeTab === "services" && <ServicesView />}
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
