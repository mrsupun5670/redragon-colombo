import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CreditCard, Wallet, Building2, Check, ShoppingBag,
  MapPin, Phone, Mail, User, Home, ArrowLeft, Lock
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import WhatsAppButton from "../components/common/WhatsAppButton";
import ParticleEffect from "../components/common/ParticleEffect";
import { cartSampleProducts } from "../data/products";

const Checkout = () => {
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("card");

  // Form data
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Sri Lanka",
  });

  const [billingInfo, setBillingInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  // Calculate totals
  const subtotal = cartSampleProducts.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 500; // Fixed shipping cost
  const tax = Math.round(subtotal * 0.05); // 5% tax
  const total = subtotal + shipping + tax;

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setStep(3);
  };

  const handleFinalSubmit = () => {
    alert("Order placed successfully! Thank you for your purchase.");
    // Here you would typically send the order to your backend
  };

  const paymentMethods = [
    { id: "card", name: "Credit/Debit Card", icon: CreditCard },
    { id: "bank", name: "Bank Transfer", icon: Building2 },
    { id: "cash", name: "Cash on Delivery", icon: Wallet },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100">
      <ParticleEffect />
      <Navbar />

      {/* Page Header */}
      <div className="relative bg-gradient-to-r from-red-500 to-orange-500 pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Lock className="w-6 h-6 text-white" />
              <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight">
                Secure Checkout
              </h1>
            </div>
            <p className="text-xl text-white/90 font-semibold">
              Complete your purchase securely
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            {["Shipping", "Payment", "Review"].map((stepName, index) => (
              <div key={stepName} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-black ${
                      step > index + 1
                        ? "bg-green-500 text-white"
                        : step === index + 1
                        ? "bg-red-500 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {step > index + 1 ? <Check className="w-6 h-6" /> : index + 1}
                  </div>
                  <span className="mt-2 text-sm font-bold text-gray-700">
                    {stepName}
                  </span>
                </div>
                {index < 2 && (
                  <div
                    className={`h-1 w-24 mx-4 ${
                      step > index + 1 ? "bg-green-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping Information */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="w-6 h-6 text-red-500" />
                  <h2 className="text-2xl font-black text-gray-900 uppercase">
                    Shipping Information
                  </h2>
                </div>

                <form onSubmit={handleShippingSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.firstName}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, firstName: e.target.value })
                        }
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.lastName}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, lastName: e.target.value })
                        }
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={shippingInfo.email}
                      onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, email: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={shippingInfo.phone}
                      onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, phone: e.target.value })
                      }
                      placeholder="+94 77 123 4567"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.address}
                      onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, address: e.target.value })
                      }
                      placeholder="Street address, P.O. box"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.city}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, city: e.target.value })
                        }
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Postal Code *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.postalCode}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, postalCode: e.target.value })
                        }
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white py-4 rounded-xl font-black uppercase shadow-lg transition-all"
                  >
                    Continue to Payment
                  </button>
                </form>
              </motion.div>
            )}

            {/* Step 2: Payment Method */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Billing Address */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Home className="w-6 h-6 text-red-500" />
                    <h2 className="text-2xl font-black text-gray-900 uppercase">
                      Billing Address
                    </h2>
                  </div>

                  <label className="flex items-center cursor-pointer mb-4">
                    <input
                      type="checkbox"
                      checked={sameAsShipping}
                      onChange={(e) => setSameAsShipping(e.target.checked)}
                      className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                    />
                    <span className="ml-2 font-bold text-gray-700">
                      Same as shipping address
                    </span>
                  </label>

                  {!sameAsShipping && (
                    <div className="space-y-4 mt-4">
                      <input
                        type="text"
                        placeholder="Address"
                        value={billingInfo.address}
                        onChange={(e) =>
                          setBillingInfo({ ...billingInfo, address: e.target.value })
                        }
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="City"
                          value={billingInfo.city}
                          onChange={(e) =>
                            setBillingInfo({ ...billingInfo, city: e.target.value })
                          }
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Postal Code"
                          value={billingInfo.postalCode}
                          onChange={(e) =>
                            setBillingInfo({ ...billingInfo, postalCode: e.target.value })
                          }
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Payment Method Selection */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <CreditCard className="w-6 h-6 text-red-500" />
                    <h2 className="text-2xl font-black text-gray-900 uppercase">
                      Payment Method
                    </h2>
                  </div>

                  <div className="space-y-3 mb-6">
                    {paymentMethods.map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          paymentMethod === method.id
                            ? "border-red-500 bg-red-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={paymentMethod === method.id}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-4 h-4 text-red-500"
                        />
                        <method.icon className="w-6 h-6 text-gray-700" />
                        <span className="font-bold text-gray-900">{method.name}</span>
                      </label>
                    ))}
                  </div>

                  {/* Card Details (if card payment selected) */}
                  {paymentMethod === "card" && (
                    <form onSubmit={handlePaymentSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Card Number *
                        </label>
                        <input
                          type="text"
                          required
                          value={cardInfo.cardNumber}
                          onChange={(e) =>
                            setCardInfo({ ...cardInfo, cardNumber: e.target.value })
                          }
                          placeholder="1234 5678 9012 3456"
                          maxLength="19"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                          Cardholder Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={cardInfo.cardName}
                          onChange={(e) =>
                            setCardInfo({ ...cardInfo, cardName: e.target.value })
                          }
                          placeholder="JOHN DOE"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">
                            Expiry Date *
                          </label>
                          <input
                            type="text"
                            required
                            value={cardInfo.expiryDate}
                            onChange={(e) =>
                              setCardInfo({ ...cardInfo, expiryDate: e.target.value })
                            }
                            placeholder="MM/YY"
                            maxLength="5"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">
                            CVV *
                          </label>
                          <input
                            type="text"
                            required
                            value={cardInfo.cvv}
                            onChange={(e) =>
                              setCardInfo({ ...cardInfo, cvv: e.target.value })
                            }
                            placeholder="123"
                            maxLength="4"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="flex gap-4 mt-6">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 rounded-xl font-black uppercase transition-all"
                        >
                          <ArrowLeft className="w-5 h-5 inline mr-2" />
                          Back
                        </button>
                        <button
                          type="submit"
                          className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white py-4 rounded-xl font-black uppercase shadow-lg transition-all"
                        >
                          Review Order
                        </button>
                      </div>
                    </form>
                  )}

                  {paymentMethod !== "card" && (
                    <div className="flex gap-4 mt-6">
                      <button
                        onClick={() => setStep(1)}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 rounded-xl font-black uppercase transition-all"
                      >
                        <ArrowLeft className="w-5 h-5 inline mr-2" />
                        Back
                      </button>
                      <button
                        onClick={() => setStep(3)}
                        className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white py-4 rounded-xl font-black uppercase shadow-lg transition-all"
                      >
                        Review Order
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 3: Review Order */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Check className="w-6 h-6 text-red-500" />
                  <h2 className="text-2xl font-black text-gray-900 uppercase">
                    Review Your Order
                  </h2>
                </div>

                {/* Shipping Info Summary */}
                <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                  <h3 className="font-black text-gray-900 mb-2 uppercase text-sm">
                    Shipping To:
                  </h3>
                  <p className="text-gray-700">
                    {shippingInfo.firstName} {shippingInfo.lastName}<br />
                    {shippingInfo.address}<br />
                    {shippingInfo.city}, {shippingInfo.postalCode}<br />
                    {shippingInfo.phone}
                  </p>
                </div>

                {/* Payment Method Summary */}
                <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                  <h3 className="font-black text-gray-900 mb-2 uppercase text-sm">
                    Payment Method:
                  </h3>
                  <p className="text-gray-700 font-semibold">
                    {paymentMethods.find(m => m.id === paymentMethod)?.name}
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 rounded-xl font-black uppercase transition-all"
                  >
                    <ArrowLeft className="w-5 h-5 inline mr-2" />
                    Back
                  </button>
                  <button
                    onClick={handleFinalSubmit}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 rounded-xl font-black uppercase shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Lock className="w-5 h-5" />
                    Place Order
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <ShoppingBag className="w-6 h-6 text-red-500" />
                <h2 className="text-xl font-black text-gray-900 uppercase">
                  Order Summary
                </h2>
              </div>

              {/* Products */}
              <div className="space-y-4 mb-6 pb-6 border-b-2 border-gray-100">
                {cartSampleProducts.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-sm line-clamp-2">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      <p className="font-bold text-red-500">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal:</span>
                  <span className="font-semibold">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping:</span>
                  <span className="font-semibold">Rs. {shipping.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax (5%):</span>
                  <span className="font-semibold">Rs. {tax.toLocaleString()}</span>
                </div>
                <div className="pt-3 border-t-2 border-gray-200 flex justify-between">
                  <span className="text-xl font-black text-gray-900">Total:</span>
                  <span className="text-xl font-black text-red-500">
                    Rs. {total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Security Badge */}
              <div className="mt-6 p-4 bg-green-50 border-2 border-green-200 rounded-xl text-center">
                <Lock className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-bold text-green-700">
                  Secure SSL Encrypted Checkout
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Checkout;
