// Dependencies
const mysql = require('mysql');
const fs = require('fs');
const inquirer = require('inquirer');
const cTable = require('console.table');

// Checking connection 
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'TCQ4L!fe',
    database: 'employeeTracker_DB',
  });

// Connecting ...
  connection.connect(function(err) {
    if (err) throw err
    console.log("Connected as Id" + connection.threadId)
    startProgram();
});

function startProgram() {
  inquirer.prompt([
  {
  type: "list",
  message: "What would you like to do?",
  name: "choice",
  choices: [
            "View All Employees?", 
            "View All Employee's By Role?",
            "View All Emplyees By Deparment?", 
            "Update Employee?",
            "Add Employee?",
            "Add Role?",
            "Add Department?"
          ]
  }
]).then(function(val) {
      switch (val.choice) {
          case "View All Employees?":
            viewAllEmployees();
          break;
  
        case "View All Employee's By Role?":
            viewAllRoles();
          break;
        case "View All Emplyees By Deparment?":
            viewAllDepartments();
          break;
        
        case "Add Employee?":
              addEmployee();
            break;

        case "Update Employee?":
              updateEmployee();
            break;
    
          case "Add Role?":
              addRole();
            break;
    
          case "Add Department?":
              addDepartment();
            break;
  
          }
  })
}
// View All Employees 
function viewAllEmployees() {
  connection.query("SELECT employee.first_name, employee.last_name, emp_role.title, emp_role.salary, department.deptName, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN emp_role on emp_role.id = employee.role_id INNER JOIN department on department.id = emp_role.department_id left join employee e on employee.manager_id = e.id;", 
  function(err, res) {
    if (err) throw err
    console.table(res)
    startProgram();
})
}

//View All Employee Roles
function viewAllRoles() {
  connection.query("SELECT employee.first_name, employee.last_name, emp_role.title AS Title FROM employee JOIN emp_role ON employee.role_id = emp_role.id;", 
  function(err, res) {
  if (err) throw err
  console.table(res)
  startProgram()
  })
}
//View All Employees By Departments
function viewAllDepartments() {
  connection.query("SELECT employee.first_name, employee.last_name, department.deptName AS department FROM employee JOIN emp_role ON employee.role_id = emp_role.id JOIN department ON emp_role.department_id = department.id ORDER BY employee.id;", 
  function(err, res) {
    if (err) throw err
    console.table(res)
    startProgram()
  })
}

//Select Role Function 
var roleArr = [];
function selectRole() {
  connection.query("SELECT * FROM emp_role", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      roleArr.push(res[i].title);
    }

  })
  return roleArr;
  
}

// Select Manager Function
var managersArr = [];
function selectManager() {
  connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      managersArr.push(res[i].first_name);
    }

  })
  return managersArr;
}

//Add Employee 
function addEmployee() { 
    inquirer.prompt([
        {
          name: "firstname",
          type: "input",
          message: "Enter their first name "
        },
        {
          name: "lastname",
          type: "input",
          message: "Enter their last name "
        },
        {
          name: "role",
          type: "list",
          message: "What is their role? ",
          choices: selectRole()
        },
        {
            name: "choice",
            type: "rawlist",
            message: "Whats their managers name?",
            choices: selectManager()
        }
    ]).then(function (val) {
      var role_id = selectRole().indexOf(val.emp_role) + 1
      var manager_id = selectManager().indexOf(val.choice) + 1
      connection.query("INSERT INTO employee SET ?", 
      {
          first_name: val.firstname,
          last_name: val.lastname,
          manager_id: manager_id,
          role_id: role_id
          
      }, function(err){
          if (err) throw err
          console.table(val)
          startProgram()
      
      })

  })
}

//Update Employee 
function updateEmployee() {
  connection.query("SELECT employee.last_name, emp_role.title FROM employee JOIN emp_role ON employee.role_id = emp_role.id;", function(err, res) {
  console.log(res)
   if (err) throw err
   console.log(res)
  inquirer.prompt([
        {
          name: "lastName",
          type: "rawlist",
          choices: function() {
            var lastName = [];
            for (var i = 0; i < res.length; i++) {
              lastName.push(res[i].last_name);
            }
            return lastName;
          },
          message: "What is the Employee's last name? ",
        },
        {
          name: "role",
          type: "rawlist",
          message: "What is the Employees new title? ",
          choices: selectRole()
        },
      ]).then(function(val) {
        var roleId = selectRole().indexOf(val.role) + 1
        connection.query("UPDATE employee SET WHERE ?", 
        {
          last_name: val.lastName
           
        }, 
        {
          role_id: roleId
           
        }, 
        
        function(err){
            if (err) throw err
            console.table(val)
            startProgram()
        })
      
  
    });
  });

  }

// Add Role
function addRole() { 
  connection.query("SELECT emp_role.title AS Title, emp_role.salary AS Salary FROM emp_role",   function(err, res) {
    inquirer.prompt([
        {
          name: "Title",
          type: "input",
          message: "What is the roles Title?"
        },
        {
          name: "Salary",
          type: "input",
          message: "What is the Salary?"

        },
        {
          name: "department_id",
          type: "input",
          message: "What what department_id (1-4)?"

        } 
    ]).then(function(res) {
        connection.query(
            "INSERT INTO emp_role SET ?",
            {
              title: res.Title,
              salary: res.Salary,
              department_id: res.department_id
            },
            function(err) {
                if (err) throw err
                console.table(res);
                startProgram();
            }
        )

    });
  });
  }
//Add Department 
function addDepartment() { 
  connection.query("SELECT department.deptName AS name FROM department",   function(err, res) {
    inquirer.prompt([
        {
          name: "name",
          type: "input",
          message: "What Department would you like to add?"
        }
    ]).then(function(res) {
      connection.query(
        "INSERT INTO department SET ?",
            {
              name: res.name
            
            },
            function(err) {
                if (err) throw err
                console.table(res);
                startProgram();
            }
        )
    })
  });
}



