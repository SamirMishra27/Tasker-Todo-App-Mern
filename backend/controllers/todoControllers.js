const { Router } = require("express");
const todoSchema = require("../models/todoModel");

const apiRouter = Router();

apiRouter.route("/todos/:userId")

    // Get all Todos by user
    .get(async (request, response) => {
        try {
            const { userId } = request.params;
            const todosList = await todoSchema.find({ userId: userId }).sort("-updatedAt");
            response.status(201).json({
                success: true,
                message: "",
                todosList
            });
        
        } catch (error) {
            response.status(401).json({
                success: false,
                message: "Failed to retrieve data from database",
                error: error.message
            });
        }
    })

    // Create a new Todo by user
    .post(async (request, response) => {
        try {
            const { userId } = request.params;
            const { todoName, todoTasks, urgent } = request.body;

            const todoDocument = await todoSchema.create({
                title: todoName,
                userId: userId,
                tasks: todoTasks || [],
                urgent: urgent
            });

            await todoDocument.save();
            response.status(201).json({
                success: true,
                message: "",
                todoDocument
            });
        
        } catch (error) {
            response.status(401).json({
                success: false,
                message: "Failed to create data in database",
                error: error.message
            });
        }
    });

apiRouter.route("/todos/:userId/:id")

    // Edit a todo by user
    .put(async (request, response) => {
        try {
            const { userId, id } = request.params;
            const { todoName, todoTasksList, urgent } = request.body;

            const todoDocument = await todoSchema.findByIdAndUpdate(id, {
                title: todoName,
                tasks: todoTasksList,
                urgent: urgent
            });
            await todoDocument.save();

            response.status(201).json({
                success: true,
                message: "",
                todoDocument
            })
        } catch (error) {
            response.status(401).json({
                success: false,
                message: "Failed to update data in database",
                error: error.message
            });
        }
    })

    // Delete a todo by user
    .delete(async (request, response) => {
        try {
            const { userId, id } = request.params;

            await todoSchema.findByIdAndDelete(id);
            response.status(201).json({
                success: true,
                message: ""
            })
        } catch (error) {
            response.status(401).json({
                success: false,
                message: "Failed to delete data in database",
                error: error.message
            });
        }
    });

module.exports = apiRouter;