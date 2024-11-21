// Initialize dependencies / variables
const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv');
const path = require('path');

app.use(express.json());
app.use(cors());
dotenv.config();

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Connect to the database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '#Evaloise2024',
    database: 'hospital_db'
    });

// Check if db connection works
db.connect((err) => {
    if (err) return console.log("Error connecting to the database: ", err);
    console.log("Connected to the database successfully as id: ", db.threadId);
//question 1 to retrieve all
    // Retrieve all patients
    app.get('/patients', (req, res) => {
        const sql = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
        db.query(sql, (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error retrieving data');
            } else {
                res.render('data', { title: 'Patients', type: 'patients', results: results });
            }
        });
    });

    //question 2 to retrieve all providers
    // Retrieve all providers
    app.get('/providers', (req, res) => {
        const sql = 'SELECT first_name, last_name, provider_specialty FROM providers';
        db.query(sql, (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error retrieving data');
            } else {
                res.render('data', { title: 'Providers', type: 'providers', results: results });
            }
        });
    });
//question 3
    // Filter patients by First Name
    app.get('/patients/:first_name', (req, res) => {
        const firstName = req.params.first_name;
        const sql = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?';
        db.query(sql, [firstName], (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error retrieving data');
            } else {
                res.render('data', { title: 'Filtered Patients', type: 'patients', results: results });
            }
        });
    });

    //question 4 Retrieve all providers by their specialty
    app.get('/providers/specialty/:specialty', (req, res) => {
        const specialty = req.params.specialty;
        const sql = 'SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?';
        db.query(sql, [specialty], (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error retrieving data');
            } else {
                res.render('data', { title: 'Filtered Providers', type: 'providers', results: results });
            }
        });
    });

    // Start the server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);

        // Send a message to the browser
        app.get('/', (req, res) => {
            res.send('Server started successfully!!');
        });
    });
});
