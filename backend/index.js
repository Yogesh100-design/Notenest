// Import required modules
const express = require('express');
const connectToMongo = require('./db'); // Your MongoDB connection logic
var cors = require('cors')
const app = express();
const port = 5000;

app.use(cors())
 
// ✅ Connect to MongoDB
connectToMongo();

// ✅ Middleware to parse JSON body
app.use(express.json());

// ✅ Logger middleware (optional but useful for debugging)
app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.url}`);
  next();
});

// ✅ Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// ✅ Default route for health check
app.post('/health', (req, res) => {
  res.send('🚀 API is running...');
});

// ✅ Start the server
app.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});