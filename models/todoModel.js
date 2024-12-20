const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "El nombre de la tarea es obligatorio"],
    trim: true,
    maxlength: [
      100,
      "El nombre de la tarea no puede exceder los 100 caracteres",
    ],
  },
  description: {
    type: String,
    required: [true, "La descripción de la tarea es obligatoria"],
    trim: true,
    maxlength: [
      500,
      "La descripción de la tarea no puede exceder los 500 caracteres",
    ],
  },
  creator: {
    type: String,
    required: [true, "El autor de la tarea es obligatorio"],
    trim: true,
  },
  isCompleted: {
    type: Boolean,
    default: false, // Por defecto, no completado
  },
  createdAt: {
    type: Date,
    default: Date.now, // Fecha de creación automática
  },
});

module.exports = mongoose.model("Todo", TodoSchema);
