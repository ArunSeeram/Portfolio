export interface Project {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  domain: string;
  tech: string[];
  role: string;
  keyFeatures: string[];
  github?: string;
  live?: string;
  image: string;
  accent: string;
}

export const projects: Project[] = [
  {
    id: 'furnivista',
    number: '01',
    title: 'Furnivista POS',
    tagline: 'Furniture Showroom Management System',
    description:
      'Enterprise-grade Point of Sale and showroom operations suite for furniture retail. Multi-terminal POS with wireless barcode scanning, quotation-to-order lifecycle, ESC/POS thermal printing, and real-time SSE sync across all connected clients.',
    domain: 'Retail ERP / POS',
    tech: ['React 18', 'Node.js', 'Express', 'MySQL', 'SSE', 'Razorpay', 'Vite'],
    role: 'Full-stack development — frontend SPA, REST API design, real-time event architecture, thermal print engine, and mobile barcode scanner pairing system.',
    keyFeatures: [
      'Multi-tab POS billing with up to 5 concurrent cashier sessions',
      'Mobile phone camera barcode scanning via 6-digit OTP pairing',
      'Quotation → Order → Delivery → Payment full lifecycle',
      'ESC/POS thermal receipt printing over BLE and Wi-Fi TCP',
      'Role-based access control (Owner / Admin / Cashier / Delivery)',
      'Real-time inventory sync via Server-Sent Events',
    ],
    github: '#',
    live: 'https://furnitures.sunraisesolutions.com/dashboard',
    image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800',
    accent: '#c8956e',
  },
  {
    id: 'stepora',
    number: '02',
    title: 'Stepora Footwear POS',
    tagline: 'Footwear Retail & Multi-Location POS',
    description:
      'Production-ready footwear retail ERP and POS system with multi-attribute variant management (size, color, SKU), multi-location inventory, automated discount engine, loyalty program CRM, and Web Bluetooth ESC/POS printing.',
    domain: 'Retail ERP / POS',
    tech: ['React 18', 'Vite 5', 'Node.js', 'MySQL', 'Recharts', 'Razorpay', 'SSE'],
    role: 'Full-stack — monorepo architecture, POS billing UI, inventory management, financial analytics dashboard, thermal print engine, and Razorpay payment integration.',
    keyFeatures: [
      'Multi-attribute variant management (UK/India sizing, color SKUs)',
      'Buy X Get Y promotions and automated discount engine',
      'CRM with loyalty points, store credit, and coupon management',
      'Barcode label generation and mobile wireless scanning',
      'Multi-location inventory with stock velocity analytics',
      'Recharts-powered financial dashboard and revenue reporting',
    ],
    github: '#',
    live: 'https://footwear.sunraisesolutions.com/dashboard',
    image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800',
    accent: '#6e8ec8',
  },
  {
    id: 'ownerkeys',
    number: '03',
    title: 'Owner Keys',
    tagline: 'Real Estate & Smart Vehicle Safety Platform',
    description:
      'Integrated real estate marketplace and connected vehicle safety ecosystem. Direct property listing (buy/sell/rent) with GPS mapping, legal document verification, and QR-based vehicle emergency contact system with Firebase push notifications.',
    domain: 'Real Estate / SaaS',
    tech: ['Next.js 14', 'React 18', 'Node.js', 'MySQL', 'Redis', 'Razorpay', 'Firebase FCM', 'OpenStreetMap'],
    role: 'Full-stack — Next.js App Router architecture, property listing flows, geolocation-based search, vehicle QR system, Redis session management, and Razorpay subscription payments.',
    keyFeatures: [
      'Direct property listings: Buy, Sell, Rent, Commercial, Plots',
      'OpenStreetMap geocoding with exact GPS coordinates',
      'Vehicle QR stickers for emergency contact via scan',
      'Firebase Cloud Messaging push notifications',
      'Redis-cached sessions and microservices architecture',
      'Razorpay subscription payments for premium listings',
    ],
    github: '#',
    live: 'https://ownerkeys.in/',
    image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800',
    accent: '#6ec8a9',
  },
  {
    id: 'kalepalli',
    number: '04',
    title: 'Kalepalli Jewellers',
    tagline: 'Luxury Jewellery E-Commerce & Admin Platform',
    description:
      'Premium dark-themed jewellery storefront with live gold rate pricing engine, SMS OTP authentication, PDFKit invoice generation, COD order management, and a full back-office admin ERP for catalog, orders, and customer management.',
    domain: 'E-Commerce / Luxury Retail',
    tech: ['React 19', 'TypeScript', 'Vite 7', 'Tailwind CSS v4', 'Node.js', 'MySQL', 'PDFKit'],
    role: 'Full-stack — luxury storefront UI, dynamic pricing engine (weight × rate + wastage), SMS OTP auth, admin ERP with order lifecycle management, and server-side PDF invoice generation.',
    keyFeatures: [
      'Live gold rate pricing with transparent weight/wastage calculation',
      'SMS OTP authentication with WhatsApp order confirmation',
      'PDFKit server-side tax invoice PDF generation',
      'Admin catalog with live gold rate configuration',
      'COD order management with full status lifecycle',
      'Wishlist, shopping cart, and order history',
    ],
    github: '#',
    live: 'https://forestgreen-sandpiper-944851.hostingersite.com/',
    image: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=800',
    accent: '#c8a96e',
  },
  {
    id: 'neshosp',
    number: '05',
    title: 'NESHOSP',
    tagline: 'Hospital Management & Patient Portal',
    description:
      'Enterprise healthcare management application for New Life Emergency & Super Speciality Hospital. Full patient portal with doctor scheduling, online consultation booking, multi-lingual support (English/Hindi/Telugu), and a secure admin CMS.',
    domain: 'Healthcare / Enterprise',
    tech: ['React 19', 'Node.js', 'Express 5', 'MySQL', 'Multer', 'JWT', 'i18n'],
    role: 'Full-stack — patient portal, doctor directory with live availability, appointment queue management, multi-lingual i18n system, admin portal, and Multer media upload pipeline.',
    keyFeatures: [
      'Doctor directory with real-time slot scheduling',
      'Online consultation booking and queue management',
      'Multi-lingual interface: English, Hindi, Telugu',
      'Secure JWT admin authentication with CMS',
      'Patient inquiry and emergency help desk',
      'Healthcare blog, gallery, and testimonials moderation',
    ],
    github: '#',
    live: 'https://www.newlifeemergencyhospital.com/',
    image: 'https://images.pexels.com/photos/7579819/pexels-photo-7579819.jpeg?auto=compress&cs=tinysrgb&w=800',
    accent: '#6e9dc8',
  },
  {
    id: 'sahasraayu',
    number: '06',
    title: 'Sahasraayu',
    tagline: 'Ayurvedic & Wellness E-Commerce Platform',
    description:
      'Integrated wellness e-commerce ecosystem for authentic Ayurvedic products, cold-pressed oils, and organic formulations. Features GPS-based delivery, OTP authentication, Razorpay checkout, events hosting, and a cultural wellness storefront.',
    domain: 'E-Commerce / Wellness',
    tech: ['React 19', 'Vite', 'Tailwind CSS', 'Razorpay', 'OTP Auth', 'GPS Geolocation'],
    role: 'Frontend development — SWR cache architecture, cart/wishlist management, GPS delivery resolution, Razorpay payment integration, and multi-category storefront with dynamic filtering.',
    keyFeatures: [
      'Dual-layer sync: optimistic UI + authoritative backend',
      'GPS geolocation for delivery franchise resolution',
      'Razorpay payments with OTP-based authentication',
      'Event and workshop booking integration',
      'Product catalog with category filtering and search',
      'React Context-driven cart with localStorage persistence',
    ],
    github: '#',
    live: 'https://sahasraayu.com/',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    accent: '#8ec86e',
  },
  {
    id: 'lambasingi',
    number: '07',
    title: 'Lambasingi Tribal Products',
    tagline: "Farmers' Harvest & Tribal Heritage E-Commerce",
    description:
      "E-commerce platform for Lambasingi Coconut Farmers Producer Company, connecting 2,500+ organic farmers and 150+ tribal artisan families with nationwide consumers. Dual marketplace (Farmers' Harvest + Tribal Heritage) with Shiprocket logistics integration.",
    domain: 'E-Commerce / AgriTech',
    tech: ['React 18', 'Node.js', 'Express', 'Prisma', 'MySQL', 'Razorpay', 'Shiprocket'],
    role: 'Full-stack — dual marketplace architecture, geo-franchise order allocation, Shiprocket logistics API, Razorpay payment gateway, coupon engine, and OTP authentication system.',
    keyFeatures: [
      'Dual marketplace: Farmers\' Harvest + Tribal Heritage',
      'Auto geo-allocation to nearest regional franchise/warehouse',
      'Shiprocket logistics integration for nationwide shipping',
      'Coupon and promotional discount engine',
      'OTP authentication with WhatsApp dispatch',
      '25+ hill village farmer and artisan family network',
    ],
    github: '#',
    live: '#',
    image: 'https://images.pexels.com/photos/1459495/pexels-photo-1459495.jpeg?auto=compress&cs=tinysrgb&w=800',
    accent: '#a9c86e',
  },
  {
    id: 'intiifiix',
    number: '08',
    title: 'Intiifiix',
    tagline: 'Hyperlocal On-Demand Home Services Marketplace',
    description:
      'On-demand hyperlocal service marketplace connecting consumers with verified professionals across electrical, plumbing, cleaning, appliance repair, and beauty services. Real-time slot scheduling, partner dispatch, automatic commission splits, and payout settlement.',
    domain: 'Marketplace / Services',
    tech: ['Next.js 14', 'App Router', 'Node.js', 'MySQL', 'Redis', 'JWT', 'Razorpay'],
    role: 'Full-stack — Next.js App Router full-stack monolith, real-time slot scheduling, geolocation-based partner dispatch, booking lifecycle management, admin portal, and commission/payout engine.',
    keyFeatures: [
      'Real-time slot availability with geolocation-based dispatch',
      'End-to-end service cycle: booking → job → review → payout',
      'Online pre-payment and wallet deduction system',
      'Automatic commission splits and partner settlement',
      'Customer review and rating moderation',
      'Partner mobile app coordination (Flutter integration-ready)',
    ],
    github: '#',
    live: 'https://intiifiix.com/',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    accent: '#c86e8e',
  },
];
