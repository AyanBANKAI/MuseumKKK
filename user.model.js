const mongoose = require('mongoose');

const  User = new mongoose.Schema(
    {
        userName:{ type: String, required: true},
        userEmail:{ type: String, required: true, unique: true},
        userCity:{ type: String, required: true},
        userPassword:{ type: String, required: true},
        userEntry:{ type: Date, required: false},
        isAdmin:{ type: Boolean, required: true},
    },
    {collection: "userData"}
)

module.exports = mongoose.model("UserData", User);