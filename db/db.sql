CREATE DATABASE IF NOT EXISTS store;

use store;

CREATE TABLE products (
	id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	price DECIMAL(65, 2) NOT NULL,
	inventory_count INT(10) NOT NULL
);

describe products;
