const mysql = require('mysql2');
const express = require('express');
const inquirer = require('inquirer');
const cTable = require('console.table');
const fs = require('fs');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const connection = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_db'
  }).promise();

const start = () => {
  inquirer.prompt({
    name: 'directory',
    type: 'list',
    message: 'Please select from the following options...',
    choices: [
      'View all departments',
      'View all roles',
      'View all employees',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Update employee role',
      'Update employee manager',
      'View employees by manager',
      'View employees by department',
      'Delete department',
      'Delete role',
      'Delete employee',
      'View total utilized budget by department',
      'Exit',
    ],
  })
    .then((answer) => {
      switch (answer.menu) {
        case 'View all departments':
          viewDepartments();
          break;
        case 'View all roles':
          viewRoles();
          break;
        case 'View all employees':
          viewEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update employee role':
          updateRole();
          break;
        case 'Update employee manager':
          updateManager();
          break;
        case 'View employees by manager':
          employeesByManager();
          break;
        case 'View employees by department':
          employeesByDepartment();
          break;
        case 'Delete department':
          deleteDepartment();
          break;
        case 'Delete role':
          deleteRole();
          break;
        case 'Delete employee':
          deleteEmployee();
          break;
        case 'View total utilized budget by department':
          departmentBudget();
          break;
        case 'Exit':
          connection.end();
          break;
        default:
          console.log(`Error running prompt: ${answer.directory}`);
          break;
      }
    });
};

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});