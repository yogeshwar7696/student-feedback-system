const mysql = require('mysql2');
const { createTable } = require('./queries');

// Database connection configuration
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234', // Be sure to use a secure password in production
    database: 'feedback_system'
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ' + err.stack);
        return;
    }
    console.log('Successfully connected to MySQL as id ' + connection.threadId);
    
    // Execute the query to create the table if it doesn't exist
    connection.query(createTable, (err) => {
        if (err) throw err;
        console.log('Feedback table has been created or already exists.');
    });
});

module.exports = connection;
