const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const todoRoutes = require("./routes/todoRoutes");
const authRoutes = require("./routes/authRoutes"); // Rutas de autenticación
const authMiddleware = require("./middleware/authMiddleware");
// Middleware de autenticación

dotenv.config(); // Cargar variables de entorno desde .env

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parsear JSON en las solicitudes
app.use(cors()); // Habilitar CORS

// Rutas de autenticación (sin protección)
app.use(authRoutes);

// Rutas protegidas (solo accesibles con autenticación)
app.use(authMiddleware); // Asegura que todo después de esto esté protegido
app.use(todoRoutes);

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/todo-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conectado a MongoDB");
    app.listen(PORT, () =>
      console.log(`Servidor corriendo en el puerto ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("Error al conectar a MongoDB:", err.message);
    process.exit(1);
  });

// Manejo global de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Error interno del servidor." });
});
