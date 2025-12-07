-- 1. Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS panaderia_crm;
USE panaderia_crm;

-- 2. Tabla USUARIO
CREATE TABLE IF NOT EXISTS usuarios (
 id BIGINT AUTO_INCREMENT PRIMARY KEY,
 username VARCHAR(50) NOT NULL UNIQUE,
 password VARCHAR(255) NOT NULL,
 email VARCHAR(100) NOT NULL UNIQUE,
 rol ENUM('ADMIN', 'EMPLEADO', 'COMERCIAL', 'OBRADOR', 'CLIENTE') NOT NULL,
 activo BOOLEAN DEFAULT TRUE,
 nombre VARCHAR(100),
 apellido VARCHAR(100)
);

-- 3. Tabla PRODUCTOS (¡IMPORTANTE: Para que funcione tu Inventario!)
CREATE TABLE IF NOT EXISTS productos (
 id BIGINT AUTO_INCREMENT PRIMARY KEY,
 nombre VARCHAR(100) NOT NULL,
 descripcion TEXT,
 precio DECIMAL(10, 2) NOT NULL,
 stock INT DEFAULT 0
);

-- 4. Tabla CLIENTE
CREATE TABLE IF NOT EXISTS clientes (
 id BIGINT AUTO_INCREMENT PRIMARY KEY,
 razon_social VARCHAR(150) NOT NULL,
 cif VARCHAR(20) NOT NULL UNIQUE, -- Cambiado 'if' por 'cif' para evitar errores
 telefono VARCHAR(20),
 email VARCHAR(100),
 direccion VARCHAR(255),
 tipo ENUM('RESTAURANTE', 'CAFETERIA', 'OTRO') NOT NULL,
 fecha_alta DATETIME DEFAULT CURRENT_TIMESTAMP,
 activo BOOLEAN DEFAULT TRUE,
 notas TEXT
);

-- 5. Tabla CONTACTO
CREATE TABLE IF NOT EXISTS contactos (
 id BIGINT AUTO_INCREMENT PRIMARY KEY,
 nombre VARCHAR(100) NOT NULL,
 cargo VARCHAR(100),
 departamento VARCHAR(100),
 email VARCHAR(100),
 telefono VARCHAR(20),
 activo BOOLEAN DEFAULT TRUE,
 cliente_id BIGINT NOT NULL,
 CONSTRAINT fk_contacto_cliente FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

-- 6. Tabla TAREA
CREATE TABLE IF NOT EXISTS tareas (
 id BIGINT AUTO_INCREMENT PRIMARY KEY,
 descripcion TEXT NOT NULL,
 prioridad ENUM('ALTA', 'MEDIA', 'BAJA') NOT NULL,
 estado ENUM('PENDIENTE', 'HECHA') DEFAULT 'PENDIENTE',
 fecha_limite DATETIME,
 fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
 comentarios TEXT,
 cliente_id BIGINT NOT NULL,
 usuario_id BIGINT NOT NULL, -- Corregido 'suario_id'
 CONSTRAINT fk_tarea_cliente FOREIGN KEY (cliente_id) REFERENCES clientes(id),
 CONSTRAINT fk_tarea_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- 7. Tabla INCIDENCIA
CREATE TABLE IF NOT EXISTS incidencias (
 id BIGINT AUTO_INCREMENT PRIMARY KEY,
 descripcion TEXT NOT NULL,
 estado ENUM('ABIERTA', 'RESUELTA') DEFAULT 'ABIERTA',
 prioridad ENUM('ALTA', 'MEDIA', 'BAJA') NOT NULL,
 categoria ENUM('CALIDAD', 'ENTREGA', 'PRECIO', 'OTRO') NOT NULL,
 fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
 fecha_resolucion DATETIME NULL,
 cliente_id BIGINT NOT NULL,
 usuario_resuelve_id BIGINT NULL,
 CONSTRAINT fk_incidencia_cliente FOREIGN KEY (cliente_id) REFERENCES clientes(id),
 CONSTRAINT fk_incidencia_usuario FOREIGN KEY (usuario_resuelve_id) REFERENCES usuarios(id)
);

INSERT INTO productos (nombre, descripcion, precio, stock) VALUES 
('Barra Rústica', 'Pan de masa madre 24h fermentación', 1.20, 50),
('Croissant de Mantequilla', 'Hojaldre 100% mantequilla', 1.50, 35),
('Ensaimada Mallorquina', 'Rellena de cabello de ángel', 2.80, 15),
('Empanadilla de Atún', 'Horneada artesanal', 1.80, 25),
('Tarta de Queso', 'Porción individual con arándanos', 3.50, 10),
('Café con Leche', 'Grano 100% Arábica', 1.40, 100),
('Palmera de Chocolate', 'Chocolate negro 70%', 1.60, 40);