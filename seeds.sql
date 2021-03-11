INSERT INTO department (deptName)
VALUE ("Sales");
INSERT INTO department (deptName)
VALUE ("Engineering");
INSERT INTO department (deptName)
VALUE ("Human Resources");
INSERT INTO department (deptName)
VALUE ("Customer Support");

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Phillip", "Mondesir", null, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Sabine", "Franck", null, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Jackson","Hall",null,3);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Zach", "Huntowski", 1, 4);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Chrissy", "Sherwood", 3, 5);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Jason", "Fraser", 1, 6);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Tom", "Lorinston", 2, 7);


INSERT INTO emp_role (title, salary, department_id)
VALUE ("Senior Software Engineer", 250000, 2);
INSERT INTO emp_role (title, salary, department_id)
VALUE ("People Partners Lead", 150000, 3);
INSERT INTO emp_role (title, salary, department_id)
VALUE ("Technical Project Manager", 121000, 2);
INSERT INTO emp_role (title, salary, department_id)
VALUE ("Sales Lead", 95000, 1);
INSERT INTO emp_role (title, salary, department_id)
VALUE ("Sales Associate", 80000, 1);
INSERT INTO emp_role (title, salary, department_id)
VALUE ("Software Engineer", 120000, 2);
INSERT INTO emp_role (title, salary, department_id)
VALUE ("Support Specialist", 60000, 4);

SELECT * FROM department;
SELECT * FROM employee;
SELECT * FROM emp_role;