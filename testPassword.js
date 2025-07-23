const bcrypt = require('bcryptjs');

const hash = '$2b$10$k7.xK21FbhMjau5wXMjCc.wlIgNkjQuMt8zDFNCBnkbRPew7z2mYC'; // Replace with your stored hash
const plainPassword = 'testpass'; // Replace with the password you're testing

bcrypt.compare(plainPassword, hash, (err, res) => {
    if (err) {
        console.error("Error comparing:", err);
    } else {
        console.log(`Password match: ${res}`); // true or false
    }
});
