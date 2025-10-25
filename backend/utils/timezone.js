// Timezone utility functions for Sri Lankan time (UTC+5:30)

/**
 * Get current Sri Lankan timestamp for database insertion
 * @returns {string} SQL function to get current Sri Lankan time
 */
const getSriLankanTimestamp = () => {
  return "CONVERT_TZ(NOW(), @@session.time_zone, '+05:30')";
};

/**
 * Convert any timestamp to Sri Lankan time in SQL
 * @param {string} timestamp - The timestamp column or value
 * @returns {string} SQL function to convert to Sri Lankan time
 */
const convertToSriLankanTime = (timestamp) => {
  return `CONVERT_TZ(${timestamp}, @@session.time_zone, '+05:30')`;
};

/**
 * Get current Sri Lankan time as JavaScript Date object
 * @returns {Date} Current time in Sri Lankan timezone
 */
const getCurrentSriLankanTime = () => {
  const now = new Date();
  // Add 5 hours 30 minutes to UTC
  const sriLankanTime = new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
  return sriLankanTime;
};

/**
 * Format date for Sri Lankan timezone display
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date string
 */
const formatSriLankanDateTime = (date) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleString('en-LK', {
    timeZone: 'Asia/Colombo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
};

module.exports = {
  getSriLankanTimestamp,
  convertToSriLankanTime,
  getCurrentSriLankanTime,
  formatSriLankanDateTime
};