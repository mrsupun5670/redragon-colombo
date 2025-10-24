const db = require('../config/db');

const locationController = {
  // Get all provinces
  async getProvinces(req, res) {
    try {
      const [rows] = await db.query(
        'SELECT id, name FROM provinces ORDER BY name ASC'
      );
      
      res.json({
        success: true,
        message: 'Provinces retrieved successfully',
        data: rows
      });
    } catch (error) {
      console.error('Get provinces error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message
      });
    }
  },

  // Get districts by province ID
  async getDistrictsByProvince(req, res) {
    try {
      const { provinceId } = req.params;
      
      const [rows] = await db.query(
        'SELECT id, name FROM districts WHERE provinces_id = ? ORDER BY name ASC',
        [provinceId]
      );
      
      res.json({
        success: true,
        message: 'Districts retrieved successfully',
        data: rows
      });
    } catch (error) {
      console.error('Get districts by province error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message
      });
    }
  },

  // Get all districts
  async getAllDistricts(req, res) {
    try {
      const [rows] = await db.query(
        `SELECT d.id, d.name, d.provinces_id, p.name as province_name 
         FROM districts d 
         JOIN provinces p ON d.provinces_id = p.id 
         ORDER BY p.name ASC, d.name ASC`
      );
      
      res.json({
        success: true,
        message: 'All districts retrieved successfully',
        data: rows
      });
    } catch (error) {
      console.error('Get all districts error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message
      });
    }
  },

  // Get cities by district ID
  async getCitiesByDistrict(req, res) {
    try {
      const { districtId } = req.params;
      
      const [rows] = await db.query(
        'SELECT city_id, city_name FROM cities WHERE district_id = ? ORDER BY city_name ASC',
        [districtId]
      );
      
      res.json({
        success: true,
        message: 'Cities retrieved successfully',
        data: rows
      });
    } catch (error) {
      console.error('Get cities by district error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message
      });
    }
  },

  // Get all cities with district and province info
  async getAllCities(req, res) {
    try {
      const [rows] = await db.query(
        `SELECT c.city_id, c.city_name, c.district_id, 
                d.name as district_name, d.provinces_id, 
                p.name as province_name 
         FROM cities c 
         JOIN districts d ON c.district_id = d.id 
         JOIN provinces p ON d.provinces_id = p.id 
         ORDER BY p.name ASC, d.name ASC, c.city_name ASC`
      );
      
      res.json({
        success: true,
        message: 'All cities retrieved successfully',
        data: rows
      });
    } catch (error) {
      console.error('Get all cities error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message
      });
    }
  }
};

module.exports = locationController;