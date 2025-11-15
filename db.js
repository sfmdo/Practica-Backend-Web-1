import mysql from "mysql2";

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"escuela"
});

connection.connect((err)=>{
    if(err){
        console.log("Error al conectar", err);
    } else{
        console.log("Conexion a la base de datos exitosa");
    }
});
export default connection;