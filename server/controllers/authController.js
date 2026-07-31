const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const registerUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "noorsibgha445@gmail.com",
        pass: "fgdtmehqsrjmjwst",
      },
    });

    await transporter.sendMail({
      from: "noorsibgha445@gmail.com",
      to: "noorsibgha445@gmail.com",
      subject: "New User Registration",
      html: `
        <h2>New User Registered</h2>
        <p><strong>Name:</strong> ${user.name}</p>
        <p><strong>Username:</strong> ${user.username}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>User ID:</strong> ${user._id}</p>
      `,
    });

    console.log("Admin notification email sent successfully");

    res.status(201).json({
      message: "User registered successfully",
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("REGISTER ERROR:");
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { login, password } = req.body;

    const user = await User.findOne({
      $or: [
        { email: login },
        { username: login },
      ],
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email/Username or Password",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Email/Username or Password",
      });
    }

    res.status(200).json({
      message: "Login Successful",
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    console.log("Forgot Password Request Received");
    console.log(req.body);

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "No account found with this email",
      });
    }

    const resetCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    user.resetCode = resetCode;
    user.resetCodeExpiry = Date.now() + 10 * 60 * 1000;

    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded" : "Missing");

    console.log("Sending email to:", email);

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "GeoSense AI Password Reset Code",
      html: `
        <h2>Password Reset Verification Code</h2>

        <p>Your verification code is:</p>

        <h1 style="color:#06b6d4;">
        ${resetCode}
        </h1>

        <p>This code will expire in 10 minutes.</p>
      `,
    });

    console.log("Email sent successfully");

    res.status(200).json({
      message: "Verification code sent to your email",
    });
  } catch (error) {
    console.log("FORGOT PASSWORD ERROR:");
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const verifyCode = async (req, res) => {
  try {
    const { email, code } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.resetCode !== code) {
      return res.status(400).json({
        message: "Invalid verification code",
      });
    }

    if (user.resetCodeExpiry < Date.now()) {
      return res.status(400).json({
        message: "Verification code expired",
      });
    }

    res.status(200).json({
      message: "Code verified successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    user.password = hashedPassword;

    user.resetCode = "";
    user.resetCodeExpiry = null;

    await user.save();

    res.status(200).json({
      message: "Password updated successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select(
      "-password -resetCode -resetCodeExpiry"
    );

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const sendContactMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "noorsibgha445@gmail.com",
        pass: "fgdtmehqsrjmjwst",
      },
    });

    await transporter.sendMail({
      from: email,
      to: "noorsibgha445@gmail.com",
      subject: "New Contact Form Message",
      html: `
        <h2>New Contact Message</h2>

        <p><strong>Name:</strong> ${name}</p>

        <p><strong>Email:</strong> ${email}</p>

        <p><strong>Message:</strong></p>

        <p>${message}</p>
      `,
    });

    res.status(200).json({
      message: "Message sent successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  verifyCode,
  resetPassword,
  getAllUsers,
  sendContactMessage,
  deleteUser,
};