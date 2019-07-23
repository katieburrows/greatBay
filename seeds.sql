DROP DATABASE IF EXISTS greatBayDB;

CREATE DATABASE greatBayDB;

USE greatBayDB;

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT,
    itemName VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2),
    PRIMARY KEY(id)
);

INSERT INTO products (itemName, category, price) 
VALUES ("Commemorative Princess Diana Beanie Baby", "Collectables", 50000.00),
("Jurassic Park 6-Pog Hologram Set With Slammer", "Collectables", 1000000.00),
("Kid Cuisine Furby", "Collectables", 200.00), 
("Foot Rub", "Service", 3.00), 
("Lawn Mowing", "Service", 25.00), 
("Dinner Chef", "Service", 200.00), 
("My MacBook Pro from college", "Item", 10.00), 
("Broken mirror", "Item", 5.00), 
("Landscaping gravel", "Item", 400.00); 