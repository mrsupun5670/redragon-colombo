# 🔧 TROUBLESHOOTING GUIDE - Redragon Shop

## ❌ DATABASE CONNECTION ERROR

### Error Message:
```
Database connection failed: Access denied for user 'u331468302_redragon_db'@'112.134.243.208'
```

### **SOLUTION:**

#### 1. **Check Remote Database IP Whitelist** ⚠️ (MOST COMMON ISSUE)

Your hosting provider (looks like Hostinger or similar) requires you to **whitelist your IP address** before connecting remotely.

**Steps:**
1. Go to your hosting control panel (cPanel/hPanel)
2. Find "Remote MySQL" or "Remote Database Access"
3. Add your current IP address: `112.134.243.208`
4. Click "Add" or "Allow"

**Important:** Your IP may change if you're on a dynamic IP. Add it again if connection fails later.

---

#### 2. **Verify Database Credentials**

Check if these match your hosting panel:
```
DB_HOST=193.203.184.9
DB_USER=u331468302_redragon_db
DB_PASS=imkv59qRI@3b
DB_NAME=u331468302_redragon_db
```

**To verify:**
1. Login to your hosting control panel
2. Go to MySQL Databases
3. Check:
   - Database name
   - Username
   - Host/Server (might be `localhost` not IP)

---

#### 3. **Test Connection with MySQL Workbench**

Before running the app, test the connection:

1. Open MySQL Workbench
2. Click "+" to add new connection
3. Enter:
   ```
   Connection Name: Redragon DB
   Hostname: 193.203.184.9
   Port: 3306
   Username: u331468302_redragon_db
   Password: imkv59qRI@3b
   ```
4. Click "Test Connection"

If this fails, the issue is with hosting settings, not your code!

---

#### 4. **Alternative: Use `localhost` for Remote Hosts**

Some hosts require using `localhost` even for remote connections:

**Update `backend/.env`:**
```env
DB_HOST=localhost
```

---

#### 5. **Check if Port 3306 is Open**

Your hosting provider might use a different port:

**Common ports:**
- 3306 (default)
- 3307
- 13306

**Update if needed:**
```env
DB_HOST=193.203.184.9:3307
```

---

## ✅ CURRENT PROJECT STATUS

### **Frontend:** ✅ Ready to run
```bash
cd frontend
npm start
```
- No database needed for design phase
- Uses static demo data
- Will work independently

### **Backend:** ⚠️ Waiting for database connection
```bash
cd backend
npm run dev
```
- Server starts successfully on port 5000
- API endpoints work (`GET /` returns message)
- Database connection optional for now

---

## 🚀 HOW TO RUN PROJECT (WITHOUT DATABASE)

### **Option 1: Frontend Only (Recommended for Design Phase)**

```bash
# Terminal 1
cd frontend
npm start
```

**Result:** Full landing page with demo products at `http://localhost:3000`

This works perfectly without any database connection!

---

### **Option 2: Full Stack (With Database Issues)**

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

**Backend will show warning** but still runs. Frontend works fine.

---

## 📋 CHECKLIST TO FIX DATABASE

- [ ] **Whitelist your IP** in hosting control panel
- [ ] **Verify credentials** match hosting panel
- [ ] **Test connection** in MySQL Workbench
- [ ] **Try `localhost`** instead of IP
- [ ] **Check port** (3306 vs others)
- [ ] **Run SQL schema** once connected

---

## 🗄️ DATABASE SETUP STEPS (Once Connected)

### Step 1: Test Connection
```sql
-- In MySQL Workbench, after connection succeeds
SHOW DATABASES;
```

### Step 2: Create Tables
```sql
-- Use your database
USE u331468302_redragon_db;

-- Run the schema file
-- File location: frontend/public/redragon_database_schema.sql
-- Copy entire content and execute in Workbench
```

### Step 3: Verify Tables
```sql
SHOW TABLES;
-- Should show 21 tables
```

### Step 4: Test Backend Again
```bash
cd backend
npm run dev
```

Should now show: `Connected to MySQL database successfully`

---

## 🔐 GITIGNORE SETUP

### ✅ What's Protected (Won't be uploaded to GitHub):

- ✅ `.env` files (all locations)
- ✅ `node_modules/` folders
- ✅ `build/` folders
- ✅ Log files
- ✅ OS-specific files (.DS_Store, Thumbs.db)
- ✅ IDE files (.vscode, .idea)
- ✅ SQL backup files

### ✅ What's Included (Will be uploaded):

- ✅ Source code (`src/` folders)
- ✅ `package.json` files
- ✅ Documentation (README.md, etc.)
- ✅ Configuration files (tailwind.config.js, etc.)
- ✅ Your logo (after you add it)

---

## 📤 GITHUB UPLOAD CHECKLIST

Before pushing to GitHub:

1. **Verify .gitignore exists**
   ```bash
   # Should exist at project root
   ls -la .gitignore
   ```

2. **Check what will be uploaded**
   ```bash
   git status
   ```
   Should NOT show:
   - `.env` files
   - `node_modules/` folders

3. **Initialize Git (if not done)**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Redragon Shop project structure"
   ```

4. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/yourusername/redragon-shop.git
   git branch -M main
   git push -u origin main
   ```

---

## 🆘 COMMON ERRORS & FIXES

### Error: "Port 3000 already in use"
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Or use different port
set PORT=3001 && npm start
```

### Error: "Module not found"
```bash
cd frontend  # or backend
rm -rf node_modules
npm install
```

### Error: "npm: command not found"
- Install Node.js from https://nodejs.org/

### Frontend not loading Tailwind styles
```bash
cd frontend
npm install -D tailwindcss postcss autoprefixer @tailwindcss/postcss
npm start
```

---

## 📞 NEED HELP?

### Check These Files:
1. `PROJECT_STRUCTURE.md` - Complete project structure
2. `SETUP_GUIDE.md` - How to run the project
3. `IMAGE_GUIDE.md` - Image management
4. `README.md` - Project overview

### Database Issues:
- Contact your hosting provider support
- Provide error message
- Ask about "Remote MySQL access" or "IP whitelisting"

---

## ✨ QUICK TEST

### Test Frontend (No Database Needed):
```bash
cd frontend && npm start
```
✅ Should work immediately!

### Test Backend API (No Database Needed):
```bash
cd backend && npm run dev
```
Then visit: `http://localhost:5000/`
✅ Should return: `{"message":"Welcome to Redragon Shop API"}`

### Test Database:
Will work after IP whitelist setup!

---

**Remember:** The frontend works perfectly without the database for now. Focus on design first, fix database connection later! 🎨
