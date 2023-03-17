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
  connection.query("SELECT id AS value, concat(first_name,' ',last_name) AS name FROM employee", (err, employeeData) => {
    connection.query("SELECT id AS value, title AS name FROM role", (err, roleData) => {
      inquirer.prompt([
        {
          name: 'first',
          type: 'input',
          message: 'What is the first name of the employee?',
        },
        {
          name: 'last',
          type: 'input',
          message: 'What is the last name of the employee?',
        },
        {
          name: 'role',
          type: 'list',
          message: 'What is their role?',
          choices: roleData,
        },
        {
          name: 'manager',
          type: 'list',
          message: 'Does the employee have a manager?',
          choices: employeeData,
        }
      ])
        .then((answer) => {
          connection.query('INSERT INTO employee SET ?', { first_name: answer.first, last_name: answer.last, role_id: answer.role, manager_id: answer.manager }, (err) => {
            if (err) throw err;
            console.log('New employee was added!');
            start();
          })
        })
    })
  })
};

const updateRole = () => {
  connection.query("SELECT id AS value, concat(first_name,' ',last_name) AS name FROM employee", (err, employeeData) => {
    connection.query("SELECT id AS value, title AS name FROM role", (err, roleData) => {
      inquirer.prompt([
        {
          name: "employee",
          type: "list",
          message: "Select an employee...",
          choices: employeeData,
        },
        {
          name: "role",
          type: "list",
          message: "What is their new role?",
          choices: roleData,
        },
      ])
      .then((answer) => {
        connection.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [answer.role, answer.employee], (err) => {
          if (err) throw err;
          console.log('Employee role updated!');
          start();
        })
      })
    })
  })
};