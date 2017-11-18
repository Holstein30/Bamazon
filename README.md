# Bamazon

Amazon-like storefront using mySQL and Node.js

## Demo Video

https://youtu.be/Pmtoe-WZ3r8

## Customer View
1. First you are shown a list of current products for sale
2. Look through the list and decide which product to purchase then 
type in the corresponding ID for which item you want to purchase (this must be an integer)
3. Next enter the amount of this product you would like to purchase (this must be an integer)
4. If enough stock is available for your chosen item then you will be shown the total price

## Manager  View
1. First you are given 4 options: View Products, Check Low Stock, Add Stock, & Add New Product

### View Products
    1. If this option is chosen you are shown a full table of products

### Check Low Stock
    1. If this option is chosen you are shown which stocks have less than 5 units left

### Add Stock
    1. First figure out the ID for which product you would like to add stock to (this must be an integer)
    2. Then decide how much stock you would like to add (this must be an integer)
    3. If successful you will see stock updated in the console
    4. You can double check that this was successful by running the View Products option again (or the
    Check Low Stock option if the stock was low originally and you were fixing that)

### Add New Product
    1. First enter the name of the new product
    2. Next enter the department that the product is in
    3. Then enter the price of the product (must be in a X.xx format)(can be XXXXX.xx just as long as there are only two decimal points)
    4. Finally enter the stock quantity of the product (this must be an integer)
    5. If successful you will see that 1 new item was added in the console
    6. You can double check if the item went into the table by running the View Products option again

## Supervisor View
1. You are given two choices: View Sales, Add Department

### View Sales
    1. If this option is shown you will get a table of the sales data for all departments

### Add Department
    1. First enter the name of the department you are adding
    2. Next enter the over head costs of this department
    3. If successful you will see new department added in the console
    4. You can double check this by running the View Sales option again

