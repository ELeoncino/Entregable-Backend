const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "El nombre de la tarea es obligatorio"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "La descripción de la tarea es obligatoria"],
    trim: true,
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
