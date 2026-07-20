// ParkEase SaaS - Smart Parking Slot Booking System - Prototype Application Logic

// ==========================================
// 1. MOCK DATABASE & LOCALSTORE PERSISTENCE
// ==========================================

const INITIAL_PARKINGS = [
  {
    id: "park-1",
    name: "MG Road Smart Parking",
    address: "MG Road, Shivaji Nagar, Bengaluru, Karnataka",
    coordinates: { lat: 12.9716, lng: 77.5946 },
    hourlyRate: 3.50,
    rating: 4.8,
    status: "Approved",
    upiId: "blrmg@upi",
    image: "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&q=80&w=400",
    description: "Centrally located premium multi-level parking lot on MG Road. Equipped with smart camera entry, EV fast chargers, and security guards.",
    amenities: ["EV Charging", "CCTV", "Valet Service", "Covered"],
    slots: {
      F1: [
        { id: "A-1", status: "occupied", category: "General" },
        { id: "A-2", status: "occupied", category: "General" },
        { id: "A-3", status: "available", category: "General" },
        { id: "A-4", status: "available", category: "General" },
        { id: "A-5", status: "reserved", category: "General" },
        { id: "A-6", status: "available", category: "General" }
      ],
      F2: [
        { id: "B-1", status: "available", category: "EV Charging" },
        { id: "B-2", status: "occupied", category: "EV Charging" },
        { id: "B-3", status: "available", category: "EV Charging" },
        { id: "B-4", status: "maintenance", category: "EV Charging" }
      ],
      F3: [
        { id: "C-1", status: "available", category: "Premium" },
        { id: "C-2", status: "reserved", category: "Premium" }
      ]
    }
  },
  {
    id: "park-2",
    name: "Hitech City Parking Hub",
    address: "Hitech City, Madhapur, Hyderabad, Telangana",
    coordinates: { lat: 17.4483, lng: 78.3741 },
    hourlyRate: 2.50,
    rating: 4.6,
    status: "Approved",
    upiId: "hydhitech@upi",
    image: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&q=80&w=400",
    description: "Multi-level commercial parking plaza in the heart of Hitech City. Offers swift valet dropoffs and secure bike & car zones.",
    amenities: ["CCTV", "24x7", "Covered"],
    slots: {
      F1: [
        { id: "M-1", status: "occupied", category: "General" },
        { id: "M-2", status: "occupied", category: "General" },
        { id: "M-3", status: "available", category: "General" }
      ],
      F2: [
        { id: "E-1", status: "available", category: "EV Charging" },
        { id: "E-2", status: "occupied", category: "EV Charging" }
      ],
      F3: [
        { id: "V-1", status: "available", category: "Valet" }
      ]
    }
  },
  {
    id: "park-3",
    name: "Banjara Hills Premium Garage",
    address: "Road No. 1, Banjara Hills, Hyderabad, Telangana",
    coordinates: { lat: 17.4165, lng: 78.4436 },
    hourlyRate: 4.00,
    rating: 4.9,
    status: "Approved",
    upiId: "hydbanjara@upi",
    image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&q=80&w=400",
    description: "Premium underground multi-level parking with secure camera coverages and full car wash service.",
    amenities: ["Valet Service", "EV Charging", "CCTV", "24x7"],
    slots: {
      F1: [
        { id: "W-1", status: "occupied", category: "General" },
        { id: "W-2", status: "available", category: "General" }
      ],
      F2: [
        { id: "WE-1", status: "available", category: "EV Charging" }
      ]
    }
  },
  {
    id: "park-4",
    name: "Koramangala Commercial Parking",
    address: "80 Feet Rd, Koramangala, Bengaluru, Karnataka",
    coordinates: { lat: 12.9352, lng: 77.6244 },
    hourlyRate: 2.00,
    rating: 4.4,
    status: "Approved",
    upiId: "blrkor@upi",
    image: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&q=80&w=400",
    description: "Spacious community parking zone near restaurants and shopping complexes.",
    amenities: ["CCTV", "Covered"],
    slots: {
      F1: [
        { id: "K-1", status: "available", category: "General" }
      ]
    }
  },
  {
    id: "park-5",
    name: "Whitefield ITPL Parking",
    address: "ITPL Main Rd, Whitefield, Bengaluru, Karnataka",
    coordinates: { lat: 12.9866, lng: 77.7346 },
    hourlyRate: 3.00,
    rating: 4.7,
    status: "Approved",
    upiId: "blrwhitefield@upi",
    image: "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&q=80&w=400",
    description: "Tech park adjacent parking layout. Fast charging nodes for EVs.",
    amenities: ["EV Charging", "CCTV", "Covered"],
    slots: {
      F1: [
        { id: "WF-1", status: "available", category: "General" }
      ]
    }
  },
  {
    id: "park-6",
    name: "Chennai Central Multi-Level",
    address: "Kannappar Thidal, Periyamet, Chennai, Tamil Nadu",
    coordinates: { lat: 13.0827, lng: 80.2707 },
    hourlyRate: 3.50,
    rating: 4.5,
    status: "Approved",
    upiId: "chncentral@upi",
    image: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&q=80&w=400",
    description: "Commuter centric multi-floor parking setup near transit stations.",
    amenities: ["CCTV", "Valet Service", "24x7"],
    slots: {
      F1: [
        { id: "CH-1", status: "available", category: "General" }
      ]
    }
  },
  {
    id: "park-7",
    name: "Benz Circle Parking Plaza",
    address: "Benz Circle, Vijayawada, Andhra Pradesh",
    coordinates: { lat: 16.5062, lng: 80.6480 },
    hourlyRate: 1.50,
    rating: 4.3,
    status: "Approved",
    upiId: "vjbenz@upi",
    image: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&q=80&w=400",
    description: "Automated parking tower at Benz Circle junction, offering fast entry validation and secure parking zones.",
    amenities: ["CCTV", "24x7"],
    slots: {
      F1: [
        { id: "VJ-1", status: "available", category: "General" }
      ]
    }
  },
  {
    id: "park-8",
    name: "Vizag Beach Road Parking",
    address: "Beach Road, Visakhapatnam, Andhra Pradesh",
    coordinates: { lat: 17.7120, lng: 83.3220 },
    hourlyRate: 2.00,
    rating: 4.6,
    status: "Approved",
    upiId: "vizbeach@upi",
    image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&q=80&w=400",
    description: "Scenic parking area overlooking Vizag beach. Direct access to walking tracks and tourist points.",
    amenities: ["CCTV", "Covered"],
    slots: {
      F1: [
        { id: "VIZ-1", status: "available", category: "General" }
      ]
    }
  },
  {
    id: "park-9",
    name: "Mysuru Palace Parking",
    address: "Near Mysore Palace, Mysuru, Karnataka",
    coordinates: { lat: 12.3052, lng: 76.6552 },
    hourlyRate: 1.50,
    rating: 4.8,
    status: "Approved",
    upiId: "myspalace@upi",
    image: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&q=80&w=400",
    description: "Spacious parking lot situated right next to the historic Mysore Palace. Excellent option for tourists and visitors.",
    amenities: ["CCTV", "24x7"],
    slots: {
      F1: [
        { id: "MYS-1", status: "available", category: "General" }
      ]
    }
  },
  {
    id: "park-10",
    name: "Coimbatore Town Hall Parking",
    address: "Town Hall Road, Coimbatore, Tamil Nadu",
    coordinates: { lat: 10.9982, lng: 76.9616 },
    hourlyRate: 2.00,
    rating: 4.4,
    status: "Approved",
    upiId: "cbetown@upi",
    image: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&q=80&w=400",
    description: "Spacious community parking zone near restaurants and shopping complexes.",
    amenities: ["CCTV", "Covered"],
    slots: {
      F1: [
        { id: "CBE-1", status: "available", category: "General" }
      ]
    }
  },
  {
    id: "park-11",
    name: "Tirupati Alipiri Plaza",
    address: "Alipiri Road, Tirupati, Andhra Pradesh",
    coordinates: { lat: 13.6288, lng: 79.4192 },
    hourlyRate: 2.50,
    rating: 4.7,
    status: "Approved",
    upiId: "tptalipiri@upi",
    image: "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&q=80&w=400",
    description: "Tech park adjacent parking layout. Fast charging nodes for EVs.",
    amenities: ["CCTV", "Covered", "24x7"],
    slots: {
      F1: [
        { id: "TPT-1", status: "available", category: "General" }
      ]
    }
  },
  {
    id: "park-12",
    name: "Madurai Temple View Parking",
    address: "West Tower Street, Madurai, Tamil Nadu",
    coordinates: { lat: 9.9197, lng: 78.1194 },
    hourlyRate: 1.75,
    rating: 4.5,
    status: "Approved",
    upiId: "mdrtemple@upi",
    image: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&q=80&w=400",
    description: "Commuter centric multi-floor parking setup near transit stations.",
    amenities: ["CCTV", "24x7"],
    slots: {
      F1: [
        { id: "MDU-1", status: "available", category: "General" }
      ]
    }
  },
  {
    id: "park-13",
    name: "Mangaluru Hampankatta Garage",
    address: "Hampankatta, Mangaluru, Karnataka",
    coordinates: { lat: 12.8703, lng: 74.8427 },
    hourlyRate: 2.00,
    rating: 4.3,
    status: "Approved",
    upiId: "mlrhampan@upi",
    image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&q=80&w=400",
    description: "Scenic parking area overlooking Vizag beach. Direct access to walking tracks and tourist points.",
    amenities: ["CCTV", "Covered"],
    slots: {
      F1: [
        { id: "MLR-1", status: "available", category: "General" }
      ]
    }
  }
];

const INITIAL_BOOKINGS = [
  {
    id: "PE-8294-A9",
    parkingId: "park-1",
    parkingName: "MG Road Smart Parking",
    slotId: "A-5",
    date: new Date().toISOString().split('T')[0],
    time: "10:30",
    duration: 2,
    price: 9.50,
    status: "Active", // Active, Completed, Cancelled, Overstayed
    qrCode: "PE-8294-A9"
  }
];

const INITIAL_MANAGERS = [
  { id: "m-1", name: "Helena Vance", email: "owner@parkease.com", password: "password123", branchId: "park-1", joined: "2025-11-20" },
  { id: "m-2", name: "Michael Vance", email: "metro@parkease.com", password: "password123", branchId: "park-2", joined: "2026-02-10" }
];

const INITIAL_CUSTOMERS = [
  { id: "c-1", name: "Sarah Jenkins", email: "customer@parkease.com", password: "password123", phone: "+1 (555) 390-4820", status: "Active", joined: "2026-01-15" },
  { id: "c-2", name: "James Collins", email: "james@gmail.com", password: "password123", phone: "+1 (555) 120-9428", status: "Active", joined: "2026-03-02" },
  { id: "c-3", name: "Robert Miller", email: "robert@outlook.com", password: "password123", phone: "+1 (555) 290-1829", status: "Blocked", joined: "2026-04-18" }
];

const INITIAL_NOTIFICATIONS = [
  { id: "n-1", title: "Booking Confirmation", text: "Your reservation PE-8294-A9 at City Center has been verified.", time: "1 hour ago", read: false }
];

class LocalStore {
  static get(key, defaultData) {
    const data = localStorage.getItem("pk_saas_" + key);
    return data ? JSON.parse(data) : defaultData;
  }
  static set(key, data) {
    localStorage.setItem("pk_saas_" + key, JSON.stringify(data));
  }
}

// Global Application State
const state = {
  parkings: LocalStore.get("parkings", INITIAL_PARKINGS),
  bookings: LocalStore.get("bookings", INITIAL_BOOKINGS),
  managers: LocalStore.get("managers", INITIAL_MANAGERS),
  customers: LocalStore.get("customers", INITIAL_CUSTOMERS),
  notifications: LocalStore.get("notifications", INITIAL_NOTIFICATIONS),
  vehicles: LocalStore.get("vehicles", [
    { id: "v-1", model: "Tesla Model 3", plate: "CA-482-Y92", type: "electric", isPrimary: true }
  ]),
  payments: LocalStore.get("payments", [
    { id: "p-1", cardholder: "Sarah Jenkins", brand: "Visa", last4: "4022", expiry: "08/29", isPrimary: true }
  ]),
  currentRole: LocalStore.get("current_role", null), // null (logged out), customer, owner, admin
  activeUser: LocalStore.get("active_user", null), // active customer/manager object
  activeScreen: "landing",
  selectedParking: null,
  selectedSlot: null,
  selectedFloor: "F1",
  activeHistoryTab: "active",
  activeProfileSection: "personal",
  // GPS simulated device coordinates (MG Road, Bengaluru)
  userCoords: { lat: 12.9716, lng: 77.5946 },
  loginRole: "customer", // customer, owner, admin
  settings: LocalStore.get("settings", {
    costMultiplier: 1.0,
    currency: "USD"
  })
};

function saveState() {
  LocalStore.set("parkings", state.parkings);
  LocalStore.set("bookings", state.bookings);
  LocalStore.set("managers", state.managers);
  LocalStore.set("customers", state.customers);
  LocalStore.set("notifications", state.notifications);
  LocalStore.set("vehicles", state.vehicles);
  LocalStore.set("payments", state.payments);
  LocalStore.set("current_role", state.currentRole);
  LocalStore.set("active_user", state.activeUser);
  LocalStore.set("settings", state.settings);
}

// GPS Distance calculator (Haversine formula)
function getGPSDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return (R * c * 0.621371).toFixed(1); // miles
}

// ==========================================
// 2. TOAST NOTIFICATION API
// ==========================================

window.showToast = function(title, message, type = "success") {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  
  let iconColor = "var(--primary)";
  if (type === "success") iconColor = "var(--success)";
  if (type === "warning") iconColor = "var(--warning)";
  if (type === "danger") iconColor = "var(--danger)";

  toast.innerHTML = `
    <div style="color:${iconColor}; margin-top:2px;">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
    </div>
    <div>
      <h4 style="font-size:0.85rem; font-weight:700; color:var(--secondary);">${title}</h4>
      <p style="font-size:0.75rem; color:var(--text-muted); margin-top:1px;">${message}</p>
    </div>
    <button class="toast-close">&times;</button>
  `;

  toast.querySelector(".toast-close").onclick = () => toast.remove();
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = "toastIn 0.3s reverse ease-out forwards";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
};

// ==========================================
// 3. ROUTER & SCREEN SYSTEMS
// ==========================================

const SCREENS = [
  "landing", "landing-contact", "login", "register",
  "forgot-password", "otp-verify", "password-reset", "customer-dashboard",
  "search-parking", "parking-details", "slot-booking", "booking-confirmation",
  "booking-history", "profile", "404", "unauthorized", "admin-notifications", "admin-settings", "active-booking", "notifications", "settings"
];

let map = null;

function navigateTo(screenId, params = {}, replaceHistory = false) {
  let targetSection = null;
  if (["landing-features", "landing-about", "landing-faq"].includes(screenId)) {
    targetSection = screenId;
    screenId = "landing";
  }

  // Check if valid screen
  if (!SCREENS.includes(screenId) && !screenId.startsWith("owner-") && !screenId.startsWith("admin-")) {
    screenId = "404";
  }

  // Intercept authenticated users visiting public pages
  const publicScreens = ["landing", "login", "register", "forgot-password", "otp-verify", "password-reset"];
  if (state.currentRole && publicScreens.includes(screenId)) {
    if (state.currentRole === "customer") {
      screenId = "customer-dashboard";
    } else if (state.currentRole === "owner") {
      screenId = "owner-overview";
    } else if (state.currentRole === "admin") {
      screenId = "admin-overview";
    }
    replaceHistory = true;
  }

  // Intercept unauthenticated users visiting private screens
  const customerScreens = ["customer-dashboard", "search-parking", "parking-details", "slot-booking", "booking-confirmation", "booking-history", "active-booking", "notifications", "settings"];
  const ownerScreens = ["owner-overview", "owner-branch", "owner-manage-slots", "owner-bookings", "owner-customers", "owner-revenue", "owner-reports", "owner-notifications", "owner-profile"];
  const adminScreens = ["admin-overview", "admin-managers", "admin-areas", "admin-users", "admin-notifications", "admin-settings"];
  const commonScreens = ["profile"];
  const allPrivateScreens = [...customerScreens, ...ownerScreens, ...adminScreens, ...commonScreens];

  if (allPrivateScreens.includes(screenId) && !state.currentRole) {
    screenId = "login";
    window.showToast("Authentication Required", "Please sign in to access this page.", "warning");
    replaceHistory = true;
  }

  // Intercept authenticated users visiting screens that don't match their role
  if (state.currentRole) {
    if (state.currentRole === "customer" && (ownerScreens.includes(screenId) || adminScreens.includes(screenId))) {
      screenId = "unauthorized";
      replaceHistory = true;
    } else if (state.currentRole === "owner" && (customerScreens.includes(screenId) || adminScreens.includes(screenId))) {
      screenId = "unauthorized";
      replaceHistory = true;
    } else if (state.currentRole === "admin" && (customerScreens.includes(screenId) || ownerScreens.includes(screenId))) {
      screenId = "unauthorized";
      replaceHistory = true;
    }
  }

  // Apply history state replacement or location hashing
  if (replaceHistory) {
    window.history.replaceState(null, "", `#${screenId}`);
  } else if (window.location.hash !== `#${screenId}`) {
    window.location.hash = `#${screenId}`;
  }

  state.activeScreen = screenId;
  document.getElementById("notif-dropdown").classList.remove("active");

  const header = document.querySelector(".main-header");
  const ownerLayout = document.getElementById("owner-dashboard-layout");
  const adminLayout = document.getElementById("admin-dashboard-layout");

  // Reset standard screens
  SCREENS.forEach(screen => {
    const el = document.getElementById(`screen-${screen}`);
    if (el) el.classList.remove("active");
  });

  // Toggle Close (X) button display:
  const closeBtn = document.getElementById("header-close-btn");
  if (closeBtn) {
    const isDashboard = ["customer-dashboard", "owner-overview", "admin-overview", "landing"].includes(screenId);
    if (state.currentRole && !isDashboard) {
      closeBtn.style.display = "flex";
      closeBtn.onclick = () => {
        if (state.currentRole === "customer") {
          navigateTo("customer-dashboard");
        } else if (state.currentRole === "owner") {
          navigateTo("owner-overview");
        } else if (state.currentRole === "admin") {
          navigateTo("admin-overview");
        }
      };
    } else {
      closeBtn.style.display = "none";
    }
  }

  if (state.currentRole === "owner") {
    if (screenId === "profile" || screenId === "unauthorized") {
      header.style.display = "flex";
      ownerLayout.style.display = "none";
      adminLayout.style.display = "none";
      const target = document.getElementById(`screen-${screenId}`);
      if (target) target.classList.add("active");
    } else {
      header.style.display = "flex";
      ownerLayout.style.display = "flex";
      adminLayout.style.display = "none";
      showOwnerSubscreen(screenId);
    }
  } else if (state.currentRole === "admin") {
    if (screenId === "profile" || screenId === "unauthorized") {
      header.style.display = "flex";
      ownerLayout.style.display = "none";
      adminLayout.style.display = "none";
      const target = document.getElementById(`screen-${screenId}`);
      if (target) target.classList.add("active");
    } else {
      header.style.display = "flex";
      ownerLayout.style.display = "none";
      adminLayout.style.display = "flex";
      showAdminSubscreen(screenId);
    }
  } else {
    header.style.display = "flex";
    ownerLayout.style.display = "none";
    adminLayout.style.display = "none";
    const target = document.getElementById(`screen-${screenId}`);
    if (target) target.classList.add("active");
  }

  // Update hash path
  if (window.location.hash !== `#${targetSection || screenId}`) {
    window.location.hash = `#${targetSection || screenId}`;
  }

  // Highlight navigation header links
  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.remove("active");
    const linkScreen = link.getAttribute("data-screen");
    if (linkScreen === screenId || (targetSection && linkScreen === targetSection)) {
      link.classList.add("active");
    }
  });

  if (targetSection) {
    setTimeout(() => {
      const el = document.getElementById(targetSection);
      if (el) {
        const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - 70;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }, 100);
  }

  // Call lifecycles
  onScreenLoaded(screenId, params);
}

function showOwnerSubscreen(id) {
  document.querySelectorAll(".owner-subscreen").forEach(el => el.style.display = "none");
  const activeSub = document.getElementById(`screen-${id}`) || document.getElementById("screen-owner-overview");
  if (activeSub) activeSub.style.display = "block";

  document.querySelectorAll(".sidebar-link").forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("data-owner-screen") === id) {
      link.classList.add("active");
    }
  });
}

function showAdminSubscreen(id) {
  document.querySelectorAll(".admin-subscreen").forEach(el => el.style.display = "none");
  const activeSub = document.getElementById(`screen-${id}`) || document.getElementById("screen-admin-overview");
  if (activeSub) activeSub.style.display = "block";

  document.querySelectorAll(".sidebar-link").forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("data-admin-screen") === id) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("hashchange", () => {
  const hash = window.location.hash.substring(1) || "landing";
  
  if (state.currentRole === "owner") {
    if (["owner-overview", "owner-branch", "owner-manage-slots", "owner-bookings", "owner-customers", "owner-revenue", "owner-reports", "owner-notifications", "owner-profile", "profile", "unauthorized"].includes(hash)) {
      navigateTo(hash);
    }
  } else if (state.currentRole === "admin") {
    if (["admin-overview", "admin-managers", "admin-areas", "admin-users", "admin-notifications", "admin-settings", "profile", "unauthorized"].includes(hash)) {
      navigateTo(hash);
    }
  } else {
    if (SCREENS.includes(hash) || ["landing-features", "landing-about", "landing-faq"].includes(hash)) {
      navigateTo(hash);
    }
  }
});

// ==========================================
// 4. SCREEN INITIALIZATION LIFECYCLES
// ==========================================

function updateBreadcrumbs(screenId) {
  const customerCurrent = document.getElementById("customer-breadcrumb-current");
  const ownerCurrent = document.getElementById("owner-breadcrumb-current");
  const adminCurrent = document.getElementById("admin-breadcrumb-current");

  let text = "Overview";
  if (screenId.includes("booking-confirmation") || screenId.includes("confirmation")) text = "Booking Confirmation";
  else if (screenId.includes("booking-history") || screenId.includes("bookings")) text = "My Bookings";
  else if (screenId.includes("slot-booking") || screenId.includes("booking")) text = "Book Parking Spot";
  else if (screenId.includes("search") || screenId.includes("find")) text = "Find Parking Lot";
  else if (screenId.includes("details")) text = "Parking Garage Details";
  else if (screenId.includes("active")) text = "Active Check-In";
  else if (screenId.includes("notifications")) text = "System Announcements";
  else if (screenId.includes("settings")) text = "Preferences";
  else if (screenId.includes("profile")) text = "Personal Settings";
  else if (screenId.includes("slots")) text = "Parking Slots Layout";
  else if (screenId.includes("customers")) text = "Customer Directories";
  else if (screenId.includes("revenue")) text = "Revenue Statements";
  else if (screenId.includes("reports")) text = "Occupancy Analytics";
  else if (screenId.includes("managers")) text = "Branch Managers Registry";
  else if (screenId.includes("areas")) text = "Parking Branches Configs";
  else if (screenId.includes("users")) text = "User Access Log";

  if (customerCurrent) customerCurrent.innerText = text;
  if (ownerCurrent) ownerCurrent.innerText = text;
  if (adminCurrent) adminCurrent.innerText = text;
}

function onScreenLoaded(screenId, params) {
  updateBreadcrumbs(screenId);
  switch (screenId) {
    case "customer-dashboard":
      renderCustomerDashboard();
      break;
    case "search-parking":
      initLeafletMap();
      renderSearchParkingMap();
      break;
    case "parking-details":
      const pId = params.id || state.selectedParking?.id || state.parkings[0].id;
      renderParkingDetails(pId);
      break;
    case "slot-booking":
      renderSlotBooking();
      break;
    case "booking-confirmation":
      renderBookingConfirmation(params.bookingId || state.bookings[0].id);
      break;
    case "booking-history":
      renderBookingHistory();
      break;
    case "profile":
      renderProfilePage();
      break;
    case "active-booking":
      renderActiveBookingScreen();
      break;
    case "notifications":
      renderCustomerNotifications();
      break;
    case "settings":
      renderCustomerSettings();
      break;

    // Owner Subscreens
    case "owner-overview":
      renderOwnerOverview();
      break;
    case "owner-branch":
      renderOwnerBranch();
      break;
    case "owner-manage-slots":
      renderOwnerManageSlots();
      break;
    case "owner-bookings":
      renderOwnerBookings();
      break;
    case "owner-customers":
      renderOwnerCustomers();
      break;
    case "owner-revenue":
      renderOwnerRevenue();
      break;
    case "owner-reports":
      renderOwnerReports();
      break;
    case "owner-notifications":
      renderOwnerNotifications();
      break;
    case "owner-profile":
      renderOwnerProfile();
      break;
    
    // Admin Subscreens
    case "admin-overview":
      renderAdminOverview();
      break;
    case "admin-managers":
      renderAdminManagers();
      break;
    case "admin-areas":
      renderAdminAreas();
      break;
    case "admin-users":
      renderAdminUsers();
      break;
    case "admin-notifications":
      renderAdminNotifications();
      break;
    case "admin-settings":
      renderAdminSettings();
      break;
  }
}

// Initialize Leaflet Map
function initLeafletMap() {
  const mapDiv = document.getElementById("leaflet-map");
  if (!mapDiv) return;

  if (map) {
    map.remove();
    map = null;
  }

  map = L.map('leaflet-map', { zoomControl: false }).setView([state.userCoords.lat, state.userCoords.lng], 14);
  L.control.zoom({ position: 'bottomright' }).addTo(map);

  const apiKey = import.meta.env.VITE_MAPTILER_API_KEY;
  L.tileLayer(`https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=${apiKey}`, {
    attribution: '&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  const gpsIcon = L.divIcon({
    className: 'gps-marker-icon',
    html: `<div style="background:var(--primary); width:14px; height:14px; border-radius:50%; border:3px solid white; box-shadow:0 0 10px rgba(37,99,235,0.6);"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7]
  });
  L.marker([state.userCoords.lat, state.userCoords.lng], { icon: gpsIcon })
    .addTo(map)
    .bindPopup("<b>Your GPS Location</b><br>MG Road, Bengaluru")
    .openPopup();
}

// ==========================================
// 5. CUSTOMER SCREEN BUILDERS
// ==========================================

function renderCustomerDashboard() {
  const container = document.getElementById("dashboard-nearby-parkings-container");
  container.innerHTML = "";

  const approvedList = state.parkings.filter(p => p.status === "Approved");
  approvedList.slice(0, 3).forEach(park => {
    const card = document.createElement("div");
    card.className = "card";
    card.style.cursor = "pointer";
    card.onclick = () => {
      state.selectedParking = park;
      navigateTo("parking-details", { id: park.id });
    };

    let free = 0;
    Object.values(park.slots).forEach(floor => {
      floor.forEach(slot => { if (slot.status === "available") free++; });
    });

    const dist = getGPSDistance(state.userCoords.lat, state.userCoords.lng, park.coordinates.lat, park.coordinates.lng);

    card.innerHTML = `
      <div style="height:140px; margin:-2.25rem -2.25rem 1.5rem; overflow:hidden; border-radius: var(--radius-lg) var(--radius-lg) 0 0;">
        <img src="${park.image}" style="width:100%; height:100%; object-fit:cover;" alt="${park.name}">
      </div>
      <h3>${park.name}</h3>
      <p style="margin-bottom: 0.5rem; font-size: 0.8rem; color:var(--text-muted);">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle; margin-right:4px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path></svg>
        ${park.address} (${dist} mi)
      </p>
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span class="price-tag">$${park.hourlyRate.toFixed(2)}/hr</span>
        <span class="slot-badge ${free > 5 ? 'available' : free > 0 ? 'limited' : 'full'}">${free} slots free</span>
      </div>
    `;
    container.appendChild(card);
  });

  const activeBox = document.getElementById("dashboard-active-bookings-container");
  activeBox.innerHTML = "";

  const active = state.bookings.filter(b => b.status === "Active");
  document.getElementById("active-booking-count-badge").innerText = `${active.length} Active`;

  if (active.length === 0) {
    activeBox.innerHTML = `<div class="empty-state" style="padding:1rem 0;"><p style="font-size:0.8rem;">No active slot reservations.</p></div>`;
  } else {
    active.forEach(b => {
      const item = document.createElement("div");
      item.style.padding = "1rem";
      item.style.border = "1px solid var(--border)";
      item.style.borderRadius = "var(--radius-md)";
      item.style.cursor = "pointer";
      item.onclick = () => navigateTo("booking-confirmation", { bookingId: b.id });

      item.innerHTML = `
        <div style="display:flex; justify-content:space-between; margin-bottom:0.25rem;">
          <h4 style="font-size:0.9rem; font-weight:700;">${b.parkingName}</h4>
          <span style="color:var(--primary); font-weight:700; font-size:0.85rem;">Slot ${b.slotId}</span>
        </div>
        <p style="font-size:0.75rem; color:var(--text-light);">Arrive: ${b.date} @ ${b.time} (${b.duration}h duration)</p>
      `;
      activeBox.appendChild(item);
    });
  }
}

function renderSearchParkingMap() {
  const listContainer = document.getElementById("map-screen-parking-list");
  if (!listContainer) return;

  // Render Skeletons for a beautiful SaaS loading state
  listContainer.innerHTML = `
    <div style="padding: 1.5rem; display: flex; flex-direction: column; gap: 1.5rem;">
      <div style="display: flex; gap: 1rem; align-items: center;">
        <div class="skeleton" style="width: 80px; height: 80px; border-radius: 12px; flex-shrink: 0;"></div>
        <div style="flex: 1; display: flex; flex-direction: column; gap: 0.6rem;">
          <div class="skeleton" style="width: 70%; height: 16px;"></div>
          <div class="skeleton" style="width: 45%; height: 12px;"></div>
          <div class="skeleton" style="width: 30%; height: 12px;"></div>
        </div>
      </div>
      <div style="display: flex; gap: 1rem; align-items: center;">
        <div class="skeleton" style="width: 80px; height: 80px; border-radius: 12px; flex-shrink: 0;"></div>
        <div style="flex: 1; display: flex; flex-direction: column; gap: 0.6rem;">
          <div class="skeleton" style="width: 60%; height: 16px;"></div>
          <div class="skeleton" style="width: 35%; height: 12px;"></div>
          <div class="skeleton" style="width: 25%; height: 12px;"></div>
        </div>
      </div>
    </div>
  `;

  // Simulate server response and render actual listings
  setTimeout(() => {
    // If screen has changed during load, don't write
    if (state.activeScreen !== "search-parking") return;

    listContainer.innerHTML = "";

    const filterType = document.querySelector(".filter-chip.active")?.getAttribute("data-filter") || "all";
    const searchVal = document.getElementById("map-search-input").value.toLowerCase();

    let filtered = state.parkings.filter(p => p.status === "Approved");

    if (searchVal) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(searchVal) || p.address.toLowerCase().includes(searchVal));
    }

    if (filterType === "price-low") {
      filtered.sort((a, b) => a.hourlyRate - b.hourlyRate);
    } else if (filterType === "nearest") {
      filtered.sort((a, b) => {
        const da = getGPSDistance(state.userCoords.lat, state.userCoords.lng, a.coordinates.lat, a.coordinates.lng);
        const db = getGPSDistance(state.userCoords.lat, state.userCoords.lng, b.coordinates.lat, b.coordinates.lng);
        return da - db;
      });
    } else if (filterType === "ev") {
      filtered = filtered.filter(p => p.amenities.includes("EV Charging"));
    } else if (filterType === "valet") {
      filtered = filtered.filter(p => p.amenities.includes("Valet Service"));
    } else if (filterType === "24x7") {
      filtered = filtered.filter(p => p.amenities.includes("24x7"));
    } else if (filterType === "covered") {
      filtered = filtered.filter(p => p.amenities.includes("Covered"));
    } else if (filterType === "bike") {
      filtered = filtered.filter(p => p.description.toLowerCase().includes("bike") || p.name.toLowerCase().includes("bike"));
    } else if (filterType === "car") {
      filtered = filtered.filter(p => p.description.toLowerCase().includes("car") || p.name.toLowerCase().includes("car") || p.description.toLowerCase().includes("plaza") || p.description.toLowerCase().includes("parking"));
    } else if (filterType === "rating") {
      filtered = filtered.filter(p => p.rating >= 4.5);
    }

    if (filtered.length === 0) {
      listContainer.innerHTML = `<div class="empty-state"><p>No slots found.</p></div>`;
      return;
    }

    filtered.forEach(park => {
      let free = 0;
      Object.values(park.slots).forEach(floor => {
        floor.forEach(slot => { if (slot.status === "available") free++; });
      });

      const dist = getGPSDistance(state.userCoords.lat, state.userCoords.lng, park.coordinates.lat, park.coordinates.lng);

      const card = document.createElement("div");
      card.className = `parking-card-horizontal ${state.selectedParking?.id === park.id ? 'active' : ''}`;

      card.innerHTML = `
        <img src="${park.image}" class="parking-card-image" alt="${park.name}">
        <div class="parking-card-details">
          <div>
            <h4 class="parking-card-title">${park.name}</h4>
            <div class="parking-card-meta">
              <span>★ ${park.rating}</span>
              <span>• ${dist} mi</span>
            </div>
          </div>
          <div class="parking-card-price-slot">
            <span class="price-tag">$${park.hourlyRate.toFixed(2)}/hr</span>
            <span class="slot-badge ${free > 5 ? 'available' : free > 0 ? 'limited' : 'full'}">${free} slots</span>
          </div>
        </div>
      `;
      listContainer.appendChild(card);

      if (map) {
        const customPin = L.divIcon({
          className: 'parking-marker-icon',
          html: `<div style="background:var(--secondary); color:white; padding:4px 8px; border-radius:12px; font-weight:800; font-size:0.75rem; box-shadow:var(--shadow-md); border:1px solid rgba(255,255,255,0.1); white-space:nowrap;">$${park.hourlyRate.toFixed(2)}</div>`,
          iconSize: [50, 24],
          iconAnchor: [25, 12]
        });

        const marker = L.marker([park.coordinates.lat, park.coordinates.lng], { icon: customPin }).addTo(map);
        
        marker.bindPopup(`
          <div style="cursor:pointer; text-align:center; padding: 5px;" onclick="window.navigateToBooking('${park.id}')">
            <div style="font-size:14px; font-weight:bold; color:var(--text); margin-bottom:4px;">📍 ${park.name}</div>
            <div style="font-size:12px; color:var(--primary); font-weight:600;">Click to Book ➔</div>
          </div>
        `);

        card.onclick = () => {
          state.selectedParking = park;
          document.querySelectorAll(".parking-card-horizontal").forEach(el => el.classList.remove("active"));
          card.classList.add("active");
          
          if (map) {
            map.setView([park.coordinates.lat, park.coordinates.lng], 15, { animate: false });
            marker.openPopup();
          }
        };
      }
    });

    if (filtered.length > 0 && searchVal && map) {
      const match = filtered[0];
      map.setView([match.coordinates.lat, match.coordinates.lng], 14, { animate: false });
    }

    if (map) {
      setTimeout(() => map.invalidateSize(), 100);
    }
  }, 350);
}

function renderParkingDetails(parkingId) {
  const park = state.parkings.find(p => p.id === parkingId);
  if (!park) return;
  state.selectedParking = park;

  document.getElementById("details-parking-name").innerText = park.name;
  document.getElementById("details-parking-addr").innerText = park.address;
  document.getElementById("details-parking-desc").innerText = park.description;
  document.getElementById("details-price-hour").innerText = `$${park.hourlyRate.toFixed(2)}/hr`;
  document.getElementById("details-rating-big").innerText = park.rating.toFixed(1);

  let free = 0;
  Object.values(park.slots).forEach(floor => {
    floor.forEach(slot => { if (slot.status === "available") free++; });
  });
  document.getElementById("details-available-badge").innerText = `${free} slots free`;
  document.getElementById("details-img-main").src = park.image;

  const container = document.getElementById("details-amenities-container");
  container.innerHTML = "";
  park.amenities.forEach(amen => {
    container.innerHTML += `
      <div class="amenity-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span>${amen}</span>
      </div>
    `;
  });

  const stars = document.getElementById("details-rating-stars-container");
  stars.innerHTML = "";
  const full = Math.floor(park.rating);
  for (let i = 0; i < 5; i++) {
    stars.innerHTML += `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="${i < full ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
  }

  const feed = document.getElementById("details-reviews-feed");
  feed.innerHTML = "";
  
  const reviews = [
    { user: "Michael C.", rating: 5, comment: "Pre-booking through ParkEase was effortless. Ramped in, camera scanned plate, gates lifted instantly.", date: "Yesterday" },
    { user: "Sarah T.", rating: 4, comment: "Spacious layout, helpful branch managers. Highly recommended.", date: "3 days ago" }
  ];

  reviews.forEach(rev => {
    let revStars = "";
    for (let s = 0; s < 5; s++) {
      revStars += `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="${s < rev.rating ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
    }

    feed.innerHTML += `
      <div style="border-bottom:1px solid var(--border); padding-bottom:1rem;">
        <div style="display:flex; justify-content:space-between; margin-bottom:0.25rem;">
          <h4 style="font-size:0.9rem; font-weight:700;">${rev.user}</h4>
          <span style="font-size:0.75rem; color:var(--text-light);">${rev.date}</span>
        </div>
        <div class="rating-stars" style="margin-bottom:0.5rem;">${revStars}</div>
        <p style="font-size:0.85rem; color:var(--text-muted);">${rev.comment}</p>
      </div>
    `;
  });
}

function renderSlotBooking() {
  const park = state.selectedParking;
  if (!park) return;

  document.getElementById("booking-subtitle-name").innerText = park.name;

  const date = document.getElementById("booking-date");
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  date.value = tomorrow.toISOString().split('T')[0];
  date.min = new Date().toISOString().split('T')[0];

  renderSlotsMatrix();
  calculateBookingPrice();
}

function renderSlotsMatrix() {
  const park = state.selectedParking;
  const container = document.getElementById("booking-slots-matrix");
  container.innerHTML = "";

  const floorSlots = park.slots[state.selectedFloor] || [];
  floorSlots.forEach(slot => {
    const btn = document.createElement("button");
    const isSelected = state.selectedSlot?.id === slot.id;
    btn.className = `slot-btn ${slot.status} ${isSelected ? 'selected' : ''}`;

    let statusText = "Free";
    if (slot.status === "occupied") statusText = "Occupied";
    if (slot.status === "reserved") statusText = "Booked";
    if (slot.status === "maintenance") statusText = "Maint";
    if (isSelected) statusText = "Selected";

    btn.innerHTML = `
      <span>${slot.id}</span>
      <span style="font-size:0.65rem; opacity:0.8;">${statusText}</span>
    `;

    if (slot.status === "available") {
      btn.onclick = () => {
        state.selectedSlot = slot;
        renderSlotsMatrix();

        document.getElementById("booking-selected-slot-display").innerText = slot.id;
        document.getElementById("booking-selected-slot-cat").innerText = slot.category;
        document.getElementById("confirm-booking-submit-btn").removeAttribute("disabled");
      };
    } else {
      btn.setAttribute("disabled", "true");
    }

    container.appendChild(btn);
  });
}

function calculateBookingPrice() {
  const park = state.selectedParking;
  if (!park) return;

  const hours = parseInt(document.getElementById("booking-duration").value);
  const base = park.hourlyRate * hours;
  const service = 1.50;
  const total = base + service;

  document.getElementById("summary-hours-text").innerText = hours;
  document.getElementById("summary-base-price").innerText = `$${base.toFixed(2)}`;
  document.getElementById("summary-total-cost").innerText = `$${total.toFixed(2)}`;
}

function renderBookingConfirmation(bookingId) {
  const booking = state.bookings.find(b => b.id === bookingId);
  if (!booking) return;

  document.getElementById("conf-booking-id").innerText = booking.id;
  document.getElementById("conf-parking-name").innerText = booking.parkingName;
  document.getElementById("conf-parking-slot").innerText = booking.slotId;
  document.getElementById("conf-parking-schedule").innerText = `${booking.date} @ ${booking.time}`;
  document.getElementById("conf-parking-duration").innerText = `${booking.duration} Hours`;
  document.getElementById("conf-parking-price").innerText = `$${booking.price.toFixed(2)}`;
}

function renderBookingHistory() {
  const container = document.getElementById("booking-history-list");
  container.innerHTML = "";

  const tab = state.activeHistoryTab;
  let filtered = state.bookings;

  if (tab === "active") {
    filtered = filtered.filter(b => b.status === "Active");
  } else if (tab === "completed") {
    filtered = filtered.filter(b => b.status === "Completed");
  } else if (tab === "cancelled") {
    filtered = filtered.filter(b => b.status === "Cancelled");
  }

  if (filtered.length === 0) {
    container.innerHTML = `<div class="empty-state"><p>No bookings in this category.</p></div>`;
    return;
  }

  filtered.forEach(booking => {
    const card = document.createElement("div");
    card.className = "card";
    card.style.padding = "1.5rem";
    card.style.cursor = "pointer";
    card.onclick = () => navigateTo("booking-confirmation", { bookingId: booking.id });

    let statusStyle = "background: var(--primary-light); color: var(--primary);";
    if (booking.status === "Completed") statusStyle = "background: var(--success-light); color: var(--success);";
    if (booking.status === "Cancelled") statusStyle = "background: var(--danger-light); color: var(--danger);";

    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
        <div>
          <span style="font-size:0.75rem; color:var(--text-light); font-weight:700;">ID: #${booking.id}</span>
          <h3 style="font-size:1.15rem; margin-top:0.25rem;">${booking.parkingName}</h3>
        </div>
        <span style="font-size:0.8rem; font-weight:700; padding:0.25rem 0.75rem; border-radius:4px; ${statusStyle}">${booking.status}</span>
      </div>
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:1rem; border-top:1px solid var(--border); padding-top:1rem; font-size:0.85rem;">
        <div><span style="color:var(--text-muted);">Slot space:</span> <strong>${booking.slotId}</strong></div>
        <div><span style="color:var(--text-muted);">Schedule:</span> <strong>${booking.date} @ ${booking.time}</strong></div>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderProfilePage() {
  document.querySelectorAll(".profile-section-block").forEach(el => el.style.display = "none");
  const activeBlock = document.getElementById(`profile-sec-${state.activeProfileSection}`);
  if (activeBlock) activeBlock.style.display = "block";

  const user = state.activeUser;
  if (user) {
    const profName = document.getElementById("prof-name");
    const profEmail = document.getElementById("prof-email");
    const profPhone = document.getElementById("prof-phone");
    if (profName) profName.value = user.name || "";
    if (profEmail) profEmail.value = user.email || "";
    if (profPhone) profPhone.value = user.phone || "";
  }

  document.querySelectorAll("[data-profile-section]").forEach(btn => {
    btn.className = "role-btn";
    btn.style.background = "transparent";
    btn.style.color = "#94A3B8";
    if (btn.getAttribute("data-profile-section") === state.activeProfileSection) {
      btn.className = "role-btn active";
      btn.style.background = "var(--primary-light)";
      btn.style.color = "var(--primary)";
    }
  });

  const vehicleBox = document.getElementById("profile-vehicles-container");
  vehicleBox.innerHTML = "";
  state.vehicles.forEach(veh => {
    vehicleBox.innerHTML += `
      <div class="vehicle-card">
        <div style="background:var(--primary); color:white; width:38px; height:38px; border-radius:var(--radius-sm); display:flex; align-items:center; justify-content:center; font-weight:bold;">V</div>
        <div style="flex:1;">
          <h4 style="font-size:0.9rem; font-weight:700;">${veh.model} ${veh.isPrimary ? '<span style="font-size:0.7rem; color:var(--primary); background:var(--primary-light); padding:0.1rem 0.4rem; border-radius:4px; margin-left:0.5rem;">Primary</span>' : ''}</h4>
          <p style="font-size:0.75rem; color:var(--text-muted);">${veh.plate} • ${veh.type.toUpperCase()}</p>
        </div>
      </div>
    `;
  });

  const paymentBox = document.getElementById("profile-payments-container");
  paymentBox.innerHTML = "";
  state.payments.forEach(card => {
    paymentBox.innerHTML += `
      <div class="payment-card">
        <div style="background:var(--secondary); color:white; width:38px; height:38px; border-radius:var(--radius-sm); display:flex; align-items:center; justify-content:center; font-weight:700; font-size:0.75rem;">CARD</div>
        <div style="flex:1;">
          <h4 style="font-size:0.9rem; font-weight:700;">${card.brand} •••• ${card.last4}</h4>
          <p style="font-size:0.75rem; color:var(--text-muted);">Expiry: ${card.expiry}</p>
        </div>
      </div>
    `;
  });
}

function renderActiveBookingScreen() {
  const container = document.getElementById("active-booking-details-container");
  if (!container) return;

  const active = state.bookings.find(b => b.status === "Active" || b.status === "Occupied" || b.status === "Overstay");
  if (!active) {
    container.innerHTML = `
      <div class="card" style="padding: 3rem; text-align: center;">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="1.5" style="margin-bottom:1rem; margin-left:auto; margin-right:auto; display:block;"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
        <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem; color: var(--secondary);">No Active Bookings</h3>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.5rem;">You do not have any upcoming reservations or occupied slots at this moment.</p>
        <button class="btn btn-primary btn-sm" onclick="navigateTo('search-parking')">Find Parking Now</button>
      </div>
    `;
    return;
  }

  const park = state.parkings.find(p => p.id === active.parkingId) || state.parkings[0];
  let alertBanner = "";
  if (active.status === "Overstay") {
    alertBanner = `
      <div style="background: var(--danger-light); border-left: 4px solid var(--danger); padding: 1rem; border-radius: var(--radius-sm); margin-bottom: 1.5rem; color: var(--danger); font-size: 0.85rem; font-weight: 600;">
        WARNING: You have exceeded your booked parking duration. Overstay tariffs apply.
      </div>
    `;
  }

  // Generate merchant UPI details
  let qrDisplay = `
    <div style="text-align:center; padding:1.5rem; border-top:1px dashed var(--border); margin-top:1.5rem;">
      <span style="font-size:0.8rem; color:var(--text-muted); display:block; margin-bottom:0.5rem;">Scan QR code at exit barrier to checkout:</span>
      <div style="display:flex; justify-content:center; align-items:center;">
  `;
  if (park.qrCodeImage) {
    qrDisplay += `<img src="${park.qrCodeImage}" style="width:130px; height:130px; object-fit:contain;" alt="Payment QR">`;
  } else {
    qrDisplay += `
      <svg width="100" height="100" viewBox="0 0 100 100">
        <rect x="0" y="0" width="20" height="20" fill="currentColor"/>
        <rect x="2" y="2" width="16" height="16" fill="white"/>
        <rect x="5" y="5" width="10" height="10" fill="currentColor"/>
        <rect x="80" y="0" width="20" height="20" fill="currentColor"/>
        <rect x="82" y="2" width="16" height="16" fill="white"/>
        <rect x="85" y="5" width="10" height="10" fill="currentColor"/>
        <rect x="0" y="80" width="20" height="20" fill="currentColor"/>
        <rect x="2" y="82" width="16" height="16" fill="white"/>
        <rect x="5" y="85" width="10" height="10" fill="currentColor"/>
        <rect x="30" y="30" width="40" height="40" fill="currentColor"/>
        <rect x="32" y="32" width="36" height="36" fill="white"/>
      </svg>
    `;
  }
  qrDisplay += `
      </div>
      <strong style="font-size:0.85rem; color:var(--secondary); display:block; margin-top:0.5rem;">UPI: ${park.upiId || 'merchant@upi'}</strong>
    </div>
  `;

  container.innerHTML = `
    ${alertBanner}
    <div class="card" style="padding: 2rem;">
      <div style="display:flex; justify-content:space-between; align-items:start; border-bottom:1px solid var(--border); padding-bottom:1rem; margin-bottom:1.5rem; flex-wrap:wrap; gap:1rem;">
        <div>
          <h3 style="font-size: 1.3rem; color: var(--secondary);">${park.name}</h3>
          <p style="font-size:0.85rem; color:var(--text-muted);">${park.address}</p>
        </div>
        <span class="badge" style="background:var(--primary-light); color:var(--primary); font-size:0.8rem; font-weight:700; padding:0.25rem 0.60rem; border-radius:4px;">${active.status}</span>
      </div>

      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:1.5rem; margin-bottom:1.5rem;">
        <div>
          <span style="font-size:0.8rem; color:var(--text-muted); display:block;">Allocated Slot:</span>
          <strong style="font-size:1.15rem; color:var(--secondary);">Floor F1 / Slot ${active.slotId}</strong>
        </div>
        <div>
          <span style="font-size:0.8rem; color:var(--text-muted); display:block;">Schedule:</span>
          <strong style="font-size:1.15rem; color:var(--secondary);">${active.date} @ ${active.time}</strong>
        </div>
        <div>
          <span style="font-size:0.8rem; color:var(--text-muted); display:block;">Tariff Hourly:</span>
          <strong style="font-size:1.15rem; color:var(--secondary);">$${park.hourlyRate.toFixed(2)}/hr</strong>
        </div>
        <div>
          <span style="font-size:0.8rem; color:var(--text-muted); display:block;">Estimated Total:</span>
          <strong style="font-size:1.15rem; color:var(--success);">$${active.price.toFixed(2)}</strong>
        </div>
      </div>

      ${qrDisplay}

      <div style="margin-top:1.5rem; border-top:1px solid var(--border); padding-top:1.5rem; display:flex; justify-content:flex-end; gap:0.5rem;">
        <button class="btn btn-outline btn-sm" onclick="navigateTo('search-parking')">Navigate (GPS)</button>
        <button class="btn btn-primary btn-sm" onclick="triggerCustomerCheckoutSim('${active.id}')">Checkout Barrier</button>
      </div>
    </div>
  `;
}

window.triggerCustomerCheckoutSim = function(bookingId) {
  showConfirmDialog("Checkout exit barrier", "Confirm payment settlement and check out from parking slot?", () => {
    const b = state.bookings.find(x => x.id === bookingId);
    if (b) {
      const park = state.parkings.find(p => p.id === b.parkingId);
      if (park) {
        Object.values(park.slots).forEach(floor => {
          floor.forEach(s => {
            if (s.id === b.slotId) s.status = "available";
          });
        });
      }
      b.status = "Completed";
      saveState();
      window.showToast("Exit Succeeded", "Barrier check-out successfully recorded. Invoice settled.", "success");
      navigateTo("customer-dashboard");
    }
  });
};

function renderCustomerNotifications() {
  const list = document.getElementById("customer-notifications-list");
  if (!list) return;

  list.innerHTML = "";
  const sorted = [...state.notifications].reverse();
  const filtered = sorted.filter(n => n.audience === "all" || n.audience === "drivers");

  if (filtered.length === 0) {
    list.innerHTML = `<div class="empty-state"><p>No system announcements or push alerts.</p></div>`;
  } else {
    filtered.forEach(n => {
      const card = document.createElement("div");
      card.style.padding = "1rem";
      card.style.border = "1px solid var(--border)";
      card.style.borderRadius = "var(--radius-md)";
      card.style.background = "var(--bg-primary)";
      
      card.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.25rem;">
          <h4 style="font-size:0.95rem; font-weight:700; color:var(--secondary);">${n.title}</h4>
          <span style="font-size:0.75rem; color:var(--text-light);">${n.time || 'Just now'}</span>
        </div>
        <p style="font-size:0.85rem; color:var(--text-muted);">${n.message}</p>
      `;
      list.appendChild(card);
    });
  }
}

function renderCustomerSettings() {
  const vehSelect = document.getElementById("settings-default-vehicle");
  const cardSelect = document.getElementById("settings-default-card");
  if (vehSelect) {
    vehSelect.innerHTML = "";
    state.vehicles.forEach(v => {
      vehSelect.innerHTML += `<option value="${v.id}" ${v.isPrimary ? 'selected' : ''}>${v.model} (${v.plate})</option>`;
    });
  }
  if (cardSelect) {
    cardSelect.innerHTML = "";
    state.payments.forEach(c => {
      cardSelect.innerHTML += `<option value="${c.id}" ${c.isPrimary ? 'selected' : ''}>${c.brand} •••• ${c.last4}</option>`;
    });
  }
}

// ==========================================
// 6. BRANCH MANAGER SCREEN BUILDERS
// ==========================================

// Pagination & Filter state registries for Branch Manager Sub-screens
const ownerPageState = {
  bookings: { search: "", status: "all", page: 1, limit: 5 },
  customers: { search: "", page: 1, limit: 5 },
  slotsFloor: "F1"
};

function getManagerBranch() {
  const manager = state.activeUser || state.managers[0];
  const branch = state.parkings.find(p => p.id === manager.branchId) || state.parkings[0];
  return branch;
}

function renderOwnerOverview() {
  const branch = getManagerBranch();
  if (!branch) return;

  // Set branch titles
  document.getElementById("owner-overview-branch-name").innerText = branch.name;
  document.getElementById("owner-overview-branch-addr").innerText = branch.address;

  let total = 0;
  let avail = 0;
  let occupied = 0;
  let reserved = 0;

  Object.values(branch.slots).forEach(floor => {
    floor.forEach(slot => {
      total++;
      if (slot.status === "available") avail++;
      else if (slot.status === "occupied" || slot.status === "reserved") occupied++; // Map reserved/occupied to occupied metrics
      else if (slot.status === "maintenance") reserved++; // Map maintenance slots
    });
  });

  document.getElementById("owner-overview-total").innerText = total;
  document.getElementById("owner-overview-avail").innerText = avail;
  document.getElementById("owner-overview-occ").innerText = occupied;
  document.getElementById("owner-overview-res").innerText = reserved;

  const alertBox = document.getElementById("manager-alerts-container");
  if (alertBox) {
    alertBox.innerHTML = "";
    const overstay = state.bookings.filter(b => b.parkingId === branch.id && b.status === "Overstay");
    if (overstay.length > 0) {
      alertBox.innerHTML = `
        <div style="background: var(--danger-light); border-left: 4px solid var(--danger); padding: 1rem; border-radius: var(--radius-sm); margin-bottom: 1.5rem; display: flex; justify-content: space-between; align-items: center;">
          <div style="display:flex; gap:0.5rem; align-items:center;">
            <strong style="color:var(--danger);">ALERT:</strong>
            <span style="font-size:0.85rem; color:var(--secondary); font-weight: 500;">${overstay.length} vehicles have exceeded their parking schedules.</span>
          </div>
          <button class="btn btn-outline btn-danger btn-sm" onclick="navigateTo('owner-bookings')">Resolve Now</button>
        </div>
      `;
    }
  }
}

function renderOwnerBranch() {
  const branch = getManagerBranch();
  if (!branch) return;

  document.getElementById("ob-settings-name").value = branch.name;
  document.getElementById("ob-settings-addr").value = branch.address;
  document.getElementById("ob-settings-rate").value = branch.hourlyRate;
  document.getElementById("ob-settings-upi").value = branch.upiId || "merchant@upi";
  document.getElementById("ob-settings-desc").value = branch.description || "";
  document.getElementById("ob-assigned-id").innerText = branch.id;

  // Sync checkboxes
  const am = branch.amenities || [];
  document.getElementById("ob-amenity-ev").checked = am.includes("EV Charging");
  document.getElementById("ob-amenity-cctv").checked = am.includes("CCTV");
  document.getElementById("ob-amenity-wheel").checked = am.includes("Wheelchair Access");
  document.getElementById("ob-amenity-valet").checked = am.includes("Valet");
  document.getElementById("ob-amenity-wash").checked = am.includes("Car Wash");

  // Populate QR Preview
  const previewImg = document.getElementById("ob-settings-qr-preview-img");
  const previewTxt = document.getElementById("ob-settings-qr-preview-txt");
  if (branch.qrCodeImage) {
    previewImg.src = branch.qrCodeImage;
    previewImg.style.display = "block";
    previewTxt.style.display = "none";
  } else {
    previewImg.style.display = "none";
    previewTxt.style.display = "block";
  }
}

function renderOwnerManageSlots() {
  const branch = getManagerBranch();
  if (!branch) return;

  const floor = ownerPageState.slotsFloor;
  const slotsList = branch.slots[floor] || [];

  const container = document.getElementById("owner-slots-manager-container");
  if (!container) return;

  container.innerHTML = "";
  slotsList.forEach(slot => {
    const card = document.createElement("div");
    card.className = `slot-card ${slot.status}`;
    card.style.display = "flex";
    card.style.flexDirection = "column";
    card.style.justifyContent = "space-between";
    card.style.padding = "1rem";
    card.style.borderRadius = "var(--radius-md)";
    card.style.border = "1px solid var(--border)";

    let categoryBadge = `<span style="font-size:0.7rem; font-weight:700; padding:0.1rem 0.3rem; border-radius:4px; background:rgba(0,0,0,0.05); color:var(--secondary);">${slot.category}</span>`;
    if (slot.category === "EV") categoryBadge = `<span style="font-size:0.7rem; font-weight:700; padding:0.1rem 0.3rem; border-radius:4px; background:var(--success-light); color:var(--success);">EV</span>`;

    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:start;">
        <div>
          <strong style="font-size:1.1rem; display:block;">${slot.id}</strong>
          <span style="font-size:0.75rem; text-transform:capitalize; color:var(--text-muted);">${slot.status}</span>
        </div>
        ${categoryBadge}
      </div>
      <div style="margin-top:1.5rem; display:flex; gap:0.5rem; flex-wrap:wrap;">
        <button class="btn btn-outline btn-sm" onclick="toggleSlotMaintenance('${slot.id}')">${slot.status === 'maintenance' ? 'Activate' : 'Block (Maintenance)'}</button>
        <button class="btn btn-outline btn-danger btn-sm" onclick="deleteOwnerSlot('${slot.id}')">Delete</button>
      </div>
    `;
    container.appendChild(card);
  });
}

window.toggleSlotMaintenance = function(slotId) {
  const branch = getManagerBranch();
  const floor = ownerPageState.slotsFloor;
  const slot = branch.slots[floor].find(s => s.id === slotId);
  if (!slot) return;

  slot.status = slot.status === "maintenance" ? "available" : "maintenance";
  saveState();
  renderOwnerManageSlots();
  window.showToast("Slot Updated", `Slot ${slotId} is now ${slot.status}.`, "warning");
};

window.deleteOwnerSlot = function(slotId) {
  showConfirmDialog("Delete Space", "Are you sure you want to delete this parking slot?", () => {
    const branch = getManagerBranch();
    const floor = ownerPageState.slotsFloor;
    branch.slots[floor] = branch.slots[floor].filter(s => s.id !== slotId);
    saveState();
    renderOwnerManageSlots();
    window.showToast("Space Removed", `Parking slot ${slotId} deleted from records.`, "danger");
  });
};

function renderOwnerBookings() {
  const branch = getManagerBranch();
  if (!branch) return;

  const searchVal = ownerPageState.bookings.search.toLowerCase();
  const statusFilter = ownerPageState.bookings.status;
  const page = ownerPageState.bookings.page;
  const limit = ownerPageState.bookings.limit;

  let list = state.bookings.filter(b => b.parkingId === branch.id);
  if (searchVal) {
    list = list.filter(b => b.id.toLowerCase().includes(searchVal) || b.slotId.toLowerCase().includes(searchVal));
  }
  if (statusFilter !== "all") {
    list = list.filter(b => b.status === statusFilter);
  }

  const total = list.length;
  const start = (page - 1) * limit;
  const pageItems = list.slice(start, start + limit);

  const tbody = document.getElementById("owner-bookings-table-body");
  if (!tbody) return;

  tbody.innerHTML = "";
  if (pageItems.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:var(--text-muted); padding:1.5rem;">No bookings found.</td></tr>`;
  } else {
    pageItems.forEach(b => {
      const tr = document.createElement("tr");
      let statusStyle = "background: var(--success-light); color: var(--success);";
      if (b.status === "Cancelled") statusStyle = "background: var(--danger-light); color: var(--danger);";
      else if (b.status === "Active") statusStyle = "background: var(--primary-light); color: var(--primary);";
      else if (b.status === "Overstay") statusStyle = "background: #FEF3C7; color: #D97706;";

      let actions = "";
      if (b.status === "Active") {
        actions = `<button class="btn btn-outline btn-sm" onclick="gateCheckIn('${b.id}')">Scan Entry</button>`;
      } else if (b.status === "Occupied" || b.status === "Overstay") {
        actions = `<button class="btn btn-outline btn-sm" onclick="gateCheckOut('${b.id}')">Scan Exit</button>`;
      } else {
        actions = `<span style="font-size:0.85rem; color:var(--text-muted);">Settled</span>`;
      }

      tr.innerHTML = `
        <td><strong>#${b.id}</strong></td>
        <td>Customer Driver</td>
        <td>Slot ${b.slotId}</td>
        <td>${b.date} @ ${b.time}</td>
        <td><span style="font-size:0.75rem; font-weight:700; padding:0.2rem 0.5rem; border-radius:4px; ${statusStyle}">${b.status}</span></td>
        <td>${actions}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  const pagText = document.getElementById("owner-bookings-pagination-info");
  if (pagText) {
    pagText.innerText = `Showing ${total ? start + 1 : 0}-${Math.min(start + limit, total)} of ${total} entries`;
  }
}

window.gateCheckIn = function(bookingId) {
  const b = state.bookings.find(x => x.id === bookingId);
  if (!b) return;

  const park = state.parkings.find(p => p.id === b.parkingId);
  Object.values(park.slots).forEach(floor => {
    floor.forEach(s => {
      if (s.id === b.slotId) s.status = "occupied";
    });
  });

  b.status = "Occupied";
  saveState();
  renderOwnerOverview();
  renderOwnerBookings();
  window.showToast("Gate Entry Successful", `Vehicle checked in to slot ${b.slotId}.`, "success");
};

window.gateCheckOut = function(bookingId) {
  const b = state.bookings.find(x => x.id === bookingId);
  if (!b) return;

  const park = state.parkings.find(p => p.id === b.parkingId);
  Object.values(park.slots).forEach(floor => {
    floor.forEach(s => {
      if (s.id === b.slotId) s.status = "available";
    });
  });

  b.status = "Completed";
  saveState();
  renderOwnerOverview();
  renderOwnerBookings();
  window.showToast("Gate Exit Successful", `Vehicle checked out from slot ${b.slotId}. Invoice settled.`, "success");
};

function renderOwnerCustomers() {
  const branch = getManagerBranch();
  if (!branch) return;

  const searchVal = document.getElementById("owner-customers-search").value.toLowerCase();
  const page = ownerPageState.customers.page;
  const limit = ownerPageState.customers.limit;

  // Filter customers who have bookings at this branch
  let list = [...state.customers];
  if (searchVal) {
    list = list.filter(c => c.name.toLowerCase().includes(searchVal) || c.email.toLowerCase().includes(searchVal));
  }

  const total = list.length;
  const start = (page - 1) * limit;
  const pageItems = list.slice(start, start + limit);

  const tbody = document.getElementById("owner-customers-table-body");
  if (!tbody) return;

  tbody.innerHTML = "";
  if (pageItems.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:var(--text-muted); padding:1.5rem;">No customers found.</td></tr>`;
  } else {
    pageItems.forEach(c => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong>#${c.id}</strong></td>
        <td>${c.name}</td>
        <td>${c.email}</td>
        <td>Tesla Model 3 (Primary)</td>
        <td>${c.joined || '2026-06-20'}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  const pagText = document.getElementById("owner-customers-pagination-info");
  if (pagText) {
    pagText.innerText = `Showing ${total ? start + 1 : 0}-${Math.min(start + limit, total)} of ${total} entries`;
  }
}

function renderOwnerRevenue() {
  const branch = getManagerBranch();
  if (!branch) return;

  // Compute stats based on completed bookings
  const bookings = state.bookings.filter(b => b.parkingId === branch.id && b.status === "Completed");
  let totalGross = 0;
  bookings.forEach(b => totalGross += b.price || 0);

  document.getElementById("owner-revenue-daily").innerText = `$${(totalGross * 0.15).toFixed(2)}`;
  document.getElementById("owner-revenue-weekly").innerText = `$${(totalGross * 0.65).toFixed(2)}`;
  document.getElementById("owner-revenue-monthly").innerText = `$${totalGross.toFixed(2)}`;
}

function renderOwnerReports() {
  const branch = getManagerBranch();
  if (!branch) return;

  let totalSlots = 0;
  let occupiedSlots = 0;
  Object.values(branch.slots).forEach(floor => {
    floor.forEach(s => {
      totalSlots++;
      if (s.status === "occupied") occupiedSlots++;
    });
  });

  const ratio = totalSlots ? Math.round((occupiedSlots / totalSlots) * 100) : 0;
  document.getElementById("owner-reports-ratio").innerText = `${ratio}% occupancy`;

  // EV Check
  let totalEV = 0;
  let occupiedEV = 0;
  Object.values(branch.slots).forEach(floor => {
    floor.forEach(s => {
      if (s.category === "EV") {
        totalEV++;
        if (s.status === "occupied") occupiedEV++;
      }
    });
  });
  document.getElementById("owner-reports-ev").innerText = `${occupiedEV}/${totalEV} occupied`;

  const overstay = state.bookings.filter(b => b.parkingId === branch.id && b.status === "Overstay").length;
  document.getElementById("owner-reports-overstayers").innerText = overstay;
}

function renderOwnerNotifications() {
  const list = document.getElementById("owner-announcements-list");
  if (!list) return;

  const branch = getManagerBranch();
  list.innerHTML = "";
  // Filter announcements matching this branch ID
  const filterAnn = state.notifications.filter(n => n.branchId === branch.id);
  if (filterAnn.length === 0) {
    list.innerHTML = `<div class="empty-state"><p>No broadcast history warnings.</p></div>`;
  } else {
    filterAnn.reverse().forEach(n => {
      const card = document.createElement("div");
      card.style.padding = "1rem";
      card.style.border = "1px solid var(--border)";
      card.style.borderRadius = "var(--radius-md)";
      card.style.background = "var(--bg-card)";

      card.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.25rem;">
          <h4 style="font-size:0.9rem; font-weight:700; color:var(--secondary);">${n.title}</h4>
          <span style="font-size:0.7rem; color:var(--text-light);">${n.time || 'Just now'}</span>
        </div>
        <p style="font-size:0.8rem; color:var(--text-muted);">${n.message}</p>
      `;
      list.appendChild(card);
    });
  }
}

function renderOwnerProfile() {
  const user = state.activeUser;
  if (!user) return;

  document.getElementById("owner-prof-name").value = user.name;
  document.getElementById("owner-prof-email").value = user.email;
  document.getElementById("owner-prof-phone").value = user.phone || "";
  document.getElementById("owner-prof-pass").value = "";
}

// ==========================================
// 7. SYSTEM ADMIN SCREEN BUILDERS
// ==========================================

// Pagination & Filter state registries for Admin Sub-screens
const adminPageState = {
  overview: { search: "", branch: "all", status: "all", page: 1, limit: 6 },
  managers: { search: "", page: 1, limit: 5 },
  areas: { search: "", status: "all", page: 1, limit: 3 },
  users: { search: "", status: "all", page: 1, limit: 5 }
};

window.showConfirmDialog = function(title, message, onConfirm) {
  const modal = document.getElementById("modal-admin-confirm");
  if (!modal) return;
  document.getElementById("confirm-title").innerText = title;
  document.getElementById("confirm-message").innerText = message;
  modal.classList.add("active");

  document.getElementById("confirm-ok-btn").onclick = () => {
    modal.classList.remove("active");
    onConfirm();
  };
  document.getElementById("confirm-cancel-btn").onclick = () => {
    modal.classList.remove("active");
  };
};

function renderAdminOverview() {
  document.getElementById("admin-overview-users").innerText = state.customers.length;
  document.getElementById("admin-overview-managers").innerText = state.managers.length;
  document.getElementById("admin-overview-areas").innerText = state.parkings.length;
  document.getElementById("admin-overview-bookings").innerText = state.bookings.length;

  // Populate branch select options dynamically
  const branchSelect = document.getElementById("admin-overview-filter-branch");
  if (branchSelect && branchSelect.options.length <= 1) {
    state.parkings.forEach(p => {
      const opt = document.createElement("option");
      opt.value = p.name;
      opt.innerText = p.name;
      branchSelect.appendChild(opt);
    });
  }

  // Draw location shares distribution list
  const sharesContainer = document.getElementById("admin-location-shares-container");
  if (sharesContainer) {
    sharesContainer.innerHTML = "";
    const counts = {};
    state.parkings.forEach(p => counts[p.name] = 0);
    state.bookings.forEach(b => {
      if (counts[b.parkingName] !== undefined) counts[b.parkingName]++;
    });

    const total = state.bookings.length || 1;
    Object.entries(counts).slice(0, 3).forEach(([name, count]) => {
      const pct = Math.round((count / total) * 100);
      sharesContainer.innerHTML += `
        <div>
          <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.85rem;">
            <span>${name}</span>
            <strong>${count} bookings (${pct}%)</strong>
          </div>
          <div class="location-share-bar">
            <div class="location-share-fill" style="width: ${pct}%;"></div>
          </div>
        </div>
      `;
    });
  }

  // Filter & Paginate transactions log
  const s = adminPageState.overview.search.toLowerCase();
  const bFilter = adminPageState.overview.branch;
  const statFilter = adminPageState.overview.status;
  const page = adminPageState.overview.page;
  const limit = adminPageState.overview.limit;

  let list = [...state.bookings];
  if (s) {
    list = list.filter(b => b.id.toLowerCase().includes(s) || b.parkingName.toLowerCase().includes(s));
  }
  if (bFilter !== "all") {
    list = list.filter(b => b.parkingName === bFilter);
  }
  if (statFilter !== "all") {
    list = list.filter(b => b.status === statFilter);
  }

  const totalEntries = list.length;
  const start = (page - 1) * limit;
  const pageItems = list.slice(start, start + limit);

  const tbody = document.getElementById("admin-overview-bookings-tbody");
  if (tbody) {
    tbody.innerHTML = "";
    if (pageItems.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:var(--text-muted); padding:1.5rem;">No transaction bookings match filters.</td></tr>`;
    } else {
      pageItems.forEach(b => {
        const tr = document.createElement("tr");
        let statusStyle = "background: var(--success-light); color: var(--success);";
        if (b.status === "Cancelled") statusStyle = "background: var(--danger-light); color: var(--danger);";
        else if (b.status === "Active") statusStyle = "background: var(--primary-light); color: var(--primary);";
        else if (b.status === "Overstay") statusStyle = "background: #FEF3C7; color: #D97706;";

        tr.innerHTML = `
          <td><strong>#${b.id}</strong></td>
          <td>Customer Driver</td>
          <td>${b.parkingName}</td>
          <td>Slot ${b.slotId}</td>
          <td>${b.date} @ ${b.time}</td>
          <td>$${(b.amount || 0).toFixed(2)}</td>
          <td><span style="font-size:0.75rem; font-weight:700; padding:0.2rem 0.5rem; border-radius:4px; ${statusStyle}">${b.status}</span></td>
        `;
        tbody.appendChild(tr);
      });
    }
  }

  // Update pagination texts
  const pagText = document.getElementById("admin-overview-pagination-info");
  if (pagText) {
    pagText.innerText = `Showing ${totalEntries ? start + 1 : 0}-${Math.min(start + limit, totalEntries)} of ${totalEntries} bookings`;
  }
}

function renderAdminManagers() {
  const tbody = document.getElementById("admin-managers-table-body");
  if (!tbody) return;

  const s = adminPageState.managers.search.toLowerCase();
  const page = adminPageState.managers.page;
  const limit = adminPageState.managers.limit;

  let list = [...state.managers];
  if (s) {
    list = list.filter(m => m.name.toLowerCase().includes(s) || m.email.toLowerCase().includes(s));
  }

  const total = list.length;
  const start = (page - 1) * limit;
  const pageItems = list.slice(start, start + limit);

  tbody.innerHTML = "";
  if (pageItems.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:var(--text-muted); padding:1.5rem;">No managers found matching criteria.</td></tr>`;
  } else {
    pageItems.forEach(m => {
      const branch = state.parkings.find(p => p.id === m.branchId);
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong>${m.name}</strong></td>
        <td>${m.email}</td>
        <td>${branch ? branch.name : 'Unassigned'}</td>
        <td>${m.joined || '2026-05-14'}</td>
        <td>
          <button class="btn btn-outline btn-sm btn-icon-only" style="border:none;" onclick="deleteAdminManager('${m.id}')">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--danger)" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  const infoText = document.getElementById("admin-managers-pagination-info");
  if (infoText) {
    infoText.innerText = `Showing ${total ? start + 1 : 0}-${Math.min(start + limit, total)} of ${total} managers`;
  }
}

window.deleteAdminManager = function(id) {
  showConfirmDialog("Suspend Manager", "Are you sure you want to delete this branch manager account?", () => {
    state.managers = state.managers.filter(m => m.id !== id);
    saveState();
    renderAdminManagers();
    renderAdminOverview();
    window.showToast("Manager Removed", "Manager profile deleted.", "danger");
  });
};

function renderAdminAreas() {
  const container = document.getElementById("admin-areas-list-container");
  if (!container) return;

  const s = adminPageState.areas.search.toLowerCase();
  const statusFilter = adminPageState.areas.status;
  const page = adminPageState.areas.page;
  const limit = adminPageState.areas.limit;

  let list = [...state.parkings];
  if (s) {
    list = list.filter(p => p.name.toLowerCase().includes(s) || p.address.toLowerCase().includes(s));
  }
  if (statusFilter !== "all") {
    list = list.filter(p => p.status === statusFilter);
  }

  const total = list.length;
  const start = (page - 1) * limit;
  const pageItems = list.slice(start, start + limit);

  container.innerHTML = "";
  if (pageItems.length === 0) {
    container.innerHTML = `<div class="empty-state"><p>No parking branches match query filters.</p></div>`;
  } else {
    pageItems.forEach(park => {
      const card = document.createElement("div");
      card.className = "card";
      card.style.display = "flex";
      card.style.gap = "1.5rem";
      card.style.padding = "1.5rem";
      card.style.flexWrap = "wrap";

      let slotsTotal = 0;
      Object.values(park.slots).forEach(f => slotsTotal += f.length);

      let statusStyle = "background:var(--success-light); color:var(--success);";
      if (park.status === "Suspended") statusStyle = "background:var(--danger-light); color:var(--danger);";

      card.innerHTML = `
        <img src="${park.image}" style="width:100px; height:100px; border-radius:var(--radius-sm); object-fit:cover; flex-shrink:0;" alt="Parking">
        <div style="flex:1; min-width:200px; display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:start;">
              <h3 style="font-size:1.1rem; margin-bottom:0.25rem;">${park.name}</h3>
              <span style="font-size:0.7rem; font-weight:700; padding:0.1rem 0.4rem; border-radius:4px; ${statusStyle}">${park.status}</span>
            </div>
            <p style="font-size:0.8rem; color:var(--text-muted);">${park.address}</p>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border); padding-top:0.5rem; margin-top:0.5rem; flex-wrap:wrap; gap:0.5rem;">
            <span style="font-size:0.8rem; font-weight:700; color:var(--secondary);">$${park.hourlyRate.toFixed(2)}/hr | Capacity: ${slotsTotal} slots</span>
            <div style="display:flex; gap:0.5rem;">
              <button class="btn btn-outline btn-sm" onclick="toggleBranchStatus('${park.id}')">${park.status === 'Approved' ? 'Suspend' : 'Approve'}</button>
              <button class="btn btn-outline btn-danger btn-sm" onclick="deleteAdminArea('${park.id}')">Delete</button>
            </div>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  }

  const infoText = document.getElementById("admin-areas-pagination-info");
  if (infoText) {
    infoText.innerText = `Showing ${total ? start + 1 : 0}-${Math.min(start + limit, total)} of ${total} locations`;
  }
}

window.toggleBranchStatus = function(id) {
  const p = state.parkings.find(x => x.id === id);
  if (!p) return;
  p.status = p.status === "Approved" ? "Suspended" : "Approved";
  saveState();
  renderAdminAreas();
  window.showToast("Branch Status Updated", `Parking site ${p.name} status is now ${p.status.toLowerCase()}.`, "warning");
};

window.deleteAdminArea = function(id) {
  showConfirmDialog("Close Parking Branch", "Are you sure you want to delete this parking area? All maps slots will be deleted.", () => {
    state.parkings = state.parkings.filter(p => p.id !== id);
    saveState();
    renderAdminAreas();
    renderAdminOverview();
    window.showToast("Branch Closed", "Parking branch deleted from maps registry.", "danger");
  });
};

function renderAdminUsers() {
  const tbody = document.getElementById("admin-users-table-body");
  if (!tbody) return;

  const s = adminPageState.users.search.toLowerCase();
  const statusFilter = adminPageState.users.status;
  const page = adminPageState.users.page;
  const limit = adminPageState.users.limit;

  let list = [...state.customers];
  if (s) {
    list = list.filter(u => u.name.toLowerCase().includes(s) || u.email.toLowerCase().includes(s) || u.phone.includes(s));
  }
  if (statusFilter !== "all") {
    list = list.filter(u => u.status === statusFilter);
  }

  const total = list.length;
  const start = (page - 1) * limit;
  const pageItems = list.slice(start, start + limit);

  tbody.innerHTML = "";
  if (pageItems.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:var(--text-muted); padding:1.5rem;">No drivers found matching criteria.</td></tr>`;
  } else {
    pageItems.forEach(user => {
      const tr = document.createElement("tr");
      let statusStyle = "background: var(--success-light); color: var(--success);";
      if (user.status === "Blocked") statusStyle = "background: var(--danger-light); color: var(--danger);";

      tr.innerHTML = `
        <td><strong>#${user.id}</strong></td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.phone || 'N/A'}</td>
        <td><span style="font-size:0.75rem; font-weight:700; padding:0.2rem 0.5rem; border-radius:4px; ${statusStyle}">${user.status}</span></td>
        <td>
          <div style="display:flex; gap:0.5rem;">
            <button class="btn btn-outline btn-sm" onclick="editDriverProfile('${user.id}')">Edit</button>
            <button class="btn btn-outline btn-sm" onclick="toggleBlockUser('${user.id}')">${user.status === 'Active' ? 'Block' : 'Unblock'}</button>
            <button class="btn btn-outline btn-danger btn-sm" onclick="deleteCustomer('${user.id}')">Delete</button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  const infoText = document.getElementById("admin-users-pagination-info");
  if (infoText) {
    infoText.innerText = `Showing ${total ? start + 1 : 0}-${Math.min(start + limit, total)} of ${total} drivers`;
  }
}

window.editDriverProfile = function(id) {
  const u = state.customers.find(x => x.id === id);
  if (!u) return;
  document.getElementById("au-modal-id").value = u.id;
  document.getElementById("au-modal-name").value = u.name;
  document.getElementById("au-modal-email").value = u.email;
  document.getElementById("au-modal-phone").value = u.phone || "";
  document.getElementById("modal-admin-user").classList.add("active");
};

window.toggleBlockUser = function(id) {
  const c = state.customers.find(x => x.id === id);
  if (!c) return;

  c.status = c.status === "Active" ? "Blocked" : "Active";
  saveState();
  renderAdminUsers();
  window.showToast("Driver Status Updated", `Customer ${c.name} account set to ${c.status}.`, "warning");
};

window.deleteCustomer = function(id) {
  showConfirmDialog("Delete Driver Profile", "Are you sure you want to delete this customer account?", () => {
    state.customers = state.customers.filter(c => c.id !== id);
    saveState();
    renderAdminUsers();
    renderAdminOverview();
    window.showToast("Account Deleted", "Customer database entry removed.", "danger");
  });
};

function renderAdminNotifications() {
  const listContainer = document.getElementById("admin-notifications-log-list");
  if (!listContainer) return;

  listContainer.innerHTML = "";
  const reversed = [...state.notifications].reverse();
  if (reversed.length === 0) {
    listContainer.innerHTML = `<div class="empty-state"><p>No broadcast history logs.</p></div>`;
  } else {
    reversed.forEach(n => {
      const card = document.createElement("div");
      card.style.padding = "1rem";
      card.style.border = "1px solid var(--border)";
      card.style.borderRadius = "var(--radius-md)";
      card.style.background = "var(--bg-card)";
      
      card.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.25rem;">
          <h4 style="font-size:0.9rem; font-weight:700; color:var(--secondary);">${n.title}</h4>
          <span style="font-size:0.7rem; color:var(--text-light);">${n.time || '10 mins ago'}</span>
        </div>
        <p style="font-size:0.8rem; color:var(--text-muted);">${n.message}</p>
      `;
      listContainer.appendChild(card);
    });
  }
}

function renderAdminSettings() {
  const currencySelect = document.getElementById("settings-currency");
  const costMult = document.getElementById("settings-cost-mult");
  if (currencySelect) currencySelect.value = state.settings.currency || "USD";
  if (costMult) costMult.value = state.settings.costMultiplier || 1.0;
}

// ==========================================
// 8. AUTO-RELEASE & OVERSTAY SIMULATOR SCHEDULER
// ==========================================

setInterval(() => {
  let changed = false;

  state.bookings.forEach(booking => {
    if (booking.status === "Active") {
      if (Math.random() < 0.05) {
        booking.status = "Overstayed";
        changed = true;
        
        state.notifications.unshift({
          id: `n-${Date.now()}`,
          title: "Overstay Alert",
          text: `Vehicle at slot ${booking.slotId} has exceeded reservation duration.`,
          time: "Just now",
          read: false
        });
      }
    }
  });

  if (changed) {
    saveState();
    if (state.activeScreen === "owner-overview") renderOwnerOverview();
    window.showToast("System Alert", "Parking overstay alert detected at gate cameras.", "danger");
  }
}, 15000);

// ==========================================
// 9. EVENT BINDINGS & CONTROLLERS
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  const initialHash = window.location.hash.substring(1) || "landing";
  
  updateRoleLayout();
  navigateTo(initialHash);

  // Profile button click navigates to profile screen
  const profBtn = document.getElementById("user-profile-dropdown-btn");
  if (profBtn) {
    profBtn.onclick = () => {
      navigateTo("profile");
    };
  }

  // Unauthorized screen back button click binding
  const unauthBackBtn = document.getElementById("unauthorized-back-btn");
  if (unauthBackBtn) {
    unauthBackBtn.onclick = () => {
      if (state.currentRole === "customer") {
        navigateTo("customer-dashboard");
      } else if (state.currentRole === "owner") {
        navigateTo("owner-overview");
      } else if (state.currentRole === "admin") {
        navigateTo("admin-overview");
      } else {
        navigateTo("landing");
      }
    };
  }

  // Header Nav links binding
  document.querySelectorAll("#header-nav-links .nav-link").forEach(link => {
    link.onclick = (e) => {
      e.preventDefault();
      navigateTo(link.getAttribute("data-screen"));
    };
  });

  // Sidebar navigators (Owner & Admin)
  document.querySelectorAll(".sidebar-link").forEach(link => {
    link.onclick = (e) => {
      e.preventDefault();
      const ownerScr = link.getAttribute("data-owner-screen");
      const adminScr = link.getAttribute("data-admin-screen");
      navigateTo(ownerScr || adminScr);
    };
  });

  // Search filter chips map screen
  document.querySelectorAll(".filter-chip").forEach(chip => {
    chip.onclick = () => {
      document.querySelectorAll(".filter-chip").forEach(el => el.classList.remove("active"));
      chip.classList.add("active");
      renderSearchParkingMap();
    };
  });
  
  // Search text mapping input
  const searchInput = document.getElementById("map-search-input");
  if (searchInput) {
    searchInput.addEventListener("input", renderSearchParkingMap);
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        renderSearchParkingMap();
      }
    });
  }

  // Notification toggling
  document.getElementById("notifications-toggle").onclick = (e) => {
    e.stopPropagation();
    document.getElementById("notif-dropdown").classList.toggle("active");
  };

  // FAQ accordion clicks
  document.querySelectorAll(".faq-question").forEach(q => {
    q.onclick = () => {
      const item = q.parentElement;
      item.classList.toggle("active");
    };
  });

  // Contact form submission
  document.getElementById("contact-form").onsubmit = (e) => {
    e.preventDefault();
    window.showToast("Message Transmitted", "Our support representatives will follow up shortly.", "success");
    document.getElementById("contact-form").reset();
  };

  // Setup Auth Events
  setupAuthEvents();

  // Floor Selection
  document.querySelectorAll("[data-floor]").forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll("[data-floor]").forEach(el => el.classList.remove("active"));
      btn.classList.add("active");
      state.selectedFloor = btn.getAttribute("data-floor");
      renderSlotsMatrix();
    };
  });

  // Duration select price mapping
  document.getElementById("booking-duration").onchange = () => {
    calculateBookingPrice();
  };

  // Details booking button
  document.getElementById("details-book-now-btn").onclick = () => navigateTo("slot-booking");

  // Booking details checkout submit opens Payment modal
  document.getElementById("booking-checkout-form").onsubmit = (e) => {
    e.preventDefault();
    if (!state.selectedSlot) return;

    const park = state.selectedParking;
    const upiMerchantText = document.getElementById("pay-upi-merchant-id");
    if (upiMerchantText && park) {
      upiMerchantText.innerText = park.upiId || "merchant@upi";
    }

    // Toggle custom uploaded payment QR vs SVG
    const upiSvg = document.getElementById("pay-upi-qr-svg");
    const upiImg = document.getElementById("pay-upi-qr-image");
    const upiFallback = document.getElementById("pay-upi-qr-fallback");
    if (upiImg && upiFallback) {
      if (upiSvg) upiSvg.style.display = "none";
      if (park && park.qrCodeImage) {
        upiImg.src = park.qrCodeImage;
        upiImg.style.display = "block";
        upiFallback.style.display = "none";
      } else {
        upiImg.style.display = "none";
        upiFallback.style.display = "block";
      }
    }

    const cost = document.getElementById("summary-total-cost").innerText;
    document.getElementById("pay-modal-total-amt").innerText = cost;
    document.getElementById("modal-checkout-payment").classList.add("active");
  };

  // Payment Confirmation logic gate
  document.getElementById("pay-confirm-gate-btn").onclick = () => {
    const park = state.selectedParking;
    const slot = state.selectedSlot;
    const date = document.getElementById("booking-date").value;
    const time = document.getElementById("booking-time").value;
    const hours = parseInt(document.getElementById("booking-duration").value);
    const costText = document.getElementById("pay-modal-total-amt").innerText;
    const cost = parseFloat(costText.substring(1));

    const bId = `PE-${Math.floor(1000 + Math.random() * 9000)}-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 10)}`;

    const newBooking = {
      id: bId,
      parkingId: park.id,
      parkingName: park.name,
      slotId: slot.id,
      date: date,
      time: time,
      duration: hours,
      price: cost,
      status: "Active",
      qrCode: bId
    };

    Object.values(park.slots).forEach(floor => {
      floor.forEach(s => {
        if (s.id === slot.id) s.status = "reserved";
      });
    });

    state.bookings.unshift(newBooking);
    saveState();
    
    document.getElementById("modal-checkout-payment").classList.remove("active");
    state.selectedSlot = null;

    navigateTo("booking-confirmation", { bookingId: bId });
    window.showToast("Payment Successful", `Reserved slot ${slot.id} successfully. Invoice reference: ${bId}.`, "success");
  };

  // Payment option tabs switcher
  document.querySelectorAll(".payment-selector-btn").forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll(".payment-selector-btn").forEach(el => el.classList.remove("active"));
      btn.classList.add("active");

      const method = btn.getAttribute("data-pay-method");
      document.querySelectorAll(".payment-content-block").forEach(el => el.style.display = "none");
      document.getElementById(`pay-block-${method}`).style.display = "block";
    };
  });

  // Modal closers
  document.querySelectorAll(".close-modal-btn").forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll(".modal-overlay").forEach(m => m.classList.remove("active"));
    };
  });

  // Profile forms
  document.getElementById("profile-personal-form").onsubmit = (e) => {
    e.preventDefault();
    const user = state.activeUser;
    if (user) {
      const newName = document.getElementById("prof-name").value.trim();
      const newPhone = document.getElementById("prof-phone").value.trim();

      user.name = newName;
      user.phone = newPhone;

      // Update registry matches
      if (state.currentRole === "customer") {
        const cMatch = state.customers.find(c => c.id === user.id);
        if (cMatch) {
          cMatch.name = newName;
          cMatch.phone = newPhone;
        }
      } else if (state.currentRole === "owner") {
        const mMatch = state.managers.find(m => m.id === user.id);
        if (mMatch) {
          mMatch.name = newName;
          mMatch.phone = newPhone;
        }
      }

      saveState();
      updateRoleLayout();

      // If customer dashboard is open, sync welcome card element
      const welcomeNameEl = document.getElementById("dash-user-name");
      if (welcomeNameEl) welcomeNameEl.innerText = newName;

      window.showToast("Profile Saved", "Personal contact settings updated.", "success");
    }
  };

  // Customer settings form submit
  const custSettingsForm = document.getElementById("customer-settings-form");
  if (custSettingsForm) {
    custSettingsForm.onsubmit = (e) => {
      e.preventDefault();
      const push = document.getElementById("settings-pref-push").checked;
      const overstay = document.getElementById("settings-pref-overstay").checked;
      const defVeh = document.getElementById("settings-default-vehicle").value;
      const defCard = document.getElementById("settings-default-card").value;

      // Update vehicles primary status
      state.vehicles.forEach(v => {
        v.isPrimary = (v.id === defVeh);
      });
      // Update payments primary status
      state.payments.forEach(c => {
        c.isPrimary = (c.id === defCard);
      });

      saveState();
      window.showToast("Preferences Saved", "Customer settings updated successfully.", "success");
    };
  }

  // Floor selector for slot matrix
  const floorSelect = document.getElementById("owner-slots-floor-select");
  if (floorSelect) {
    floorSelect.onchange = (e) => {
      ownerPageState.slotsFloor = e.target.value;
      renderOwnerManageSlots();
    };
  }

  // Add slot button
  const addSlotBtn = document.getElementById("owner-create-slot-btn");
  if (addSlotBtn) {
    addSlotBtn.onclick = () => {
      const branch = getManagerBranch();
      const floor = ownerPageState.slotsFloor;
      const count = branch.slots[floor].length + 1;
      const newId = `S-${count}`;
      branch.slots[floor].push({
        id: newId,
        status: "available",
        category: "General"
      });
      saveState();
      renderOwnerManageSlots();
      window.showToast("Space Added", `Parking slot ${newId} created on ${floor}.`, "success");
    };
  }

  // Today's bookings search & status selects
  const bookingsSearch = document.getElementById("owner-bookings-search");
  if (bookingsSearch) {
    bookingsSearch.oninput = (e) => {
      ownerPageState.bookings.search = e.target.value;
      ownerPageState.bookings.page = 1;
      renderOwnerBookings();
    };
  }
  const bookingsFilter = document.getElementById("owner-bookings-filter-status");
  if (bookingsFilter) {
    bookingsFilter.onchange = (e) => {
      ownerPageState.bookings.status = e.target.value;
      ownerPageState.bookings.page = 1;
      renderOwnerBookings();
    };
  }

  // Bookings pagination button clicks
  const prevBookings = document.getElementById("owner-bookings-prev-btn");
  if (prevBookings) {
    prevBookings.onclick = () => {
      if (ownerPageState.bookings.page > 1) {
        ownerPageState.bookings.page--;
        renderOwnerBookings();
      }
    };
  }
  const nextBookings = document.getElementById("owner-bookings-next-btn");
  if (nextBookings) {
    nextBookings.onclick = () => {
      const branch = getManagerBranch();
      const listTotal = state.bookings.filter(b => b.parkingId === branch.id).length;
      if (ownerPageState.bookings.page * ownerPageState.bookings.limit < listTotal) {
        ownerPageState.bookings.page++;
        renderOwnerBookings();
      }
    };
  }

  // Customers search & pagination
  const customersSearch = document.getElementById("owner-customers-search");
  if (customersSearch) {
    customersSearch.oninput = (e) => {
      ownerPageState.customers.page = 1;
      renderOwnerCustomers();
    };
  }
  const prevCustomers = document.getElementById("owner-customers-prev-btn");
  if (prevCustomers) {
    prevCustomers.onclick = () => {
      if (ownerPageState.customers.page > 1) {
        ownerPageState.customers.page--;
        renderOwnerCustomers();
      }
    };
  }
  const nextCustomers = document.getElementById("owner-customers-next-btn");
  if (nextCustomers) {
    nextCustomers.onclick = () => {
      const listTotal = state.customers.length;
      if (ownerPageState.customers.page * ownerPageState.customers.limit < listTotal) {
        ownerPageState.customers.page++;
        renderOwnerCustomers();
      }
    };
  }

  // Temporary QR Code holder
  let uploadedQrBase64 = null;
  const qrFileInput = document.getElementById("ob-settings-qr-file");
  if (qrFileInput) {
    qrFileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          uploadedQrBase64 = event.target.result;
          const img = document.getElementById("ob-settings-qr-preview-img");
          const txt = document.getElementById("ob-settings-qr-preview-txt");
          if (img && txt) {
            img.src = uploadedQrBase64;
            img.style.display = "block";
            txt.style.display = "none";
          }
        };
        reader.readAsDataURL(file);
      }
    };
  }

  // Branch configuration form submits
  const branchForm = document.getElementById("owner-branch-details-form");
  if (branchForm) {
    branchForm.onsubmit = (e) => {
      e.preventDefault();
      const branch = getManagerBranch();
      branch.name = document.getElementById("ob-settings-name").value.trim();
      branch.address = document.getElementById("ob-settings-addr").value.trim();
      branch.hourlyRate = parseFloat(document.getElementById("ob-settings-rate").value) || 4.0;
      branch.upiId = document.getElementById("ob-settings-upi").value.trim();
      branch.description = document.getElementById("ob-settings-desc").value.trim();
      if (uploadedQrBase64) {
        branch.qrCodeImage = uploadedQrBase64;
      }
      saveState();
      window.showToast("Success", "QR Code updated successfully.", "success");
    };
  }

  // Branch amenities form submits
  const amenitiesForm = document.getElementById("owner-branch-amenities-form");
  if (amenitiesForm) {
    amenitiesForm.onsubmit = (e) => {
      e.preventDefault();
      const branch = getManagerBranch();
      const am = [];
      if (document.getElementById("ob-amenity-ev").checked) am.push("EV Charging");
      if (document.getElementById("ob-amenity-cctv").checked) am.push("CCTV");
      if (document.getElementById("ob-amenity-wheel").checked) am.push("Wheelchair Access");
      if (document.getElementById("ob-amenity-valet").checked) am.push("Valet");
      if (document.getElementById("ob-amenity-wash").checked) am.push("Car Wash");
      branch.amenities = am;
      saveState();
      window.showToast("Amenities Updated", "Offered facilities synchronized.", "success");
    };
  }

  // CSV report downloads
  const reportsExport = document.getElementById("owner-reports-export-btn");
  if (reportsExport) {
    reportsExport.onclick = () => {
      const branch = getManagerBranch();
      let csv = "Booking Reference,Driver Name,Slot ID,Schedule Date/Time,Amount,Status\n";
      state.bookings.filter(b => b.parkingId === branch.id).forEach(b => {
        csv += `${b.id},Customer Driver,${b.slotId},${b.date} ${b.time},${b.price || 0},${b.status}\n`;
      });
      const blob = new Blob([csv], { type: "text/csv" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `parkease_report_${branch.id}.csv`;
      link.click();
      window.showToast("Export Completed", `Statement exported to parkease_report_${branch.id}.csv`, "success");
    };
  }

  // Manager Broadcast announcement updates
  const ownerAnnForm = document.getElementById("owner-announcement-form");
  if (ownerAnnForm) {
    ownerAnnForm.onsubmit = (e) => {
      e.preventDefault();
      const branch = getManagerBranch();
      const title = document.getElementById("owner-ann-title").value.trim();
      const message = document.getElementById("owner-ann-message").value.trim();

      const newAlert = {
        id: "ann-" + Math.floor(Math.random() * 10000),
        title: title,
        message: message,
        time: "Just now",
        isRead: false,
        audience: "drivers",
        branchId: branch.id
      };

      state.notifications.push(newAlert);
      saveState();
      renderOwnerNotifications();
      ownerAnnForm.reset();
      window.showToast("Announcement Published", "Warning broadcast sent to active drivers.", "success");
    };
  }

  // Manager profile configs submits
  const ownerProfForm = document.getElementById("owner-profile-settings-form");
  if (ownerProfForm) {
    ownerProfForm.onsubmit = (e) => {
      e.preventDefault();
      const user = state.activeUser;
      const name = document.getElementById("owner-prof-name").value.trim();
      const phone = document.getElementById("owner-prof-phone").value.trim();
      const pass = document.getElementById("owner-prof-pass").value;

      user.name = name;
      user.phone = phone;
      if (pass) {
        user.password = pass;
      }
      // Update manager list record
      const match = state.managers.find(m => m.id === user.id);
      if (match) {
        match.name = name;
        match.phone = phone;
        if (pass) match.password = pass;
      }

      saveState();
      window.showToast("Profile Settings Saved", "Manager contact credentials updated.", "success");
    };
  }

  // Branch Manager simulations checkins triggers
  document.getElementById("owner-simulate-entry-btn").onclick = () => {
    const id = prompt("Position scanner camera... Enter Booking Reference ID (e.g. PE-8294-A9):");
    if (id) {
      gateCheckIn(id);
    }
  };

  document.getElementById("owner-simulate-exit-btn").onclick = () => {
    const id = prompt("Position scanner camera... Enter Booking Reference ID to checkout:");
    if (id) {
      gateCheckOut(id);
    }
  };

  // Add Manager modal
  document.getElementById("admin-add-manager-btn").onclick = () => {
    const branchSelect = document.getElementById("am-modal-branch");
    branchSelect.innerHTML = "";
    state.parkings.forEach(p => {
      branchSelect.innerHTML += `<option value="${p.id}">${p.name}</option>`;
    });
    document.getElementById("modal-admin-manager").classList.add("active");
  };

  document.getElementById("admin-manager-form").onsubmit = (e) => {
    e.preventDefault();
    const name = document.getElementById("am-modal-name").value;
    const email = document.getElementById("am-modal-email").value;
    const password = document.getElementById("am-modal-password").value;
    const branch = document.getElementById("am-modal-branch").value;

    state.managers.push({
      id: `m-${Date.now()}`,
      name: name,
      email: email,
      password: password,
      branchId: branch,
      joined: new Date().toISOString().split('T')[0]
    });

    saveState();
    renderAdminManagers();
    renderAdminOverview();
    document.getElementById("modal-admin-manager").classList.remove("active");
    document.getElementById("admin-manager-form").reset();
    window.showToast("Manager Added", `Manager ${name} registered successfully.`, "success");
  };

  // Add Area modal
  document.getElementById("admin-add-area-btn").onclick = () => {
    document.getElementById("modal-admin-parking").classList.add("active");
  };

  document.getElementById("admin-parking-form").onsubmit = (e) => {
    e.preventDefault();
    const name = document.getElementById("ap-modal-name").value;
    const addr = document.getElementById("ap-modal-addr").value;
    const rate = parseFloat(document.getElementById("ap-modal-rate").value);
    const slots = parseInt(document.getElementById("ap-modal-slots").value);
    const lat = parseFloat(document.getElementById("ap-modal-lat").value);
    const lng = parseFloat(document.getElementById("ap-modal-lng").value);

    const generatedSlots = { F1: [] };
    for (let i = 1; i <= slots; i++) {
      generatedSlots.F1.push({
        id: `S-${i}`,
        status: "available",
        category: "General"
      });
    }

    state.parkings.push({
      id: `park-${Date.now()}`,
      name: name,
      address: addr,
      coordinates: { lat: lat, lng: lng },
      hourlyRate: rate,
      rating: 5.0,
      status: "Approved",
      image: "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&q=80&w=400",
      description: "Secured smart parking branches.",
      amenities: ["CCTV", "Elevators"],
      slots: generatedSlots
    });

    saveState();
    renderAdminAreas();
    renderAdminOverview();
    document.getElementById("modal-admin-parking").classList.remove("active");
    document.getElementById("admin-parking-form").reset();
    window.showToast("Branch Created", `Branch ${name} launched on maps.`, "success");
  };

  // Admin sub-screen search inputs & filter selects
  const searchOverview = document.getElementById("admin-overview-search");
  if (searchOverview) {
    searchOverview.addEventListener("input", (e) => {
      adminPageState.overview.search = e.target.value;
      adminPageState.overview.page = 1;
      renderAdminOverview();
    });
  }
  const filterBranch = document.getElementById("admin-overview-filter-branch");
  if (filterBranch) {
    filterBranch.addEventListener("change", (e) => {
      adminPageState.overview.branch = e.target.value;
      adminPageState.overview.page = 1;
      renderAdminOverview();
    });
  }
  const filterStatusOverview = document.getElementById("admin-overview-filter-status");
  if (filterStatusOverview) {
    filterStatusOverview.addEventListener("change", (e) => {
      adminPageState.overview.status = e.target.value;
      adminPageState.overview.page = 1;
      renderAdminOverview();
    });
  }

  // Table exports
  const exportCsvBtn = document.getElementById("admin-export-bookings-csv");
  if (exportCsvBtn) {
    exportCsvBtn.onclick = () => {
      let csv = "Booking Reference,Location,Date/Time,Amount,Status\n";
      state.bookings.forEach(b => {
        csv += `${b.id},${b.parkingName},${b.date} ${b.time},$${b.amount ? b.amount.toFixed(2) : '0.00'},${b.status}\n`;
      });
      const blob = new Blob([csv], { type: "text/csv" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "parkease_global_bookings.csv";
      link.click();
      window.showToast("Export Success", "Table extracted to parkease_global_bookings.csv", "success");
    };
  }

  // Pagination bounds buttons
  const prevOverviewBtn = document.getElementById("admin-overview-prev-btn");
  if (prevOverviewBtn) {
    prevOverviewBtn.onclick = () => {
      if (adminPageState.overview.page > 1) {
        adminPageState.overview.page--;
        renderAdminOverview();
      }
    };
  }
  const nextOverviewBtn = document.getElementById("admin-overview-next-btn");
  if (nextOverviewBtn) {
    nextOverviewBtn.onclick = () => {
      const listTotal = state.bookings.length;
      if (adminPageState.overview.page * adminPageState.overview.limit < listTotal) {
        adminPageState.overview.page++;
        renderAdminOverview();
      }
    };
  }

  // Managers search / pagination
  const searchManagers = document.getElementById("admin-managers-search");
  if (searchManagers) {
    searchManagers.addEventListener("input", (e) => {
      adminPageState.managers.search = e.target.value;
      adminPageState.managers.page = 1;
      renderAdminManagers();
    });
  }
  const prevManagersBtn = document.getElementById("admin-managers-prev-btn");
  if (prevManagersBtn) {
    prevManagersBtn.onclick = () => {
      if (adminPageState.managers.page > 1) {
        adminPageState.managers.page--;
        renderAdminManagers();
      }
    };
  }
  const nextManagersBtn = document.getElementById("admin-managers-next-btn");
  if (nextManagersBtn) {
    nextManagersBtn.onclick = () => {
      const listTotal = state.managers.length;
      if (adminPageState.managers.page * adminPageState.managers.limit < listTotal) {
        adminPageState.managers.page++;
        renderAdminManagers();
      }
    };
  }

  // Areas search / status / pagination
  const searchAreas = document.getElementById("admin-areas-search");
  if (searchAreas) {
    searchAreas.addEventListener("input", (e) => {
      adminPageState.areas.search = e.target.value;
      adminPageState.areas.page = 1;
      renderAdminAreas();
    });
  }
  const filterAreasStatus = document.getElementById("admin-areas-filter-status");
  if (filterAreasStatus) {
    filterAreasStatus.addEventListener("change", (e) => {
      adminPageState.areas.status = e.target.value;
      adminPageState.areas.page = 1;
      renderAdminAreas();
    });
  }
  const prevAreasBtn = document.getElementById("admin-areas-prev-btn");
  if (prevAreasBtn) {
    prevAreasBtn.onclick = () => {
      if (adminPageState.areas.page > 1) {
        adminPageState.areas.page--;
        renderAdminAreas();
      }
    };
  }
  const nextAreasBtn = document.getElementById("admin-areas-next-btn");
  if (nextAreasBtn) {
    nextAreasBtn.onclick = () => {
      const listTotal = state.parkings.length;
      if (adminPageState.areas.page * adminPageState.areas.limit < listTotal) {
        adminPageState.areas.page++;
        renderAdminAreas();
      }
    };
  }

  // Users search / status / pagination
  const searchUsers = document.getElementById("admin-users-search");
  if (searchUsers) {
    searchUsers.addEventListener("input", (e) => {
      adminPageState.users.search = e.target.value;
      adminPageState.users.page = 1;
      renderAdminUsers();
    });
  }
  const filterUsersStatus = document.getElementById("admin-users-filter-status");
  if (filterUsersStatus) {
    filterUsersStatus.addEventListener("change", (e) => {
      adminPageState.users.status = e.target.value;
      adminPageState.users.page = 1;
      renderAdminUsers();
    });
  }
  const prevUsersBtn = document.getElementById("admin-users-prev-btn");
  if (prevUsersBtn) {
    prevUsersBtn.onclick = () => {
      if (adminPageState.users.page > 1) {
        adminPageState.users.page--;
        renderAdminUsers();
      }
    };
  }
  const nextUsersBtn = document.getElementById("admin-users-next-btn");
  if (nextUsersBtn) {
    nextUsersBtn.onclick = () => {
      const listTotal = state.customers.length;
      if (adminPageState.users.page * adminPageState.users.limit < listTotal) {
        adminPageState.users.page++;
        renderAdminUsers();
      }
    };
  }

  // Broadcast Notification submits
  const broadcastForm = document.getElementById("admin-broadcast-form");
  if (broadcastForm) {
    broadcastForm.onsubmit = (e) => {
      e.preventDefault();
      const title = document.getElementById("broadcast-title").value.trim();
      const target = document.getElementById("broadcast-target").value;
      const message = document.getElementById("broadcast-message").value.trim();

      const newNotif = {
        id: "ann-" + Math.floor(Math.random() * 10000),
        title: title,
        message: message,
        time: "Just now",
        isRead: false,
        audience: target
      };

      state.notifications.push(newNotif);
      saveState();
      renderAdminNotifications();
      broadcastForm.reset();
      window.showToast("Broadcast Dispatched", "SaaS Announcement published successfully.", "success");
    };
  }

  // Settings configs submits
  const settingsForm = document.getElementById("admin-settings-general-form");
  if (settingsForm) {
    settingsForm.onsubmit = (e) => {
      e.preventDefault();
      const mult = parseFloat(document.getElementById("settings-cost-mult").value) || 1.0;
      const cur = document.getElementById("settings-currency").value;

      state.settings.costMultiplier = mult;
      state.settings.currency = cur;
      saveState();
      window.showToast("Settings Saved", "Global SaaS configurations updated.", "success");
    };
  }

  // Reset database button click
  const resetBtn = document.getElementById("settings-reset-db-btn");
  if (resetBtn) {
    resetBtn.onclick = () => {
      showConfirmDialog("Reset Database", "Erase all mock listings, credentials, and settings, and restore defaults?", () => {
        LocalStore.clear();
        window.location.reload();
      });
    };
  }

  // Edit User Form submit handler
  const editUserForm = document.getElementById("admin-user-form");
  if (editUserForm) {
    editUserForm.onsubmit = (e) => {
      e.preventDefault();
      const uId = document.getElementById("au-modal-id").value;
      const name = document.getElementById("au-modal-name").value.trim();
      const email = document.getElementById("au-modal-email").value.trim();
      const phone = document.getElementById("au-modal-phone").value.trim();

      const user = state.customers.find(c => c.id === uId);
      if (user) {
        user.name = name;
        user.email = email;
        user.phone = phone;
        saveState();
        renderAdminUsers();
        document.querySelectorAll(".modal-overlay").forEach(m => m.classList.remove("active"));
        window.showToast("Profile Updated", "Driver registry profile saved.", "success");
      }
    };
  }

  // Modal additions profiles triggers
  document.getElementById("profile-add-vehicle-btn").onclick = () => {
    document.getElementById("modal-add-vehicle").classList.add("active");
  };
  document.getElementById("profile-add-payment-btn").onclick = () => {
    document.getElementById("modal-add-payment").classList.add("active");
  };

  document.getElementById("add-vehicle-form").onsubmit = (e) => {
    e.preventDefault();
    const model = document.getElementById("veh-modal-model").value;
    const plate = document.getElementById("veh-modal-plate").value;
    const type = document.getElementById("veh-modal-type").value;

    state.vehicles.push({
      id: `v-${Date.now()}`,
      model: model,
      plate: plate,
      type: type,
      isPrimary: state.vehicles.length === 0
    });

    saveState();
    renderProfilePage();
    document.getElementById("modal-add-vehicle").classList.remove("active");
    document.getElementById("add-vehicle-form").reset();
    window.showToast("Vehicle Registered", "Vehicle added to registry.", "success");
  };

  document.getElementById("add-payment-form").onsubmit = (e) => {
    e.preventDefault();
    const name = document.getElementById("pay-modal-name").value;
    const number = document.getElementById("pay-modal-number").value;
    const expiry = document.getElementById("pay-modal-expiry").value;

    state.payments.push({
      id: `p-${Date.now()}`,
      cardholder: name,
      brand: "Visa",
      last4: number.slice(-4),
      expiry: expiry,
      isPrimary: state.payments.length === 0
    });

    saveState();
    renderProfilePage();
    document.getElementById("modal-add-payment").classList.remove("active");
    document.getElementById("add-payment-form").reset();
    window.showToast("Payment Card Added", "Payment method linked.", "success");
  };

  // Date and Time checkout default listeners
  document.getElementById("booking-date").onchange = renderSlotsMatrix;
  document.getElementById("booking-time").onchange = renderSlotsMatrix;

  document.getElementById("conf-get-nav-directions").onclick = () => {
    alert("Navigating via OpenStreetMap Routing API...\nDirections: Proceed 1.2 km on MG Road, branch parking is on your left.");
  };
  document.getElementById("conf-goto-bookings-btn").onclick = () => navigateTo("booking-history");
  document.getElementById("conf-cancel-booking-btn").onclick = () => {
    const b = state.bookings[0];
    if (confirm("Cancel this booking?")) {
      b.status = "Cancelled";
      const park = state.parkings.find(p => p.id === b.parkingId);
      Object.values(park.slots).forEach(floor => {
        floor.forEach(s => {
          if (s.id === b.slotId) s.status = "available";
        });
      });
      saveState();
      navigateTo("booking-history");
      window.showToast("Booking Cancelled", "Reservation cancelled and refund processed.", "danger");
    }
  };

  // Booking history tabs
  document.querySelectorAll("[data-history-tab]").forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll("[data-history-tab]").forEach(el => el.classList.remove("active"));
      btn.classList.add("active");
      state.activeHistoryTab = btn.getAttribute("data-history-tab");
      renderBookingHistory();
    };
  });

  // Profile section blocks tab links
  document.querySelectorAll("[data-profile-section]").forEach(btn => {
    btn.onclick = () => {
      state.activeProfileSection = btn.getAttribute("data-profile-section");
      renderProfilePage();
    };
  });

  // Customer Dash quick navigation links
  document.getElementById("cust-dash-find-parking-btn").onclick = () => navigateTo("search-parking");
  document.getElementById("cust-dash-view-history-btn").onclick = () => navigateTo("booking-history");

  // Manager manage slot page add slot
  document.getElementById("owner-create-slot-btn").onclick = () => {
    const manager = state.activeUser || state.managers[0];
    const branch = state.parkings.find(p => p.id === manager.branchId) || state.parkings[0];

    const f1Slots = branch.slots.F1 || [];
    const newId = `A-${f1Slots.length + 1}`;
    
    f1Slots.push({
      id: newId,
      status: "available",
      category: "General"
    });

    saveState();
    renderOwnerManageSlots();
    window.showToast("Slot Created", `Slot space ${newId} created.`, "success");
  };

  // Manager Payment Settings form submission
  const paymentSettingsForm = document.getElementById("owner-payment-settings-form");
  if (paymentSettingsForm) {
    paymentSettingsForm.onsubmit = (e) => {
      e.preventDefault();
      const manager = state.activeUser || state.managers[0];
      const upiId = document.getElementById("owner-upi-id").value.trim();
      
      const branch = state.parkings.find(p => p.id === manager.branchId);
      if (branch) {
        branch.upiId = upiId;
        saveState();
        window.showToast("Payment Settings Saved", `UPI Merchant ID set to: ${upiId}`, "success");
        renderOwnerOverview();
      }
    };
  }

  // Logout button event
  document.getElementById("header-logout-btn").onclick = () => {
    state.currentRole = null;
    state.activeUser = null;
    saveState();
    updateRoleLayout();
    navigateTo("landing", {}, true);
    window.showToast("Logged Out", "Session ended successfully.", "success");
  };

  // Hero CTA
  document.getElementById("landing-hero-cta").onclick = (e) => {
    if (!state.currentRole) {
      e.preventDefault();
      navigateTo("login");
      window.showToast("Please Sign In", "Sign in to search and reserve slots.", "warning");
    }
  };

  // AI Chatbot Assistant Controls
  const chatToggle = document.getElementById("ai-chatbot-toggle");
  const chatPanel = document.getElementById("ai-chatbot-panel");
  const chatClose = document.getElementById("ai-chatbot-close");
  const chatMin = document.getElementById("ai-chatbot-minimize");
  const chatForm = document.getElementById("ai-chatbot-form");
  const chatInput = document.getElementById("ai-chatbot-input");
  const chatMessages = document.getElementById("ai-chatbot-messages");

  if (chatToggle && chatPanel) {
    chatToggle.onclick = () => {
      const isHidden = chatPanel.style.display === "none";
      chatPanel.style.display = isHidden ? "flex" : "none";
    };
  }
  if (chatClose) {
    chatClose.onclick = () => {
      chatPanel.style.display = "none";
    };
  }
  if (chatMin) {
    chatMin.onclick = () => {
      if (chatPanel.style.height === "45px") {
        chatPanel.style.height = "480px";
      } else {
        chatPanel.style.height = "45px";
      }
    };
  }

  window.handleChatSuggestion = function(text) {
    addChatMessage(text, "user");
    simulateAssistantResponse(text);
  };

  function addChatMessage(text, sender) {
    const msg = document.createElement("div");
    if (sender === "user") {
      msg.style.alignSelf = "flex-end";
      msg.style.background = "var(--primary-light)";
      msg.style.color = "var(--primary)";
      msg.style.padding = "0.75rem 1rem";
      msg.style.borderRadius = "var(--radius-md) var(--radius-md) 0 var(--radius-md)";
    } else {
      msg.style.alignSelf = "flex-start";
      msg.style.background = "white";
      msg.style.color = "var(--secondary)";
      msg.style.padding = "0.75rem 1rem";
      msg.style.borderRadius = "var(--radius-md) var(--radius-md) var(--radius-md) 0";
      msg.style.border = "1px solid var(--border)";
    }
    msg.style.fontSize = "0.85rem";
    msg.style.maxWidth = "80%";
    msg.style.lineHeight = "1.4";
    msg.innerText = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function simulateAssistantResponse(userInput) {
    setTimeout(() => {
      const query = userInput.toLowerCase();
      let reply = "I am a smart prototype assistant. I can help search slots, check bookings, or guide you around our premium garages.";

      if (query.includes("find parking") || query.includes("search")) {
        reply = "Sure! You can head over to our 'Find Parking' tab in the navbar to see Indian city coordinates, filters, and satellite map pins.";
      } else if (query.includes("booking") || query.includes("reserve")) {
        reply = "You can view, schedule, and cancel reservations directly from 'My Bookings' tab, or check your current active checkout from 'Active Booking'.";
      } else if (query.includes("price") || query.includes("rate") || query.includes("tariff")) {
        reply = "Our Indian garages range from ₹50/hr to ₹250/hr. You can filter locations by 'Lowest Price' on the Find Parking map view!";
      } else if (query.includes("support") || query.includes("contact")) {
        reply = "You can contact our premium SaaS support desk by visiting the Contact section on the Home screen or emailing support@parkease.com.";
      }

      addChatMessage(reply, "assistant");
    }, 800);
  }

  if (chatForm && chatInput) {
    chatForm.onsubmit = (e) => {
      e.preventDefault();
      const val = chatInput.value.trim();
      if (!val) return;
      addChatMessage(val, "user");
      chatInput.value = "";
      simulateAssistantResponse(val);
    };
  }
});

window.navigateToBooking = function(id) {
  const park = state.parkings.find(p => p.id === id);
  if (park) {
    state.selectedParking = park;
    navigateTo("parking-details", { id: park.id });
  }
};

function updateRoleLayout() {
  const role = state.currentRole;
  const nav = document.getElementById("header-nav-links");
  const authBtns = document.getElementById("header-auth-buttons");
  const userMenu = document.getElementById("header-user-menu");
  const displayAvatar = document.getElementById("user-avatar-img");
  const displayName = document.getElementById("user-display-name");

  const customerNavIds = ["nav-dashboard", "nav-find-parking", "nav-my-bookings", "nav-active-booking", "nav-notifications", "nav-settings"];

  if (!role) {
    // Logged Out
    nav.style.display = "flex";
    document.querySelectorAll("#header-nav-links .nav-link").forEach(link => {
      if (customerNavIds.includes(link.id)) {
        link.parentElement.style.display = "none";
      } else {
        link.parentElement.style.display = "block";
      }
    });
    
    authBtns.style.display = "flex";
    userMenu.style.display = "none";
  } else {
    // Logged In
    authBtns.style.display = "none";
    userMenu.style.display = "flex";

    if (role === "customer") {
      nav.style.display = "flex";
      document.querySelectorAll("#header-nav-links .nav-link").forEach(link => {
        if (customerNavIds.includes(link.id)) {
          link.parentElement.style.display = "block";
        } else {
          link.parentElement.style.display = "none";
        }
      });
      
      const userObj = state.activeUser || state.customers[0];
      displayName.innerText = userObj.name;
      displayAvatar.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100";
    } else if (role === "owner") {
      nav.style.display = "none";
      const userObj = state.activeUser || state.managers[0];
      displayName.innerText = `${userObj.name} (Manager)`;
      displayAvatar.src = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100";
    } else if (role === "admin") {
      nav.style.display = "none";
      displayName.innerText = "System Admin";
      displayAvatar.src = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100";
    }
  }
}

function setupAuthEvents() {
  // Login
  document.getElementById("login-form").onsubmit = (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value.trim().toLowerCase();
    const pass = document.getElementById("login-password").value.trim();

    // 1. Admin Check
    if (email === "admin@gmail.com" && pass === "admin") {
      state.currentRole = "admin";
      state.activeUser = { name: "System Admin", email: email };
      saveState();
      updateRoleLayout();
      navigateTo("admin-overview", {}, true);
      window.showToast("Access Granted", "Logged in as SaaS Administrator.", "success");
      return;
    }

    // 2. Branch Manager Check
    const managerMatch = state.managers.find(m => m.email.toLowerCase() === email && m.password === pass);
    if (managerMatch) {
      state.currentRole = "owner";
      state.activeUser = managerMatch;
      saveState();
      updateRoleLayout();
      navigateTo("owner-overview", {}, true);
      window.showToast("Access Granted", `Welcome back, Manager ${managerMatch.name}!`, "success");
      return;
    }

    // 3. Customer Check
    const customerMatch = state.customers.find(c => c.email.toLowerCase() === email && c.password === pass);
    if (customerMatch) {
      if (customerMatch.status === "Blocked") {
        window.showToast("Access Denied", "Your account has been suspended by Admin.", "danger");
        return;
      }
      state.currentRole = "customer";
      state.activeUser = customerMatch;
      saveState();
      updateRoleLayout();
      navigateTo("customer-dashboard", {}, true);
      window.showToast("Welcome Back", `Signed in as ${customerMatch.name}.`, "success");
      return;
    }

    // On mismatch:
    window.showToast("Login Failed", "Invalid email address or password.", "danger");
  };

  // Sign up (Customer Only)
  document.getElementById("register-form").onsubmit = (e) => {
    e.preventDefault();
    const name = document.getElementById("reg-name").value.trim();
    const email = document.getElementById("reg-email").value.trim();
    const phone = document.getElementById("reg-phone").value.trim();
    const plate = document.getElementById("reg-veh-plate").value.trim();
    const type = document.getElementById("reg-veh-type").value;
    const password = document.getElementById("reg-password").value;
    const confirmPass = document.getElementById("reg-confirm-password").value;

    if (password !== confirmPass) {
      window.showToast("Registration Error", "Passwords do not match.", "danger");
      return;
    }

    if (state.customers.some(c => c.email.toLowerCase() === email.toLowerCase())) {
      window.showToast("Registration Error", "Email address already registered.", "danger");
      return;
    }

    const newCust = {
      id: `c-${Date.now()}`,
      name: name,
      email: email,
      password: password,
      phone: phone,
      status: "Active",
      joined: new Date().toISOString().split('T')[0]
    };

    state.customers.push(newCust);

    state.vehicles = [
      { id: `v-${Date.now()}`, model: `${type} Vehicle`, plate: plate, type: type.toLowerCase(), isPrimary: true }
    ];

    state.currentRole = "customer";
    state.activeUser = newCust;
    saveState();
    
    updateRoleLayout();
    navigateTo("customer-dashboard");
    window.showToast("Registration Complete", `Welcome to ParkEase, ${name}!`, "success");
  };

  // Forgot PW
  document.getElementById("forgot-pw-form").onsubmit = (e) => {
    e.preventDefault();
    navigateTo("otp-verify");
  };

  // OTP
  document.getElementById("otp-form").onsubmit = (e) => {
    e.preventDefault();
    navigateTo("password-reset");
  };

  // Reset
  document.getElementById("password-reset-form").onsubmit = (e) => {
    e.preventDefault();
    window.showToast("Password Saved", "Credentials updated. Please log in.", "success");
    navigateTo("login");
  };
}
