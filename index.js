// Dependencies
const mysql = require('mysql');
const fs = require('fs');
const inquirer = require('inquirer');


const connection = mysql.createConnection({
    host: 'localhost',
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: 'root',
  
    // Be sure to update with your own MySQL password!
    password: 'TCQ4L!fe',
    database: 'top_songsDB',
  });

  connection.connect(err => {

    if(err) throw err;
    console.log(`we connected!! Connected as thread id ${connect.threadId}`);
    connection.end();
})

// Create a function for handling the requests and responses coming into our server
const handleRequest = (req, res) => {
    // Here we use the fs package to read our index.html file
    fs.readFile(`${__dirname}/index.html`, (err, data) => {
      if (err) throw err;
      // We then respond to the client with the HTML page by specifically telling the browser that we are delivering
      // an html file.
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  };