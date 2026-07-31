const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  forgotPassword,
  verifyCode,
  resetPassword,
  getAllUsers,
  sendContactMessage,
  deleteUser,
} = require("../controllers/authController");

router.post("/signup", registerUser);

router.post("/login", loginUser);

router.post("/forgot-password", forgotPassword);

router.post("/verify-code", verifyCode);

router.post("/reset-password", resetPassword);

router.get("/users", getAllUsers);

router.post("/contact", sendContactMessage);

router.delete("/users/:id", deleteUser);

module.exports = router;