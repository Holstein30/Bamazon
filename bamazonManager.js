var mysql = require("mysql");
var inquire = require("inquirer");

var regex = /^\d+(?:\.\d{0,2})$/;

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
    managerPrompt();
});

function managerPrompt() {
    inquire.prompt([{
        type: "list",
        message: "Choose An Action",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
        name: "action"
    }]).then(function (answers) {
        chooseAction(answers.action);
    });
}

function chooseAction(action) {
    switch (action) {
        case "View Products for Sale":
            forSale();
            break;
        case "View Low Inventory":
            lowStock();
            break;
        case "Add to Inventory":
            addStock();
            break;
        case "Add New Product":
            newProduct();
            break;
    }
}

function forSale() {
    connection.query(
        "SELECT * FROM products",
        function (err, result) {
            if (err) throw err;
            for (var i in result) {
                console.log("Item ID: " + result[i].item_id + "   Product Name: " + result[i].product_name +
                    "   Department: " + result[i].department_name + "   Price: " + result[i].price +
                    "   Stock: " + result[i].stock_quantity);
            }
            setTimeout(finished, 5000);
        }
    )
}

function lowStock() {
    var low = true;
    connection.query(
        "SELECT * FROM products",
        function (err, result) {
            console.log("\n** Stock Less Than 5 **\n")
            if (err) throw err;
            for (var i in result) {
                if (result[i].stock_quantity < 5) {
                    console.log("Item ID: " + result[i].item_id + "   Product Name: " + result[i].product_name +
                        "   Department: " + result[i].department_name + "   Price: " + result[i].price +
                        "   Stock: " + result[i].stock_quantity);
                    var low = false;
                }
            }
            if (low) {
                console.log("\nNone of the stocks are low\n");
            }
            setTimeout(finished, 5000);
        }
    )
}

function addStock() {
    inquire.prompt([{
        type: "input",
        message: "Which item would you like to add stock to? ",
        name: "product"
    }, {
        type: "input",
        message: "How much stock would you like to add? ",
        name: "quantity"
    }]).then(function (answers) {
        if (answers.product % 1 === 0 && answers.quantity % 1 === 0) {
            connection.query(
                "SELECT * FROM products",
                function (err, result) {
                    if (err) throw err;
                    var currentStock = result[answers.product - 1].stock_quantity;
                    console.log("Updating quantities...\n");
                    var query = connection.query(
                        "UPDATE products SET ? WHERE ?", [{
                                stock_quantity: parseInt(currentStock) + parseInt(answers.quantity)
                            },
                            {
                                item_id: answers.product
                            }
                        ],
                        function (err, res) {
                            if (err) throw err;
                            console.log(res.affectedRows + " stock updated!\n");
                            setTimeout(finished, 2500);
                        }
                    );
                }
            );
        } else {
            console.log("\nUse only integers in your choices\n");
            addStock();
        }
    });
}

function newProduct() {
    inquire.prompt([{
        type: "input",
        message: "What is the products name? ",
        name: "productName"
    }, {
        type: "input",
        message: "What department is this product in? ",
        name: "department"
    }, {
        type: "input",
        message: "How much does this product cost? ",
        name: "price"
    }, {
        type: "input",
        message: "How many units of this product do you have? ",
        name: "quantity"
    }]).then(function (answers) {
        if (regex.test(answers.price) && answers.quantity % 1 === 0) {
            console.log("Inserting new product...\n");
            var query = connection.query(
                "INSERT INTO products SET ?", {
                    product_name: answers.productName,
                    department_name: answers.department,
                    price: answers.price,
                    stock_quantity: answers.quantity
                },
                function (err, res) {
                    console.log(res.affectedRows + " new product inserted!\n");
                    setTimeout(finished, 2500);
                }
            );
        } else {
            console.log("\nEnsure you used the X.xx price format and that stock is an integer\n");
            newProduct();
        }
    });

}

function finished() {
    inquire.prompt([{
        type: "confirm",
        message: "Is there anything else you would like to do? ",
        name: "continue"
    }]).then(function (answers) {
        if (answers.continue) {
            managerPrompt();
        } else {
            console.log("\nBamazon Manager signed out\n");
            connection.end();
        }
    });
}