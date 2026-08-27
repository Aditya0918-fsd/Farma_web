import React, { createContext, useContext, useState, useEffect } from "react";
import { type Language, TRANSLATIONS, type Translations } from "@/lib/translations.ts";

export interface CropListing {
  id: string;
  sellerName: string;
  district: string;
  city: string;
  address: string;
  pincode: string;
  phone: string;
  cropName: string;
  weight: string;
  price: number;
  image: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export interface LabourBookingRequest {
  id: string;
  userName: string;
  phone: string;
  labourType: string;
  count: number;
  days: number;
  startDate: string;
  endDate: string;
  location: string;
  status: "pending" | "assigned" | "completed";
  assignedLabours?: Array<{ name: string; phone: string; charges: string }>;
  adminNotes?: string;
  createdAt: string;
}

export interface ExpertAdviceQuery {
  id: string;
  farmerName: string;
  phone: string;
  address: string;
  cropName: string;
  problemDetails: string;
  status: "pending" | "resolved" | "contacted";
  adminReply?: string;
  createdAt: string;
}

export interface MandiRate {
  id: string;
  name: string;
  hindi: string;
  min: number;
  max: number;
  modal: number;
  unit: string;
  change: number;
  img: string;
  mandi: string;
}

export interface KccApplication {
  id: string;
  fullName: string;
  phone: string;
  aadhaar: string;
  address: string;
  district: string;
  landSize: string;
  status: "pending" | "approved" | "rejected";
  cardNumber?: string;
  issueDate?: string;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  role: "farmer" | "dealer";
  state: string;
  district: string;
  village: string;
  businessName?: string;
  dealerType?: string;
  occupation?: string;
  pincode?: string;
  aadhaarNumber?: string;
  aadhaarFront?: string;
  aadhaarBack?: string;
  bankHolder?: string;
  bankName?: string;
  bankAccount?: string;
  bankIfsc?: string;
  bankAddress?: string;
  verificationStatus?: "Pending" | "Verified";
  createdAt: string;
}

export interface MachineryBookingRequest {
  id: string;
  userName: string;
  phone: string;
  machineryType: string;
  bookingDate: string;
  durationHours: string | number;
  location: string;
  status: "pending" | "allotted" | "rejected";
  allottedMachineDetails?: string;
  adminNotes?: string;
  createdAt: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  category?: string;
  price: number;
  unit?: string;
  image?: string;
  quantity: number;
  sellerName?: string;
}

export interface CartOrder {
  id: string;
  userId: string;
  userName: string;
  items: CartItem[];
  totalAmount: number;
  paymentMethod: "kcc" | "upi" | "cod" | "wallet";
  deliveryAddress: string;
  status: "Confirmed" | "Processing" | "Delivered";
  createdAt: string;
}

export interface UserNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type?: "info" | "success" | "warning";
  link?: string;
  category?: "crops" | "labour" | "expert" | "wallet" | "kcc" | "account" | "mandi" | "machinery" | "orders" | "soil";
  pdfDataUrl?: string;
  pdfFileName?: string;
}

interface AppContextType {
  // Language
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;

  // KCC Gatekeeper
  isKccIssued: boolean;
  hasAppliedKcc: boolean;
  kccApplicationStatus: "none" | "pending" | "approved" | "rejected";
  kccDetails: KccApplication | null;
  isKccAlertOpen: boolean;
  setIsKccAlertOpen: (open: boolean) => void;
  isKccAppModalOpen: boolean;
  setIsKccAppModalOpen: (open: boolean) => void;
  checkKccPermission: (actionName?: string) => boolean;
  submitKccApplication: (appData: Omit<KccApplication, "id" | "status" | "createdAt">) => void;
  toggleKccDemoStatus: () => void;

  // Cart & Orders System
  cart: CartItem[];
  addToCart: (item: { id: string; name: string; category?: string; price: number; unit?: string; image?: string; sellerName?: string }) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  checkoutCart: (paymentMethod: "kcc" | "upi" | "cod" | "wallet", deliveryAddress: string) => { success: boolean; message: string; orderId?: string };
  orders: CartOrder[];

  // Admin Auth
  isAdminLoggedIn: boolean;
  adminLogin: (id: string, pass: string) => boolean;
  adminLogout: () => void;

  // Crop Listings (Sell Crops -> Buy Inputs)
  cropListings: CropListing[];
  addCropListing: (listing: Omit<CropListing, "id" | "status" | "createdAt">) => void;
  approveCropListing: (id: string) => void;
  rejectCropListing: (id: string) => void;

  // Machinery Booking
  machineryBookings: MachineryBookingRequest[];
  addMachineryBooking: (booking: Omit<MachineryBookingRequest, "id" | "status" | "createdAt">) => void;
  allotMachineryBooking: (id: string, machineDetails: string, notes?: string) => void;
  rejectMachineryBooking: (id: string) => void;

  // Labour Booking & Admin Labour Types
  labourTypes: string[];
  addLabourType: (type: string) => void;
  removeLabourType: (type: string) => void;
  labourBookings: LabourBookingRequest[];
  addLabourBooking: (booking: Omit<LabourBookingRequest, "id" | "status" | "createdAt">) => void;
  assignLaboursToBooking: (id: string, assigned: Array<{ name: string; phone: string; charges: string }>, notes?: string) => void;

  // Expert Advice
  expertAdviceQueries: ExpertAdviceQuery[];
  addExpertQuery: (query: Omit<ExpertAdviceQuery, "id" | "status" | "createdAt">) => void;
  updateExpertQueryStatus: (id: string, status: "pending" | "resolved" | "contacted", reply?: string) => void;

  // Mandi Bhav
  mandiRates: MandiRate[];
  addMandiRate: (rate: Omit<MandiRate, "id">) => void;
  updateMandiRate: (id: string, updated: Partial<MandiRate>) => void;
  deleteMandiRate: (id: string) => void;

  // User Profile & Auth Session
  user: UserProfile | null;
  loginUser: (profileData: Omit<UserProfile, "id" | "createdAt">) => void;
  logoutUser: () => void;
  updateUserProfile: (updated: Partial<UserProfile>) => void;

  // User Notifications
  notifications: UserNotification[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAllNotifications: () => void;
  addNotification: (
    title: string,
    message: string,
    type?: "info" | "success" | "warning",
    link?: string,
    category?: UserNotification["category"],
    pdfDataUrl?: string,
    pdfFileName?: string
  ) => void;

  // KCC Applications for Admin & Dealer KCC Apply
  kccApplications: KccApplication[];
  approveKccApplication: (id: string) => void;
  rejectKccApplication: (id: string) => void;

  // Dealer KCC & POS Features
  dealerApplyFarmerKcc: (appData: Omit<KccApplication, "id" | "status" | "createdAt">) => void;
  checkFarmerCardBalance: (cardNumber: string) => { exists: boolean; cardHolder?: string; balance?: number; status?: string } | null;
  chargeFarmerCard: (cardNumber: string, amount: number, itemDesc: string) => { success: boolean; message: string; remainingBalance?: number };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Initial Sample Mandi Rates
const INITIAL_MANDI_RATES: MandiRate[] = [
  { id: "m1", name: "Wheat", hindi: "गेहूं", min: 2150, max: 2400, modal: 2275, unit: "Quintal", change: 2.35, img: "🌾", mandi: "Kanpur Mandi" },
  { id: "m2", name: "Paddy (Common)", hindi: "धान", min: 1750, max: 1950, modal: 1860, unit: "Quintal", change: 1.78, img: "🌾", mandi: "Kanpur Mandi" },
  { id: "m3", name: "Soyabean", hindi: "सोयाबीन", min: 4800, max: 5050, modal: 4920, unit: "Quintal", change: 3.12, img: "🟡", mandi: "Kanpur Mandi" },
  { id: "m4", name: "Maize", hindi: "मक्का", min: 1850, max: 2000, modal: 1920, unit: "Quintal", change: 0.91, img: "🌽", mandi: "Kanpur Mandi" },
  { id: "m5", name: "Mustard", hindi: "सरसों", min: 5100, max: 5400, modal: 5250, unit: "Quintal", change: -0.5, img: "🌼", mandi: "Kanpur Mandi" },
  { id: "m6", name: "Gram", hindi: "चना", min: 4600, max: 4900, modal: 4750, unit: "Quintal", change: 1.2, img: "🟤", mandi: "Kanpur Mandi" },
  { id: "m7", name: "Onion", hindi: "प्याज", min: 800, max: 1200, modal: 1050, unit: "Quintal", change: -2.1, img: "🧅", mandi: "Kanpur Mandi" },
  { id: "m8", name: "Tomato", hindi: "टमाटर", min: 600, max: 1000, modal: 800, unit: "Quintal", change: 4.5, img: "🍅", mandi: "Kanpur Mandi" },
];

// Initial Approved Crop Listing for demo in Buy Inputs
const INITIAL_CROPS: CropListing[] = [
  {
    id: "crop-101",
    sellerName: "Rajesh Kumar Sharma",
    district: "Patna",
    city: "Danapur",
    address: "Village Rampur, PO Danapur",
    pincode: "801503",
    phone: "9876543210",
    cropName: "Organic Sharbati Wheat",
    weight: "50 Quintal",
    price: 2450,
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&q=80",
    status: "approved",
    createdAt: new Date().toISOString(),
  },
  {
    id: "crop-102",
    sellerName: "Mahesh Singh",
    district: "Nalanda",
    city: "Bihar Sharif",
    address: "Gram Panchayat Chandi",
    pincode: "803108",
    phone: "9123456789",
    cropName: "Premium Basmati Paddy",
    weight: "30 Quintal",
    price: 3200,
    image: "https://images.unsplash.com/photo-1536054993300-0b00f01ee72a?w=500&q=80",
    status: "approved",
    createdAt: new Date().toISOString(),
  },
];

const INITIAL_LABOUR_TYPES = [
  "Harvesting Labour",
  "Sowing Labour",
  "Irrigation Labour",
  "Weeding Labour",
  "Crop Loading Labour",
  "Orchard Labour",
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Language State
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem("krivexa_lang") as Language) || "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("krivexa_lang", lang);
  };

  const t = TRANSLATIONS[language];

  // Admin Auth State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem("krivexa_admin_session") === "true";
  });

  const adminLogin = (id: string, pass: string): boolean => {
    if (id.trim() === "Aditya Saha" && pass === "Adi890655") {
      setIsAdminLoggedIn(true);
      localStorage.setItem("krivexa_admin_session", "true");
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem("krivexa_admin_session");
  };

  // KCC State
  const [isKccIssued, setIsKccIssued] = useState<boolean>(() => {
    return localStorage.getItem("krivexa_kcc_issued") === "true";
  });
  const [kccApplications, setKccApplications] = useState<KccApplication[]>(() => {
    const saved = localStorage.getItem("krivexa_kcc_apps");
    return saved ? JSON.parse(saved) : [
      {
        id: "kcc-1001",
        fullName: "Ramesh Farmer",
        phone: "9876543210",
        aadhaar: "1234-5678-9012",
        address: "Village Rampur",
        district: "Patna",
        landSize: "3.5",
        status: "approved",
        cardNumber: "KCC-BH-2026-9041",
        issueDate: "2026-08-20",
        createdAt: new Date().toISOString(),
      }
    ];
  });
  const [isKccAlertOpen, setIsKccAlertOpen] = useState<boolean>(false);
  const [isKccAppModalOpen, setIsKccAppModalOpen] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("krivexa_kcc_apps", JSON.stringify(kccApplications));
  }, [kccApplications]);

  const checkKccPermission = (): boolean => {
    if (isKccIssued || isAdminLoggedIn) {
      return true;
    }
    setIsKccAlertOpen(true);
    return false;
  };

  const submitKccApplication = (appData: Omit<KccApplication, "id" | "status" | "createdAt">) => {
    const newApp: KccApplication = {
      ...appData,
      id: `kcc-${Date.now()}`,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    setKccApplications((prev) => [newApp, ...prev]);
    addNotification(
      "KCC Application Submitted 💳",
      `Your Kisan Credit Card application has been submitted. We will review it shortly.`,
      "info",
      "/dashboard",
      "kcc"
    );
  };

  const toggleKccDemoStatus = () => {
    const nextState = !isKccIssued;
    setIsKccIssued(nextState);
    localStorage.setItem("krivexa_kcc_issued", nextState ? "true" : "false");
  };

  const approveKccApplication = (id: string) => {
    setKccApplications((prev) =>
      prev.map((app) => {
        if (app.id === id) {
          return {
            ...app,
            status: "approved",
            cardNumber: `KCC-BH-2026-${Math.floor(1000 + Math.random() * 9000)}`,
            issueDate: new Date().toISOString().split("T")[0],
          };
        }
        return app;
      })
    );
    // Automatically issue KCC to current user state
    setIsKccIssued(true);
    localStorage.setItem("krivexa_kcc_issued", "true");
  };

  const rejectKccApplication = (id: string) => {
    setKccApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: "rejected" } : app))
    );
  };

  // Crop Listings State
  const [cropListings, setCropListings] = useState<CropListing[]>(() => {
    const saved = localStorage.getItem("krivexa_crop_listings");
    return saved ? JSON.parse(saved) : INITIAL_CROPS;
  });

  useEffect(() => {
    localStorage.setItem("krivexa_crop_listings", JSON.stringify(cropListings));
  }, [cropListings]);

  const addCropListing = (listing: Omit<CropListing, "id" | "status" | "createdAt">) => {
    const newListing: CropListing = {
      ...listing,
      id: `crop-${Date.now()}`,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    setCropListings((prev) => [newListing, ...prev]);
    addNotification(
      "Crop Listing Submitted 🌾",
      `Your listing for "${listing.cropName}" (${listing.weight}) has been submitted and is pending review.`,
      "info",
      "/sell-crops",
      "crops"
    );
  };

  const approveCropListing = (id: string) => {
    const listing = cropListings.find(c => c.id === id);
    setCropListings((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: "approved" } : item))
    );
    if (listing) {
      addNotification(
        "Crop Listing Approved ✅",
        `Your crop listing "${listing.cropName}" has been approved and is now live on the marketplace.`,
        "success",
        "/agri-market",
        "crops"
      );
    }
  };

  const rejectCropListing = (id: string) => {
    setCropListings((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: "rejected" } : item))
    );
  };

  // Machinery Booking State
  const [machineryBookings, setMachineryBookings] = useState<MachineryBookingRequest[]>(() => {
    const saved = localStorage.getItem("krivexa_machinery_bookings");
    return saved ? JSON.parse(saved) : [
      {
        id: "mach-101",
        userName: "Ram Das",
        phone: "8906554583",
        machineryType: "Tractor (45 HP)",
        bookingDate: "2026-08-28",
        durationHours: 4,
        location: "Rajpur, Varanasi",
        status: "pending",
        createdAt: new Date().toISOString(),
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem("krivexa_machinery_bookings", JSON.stringify(machineryBookings));
  }, [machineryBookings]);

  const addMachineryBooking = (booking: Omit<MachineryBookingRequest, "id" | "status" | "createdAt">) => {
    const newBooking: MachineryBookingRequest = {
      ...booking,
      id: `mach-${Date.now()}`,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    setMachineryBookings((prev) => [newBooking, ...prev]);
    addNotification(
      "Machinery Booking Request Sent 🚜",
      `Your booking request for ${booking.machineryType} on ${booking.bookingDate} has been sent to admin for allotment.`,
      "info",
      "/machinery-booking",
      "machinery"
    );
  };

  const allotMachineryBooking = (id: string, machineDetails: string, notes?: string) => {
    const target = machineryBookings.find(m => m.id === id);
    setMachineryBookings((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: "allotted", allottedMachineDetails: machineDetails, adminNotes: notes }
          : item
      )
    );
    addNotification(
      "Machinery Allotted! 🚜",
      `Your requested machine (${target?.machineryType || "Machinery"}) has been allotted by Admin: ${machineDetails}.`,
      "success",
      "/machinery-booking",
      "machinery"
    );
  };

  const rejectMachineryBooking = (id: string) => {
    const target = machineryBookings.find(m => m.id === id);
    setMachineryBookings((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: "rejected" } : item))
    );
    addNotification(
      "Machinery Request Declined ❌",
      `Your booking request for ${target?.machineryType || "Machinery"} could not be fulfilled at this time.`,
      "warning",
      "/machinery-booking",
      "machinery"
    );
  };

  // Labour Booking & Types State
  const [labourTypes, setLabourTypes] = useState<string[]>(() => {
    const saved = localStorage.getItem("krivexa_labour_types");
    return saved ? JSON.parse(saved) : INITIAL_LABOUR_TYPES;
  });

  useEffect(() => {
    localStorage.setItem("krivexa_labour_types", JSON.stringify(labourTypes));
  }, [labourTypes]);

  const addLabourType = (type: string) => {
    if (!type.trim() || labourTypes.includes(type)) return;
    setLabourTypes((prev) => [...prev, type.trim()]);
  };

  const removeLabourType = (type: string) => {
    setLabourTypes((prev) => prev.filter((t) => t !== type));
  };

  const [labourBookings, setLabourBookings] = useState<LabourBookingRequest[]>(() => {
    const saved = localStorage.getItem("krivexa_labour_bookings");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("krivexa_labour_bookings", JSON.stringify(labourBookings));
  }, [labourBookings]);

  const addLabourBooking = (booking: Omit<LabourBookingRequest, "id" | "status" | "createdAt">) => {
    const newBooking: LabourBookingRequest = {
      ...booking,
      id: `labour-req-${Date.now()}`,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    setLabourBookings((prev) => [newBooking, ...prev]);
    addNotification(
      "Labour Booking Request Sent 👷",
      `Your request for ${booking.count} ${booking.labourType}(s) starting ${booking.startDate} has been submitted.`,
      "info",
      "/labour-booking",
      "labour"
    );
  };

  const assignLaboursToBooking = (
    id: string,
    assigned: Array<{ name: string; phone: string; charges: string }>,
    notes?: string
  ) => {
    setLabourBookings((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: "assigned", assignedLabours: assigned, adminNotes: notes }
          : item
      )
    );
    addNotification(
      "Labour Assigned to You! ✅",
      `${assigned.length} labourer(s) have been assigned to your booking. Check your booking page for details.`,
      "success",
      "/labour-booking",
      "labour"
    );
  };

  // Expert Advice State
  const [expertAdviceQueries, setExpertAdviceQueries] = useState<ExpertAdviceQuery[]>(() => {
    const saved = localStorage.getItem("krivexa_expert_queries");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("krivexa_expert_queries", JSON.stringify(expertAdviceQueries));
  }, [expertAdviceQueries]);

  const addExpertQuery = (query: Omit<ExpertAdviceQuery, "id" | "status" | "createdAt">) => {
    const newQuery: ExpertAdviceQuery = {
      ...query,
      id: `exp-${Date.now()}`,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    setExpertAdviceQueries((prev) => [newQuery, ...prev]);
    addNotification(
      "Expert Advice Query Submitted 🌿",
      `Your query about "${query.cropName}" has been received. An expert will contact you soon.`,
      "info",
      "/expert-advice",
      "expert"
    );
  };

  const updateExpertQueryStatus = (
    id: string,
    status: "pending" | "resolved" | "contacted",
    reply?: string
  ) => {
    setExpertAdviceQueries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status, adminReply: reply } : item))
    );
    if (status === "resolved" && reply) {
      addNotification(
        "Expert Advice Received! 🎓",
        `Your crop query has been resolved by our expert. Tap to view the reply.`,
        "success",
        "/expert-advice",
        "expert"
      );
    } else if (status === "contacted") {
      addNotification(
        "Expert Will Contact You 📞",
        `An agricultural expert will call you shortly regarding your crop query.`,
        "info",
        "/expert-advice",
        "expert"
      );
    }
  };

  // Mandi Rates State
  const [mandiRates, setMandiRates] = useState<MandiRate[]>(() => {
    const saved = localStorage.getItem("krivexa_mandi_rates");
    return saved ? JSON.parse(saved) : INITIAL_MANDI_RATES;
  });

  useEffect(() => {
    localStorage.setItem("krivexa_mandi_rates", JSON.stringify(mandiRates));
  }, [mandiRates]);

  const addMandiRate = (rate: Omit<MandiRate, "id">) => {
    const newRate: MandiRate = {
      ...rate,
      id: `mandi-${Date.now()}`,
    };
    setMandiRates((prev) => [newRate, ...prev]);
  };

  const updateMandiRate = (id: string, updated: Partial<MandiRate>) => {
    setMandiRates((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
  };

  const deleteMandiRate = (id: string) => {
    setMandiRates((prev) => prev.filter((item) => item.id !== id));
  };

  // User Profile Session State
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem("krivexa_user_profile");
    if (saved) return JSON.parse(saved);
    return {
      id: "usr-890655",
      name: "Ram Das",
      phone: "8906554583",
      role: "farmer",
      state: "Uttar pardesh",
      district: "Vanarasi",
      village: "Rajpur",
      pincode: "700101",
      verificationStatus: "Pending",
      aadhaarNumber: "Not set",
      aadhaarFront: "No file uploaded yet",
      aadhaarBack: "No file uploaded yet",
      bankHolder: "Not set",
      bankName: "Not set",
      bankAccount: "Not set",
      bankIfsc: "Not set",
      bankAddress: "Not set",
      createdAt: new Date().toISOString(),
    };
  });

  const [notifications, setNotifications] = useState<UserNotification[]>(() => {
    const saved = localStorage.getItem("krivexa_user_notifications");
    return saved ? JSON.parse(saved) : [
      {
        id: "n-1",
        title: "Welcome to Krivexa! 🎉",
        message: "Your account is active. Explore selling crops, booking labour, and more.",
        time: "Just now",
        read: false,
        type: "success",
        link: "/",
        category: "account",
      },
      {
        id: "n-2",
        title: "Mandi Prices Updated 🌾",
        message: "New daily prices for Wheat & Paddy in Bihar mandis. Check latest rates.",
        time: "10 mins ago",
        read: false,
        type: "info",
        link: "/mandi-bhav",
        category: "mandi",
      },
      {
        id: "n-3",
        title: "Apply for Kisan Credit Card 💳",
        message: "Get low-interest KCC loan up to ₹3,00,000 for farming expenses.",
        time: "1 hour ago",
        read: false,
        type: "info",
        link: "/dashboard",
        category: "kcc",
      },
    ];
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("krivexa_user_profile", JSON.stringify(user));
    } else {
      localStorage.removeItem("krivexa_user_profile");
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("krivexa_user_notifications", JSON.stringify(notifications));
  }, [notifications]);

  const loginUser = (profileData: Omit<UserProfile, "id" | "createdAt">) => {
    const newUser: UserProfile = {
      ...profileData,
      id: `usr-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    addNotification(
      "Login Successful 👋",
      `Welcome back, ${newUser.name}! You are logged in as ${newUser.role === "farmer" ? "Farmer" : "Dealer"}.`,
      "success",
      "/",
      "account"
    );
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("krivexa_user_profile");
  };

  const updateUserProfile = (updated: Partial<UserProfile>) => {
    setUser((prev) => (prev ? { ...prev, ...updated } : null));
  };

  const addNotification = (
    title: string,
    message: string,
    type: "info" | "success" | "warning" = "info",
    link?: string,
    category?: UserNotification["category"],
    pdfDataUrl?: string,
    pdfFileName?: string
  ) => {
    const newNotif: UserNotification = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      title,
      message,
      time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
      read: false,
      type,
      link,
      category,
      pdfDataUrl,
      pdfFileName,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const kccDetails = kccApplications.length > 0 ? kccApplications[0] : null;
  const kccApplicationStatus = kccDetails ? kccDetails.status : "none";
  const hasAppliedKcc = isKccIssued || kccApplications.length > 0;

  // Dealer Features Implementation
  const [farmerCardStore, setFarmerCardStore] = useState<Record<string, { cardHolder: string; balance: number; status: string }>>({
    "KCC-BH-2026-9041": { cardHolder: "Ram Das", balance: 25000, status: "active" },
    "KCC-BH-2026-1002": { cardHolder: "Suresh Patel", balance: 18500, status: "active" },
    "KCC-BH-2026-1003": { cardHolder: "Anita Devi", balance: 32000, status: "active" },
  });

  const dealerApplyFarmerKcc = (appData: Omit<KccApplication, "id" | "status" | "createdAt">) => {
    const newApp: KccApplication = {
      ...appData,
      id: `kcc-dealer-${Date.now()}`,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    setKccApplications((prev) => [newApp, ...prev]);
    addNotification(
      "Farmer KCC Submitted",
      `KCC Application for ${appData.fullName} submitted successfully by Dealer.`,
      "success",
      "/admin",
      "kcc"
    );
  };

  const checkFarmerCardBalance = (cardNumber: string) => {
    const cleaned = cardNumber.trim();
    if (farmerCardStore[cleaned]) {
      return { exists: true, ...farmerCardStore[cleaned] };
    }
    // Check in kccApplications list if verified
    const matchedApp = kccApplications.find(a => a.cardNumber === cleaned && a.status === "approved");
    if (matchedApp) {
      return { exists: true, cardHolder: matchedApp.fullName, balance: 20000, status: "active" };
    }
    return { exists: false };
  };

  const chargeFarmerCard = (cardNumber: string, amount: number, itemDesc: string) => {
    const cleaned = cardNumber.trim();
    const info = checkFarmerCardBalance(cleaned);
    if (!info || !info.exists || !("balance" in info)) {
      return { success: false, message: "Kishan Credit Card not found or not active." };
    }
    const currentBalance = info.balance ?? 0;
    const holderName = info.cardHolder ?? "Farmer";

    if (currentBalance < amount) {
      return { success: false, message: `Insufficient balance on KCC. Current available limit: ₹${currentBalance}` };
    }

    const newBalance = currentBalance - amount;
    setFarmerCardStore(prev => ({
      ...prev,
      [cleaned]: {
        cardHolder: holderName,
        balance: newBalance,
        status: "active"
      }
    }));

    addNotification(
      "KCC Payment Debited",
      `₹${amount} debited for "${itemDesc}" from Card ${cleaned} (${holderName}).`,
      "success",
      "/wallet",
      "wallet"
    );

    return {
      success: true,
      message: `Payment of ₹${amount} debited successfully!`,
      remainingBalance: newBalance
    };
  };

  // Cart & Order State Management (Personal per user)
  const cartStorageKey = user ? `krivexa_cart_${user.phone || user.id}` : "krivexa_cart_guest";
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(cartStorageKey);
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<CartOrder[]>(() => {
    const saved = localStorage.getItem("krivexa_cart_orders");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const saved = localStorage.getItem(cartStorageKey);
    setCart(saved ? JSON.parse(saved) : []);
  }, [cartStorageKey]);

  useEffect(() => {
    localStorage.setItem(cartStorageKey, JSON.stringify(cart));
  }, [cart, cartStorageKey]);

  useEffect(() => {
    localStorage.setItem("krivexa_cart_orders", JSON.stringify(orders));
  }, [orders]);

  const addToCart = (item: { id: string; name: string; category?: string; price: number; unit?: string; image?: string; sellerName?: string }) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === item.id);
      if (existing) {
        return prev.map((i) => (i.productId === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [
        ...prev,
        {
          id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          productId: item.id,
          name: item.name,
          category: item.category,
          price: item.price,
          unit: item.unit,
          image: item.image,
          quantity: 1,
          sellerName: item.sellerName,
        },
      ];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const updateCartQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)));
  };

  const clearCart = () => {
    setCart([]);
  };

  const checkoutCart = (paymentMethod: "kcc" | "upi" | "cod" | "wallet", deliveryAddress: string) => {
    if (cart.length === 0) {
      return { success: false, message: "Your cart is empty!" };
    }
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (paymentMethod === "kcc") {
      const kccCard = kccDetails?.cardNumber || "KCC-BH-2026-9041";
      const chargeRes = chargeFarmerCard(kccCard, totalAmount, `Order of ${cart.length} items`);
      if (!chargeRes.success) {
        return chargeRes;
      }
    }

    const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: CartOrder = {
      id: orderId,
      userId: user?.id || "guest",
      userName: user?.name || "Customer",
      items: [...cart],
      totalAmount,
      paymentMethod,
      deliveryAddress,
      status: "Confirmed",
      createdAt: new Date().toISOString(),
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();

    addNotification(
      "Order Placed Successfully! 🛒",
      `Order ${orderId} for ₹${totalAmount} has been placed. Items will be delivered to ${deliveryAddress || "your registered address"}.`,
      "success",
      "/cart",
      "orders"
    );

    return {
      success: true,
      message: `Order ${orderId} placed successfully!`,
      orderId,
    };
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,

        isKccIssued,
        hasAppliedKcc,
        kccApplicationStatus,
        kccDetails,
        isKccAlertOpen,
        setIsKccAlertOpen,
        isKccAppModalOpen,
        setIsKccAppModalOpen,
        checkKccPermission,
        submitKccApplication,
        toggleKccDemoStatus,

        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        checkoutCart,
        orders,

        isAdminLoggedIn,
        adminLogin,
        adminLogout,

        cropListings,
        addCropListing,
        approveCropListing,
        rejectCropListing,

        machineryBookings,
        addMachineryBooking,
        allotMachineryBooking,
        rejectMachineryBooking,

        labourTypes,
        addLabourType,
        removeLabourType,
        labourBookings,
        addLabourBooking,
        assignLaboursToBooking,

        expertAdviceQueries,
        addExpertQuery,
        updateExpertQueryStatus,

        mandiRates,
        addMandiRate,
        updateMandiRate,
        deleteMandiRate,

        user,
        loginUser,
        logoutUser,
        updateUserProfile,

        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        deleteNotification,
        clearAllNotifications,
        addNotification,

        kccApplications,
        approveKccApplication,
        rejectKccApplication,

        dealerApplyFarmerKcc,
        checkFarmerCardBalance,
        chargeFarmerCard,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
