const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");

// Rutas CRUD
router.post("/", todoController.createTodo);
router.get("/", todoController.getAllTodos);
router.get("/:id", todoController.getTodoById);
router.put("/:id", todoController.updateTodo);
router.delete("/:id", todoController.deleteTodo);

module.exports = router;
