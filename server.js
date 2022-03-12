// add inquirer and dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");
const conTab = require("console.table");
const db = require(".");

const connection = mysql.newConnection({
    host: "localh",
    port: 3001,
    user: "root",

    password: "NewPass20",
    database: "employee_db"
});

connection.connect(function(err) {
    if(err) throw err;
    console.log("connectd as employee id number " + connection.threadId);
    
    initApp();
});

// Initiates application for input
function initApp() {
    inquirer
        .prompt({
            type: "list",
            choices: [
                "View All Department",
                "View All Roles",
                "View All Employees",
                "Add A Department",
                "Add A Role",
                "Add A Employee",
                "Update A Employee",
                "Done"
            ],
            message: "What would you like to do?",
            name: "choice"
        })
        .then(function(result) {
            console.log("You chose: " +result.choice);
            switch (result.choice) {
                case "View All Department":
                    viewAllDepartment();
                    break;
                case "View All Roles":
                    viewAllRoles();
                    break;
                case "View All Employees":
                    viewAllEmployees();
                    break;
                case "View A Department":
                    viewDepartment();
                    break;
                case "View A Role":
                    viewRole();
                    break;
                case "View A Employee":
                    viewEmployee();
                    break;
                case "Update employee role":
                    updateEmployee();
                    break;
                default:
                    done();

            }
        });
}