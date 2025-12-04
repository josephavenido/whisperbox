// server.js

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// Allow JSON body & frontend requests
app.use(cors());
app.use(express.json());

// 🔐 CHANGE these values to match your MySQL setup
const db = mysql.createConnection({
  host: "localhost",
  user: "root",           // <= your MySQL username
  password: "2005",       // <= your MySQL password
  database: "anonymousy_db",
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("✅ Connected to MySQL");
});

// ----- CRUD ENDPOINTS ----- //

// READ: get all feedback messages
app.get("/feedback", (req, res) => {
  const sql = "SELECT * FROM feedback ORDER BY created_at DESC";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching feedback:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// CREATE: add new feedback (message + color)
app.post("/feedback", (req, res) => {
  const { message, color } = req.body;

  if (!message || message.trim() === "") {
    return res.status(400).json({ error: "Message is required" });
  }

  const chosenColor = color || "default";

  const sql = "INSERT INTO feedback (message, color) VALUES (?, ?)";
  db.query(sql, [message, chosenColor], (err, result) => {
    if (err) {
      console.error("Error inserting feedback:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(201).json({
      id: result.insertId,
      message,
      color: chosenColor,
    });
  });
});

// UPDATE: edit existing feedback (message + color)
app.put("/feedback/:id", (req, res) => {
  const { id } = req.params;
  const { message, color } = req.body;

  if (!message || message.trim() === "") {
    return res.status(400).json({ error: "Message is required" });
  }

  const chosenColor = color || "default";

  const sql = "UPDATE feedback SET message = ?, color = ? WHERE id = ?";
  db.query(sql, [message, chosenColor, id], (err, result) => {
    if (err) {
      console.error("Error updating feedback:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "Feedback updated", color: chosenColor });
  });
});

// DELETE: remove feedback
app.delete("/feedback/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM feedback WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting feedback:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "Feedback deleted" });
  });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
