-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-05-2024 a las 05:06:29
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `pet_home`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id_category` int(11) NOT NULL,
  `name_category` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id_category`, `name_category`) VALUES
(15, 'nsndndn');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `genders`
--

CREATE TABLE `genders` (
  `id_gender` int(11) NOT NULL,
  `name_gender` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `genders`
--

INSERT INTO `genders` (`id_gender`, `name_gender`) VALUES
(1, 'macho'),
(3, 'femenino');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pets`
--

CREATE TABLE `pets` (
  `id_pets` int(11) NOT NULL,
  `nombre_pets` varchar(50) NOT NULL,
  `race_id` int(11) NOT NULL,
  `fk_categories` int(11) NOT NULL,
  `photo` varchar(64) NOT NULL,
  `gender_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pets`
--

INSERT INTO `pets` (`id_pets`, `nombre_pets`, `race_id`, `fk_categories`, `photo`, `gender_id`, `user_id`) VALUES
(11, 'pablo', 1, 15, '', 1, 5),
(12, '', 1, 0, '', 1, 5),
(13, '', 2, 14, '', 1, 5),
(14, '', 1, 0, '', 1, 2),
(17, 'juanda', 3, 15, 'img\\1716259523351-tabas.jpg', 3, 4),
(18, 'juanda', 3, 15, 'img\\1716260779800-temach.jpg', 3, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `races`
--

CREATE TABLE `races` (
  `id_race` int(11) NOT NULL,
  `name_race` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `races`
--

INSERT INTO `races` (`id_race`, `name_race`) VALUES
(1, 'macho'),
(2, 'macho'),
(3, 'gato'),
(5, 'Labrador'),
(6, 'Bulldog'),
(7, 'Siames'),
(8, 'Persa'),
(9, 'nana'),
(10, 'hoal');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullname` varchar(32) DEFAULT NULL,
  `email` varchar(32) DEFAULT NULL,
  `password` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `fullname`, `email`, `password`) VALUES
(1, 'Pablo', 'perdomo@gmail.com', '1234'),
(2, 'Juan', 'juan@example.com', 'contraseña123'),
(3, 'Juan', 'juan@example.com', 'contraseña123'),
(4, NULL, 'juan@example.com', '$2b$10$lypGdosueuMQGmk8p5dzrOlP15IZYw5lAowvqLVd6HxJWhO/oeVEy'),
(5, NULL, 'pablo@example.com', '$2b$10$8SYMuLAqmDAJn7YaelpCWe66ukRIV/8SMgYXiC2haEe8Dd3eOynH.'),
(6, 'Juan Pérez', 'juan@example.com', '$2b$10$0H0bFzlDn.RYx2ubCxb5EeZPPAcv21WnC1Ul9Q9JEwqcDVFrUxww2'),
(7, 'caros', 'as@example.com', '$2b$10$.g.ydSSrQ3Sv4YQ.9RcMGO7mSx4ywqznQzt.gFESoUCXeQ9YoEQPm'),
(8, 'hoa', 'a@gmail.com', '$2b$10$rwMYLXGAkAsxvGSumq8n3ejKLYOi4fAT1mHpGkqoWSfclZn5.Smga');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id_category`);

--
-- Indices de la tabla `genders`
--
ALTER TABLE `genders`
  ADD PRIMARY KEY (`id_gender`);

--
-- Indices de la tabla `pets`
--
ALTER TABLE `pets`
  ADD PRIMARY KEY (`id_pets`),
  ADD KEY `fk_pets_race` (`race_id`),
  ADD KEY `fk_pets_category` (`fk_categories`),
  ADD KEY `fk_pets_gender` (`gender_id`),
  ADD KEY `fk_pets_user` (`user_id`);

--
-- Indices de la tabla `races`
--
ALTER TABLE `races`
  ADD PRIMARY KEY (`id_race`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id_category` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `genders`
--
ALTER TABLE `genders`
  MODIFY `id_gender` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `pets`
--
ALTER TABLE `pets`
  MODIFY `id_pets` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `races`
--
ALTER TABLE `races`
  MODIFY `id_race` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `pets`
--
ALTER TABLE `pets`
  ADD CONSTRAINT `fk_pets_category` FOREIGN KEY (`fk_categories`) REFERENCES `categories` (`id_category`),
  ADD CONSTRAINT `fk_pets_gender` FOREIGN KEY (`gender_id`) REFERENCES `genders` (`id_gender`),
  ADD CONSTRAINT `fk_pets_race` FOREIGN KEY (`race_id`) REFERENCES `races` (`id_race`),
  ADD CONSTRAINT `fk_pets_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
