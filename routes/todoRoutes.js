const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Todo = require("../models/todoModel");

// Aplicar el middleware a todas las rutas de este archivo
router.use(authMiddleware);

// Ruta para obtener todas las tareas
router.get("/api/tareas", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    console.error("Error al obtener las tareas:", error.message);
    res.status(500).json({ message: "Error al obtener las tareas.", error });
  }
});

// Ruta para obtener una tarea por ID
router.get("/api/tareas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ message: "Tarea no encontrada." });
    }

    res.status(200).json(todo);
  } catch (error) {
    console.error("Error al obtener la tarea:", error.message);
    res.status(500).json({ message: "Error al obtener la tarea.", error });
  }
});

// Ruta para crear una nueva tarea
router.post("/api/tareas", async (req, res) => {
  try {
    const { name, description, creator } = req.body;

    if (!name || !description || !creator) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios." });
    }

    const newTodo = new Todo({
      name,
      description,
      creator,
      isCompleted: false,
    });

    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    console.error("Error al crear la tarea:", error.message);
    res.status(500).json({ message: "Error al crear la tarea.", error });
  }
});

// Ruta para actualizar una tarea existente
router.put("/api/tareas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, {
      new: true, // Devolver el documento actualizado
      runValidators: true, // Ejecutar validaciones del modelo
    });

    if (!updatedTodo) {
      return res.status(404).json({ message: "Tarea no encontrada." });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error("Error al actualizar la tarea:", error.message);
    res.status(500).json({ message: "Error al actualizar la tarea.", error });
  }
});

// Ruta para eliminar una tarea
router.delete("/api/tareas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ message: "Tarea no encontrada." });
    }

    res.status(200).json({ message: "Tarea eliminada correctamente." });
  } catch (error) {
    console.error("Error al eliminar la tarea:", error.message);
    res.status(500).json({ message: "Error al eliminar la tarea.", error });
  }
});

// Ruta GET para obtener todas las tareas con opción de filtrado
router.get("/api/tareas", async (req, res) => {
  try {
    const { creator, isCompleted } = req.query;
    const filter = {};

    // Filtrar por creator si está presente
    if (creator) {
      filter.creator = new RegExp(creator, "i"); // Búsqueda insensible a mayúsculas/minúsculas
    }

    // Filtrar por isCompleted si está presente
    if (isCompleted !== undefined) {
      filter.isCompleted = isCompleted === "true";
    }

    const todos = await Todo.find(filter);
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las tareas.", error });
  }
});

module.exports = router;
