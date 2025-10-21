const bcrypt = require('bcryptjs');

// Function to create a hashed password
const createAdminHash = async () => {
  const password = 'admin123'; // Change this to your desired admin password
  const saltRounds = 12;
  
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('\n=== Admin Password Hash ===');
    console.log('Password:', password);
    console.log('Hash:', hashedPassword);
    console.log('\nUse this SQL to update the admin password:');
    console.log(`UPDATE admins SET password_hash = '${hashedPassword}', username = 'admin' WHERE id = 1;`);
    console.log('\n=== End ===\n');
  } catch (error) {
    console.error('Error creating hash:', error);
  }
};

createAdminHash();