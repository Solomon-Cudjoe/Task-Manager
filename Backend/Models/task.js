const { Schema } = require("mongoose");

const taskSchema = new Schema({
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
    }
})


module.exports = taskSchema;