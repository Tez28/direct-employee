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

