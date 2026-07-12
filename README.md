# AI Model Inventory Client

A modern, responsive React-based web application for managing and exploring AI models. Features Firebase authentication, real-time model browsing, dark/light theme switching, and an intuitive user interface with WebGL animations.
-[AI Model Inventory Server](https://github.com/moinul5/ai-model-inventory-server)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Available Routes](#available-routes)
- [Components Guide](#components-guide)
- [Authentication Flow](#authentication-flow)
- [Styling Architecture](#styling-architecture)
- [Getting Started](#getting-started)

---

## 🎯 Overview

**NeuralStack** is a full-featured AI model inventory platform designed for developers, researchers, and AI teams to:
- Browse and discover AI models
- Manage personal model uploads
- Purchase/subscribe to AI models
- Explore model specifications and details
- Collaborate on AI model management

---

## ✨ Features

### 🔐 **Authentication**
- Email/Password registration with validation
  - At least 1 uppercase letter
  - At least 1 lowercase letter
  - Minimum 6 characters
- Google OAuth sign-in
- Persistent user sessions
- Remember me functionality
- User profile management

### 🤖 **Model Management**
- Browse all AI models with search functionality
- Filter models by AI framework (TensorFlow, PyTorch, etc.)
- Case-insensitive search by model name
- View detailed model information
- Add new AI model listings (authenticated users)
- Purchase/subscribe to models
- Track purchase history

### 🎨 **UI/UX Features**
- Dark/Light theme toggle with persistent preference
- Animated WebGL orb background on home page
- Responsive design (mobile-first)
- Toast notifications for user feedback
- Loading states with custom spinner
- Smooth transitions and hover animations
- Backdrop blur effects for modern glass-morphism

### 📱 **Navigation**
- Fixed top navigation bar with logo
- User profile dropdown menu
- Breadcrumb/route-based navigation
- Quick access links
- Responsive mobile menu

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| **Frontend Framework** | React 19.2.6 |
| **Build Tool** | Vite 8.0.12 |
| **Routing** | React Router DOM 7.15.1 |
| **Styling** | Tailwind CSS 4.3.0, Styled Components 6.4.2 |
| **Authentication** | Firebase 12.13.0 |
| **HTTP Client** | Axios 1.16.1 |
| **Animations** | OGL (WebGL) 1.0.11 |
| **Notifications** | React Toastify 11.1.0 |
| **Linting** | ESLint 10.3.0 |
| **Dev Server** | Vite with HMR |

---

## 📁 Project Structure

```
ai-model-inventory-client/
├── src/
│   ├── main.jsx                    # Entry point with routing
│   ├── index.css                   # Tailwind CSS import
│   ├── firebase.config.js          # Firebase configuration
│   │
│   ├── layout/
│   │   └── Root.jsx                # Master layout (Navbar + Routes + Footer)
│   │
│   ├── Pages/
│   │   ├── Home.jsx                # Hero + Featured models
│   │   ├── AllModels.jsx           # Model listing with filters
│   │   ├── AddModel.jsx            # Create new model form
│   │   ├── ModelDetails.jsx        # Individual model details
│   │   ├── Login.jsx               # Email/Password + Google login
│   │   ├── Registration.jsx        # User registration form
│   │   ├── Purchase.jsx            # Model subscription page
│   │   └── MyModels.jsx            # User's uploaded models
│   │
│   ├── Components/
│   │   ├── Navbar.jsx              # Top navigation
│   │   ├── Footer.jsx              # Footer section
│   │   ├── PrivateRoute.jsx        # Route protection wrapper
│   │   ├── Loader.jsx              # Loading spinner
│   │   ├── orb.jsx                 # WebGL animated orb
│   │   └── ThemeToggle/
│   │       ├── ThemeToggle.jsx     # Dark/Light toggle
│   │       └── ThemeToggle.css     # Toggle animations
│   │
│   ├── Context/
│   │   ├── AuthContext.jsx         # Auth context definition
│   │   ├── AuthProvider.jsx        # Auth provider with methods
│   │   └── ThemeContext.jsx        # Theme management context
│   │
│   ├── assets/                     # Images, icons, etc.
│   │
│   ├── package.json                # Dependencies
│   ├── vite.config.js              # Vite configuration
│   ├── eslint.config.js            # ESLint rules
│   ├── index.html                  # HTML template
│   └── README.md                   # This file
```

---

## 🚀 Installation

### 1. **Clone the Repository**
```bash
git clone <repository-url>
cd ai-model-inventory-client
```

### 2. **Install Dependencies**
```bash
npm install
```

### 3. **Set Up Environment Variables**
Create a `.env.local` file in the root directory:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_API_URL=http://localhost:5000
```

### 4. **Start Development Server**
```bash
npm run dev
```

The application will open at `http://localhost:5173`

---

## 🔐 Environment Setup

### Firebase Configuration

1. **Create a Firebase Project**
   - Visit [Firebase Console](https://console.firebase.google.com)
   - Create a new project
   - Enable Authentication (Email/Password + Google)

2. **Get Credentials**
   - Go to Project Settings
   - Copy your Web App configuration
   - Add to `.env.local`

3. **Enable Authentication Methods**
   - Email/Password authentication
   - Google OAuth (add your app to consent screen)

### Backend URL

Set `VITE_API_URL` to match your backend server:
- Development: `http://localhost:5000`
- Production: `https://api.yourdomain.com`

---

## 🗺️ Available Routes

| Route | Component | Auth Required | Purpose |
|-------|-----------|---------------|---------|
| `/` | Home | ❌ No | Hero section + Featured models |
| `/all-models` | AllModels | ❌ No | Browse all AI models with filters |
| `/model/:id` | ModelDetails | ✅ Yes | View detailed model information |
| `/add-model` | AddModel | ✅ Yes | Create and publish new model |
| `/my-models` | MyModels | ✅ Yes | Manage your uploaded models |
| `/purchase` | Purchase | ✅ Yes | View purchased models |
| `/login` | Login | ❌ No | Sign in to account |
| `/register` | Registration | ❌ No | Create new account |

---

## 🧩 Components Guide

### **Layout Components**

#### Root.jsx
Master layout component wrapping all pages with:
- Fixed Navbar at top
- Page routes in center
- Sticky Footer at bottom
- Theme provider wrapper

### **Page Components**

#### Home.jsx
- **Features:** Hero section, WebGL animated orb, featured models carousel
- **Data:** Fetches featured models from backend
- **State:** Uses AuthContext and ThemeContext

#### AllModels.jsx
- **Features:** Model listing, search, framework filtering
- **Query Parameters:**
  - `search` - Filter by model name
  - `framework` - Filter by AI framework
- **Auth:** Public access

#### AddModel.jsx
- **Features:** Form to create new AI model
- **Required Fields:** Name, Framework, Description
- **Auth:** Private (requires login)
- **Validation:** Framework selection, description length

#### Login.jsx
- **Features:** Email/Password login + Google OAuth
- **Form Handling:** Firebase authentication
- **Validation:** Email format, password requirements
- **Auth:** Public (but redirects if already logged in)

#### Registration.jsx
- **Features:** User registration with password validation
- **Password Requirements:**
  - At least 6 characters
  - One uppercase letter
  - One lowercase letter
  - Real-time validation indicator
- **Auth:** Public

### **UI Components**

#### Navbar.jsx
```jsx
// Features:
- Logo and branding
- Navigation links
- Theme toggle button
- User profile dropdown (when authenticated)
- Sign out option
- Responsive mobile menu
```

#### PrivateRoute.jsx
```jsx
// Protects authenticated routes
- Checks user authentication status
- Shows loader while checking
- Redirects to /login if not authenticated
- Returns component if authenticated
```

#### ThemeToggle.jsx
```jsx
// Dark/Light mode switcher
- Animated toggle switch
- Sun/Moon icons
- Persists theme preference
- Smooth transitions
```

#### Loader.jsx
```jsx
// Loading spinner component
- Gradient background
- Centered spinner animation
- Used during auth transitions
- Styled with styled-components
```

#### orb.jsx
```jsx
// WebGL animated background
- Uses OGL library
- Shader-based animations
- Responsive to canvas size
- Used on Home page
```

---

## 🔄 Authentication Flow

```
┌─────────────────────────────────────────┐
│         User Visits Application         │
└────────────┬────────────────────────────┘
             │
             ▼
    ┌─────────────────┐
    │ PrivateRoute?   │
    └────┬────────┬───┘
         │        │
        No       Yes
         │        │
         ▼        ▼
    Public    ┌──────────────┐
    Page      │ User logged? │
             └────┬─────┬───┘
                 No     Yes
                 │      │
                 ▼      ▼
              Login  Show Page
               Page


Authentication Methods:

1. EMAIL/PASSWORD:
   Register → Firebase → Update Profile → Redirect Home

2. GOOGLE OAUTH:
   Click Google → Popup → Firebase → Auto-redirect Home

3. SIGN OUT:
   Click Logout → Firebase SignOut → Redirect Login
```

**Key Auth Methods (from AuthProvider):**
- `createUser(email, password)` - Register new user
- `signInWithGoogle()` - OAuth sign in
- `signOut()` - Logout user
- `user` - Current user object
- `loading` - Auth transition state

---

## 🎨 Styling Architecture

### **Multi-Layer Approach**

#### 1. **Tailwind CSS** (Primary)
```jsx
// Utility-first framework
<div className="bg-black text-white md:flex lg:grid">
  {/* Dark theme + Responsive */}
</div>
```

**Features:**
- Predefined color palette
- Dark mode support with conditional classes
- Responsive breakpoints (sm, md, lg, xl)
- Backdrop blur, opacity, transitions
- Animation utilities

#### 2. **Styled Components** (Complex Components)
```jsx
// CSS-in-JS for scoped styles
const StyledWrapper = styled.div`
  background: ${({ $darkMode }) => $darkMode ? "#000000" : "#f4f4f5"};
  transition: background-color 0.3s ease;
`;
```

**Used in:**
- Login & Registration forms
- Modal dialogs
- Complex interactive components

#### 3. **Custom CSS** (Specialized)
```css
/* Animations and complex selectors */
@keyframes toggleAnimation {
  0% { transform: translateX(0); }
  100% { transform: translateX(20px); }
}
```

**Used in:**
- ThemeToggle animations
- Keyframe animations
- Media queries

### **Theme System**

**Dark Mode:**
- Background: `#000000` (black)
- Text: `#ffffff` (white)
- Accent: `#06b6d4` (cyan)
- Border: `rgba(255,255,255,0.08)`

**Light Mode:**
- Background: `#f4f4f5` (light gray)
- Text: `#111827` (dark)
- Accent: `#2563eb` (blue)
- Border: `rgba(0,0,0,0.08)`

**Implementation:**
```jsx
const { darkMode } = useTheme();

return (
  <div className={`${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
    {/* Conditional styling */}
  </div>
);
```

---

## 🚀 Getting Started

### **Quick Start Commands**

```bash
# Install dependencies
npm install

# Start development server (Hot Module Replacement enabled)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

### **Development Workflow**

1. **Start Server:**
   ```bash
   npm run dev
   ```

2. **Make Changes:**
   - Edit files in `src/`
   - Auto-refresh with HMR

3. **Build for Production:**
   ```bash
   npm run build
   ```

4. **Deploy:**
   - Run `npm run build`
   - Deploy `dist/` folder to hosting (Netlify, Vercel, etc.)

---

## 📝 Environment Variables Template

**`.env.local` Example:**
```
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyDoxcLetMRiBhnjJyZa1F0Np_QfRw
VITE_FIREBASE_AUTH_DOMAIN=ai-inventory.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=ai-inventory
VITE_FIREBASE_STORAGE_BUCKET=ai-inventory.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123def456

# API Configuration
VITE_API_URL=http://localhost:5000
```

---

## 🔑 Key Features Implementation

### **Search & Filter (AllModels)**
```javascript
// Query parameters
GET /models?framework=tensorflow&search=resnet

// Component uses:
- framework: string (optional)
- search: string (optional)
- Combines both filters on backend
```

### **Authentication**
```javascript
// FirebaseAuth handles:
- Email verification
- Password hashing
- Session management
- ID token generation
```

### **Theme Persistence**
```javascript
// ThemeContext stores preference in:
- localStorage for persistence
- Context API for global state
- Conditional CSS classes based on darkMode boolean
```

---

## 📱 Responsive Design

**Breakpoints:**
- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

**Key Responsive Features:**
- Mobile-first CSS approach
- Hamburger menu on mobile
- Grid layouts adapt to screen size
- Touch-friendly button sizes
- Optimized images for different resolutions

---

## 🔗 Backend Integration

**Connected Endpoints:**
- `GET /models` - Fetch all models with filters
- `GET /model/:id` - Fetch single model
- `POST /add-model` - Create new model
- `PUT /model/:id` - Update model
- `DELETE /model/:id` - Delete model
- `POST /purchase/:id` - Track purchase
- `GET /my-models` - Fetch user's models

**Authentication Header:**
```javascript
headers: {
  "Authorization": `Bearer ${firebaseToken}`
}
```

---

## ⚠️ Notes & Troubleshooting

### **Common Issues**

**1. Firebase Authentication Error**
- Verify Firebase credentials in `.env.local`
- Check Firebase console authentication methods are enabled
- Ensure Google OAuth redirect URI is configured

**2. API Connection Error**
- Confirm backend server is running
- Check `VITE_API_URL` matches backend URL
- Verify CORS is enabled on backend

**3. Theme Not Persisting**
- Check browser localStorage is enabled
- Clear browser cache and reload
- Verify ThemeProvider wraps application

**4. Private Routes Not Working**
- Ensure PrivateRoute component receives Firebase token
- Check user state in AuthContext
- Verify Firebase onAuthStateChanged listener is active

---

## 📚 File Reference

### **Main Files**

- **main.jsx** - Application entry with routes
- **firebase.config.js** - Firebase initialization
- **vite.config.js** - Vite bundler configuration
- **eslint.config.js** - Linting rules

### **Key Pages**

- **Home.jsx** - Landing page (hero + models)
- **Login.jsx** - Authentication
- **Registration.jsx** - New user signup
- **AllModels.jsx** - Model catalog

---

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Commit with clear messages
5. Push to repository
6. Create pull request

---

## 📞 Support & Contact

For issues, questions, or contributions, please:
- Create an issue in the repository
- Contact the development team
- Check documentation first

---

**Version:** 1.0.0  
**Last Updated:** May 27, 2024  
**Status:** Active Development
