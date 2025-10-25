const DeliveryZone = require('../models/DeliveryZone');
const PaymentMethod = require('../models/PaymentMethod');

// Get all active delivery zones (for customers)
exports.getDeliveryZones = async (req, res) => {
  try {
    const zones = await DeliveryZone.findAll();
    res.json(zones);
  } catch (error) {
    console.error('Error fetching delivery zones:', error);
    res.status(500).json({ msg: 'Failed to fetch delivery zones' });
  }
};

// Get all delivery zones (for admin)
exports.getAllDeliveryZones = async (req, res) => {
  try {
    const zones = await DeliveryZone.findAllForAdmin();
    res.json(zones);
  } catch (error) {
    console.error('Error fetching delivery zones:', error);
    res.status(500).json({ msg: 'Failed to fetch delivery zones' });
  }
};

// Get delivery zone by ID
exports.getDeliveryZoneById = async (req, res) => {
  try {
    const zone = await DeliveryZone.findById(req.params.id);

    if (!zone) {
      return res.status(404).json({ msg: 'Delivery zone not found' });
    }

    res.json(zone);
  } catch (error) {
    console.error('Error fetching delivery zone:', error);
    res.status(500).json({ msg: 'Failed to fetch delivery zone' });
  }
};

// Create new delivery zone
exports.createDeliveryZone = async (req, res) => {
  try {
    const { zone_name, base_charge, extra_charge, min_weight } = req.body;

    // Validation
    if (!zone_name || !base_charge || !extra_charge) {
      return res.status(400).json({ msg: 'Please provide all required fields' });
    }

    if (base_charge < 0 || extra_charge < 0) {
      return res.status(400).json({ msg: 'Charges cannot be negative' });
    }

    const zoneId = await DeliveryZone.create({
      zone_name,
      base_charge,
      extra_charge,
      min_weight: min_weight || 1.00
    });

    const newZone = await DeliveryZone.findById(zoneId);
    res.status(201).json(newZone);
  } catch (error) {
    console.error('Error creating delivery zone:', error);

    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ msg: 'Delivery zone with this name already exists' });
    }

    res.status(500).json({ msg: 'Failed to create delivery zone' });
  }
};

// Update delivery zone
exports.updateDeliveryZone = async (req, res) => {
  try {
    const { zone_name, base_charge, extra_charge, min_weight } = req.body;

    // Validation
    if (base_charge !== undefined && base_charge < 0) {
      return res.status(400).json({ msg: 'Base charge cannot be negative' });
    }

    if (extra_charge !== undefined && extra_charge < 0) {
      return res.status(400).json({ msg: 'Extra charge cannot be negative' });
    }

    if (min_weight !== undefined && min_weight <= 0) {
      return res.status(400).json({ msg: 'Minimum weight must be greater than 0' });
    }

    const updated = await DeliveryZone.update(req.params.id, {
      zone_name,
      base_charge,
      extra_charge,
      min_weight
    });

    if (!updated) {
      return res.status(404).json({ msg: 'Delivery zone not found or no changes made' });
    }

    const updatedZone = await DeliveryZone.findById(req.params.id);
    res.json(updatedZone);
  } catch (error) {
    console.error('Error updating delivery zone:', error);

    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ msg: 'Delivery zone with this name already exists' });
    }

    res.status(500).json({ msg: 'Failed to update delivery zone' });
  }
};

// Delete delivery zone
exports.deleteDeliveryZone = async (req, res) => {
  try {
    const deleted = await DeliveryZone.delete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ msg: 'Delivery zone not found' });
    }

    res.json({ msg: 'Delivery zone deleted successfully' });
  } catch (error) {
    console.error('Error deleting delivery zone:', error);
    res.status(500).json({ msg: 'Failed to delete delivery zone' });
  }
};

// Calculate delivery charge
exports.calculateDeliveryCharge = async (req, res) => {
  try {
    const { zone_id, total_weight } = req.body;

    // Validation
    if (!zone_id || !total_weight) {
      return res.status(400).json({ msg: 'Please provide zone_id and total_weight' });
    }

    if (total_weight <= 0) {
      return res.status(400).json({ msg: 'Total weight must be greater than 0' });
    }

    const deliveryCharge = await DeliveryZone.calculateCharge(zone_id, total_weight);

    res.json({
      zone_id,
      total_weight,
      delivery_charge: deliveryCharge
    });
  } catch (error) {
    console.error('Error calculating delivery charge:', error);

    if (error.message === 'Delivery zone not found') {
      return res.status(400).json({ msg: error.message });
    }

    res.status(500).json({ msg: 'Failed to calculate delivery charge' });
  }
};

// Get all active payment methods (for customers)
exports.getPaymentMethods = async (req, res) => {
  try {
    const methods = await PaymentMethod.findAll();
    res.json(methods);
  } catch (error) {
    console.error('Error fetching payment methods:', error);
    res.status(500).json({ msg: 'Failed to fetch payment methods' });
  }
};

// Get all payment methods (for admin)
exports.getAllPaymentMethods = async (req, res) => {
  try {
    const methods = await PaymentMethod.findAllForAdmin();
    res.json(methods);
  } catch (error) {
    console.error('Error fetching payment methods:', error);
    res.status(500).json({ msg: 'Failed to fetch payment methods' });
  }
};

// Calculate payment fee
exports.calculatePaymentFee = async (req, res) => {
  try {
    const { method_name, subtotal } = req.body;

    // Validation
    if (!method_name || subtotal === undefined) {
      return res.status(400).json({ msg: 'Please provide method_name and subtotal' });
    }

    if (subtotal < 0) {
      return res.status(400).json({ msg: 'Subtotal cannot be negative' });
    }

    const paymentFee = await PaymentMethod.calculateFee(method_name, subtotal);

    res.json({
      method_name,
      subtotal,
      payment_fee: paymentFee,
      total: subtotal + paymentFee
    });
  } catch (error) {
    console.error('Error calculating payment fee:', error);

    if (error.message === 'Payment method not found' || error.message === 'Payment method is not active') {
      return res.status(400).json({ msg: error.message });
    }

    res.status(500).json({ msg: 'Failed to calculate payment fee' });
  }
};

// Calculate complete order total (subtotal + delivery + payment fee)
exports.calculateOrderTotal = async (req, res) => {
  try {
    const { subtotal, zone_id, total_weight, payment_method } = req.body;

    // Validation
    if (subtotal === undefined || !zone_id || !total_weight || !payment_method) {
      return res.status(400).json({
        msg: 'Please provide subtotal, zone_id, total_weight, and payment_method'
      });
    }

    if (subtotal < 0 || total_weight <= 0) {
      return res.status(400).json({ msg: 'Invalid subtotal or total_weight' });
    }

    // Calculate delivery charge
    const deliveryCharge = await DeliveryZone.calculateCharge(zone_id, total_weight);

    // Calculate payment fee (based on product subtotal only, not including delivery)
    const productSubtotal = parseFloat(subtotal);
    const paymentFee = await PaymentMethod.calculateFee(payment_method, productSubtotal);

    // Calculate total (product subtotal + delivery + payment fee)
    const total = productSubtotal + deliveryCharge + paymentFee;

    res.json({
      subtotal: productSubtotal,
      delivery_charge: deliveryCharge,
      payment_fee: paymentFee,
      total: Math.round(total * 100) / 100,
      breakdown: {
        items_total: productSubtotal,
        delivery: deliveryCharge,
        payment_processing: paymentFee
      }
    });
  } catch (error) {
    console.error('Error calculating order total:', error);

    if (error.message.includes('not found')) {
      return res.status(400).json({ msg: error.message });
    }

    res.status(500).json({ msg: 'Failed to calculate order total' });
  }
};

// Update payment method (admin only)
exports.updatePaymentMethod = async (req, res) => {
  try {
    const { method_name, display_name, fee_type, fee_value, description, is_active } = req.body;

    // Validation
    if (fee_value !== undefined && fee_value < 0) {
      return res.status(400).json({ msg: 'Fee value cannot be negative' });
    }

    if (fee_type && !['percentage', 'fixed'].includes(fee_type)) {
      return res.status(400).json({ msg: 'Invalid fee type. Must be "percentage" or "fixed"' });
    }

    const updated = await PaymentMethod.update(req.params.id, {
      method_name,
      display_name,
      fee_type,
      fee_value,
      description,
      is_active
    });

    if (!updated) {
      return res.status(404).json({ msg: 'Payment method not found or no changes made' });
    }

    const updatedMethod = await PaymentMethod.findById(req.params.id);
    res.json(updatedMethod);
  } catch (error) {
    console.error('Error updating payment method:', error);

    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ msg: 'Payment method with this name already exists' });
    }

    res.status(500).json({ msg: 'Failed to update payment method' });
  }
};
