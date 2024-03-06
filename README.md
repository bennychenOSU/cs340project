# cs340project

#Team Members: Benny Chen, Brenden Covington, Colin Chillingworth
Project Title: General Goods Inc.,
Step 1: Project Proposal, Outline, ERD

Overview
General Goods Inc., is a newer retailer that is developing a database for business intelligence in the pursuit of growth for their budding business. Being a limited selection general goods store, General Goods Inc. needs this database in order to track its best performing employees, and to analyze which products of theirs sell the best in order to properly stock these items. The corporation consists of 10 stores, 10 employees, and offers a variety of 20 items with annual sales revenue of $15,000,000. It is setting up a database driven website to record data about inventory levels mapping Items to Stores, Sales to Customers, Staffing levels of Employees to Stores, and Customers in order to drive this expansion. This database is to be developed over the course of the next 8 weeks, with progress checks due roughly once a week.

Database Outline
Stores: records details about its stores.
store_id: int, auto_increment, unique, not NULL, PK
city: varChar(45), not NULL
store_size: int, not NULL
Relationship: M:N relationship with Items is implemented with an intersection table Inventories with (store) id and (item) id as foreign keys in Inventories. Stores can have multiple items and items can be in multiple stores.
Relationship: M:N relationship with Employees is implemented with an intersection table Staffings with (store) id and (employee) id as foreign keys in Staffings. Stores can have multiple employees and employees can work at multiple stores. 
Relationship: 1:M with Sales implemented with (store) id as a foreign key in Sales.
Items: records details on all items carried by General Goods Inc.
item_id: int, auto_increment, not NULL, PK
category: varChar(45), not NULL
brand: varChar(45), not NULL
price: int, not NULL
Relationship: 1:M relationship with Sales is implemented with (item) id as a foreign key in Sales. An item can be involved in multiple sales.
Relationship: M:N relationship with Items is implemented with an intersection table Inventories with (store) id and (item) id as foreign keys in Inventories. Stores can have multiple items and items can be in multiple stores.
Sales: records sales data
sale_id: int, auto_increment, not NULL PK
quantity: int
sale_total: int
store_id: int FK
item_id: int, FK
customer_id: int, FK
employee_id: int, FK
Relationship: M:1  with Employees is implemented with (employee) id as a foreign key in Sales. One employee can have multiple sales.
Relationship: M:1 relationship with Items  is implemented with (item) id as a foreign key in Sales. An item can be involved in multiple sales. 
Relationship: M:1 with Stores implemented with (store) id as a foreign key in Sales.
Relationship: M:1 with Customers implemented with (customer) id as a foreign key in Sales. One customer can be involved in multiple sales.
Employees: records employee information
employee_id: int, auto_increment, not NULL, PK
employee_name: varChar(45) not NULL
title: varChar(45) 
Relationship: 1:M with Sales is implemented with (employee) id as a foreign key in Sales. One employee can have multiple sales.
Relationship: M:N relationship with Employees is implemented with an intersection table Staffings with (store) id and (employee) id as foreign keys in Staffings. Stores can have multiple employees and employees can work at multiple stores. 
Customers: records customer data. 
customer_id: int, auto_increment, not NULL, PK
customer_name:  varChar(45) not NULL
city: varChar(45)
Relationship: 1:M with Sales implemented with (customer) id as a foreign key in Sales. One customer can be involved in multiple sales.
Staffings: records which stores employees are working in.
employee_id: int, NOT NULL, FK
store_id: int, NOT NULL, FK
hours_worked: int
Inventories: records store inventory.
item_id: int, NOT NULL, FK
store_id: int, NOT NULL, FK
quantity: int







ER Diagram





Schema
 




Sample Data
Stores


Items


Sales


Employees


Customers







Staffings


Inventories


Upgrades to the Draft Version Based on Previous Feedback
Attributes changed to singular to stay consistent with naming schemes
Sales_id now primary key for Sales table
Added NOT NULL to name attributes of Employees and Customers tables
No changes needed for the schema to be 2NF.
Updated Schema diagram, so no lines are covered. 

No further changes were made to the design, as the only criticism received was that the primary key ID names were plural, but no such naming pattern was found on review with all ID tags being singular.
