const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const { error } = require("console");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "../")));

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

app.get("/check-auth", (req, res) => {
    const userId = req.cookies.userId;

    if(!userId)
    {
        return res.status(401).json({ message: "Not authenticated" });
    }

    pool.query("SELECT * FROM users WHERE id = ?", [userId], (eror, results) => {
        if(error)
        {
            return res.status(500).json({ error: "Database error" });
        }

        if(results.length === 0)
        {
            return res.status(401).json({ error: "Invalid user" });
        }

        const user = { id: results[0].id, username: results[0].username };
        res.status(200).json({ message: "Authenticated", user });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});