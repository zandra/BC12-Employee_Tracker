// View Employee List
exports.employees =(
 `SELECT
  CONCAT(e.first_name, ' ', e.last_name) AS Employee,
  r.title AS Title,
  d.department_name AS Department,
  r.salary AS Salary,
  CONCAT(m.first_name, ' ', m.last_name) AS Manager
  FROM employee e
  LEFT JOIN roles r ON e.role_id = r.id
  LEFT JOIN department d ON r.department_id = d.id
  LEFT JOIN employee m ON e.manager_id = m.id`
);

// View Departments
exports.departments =(
`SELECT d.department_name AS Department
 FROM department d;`
);

// View Employee by Role
exports.employeeByRole =(
  `SELECT
   CONCAT(e.first_name, ' ', e.last_name) AS Employee,
   r.title AS Title
   FROM employee e
   INNER JOIN roles r ON e.role_id = r.id
   WHERE r.title = ?;`
);
// View Employee by Department
exports.employeeByDepartment =(
  `SELECT
   CONCAT(e.first_name, ' ', e.last_name) AS Employee,
   d.department_name AS Department
   FROM employee e
   INNER JOIN roles r ON e.role_id = r.id
   INNER JOIN department d ON r.department_id = d.id
   WHERE d.department_name = ?;`
);

// Add New Employee
exports.insertEmployee = (employeeFirst, employeeLast, employeeRole, managerFirst, managerLast) => (
  `INSERT INTO employee (
    first_name, 
    last_name, 
    role_id,
    manager_id
  )
  VALUES(
   (${employeeFirst}),
   (${employeeLast}),
   (SELECT r.id FROM roles r WHERE r.title = ${employeeRole}),
   (SELECT m.id FROM employee m WHERE m.first_name=${managerFirst} AND m.last_name=${managerLast})
  )`
);

exports.executiveTeam =(
  `SELECT
  CONCAT(e.first_name, ' ', e.last_name) AS Employee
  FROM employee e
  WHERE e.id BETWEEN 1 AND 8;
  `
);

exports.eligibleEmployeeList =(
  `SELECT
  CONCAT(e.first_name, ' ',e.last_name) AS employee
  FROM employee e
  WHERE e.id > 8;
  `
);


// Remove Employee
exports.removeEmployee = (employeeFirst, employeeLast) => (
  `DELETE FROM employee e WHERE e.first_name = ${employeeFirst} AND e.last_name = ${employeeLast}`
);

// Update Employee Role
exports.updateEmployeeRole = (employeeFirst, employeeLast, employeeUpdateRole) => (
  `UPDATE employee e 
   SET role_id = (SELECT r.id FROM roles r WHERE r.title = ${employeeUpdateRole})
   WHERE e.first_name = ${employeeFirst} AND e.last_name = ${employeeLast}
   `
);

// Update Employee Manager
exports.updateEmployeeManager = (employeeFirst, employeeLast, managerFirst, managerLast) => (
  `UPDATE employee e 
   SET manager_id = (SELECT m.id FROM employee m WHERE m.first_name=${managerFirst} AND m.last_name=${managerLast})
   WHERE e.first_name = ${employeeFirst} AND e.last_name = ${employeeLast}
   `
);



