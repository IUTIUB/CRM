// server.js

// ----------------------------------------------------
// 1. CONFIGURACIÓN E INICIALIZACIÓN
// ----------------------------------------------------

const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); // Necesario para que Angular pueda comunicarse

const app = express();
const port = 3000; // Define el puerto del Backend

// Middleware
app.use(cors()); // Permite peticiones desde el Frontend (Angular)
app.use(express.json()); // Necesario para que Express lea los datos JSON enviados por POST

// Configuración de la Conexión a la Base de Datos
const db = mysql.createConnection({
    host: 'localhost',      
    user: 'root',           
    password: 'tu_clave',   // <-- ¡Asegúrate de cambiar esto!
    database: 'BDD-CRM'     
});

db.connect(err => {
    if (err) {
        console.error('Error conectando a la BD: ' + err.stack);
        return;
    }
    console.log('Conexión exitosa a la BD como id ' + db.threadId);
});

// ----------------------------------------------------
// 2. ENDPOINTS (RUTAS DE LA API)
// ----------------------------------------------------

// A. Endpoint para Listar Clientes (GET)
// URL: http://localhost:3000/api/clientes
app.get('/api/clientes', (req, res) => {
    const sql = 'SELECT * FROM clientes'; 
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al consultar la base de datos' });
        }
        res.json(results); // Envía la lista de clientes a Angular como JSON
    });
});

// B. Endpoint para Añadir Cliente (POST)
// URL: http://localhost:3000/api/clientes
app.post('/api/clientes', (req, res) => {
    // Los datos deben coincidir con lo que envías desde el formulario de Angular
    const { nombre, email, telefono } = req.body; 
    
    // El orden de los '?' debe coincidir con el orden de los valores en el array [nombre, email, telefono]
    const sql = 'INSERT INTO clientes (nombre, email, telefono) VALUES (?, ?, ?)';
    
    db.query(sql, [nombre, email, telefono], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error al insertar el cliente' });
        }
        res.status(201).json({ 
            id: result.insertId, 
            message: 'Cliente añadido exitosamente' 
        }); // 201 Created
    });
});


// ----------------------------------------------------
// 3. INICIAR EL SERVIDOR
// ----------------------------------------------------

app.listen(port, () => {
    console.log(`Servidor Backend corriendo en http://localhost:${port}`);
});