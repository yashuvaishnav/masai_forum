const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    avatar: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
},{
    versionKey:false
})

const UserModel = mongoose.model("user", userSchema)

module.exports = {
    UserModel
}