const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const checkMongoHealth = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/health`);
    if (!res.ok) return { isConnected: false, database: 'Farma' };
    return await res.json();
  } catch (err: any) {
    return { isConnected: false, database: 'Farma', error: err?.message || String(err) };
  }
};

export const seedMongoDatabase = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/seed`, { method: 'POST' });
    return await res.json();
  } catch (err: any) {
    console.warn('[MongoDB Client API] Seed request failed:', err?.message || String(err));
    return null;
  }
};

// Generic API caller with try/catch
async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
      ...options,
    });
    if (!res.ok) {
      throw new Error(`API Error: ${res.statusText}`);
    }
    return await res.json();
  } catch (err: any) {
    console.warn(`[MongoDB Client API] Fetch failed for ${endpoint}:`, err?.message || String(err));
    return null;
  }
}

export const api = {
  // Health & Seed
  checkHealth: checkMongoHealth,
  seedDatabase: seedMongoDatabase,

  // Users
  getUsers: () => apiFetch<any[]>('/users'),
  getUserById: (id: string) => apiFetch<any>(`/users?id=${encodeURIComponent(id)}`),
  saveUser: (user: any) => apiFetch<any>('/users', { method: 'POST', body: JSON.stringify(user) }),
  updateUser: (id: string, updated: any) => apiFetch<any>(`/users/${id}`, { method: 'PUT', body: JSON.stringify(updated) }),

  // KCC
  getKccApplications: () => apiFetch<any[]>('/kcc'),
  submitKccApplication: (app: any) => apiFetch<any>('/kcc', { method: 'POST', body: JSON.stringify(app) }),
  approveKccApplication: (id: string, cardNumber?: string) => apiFetch<any>(`/kcc/${id}/approve`, { method: 'PUT', body: JSON.stringify({ cardNumber }) }),
  rejectKccApplication: (id: string) => apiFetch<any>(`/kcc/${id}/reject`, { method: 'PUT' }),

  // Crops
  getCrops: () => apiFetch<any[]>('/crops'),
  addCrop: (crop: any) => apiFetch<any>('/crops', { method: 'POST', body: JSON.stringify(crop) }),
  approveCrop: (id: string) => apiFetch<any>(`/crops/${id}/approve`, { method: 'PUT' }),
  rejectCrop: (id: string) => apiFetch<any>(`/crops/${id}/reject`, { method: 'PUT' }),

  // Labour
  getLabourBookings: () => apiFetch<any[]>('/labour/bookings'),
  addLabourBooking: (booking: any) => apiFetch<any>('/labour/bookings', { method: 'POST', body: JSON.stringify(booking) }),
  assignLabours: (id: string, assignedLabours: any[], adminNotes?: string) => apiFetch<any>(`/labour/bookings/${id}/assign`, { method: 'PUT', body: JSON.stringify({ assignedLabours, adminNotes }) }),
  getLabourTypes: () => apiFetch<string[]>('/labour/types'),
  addLabourType: (type: string) => apiFetch<any>('/labour/types', { method: 'POST', body: JSON.stringify({ type }) }),
  removeLabourType: (type: string) => apiFetch<any>(`/labour/types/${encodeURIComponent(type)}`, { method: 'DELETE' }),

  // Machinery
  getMachineryBookings: () => apiFetch<any[]>('/machinery'),
  addMachineryBooking: (booking: any) => apiFetch<any>('/machinery', { method: 'POST', body: JSON.stringify(booking) }),
  allotMachinery: (id: string, machineDetails: string, adminNotes?: string) => apiFetch<any>(`/machinery/${id}/allot`, { method: 'PUT', body: JSON.stringify({ machineDetails, adminNotes }) }),
  rejectMachinery: (id: string) => apiFetch<any>(`/machinery/${id}/reject`, { method: 'PUT' }),

  // Expert Advice
  getExpertQueries: () => apiFetch<any[]>('/expert'),
  addExpertQuery: (query: any) => apiFetch<any>('/expert', { method: 'POST', body: JSON.stringify(query) }),
  updateExpertQuery: (id: string, status: string, adminReply?: string) => apiFetch<any>(`/expert/${id}`, { method: 'PUT', body: JSON.stringify({ status, adminReply }) }),

  // Mandi Rates
  getMandiRates: () => apiFetch<any[]>('/mandi'),
  addMandiRate: (rate: any) => apiFetch<any>('/mandi', { method: 'POST', body: JSON.stringify(rate) }),
  updateMandiRate: (id: string, updated: any) => apiFetch<any>(`/mandi/${id}`, { method: 'PUT', body: JSON.stringify(updated) }),
  deleteMandiRate: (id: string) => apiFetch<any>(`/mandi/${id}`, { method: 'DELETE' }),

  // Dealer Listings
  getDealerListings: () => apiFetch<any[]>('/dealer/listings'),
  addDealerListing: (item: any) => apiFetch<any>('/dealer/listings', { method: 'POST', body: JSON.stringify(item) }),
  updateDealerListing: (id: string, updated: any) => apiFetch<any>(`/dealer/listings/${id}`, { method: 'PUT', body: JSON.stringify(updated) }),
  approveDealerListing: (id: string) => apiFetch<any>(`/dealer/listings/${id}/approve`, { method: 'PUT' }),
  rejectDealerListing: (id: string) => apiFetch<any>(`/dealer/listings/${id}/reject`, { method: 'PUT' }),

  // Registered Farmers
  getRegisteredFarmers: () => apiFetch<any[]>('/farmers'),
  registerFarmer: (farmer: any) => apiFetch<any>('/farmers', { method: 'POST', body: JSON.stringify(farmer) }),

  // Orders
  getOrders: () => apiFetch<any[]>('/orders'),
  createOrder: (order: any) => apiFetch<any>('/orders', { method: 'POST', body: JSON.stringify(order) }),
  updateOrderStatus: (id: string, status: string) => apiFetch<any>(`/orders/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),

  // Pathshala
  getPathshalaVideos: () => apiFetch<any[]>('/pathshala'),
  addPathshalaVideo: (video: any) => apiFetch<any>('/pathshala', { method: 'POST', body: JSON.stringify(video) }),
  deletePathshalaVideo: (id: string) => apiFetch<any>(`/pathshala/${id}`, { method: 'DELETE' }),

  // Notifications
  getNotifications: () => apiFetch<any[]>('/notifications'),
  addNotification: (notif: any) => apiFetch<any>('/notifications', { method: 'POST', body: JSON.stringify(notif) }),
  markNotificationRead: (id: string) => apiFetch<any>(`/notifications/${id}/read`, { method: 'PUT' }),
  markAllNotificationsRead: () => apiFetch<any>('/notifications/read-all', { method: 'PUT' }),
  deleteNotification: (id: string) => apiFetch<any>(`/notifications/${id}`, { method: 'DELETE' }),
  clearAllNotifications: () => apiFetch<any>('/notifications', { method: 'DELETE' }),

  // Farmer Cards & Charging
  checkFarmerCardBalance: (cardNumber: string) => apiFetch<any>(`/cards/${encodeURIComponent(cardNumber)}`),
  chargeFarmerCard: (cardNumber: string, amount: number) => apiFetch<any>('/cards/charge', { method: 'POST', body: JSON.stringify({ cardNumber, amount }) }),
};
