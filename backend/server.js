// server.js

require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// Allow JSON body & frontend requests
app.use(cors());
app.use(express.json());

// 🗄 Database connection (works for Railway + local)
const db = mysql.createConnection({
  host: process.env.DB_HOST,      // Railway host or localhost
  user: process.env.DB_USER,      // Railway user or local user
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
});

// Test DB connection
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

// CREATE: add new feedback
app.post("/feedback", (req, res) => {
  const { message, color } = req.body;
  if (!message || message.trim() === "") {
    return res.status(400).json({ error: "Message is required" });
  }

  const sql =
    "INSERT INTO feedback (message, color, created_at) VALUES (?, ?, NOW())";
  db.query(sql, [message, color || "mint"], (err, result) => {
    if (err) {
      console.error("Error inserting feedback:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(201).json({
      id: result.insertId,
      message,
      color: color || "mint",
    });
  });
});

// UPDATE: edit existing feedback
app.put("/feedback/:id", (req, res) => {
  const { id } = req.params;
  const { message, color } = req.body;

  const sql =
    "UPDATE feedback SET message = ?, color = ? WHERE id = ?";
  db.query(sql, [message, color || "mint", id], (err) => {
    if (err) {
      console.error("Error updating feedback:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "Feedback updated" });
  });
});

// DELETE: remove feedback
app.delete("/feedback/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM feedback WHERE id = ?";
  db.query(sql, [id], (err) => {
    if (err) {
      console.error("Error deleting feedback:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "Feedback deleted" });
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
