const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
require("dotenv").config();

const connection = mysql.createConnection(
  {
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

connection.connect(() => {
  start();
});

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
      switch (answer.directory) {
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

const viewDepartments = () => {
  connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

const viewRoles = () => {
  connection.query('SELECT * FROM role', (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

const viewEmployees = () => {
  connection.query('SELECT * FROM employee', (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
};

const addDepartment = () => {
  inquirer.prompt([
    {
      name: 'name',
      type: 'input',
      message: 'What is the new department name?'
    }
  ])
    .then((answer) => {
      connection.query('INSERT INTO department SET ?', { dept_name: answer.name }, (err) => {
        if (err) throw err;
        console.log('New department was added!');
        start();
      });
    });
};

const addRole = () => {
  connection.query("SELECT id AS value, dept_name AS name FROM department", (err, data) => {
    inquirer.prompt([
      {
        name: 'name',
        type: 'input',
        message: 'What is the name of the new role?'
      },
      {
        name: 'salary',
        type: 'input',
        message: 'What is the salary for this role?'
      },
      {
        name: 'dept_id',
        type: 'list',
        message: 'What is the department id?',
        choices: data,
      }
    ])
      .then((answer) => {
        connection.query('INSERT INTO role SET ?', { title: answer.name, salary: answer.salary, department_id: answer.dept_id }, (err) => {
          if (err) throw err;
          console.log("New role was added!");
          start();
        })
      })
  })
};

const addEmployee = () => {
  connection.query("SELECT id AS value, concat(first_name,' ',last_name) AS name FROM employee", (err, data) => {
    connection.query("SELECT id AS value, title AS name FROM role", (err, roleData) => {
      inquirer.prompt([
        {
          name: 'first_name',
          type: 'input',
          message: 'What is the first name of the employee?',
        },
        {
          name: 'last_name',
          type: 'input',
          message: 'What is the last name of the employee?',
        },
        {
          name: 'role_id',
          type: 'list',
          message: 'What is the employees role ID?',
          choices: roleData,
        },
        {
          name: 'manager_id',
          type: 'list',
          message: 'Does the employee have a manager?',
          choices: data,
        }
      ])
        .then((answer) => {
          connection.query('INSERT INTO employee SET ?', { first_name: answer.first_name, last_name: answer.last_name, role_id: answer.role_id, manager_id: answer.manager_id }, (err) => {
            if (err) throw err;
            console.log('New employee was added!');
            start();
          })
        })
    })
  })
};