# Redragon Shop - E-commerce Platform

A full-stack e-commerce platform for Redragon gaming products built with React, Express, MySQL, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MySQL Server
- npm or yarn

### 1. Initialize Database
```bash
mysql -u root -p < database/init.sql
# Password: Shks5670
```

### 2. Start Backend Server
```bash
cd backend
npm run dev
```
Backend will run on: `http://localhost:5000`

### 3. Start Frontend (New Terminal)
```bash
cd frontend
npm start
```
Frontend will run on: `http://localhost:3000`

## 📁 Project Structure

```
redragon-colombo/
├── backend/              # Express API server
│   ├── config/          # Database configuration
│   ├── routes/          # API routes
│   ├── controllers/     # Business logic
│   ├── models/          # Database models
│   └── server.js        # Entry point
│
├── frontend/            # React application
│   ├── public/
│   │   └── images/      # Static images
│   │       ├── logo/    # Website logo
│   │       ├── products/# Product images
│   │       ├── banners/ # Promotional banners
│   │       └── icons/   # UI icons
│   └── src/
│       ├── components/  # Reusable components
│       ├── pages/       # Page components
│       └── services/    # API calls
│
├── database/            # SQL schemas
└── .env                 # Environment variables
```

## 🖼️ Adding Your Logo

1. Save your logo as: `frontend/public/images/logo/redragon-logo.png`
2. Use in React components:
```jsx
<img src="/images/logo/redragon-logo.png" alt="Redragon" />
```

See `IMAGE_GUIDE.md` for complete image management guide.

## 🔧 Environment Variables

### Root `.env`
```env
DB_HOST=localhost
DB_USER=root
DB_PASS=Shks5670
DB_NAME=redragon_db
PORT=5000

# Cloudinary (for product images)
CLOUDINARY_NAME=dssvyekbr
CLOUDINARY_API_KEY=548924198751166
CLOUDINARY_API_SECRET=AQOvYiNNO1z1ApE2TTV97CHC08c
```

### Frontend `.env`
```env
REACT_APP_API_URL=http://localhost:5000
```

## 📦 Tech Stack

### Backend
- **Express.js** - Web framework
- **MySQL2** - Database driver
- **CORS** - Cross-origin requests
- **dotenv** - Environment variables
- **nodemon** - Development auto-reload

### Frontend
- **React** - UI framework
- **Tailwind CSS** - Styling
- **Fetch API** - HTTP requests

### Database
- **MySQL** - Relational database

### Cloud Services
- **Cloudinary** - Image hosting & optimization

## 🎯 Features to Implement

- [ ] Product listing page
- [ ] Product detail page
- [ ] Shopping cart
- [ ] User authentication
- [ ] Admin dashboard
- [ ] Cloudinary image uploads
- [ ] Order management
- [ ] Payment integration

## 📝 API Endpoints (Planned)

```
GET    /api/products          # Get all products
GET    /api/products/:id      # Get single product
POST   /api/products          # Create product (admin)
PUT    /api/products/:id      # Update product (admin)
DELETE /api/products/:id      # Delete product (admin)
POST   /api/upload            # Upload image to Cloudinary
```

## 🐛 Troubleshooting

### Backend won't start
- Check if MySQL is running
- Verify database credentials in `.env`
- Ensure port 5000 is available

### Frontend won't start
- Check if port 3000 is available
- Run `npm install` in frontend folder
- Verify `REACT_APP_API_URL` in frontend `.env`

### Database connection failed
- Update `DB_PASS` in root `.env` with your MySQL password
- Run `database/init.sql` to create tables

## 📧 Contact

For questions or issues, check the IMAGE_GUIDE.md for image management help.
