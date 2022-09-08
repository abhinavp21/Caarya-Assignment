const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
    }
})

const User = mongoose.model("user", userSchema)
module.exports = User