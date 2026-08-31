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

export const INITIAL_FARMERS: Farmer[] = [
  {
    id: "FRM101",
    name: "Rajesh Kumar",
    phone: "9876543210",
    email: "rajeshkumar@email.com",
    location: "Punjab",
    crops: "Wheat, Rice",
    status: "active",
    verified: "verified",
    totalProducts: 12,
    totalOrders: 45,
    totalSales: 345600,
    totalEarnings: 275450,
    farmName: "Rajesh Farms",
    totalLand: "15 Acre",
    landType: "Dam",
    mainCrops: "Wheat, Rice",
    organicCertified: "Yes",
    address: "Village Rajpur, Ludhiana, Punjab - 141001",
    dob: "14 Jan 1980",
    createdAt: "2024-01-15"
  },
  {
    id: "FRM102",
    name: "Suresh Patel",
    phone: "9876543211",
    email: "suresh.patel@email.com",
    location: "Gujarat",
    crops: "Cotton, Groundnut",
    status: "pending",
    verified: "pending",
    totalProducts: 8,
    totalOrders: 22,
    totalSales: 189000,
    totalEarnings: 152000,
    farmName: "Patel Agriculture",
    totalLand: "8 Acre",
    landType: "Irrigated",
    mainCrops: "Cotton, Groundnut",
    organicCertified: "No",
    address: "Anand District, Gujarat - 388001",
    dob: "22 Aug 1985",
    createdAt: "2024-02-10"
  },
  {
    id: "FRM103",
    name: "Manoj Yadav",
    phone: "9876543212",
    email: "manojyadav@email.com",
    location: "Uttar Pradesh",
    crops: "Sugarcane, Wheat",
    status: "active",
    verified: "verified",
    totalProducts: 15,
    totalOrders: 60,
    totalSales: 480000,
    totalEarnings: 390000,
    farmName: "Yadav Crop Estate",
    totalLand: "20 Acre",
    landType: "Canal Irrigated",
    mainCrops: "Sugarcane, Mustard",
    organicCertified: "Yes",
    address: "Meerut, Uttar Pradesh - 250001",
    dob: "05 Mar 1978",
    createdAt: "2023-11-20"
  },
  {
    id: "FRM104",
    name: "Ramesh Tiwari",
    phone: "9876543213",
    email: "ramesh.tiwari@email.com",
    location: "Bihar",
    crops: "Maize, Paddy",
    status: "suspended",
    verified: "unverified",
    totalProducts: 3,
    totalOrders: 5,
    totalSales: 35000,
    totalEarnings: 28000,
    farmName: "Kishan Bhoomi",
    totalLand: "4 Acre",
    landType: "Rainfed",
    mainCrops: "Maize, Paddy",
    organicCertified: "No",
    address: "Begusarai, Bihar - 851101",
    dob: "18 Nov 1990",
    createdAt: "2024-03-01"
  },
  {
    id: "FRM105",
    name: "Abhishek Singh",
    phone: "9876543214",
    email: "abhishek.singh@email.com",
    location: "MP",
    crops: "Soybean, Wheat",
    status: "active",
    verified: "verified",
    totalProducts: 10,
    totalOrders: 38,
    totalSales: 295000,
    totalEarnings: 240000,
    farmName: "Malwa Agri Fields",
    totalLand: "12 Acre",
    landType: "Well Irrigated",
    mainCrops: "Soybean, Gram",
    organicCertified: "Yes",
    address: "Ujjain, Madhya Pradesh - 456001",
    dob: "12 Jul 1988",
    createdAt: "2024-01-28"
  }
];

export const INITIAL_DEALERS: Dealer[] = [
  {
    id: "DLR201",
    businessName: "ABC Agro Traders",
    owner: "Amit Sharma",
    phone: "9876543201",
    email: "contact@abcagro.com",
    location: "Delhi",
    status: "active",
    verified: "verified",
    totalOrders: 128,
    totalPurchases: 1815000,
    outstanding: 125000,
    businessType: "Wholesale & Retail Agri Inputs",
    gstin: "07ABCDE1234F1Z5",
    address: "123, Agro Market, Azadpur, Delhi - 110033",
    createdAt: "2023-10-12"
  },
  {
    id: "DLR202",
    businessName: "Green Field Traders",
    owner: "Pooja Verma",
    phone: "9876543202",
    email: "info@greenfield.com",
    location: "Mumbai",
    status: "pending",
    verified: "pending",
    totalOrders: 45,
    totalPurchases: 640000,
    outstanding: 45000,
    businessType: "Seed & Fertilizer Dealer",
    gstin: "27GHIJK5678L1Z9",
    address: "APMC Market, Vashi, Navi Mumbai - 400703",
    createdAt: "2024-02-15"
  },
  {
    id: "DLR203",
    businessName: "Kisan Krishi Kendra",
    owner: "Rajesh Singh",
    phone: "9876543203",
    email: "kisankrishi@email.com",
    location: "Punjab",
    status: "active",
    verified: "verified",
    totalOrders: 210,
    totalPurchases: 3200000,
    outstanding: 85000,
    businessType: "Machinery & Equipment Dealer",
    gstin: "03LMNOP9012Q1Z3",
    address: "GT Road, Jalandhar, Punjab - 144001",
    createdAt: "2023-08-05"
  },
  {
    id: "DLR204",
    businessName: "Agro Mart Plus",
    owner: "Sandeep Jain",
    phone: "9876543204",
    email: "sandeep@agromart.com",
    location: "Jaipur",
    status: "suspended",
    verified: "unverified",
    totalOrders: 15,
    totalPurchases: 120000,
    outstanding: 30000,
    businessType: "Pesticides & Chemicals Supplier",
    gstin: "08RSTUV3456W1Z7",
    address: "Sikar Road, Jaipur, Rajasthan - 302013",
    createdAt: "2024-03-10"
  },
  {
    id: "DLR205",
    businessName: "Bharati Traders",
    owner: "Vivek Gupta",
    phone: "9876543205",
    email: "bharatitrader@email.com",
    location: "Lucknow",
    status: "active",
    verified: "verified",
    totalOrders: 82,
    totalPurchases: 1150000,
    outstanding: 60000,
    businessType: "General Agri Store",
    gstin: "09XYZAB7890C1Z1",
    address: "Transport Nagar, Lucknow, UP - 226012",
    createdAt: "2024-01-05"
  }
];

export const INITIAL_VERIFICATIONS: VerificationItem[] = [
  {
    id: "VRF001",
    user: "Rajesh Kumar",
    userId: "FRM101",
    type: "Farmer",
    verificationType: "Land Ownership & Aadhaar",
    submittedOn: "20 May 2024",
    documentsCount: 5,
    status: "pending",
    documents: [
      { name: "Aadhaar Card.pdf", type: "Aadhaar" },
      { name: "Khatiyan_Land_Doc.pdf", type: "Land Proof" },
      { name: "Bank_Passbook.jpg", type: "Bank Proof" }
    ]
  },
  {
    id: "VRF002",
    user: "Suresh Patel",
    userId: "FRM102",
    type: "Farmer",
    verificationType: "Identity Proof",
    submittedOn: "19 May 2024",
    documentsCount: 3,
    status: "pending",
    documents: [
      { name: "Aadhaar_Suresh.pdf", type: "Aadhaar" },
      { name: "Voter_ID.jpg", type: "ID Proof" }
    ]
  },
  {
    id: "VRF003",
    user: "ABC Agro Traders",
    userId: "DLR201",
    type: "Dealer",
    verificationType: "GST & Trade License",
    submittedOn: "18 May 2024",
    documentsCount: 6,
    status: "pending",
    documents: [
      { name: "GST_Certificate.pdf", type: "GST" },
      { name: "Trade_License.pdf", type: "License" },
      { name: "PAN_Card.png", type: "PAN" }
    ]
  },
  {
    id: "VRF004",
    user: "Green Field Traders",
    userId: "DLR202",
    type: "Dealer",
    verificationType: "Pesticide License",
    submittedOn: "17 May 2024",
    documentsCount: 4,
    status: "pending",
    documents: [
      { name: "Pesticide_Dealer_License.pdf", type: "License" },
      { name: "Shop_Establishment_Doc.pdf", type: "Registration" }
    ]
  },
  {
    id: "VRF005",
    user: "Manoj Yadav",
    userId: "FRM103",
    type: "Farmer",
    verificationType: "KCC Verification",
    submittedOn: "15 May 2024",
    documentsCount: 2,
    status: "approved",
    documents: [
      { name: "KCC_Passbook.pdf", type: "KCC Proof" }
    ]
  }
];

export const INITIAL_REQUESTS: RequestItem[] = [
  {
    id: "RQ301",
    user: "Rajesh Kumar",
    userType: "Farmer",
    type: "Product Request",
    subject: "New Crop Listing Review",
    date: "20 May 2024",
    status: "new",
    priority: "Medium",
    description: "Requesting approval for 50 Quintal Organic Wheat listing.",
    assignedTo: "Rahul Sharma",
    conversation: [
      {
        sender: "Rajesh Kumar",
        role: "Farmer",
        time: "20 May 2024, 10:15 AM",
        message: "Hello admin, I have submitted my organic wheat batch. Please review and approve."
      }
    ]
  },
  {
    id: "RQ302",
    user: "ABC Agro Traders (DLR201)",
    userType: "Dealer",
    type: "Contact Request",
    subject: "Bulk Purchase Query",
    date: "19 May 2024",
    status: "in_review",
    priority: "High",
    description: "We are interested in purchasing 200 quintal of wheat and 300 quintal of rice. Please share the best price and availability.",
    assignedTo: "Kshitiz Rahul",
    conversation: [
      {
        sender: "ABC Agro Traders",
        role: "Dealer",
        time: "19 May 2024, 11:30 AM",
        message: "Hello team, we want to place a bulk purchase order for Punjab organic wheat."
      },
      {
        sender: "Kshitiz Rahul",
        role: "Admin",
        time: "19 May 2024, 02:15 PM",
        message: "Hello, we have forwarded your request to the top verified farmer group."
      }
    ]
  },
  {
    id: "RQ303",
    user: "Suresh Patel",
    userType: "Farmer",
    type: "Support Request",
    subject: "Payment Issue",
    date: "18 May 2024",
    status: "in_review",
    priority: "High",
    description: "Amount ₹15,000 debited from wallet but payment status showing pending.",
    assignedTo: "Ankit Singh",
    conversation: [
      {
        sender: "Suresh Patel",
        role: "Farmer",
        time: "18 May 2024, 04:20 PM",
        message: "My payment failed but amount was deducted from my account."
      }
    ]
  },
  {
    id: "RQ304",
    user: "Green Field Traders",
    userType: "Dealer",
    type: "Requisition Request",
    subject: "Document Update",
    date: "17 May 2024",
    status: "resolved",
    priority: "Low",
    description: "Updated renewed GST license certificate attached.",
    assignedTo: "Neha Verma",
    conversation: [
      {
        sender: "Green Field Traders",
        role: "Dealer",
        time: "17 May 2024, 09:00 AM",
        message: "Attached updated GST certificate. Please update our profile status."
      }
    ]
  },
  {
    id: "RQ305",
    user: "Manoj Yadav",
    userType: "Farmer",
    type: "Account Request",
    subject: "Account Notification",
    date: "15 May 2024",
    status: "resolved",
    priority: "Low",
    description: "Change of phone number request submitted.",
    assignedTo: "Pooja Mishra",
    conversation: [
      {
        sender: "Manoj Yadav",
        role: "Farmer",
        time: "15 May 2024, 01:10 PM",
        message: "Phone number update confirmed via Aadhaar OTP."
      }
    ]
  }
];

export const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: "PROD101",
    name: "Wheat (Grade A)",
    seller: "Rajesh Kumar",
    sellerType: "Farmer",
    category: "Grains",
    quantity: "150 Quintal",
    price: 2350,
    status: "active"
  },
  {
    id: "PROD102",
    name: "Paddy (Basmati 1121)",
    seller: "Suresh Patel",
    sellerType: "Farmer",
    category: "Grains",
    quantity: "80 Quintal",
    price: 4200,
    status: "active"
  },
  {
    id: "PROD103",
    name: "Cotton (Bt Hybrid)",
    seller: "Manoj Yadav",
    sellerType: "Farmer",
    category: "Cash Crops",
    quantity: "120 Quintal",
    price: 6800,
    status: "pending"
  },
  {
    id: "PROD104",
    name: "Maize (Hybrid Feed)",
    seller: "Ramesh Tiwari",
    sellerType: "Farmer",
    category: "Grains",
    quantity: "200 Quintal",
    price: 1950,
    status: "pending"
  },
  {
    id: "PROD105",
    name: "NPK Organic Fertilizer",
    seller: "ABC Agro Traders",
    sellerType: "Dealer",
    category: "Inputs",
    quantity: "500 Bags",
    price: 1250,
    status: "active"
  }
];

export const INITIAL_ORDERS: OrderItem[] = [
  {
    id: "ORD8756",
    buyer: "Rajesh Kumar (FRM101)",
    buyerId: "FRM101",
    dealer: "ABC Agro Traders (DLR201)",
    dealerId: "DLR201",
    product: "Wheat (Grade A)",
    qty: "30 Quintal",
    amount: 70500,
    status: "confirmed",
    paymentStatus: "paid",
    paymentMethod: "Bank Transfer",
    date: "20 May 2024, 10:30 AM",
    tracking: [
      { title: "Order Placed", date: "20 May 2024, 10:30 AM", completed: true },
      { title: "Confirmed", date: "20 May 2024, 11:15 AM", completed: true, current: true },
      { title: "Processing", completed: false },
      { title: "Ready to Dispatch", completed: false },
      { title: "Dispatched", completed: false },
      { title: "Delivered", completed: false },
      { title: "Completed", completed: false }
    ]
  },
  {
    id: "ORD8757",
    buyer: "Suresh Patel",
    buyerId: "FRM102",
    dealer: "Green Field Traders",
    dealerId: "DLR202",
    product: "Paddy",
    qty: "15 Quintal",
    amount: 63000,
    status: "processing",
    paymentStatus: "paid",
    paymentMethod: "UPI",
    date: "19 May 2024",
    tracking: [
      { title: "Order Placed", date: "19 May 2024", completed: true },
      { title: "Confirmed", date: "19 May 2024", completed: true },
      { title: "Processing", date: "19 May 2024", completed: true, current: true },
      { title: "Ready to Dispatch", completed: false }
    ]
  },
  {
    id: "ORD8758",
    buyer: "Manoj Yadav",
    buyerId: "FRM103",
    dealer: "Agro Mart",
    dealerId: "DLR204",
    product: "Cotton",
    qty: "25 Quintal",
    amount: 170000,
    status: "dispatched",
    paymentStatus: "paid",
    paymentMethod: "Wallet",
    date: "18 May 2024",
    tracking: [
      { title: "Order Placed", date: "18 May 2024", completed: true },
      { title: "Confirmed", date: "18 May 2024", completed: true },
      { title: "Processing", date: "18 May 2024", completed: true },
      { title: "Dispatched", date: "19 May 2024", completed: true, current: true }
    ]
  },
  {
    id: "ORD8759",
    buyer: "Kamlesh Singh",
    buyerId: "FRM105",
    dealer: "Bharati Traders",
    dealerId: "DLR205",
    product: "Fertilizer",
    qty: "50 Bags",
    amount: 62500,
    status: "delivered",
    paymentStatus: "paid",
    paymentMethod: "KCC Credit",
    date: "17 May 2024",
    tracking: [
      { title: "Order Placed", date: "17 May 2024", completed: true },
      { title: "Delivered", date: "18 May 2024", completed: true, current: true }
    ]
  },
  {
    id: "ORD8760",
    buyer: "Ramesh Tiwari",
    buyerId: "FRM104",
    dealer: "ABC Agro Traders",
    dealerId: "DLR201",
    product: "Soybean",
    qty: "20 Quintal",
    amount: 98500,
    status: "cancelled",
    paymentStatus: "refunded",
    paymentMethod: "Bank Transfer",
    date: "16 May 2024",
    tracking: [
      { title: "Order Placed", date: "16 May 2024", completed: true },
      { title: "Cancelled", date: "16 May 2024", completed: true }
    ]
  }
];

export const INITIAL_TRANSACTIONS: TransactionItem[] = [
  {
    id: "TXN9001",
    user: "ABC Agro Traders",
    userType: "Dealer",
    type: "Payment",
    amount: 115000,
    method: "Bank Transfer",
    date: "20 May 2024",
    status: "success"
  },
  {
    id: "TXN9002",
    user: "Rajesh Kumar",
    userType: "Farmer",
    type: "Payout",
    amount: 65000,
    method: "Bank Transfer",
    date: "20 May 2024",
    status: "success"
  },
  {
    id: "TXN9003",
    user: "Suresh Patel",
    userType: "Farmer",
    type: "Payment",
    amount: 42000,
    method: "UPI",
    date: "19 May 2024",
    status: "pending"
  },
  {
    id: "TXN9004",
    user: "Green Field Traders",
    userType: "Dealer",
    type: "Payment",
    amount: 88000,
    method: "Bank Transfer",
    date: "18 May 2024",
    status: "success"
  },
  {
    id: "TXN9005",
    user: "Ramesh Tiwari",
    userType: "Farmer",
    type: "Refund",
    amount: 18500,
    method: "Wallet",
    date: "17 May 2024",
    status: "success"
  }
];

export const INITIAL_PAYOUTS: PayoutItem[] = [
  {
    id: "PAY401",
    recipient: "ABC Agro Traders",
    recipientType: "Dealer",
    grossAmount: 115000,
    commissionPct: 5,
    netPayout: 109250,
    status: "processed",
    date: "20 May 2024"
  },
  {
    id: "PAY402",
    recipient: "Green Field Traders",
    recipientType: "Dealer",
    grossAmount: 88000,
    commissionPct: 5,
    netPayout: 83600,
    status: "processed",
    date: "19 May 2024"
  },
  {
    id: "PAY403",
    recipient: "Rajesh Kumar",
    recipientType: "Farmer",
    grossAmount: 65000,
    commissionPct: 5,
    netPayout: 61750,
    status: "pending",
    date: "20 May 2024"
  }
];

export const INITIAL_COMPLAINTS: ComplaintItem[] = [
  {
    id: "CMP501",
    complainant: "ABC Agro Traders",
    against: "Rajesh Kumar",
    category: "Quality Issue",
    subject: "Wheat Moisture Level High",
    date: "20 May 2024",
    status: "investigating",
    priority: "High",
    details: "Moisture level in delivered wheat batch exceeds 14%. Requested inspection."
  },
  {
    id: "CMP502",
    complainant: "Suresh Patel",
    against: "Green Field Traders",
    category: "Payment Delay",
    subject: "Payout Not Credited",
    date: "19 May 2024",
    status: "open",
    priority: "Medium",
    details: "Payment for Paddy batch delivered on 15 May has not reached bank account."
  },
  {
    id: "CMP503",
    complainant: "Manoj Yadav",
    against: "Agro Mart",
    category: "Delivery Delay",
    subject: "Fertilizer Delivery Late",
    date: "18 May 2024",
    status: "resolved",
    priority: "Low",
    details: "Delayed by 2 days due to regional transport strike. Issue resolved with compensation."
  }
];

export const INITIAL_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: "ANN601",
    title: "New Guidelines for Farmers",
    audience: "Farmers",
    type: "Announcement",
    publishedOn: "20 May 2024",
    status: "published",
    content: "Updated government subsidy guidelines for organic seed procurement are now active."
  },
  {
    id: "ANN602",
    title: "System Maintenance Alert",
    audience: "All Users",
    type: "System Maintenance",
    publishedOn: "19 May 2024",
    status: "published",
    content: "Platform undergoing routine database maintenance on 22 May from 2:00 AM to 4:00 AM IST."
  },
  {
    id: "ANN603",
    title: "New Feature Available",
    audience: "All Users",
    type: "Policy Update",
    publishedOn: "18 May 2024",
    status: "published",
    content: "Kisan Pathshala video library is live with daily agricultural training modules."
  },
  {
    id: "ANN604",
    title: "Verify Your Documents",
    audience: "Dealers",
    type: "Alert",
    publishedOn: "15 May 2024",
    status: "draft",
    content: "Please ensure your GST license copy is updated in profile verifications before 31st May."
  }
];

export const INITIAL_ROLES: RoleItem[] = [
  {
    id: "ROLE01",
    roleName: "Super Admin",
    description: "Full access to all modules and system controls",
    userCount: 2,
    status: "active",
    permissions: [
      { module: "Farmers", view: true, create: true, edit: true, delete: true, approve: true },
      { module: "Dealers", view: true, create: true, edit: true, delete: true, approve: true },
      { module: "Products", view: true, create: true, edit: true, delete: true, approve: true },
      { module: "Orders", view: true, create: true, edit: true, delete: true, approve: true },
      { module: "Payments", view: true, create: true, edit: true, delete: true, approve: true }
    ]
  },
  {
    id: "ROLE02",
    roleName: "Operations Admin",
    description: "Manage users, orders, requests, and listings",
    userCount: 4,
    status: "active",
    permissions: [
      { module: "Farmers", view: true, create: true, edit: true, delete: false, approve: true },
      { module: "Dealers", view: true, create: true, edit: true, delete: false, approve: true },
      { module: "Products", view: true, create: true, edit: true, delete: true, approve: true },
      { module: "Orders", view: true, create: true, edit: true, delete: false, approve: true },
      { module: "Payments", view: true, create: false, edit: false, delete: false, approve: false }
    ]
  },
  {
    id: "ROLE03",
    roleName: "Finance Admin",
    description: "Manage payments, payouts, and financial reports",
    userCount: 2,
    status: "active",
    permissions: [
      { module: "Farmers", view: true, create: false, edit: false, delete: false, approve: false },
      { module: "Dealers", view: true, create: false, edit: false, delete: false, approve: false },
      { module: "Products", view: true, create: false, edit: false, delete: false, approve: false },
      { module: "Orders", view: true, create: false, edit: false, delete: false, approve: false },
      { module: "Payments", view: true, create: true, edit: true, delete: true, approve: true }
    ]
  },
  {
    id: "ROLE04",
    roleName: "Support Admin",
    description: "Handle tickets, complaints, and user queries",
    userCount: 5,
    status: "active",
    permissions: [
      { module: "Farmers", view: true, create: false, edit: true, delete: false, approve: false },
      { module: "Dealers", view: true, create: false, edit: true, delete: false, approve: false },
      { module: "Products", view: true, create: false, edit: false, delete: false, approve: false },
      { module: "Orders", view: true, create: false, edit: false, delete: false, approve: false },
      { module: "Payments", view: false, create: false, edit: false, delete: false, approve: false }
    ]
  }
];

export const INITIAL_ADMIN_USERS: AdminUserItem[] = [
  {
    id: "ADM001",
    name: "Rahul Sharma",
    email: "rahul@krivexa.com",
    role: "Super Admin",
    status: "active",
    lastLogin: "20 May 2024, 10:15 AM",
    phone: "9876500001"
  },
  {
    id: "ADM002",
    name: "Neha Verma",
    email: "neha@krivexa.com",
    role: "Operations Admin",
    status: "active",
    lastLogin: "20 May 2024, 09:30 AM",
    phone: "9876500002"
  },
  {
    id: "ADM003",
    name: "Ankit Singh",
    email: "ankit@krivexa.com",
    role: "Finance Admin",
    status: "active",
    lastLogin: "19 May 2024, 04:45 PM",
    phone: "9876500003"
  },
  {
    id: "ADM004",
    name: "Pooja Mishra",
    email: "pooja@krivexa.com",
    role: "Support Admin",
    status: "active",
    lastLogin: "19 May 2024, 11:20 AM",
    phone: "9876500004"
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: "LOG101",
    adminName: "Rahul Sharma",
    action: "Approved Farmer",
    module: "Farmers",
    details: "FRM101 - Rajesh Kumar verified and activated",
    dateTime: "20 May 2024, 10:20 AM",
    ipAddress: "192.168.1.45"
  },
  {
    id: "LOG102",
    adminName: "Neha Verma",
    action: "Updated Dealer",
    module: "Dealers",
    details: "DLR202 status changed to Pending Verification",
    dateTime: "20 May 2024, 09:50 AM",
    ipAddress: "192.168.1.52"
  },
  {
    id: "LOG103",
    adminName: "Ankit Singh",
    action: "Processed Payout",
    module: "Payments",
    details: "PAY401 - ₹1,09,250 released to ABC Agro Traders",
    dateTime: "19 May 2024, 05:10 PM",
    ipAddress: "192.168.1.88"
  },
  {
    id: "LOG104",
    adminName: "Rahul Sharma",
    action: "Posted Announcement",
    module: "Announcements",
    details: "New Guidelines for Farmers broadcasted",
    dateTime: "19 May 2024, 03:00 PM",
    ipAddress: "192.168.1.45"
  }
];

export const INITIAL_SETTINGS: AdminSettings = {
  platformName: "KRIVEXA - Smart Agriculture Platform",
  supportEmail: "support@krivexa.com",
  phone: "+91 9876543210",
  address: "Patna Tech Park, Sector 4, Patna, Bihar - 800001",
  timezone: "(UTC +05:30) Asia/Kolkata",
  autoApproveFarmers: false,
  autoApproveDealers: false,
  commissionRatePct: 5,
  maintenanceMode: false
};
