const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

// Get all provinces
router.get('/provinces', locationController.getProvinces);

// Get districts by province ID
router.get('/districts/:provinceId', locationController.getDistrictsByProvince);

// Get all districts
router.get('/districts', locationController.getAllDistricts);

// Get cities by district ID
router.get('/cities/:districtId', locationController.getCitiesByDistrict);

// Get all cities
router.get('/cities', locationController.getAllCities);

module.exports = router;