const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const notificationSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    status: {
        type: String,
        enum: ["read", "unread"]
    }
})

const Notification = model("Notification", notificationSchema);

module.exports = Notification;

