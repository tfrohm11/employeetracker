
const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");


const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "YOURPASSWORD",
  database: "employer_trackerDB"
});

connection.connect(function (err) {
  if (err) throw err;
  mainMenu();
});

function mainMenu() {
  inquirer
    .prompt({
      type: "list",
      name: "mainMenu",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Departments",
        "View All Roles",
        "Add Employee",
        "Add Department",
        "Add Role",
        "Update Employee Role",
        "Exit"
      ]
    })
    .then(function (answer) {
      switch (answer.mainMenu) {
        case "View All Employees":
          viewAllEmployees();
          break;

        case "View All Departments":
          viewAllDepartments();
          break;

        case "View All Roles":
          viewAllRoles();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Add Department":
          addDepartment();
          break;

        case "Add Role":
          addRole();
          break;

        case "Update Employee Role":
          updateEmployeeRole();
          break;

        case "Exit":
          connection.end();
          break;
      }
    });
}

function viewAllEmployees() {
  const query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name AS department, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department on role.department_id = department.id"
  connection.query(query, function (err, res) {
    console.table(res);
    mainMenu();
  });
}

function viewAllDeptartments() {
  const query = "SELECT * FROM department"
  connection.query(query, function (err, res) {
    console.table(res);
    mainMenu();
  });
}

function viewAllRoles() {
  const query = "SELECT * FROM role"
  connection.query(query, function (err, res) {
    console.table(res);
    mainMenu();
  });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the employee's first name",
        name: "firstName"
      },
      {
        type: "input",
        message: "Enter the employee's last name",
        name: "lastName"
      },
      {
        type: "input",
        message: "Enter the employee's role ID",
        name: "addEmployRole"
      },
      {
        type: "input",
        message: "Enter the employee's manager ID",
        name: "addEmployMan"
      }
    ])
    .then(function (res) {
      const firstName = res.firstName;
      const lastName = res.lastName;
      const employRoleID = res.addEmployRole;
      const employManID = res.addEmployMan;
      const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", "${employRoleID}", "${employManID}")`;
      connection.query(query, function (err, res) {
        if (err) {
          throw err;
        }
        console.table(res);
        mainMenu();
      });
    });
}

function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      message: "Enter the name of the new department",
      name: "newDepartment"
    })
    .then(function (res) {
      const newDepartment = res.newDepartment;
      const query = `INSERT INTO department (department_name) VALUES ("${newDepartment}")`;
      connection.query(query, function (err, res) {
        if (err) {
          throw err;
        }
        console.table(res);
        mainMenu();
      });
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter employee title",
        name: "roleTitle"
      },
      {
        type: "input",
        message: "Enter employee salary",
        name: "roleSalary"
      },
      {
        type: "input",
        message: "Enter employee department ID",
        name: "roleDepartment"
      }
    ])
    .then(function (res) {
      const title = res.roleTitle;
      const salary = res.roleSalary;
      const departmentID = res.roleDepartment;
      const query = `INSERT INTO role (title, salary, department_id) VALUES ("${title}", "${salary}", "${departmentID}")`;
      connection.query(query, function (err, res) {
        if (err) {
          throw err;
        }
        console.table(res);
        mainMenu();
      });
    });
}

function updateEmployeeRole() {
    inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the employee's ID that you want to have updated",
        name: "updateEmploy"
      },
      {
        type: "input",
        message: "Enter the new role ID for employee",
        name: "newRole"
      }
    ])
    .then(function (res) {
        const updateEmploy = res.updateEmploy;
        const newRole = res.newRole;
        const queryUpdate = `UPDATE employee SET role_id = "${newRole}" WHERE id = "${updateEmploy}"`;
        connection.query(queryUpdate, function (err, res) {
          if (err) {
            throw err;
          }
          console.table(res);
          mainMenu();
        })
      });
    }


