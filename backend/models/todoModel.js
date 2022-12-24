const mongoose = require("mongoose");

const todoModel = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Must provide a title for Todo"],
            trim: true,
            default: "My Todo"
        },
        userId: {
            type: String,
            required: [true, "Must provide a user ID"]
        }, 
        tasks: [
            {
                content: {
                    type: String,
                    required: false,
                    trim: true
                },
                createdAt: {
                    type: Date,
                    required: true
                },
                updatedAt: {
                    type: Date,
                    required: false
                }
            }
        ], 
        urgent: {
            type: Boolean,
            required: false,
            default: false
        } 
    }, 
    { timestamps: true }
);

const todoSchema = mongoose.model("Todo", todoModel)
module.exports = todoSchema;