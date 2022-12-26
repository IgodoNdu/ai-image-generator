const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;

//initialize express
const app = express();

//Enable body parser for accepting body data (req.body)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Set static folder
app.use(express.static(path.join(__dirname, '../ai-image-gen-frontend')))

app.use('/openai', require('./routes/openaiRoute'));

app.listen(port, () => console.log(`Server started on port ${port}`));