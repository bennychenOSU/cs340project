-- CRUD for Employees

-- Read
SELECT * FROM Employees;

-- Insert
INSERT INTO Employees (employee_id, employee_name, title)
VALUES (:employee_id, :employee_name, :title);

-- Update employee name and title
UPDATE Employees 
SET employee_name = :employee_name, title = :title
WHERE employee_id = :employee_id;

-- Delete
DELETE FROM Employees
WHERE employee_id = :employee_id

-- CRUD for Customers

-- Read
SELECT * FROM Customers;

-- Insert
INSERT INTO Customers (customer_id, customer_name, city)
VALUES (:customer_id, :customer_name, :city);

-- Update customer name and city
UPDATE Customers
SET customer_name = :customer_name, city = :city
WHERE customer_id = :customer_id;

-- Delete
DELETE FROM Customers
WHERE customer_id = customer_id;

-- CRUD for Items

-- Read
SELECT * FROM Items;

-- Insert
INSERT INTO Items (item_id, category, brand, price)
VALUES (:item_id, :category, :brand, :price);

-- Update item category, brand, and price
UPDATE Items
SET category = :category, brand = :brand, price = :price
WHERE item_id = :item_id;

-- Delete
DELETE FROM Items
WHERE item_id = items_id;

-- CRUD for Stores
-- Read
SELECT * FROM Employees;

-- Insert
INSERT INTO Stores (store_id, city, store_size)
VALUES (:store_id, :city, :store_size);

-- Update store city and size
UPDATE Stores 
SET city = :city, store_size = :store_size
WHERE store_id = :store_id;

-- Delete
DELETE FROM Stores
WHERE store_id = :store_id

-- CRUD for Staffings (M:M relationship Employees and Stores)
-- Read
SELECT * from Staffings;

-- Insert
INSERT INTO Staffings (employee_id, store_id, hours_worked)
VALUES (:employee_id_from_dropdown, store_id_from_dropdown, :hours_worked);

-- Update
UPDATE Staffings
SET hours_worked = :hours_worked
WHERE employee_id = :employee_id_from_dropdown AND store_id = :store_id_from_dropdown;

-- DELETE
DELETE FROM Staffings
WHERE employee_id = :employee_id_from_dropdown AND store_id = :store_id_from_dropdown;

-- CRUD for Inventories (M:M relationship Items and Stores)

-- Read
SELECT * from Inventories;

-- Insert
INSERT INTO Inventories (item_id, store_id, quantity)
VALUES (:item_id_from_dropdown, store_id_from_dropdown, :quantity);

-- Update
UPDATE Inventories
SET quantity = :quantity
WHERE item_id = :item_id_from_dropdown AND store_id = :store_id_from_dropdown;

-- DELETE
DELETE FROM Inventories
WHERE item_id = :item_id_from_dropdown AND store_id = :store_id_from_dropdown;

-- CRUD for Sales

-- Read
SELECT * FROM Sales;

-- Insert
INSERT INTO Sales (sale_id, item_id, quantity, sales_total, employee_id, customer_id, store_id)
VALUES (sale_id = :sale_id, item_id = :item_id_from_dropdown, quantity = :quantity, 
sales_total = :sales_total, employee_id = employee_id_from_dropdown, customer_id = customer_id_from_dropdown,
store_id = store_id_from_dropdown);

-- Update
UPDATE Sales
SET item_id = :item_id_from_dropdown, quantity = :quantity, 
sales_total = :sales_total, employee_id = employee_id_from_dropdown, customer_id = customer_id_from_dropdown,
store_id = store_id_from_dropdown
WHERE sale_id = :sale_id;

-- DELETE
DELETE FROM Sales
WHERE sales_id = :sale_id;


