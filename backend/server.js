const express = require('express')
const cors = require('cors')
const app = express()

// Allow ALL origins — fixes CORS on Vercel
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}))

app.use(express.json())

// Test route — open your backend URL in browser to check
app.get('/', (req, res) => {
  res.json({ status: 'Backend is running!' })
})

// Login route
app.post('/api/login', (req, res) => {
  const { email, password } = req.body

  // Hardcoded test credentials
  const validUsers = [
    { email: 'user@netflix.com', password: 'password123' },
    { email: 'kanagaraj@netflix.com', password: 'knx123' }
  ]

  const user = validUsers.find(
    u => u.email === email && u.password === password
  )

  if (user) {
    res.json({ success: true, message: 'Login successful!' })
  } else {
    res.status(401).json({ success: false, message: 'Incorrect email or password.' })
  }
})

// Required for Vercel — export the app
module.exports = app