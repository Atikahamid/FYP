const { v4: uuidv4 } = require('uuid');

// Function to generate a unique token
function generateUniqueToken() {
    // Generate a version 4 (random) UUID
    return uuidv4();
}

// Export the function to make it accessible from other modules
module.exports = generateUniqueToken;