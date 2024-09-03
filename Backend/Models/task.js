const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    dueDate: {
        type: Date
    },
    status: {
        type: String,
        enum: ["completed", "pending"],
        default: "pending"
    },
    priority: {
        type: String,
        enum: ["high", "medium", "low"],
        default: "medium"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    notified: {
        type: Boolean,
        default: false
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }
})

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;