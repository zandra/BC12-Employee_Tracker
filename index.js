const mysql = require('mysql');
const inquirer = require('inquirer');
const query = require('./query');
const questions = require('./questions');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'saturdaybonnet',
  database: 'employees_db'
});

async function go() {
  try {
    const answers = await inquirer.prompt(questions.promptAction);
    
    switch (answers.action) {
      case  "View All Employees":
        connection.query(query.employees, (err,res) => {
          if (err) throw err;
          console.table(res);
        });
        break;
      case 'View All Employees By Department':
        const answers = await inquirer.prompt(questions.promptDepartment);
        connection.query(query.employeeByDepartment, `${answers.departments}`, (err, res) => {
          if (err) throw err;
          console.table(res);
        });
        break;
      case "Add Employee": // TODO Normalize input?
        const {employeeFirst, employeeLast, employeeRole, employeeManager} = await inquirer.prompt(questions.addEmployeeQuestions);
        const [managerFirst, managerLast] = employeeManager.split(" ").slice(0, 2);
        connection.query(query.insertEmployee(employeeFirst, employeeLast, employeeRole, managerFirst, managerLast), (err, res) => {
          if (err) throw err;
          console.log(res);
          console.log(`Employee ${employeeFirst} ${employeeLast} successfully created!`);
        });
        break;
      case "Remove Employee":
      case "Update Employee Role":
      case "Update Employee Manager":
        // turn into promise https://www.npmjs.com/package/mysql2
        const employeeList = connection.query(query.eligibleEmployeeList, (err,res) => {
          if (err) throw err;
          const emp = res.map(result => result.employee);
          return emp;
        });
        let a = await inquirer.prompt({
          type: 'list',
          name: 'removeEmployee',
          message: 'Which employee would you like to remove?',
          choices: employeeList
        });
        break;
      case "Exit":
      default:
        console.log("Goodbye");
        connection.end();
        break;
     }
     console.log("Here you go!!");
     connection.end();

  } catch(error) {
    console.log("Error");
  }
    
}

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    console.log('hello!');
    go();
  });

