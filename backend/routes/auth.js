// Import necessary modules
const express = require("express");
const dotenv = require("dotenv");
const router = express.Router();
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
console.log("🧪 JWT Secret Loaded:", jwtSecret)

// const jwtSecret="jay shree ram";


// ✅ Test route
router.post("/ping", (req, res) => {
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
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ error: "A user with this email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      await user.save();

      const data = {
        user: {
          id: user.id,
        },
      };

      const JWTdata = jwt.sign(data, jwtSecret);
      res.json({ JWTdata });
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

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data,jwtSecret );
      res.json({ authToken });
    } catch (err) {
      console.error("❌ Error during login:", err);
      res.status(500).send("Server Error");
    }
  }
);


// ✅ getUser Route (login required)
router.post("/getUser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id; // ✅ Extracted from JWT in fetchUser middleware
    const user = await User.findById(userId).select("-password"); 
    res.send(user);
  } catch (err) {
    console.error("❌ Error during fetching user:", err);
    res.status(500).send("Server Error");
  }
});


// ✅ Export the router
module.exports = router;
