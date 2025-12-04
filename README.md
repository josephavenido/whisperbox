# WhisperBox – Anonymous Feedback Board

WhisperBox is a simple anonymous feedback board inspired by apps like NGL and Whisper.  
Users can send anonymous messages that appear as colorful sticky notes on a dashboard.

This project is built as a final requirement using **Next.js**, **Express**, and **MySQL**.

---

## 🧰 Tech Stack

- **Frontend:** Next.js (React), Tailwind CSS  
- **Backend:** Node.js + Express  
- **Database:** MySQL (via MySQL Workbench)  
- **Other:** Fetch API, REST API, Emoji picker, Color-coded notes

---

## ✨ Features

- 📝 **Create anonymous messages** – users can send feedback without revealing identity  
- 📖 **Read messages** – all messages are displayed on a sticky-note style dashboard  
- ✏️ **Update messages** – edit existing notes via a modal  
- 🗑️ **Delete messages** – remove messages from the board and from the database  
- 🎨 **Note colors** – each message has a color theme (mint, rose, sun, sky, lavender)  
- 😀 **Emoji picker** – quickly add emojis into the message  
- 🔍 **Search bar** – filter notes by content  
- 🏷️ **"New" badge** – highlights the most recently created note  
- 🌈 **Responsive UI** – modern blue–purple gradient theme, mobile-friendly

---

## 🗄️ Database Setup (MySQL)

Using **MySQL Workbench**, run:

```sql
CREATE DATABASE anonymousy_db;
USE anonymousy_db;

CREATE TABLE feedback (
    id INT PRIMARY KEY AUTO_INCREMENT,
    message TEXT NOT NULL,
    color VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
