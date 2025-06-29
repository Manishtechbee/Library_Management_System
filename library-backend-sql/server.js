// backend/server.js
const express = require('express')
const cors = require('cors')
const app = express()
// const studentRoutes = require('./routes/student');  
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// app.use('/uploads', express.static('uploads'));  

// app.use('/api/student', studentRoutes);  

// Routes
const authRoutes = require('./routes/auth')
// const chatbotRoutes = require('./routes/chatbot')
const resourceRoutes = require("./routes/resources");

const issuedBooksRoutes = require("./routes/issuedBooks");

app.use("/api", issuedBooksRoutes);

app.use('/api', authRoutes)
// app.use('/api', chatbotRoutes)
app.use("/api", resourceRoutes);

app.get('/', (req, res) => {
  res.send('✅ Library Backend Server is Running')
})

// Start server
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`))
