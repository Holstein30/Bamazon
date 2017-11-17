var mysql = require("mysql");
var inquire = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    readData();
});

function readData() {
    console.log("Reading...");
    connection.query(
        "SELECT item_id, product_name, price FROM products",
        function (err, result) {
            if (err) throw err;
            for (var i in result) {
                console.log("Item ID: " + result[i].item_id + "   Product Name: " + result[i].product_name +
                    "   Price: " + result[i].price);
            }
            userPrompt();
        }
    )
}

function userPrompt() {
    inquire.prompt([{
        type: "input",
        message: "Choose the ID of which product you would like to purchase: ",
        name: "product"
    }, {
        type: "input",
        message: "How many units would you like to purchase?",
        name: "quantity"
    }]).then(function (answers) {
        if (answers.product % 1 === 0 && answers.quantity % 1 === 0) {
            checkStock(answers.product, answers.quantity);
        } else {
            console.log("\nUse only integers in your choices\n");
            userPrompt();
        }
    });
}

function checkStock(productID, quantity) {
    connection.query(
        "SELECT price, stock_quantity, product_sales FROM products WHERE ?", {
            item_id: productID
        },
        function (err, result) {
            if (err) throw err;
            if (quantity > result[0].stock_quantity) {
                console.log("Insufficient Stock for this Item!");
                continueShopping();
            } else {
                var totalPrice = parseFloat((result[0].price * quantity).toFixed(2));
                var newStock = result[0].stock_quantity - quantity;
                if (result[0].product_sales === "undefined") {
                    var currentSales = 0.00;
                } else {
                    var currentSales = result[0].product_sales;
                }
                var totalSales = totalPrice + currentSales;
                fulfillOrder(productID, totalPrice, newStock, totalSales);
            }
        });
}

function fulfillOrder(productID, totalPrice, newStock, totalSales) {
    console.log("Updating...\n");
    var query = connection.query(
        "UPDATE products SET ? WHERE ?", [{
                stock_quantity: newStock,
                product_sales: totalSales
            },
            {
                item_id: productID
            }
        ],
        function (err, res) {
            if (err) throw err;
        }
    );

    // console.log(query.sql);
    console.log("\nTotal Price: $" + totalPrice + "\n");
    setTimeout(continueShopping, 2500);
}

function continueShopping() {
    inquire.prompt([{
        type: "confirm",
        message: "Would you like to continue shopping?: ",
        name: "continue"
    }]).then(function (answers) {
        if (answers.continue) {
            userPrompt();
        } else {
            console.log("\nThank you for shopping with Bamazon!\n");
            connection.end();
        }
    });
}