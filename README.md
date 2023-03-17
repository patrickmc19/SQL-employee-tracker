# MySQL Employee Tracker

## Description

Your assignment this week is to build a command-line application from scratch to manage a company's employee database, using Node.js, Inquirer, and MySQL.

## User Story

```
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria

```
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database
```

## Video Tutorial



## What was my motivation?

To apply the concepts I learned on mysql including schema, seeds, tables, connecting to mysql, using dotenv encryption, foreign keys, primary keys, prepared statements, 

## Why did I build this project?

Because I enjoy learning about coding, improving my skills, and trying the topics we've covered in class. To better understand sql and how this could be utilized in a real world environment.

## What problem does it solve?

This helps companys easily manage large databases within 1 simple tool.

## What did you learn?

That you can assign a case to each inquirer option and run a function(s) based on what is selected.

## What makes your project stand out?

It uses dotenv to hide the details of my login credentials. The start menu uses switch case to allow for each option to have its own functions assigned.