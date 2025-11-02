import React, { Suspense, lazy } from "react";
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

// Lazy load components
const Home = lazy(() => import("./pages/Home"));
const Products = lazy(() => import("./pages/Products"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const SingleProductView = lazy(() => import("./pages/SingleProductView"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const LoginPage = lazy(() => import("./pages/Login.jsx"));
const RegisterPage = lazy(() => import("./pages/Register.jsx"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPassword.jsx"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const About = lazy(() => import("./pages/About"));
const Blog = lazy(() => import("./pages/Blog"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const CategoriesPage = lazy(() => import("./pages/Categories.jsx"));
const AdminLogin = lazy(() => import("./pages/AdminLogin.jsx"));
const MyAccount = lazy(() => import("./pages/MyAccount.jsx"));
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess.jsx"));
const PaymentCancel = lazy(() => import("./pages/PaymentCancel.jsx"));

// Error Pages
const NotFound404 = lazy(() => import("./pages/NotFound404.jsx"));
const Forbidden403 = lazy(() => import("./pages/Forbidden403.jsx"));
const ServerError500 = lazy(() => import("./pages/ServerError500.jsx"));
const ErrorPage = lazy(() => import("./pages/ErrorPage.jsx"));

// Policy Pages
const RefundPolicy = lazy(() => import("./pages/RefundPolicy.jsx"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.jsx"));
const TermsConditions = lazy(() => import("./pages/TermsConditions.jsx"));

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen bg-gray-900 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
      <p className="text-white font-semibold">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <CartSyncHandler />
        <AdminAuthProvider>
          <Router>
            <Suspense fallback={<LoadingSpinner />}>
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
              <Route path="/blog" element={
                <AdminRouteGuard>
                  <Blog />
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
            </Suspense>
          </Router>
        </AdminAuthProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
