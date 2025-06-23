// backend/server.js
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Routes
const authRoutes = require('./routes/auth')
const chatbotRoutes = require('./routes/chatbot')

app.use('/api', authRoutes)
app.use('/api', chatbotRoutes)

app.get('/', (req, res) => {
  res.send('✅ Library Backend Server is Running')
})

// Start server
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`))
