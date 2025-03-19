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
            if(error)
            {
                return res.status(400).json({ error: "Username already exists" });
            }
        
            if(results.length > 0)
            {
                return res.status(400).json({ error: "username already exists" });
            }

            pool.query(
                "INSERT INTO users (username, password) VALUES (?, ?)",
                [username, password],
                (error, results) => {
                    if(error)
                    {
                        return res.status(500).json({ error: "Database error"});
                    }
                    res.status(201).json({ message: "Signup successful"});
                }
            );
        }
    );
});

app.post("/login", (req, res) => {
    const {username, password} = req.body;

    pool.query(
        "SELECT * FROM users WHERE username = ? AND password = ?",
        [username, password],
        (error, results) => {
            if(error)
            {
                return res.status(500).json({ error: "Database error" });
            }
            
            if(results.length === 0)
            {
                return res.status(401).json({ error: "Invalid username or password" });
            }

            const user = { id: results[0].id, username: results[0].username };
            res.status(200).json({ message: "Login successful", user});
        }
    );
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});