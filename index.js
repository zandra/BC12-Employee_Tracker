const mysql = require('mysql2/promise');
const inquirer = require('inquirer');
const query = require('./query');
const questions = require('./questions');

// The pool does not create all connections upfront but creates them on demand
// until the connection limit is reached. You can use the pool in the same way
// as connections (using pool.query() and pool.execute()):
// You can use the pool in the same way as connections (using pool.query() and pool.execute()):
// https://www.npmjs.com/package/mysql2#using-connection-pools
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'saturdaybonnet',
  database: 'employees_db',
  waitForConnections: true,
  connectionLimit: 4,
  queueLimit: 0
});

async function go() {

  // List of employees eligible for update => answer choices for Remove & Update Employee
  const getEmployeeList = await pool.query(query.eligibleEmployeeList);
  const employeeList = getEmployeeList[0].map(e => e.employee);

  try {
    // Actions controller
    const actions = await inquirer.prompt(questions.promptAction);
    
    switch (actions.action) {
      case "View Executive Team":
        const executives = await pool.query(query.executiveTeam);
        console.table(executives[0]);
        break;
      case  "View All Employees":
        const employees = await pool.query(query.employees);
        console.table(employees[0]);
        break;
      case 'View All Employees By Department':
        const { departments } = await inquirer.prompt(questions.promptDepartment);
        const employeeByDept = await pool.query(query.employeeByDepartment, [departments]);
        console.table(employeeByDept[0]);
        break;
      case 'View All Employees By Manager':
        const managerAnswer = await inquirer.prompt(questions.promptManager);
        let [managerName, manX] = managerAnswer.manager.split(" (");
        console.log(managerName);
        const empByMan = await pool.query(query.employeeByManager, [managerName]);
        console.table(empByMan[0]);
        break;
      case "Add Employee": // TODO Normalize input (capitalization)?
        const {employeeFirst, employeeLast, employeeRole, employeeManager} = await inquirer.prompt(questions.addEmployeeQuestions);
        let [managerFirst, managerLast] = employeeManager.split(" ").slice(0, 2);
        const addEmployee = await pool.execute(query.insertEmployee, [employeeFirst, employeeLast, employeeRole, managerFirst, managerLast]);
          if(addEmployee[0].affectedRows === 0 ) {
              console.log("There was an error creating your new employee. Please try again.");
            }
            console.log(`Employee ${employeeFirst} ${employeeLast} successfully created! ✅`);
        break;   
      case "Remove Employee":
        const { removeEmployee } = await inquirer.prompt({
          type: 'list',
          name: 'removeEmployee',
          message: 'Which employee would you like to remove?',
          choices: employeeList
        });
        const removeEmployeeQuery = await pool.execute(query.removeEmployee, [removeEmployee]);
          if(removeEmployeeQuery[0].affectedRows === 0 ) {
            console.log("Oh no ❌ There was an error removing the employee - please try again.");
            }
            console.log(`Employee ${removeEmployee} successfully removed 🔨`);
        break;
      case "Update Employee Role":
        const {updateRoleEmployee, updateRoleRole} = await inquirer.prompt([
          {
          type: 'list',
          name: 'updateRoleEmployee',
          message: 'Which employee would you like to update?',
          choices: employeeList
        },
        {
          type: 'list',
          name: 'updateRoleRole',
          message: 'Select the new role',
          choices: questions.rolesArr
        }
        ]);
        const updateEmployeeRoleQuery = await pool.query(query.updateEmployeeRole, [updateRoleRole, updateRoleEmployee]);
          if(updateEmployeeRoleQuery[0].changedRows === 0) {
            console.log(`Unable to update ${updateRoleEmployee}'s role. Please contact the help desk for assistance.`);
          } else {
            console.log(`Successfully updated ${updateRoleEmployee}'s role: ${updateRoleRole}.`);      
          }
        break;
      case "Update Employee Manager":
        const {updateManagerEmployee, updateManagerManager} = await inquirer.prompt([
          {
          type: 'list',
          name: 'updateManagerEmployee',
          message: 'Which employee would you like to update?',
          choices: employeeList
        },
        {
          type: 'list',
          name: 'updateManagerManager',
          message: 'Select the new manager',
          choices: questions.managerArr
        }
        ]);
        const [newManName, newManX] = updateManagerManager.split(" (");
        const getManagerId = await pool.query(query.getManagerId, [newManName]);
        const updateEmployeeManagerQuery = await pool.execute(query.updateEmployeeManager, [getManagerId[0][0].id, updateManagerEmployee]);
          if (updateEmployeeManagerQuery[0].changedRows === 0) {
          console.log(`Unable to update ${updateManagerEmployee}'s manager. Please contact the help desk for assistance.`);
          } else {
          console.log(`Successfully updated ${updateManagerEmployee}'s manager: ${updateManagerManager}.`);
          }
        break;
      case "EXIT":
      default:
        console.log("Goodbye 👋");
        await pool.end();
     }
     console.log("-----------------------");
     console.log("----- 🌐 PRAXIS 🌐-----");
     console.log("-----------------------");
    if (actions.action === "EXIT"){
    await pool.end();
    } else {
    go();
    }

  } catch(error) {
    console.log("OH NO 😲😵 ");
    process.kill(process.pid);
    // await pool.end();
  } 
}

function start() {
  console.log("Hello! Welcome to the Praxis Employee Database 🕵️‍♀️ 🕵 🕵");
  go();
}

start();
