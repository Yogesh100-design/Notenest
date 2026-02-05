// routes/auth.js
const express = require("express");
const dotenv = require("dotenv");
const router = express.Router();
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");

dotenv.config();
const jwtSecret = process.env.JWT_SECRET || "default_jwt_secret"; // fallback secret
console.log("🧪 JWT Secret Loaded:", jwtSecret);

// ✅ Test route
router.get("/ping", (req, res) => {
  res.send("✅ /api/auth/ping is working");
});

// ✅ Create User Route
router.post(
  "/createuser",
  [
    body("name").isLength({ min: 5 }).withMessage("Name must be at least 5 characters long"),
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password").isLength({ min: 5 }).withMessage("Password must be at least 5 characters long"),
  ],
  async (req, res) => {
    console.log("🔥 Received POST request to /api/auth/createuser");

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("❌ Validation failed:", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = new User({ name, email, password: hashedPassword });
      await user.save();

      const payload = { user: { id: user.id } };
      const authToken = jwt.sign(payload, jwtSecret, { expiresIn: "1h" });

      res.json({ authToken });
    } catch (err) {
      console.error("❌ Error while saving user:", err);
      res.status(500).send("Server Error");
    }
  }
);

// ✅ Login Route
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password").exists().withMessage("Password cannot be blank"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("❌ Validation failed:", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      const payload = { user: { id: user.id } };
      const authToken = jwt.sign(payload, jwtSecret, { expiresIn: "1h" });

      res.json({ authToken });
    } catch (err) {
      console.error("❌ Error during login:", err);
      res.status(500).send("Server Error");
    }
  }
);

// ✅ getUser Route (requires login)
router.get("/getuser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id; // from fetchUser middleware
    const user = await User.findById(userId).select("-password");
    res.json(user);
  } catch (err) {
    console.error("❌ Error during fetching user:", err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
