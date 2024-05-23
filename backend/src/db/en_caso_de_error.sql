-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS pet_home;
USE pet_home;

-- Tabla categories
CREATE TABLE IF NOT EXISTS categories (
  id_category INT AUTO_INCREMENT PRIMARY KEY,
  name_category VARCHAR(32) NOT NULL
);

-- Tabla genders
CREATE TABLE IF NOT EXISTS genders (
  id_gender INT AUTO_INCREMENT PRIMARY KEY,
  name_gender VARCHAR(32) NOT NULL
);

-- Tabla races
CREATE TABLE IF NOT EXISTS races (
  id_race INT AUTO_INCREMENT PRIMARY KEY,
  name_race VARCHAR(32) NOT NULL
);

-- Tabla users
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fullname VARCHAR(32),
  email VARCHAR(32),
  password VARCHAR(64)
);

-- Tabla pets
CREATE TABLE IF NOT EXISTS pets (
  id_pets INT AUTO_INCREMENT PRIMARY KEY,
  name_pets VARCHAR(50),
  race_id INT,
  fk_categories INT,
  photo VARCHAR(64),
  gender_id INT,
  user_id INT,
  FOREIGN KEY (race_id) REFERENCES races(id_race),
  FOREIGN KEY (fk_categories) REFERENCES categories(id_category),
  FOREIGN KEY (gender_id) REFERENCES genders(id_gender),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
