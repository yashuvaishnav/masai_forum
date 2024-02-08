const mongoose = require("mongoose")


const postSchema = mongoose.Schema({
    userId: { type: String},
    title: { type: String, required: true },
    category: { type: String, required: true },
    content: { type: String, required: true },
    media: { type: String, required: true },
    like: { type: Number, default : 0},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
},{
    versionKey:false
}
)

const PostModel = mongoose.model("post", postSchema)

module.exports = {
    PostModel
}