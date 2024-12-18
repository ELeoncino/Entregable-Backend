const Todo = require("../models/todoModel");
// Importamos el modelo 'Todo', que define la estructura de las tareas y permite interactuar con MongoDB.

// Crear una nueva tarea
exports.createTodo = async (req, res) => {
  try {
    // Creamos una nueva instancia del modelo 'Todo' con los datos enviados en el cuerpo de la solicitud
    const todo = new Todo({
      title: req.body.title, // Se obtiene el título de la tarea del cuerpo de la solicitud
      completed: req.body.completed || false, // Si no se especifica 'completed', se establece en false por defecto
    });
    const savedTodo = await todo.save(); // Guardamos la tarea en la base de datos
    res.status(201).json(savedTodo); // Enviamos la tarea creada como respuesta con un código de estado 201 (Created)
  } catch (error) {
    res.status(500).json({ message: "Error al crear la tarea", error });
    // En caso de error, devolvemos un mensaje de error con un código de estado 500 (Internal Server Error)
  }
};

// Obtener todas las tareas
exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find(); // Obtenemos todas las tareas de la base de datos
    res.status(200).json(todos); // Enviamos el array de tareas como respuesta con un código de estado 200 (OK)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las tareas", error });
    // En caso de error, devolvemos un mensaje de error
  }
};

// Obtener una tarea por ID
exports.getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id); // Buscamos una tarea específica usando el ID proporcionado en la URL
    if (!todo) return res.status(404).json({ message: "Tarea no encontrada" });
    // Si no se encuentra la tarea, devolvemos un mensaje con un código de estado 404 (Not Found)
    res.status(200).json(todo); // Si se encuentra, enviamos la tarea como respuesta
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la tarea", error });
    // En caso de error, devolvemos un mensaje de error
  }
};

// Actualizar una tarea
exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id, // ID de la tarea que se va a actualizar
      { title: req.body.title, completed: req.body.completed },
      // Actualizamos el título y el estado completado con los datos enviados en el cuerpo de la solicitud
      { new: true } // Retorna la tarea actualizada después de la operación
    );
    if (!todo) return res.status(404).json({ message: "Tarea no encontrada" });
    // Si no se encuentra la tarea, devolvemos un mensaje con un código de estado 404 (Not Found)
    res.status(200).json(todo); // Si se actualiza correctamente, enviamos la tarea actualizada como respuesta
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la tarea", error });
    // En caso de error, devolvemos un mensaje de error
  }
};

// Eliminar una tarea
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    // Eliminamos la tarea usando el ID proporcionado en la URL
    if (!todo) return res.status(404).json({ message: "Tarea no encontrada" });
    // Si no se encuentra la tarea, devolvemos un mensaje con un código de estado 404 (Not Found)
    res.status(200).json({ message: "Tarea eliminada correctamente" });
    // Si se elimina correctamente, enviamos un mensaje de éxito
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la tarea", error });
    // En caso de error, devolvemos un mensaje de error
  }
};
