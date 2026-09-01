// mockData.ts — All initial arrays are EMPTY.
// Admin panel loads all data live from MongoDB via api.ts
import type {
  Farmer,
  Dealer,
  VerificationItem,
  RequestItem,
  ProductItem,
  OrderItem,
  TransactionItem,
  PayoutItem,
  ComplaintItem,
  AnnouncementItem,
  RoleItem,
  AdminUserItem,
  AuditLogItem,
  AdminSettings
} from "./types.ts";

export const INITIAL_FARMERS: Farmer[] = [];
export const INITIAL_DEALERS: Dealer[] = [];
export const INITIAL_VERIFICATIONS: VerificationItem[] = [];
export const INITIAL_REQUESTS: RequestItem[] = [];
export const INITIAL_PRODUCTS: ProductItem[] = [];
export const INITIAL_ORDERS: OrderItem[] = [];
export const INITIAL_TRANSACTIONS: TransactionItem[] = [];
export const INITIAL_PAYOUTS: PayoutItem[] = [];
export const INITIAL_COMPLAINTS: ComplaintItem[] = [];
export const INITIAL_ANNOUNCEMENTS: AnnouncementItem[] = [];
export const INITIAL_AUDIT_LOGS: AuditLogItem[] = [];

export const INITIAL_ROLES: RoleItem[] = [
  {
    id: "ROLE01",
    roleName: "Super Admin",
    description: "Full access to all modules and system controls",
    userCount: 1,
    status: "active",
    permissions: [
      { module: "Farmers", view: true, create: true, edit: true, delete: true, approve: true },
      { module: "Dealers", view: true, create: true, edit: true, delete: true, approve: true },
      { module: "Products", view: true, create: true, edit: true, delete: true, approve: true },
      { module: "Orders", view: true, create: true, edit: true, delete: true, approve: true },
      { module: "Payments", view: true, create: true, edit: true, delete: true, approve: true },
    ],
  },
  {
    id: "ROLE02",
    roleName: "Operations Admin",
    description: "Manage users, orders, requests, and listings",
    userCount: 0,
    status: "active",
    permissions: [
      { module: "Farmers", view: true, create: true, edit: true, delete: false, approve: true },
      { module: "Dealers", view: true, create: true, edit: true, delete: false, approve: true },
      { module: "Products", view: true, create: true, edit: true, delete: true, approve: true },
      { module: "Orders", view: true, create: true, edit: true, delete: false, approve: true },
      { module: "Payments", view: true, create: false, edit: false, delete: false, approve: false },
    ],
  },
];

export const INITIAL_ADMIN_USERS: AdminUserItem[] = [
  {
    id: "ADM001",
    name: "Aditya Saha",
    email: "admin@krivexa.in",
    role: "Super Admin",
    status: "active",
    lastLogin: new Date().toLocaleString("en-IN"),
    phone: "—",
  },
];

export const INITIAL_SETTINGS: AdminSettings = {
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
