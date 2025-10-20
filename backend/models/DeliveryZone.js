const db = require('../config/db');

class DeliveryZone {
  // Get all active delivery zones
  static async findAll() {
    const [rows] = await db.query(
      'SELECT * FROM delivery_zones WHERE is_active = 1 ORDER BY zone_name ASC'
    );
    return rows;
  }

  // Get all zones (including inactive) for admin
  static async findAllForAdmin() {
    const [rows] = await db.query(
      'SELECT * FROM delivery_zones ORDER BY created_at DESC'
    );
    return rows;
  }

  // Get zone by ID
  static async findById(id) {
    const [rows] = await db.query(
      'SELECT * FROM delivery_zones WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  // Create new delivery zone
  static async create({ zone_name, base_charge, extra_charge, min_weight }) {
    const [result] = await db.query(
      `INSERT INTO delivery_zones (zone_name, base_charge, extra_charge, min_weight)
       VALUES (?, ?, ?, ?)`,
      [zone_name, base_charge, extra_charge, min_weight || 1.00]
    );
    return result.insertId;
  }

  // Update delivery zone
  static async update(id, { zone_name, base_charge, extra_charge, min_weight, is_active }) {
    const updates = [];
    const values = [];

    if (zone_name !== undefined) {
      updates.push('zone_name = ?');
      values.push(zone_name);
    }
    if (base_charge !== undefined) {
      updates.push('base_charge = ?');
      values.push(base_charge);
    }
    if (extra_charge !== undefined) {
      updates.push('extra_charge = ?');
      values.push(extra_charge);
    }
    if (min_weight !== undefined) {
      updates.push('min_weight = ?');
      values.push(min_weight);
    }
    if (is_active !== undefined) {
      updates.push('is_active = ?');
      values.push(is_active);
    }

    if (updates.length === 0) {
      return false;
    }

    values.push(id);

    const [result] = await db.query(
      `UPDATE delivery_zones SET ${updates.join(', ')} WHERE id = ?`,
      values
    );

    return result.affectedRows > 0;
  }

  // Delete delivery zone
  static async delete(id) {
    const [result] = await db.query(
      'DELETE FROM delivery_zones WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  }

  // Calculate delivery charge
  static async calculateCharge(zoneId, totalWeight) {
    const zone = await this.findById(zoneId);

    if (!zone) {
      throw new Error('Delivery zone not found');
    }

    if (!zone.is_active) {
      throw new Error('Delivery zone is not active');
    }

    let deliveryCharge;

    if (totalWeight <= zone.min_weight) {
      deliveryCharge = zone.base_charge;
    } else {
      const extraWeight = totalWeight - zone.min_weight;
      deliveryCharge = parseFloat(zone.base_charge) + (extraWeight * parseFloat(zone.extra_charge));
    }

    // Round to nearest whole rupee
    return Math.round(deliveryCharge);
  }
}

module.exports = DeliveryZone;
