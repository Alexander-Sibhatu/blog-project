const bcrypt = require('bcrypt');

const comparePassword = async (plainPassword, hashedPassword) => {
    try {
        return await bcrypt.compare(plainPassword, hashedPassword)
    } catch (error) {
        console.log("Error comparing passwords", error)
        return false
    }
}

module.exports = { comparePassword }