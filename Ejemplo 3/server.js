import express from "express";
import cors from "cors";
import connection from "./db.js";

const app = express();
app.use(cors());
app.use(express.json()); // Corregido: era "exprees.json" y faltaban los paréntesis ()

// Crear (POST)
app.post("/api/alumnos", (req, res) => {
    const { nombre, edad, curso } = req.body;
    const sql = "INSERT INTO alumnos (nombre, edad, curso) VALUES (?, ?, ?)";
    connection.query(sql, [nombre, edad, curso], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: "Alumno agregado correctamente", id: result.insertId });
    });
});

// Mostrar (GET)
app.get("/api/alumnos", (req, res) => {
    const sql = "SELECT * FROM alumnos";
    connection.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});

// Actualizar (PUT) 
app.put("/api/alumnos/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, edad, curso } = req.body;

    const sql = "UPDATE alumnos SET nombre = ?, edad = ?, curso = ? WHERE id = ?";

    connection.query(sql, [nombre, edad, curso, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: "Alumno no encontrado" });
        } 
        res.json({ mensaje: `Alumno con id ${id} actualizado correctamente` });
    });
});

// Eliminar (DELETE)
app.delete("/api/alumnos/:id", (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM alumnos WHERE id = ?";

    connection.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: "Alumno no encontrado" });
        }
        res.json({ mensaje: `Alumno con id ${id} eliminado correctamente` });
    });
});

app.use(express.static("public"));

// Puerto
const PORT = 3000;

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));