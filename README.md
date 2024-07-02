This API provides a solution to manage information about the Paris 2024 Olympic Games and the Female Athletes taking part.

# Olympics 2024 API

## Setup Instructions
### Create a Project Folder: 
mkdir olympics-api
cd olympics-api

### Initialize a Node.js Project: 
npm init -y
### Install Express.js: 
npm install express
### Install Other Dependencies: 
npm install cors body-parser
npm install mysql2
npm install dotenv

### Set up the MySQL database:
Copy code in MySQL

-- CREATE DATABASE AND TABLES
DROP DATABASE paris2024;

CREATE DATABASE paris2024;
USE paris2024;

CREATE TABLE Countries (
    CountryID INT PRIMARY KEY,
    CountryName VARCHAR(100) NOT NULL UNIQUE,
    CountryCode VARCHAR(50),
    NumberOfMedalsInParis2024 INT DEFAULT 0
);
CREATE TABLE Sports (
    SportID INT PRIMARY KEY,
    SportName VARCHAR(100) NOT NULL,
    Category VARCHAR(50) NOT NULL CHECK (Category IN ('Olympics' , 'Paralympics'))
);
CREATE TABLE Athletes (
    AthleteID INT PRIMARY KEY,
    FirstName VARCHAR(100),
    LastName VARCHAR(100),
    DateOfBirth DATE,
    CountryID INT,
    SportID INT,
    NumberOfMedalsInParis2024 INT,
    FOREIGN KEY (CountryID)
        REFERENCES Countries (CountryID),
            FOREIGN KEY (SportID)
        REFERENCES Sports (SportID)
);

CREATE TABLE OlympicEvents (
    EventID INT PRIMARY KEY,
    EventName VARCHAR(100) NOT NULL,
    SportID INT,
    EventType VARCHAR(50) NOT NULL CHECK (EventType IN ('Individual' , 'Team')),
    FOREIGN KEY (SportID)
        REFERENCES Sports (SportID)
);

-- INSERT DATA INTO TABLES
INSERT INTO Countries (CountryID, CountryName, CountryCode, NumberOfMedalsInParis2024) VALUES
(1, 'United Kingdom', 'GBR', 189),
(2, 'France', 'FRA', 87),
(3, 'Nigeria', 'NGR', 12),
(4, 'United States', 'USA', 217),
(5, 'Brazil', 'BRA', 93),
(6, 'China', 'CHN', 295),
(7, 'Greece', 'GRE', 15),
(8, 'Spain', 'ESP', 54),
(9, 'South Korea', 'KOR', 44),
(10, 'Russia', 'RUS', NULL),
(11, 'Canada', 'CAN', 45),
(12, 'Norway', 'NOR', 16);

INSERT INTO Sports (SportID, SportName, Category) VALUES
(1, 'Skateboarding', 'Olympics'),
(2, 'Canoeing', 'Paralympics'),
(3, 'Triathlon', 'Olympics'),
(4, 'Cycling', 'Olympics'),
(5, 'Judo', 'Olympics'),
(6, 'Athletics', 'Paralympics'),
(7, 'Athletics', 'Olympics'),
(8, 'Surfing', 'Olympics'),
(9, 'Volleyball', 'Paralympics');

INSERT INTO Athletes (AthleteID, FirstName, LastName, DateOfBirth, CountryID, SportID, NumberOfMedalsInParis2024) VALUES
(1, 'Sky', 'Brown', '2008-07-12', 1, 8, 1),
(2, 'Emma', 'Wiggs', '1980-06-14', 1, 9, 2),
(3, 'Georgia', 'Taylor-Brown', '1994-03-15', 1, 3, 2),
(4, 'Clara', 'Copponi', '1999-01-12', 2, 4, 0),
(5, 'Alexandra', 'Saint-Pierre', '1995-04-28', 2, 6, NULL),
(6, 'Romane', 'Dicko', '1999-09-30', 2, 5, 1),
(7, 'Lauritta', 'Onye', '1984-01-04', 3, 6, 0),
(8, 'Tobi', 'Amusan', '1997-04-23', 3, 7, 0),
(9, 'Ese', 'Brume', '1996-01-20', 3, 7, 1);

INSERT INTO OlympicEvents (EventID, EventName, SportID, EventType) VALUES
(1, 'Skateboarding', 1, 'Individual'),
(2, 'Sprint Canoe', 2, 'Individual'),
(3, 'Individual Triathlon', 3, 'Individual'),
(4, 'Team Pursuit', 4, 'Team'),
(5, 'Individual Pursuit', 4, 'Individual'),
(6, 'Heavyweight Judo', 5, 'Individual'),
(7, 'Shot Put', 6, 'Individual'),
(8, '100m Hurdles', 7, 'Individual'),
(9, 'Long Jump', 7, 'Individual'),
(10, 'Surfing', 8, 'Individual'),
(11, 'Sitting Volleyball', 9, 'Team');



### Run the server: 
npm start or in VSC node index.js
The API will be running on http://localhost:3002.

### API Endpoints
o	GET /api/countries: Retrieve all athletes, grouping by countryID.

o	GET /api/countries: Retrieve all countries and medals so far, ordering by descending order.


o	POST /api/athletes: Add a new athlete. Payload should include firstName, lastName, dateOfBirth, countryID, and sportID.
POST ON POSTMAN: 
Body
Raw
    {
    "athleteID": "10",
    "firstName": "Estelle",
    "lastName": "Wraight",
    "dateOfBirth": "1981-04-08",
    "countryID": "2",
    "sportID": "1",
    "numberOfMedalsInParis2024": "155"
}

Check if added successfully on SQL:
SELECT *fom ATHLETES

o	DELETE /api/countries: Delete country not taking part in the Olympics
DELETE ON POSTMAN
Body
Raw
{
    "countryName": "Russia"
}
check on SQL:
SELECT countryName FROM countries