-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS panaderia_crm;
USE panaderia_crm;

-- 1. Tabla USUARIO
-- Seguridad: Password varchar(255) para aguantar hash de BCrypt
CREATE TABLE usuarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, 
    email VARCHAR(100) NOT NULL UNIQUE,
    rol ENUM('ADMIN', 'COMERCIAL', 'OBRADOR') NOT NULL,
    activo BOOLEAN DEFAULT TRUE
);

-- 2. Tabla CLIENTE
CREATE TABLE clientes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    razon_social VARCHAR(150) NOT NULL,
    cif VARCHAR(20) NOT NULL UNIQUE,
    telefono VARCHAR(20),
    email VARCHAR(100),
    direccion VARCHAR(255),
    tipo ENUM('RESTAURANTE', 'CAFETERIA', 'OTRO') NOT NULL,
    fecha_alta DATETIME DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE,
    notas TEXT
);

-- 3. Tabla CONTACTO
-- Relación: N Contactos -> 1 Cliente
CREATE TABLE contactos (
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

-- 4. Tabla TAREA
-- Relación: N Tareas -> 1 Cliente
-- Relación: N Tareas -> 1 Usuario (Creada/Asignada por)
CREATE TABLE tareas (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    descripcion TEXT NOT NULL,
    prioridad ENUM('ALTA', 'MEDIA', 'BAJA') NOT NULL,
    estado ENUM('PENDIENTE', 'HECHA') DEFAULT 'PENDIENTE',
    fecha_limite DATETIME,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    comentarios TEXT,
    cliente_id BIGINT NOT NULL,
    usuario_id BIGINT NOT NULL,
    CONSTRAINT fk_tarea_cliente FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    CONSTRAINT fk_tarea_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- 5. Tabla INCIDENCIA (Funcionalidad Estrella)
-- Relación: N Incidencias -> 1 Cliente
-- Relación: N Incidencias -> 1 Usuario (Resuelta por - Puede ser NULL al principio)
CREATE TABLE incidencias (
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