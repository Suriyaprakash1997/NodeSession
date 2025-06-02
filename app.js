// app.js
const express = require('express');
const app = express();

app.use(express.json()); // Middleware to parse JSON

// GET
app.get('/users', (req, res) => {
  res.status(200).json('GET: List of users');
});

// POST
app.post('/users', (req, res) => {
    const{ name, email } = req.body;
  res.status(201).json({
    message: 'POST: User created',
    user: {
      name,
      email
    }
  });
});

// PUT
app.put('/users/:id', (req, res) => {
  res.status(200).json({
    message: `PUT: Update user with ID ${req.params.id}`,
    user: req.body
  });
});

// DELETE
app.delete('/users/:id', (req, res) => {
  res.status(200).json({
    message: `DELETE: User with ID ${req.params.id} deleted`
  });
});

// Start server
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
