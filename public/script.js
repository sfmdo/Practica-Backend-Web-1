const API_URL = "http://localhost:3000/api/alumnos";
const form = document.getElementById("alumnoForm");
const tabla = document.querySelector("#tablaAlumnos tbody");

// Seleccionar los botones por su nuevo ID
const btnModificar = document.getElementById("btnModificar");
const btnEliminar = document.getElementById("btnEliminar");

// 🔹 Cargar alumnos al iniciar la página
document.addEventListener("DOMContentLoaded", obtenerAlumnos);

// 🔹 Manejar el envío del formulario SOLO PARA AGREGAR (con el botón type="submit")
form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Evita que la página se recargue

    const nombre = document.getElementById("nombre").value.trim();
    const edad = document.getElementById("edad").value.trim();
    const curso = document.getElementById("curso").value.trim();

    if (!nombre || !edad) {
        alert("Para agregar, por favor ingresa al menos nombre y edad.");
        return;
    }

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, edad, curso })
        });
        const data = await res.json();
        if (res.ok) {
            alert("Alumno agregado correctamente");
            form.reset();
            obtenerAlumnos(); // Recarga la tabla
        } else {
            alert("Error: " + (data.error || "Ocurrió un problema"));
        }
    } catch (err) {
        console.error(err);
        alert("Error de conexión con el servidor");
    }
});

// 🔹 Manejar el clic en el botón MODIFICAR
btnModificar.addEventListener("click", async () => {
    const id = document.getElementById("id").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const edad = document.getElementById("edad").value.trim();
    const curso = document.getElementById("curso").value.trim();

    if (!id) {
        alert("Para modificar, el campo ID es obligatorio.");
        return;
    }

    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, edad, curso })
        });
        const data = await res.json();
        if (res.ok) {
            alert(data.mensaje);
            form.reset();
            obtenerAlumnos();
        } else {
            alert("Error: " + (data.mensaje || data.error));
        }
    } catch (err) {
        console.error(err);
        alert("Error de conexión con el servidor");
    }
});

// 🔹 Manejar el clic en el botón ELIMINAR
btnEliminar.addEventListener("click", async () => {
    const id = document.getElementById("id").value.trim();

    if (!id) {
        alert("Para eliminar, el campo ID es obligatorio.");
        return;
    }

    if (!confirm(`¿Estás seguro de que quieres eliminar al alumno con ID ${id}?`)) {
        return;
    }

    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });
        const data = await res.json();
        if (res.ok) {
            alert(data.mensaje);
            form.reset();
            obtenerAlumnos();
        } else {
            alert("Error: " + (data.mensaje || data.error));
        }
    } catch (err) {
        console.error(err);
        alert("Error de conexión con el servidor");
    }
});


// 🔹 Función para obtener y mostrar la lista de alumnos (GET) 
async function obtenerAlumnos() {
    try {
        const res = await fetch(API_URL);
        const alumnos = await res.json();
        tabla.innerHTML = ""; // Limpiar tabla antes de llenarla

        alumnos.forEach(a => {
            const fila = `
            <tr>
                <td>${a.id}</td>
                <td>${a.nombre}</td>
                <td>${a.edad}</td>
                <td>${a.curso ?? ""}</td>
            </tr>`;
            tabla.insertAdjacentHTML("beforeend", fila);
        });
    } catch (err) {
        console.error(err);
        tabla.innerHTML = "<tr><td colspan='4'>Error al cargar los alumnos.</td></tr>";
    }
}