import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CreditCard, Wallet, Building2, Check, ShoppingBag,
  MapPin, Phone, Mail, User, Home, ArrowLeft, Lock, Package, TruckIcon
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import WhatsAppButton from "../components/common/WhatsAppButton";
import ParticleEffect from "../components/common/ParticleEffect";
import ErrorPopup from "../components/common/ErrorPopup";
import SuccessPopup from "../components/common/SuccessPopup";
import CartContext from "../context/CartContext";
import api, { locationAPI, authAPI, addressAPI, payhereAPI, orderAPI } from "../services/api";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, cartSubtotal, totalWeight, clearCart } = useContext(CartContext);
  
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review
  const [paymentMethod, setPaymentMethod] = useState("");
  const [deliveryZones, setDeliveryZones] = useState([]);
  const [selectedZone, setSelectedZone] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [paymentFee, setPaymentFee] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [paymentMethodError, setPaymentMethodError] = useState(false);

  // Location data
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);

  // Form data
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    province: "",
    district: "",
    city: "",
    postalCode: "",
    country: "Sri Lanka",
  });


  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  // Fetch delivery zones, payment methods, and location data on mount
  // Redirect to cart if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart', { replace: true });
      return;
    }
  }, [cartItems, navigate]);

  useEffect(() => {
    fetchDeliveryZones();
    fetchPaymentMethods();
    loadInitialData();
    // setupPayHereCallbacks(); // Commented out for now
  }, []);

  // Load provinces first, then user data
  const loadInitialData = async () => {
    await fetchProvinces();
    await fetchUserDataAndAddress();
  };

  // Calculate delivery charge when zone changes
  useEffect(() => {
    if (selectedZone && totalWeight > 0) {
      calculateDeliveryCharge();
    }
  }, [selectedZone, totalWeight]);

  // Calculate payment fee when payment method or subtotal changes
  useEffect(() => {
    if (paymentMethod && cartSubtotal > 0) {
      calculatePaymentFee();
    }
  }, [paymentMethod, cartSubtotal, deliveryCharge]);

  // Setup PayHere payment callbacks (commented out for now)
  /*
  const setupPayHereCallbacks = () => {
    const setupCallbacks = () => {
      if (window.payhere) {
        window.payhere.onCompleted = function onCompleted(orderId) {
          console.log("Payment completed. OrderID:" + orderId);
          setSuccess("Payment successful! Your order has been placed.");
          // Clear cart after successful payment
          clearCart();
          setTimeout(() => {
            navigate('/account');
          }, 3000);
        };

        window.payhere.onDismissed = function onDismissed() {
          console.log("Payment dismissed");
          setError("Payment was cancelled. Your order was not placed.");
        };

        window.payhere.onError = function onError(error) {
          console.log("Error:" + error);
          setError("Payment failed. Please try again or use a different payment method.");
        };
      } else {
        // Retry after 1 second if PayHere not loaded yet
        setTimeout(setupCallbacks, 1000);
      }
    };
    
    setupCallbacks();
  };
  */

  const fetchDeliveryZones = async () => {
    try {
      const response = await api.get('/delivery/zones');
      setDeliveryZones(response.data);
      if (response.data.length > 0) {
        setSelectedZone(response.data[0].id);
      }
    } catch (error) {
      console.error('Error fetching delivery zones:', error);
    }
  };

  const fetchPaymentMethods = async () => {
    try {
      const response = await api.get('/delivery/payment-methods');
      setPaymentMethods(response.data);
    } catch (error) {
      console.error('Error fetching payment methods:', error);
    }
  };

  // Location data fetching functions
  const fetchProvinces = async () => {
    try {
      const response = await locationAPI.getProvinces();
      console.log('Provinces response:', response.data);
      // Handle the response structure {success: true, data: [...]}
      const provincesData = response.data.data || response.data;
      setProvinces(Array.isArray(provincesData) ? provincesData : []);
    } catch (error) {
      console.error('Error fetching provinces:', error);
      setProvinces([]);
    }
  };

  const fetchDistricts = async (provinceId) => {
    try {
      const response = await locationAPI.getDistrictsByProvince(provinceId);
      console.log('Districts response:', response.data);
      // Handle the response structure {success: true, data: [...]}
      const districtsData = response.data.data || response.data;
      setDistricts(Array.isArray(districtsData) ? districtsData : []);
      setCities([]); // Clear cities when province changes
      setShippingInfo(prev => ({ ...prev, district: '', city: '' }));
    } catch (error) {
      console.error('Error fetching districts:', error);
      setDistricts([]);
    }
  };

  const fetchCities = async (districtId) => {
    try {
      const response = await locationAPI.getCitiesByDistrict(districtId);
      console.log('Cities response:', response.data);
      // Handle the response structure {success: true, data: [...]}
      const citiesData = response.data.data || response.data;
      setCities(Array.isArray(citiesData) ? citiesData : []);
      setShippingInfo(prev => ({ ...prev, city: '' }));
    } catch (error) {
      console.error('Error fetching cities:', error);
      setCities([]);
    }
  };

  // Fetch user data and latest address
  const fetchUserDataAndAddress = async () => {
    try {
      // Check if user is authenticated
      const token = localStorage.getItem('token');
      if (!token) {
        return; // Guest checkout, no data to fetch
      }

      // Fetch user data
      const userResponse = await authAPI.getCurrentUser();
      const user = userResponse.data.user || userResponse.data;

      // Fetch latest address
      let addressData = null;
      try {
        const addressResponse = await addressAPI.getDefaultAddress();
        addressData = addressResponse.data.data || addressResponse.data;
      } catch (addressError) {
        console.log('No address found, starting with empty form');
      }

      // Populate shipping info with user data
      const shippingData = {
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: addressData?.phone || user.phone || '',
        addressLine1: addressData?.address_line1 || '',
        addressLine2: addressData?.address_line2 || '',
        province: '',
        district: '',
        city: '',
        postalCode: addressData?.postal_code || '',
        country: "Sri Lanka",
      };

      setShippingInfo(shippingData);

      // If we have address data, populate dropdowns sequentially
      if (addressData && addressData.province_name) {
        await populateLocationDropdowns(addressData);
      }

    } catch (error) {
      console.error('Error fetching user data and address:', error);
    }
  };

  // Helper function to populate location dropdowns with proper sequencing
  const populateLocationDropdowns = async (addressData) => {
    try {
      console.log('Populating location dropdowns with:', addressData);
      
      // Ensure provinces are loaded
      let provincesData = provinces;
      if (provincesData.length === 0) {
        console.log('Fetching provinces...');
        const provincesResponse = await locationAPI.getProvinces();
        provincesData = provincesResponse.data.data || provincesResponse.data;
        setProvinces(provincesData);
      }

      console.log('Available provinces:', provincesData);

      // Find and set province
      const foundProvince = provincesData.find(p => p.name === addressData.province_name);
      console.log('Found province:', foundProvince);
      
      if (foundProvince) {
        // Fetch and set districts
        console.log('Fetching districts for province:', foundProvince.id);
        const districtsResponse = await locationAPI.getDistrictsByProvince(foundProvince.id);
        const districtsData = districtsResponse.data.data || districtsResponse.data;
        setDistricts(districtsData);
        console.log('Available districts:', districtsData);

        // Find and set district
        if (addressData.district_name) {
          const foundDistrict = districtsData.find(d => d.name === addressData.district_name);
          console.log('Found district:', foundDistrict);
          
          if (foundDistrict) {
            // Fetch and set cities
            console.log('Fetching cities for district:', foundDistrict.id);
            const citiesResponse = await locationAPI.getCitiesByDistrict(foundDistrict.id);
            const citiesData = citiesResponse.data.data || citiesResponse.data;
            setCities(citiesData);
            console.log('Available cities:', citiesData);

            // Find and set city
            if (addressData.city_name) {
              const foundCity = citiesData.find(c => c.city_name === addressData.city_name);
              console.log('Found city:', foundCity);
              
              if (foundCity) {
                // Update all location selections at once
                setShippingInfo(prev => ({
                  ...prev,
                  province: foundProvince.id,
                  district: foundDistrict.id,
                  city: foundCity.city_id
                }));
                console.log('Location dropdowns populated successfully');
              }
            } else {
              // Set province and district only
              setShippingInfo(prev => ({
                ...prev,
                province: foundProvince.id,
                district: foundDistrict.id
              }));
            }
          }
        } else {
          // Set province only
          setShippingInfo(prev => ({
            ...prev,
            province: foundProvince.id
          }));
        }
      }
    } catch (error) {
      console.error('Error populating location dropdowns:', error);
    }
  };

  // Location change handlers
  const handleProvinceChange = (e) => {
    const provinceId = e.target.value;
    setShippingInfo(prev => ({ ...prev, province: provinceId }));
    if (provinceId) {
      fetchDistricts(provinceId);
    } else {
      setDistricts([]);
      setCities([]);
      setShippingInfo(prev => ({ ...prev, district: '', city: '' }));
    }
  };

  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    setShippingInfo(prev => ({ ...prev, district: districtId }));
    if (districtId) {
      fetchCities(districtId);
    } else {
      setCities([]);
      setShippingInfo(prev => ({ ...prev, city: '' }));
    }
  };

  const calculateDeliveryCharge = async () => {
    try {
      const response = await api.post('/delivery/calculate-delivery', {
        zone_id: selectedZone,
        total_weight: totalWeight
      });
      setDeliveryCharge(response.data.delivery_charge);
    } catch (error) {
      console.error('Error calculating delivery charge:', error);
      setDeliveryCharge(0);
    }
  };

  const calculatePaymentFee = async () => {
    try {
      // Send only the product subtotal (before shipping) for payment fee calculation
      const response = await api.post('/delivery/calculate-payment-fee', {
        method_name: paymentMethod,
        subtotal: cartSubtotal
      });
      setPaymentFee(response.data.payment_fee);
    } catch (error) {
      console.error('Error calculating payment fee:', error);
      setPaymentFee(0);
    }
  };

  // Calculate totals
  const subtotal = cartSubtotal;
  const total = subtotal + deliveryCharge + paymentFee;

  const handleShippingSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Check if user is authenticated
      const token = localStorage.getItem('token');
      if (token) {
        // Save address to shipping_addresses table
        const addressData = {
          phone: shippingInfo.phone,
          addressLine1: shippingInfo.addressLine1,
          addressLine2: shippingInfo.addressLine2,
          cityName: cities.find(c => c.city_id == shippingInfo.city)?.city_name || '',
          districtName: districts.find(d => d.id == shippingInfo.district)?.name || '',
          provinceName: provinces.find(p => p.id == shippingInfo.province)?.name || '',
          postalCode: shippingInfo.postalCode
        };

        await addressAPI.updateDefaultAddress(addressData);
      }
      
      setStep(2);
    } catch (error) {
      console.error('Error saving address:', error);
      // Continue to next step even if address save fails
      setStep(2);
    }
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    
    if (!paymentMethod) {
      setError("Please select a payment method to continue.");
      setPaymentMethodError(true);
      return;
    }
    
    setPaymentMethodError(false);
    setStep(3);
  };

  const handleFinalSubmit = async () => {
    try {
      setLoading(true);
      
      // Check payment method type
      if (paymentMethod === 'bank_transfer') {
        // For bank transfer, show bank details instead of processing payment
        setStep(4); // Move to bank transfer details step
        setLoading(false);
        return;
      }
      
      // For all payment methods, save order to database
      // PayHere integration commented out for now
      // if (paymentMethod === 'debit_card' || paymentMethod === 'credit_card') {
        // Generate unique order ID
        const orderId = `ORD${Date.now()}`;
        const totalAmount = (cartSubtotal + deliveryCharge + paymentFee).toFixed(2);
        
        // TODO: PayHere integration (commented for now)
        /*
        // Generate PayHere hash
        const hashResponse = await payhereAPI.generateHash(paymentData);
        
        if (hashResponse.data.success) {
          const paymentConfig = hashResponse.data.data;
          
          // Check if PayHere is loaded
          if (!window.payhere || !window.payhere.startPayment) {
            throw new Error('PayHere SDK not loaded. Please refresh the page and try again.');
          }
          
          // Configure PayHere payment
          window.payhere.startPayment({
            sandbox: true, // Set to false for production
            merchant_id: paymentConfig.merchant_id,
            return_url: paymentConfig.return_url,
            cancel_url: paymentConfig.cancel_url,
            notify_url: paymentConfig.notify_url,
            order_id: paymentConfig.order_id,
            items: cartItems.map(item => item.product_name).join(', '),
            amount: paymentConfig.amount,
            currency: paymentConfig.currency,
            hash: paymentConfig.hash,
            first_name: paymentConfig.first_name,
            last_name: paymentConfig.last_name,
            email: paymentConfig.email,
            phone: paymentConfig.phone,
            address: paymentConfig.address,
            city: paymentConfig.city,
            country: paymentConfig.country
          });
        } else {
          throw new Error('Failed to generate payment hash');
        }
        */
        
        // Convert shipping info to correct format with names instead of IDs
        const processedShippingInfo = {
          firstName: shippingInfo.firstName,
          lastName: shippingInfo.lastName,
          email: shippingInfo.email,
          phone: shippingInfo.phone,
          addressLine1: shippingInfo.addressLine1,
          addressLine2: shippingInfo.addressLine2,
          city: cities.find(c => c.city_id == shippingInfo.city)?.city_name || '',
          district: districts.find(d => d.id == shippingInfo.district)?.name || '',
          province: provinces.find(p => p.id == shippingInfo.province)?.name || '',
          postalCode: shippingInfo.postalCode,
          country: shippingInfo.country
        };

        // Save order to database instead
        const orderData = {
          order_number: orderId,
          subtotal: cartSubtotal,
          shipping_fee: deliveryCharge,
          payment_fee: paymentFee,
          total: totalAmount,
          payment_method: paymentMethod,
          shipping_info: processedShippingInfo,
          items: cartItems.map(item => ({
            product_id: item.id,
            product_name: item.name,
            product_image: item.primary_image,
            price: item.sale_price || item.price,
            quantity: item.quantity,
            subtotal: (item.sale_price || item.price) * item.quantity
          }))
        };
        
        const orderResponse = await orderAPI.createOrder(orderData);
        
        if (orderResponse.data.success) {
          setSuccess("Order placed successfully! Thank you for your purchase.");
          // Clear cart after successful order
          await clearCart();
          setTimeout(() => {
            navigate('/account');
          }, 3000);
        } else {
          throw new Error('Failed to create order');
        }
      // }
    } catch (error) {
      console.error('Payment initialization error:', error);
      setError('Failed to initialize payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getPaymentMethodDisplay = (methodName) => {
    const method = paymentMethods.find(m => m.method_name === methodName);
    return method ? method.display_name : methodName;
  };

  const getPaymentMethodInfo = (methodName) => {
    const method = paymentMethods.find(m => m.method_name === methodName);
    if (!method) return null;

    if (method.percentage && method.percentage > 0) {
      return `+${method.percentage}% processing fee`;
    }
    return 'No additional fees';
  };

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
            {["Shipping", "Payment", "Review", ...(paymentMethod === 'bank_transfer' && step === 4 ? ["Bank Transfer"] : [])].map((stepName, index) => (
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
                      Address Line 1 *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.addressLine1}
                      onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, addressLine1: e.target.value })
                      }
                      placeholder="Street address, building number"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Address Line 2
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.addressLine2}
                      onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, addressLine2: e.target.value })
                      }
                      placeholder="Apartment, suite, unit, etc. (optional)"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Province *
                      </label>
                      <select
                        required
                        value={shippingInfo.province}
                        onChange={handleProvinceChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                      >
                        <option value="">Select Province</option>
                        {Array.isArray(provinces) && provinces.map((province) => (
                          <option key={province.id} value={province.id}>
                            {province.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        District *
                      </label>
                      <select
                        required
                        value={shippingInfo.district}
                        onChange={handleDistrictChange}
                        disabled={!shippingInfo.province}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 disabled:bg-gray-100 disabled:cursor-not-allowed"
                      >
                        <option value="">Select District</option>
                        {Array.isArray(districts) && districts.map((district) => (
                          <option key={district.id} value={district.id}>
                            {district.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        City *
                      </label>
                      <select
                        required
                        value={shippingInfo.city}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, city: e.target.value })
                        }
                        disabled={!shippingInfo.district}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 disabled:bg-gray-100 disabled:cursor-not-allowed"
                      >
                        <option value="">Select City</option>
                        {Array.isArray(cities) && cities.map((city) => (
                          <option key={city.city_id} value={city.city_id}>
                            {city.city_name}
                          </option>
                        ))}
                      </select>
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

                  {/* Delivery Zone Selection */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Delivery Zone *
                    </label>
                    <select
                      required
                      value={selectedZone || ''}
                      onChange={(e) => setSelectedZone(parseInt(e.target.value))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                    >
                      <option value="">Select delivery zone</option>
                      {deliveryZones.map((zone) => (
                        <option key={zone.id} value={zone.id}>
                          {zone.zone_name} - Rs. {zone.base_charge} (base) + Rs. {zone.extra_charge}/kg
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-2">
                      <Package className="w-3 h-3 inline mr-1" />
                      Total package weight: {totalWeight.toFixed(2)} kg
                    </p>
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
          

                {/* Payment Method Selection */}
                <div className={`bg-white rounded-2xl shadow-lg p-8 ${paymentMethodError ? 'border-2 border-red-500' : 'border-2 border-transparent'}`}>
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
                        className={`flex items-start gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          paymentMethod === method.method_name
                            ? "border-red-500 bg-red-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.method_name}
                          checked={paymentMethod === method.method_name}
                          onChange={(e) => {
                            setPaymentMethod(e.target.value);
                            setPaymentMethodError(false);
                          }}
                          className="w-4 h-4 text-red-500 mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            {method.method_name === 'card' && <CreditCard className="w-5 h-5 text-gray-700" />}
                            {method.method_name === 'koko' && <Wallet className="w-5 h-5 text-gray-700" />}
                            {method.method_name === 'cod' && <Building2 className="w-5 h-5 text-gray-700" />}
                            <span className="font-bold text-gray-900">{method.display_name}</span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">{method.description}</p>
                          <p className="text-xs font-semibold text-red-600 mt-1">
                            {getPaymentMethodInfo(method.method_name)}
                          </p>
                        </div>
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
                        onClick={() => {
                          if (!paymentMethod) {
                            setError("Please select a payment method to continue.");
                            setPaymentMethodError(true);
                            return;
                          }
                          setPaymentMethodError(false);
                          setStep(3);
                        }}
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
                  <p className="text-sm font-semibold text-blue-600 mt-2">
                    <TruckIcon className="w-4 h-4 inline mr-1" />
                    {deliveryZones.find(z => z.id === selectedZone)?.zone_name}
                  </p>
                </div>

                {/* Payment Method Summary */}
                <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                  <h3 className="font-black text-gray-900 mb-2 uppercase text-sm">
                    Payment Method:
                  </h3>
                  <p className="text-gray-700 font-semibold">
                    {getPaymentMethodDisplay(paymentMethod)}
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

            {/* Step 4: Bank Transfer Details */}
            {step === 4 && paymentMethod === 'bank_transfer' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Building2 className="w-6 h-6 text-blue-500" />
                  <h2 className="text-2xl font-black text-gray-900 uppercase">
                    Bank Transfer Details
                  </h2>
                </div>

                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
                  <h3 className="text-lg font-bold text-blue-900 mb-4">Please transfer the total amount to:</h3>
                  
                  <div className="space-y-3 text-gray-700">
                    <div className="flex justify-between">
                      <span className="font-semibold">Account Name:</span>
                      <span className="font-bold">REDRAGON LANKA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Account Number:</span>
                      <span className="font-bold">200060150170</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Bank Name:</span>
                      <span className="font-bold">Nations Trust Bank</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Branch:</span>
                      <span className="font-bold">UNION PLACE</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Branch Code:</span>
                      <span className="font-bold">006</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Swift Code:</span>
                      <span className="font-bold">NTBCLKLX</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
                    <p className="text-sm text-yellow-800 font-medium">
                      <strong>Total Amount to Transfer:</strong> LKR {(cartSubtotal + deliveryCharge + paymentFee).toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-6">
                  <h3 className="text-lg font-bold text-green-900 mb-3">After making the transfer:</h3>
                  <p className="text-green-700 mb-3">
                    Please send the transfer receipt/screenshot to our WhatsApp number:
                  </p>
                  <div className="flex items-center gap-2 justify-center">
                    <a 
                      href="https://wa.me/94777624028" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center gap-2"
                    >
                      <Phone className="w-5 h-5" />
                      Send Receipt to 0777 624 028
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-4 rounded-xl font-black uppercase transition-colors flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Review
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        setLoading(true);
                        
                        // Generate unique order ID
                        const orderId = `ORD${Date.now()}`;
                        const totalAmount = (cartSubtotal + deliveryCharge + paymentFee).toFixed(2);
                        
                        // Convert shipping info to correct format with names instead of IDs
                        const processedShippingInfo = {
                          firstName: shippingInfo.firstName,
                          lastName: shippingInfo.lastName,
                          email: shippingInfo.email,
                          phone: shippingInfo.phone,
                          addressLine1: shippingInfo.addressLine1,
                          addressLine2: shippingInfo.addressLine2,
                          city: cities.find(c => c.city_id == shippingInfo.city)?.city_name || '',
                          district: districts.find(d => d.id == shippingInfo.district)?.name || '',
                          province: provinces.find(p => p.id == shippingInfo.province)?.name || '',
                          postalCode: shippingInfo.postalCode,
                          country: shippingInfo.country
                        };

                        // Save bank transfer order to database
                        const orderData = {
                          order_number: orderId,
                          subtotal: cartSubtotal,
                          shipping_fee: deliveryCharge,
                          payment_fee: paymentFee,
                          total: totalAmount,
                          payment_method: paymentMethod,
                          shipping_info: processedShippingInfo,
                          items: cartItems.map(item => ({
                            product_id: item.id,
                            product_name: item.name,
                            product_image: item.primary_image,
                            price: item.sale_price || item.price,
                            quantity: item.quantity,
                            subtotal: (item.sale_price || item.price) * item.quantity
                          }))
                        };
                        
                        const orderResponse = await orderAPI.createOrder(orderData);
                        
                        if (orderResponse.data.success) {
                          setSuccess("Order placed successfully! Please complete the bank transfer and send the receipt to our WhatsApp.");
                          // Clear cart after successful order
                          await clearCart();
                          setTimeout(() => navigate('/'), 5000);
                        } else {
                          throw new Error('Failed to create order');
                        }
                      } catch (error) {
                        console.error('Error creating bank transfer order:', error);
                        setError('Failed to create order. Please try again.');
                      } finally {
                        setLoading(false);
                      }
                    }}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-4 rounded-xl font-black uppercase shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Check className="w-5 h-5" />
                    Confirm Order
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
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <img
                        src={item.primary_image || item.image || item.images[0].image_path || '/placeholder-product.jpg'}
                        alt={item.name}
                        onClick={() => navigate(`/product/${item.id}`)}
                        className="w-16 h-16 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                      />
                      <div className="flex-1">
                        <h3
                          onClick={() => navigate(`/product/${item.id}`)}
                          className="font-bold text-gray-900 text-sm line-clamp-2 cursor-pointer hover:text-red-600 transition-colors"
                        >
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        <p className="text-xs text-gray-500">
                          {((item.weight || 1000) * item.quantity / 1000).toFixed(2)} kg
                        </p>
                        <p className="font-bold text-red-500">
                          Rs. {((item.sale_price || item.price) * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">Your cart is empty</p>
                )}
              </div>

              {/* Totals */}
              <div className="space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal:</span>
                  <span className="font-semibold">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <div className="flex items-center gap-1">
                    <TruckIcon className="w-4 h-4" />
                    <span>Delivery ({totalWeight.toFixed(2)} kg):</span>
                  </div>
                  <span className="font-semibold">Rs. {deliveryCharge.toLocaleString()}</span>
                </div>
                {paymentFee > 0 && (
                  <div className="flex justify-between text-gray-700">
                    <span>Payment Processing:</span>
                    <span className="font-semibold">Rs. {paymentFee.toLocaleString()}</span>
                  </div>
                )}
                <div className="pt-3 border-t-2 border-gray-200 flex justify-between">
                  <span className="text-xl font-black text-gray-900">Total:</span>
                  <span className="text-xl font-black text-red-500">
                    Rs. {Math.round(total).toLocaleString()}
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
      <ErrorPopup message={error} onClose={() => setError(null)} />
      <SuccessPopup message={success} onClose={() => setSuccess(null)} />
    </div>
  );
};

export default Checkout;
