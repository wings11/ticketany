# 🚀 Deployment Guide - Event Ticketing System

## Prerequisites for Deployment

### ✅ **Completed Setup**
- [x] Frontend: Next.js with shadcn/ui and modern design
- [x] Backend: Node.js/Express with MongoDB integration  
- [x] Authentication: Google OAuth configured
- [x] Environment variables: Properly configured for deployment

## 📦 **Frontend Deployment to Vercel**

### **Step 1: Install Vercel CLI** *(Optional)*
```bash
npm install -g vercel
```

### **Step 2: Deploy via Vercel Dashboard** *(Recommended)*

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**
2. **Click "Import Project"**
3. **Connect your Git repository** (GitHub/GitLab/Bitbucket)
4. **Configure the project:**
   - Framework Preset: `Next.js`
   - Root Directory: `./Frontend` (if in subdirectory)
   - Build Command: `npm run build`
   - Output Directory: `.next`

### **Step 3: Environment Variables**

In Vercel Dashboard, add these environment variables:

```env
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
```

**Important:** Replace `your-backend-domain.com` with your actual backend deployment URL.

### **Step 4: Deploy via CLI** *(Alternative)*

```bash
# In the Frontend directory
cd C:\Users\Lenovo\Desktop\Test\Frontend

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No
# - Project name: event-ticketing-frontend
# - Directory: ./
# - Override settings? No

# For production deployment
vercel --prod
```

## 🖥️ **Backend Deployment Options**

### **Option 1: Railway** *(Recommended)*

1. **Go to [Railway](https://railway.app)**
2. **Connect GitHub repository**
3. **Select the backend directory**
4. **Add environment variables:**
   ```env
   MONGODB_URI=your_mongodb_connection_string
   SESSION_SECRET=your_session_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   FRONTEND_URL=https://your-vercel-app.vercel.app
   PORT=5000
   ```

### **Option 2: Heroku**

```bash
# Install Heroku CLI and login
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set MONGODB_URI=your_connection_string
heroku config:set SESSION_SECRET=your_secret
heroku config:set GOOGLE_CLIENT_ID=your_client_id
heroku config:set GOOGLE_CLIENT_SECRET=your_client_secret
heroku config:set FRONTEND_URL=https://your-vercel-app.vercel.app

# Deploy
git push heroku main
```

### **Option 3: DigitalOcean App Platform**

1. **Connect your GitHub repository**
2. **Configure the app:**
   - Name: `event-ticketing-backend`
   - Region: Choose closest to your users
   - Branch: `main`
   - Source Directory: `/Backend` (if in subdirectory)

## 🔗 **Post-Deployment Configuration**

### **1. Update Frontend Environment**

After backend deployment, update Vercel environment variable:
```env
NEXT_PUBLIC_API_URL=https://your-backend-app.herokuapp.com
```

### **2. Update Google OAuth Settings**

In [Google Cloud Console](https://console.cloud.google.com):

1. **Go to Credentials > OAuth 2.0 Client IDs**
2. **Add authorized redirect URIs:**
   ```
   https://your-backend-app.herokuapp.com/auth/google/callback
   ```
3. **Add authorized origins:**
   ```
   https://your-vercel-app.vercel.app
   https://your-backend-app.herokuapp.com
   ```

### **3. Database Configuration**

Ensure MongoDB Atlas is configured:
1. **Whitelist deployment server IPs** (or use 0.0.0.0/0 for all)
2. **Update connection string** in backend environment variables
3. **Test database connection** after deployment

## 🧪 **Testing Deployment**

### **Frontend Tests**
```bash
# Build test (should pass)
npm run build

# Type checking
npm run type-check

# Linting
npm run lint
```

### **Deployment Checklist**

- [ ] Frontend builds successfully locally
- [ ] Backend environment variables configured
- [ ] MongoDB connection string updated
- [ ] Google OAuth redirect URIs updated
- [ ] Frontend API URL points to deployed backend
- [ ] CORS configured for frontend domain
- [ ] SSL certificates active (automatic with Vercel/Railway)

## 🎯 **Expected Results**

After successful deployment:

✅ **Frontend:** `https://your-app.vercel.app`
- Modern event ticketing interface
- Google OAuth login working
- All pages accessible and functional

✅ **Backend:** `https://your-backend.railway.app`
- API endpoints responding
- Database operations working
- Authentication flow complete

## 🔧 **Troubleshooting**

### **Common Issues:**

1. **CORS Errors:** Update backend CORS configuration
2. **Auth Failures:** Check Google OAuth settings
3. **API Errors:** Verify environment variables
4. **Build Failures:** Check TypeScript/ESLint errors

### **Quick Fixes:**

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check environment variables
echo $NEXT_PUBLIC_API_URL
```

## 📊 **Performance Optimization**

- ✅ Static generation for public pages
- ✅ Image optimization with Next.js
- ✅ Font optimization with Google Fonts
- ✅ Code splitting and lazy loading
- ✅ CSS optimization with Tailwind

---

**Current Status:** Ready for deployment! 🚀
**Estimated Deploy Time:** 5-10 minutes
**Domains:** Will be provided after deployment
