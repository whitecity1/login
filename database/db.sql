CREATE DATABASE proceso_seleccion;

use proceso_seleccion;

--TABLA USUARIOS-->
CREATE TABLE users(
    id  INT(11) NOT NULL AUTO_INCREMENT,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    documento VARCHAR(15) NOT NULL,
    municipio VARCHAR(50) NOT NULL,
    direccion VARCHAR(50) NOT NULL,
    profesion VARCHAR(50) NOT NULL 
);

ALTER TABLE users
   ADD PRIMARY KEY (id);

ALTER TABLE users 
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

ALTER TABLE users
   ADD created_at timestamp NOT NULL DEFAULT current_timestamp;

ALTER TABLE users
   ADD  updated_at timestamp NOT NULL DEFAULT current_timestamp;

DESCRIBE users;

--TABLA EMPRESAS-->
CREATE TABLE empresas(
    id  INT(11) NOT NULL ,
    nombre VARCHAR(16) NOT NULL,
    correo_electronico VARCHAR(50) NOT NULL,
    municipio VARCHAR(50) NOT NULL,
    direccion VARCHAR(50) NOT NULL,
    actividad_realiza VARCHAR(50) NOT NULL 
);

ALTER TABLE empresas
   ADD PRIMARY KEY (id);

ALTER TABLE empresas
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

ALTER TABLE empresas
   ADD created_at timestamp NOT NULL DEFAULT current_timestamp;

ALTER TABLE empresas
   ADD  updated_at timestamp NOT NULL DEFAULT current_timestamp;

    DESCRIBE empresas;

--TABLA LINKS -->
CREATE TABLE LINKs(
    id  INT(11) NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(16) NOT NULL,
    url VARCHAR(265) NOT NULL,
    descripcion TEXT NOT NULL,
    user_id INT(11),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id)
        REFERENCES users(id)
);

ALTER TABLE LINKs
   ADD PRIMARY KEY (id);

ALTER TABLE LINKs
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

ALTER TABLE LINKs
   ADD  updated_at timestamp NOT NULL DEFAULT current_timestamp;

 DESCRIBE LINKs;
