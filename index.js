const express = require('express');
const app = express();
const PORT = 3002;
const mysql2 = require('mysql2');
const dotenv = require('dotenv');
require('dotenv').config();


// Create a MySQL connection pool with .env
const pool = mysql2.createPool({
    host:process.env.DB_HOST,   // MySQL server host
    user:process.env.DB_USER,         // MySQL user
    password:process.env.DB_PASSWORD, // MySQL password
    database:process.env.DB_NAME,  // MySQL database name
    multipleStatements:true,
    waitForConnections:true,
    connectionLimit:10,
    queueLimit:0,
});

module.exports = pool;

console.log(process.env['DB_HOST']); //check if .env is working

app.use(express.json());

//listen if port is working
app.listen(PORT, () => {
    console.log('Congratulations, server is running!')
});

//simple gets without data
app.get('/', (req, res) => {
    res.send("Welcome to the Paris Olympics 2024");
  });

app.get('/events', (req, res) => {
    res.send('Here is the list of Paris 2024 events')
});

// Endpoint 1: Get information from athletes
app.get('/athletes', (req, res) => {
    const athleteData = 'SELECT * FROM athletes ORDER BY countryID';
    pool.query(athleteData, (err, data) => { 
        if (err) {
            console.error (err);
                return res.status(500).jason({error: 'Internal Server Error'});
            }
        res.status(200).json({userData: data});
     });
});

//Additional endpoint get: Get all medal table results
app.get('/countries', (req, res) => {
    const medalsData  = 'SELECT countryName, numberOfMedalsInParis2024 from countries ORDER BY numberOfMedalsInParis2024 DESC' ;
        pool.query(medalsData, (err, data) => {
            if (err) throw err;
            res.status(200).send({userData: data});
    
    });
});



// Endpoint 2: Add a new athlete
app.post('/athletes', (req, res) => {
    const { athleteID, firstName, lastName, dateOfBirth, countryID, sportID, numberOfMedalsInParis2024 } = req.body;
    if (!athleteID || !firstName || !lastName || !dateOfBirth || !countryID || !sportID || !numberOfMedalsInParis2024) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try {
        const result = pool.query(
            'INSERT INTO athletes (athleteID, firstName, lastName, dateOfBirth, countryID, sportID, numberOfMedalsInParis2024) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [athleteID, firstName, lastName, dateOfBirth, countryID, sportID, numberOfMedalsInParis2024]
        );
        res.status(201).json({ message: 'Athlete created successfully'});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//Endpoint 3: Delete country not taking part in the Olympics
app.delete('/countries', (req, res) => {
  const countriesData = "DELETE FROM countries WHERE countryName = 'Russia'";
  pool.query(countriesData, function (err, result) {
    if (err) {
        console.error (err);
        return req.status(500).json({error: 'Internal Server Error'});
    }
    if (result.affectedRows === 0) {
        return req.status(404).json({error: 'Country not found'});
    }
    res.status(200).json({ message:'Number of records deleted:' + result.affectedRows});
  });
});
