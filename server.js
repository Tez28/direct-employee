// add inquirer and dependencies
const express = require('express');
const inquirer = require("inquirer");
const mysql = require("mysql2");
// const conTab = require("console.table");
const db = require("./db/db.sql");
const PORT = process.env.PORT || 3001;
const app = express();
// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// const connection = mysql.newConnection({
//     host: "localhost",
//     port: 3001,
//     user: "root",

//     password: "NewPass20",
//     database: "company"
// });

// connection.connect(function(err) {
//     if(err) throw err;
//     console.log("connectd as employee id number " + connection.threadId);
    
//     initApp();
// });

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
                    newDepartment();
                    break;
                case "View A Role":
                    newRole();
                    break;
                case "View A Employee":
                    newEmployee();
                    break;
                case "Update employee role":
                    updateEmployee();
                    break;
                default:
                    done();

            }
        });
}
// views all departments
function viewAllDepartment() {
    // select in db
    let query = "SELECT * FROM department";
    connection.query(query, function(err, res){
        if (err) throw err;
        console.table(res);
        startApp();
    });
}
// views all roles
function viewAllRoles() {
    let query = "SELECT * FROM role";
    connection.query(quer, function(err, res) {
        if (err) throw err;
        console.table(res);
        startApp();
    });
}

// views all employees
function viewAllEmployees() {
    // select in db
    let query = "SELECT * FROM employee";
    connection.query(query, function(err, res) {
      if (err) throw err;
      console.table(res);
      startScreen();
    });
}
// adds new department
function newDepartment() {
    inquirer.prompt({
        type: "input",
        message: "What is the new departments name? (Required)",
        name: "newDep"
    }).then(function(answer){
        connection.query("INSERT INTO department (name) VALUES (?)", [answer.newDep], function(err, res){
            if (err) throw err;
            console.table(res)
            startApp();
        })
    })
}
// adds new role
function newRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the new role? (Required)",
            name: "newRole",
        },
        {
            type: "input",
            message: "What is the total compensation for this role?",
            name: "totalComp"
        },
        {
            type: "input",
            message: "What is the new the roles department ID number?"
        }
    ]).then(function(answer) {
        connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.newRole, answer.totalComp, answer.depID], function(err, res) {
            if (err) throw err;
            console.table(res);
            startApp()
        });
    });
};
// adds new employee
function newEmployee() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is thew new emplpyees last name?",
            name: "firstNam"
        },
        {
            type: "input",
            message: "What is the new employees first name?",
            name: "lastNam"
        },
        {
            type: "input",
            message: "Wha is the employees ID number",
            name: "empId"
        },
        {
            type: "input",
            message: "What is the employees manager ID number?",
            name: "manId"
        }
    ]).then(function(answer) {
        connection.query("INSERT INTO employee (last_name, first_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.lastNam, answer.firstNam, answer.empId, answer.manId], function(err, res) {
            if (err) throw err;
            console.table(res);
            startApp();
        });
    });
}

function updateEmployee() {
    inquirer.prompt([
        {
            type: "input",
            message: "Which employee would you like to update?",
            name: "upEmp"
        },

        {
        type: "input",
        message: "What role do you want to update them to?",
        name: "upRole"
        }
    ]).then(function(answer) {
        connection.query("UPDATE employee SET role_id=? where LAST_NAME=?", [answer.UpRole, answer.UpEmp], function(err, res) {
            if (err) throw err;
            console.table(res);
            startApp();
        });
    });
}

function done() {
    connection.end();
    process.exit();
}
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});