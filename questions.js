exports.actionChoices = [
  "View All Employees",
  "View All Employees By Department",
  "View All Employees By Manager",
  "Add Employee",
  "Remove Employee",
  "Update Employee Role",
  "Update Employee Manager",
  "View Executive Team",
  "EXIT"
];
exports.rolesArr = [
"Sales Lead",
"Inside Sales",
"Marketing Content",
"Product Lead",
"Software Engineer"
];

exports.managerArr = [
  "Steve Rogers (CEO)",
  "Carol Danvers (CTO)",
  "Nick Fury (Head of Sales)",
  "Gamora Ben Titan (Head of Marketing)",
  "Tony Stark (Head of Product)",
  "Pepper Potts (Product Manager)",
  "Bruce Banner (Dev Manager)",
  "T'Challa (Dev Ops)" 
];

exports.departments = ['Operations', 'Product', 'Engineering', 'Sales', 'Marketing'];
// 
exports.promptAction = {
  type: 'list',
  name: 'action',
  message: "What would you like to do? (Select EXIT to end)",
  choices: this.actionChoices
};
exports.promptManager = {
  type: 'list',
  name: 'manager',
  message: 'Select the manager you would like to view',
  choices: this.managerArr
};

exports.promptDepartment = {
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
    message: 'What is the new employee\'s FIRST name?',
  },
  {
    type: 'input',
    name: 'employeeLast',
    message: (answers) => `What is ${answers.employeeFirst}'s LAST name?`
  },
  {
    type: 'list',
    name: 'employeeRole',
    message: (answers) => `What is ${answers.employeeFirst} ${answers.employeeLast}'s role?`,
    choices: this.rolesArr
  },
  {
    type: 'list',
    name: 'employeeManager',
    message: (answers) => `Who is ${answers.employeeFirst} ${answers.employeeLast}'s manager?`,
    choices: this.managerArr
  }
];