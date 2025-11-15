/* Archivo PHP (alumnos.php) */
<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "escuela";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $accion = $_POST['accion'];
    $id = isset($_POST['id']) ? $_POST['id'] : null;
    $nombre = $_POST['nombre'];
    $edad = $_POST['edad'];
    $curso = $_POST['curso'];

    switch ($accion) {
        case 'insertar':
            $stmt = $conn->prepare("INSERT INTO alumnos (nombre, edad, curso) VALUES (?, ?, ?)");
            $stmt->bind_param("sis", $nombre, $edad, $curso);
            $stmt->execute();
            echo "Alumno insertado correctamente";
            break;
        case 'actualizar':
            if ($id) {
                $stmt = $conn->prepare("UPDATE alumnos SET nombre = ?, edad = ?, curso = ? WHERE id = ?");
                $stmt->bind_param("sisi", $nombre, $edad, $curso, $id);
                $stmt->execute();
                echo "Alumno actualizado correctamente";
            } else {
                echo "ID requerido para actualizar";
            }
            break;
        case 'borrar':
            if ($id) {
                $stmt = $conn->prepare("DELETE FROM alumnos WHERE id = ?");
                $stmt->bind_param("i", $id);
                $stmt->execute();
                echo "Alumno borrado correctamente";
            } else {
                echo "ID requerido para borrar";
            }
            break;
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = $conn->query("SELECT * FROM alumnos");
    echo "<h2>Lista de Alumnos</h2><ul>";
    while ($row = $result->fetch_assoc()) {
        echo "<li>ID: " . $row['id'] . " - Nombre: " . $row['nombre'] . " - Edad: " . $row['edad'] . " - Curso: " . $row['curso'] . "</li>";
    }
    echo "</ul>";
}

$conn->close();
?>
