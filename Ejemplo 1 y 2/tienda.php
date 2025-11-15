<?php
$server="localhost";
$usr="root";
$db="tienda";
$psw="";

$conexion = new mysqli($server, $usr, $psw, $db);

if ($conexion->connect_error) {
	die("Error en la conexion".$conexion->connect_error);
}
echo "Conexion exitosa";

$sql = "SELECT id,Nombre,Precio FROM producto";
$resultado = $conexion->query($sql);

if($resultado->num_rows > 0){
	while ($fila = $resultado->fetch_assoc()) {
	    echo "ID: ".$fila["id"]." - Nombre: ".$fila["Nombre"]." - Precio: ".$fila["Precio"]."<br>";
	}
}else{
	echo"No hay productos registrados";
}
$conexion->close();
?>