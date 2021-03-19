const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const server = http.createServer(app);

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL)
	res.setHeader("Access-Control-Allow-Methods", 'GET, POST, DELETE')
    res.setHeader("Access-Control-Allow-Headers", 'Content-Type', "Authorization")
    res.header("Access-Control-Allow-Credentials", true)
	next();
})

app.use(express.json())
app.use(cors());

require('./Router/auth')

const USER_ROUTER = require('./Router/user.router');

app.use('/auth', USER_ROUTER);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server has started on port ${PORT}`))

const URI = process.env.ATLAS_URI;
mongoose.connect(URI, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})