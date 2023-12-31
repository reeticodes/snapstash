const express = require('express');
const connectDB = require('./config/db');
var path = require('path');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');




//Connect Database
connectDB();

//Init Middleware
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors())
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));

//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/albums', require('./routes/api/album'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));