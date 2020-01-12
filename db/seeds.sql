USE employees_db;
INSERT INTO department (department_name)
VALUES
  ('Operations'),
  ('Product'),
  ('Engineering'),
  ('Sales'),
  ('Marketing');
INSERT INTO roles (title, salary, department_id)
VALUES
  ('CEO', '500000', 1),
  ('CTO', '500000', 1),
  ('Head of Product', '250000', 2),
  ('Head of Marketing', '250000', 5),
  ('Product Manager', '200000', 2),
  ('Dev Ops', '220000', 3),
  ('Dev Manager', '200000', 3),
  ('Software Engineer', '100000', 3),
  ('Sales Lead', '120000', 4),
  ('Inside Sales', '90000', 4),
  ('Marketing Content', '100000', 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Steve', 'Rogers', 1, NULL),
  ('Carol', 'Danvers', 2, NULL),
  ('Gamora', 'Ben Titan', 4, 1),
  ("T'Challa", NULL, 6, NULL),
  ('Tony', 'Stark', 3, 2),
  ('Bruce', 'Banner', 7, 2),
  ('Nick', 'Fury', 9, 1),
  ('Pepper', 'Potts', 5, 1),
  ('Natasha', 'Romanoff', 8, 6),
  ('Natalia', 'Romanova', 8, 6);