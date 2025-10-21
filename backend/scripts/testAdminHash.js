const bcrypt = require('bcryptjs');

// Test the hash from your database
const testHash = async () => {
  const hashFromDB = '$2a$12$rIhKJPR3UxmUlx67MzpHquo8q9qf/KQzguiMdeHem0AyghRtvrNV.';
  
  // Test common passwords
  const testPasswords = ['admin', 'admin123', 'password', '123456', 'Admin123', 'admin@123'];
  
  console.log('\n=== Testing Admin Hash ===');
  console.log('Hash from DB:', hashFromDB);
  console.log('\nTesting passwords:');
  
  for (const password of testPasswords) {
    try {
      const isMatch = await bcrypt.compare(password, hashFromDB);
      console.log(`${password}: ${isMatch ? '✅ MATCH' : '❌ No match'}`);
    } catch (error) {
      console.log(`${password}: ❌ Error - ${error.message}`);
    }
  }
  
  console.log('\n=== End Test ===\n');
};

testHash();