DROP DATABASE IF EXISTS employeeTracker_DB;
CREATE database employeeTracker_DB;

USE employeeTracker_DB;

DROP TABLE IF EXISTS department;

CREATE TABLE department (
  id INT AUTO_INCREMENT NOT NULL,
  deptName VARCHAR(30) NOT NULL,

  PRIMARY KEY (id)
);

------------------- Role Table ----------------------------

USE employeeTracker_DB;

DROP TABLE IF EXISTS emp_role;

CREATE TABLE emp_role (
  id INT AUTO_INCREMENT NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NULL,
  department_id INT NOT NULL,

  PRIMARY KEY (id)
);

------------------- Employee Table ----------------------------

USE employeeTracker_DB;

DROP TABLE IF EXISTS employee;

CREATE TABLE employee (
  id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NULL,

  PRIMARY KEY (id)
);