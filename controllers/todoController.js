const Todo = require("../models/todoModel");

// Crear una nueva tarea
exports.createTodo = async (req, res) => {
  try {
    const todo = new Todo({
      title: req.body.title,
      completed: req.body.completed || false,
    });
    const savedTodo = await todo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la tarea", error });
  }
};

// Obtener todas las tareas
exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las tareas", error });
  }
};

// Obtener una tarea por ID
exports.getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Tarea no encontrada" });
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la tarea", error });
  }
};

// Actualizar una tarea
exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, completed: req.body.completed },
      { new: true }
    );
    if (!todo) return res.status(404).json({ message: "Tarea no encontrada" });
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la tarea", error });
  }
};

// Eliminar una tarea
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ message: "Tarea no encontrada" });
    res.status(200).json({ message: "Tarea eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la tarea", error });
  }
};
