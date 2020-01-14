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
// View Employee by Manager
exports.employeeByManager =(
  `SELECT
   CONCAT(e.first_name, ' ', e.last_name) AS Employee,
   CONCAT(m.first_name, ' ', m.last_name) AS Manager
   FROM employee e
      INNER JOIN employee m ON e.manager_id = m.id
   WHERE CONCAT(m.first_name, ' ', m.last_name) = ? ;`
  
);
// ADD New Employee
exports.insertEmployee = (
  `INSERT INTO employee (
    first_name, 
    last_name, 
    role_id,
    manager_id
  )
  VALUES(
   (?),
   (?),
   (SELECT r.id FROM roles r WHERE r.title = ?),
   (SELECT m.id FROM employee m WHERE m.first_name=? AND m.last_name=?)
  )`
);
// Exec Team Query
exports.executiveTeam =(
  `SELECT
  CONCAT(e.first_name, ' ', e.last_name) AS Employee,
    r.title AS Title
  FROM employee e
    INNER JOIN roles r ON e.role_id = r.id
  WHERE e.id BETWEEN 1 AND 8;`
);
// List of employees eligible for update
exports.eligibleEmployeeList =(
  `SELECT
  CONCAT(e.first_name, ' ', e.last_name) AS employee
  FROM employee e
  WHERE e.id > 8; `
);
// Remove Employee
exports.removeEmployee = (
  `DELETE FROM employee e WHERE CONCAT(e.first_name, ' ', e.last_name) = ?;`
);
// Update Employee Role
exports.updateEmployeeRole =(
  `UPDATE employee e 
   SET role_id = (SELECT r.id FROM roles r WHERE r.title = ? )
   WHERE CONCAT(e.first_name, ' ', e.last_name) = ?;`
);
// Update Employee Manager
exports.updateEmployeeManager =(
  `UPDATE employee e
  SET manager_id = ?
   WHERE CONCAT(e.first_name, ' ', e.last_name) = ? ;`
   );
// Select Manager id from name
exports.getManagerId =(
  `SELECT 
   id
   FROM employee m
   WHERE CONCAT(m.first_name, ' ', m.last_name) = ?;`
);



