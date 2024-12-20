const Todo = require("../models/todoModel");

// Crear una nueva tarea
exports.createTodo = async (req, res) => {
  try {
    const { title, completed = false } = req.body; // Extraer datos del cuerpo de la solicitud

    // Validar los datos proporcionados
    if (!title) {
      return res
        .status(400)
        .json({ message: "El título de la tarea es obligatorio" });
    }

    const todo = new Todo({ title, completed }); // Crear una nueva instancia de tarea
    const savedTodo = await todo.save(); // Guardar en la base de datos
    res.status(201).json(savedTodo); // Responder con la tarea creada
  } catch (error) {
    console.error("Error al crear la tarea:", error.message);
    res
      .status(500)
      .json({ message: "Error al crear la tarea", error: error.message });
  }
};

// Obtener todas las tareas
exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find(); // Obtener todas las tareas
    res.status(200).json(todos); // Responder con las tareas
  } catch (error) {
    console.error("Error al obtener las tareas:", error.message);
    res
      .status(500)
      .json({ message: "Error al obtener las tareas", error: error.message });
  }
};

// Obtener una tarea por ID
exports.getTodoById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validar el formato del ID
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const todo = await Todo.findById(id); // Buscar tarea por ID
    if (!todo) return res.status(404).json({ message: "Tarea no encontrada" });
    res.status(200).json(todo); // Responder con la tarea encontrada
  } catch (error) {
    console.error("Error al obtener la tarea:", error.message);
    res
      .status(500)
      .json({ message: "Error al obtener la tarea", error: error.message });
  }
};

// Actualizar una tarea
exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    // Validar el formato del ID
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, completed },
      { new: true, runValidators: true } // Retornar la tarea actualizada y ejecutar validaciones
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    res.status(200).json(updatedTodo); // Responder con la tarea actualizada
  } catch (error) {
    console.error("Error al actualizar la tarea:", error.message);
    res
      .status(500)
      .json({ message: "Error al actualizar la tarea", error: error.message });
  }
};

// Eliminar una tarea
exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    // Validar el formato del ID
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const deletedTodo = await Todo.findByIdAndDelete(id); // Eliminar tarea por ID
    if (!deletedTodo) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    res.status(200).json({ message: "Tarea eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar la tarea:", error.message);
    res
      .status(500)
      .json({ message: "Error al eliminar la tarea", error: error.message });
  }
};
