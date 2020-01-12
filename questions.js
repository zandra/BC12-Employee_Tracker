exports.actionChoices = [
  "View All Employees",
  "View All Employees By Department",
  "View All Employees By Manager",
  "View All Employees By Role",
  "Add Employee",
  "Remove Employee",
  "Update Employee Role",
  "Update Employee Manager",
  "Exit"
];
const rolesArr = [
"Sales Lead",
"Inside Sales",
"Marketing Content",
"Product Lead",
"Software Engineer"
];

const managerArr = [
  "Steve Rogers (CEO)",
  "Carol Danvers (CTO)",
  "Nick Fury (Head of Sales)",
  "Tony Stark (Head of Product)",
  "Pepper Potts (Product Manager)",
  "Gamora Ben Titan (Head of Marketing)",
  "Bruce Banner (Dev Manager)"
];

exports.departments = ['Operations', 'Product', 'Engineering', 'Sales', 'Marketing'];

exports.promptAction = {
  type: 'list',
  name: 'action',
  message: "What would you like to do?",
  choices: this.actionChoices
};

exports.promptDepartment =   
{
  type: 'list',
  name: 'departments',
  message: 'Select the department you would like to view',
  choices: this.departments
};

// Add Employee
exports.addEmployeeQuestions = [
  {
    type: 'input',
    name:'employeeFirst',
    message: 'What is the new employee\'s first name?',
  },
  {
    type: 'input',
    name: 'employeeLast',
    message: (answers) => `What is ${answers.employeeFirst}'s last name?`
  },
  {
    type: 'list',
    name: 'employeeRole',
    message: (answers) => `What is ${answers.employeeFirst} ${answers.employeeLast}'s role?`,
    choices: rolesArr
  },
  {
    type: 'list',
    name: 'employeeManager',
    message: (answers) => `Who is ${answers.employeeFirst} ${answers.employeeLast}'s manager?`,
    choices: managerArr
  }
];

exports.removeEmployee = 
{
  type: 'list',
  name: 'removeEmployee',
  message: 'Which employee would you like to remove?',
  choices: [1, 2]
};

exports.promptEmployeeUpdateRole = [
  {
    type: 'list',
    name: 'updateEmployeeRole',
    message: 'Which employee would you like to update?',
    choices: [1, 2]
  },
  {
    type: 'list',
    name: 'updateRole',
    message: 'Select the department you would like to view',
    choices: rolesArr
  }
];