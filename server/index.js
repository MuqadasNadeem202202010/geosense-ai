const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

connectDB();

// CORS: frontend ka origin allow karein (end mein "/" nahi)
// Yeh preflight (OPTIONS) requests ko bhi khud handle kar leta hai
app.use(
  cors({
    origin: "https://geosense-ai-pi.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("GeoSense AI Backend Running...");
});

const PORT = process.env.PORT || 5000;

// Sirf local machine par listen karein (Vercel par nahi)
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Vercel ke liye zaroori
module.exports = app;