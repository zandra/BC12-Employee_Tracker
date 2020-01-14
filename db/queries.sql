USE employees_db;
SELECT
  CONCAT(e.first_name, ' ', e.last_name) AS name
FROM employee e
WHERE
  e.id = 3;
UPDATE employee e
SET
  e.last_name = 'Ben Titan'
WHERE
  e.id = 3;
-- Select all Employees
SELECT
  CONCAT(e.first_name, ' ', e.last_name) AS Employee,
  r.title AS Title,
  d.department_name AS Department,
  r.salary AS Salary,
  CONCAT(m.first_name, ' ', m.last_name) AS Manager
FROM employee e
LEFT JOIN roles r ON e.role_id = r.id
LEFT JOIN department d ON r.department_id = d.id
LEFT JOIN employee m ON e.manager_id = m.id;
-- Add an employee
INSERT INTO employee (
    first_name,
    last_name,
    role_id,
    manager_id
  )
VALUES(
    (?),
    (?),
    (
      SELECT
        r.id
      FROM roles r
      WHERE
        r.title = ?
    ),
    (
      SELECT
        m.id
      FROM employee m
      WHERE
        m.first_name = ?
        AND m.last_name = ?
    )
  );
-- Select employee by department
SELECT
  CONCAT(e.first_name, ' ', e.last_name) AS Employee,
  d.department_name AS Department
FROM employee e
INNER JOIN roles r ON e.role_id = r.id
INNER JOIN department d ON r.department_id = d.id
WHERE
  d.department_name = ?;