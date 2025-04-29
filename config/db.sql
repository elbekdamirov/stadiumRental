-- Active: 1745317111693@@127.0.0.1@3306@rent_stadium

CREATE DATABASE rent_stadium

show DATABASES

SHOW TABLES

DROP TABLE users

CREATE TABLE `users`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `role` ENUM('owner', 'customer', 'admin') NOT NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255),
    `email` VARCHAR(50) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(15) NOT NULL
);
CREATE TABLE `stadium`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `location` VARCHAR(50) NOT NULL,
    `description` TEXT,
    `price` DECIMAL(15,2) NOT NULL,
    `owner_id` INT NOT NULL
);
CREATE TABLE `booking`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `stadion_id` INT UNSIGNED NOT NULL,
    `user_id` INT UNSIGNED NOT NULL,
    `booking_date` DATE NOT NULL,
    `start_time` VARCHAR(10) NOT NULL,
    `end_time` VARCHAR(10) NOT NULL,
    `total_price` DECIMAL(15,2) NOT NULL,
    `status` ENUM('PENDING', 'CANCELLED', 'CONFIRMED', 'PAID') NOT NULL
);


CREATE TABLE `payment`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `booking_id` BIGINT UNSIGNED NOT NULL,
    `amount` DECIMAL(15,2) NOT NULL,
    `payment_time` DATETIME NOT NULL,
    `payment_method` ENUM('CARD', 'CASH', 'ONLINE') NOT NULL
);
CREATE TABLE `review`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `stadion_id` INT UNSIGNED NOT NULL,
    `user_id` INT UNSIGNED NOT NULL,
    `rating` SMALLINT NOT NULL,
    `comment` VARCHAR(255) NOT NULL
);
CREATE TABLE `images`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `stadion_id` INT UNSIGNED NOT NULL,
    `image_url` VARCHAR(255) NOT NULL
);

SHOW TABLES

SELECT u.first_name, u.phone, s.name, i.image_url FROM users u
LEFT JOIN stadium s ON u.id = s.owner_id
LEFT JOIN images i ON s.id = i.stadion_id
WHERE first_name="Ali" AND last_name = "Karimov"

SELECT u.first_name, u.last_name, s.name, b.booking_date FROM booking b
LEFT JOIN stadium s ON b.stadion_id = s.id
LEFT JOIN users u ON b.user_id = u.id
WHERE b.booking_date BETWEEN "2025-03-01" AND "2025-04-28"
AND s.name LIKE '%Arena'

SELECT * FROM booking

SELECT u.first_name, u.phone, s.name, r.rating, r.comment FROM users u
LEFT JOIN review r ON r.user_id = u.id
LEFT JOIN stadium s ON s.id = r.stadion_id
WHERE phone="998911234567"

SELECT s.name, s.location, s.price, b.start_time, b.end_time FROM stadium s
LEFT JOIN booking b ON b.stadion_id = s.id
WHERE 3000 <= price <= 5000 AND end_time - start_time >= 2

DROP PROCEDURE IF EXISTS getAllUsers

CREATE PROCEDURE IF NOT EXISTS getAllUsers()
BEGIN
    SELECT * FROM users;
END

CALL getAllUsers

CREATE PROCEDURE IF NOT EXISTS getUserById(IN userId INT)
BEGIN
    SELECT * FROM users WHERE id = userId;
END

CALL `getUserById`(2)

CREATE PROCEDURE IF NOT EXISTS getUserName(IN userId INT, OUT userName VARCHAR(50))
BEGIN
    SELECT first_name into userName FROM users WHERE id = userId;
END

CALL `getUserName`(2, @userName)

SELECT @userName

CREATE PROCEDURE IF NOT EXISTS res_out(INOUT res INT)
BEGIN
    SET res = res - 10;
END

SET @res=100

CALL res_out(@res)

SELECT @res


CREATE PROCEDURE IF NOT EXISTS stadium_out(INOUT res INT)
BEGIN
    SET res = res + 100;
END



CALL stadium_out(@res);

SELECT @res;


SELECT @res



CREATE FUNCTION if NOT EXISTS myFUNC1() RETURNS INT DETERMINISTIC
BEGIN
    DECLARE sum INT DEFAULT 0;
    SELECT COUNT(*) INTO sum  FROM stadium;
    RETUrn sum;
END

SELECT `myFUNC1`()