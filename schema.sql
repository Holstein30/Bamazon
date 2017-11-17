DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products
(
    item_id INT NOT NULL
    AUTO_INCREMENT,
    product_name VARCHAR
    (100) NULL,
    department_name VARCHAR
    (100) NULL,
    price DECIMAL
    (19, 2) NULL,
    stock_quantity INT NULL,
    product_sales DECIMAL
    (19, 2) NULL,
    PRIMARY KEY
    (item_id)
);
    CREATE TABLE departments
    (
        department_id INT NOT NULL
        AUTO_INCREMENT,
    department_name VARCHAR
        (100) NULL,
    over_head_costs DECIMAL
        (19,2) NULL,
    PRIMARY KEY
        (department_id)
);
        INSERT INTO products
            (product_name, department_name, price, stock_quantity)
        VALUES
            ("Product1", "Department1", 1.99, 10);
        INSERT INTO products
            (product_name, department_name, price, stock_quantity)
        VALUES
            ("Product2", "Department2", 2.99, 20);
        INSERT INTO products
            (product_name, department_name, price, stock_quantity)
        VALUES
            ("Product3", "Department3", 3.99, 30);
        INSERT INTO products
            (product_name, department_name, price, stock_quantity)
        VALUES
            ("Product4", "Department4", 4.99, 40);
        INSERT INTO products
            (product_name, department_name, price, stock_quantity)
        VALUES
            ("Product5", "Department5", 5.99, 50);
        INSERT INTO products
            (product_name, department_name, price, stock_quantity)
        VALUES
            ("Product6", "Department6", 6.99, 60);
        INSERT INTO products
            (product_name, department_name, price, stock_quantity)
        VALUES
            ("Product7", "Department7", 7.99, 70);
        INSERT INTO products
            (product_name, department_name, price, stock_quantity)
        VALUES
            ("Product8", "Department8", 8.99, 80);
        INSERT INTO products
            (product_name, department_name, price, stock_quantity)
        VALUES
            ("Product9", "Department9", 9.99, 90);
        INSERT INTO products
            (product_name, department_name, price, stock_quantity)
        VALUES
            ("Product10", "Department10", 10.99, 100);
        INSERT INTO departments
            (department_name, over_head_costs)
        VALUES("Department1", 1000.00);
        INSERT INTO departments
            (department_name, over_head_costs)
        VALUES("Department2", 2000.00);
        INSERT INTO departments
            (department_name, over_head_costs)
        VALUES("Department3", 3000.00);
        INSERT INTO departments
            (department_name, over_head_costs)
        VALUES("Department4", 4000.00);
        INSERT INTO departments
            (department_name, over_head_costs)
        VALUES("Department5", 5000.00);
        SELECT *
        FROM products;


