const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "serviceshare",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

app.post("/signup", (req, res) => {
    const { username, password } = req.body;

    pool.query(
        "SELECT * FROM users WHERE username = ?",
        [username],
        (error, results) => {
            if(error) {
                return res.status(400).json({ error: "Username already exists" });
            }
        
            
        }
    )
})