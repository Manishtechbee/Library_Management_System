const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const db = require('../config/db') // make sure this file exists and exports the DB

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10)

    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)'
    db.query(sql, [name, email, hashedPassword], (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ message: 'Email already exists' })
        }
        return res.status(500).json({ message: 'Server error', error: err.message })
      }
      return res.status(201).json({ message: 'User registered successfully' })
    })
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' })
  }
})

module.exports = router
