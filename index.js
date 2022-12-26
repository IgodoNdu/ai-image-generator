const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;

//initialize express
const app = express();

app.use('/openai', require('./routes/openaiRoute'));

app.listen(port, () => console.log(`Server started on port ${port}`));