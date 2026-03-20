const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables before anything else
dotenv.config({ path: path.join(__dirname, '.env') });

const apiRouter = require('./router/apiRouter');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', apiRounter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

module.exports = app;
