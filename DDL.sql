-- Group 198 Benny Chen, Brenden Covington, Colin Chillingworth
SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- Table structure for Stores
DROP TABLE IF EXISTS Stores;

CREATE TABLE Stores (
    store_id INT AUTO_INCREMENT NOT NULL,
    city VARCHAR(45) NOT NULL,
    store_size INT NOT NULL, 
    PRIMARY KEY(store_id)
);


DROP TABLE IF EXISTS Items;
-- Table structure for Items
CREATE TABLE Items (
    item_id INT AUTO_INCREMENT NOT NULL,
    category VARCHAR(45) NOT NULL,
    brand VARCHAR(45) NOT NULL,
    price DECIMAL(12, 2) NOT NULL,
    PRIMARY KEY(item_id)
);


DROP TABLE IF EXISTS Employees;
-- Table structrue for Items
CREATE TABLE Employees (
    employee_id INT AUTO_INCREMENT not NULL,
    employee_name VARCHAR(45) NOT NULL,
    title VARCHAR(45) NOT NULL,
    PRIMARY KEY(employee_id)
); 

DROP TABLE IF EXISTS Customers;
-- Table structure for Customers
CREATE TABLE Customers (
    customer_id INT AUTO_INCREMENT NOT NULL,
    customer_name VARCHAR(45) NOT NULL,
    city VARCHAR(45),
    PRIMARY KEY(customer_id)
);



DROP TABLE IF EXISTS Sales;
-- Table Structure for Sales
CREATE TABLE Sales (
    sale_id INT AUTO_INCREMENT NOT NULL, 
    quantity INT,
    sales_total INT, 
    store_id INT,
    item_id INT,
    customer_id INT, 
    employee_id INT,
    PRIMARY KEY(sale_id),
    CONSTRAINT FK_Sales_store_id FOREIGN KEY(store_id) REFERENCES Stores(store_id) ON DELETE CASCADE,
    CONSTRAINT FK_Items_item_id FOREIGN KEY(item_id) REFERENCES Items(item_id) ON DELETE CASCADE,
    CONSTRAINT FK_Customers_customer_id FOREIGN KEY(customer_id) REFERENCES Customers(customer_id) ON DELETE CASCADE,
    CONSTRAINT FK_Employees_employee_id FOREIGN KEY(employee_id) REFERENCES Employees(employee_id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS Staffings;
-- Table structure for Staffings
CREATE TABLE Staffings (
    employee_id INT NOT NULL,
    store_id INT NOT NULL,
    hours_worked INT,
    PRIMARY KEY (employee_id, store_id),
    CONSTRAINT FK_Staffings_employee_id FOREIGN KEY(employee_id) REFERENCES Employees(employee_id) ON DELETE CASCADE,
    CONSTRAINT FK_Staffings_store_id FOREIGN KEY(store_id) REFERENCES Stores(store_id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS Inventories;
-- Table structure for Inventories
CREATE TABLE Inventories (
    item_id INT NOT NULL,
    store_id INT NOT NULL,
    quantity INT,
    PRIMARY KEY(item_id, store_id),
    CONSTRAINT FK_Inventories_item_id FOREIGN KEY(item_id) REFERENCES Items(item_id) ON DELETE CASCADE,
    CONSTRAINT FK_Inventories_store_id FOREIGN KEY(store_id) REFERENCES Stores(store_id) ON DELETE CASCADE
);




INSERT INTO Employees (employee_name, title)
VALUES ('Josh Smith', 'Manager'),
('James Russell', 'Janitor'),
('Jane Rowling', 'Cashier'); 


INSERT INTO Customers (customer_name, city)
VALUES ('Austin Smith', 'Austin'),
('Janet Wong', 'Dallas'),
('Chris Simpson', 'Houston');

INSERT INTO Stores (city, store_size)
VALUES ('Austin', 40000),
('Dallas', 70000),
('Houston', 45000);


INSERT INTO Items (category, brand, price)
VALUES ('electronics', 'Sorny', 500.00),
('food', 'Pingles', 3.00),
('food', 'Crisps', 4.00),
('household', 'Clean', 25.00),
('office', 'Dunder Mifflin', 10.00);


INSERT INTO Staffings (employee_id, store_id, hours_worked)
VALUES (1, 1, 1500),
(1, 3, 500),
(2, 3, 1700),
(3, 1, 1300),
(3, 2, 700);

INSERT INTO Inventories (item_id, store_id, quantity)
VALUES (2, 1, 35),
(2, 2, 12),
(2, 3, 17),
(1, 1, 5),
(5, 2, 120),
(5, 1, 80); 

INSERT INTO Sales (item_id, quantity, sales_total, employee_id, customer_id, store_id)
VALUES(3, 7, 28, 2, 2, 2),
(2, 5, 15, 2, 2, 2),
(2, 3, 9, 1, 1, 3),
(4, 2, 50, 1, 1, 3),
(5, 30, 300, 3, 3, 1);

SELECT * FROM Stores;
SELECT * FROM Items;
SELECT * FROM Sales;
SELECT * FROM Employees;
SELECT * FROM Customers;
SELECT * FROM Staffings;
SELECT * FROM Inventories;




SET FOREIGN_KEY_CHECKS=1;
COMMIT; 
