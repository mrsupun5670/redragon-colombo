import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import SingleProductView from "./pages/SingleProductView";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import LoginPage from "./pages/Login.jsx";
import RegisterPage from "./pages/Register.jsx";
import ForgotPasswordPage from "./pages/ForgotPassword.jsx";
import AdminDashboard from "./pages/AdminDashboard";
import About from "./pages/About";
import Wishlist from "./pages/Wishlist";
import CategoriesPage from "./pages/Categories.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import MyAccount from "./pages/MyAccount.jsx";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AdminAuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/product/:id" element={<SingleProductView />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/admin" element={
                // <AdminProtectedRoute>
                  <AdminDashboard />
                // </AdminProtectedRoute>
              } />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/about" element={<About />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/account" element={<MyAccount />} />
            </Routes>
          </Router>
        </AdminAuthProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
