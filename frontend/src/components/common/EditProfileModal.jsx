import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Save,
  CheckCircle,
  AlertCircle,
  Building,
  Navigation
} from 'lucide-react';
import { locationAPI, authAPI, addressAPI } from '../../services/api';

const EditProfileModal = ({ userData, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    province: '',
    district: '',
    city: '',
    postalCode: ''
  });
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Location data states
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);
  const [loadingProvinces, setLoadingProvinces] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  useEffect(() => {
    if (userData) {
      setFormData({
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        email: userData.email || '',
        phone: userData.phone || '',
        addressLine1: userData.addressLine1 || '',
        addressLine2: userData.addressLine2 || '',
        province: '',
        district: '',
        city: userData.city || '',
        postalCode: userData.postalCode || ''
      });
    }
    // Load provinces when modal opens
    loadProvinces();
  }, [userData]);

  // Load provinces
  const loadProvinces = async () => {
    try {
      setLoadingProvinces(true);
      const response = await locationAPI.getProvinces();
      setProvinces(response.data.data || []);
    } catch (error) {
      console.error('Error loading provinces:', error);
      setErrorMessage('Failed to load provinces');
    } finally {
      setLoadingProvinces(false);
    }
  };

  // Load districts when province changes
  const loadDistricts = async (provinceId) => {
    try {
      setLoadingDistricts(true);
      setDistricts([]);
      setCities([]);
      setFormData(prev => ({ ...prev, district: '', city: '' }));
      
      const response = await locationAPI.getDistrictsByProvince(provinceId);
      setDistricts(response.data.data || []);
    } catch (error) {
      console.error('Error loading districts:', error);
      setErrorMessage('Failed to load districts');
    } finally {
      setLoadingDistricts(false);
    }
  };

  // Load cities when district changes
  const loadCities = async (districtId) => {
    try {
      setLoadingCities(true);
      setCities([]);
      setFormData(prev => ({ ...prev, city: '' }));
      
      const response = await locationAPI.getCitiesByDistrict(districtId);
      setCities(response.data.data || []);
    } catch (error) {
      console.error('Error loading cities:', error);
      setErrorMessage('Failed to load cities');
    } finally {
      setLoadingCities(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation (Sri Lankan format)
    const phoneRegex = /^0[0-9]{9}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid Sri Lankan phone number (10 digits starting with 0)';
    }

    // Address Line 1 validation
    if (!formData.addressLine1.trim()) {
      newErrors.addressLine1 = 'Address Line 1 is required';
    } else if (formData.addressLine1.trim().length < 5) {
      newErrors.addressLine1 = 'Address Line 1 must be at least 5 characters';
    }

    // Address Line 2 validation (optional)
    if (formData.addressLine2.trim() && formData.addressLine2.trim().length < 3) {
      newErrors.addressLine2 = 'Address Line 2 must be at least 3 characters';
    }

    // Province validation
    if (!formData.province) {
      newErrors.province = 'Province is required';
    }

    // District validation
    if (!formData.district) {
      newErrors.district = 'District is required';
    }

    // City validation
    if (!formData.city) {
      newErrors.city = 'City is required';
    }

    // Postal Code validation
    const postalCodeRegex = /^[0-9]{5}$/;
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Postal code is required';
    } else if (!postalCodeRegex.test(formData.postalCode)) {
      newErrors.postalCode = 'Postal code must be 5 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Handle cascading dropdowns
    if (name === 'province') {
      loadDistricts(value);
    } else if (name === 'district') {
      loadCities(value);
    }
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!validateForm()) {
      setErrorMessage('Please fix the errors before submitting');
      return;
    }

    setIsSaving(true);

    try {
      // Separate customer data and address data
      const customerData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone
      };

      const addressData = {
        phone: formData.phone,
        addressLine1: formData.addressLine1,
        addressLine2: formData.addressLine2,
        cityName: formData.city,
        districtName: districts.find(d => d.id == formData.district)?.name || '',
        provinceName: provinces.find(p => p.id == formData.province)?.name || '',
        postalCode: formData.postalCode
      };

      // Update customer profile
      const profileResponse = await authAPI.updateProfile(customerData);
      
      // Update shipping address if address fields are provided
      if (formData.addressLine1 && formData.city && formData.province && formData.district) {
        await addressAPI.updateDefaultAddress(addressData);
      }

      // Call parent onSave with updated user data
      await onSave({
        ...customerData,
        ...addressData
      });

      setSuccess(true);

      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      console.error('Profile update error:', error);
      setErrorMessage(error.response?.data?.message || error.message || 'Failed to update profile. Please try again.');
      setIsSaving(false);
    }
  };

  const getInitials = () => {
    return `${formData.firstName.charAt(0) || ''}${formData.lastName.charAt(0) || ''}`.toUpperCase();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: -50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", duration: 0.5 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-red-500 to-orange-500 p-6 flex justify-between items-center z-10 rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Edit Profile</h2>
                <p className="text-white/90 text-sm">Update your personal information</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
              disabled={isSaving}
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Success Message */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="m-6 p-4 bg-green-50 border-2 border-green-500 rounded-xl flex items-center"
            >
              <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0" />
              <div>
                <p className="font-semibold text-green-900">Profile Updated Successfully!</p>
                <p className="text-sm text-green-700">Your changes have been saved.</p>
              </div>
            </motion.div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="m-6 mb-0 p-4 bg-red-50 border-2 border-red-500 rounded-xl flex items-center"
            >
              <AlertCircle className="w-6 h-6 text-red-600 mr-3 flex-shrink-0" />
              <p className="text-red-900 text-sm">{errorMessage}</p>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Profile Avatar Section */}
            <div className="flex flex-col items-center mb-6">
              <div className="w-32 h-32 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white text-3xl font-bold border-4 border-white shadow-xl">
                {getInitials()}
              </div>
              <p className="text-sm text-gray-500 mt-3">{formData.firstName} {formData.lastName}</p>
              <p className="text-xs text-gray-400">Profile Avatar</p>
            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  First Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full pl-11 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                      errors.firstName
                        ? 'border-red-500 focus:border-red-600'
                        : 'border-gray-200 focus:border-red-500'
                    }`}
                    placeholder="Enter first name"
                    disabled={isSaving}
                  />
                </div>
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.firstName}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Last Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full pl-11 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                      errors.lastName
                        ? 'border-red-500 focus:border-red-600'
                        : 'border-gray-200 focus:border-red-500'
                    }`}
                    placeholder="Enter last name"
                    disabled={isSaving}
                  />
                </div>
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.lastName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-11 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                      errors.email
                        ? 'border-red-500 focus:border-red-600'
                        : 'border-gray-200 focus:border-red-500'
                    }`}
                    placeholder="your.email@example.com"
                    disabled={isSaving}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full pl-11 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                      errors.phone
                        ? 'border-red-500 focus:border-red-600'
                        : 'border-gray-200 focus:border-red-500'
                    }`}
                    placeholder="0771234567"
                    disabled={isSaving}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-6 pt-4 border-t border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Navigation className="w-5 h-5 text-red-500" />
                Address Information
              </h3>

              {/* Address Line 1 */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Address Line 1 *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    className={`w-full pl-11 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                      errors.addressLine1
                        ? 'border-red-500 focus:border-red-600'
                        : 'border-gray-200 focus:border-red-500'
                    }`}
                    placeholder="No. 45/2, Dutugemunu Street"
                    disabled={isSaving}
                  />
                </div>
                {errors.addressLine1 && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.addressLine1}
                  </p>
                )}
              </div>

              {/* Address Line 2 */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Address Line 2 <span className="text-gray-400">(Optional)</span>
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleInputChange}
                    className={`w-full pl-11 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                      errors.addressLine2
                        ? 'border-red-500 focus:border-red-600'
                        : 'border-gray-200 focus:border-red-500'
                    }`}
                    placeholder="Apartment, suite, floor, etc."
                    disabled={isSaving}
                  />
                </div>
                {errors.addressLine2 && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.addressLine2}
                  </p>
                )}
              </div>

              {/* Province */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Province *
                </label>
                <select
                  name="province"
                  value={formData.province}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                    errors.province
                      ? 'border-red-500 focus:border-red-600'
                      : 'border-gray-200 focus:border-red-500'
                  }`}
                  disabled={isSaving || loadingProvinces}
                >
                  <option value="">Select Province</option>
                  {provinces.map((province) => (
                    <option key={province.id} value={province.id}>
                      {province.name}
                    </option>
                  ))}
                </select>
                {errors.province && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.province}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* District */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    District *
                  </label>
                  <select
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                      errors.district
                        ? 'border-red-500 focus:border-red-600'
                        : 'border-gray-200 focus:border-red-500'
                    }`}
                    disabled={isSaving || loadingDistricts || !formData.province}
                  >
                    <option value="">Select District</option>
                    {districts.map((district) => (
                      <option key={district.id} value={district.id}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                  {errors.district && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.district}
                    </p>
                  )}
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    City *
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                      errors.city
                        ? 'border-red-500 focus:border-red-600'
                        : 'border-gray-200 focus:border-red-500'
                    }`}
                    disabled={isSaving || loadingCities || !formData.district}
                  >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                      <option key={city.city_id} value={city.city_name}>
                        {city.city_name}
                      </option>
                    ))}
                  </select>
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.city}
                    </p>
                  )}
                </div>
              </div>

              {/* Postal Code */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Postal Code *
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                    errors.postalCode
                      ? 'border-red-500 focus:border-red-600'
                      : 'border-gray-200 focus:border-red-500'
                  }`}
                  placeholder="00600"
                  maxLength="5"
                  disabled={isSaving}
                />
                {errors.postalCode && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.postalCode}
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-bold hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSaving}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving || success}
                className={`flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg font-bold hover:from-red-600 hover:to-orange-600 transition-all flex items-center justify-center gap-2 ${
                  (isSaving || success) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSaving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </>
                ) : success ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Saved!
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EditProfileModal;
