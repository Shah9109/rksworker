# WorkPower (भारत का #1 औद्योगिक मैनपावर प्लेटफ़ॉर्म)

> India's premier industrial manpower & workforce management platform connecting verified workers with heavy engineering, power, steel, manufacturing, and construction enterprises.

---

## 🏗 Key Features

- **👷 Worker Portal**:
  - Multi-language support (Hindi & English).
  - Digital Work ID card with verification badges.
  - Skill profile management & document verification.
  - Direct job discovery & single-click applications.
- **🏢 Company / Employer Portal**:
  - Dedicated responsive management portal.
  - Left navigation sidebar on desktop (`w-64`) and compact icon rail on mobile.
  - Rapid job creation with industrial trades (6G Welder, Structural Fitter, Riggers, Electricians).
  - Real-time applicant pipeline tracking.
- **🛡 Super Admin Panel**:
  - Verification workflow for worker Aadhaar & trade credentials.
  - Trade & industry categories management.
  - Community feed & industrial announcement broadcast.
- **📱 Mobile App & PWA**:
  - Direct Android APK installation package.
  - Mobile viewport lock against unwanted zoom.
  - Floating WhatsApp & Instagram support channels.

---

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons, Zustand
- **Backend**: Node.js, Express, TypeScript, MongoDB (Mongoose), JWT, Multer
- **Typography**: Google Fonts (Outfit, Anek Devanagari, Plus Jakarta Sans)
- **Deployment & Containers**: Docker, Nginx

---

## 🚀 Quick Start

### 1. Prerequisites
- Node.js (v18+)
- MongoDB running locally or MongoDB Atlas URI

### 2. Backend Setup
```bash
cd server
cp .env.example .env # Configure your PORT, MONGO_URI, and JWT_SECRET
npm install
npm run dev
```

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev
```

The frontend will run on `http://localhost:5174/` and communicate with the backend API at `http://localhost:5050/api`.

---

## 📄 License & Attribution
Developed with precision by [CatCatchCode](https://www.catcatchcodes.in/).
