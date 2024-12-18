const express = require("express");
const router = express.Router();
const Todo = require("../models/todoModel");

// Ruta GET para obtener todas las tareas
router.get("/api/tareas", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    console.error("Error al obtener las tareas:", error.message);
    res.status(500).json({ message: "Error al obtener las tareas", error });
  }
});

// Ruta POST para crear una nueva tarea
router.post("/api/tareas", async (req, res) => {
  console.log("Request body:", req.body); // Para depurar
  try {
    const { name, description, creator } = req.body;

    if (!name || !description || !creator) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
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
    console.error("Error al guardar la tarea:", error.message);
    res.status(500).json({ message: "Error al guardar la tarea", error });
  }
});

// Ruta PUT para actualizar una tarea existente
router.put("/api/tareas/:id", async (req, res) => {
  console.log("Request params:", req.params); // Para depurar
  console.log("Request body:", req.body); // Para depurar
  try {
    const { id } = req.params;

    // Validar ID
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    // Actualizar tarea
    const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, {
      new: true, // Devuelve la tarea actualizada
    });

    if (!updatedTodo) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error("Error al actualizar la tarea:", error.message);
    res.status(500).json({ message: "Error al actualizar la tarea", error });
  }
});

// Ruta DELETE para eliminar una tarea
router.delete("/api/tareas/:id", async (req, res) => {
  console.log("Request params:", req.params); // Para depurar
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    res.status(200).json({ message: "Tarea eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar la tarea:", error.message);
    res.status(500).json({ message: "Error al eliminar la tarea", error });
  }
});
// Ruta GET para obtener una tarea por ID
router.get("/api/tareas/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validar ID
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    // Buscar tarea por ID
    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    res.status(200).json(todo);
  } catch (error) {
    console.error("Error al obtener la tarea:", error.message);
    res.status(500).json({ message: "Error interno del servidor", error });
  }
});

module.exports = router;
