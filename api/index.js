const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json())

// Home route
app.get('/', (req, res) => {
    res.send('Hello, Node.js Backend!');
});

// Example JSON Route (GET)
app.get('/api/data', (req, res) => {
    res.json({
        message: 'Here is some sample JSON data!',
        success: true
    })
})

// Example POST Route (Receive JSON)
app.post('/api/submit', (req, res) => {
    const data = req.body
    console.log('Received data:', data)
    res.json( {
        message: 'Data received successfully!',
        youData: data
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Press Ctrl+C to stop...')
});
