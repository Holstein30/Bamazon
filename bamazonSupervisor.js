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
    supervisorPrompt();
});

function supervisorPrompt() {
    inquire.prompt([{
        type: "list",
        message: "Choose An Action",
        choices: ["View Products Sales By Department", "Create New Department"],
        name: "action"
    }]).then(function (answers) {
        chooseAction(answers.action);
    });
}

function chooseAction(action) {
    switch (action) {
        case "View Products Sales By Department":
            departmentSales();
            break;
        case "Create New Department":
            newDepartment();
            break;
    }
}

function departmentSales() {
    connection.query(
        "SELECT departments.department_id, departments.department_name, departments.over_head_costs, " +
        "SUM(product_sales) AS sum_sales, SUM(product_sales) - over_head_costs AS total_profit FROM products " +
        "RIGHT JOIN departments ON products.department_name = departments.department_name GROUP BY department_name ORDER BY department_id;",
        function (err, result) {
            if (err) throw err;
            console.log("|| Department ID || Department Name || Over Head Costs || Product Sales || Total Profit ||");
            for (var i in result) {
                console.log("|| " + result[i].department_id + "             || " + result[i].department_name +
                    "     || " + result[i].over_head_costs + "            || " + result[i].sum_sales +
                    "          || " + result[i].total_profit + "         ||");
            }
            setTimeout(finished, 5000);
        }
    )
}

function newDepartment() {
    inquire.prompt([{
        type: "input",
        message: "What is the department name? ",
        name: "department"
    }, {
        type: "input",
        message: "What is the Over Head Cost? ",
        name: "cost"
    }]).then(function (answers) {
        if (regex.test(answers.cost) && answers.department) {
            console.log("Inserting new department...\n");
            connection.query(
                "INSERT INTO departments SET ?", {
                    department_name: answers.department,
                    over_head_costs: answers.cost
                },
                function (err, res) {
                    console.log(res.affectedRows + " new department inserted!\n");
                    setTimeout(finished, 2500);
                }
            );
        } else {
            console.log("\nEnsure you used the X.xx cost format & Department name isn't blank\n");
            newDepartment();
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
            supervisorPrompt();
        } else {
            console.log("\nBamazon Supervisor signed out\n");
            connection.end();
        }
    });
}