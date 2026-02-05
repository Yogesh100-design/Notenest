// server.js
const express = require('express');
const connectToMongo = require('./db'); // Your MongoDB connection logic
const authRoutes = require('./routes/auth'); // Auth routes
const notesRoutes = require('./routes/notes');

const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors()); // Allow all origins by default for simplicity, or configure specific origins if needed


// ✅ Connect to MongoDB
connectToMongo();

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ Logger
app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.url}`);
  next();
});

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

// ✅ Health check
app.get('/health', (req, res) => res.send('🚀 API is running...'));

// ✅ Start server
app.listen(port, () => console.log(`✅ Server running on http://localhost:${port}`));
