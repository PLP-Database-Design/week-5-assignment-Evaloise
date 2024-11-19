//initialize dependecies  / variables

const express = require ('express');
const cors = require('cors');
const app = express();
const mysql = require ('mysql2');
const dotenv = require ('dotenv');

app.use(express.json());
app.use (cors());
dotenv.config();

//connect to the database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '#Evaloise2024',
    database: 'hospital_db'
});

    //Check if db connection works
    db.connect((err) => {
        if (err)return console.log("error connecting to the database mysql");
            console.log("connected to the database successfully as id: ", db.threadId)

    app.listen(process.env.PORT, () => {
        console.log(`server is running on port ${process.env.PORT}`);

            //send a message to the browser
            console.log('sending message to browser...');
            
            app.get('/',(req,res) => {
            res.send('server started successfully!!');
});
    // Question 1: Retrieve all patients 
    app.get('/patients', (req, res) => {
         const sql = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients'; 
         db.query(sql, (err, results) => { if (err) { res.status(500).send(err); } 
         else { res.status(200).json(results); 
         }
         });
         });
         // Question 2: Retrieve all providers
         app.get('/providers', (req, res) => { 
            const sql = 'SELECT first_name, last_name, provider_specialty FROM providers'; 
            db.query(sql, (err, results) => { 
            if (err) { res.status(500).send(err); } else { res.status(200).json(results);
             } 
            });
         });
         // Question 3: Filter patients by First Name
         app.get('/patients/:first_name', (req, res) => { const firstName = req.params.first_name; 
            const sql = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?';
             db.query(sql, [firstName], (err, results) => { if (err) { res.status(500).send(err);
              } else { res.status(200).json(results); 
         } 
        });
     });
     // Question 4: Retrieve all providers by their specialty
     app.get('/providers/specialty/:specialty', (req, res) => { 
        const specialty = req.params.specialty; const sql = 'SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?'; 
        db.query(sql, [specialty], (err, results) => { if (err) { res.status(500).send(err); 

        } else { res.status(200).json(results); 

     } 
    });
     });
     });
     });
