import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";
import AdminGuestRoute from "./components/admin/AdminGuestRoute";
import AdminRouteGuard from "./components/admin/AdminRouteGuard";
import CustomerProtectedRoute from "./components/common/CustomerProtectedRoute";
import GuestRoute from "./components/common/GuestRoute";
import PaymentRoute from "./components/common/PaymentRoute";
import ForgotPasswordRoute from "./components/common/ForgotPasswordRoute";
import CartSyncHandler from "./components/common/CartSyncHandler";

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
import PaymentSuccess from "./pages/PaymentSuccess.jsx";
import PaymentCancel from "./pages/PaymentCancel.jsx";

// Error Pages
import NotFound404 from "./pages/NotFound404.jsx";
import Forbidden403 from "./pages/Forbidden403.jsx";
import ServerError500 from "./pages/ServerError500.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

// Policy Pages
import RefundPolicy from "./pages/RefundPolicy.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import TermsConditions from "./pages/TermsConditions.jsx";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <CartSyncHandler />
        <AdminAuthProvider>
          <Router>
            <Routes>
              {/* Main Pages - Protected from admin access */}
              <Route path="/" element={
                <AdminRouteGuard>
                  <Home />
                </AdminRouteGuard>
              } />
              <Route path="/products" element={
                <AdminRouteGuard>
                  <Products />
                </AdminRouteGuard>
              } />
              <Route path="/products/:id" element={
                <AdminRouteGuard>
                  <ProductDetail />
                </AdminRouteGuard>
              } />
              <Route path="/product/:id" element={
                <AdminRouteGuard>
                  <SingleProductView />
                </AdminRouteGuard>
              } />
              <Route path="/cart" element={
                <AdminRouteGuard>
                  <Cart />
                </AdminRouteGuard>
              } />
              <Route path="/checkout" element={
                <AdminRouteGuard>
                  <CustomerProtectedRoute>
                    <Checkout />
                  </CustomerProtectedRoute>
                </AdminRouteGuard>
              } />
              <Route path="/payment/success" element={
                <PaymentRoute>
                  <PaymentSuccess />
                </PaymentRoute>
              } />
              <Route path="/payment/cancel" element={
                <PaymentRoute>
                  <PaymentCancel />
                </PaymentRoute>
              } />
              <Route path="/login" element={
                <GuestRoute>
                  <LoginPage />
                </GuestRoute>
              } />
              <Route path="/register" element={
                <GuestRoute>
                  <RegisterPage />
                </GuestRoute>
              } />
              <Route path="/forgot-password" element={
                <ForgotPasswordRoute>
                  <ForgotPasswordPage />
                </ForgotPasswordRoute>
              } />
              <Route path="/admin" element={
                <AdminProtectedRoute>
                  <AdminDashboard />
                </AdminProtectedRoute>
              } />
              <Route path="/admin/login" element={
                <AdminGuestRoute>
                  <AdminLogin />
                </AdminGuestRoute>
              } />
              <Route path="/about" element={
                <AdminRouteGuard>
                  <About />
                </AdminRouteGuard>
              } />
              <Route path="/wishlist" element={
                <AdminRouteGuard>
                  <Wishlist />
                </AdminRouteGuard>
              } />
              <Route path="/categories" element={
                <AdminRouteGuard>
                  <CategoriesPage />
                </AdminRouteGuard>
              } />
              <Route path="/account" element={
                <AdminRouteGuard>
                  <CustomerProtectedRoute>
                    <MyAccount />
                  </CustomerProtectedRoute>
                </AdminRouteGuard>
              } />

              {/* Policy Pages - Protected from admin access */}
              <Route path="/refund-policy" element={
                <AdminRouteGuard>
                  <RefundPolicy />
                </AdminRouteGuard>
              } />
              <Route path="/privacy-policy" element={
                <AdminRouteGuard>
                  <PrivacyPolicy />
                </AdminRouteGuard>
              } />
              <Route path="/terms-conditions" element={
                <AdminRouteGuard>
                  <TermsConditions />
                </AdminRouteGuard>
              } />

              {/* Error Pages */}
              <Route path="/error" element={<ErrorPage />} />
              <Route path="/404" element={<NotFound404 />} />
              <Route path="/403" element={<Forbidden403 />} />
              <Route path="/500" element={<ServerError500 />} />

              {/* Catch-all 404 route */}
              <Route path="*" element={<NotFound404 />} />
            </Routes>
          </Router>
        </AdminAuthProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
