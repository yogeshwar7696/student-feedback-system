const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db'); // Import the database connection
const { insertFeedback } = require('./queries'); // Import the SQL query

const app = express();
const port = 3000;

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // Serve static files like index.html and style.css

// Route for the home page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Route to handle form submission
app.post('/submit', (req, res) => {
    // Correctly map the 'name' from the form to 'student_name' for the database
    const { name: student_name, roll_number, course, instructor, rating, feedback } = req.body;
    
    // Use the imported query and connection to insert data
    connection.query(insertFeedback, [student_name, roll_number, course, instructor, rating, feedback], (err, results) => {
        if (err) {
            console.error('Database Insert Error:', err);
            res.status(500).send('There was an error submitting your feedback. Please try again.');
        } else {
            // Send a success response and use the correct variable in the message
            res.send(`
                <html>
                <head>
                    <title>Success</title>
                    <link rel="stylesheet" href="style.css">
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>Feedback Submitted!</h1>
                            <p>Thank you for your valuable feedback, ${student_name}.</p>
                            <a href="/" style="text-decoration: none; margin-top: 20px; display: inline-block;">
                                <button class="submit-btn">Submit Another</button>
                            </a>
                        </div>
                    </div>
                </body>
                </html>
            `);
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is up and running on http://localhost:${port}`);
});
