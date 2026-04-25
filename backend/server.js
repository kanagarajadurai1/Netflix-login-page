const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['POST', 'GET'],
}));

app.use(express.json());

const MOCK_USER = {
  email: 'user@netflix.com',
  password: 'password123'
};

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please fill in all fields.'
    });
  }

  if (email === MOCK_USER.email && password === MOCK_USER.password) {
    return res.json({
      success: true,
      message: 'Login successful!'
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Incorrect email or password.'
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});