require('dotenv').config();
const loginRouter = require('./routes/login');
const express = require('express');
const jwtAuthCookie = require('./middleware/jwtAuthCookie');
const app = express();
const PORT = process.env.PORT;


app.use(express.json());

app.use('/auth', loginRouter);

app.use('/api',jwtAuthCookie)

app.listen(PORT, () => {console.log("App Listening on port " + PORT)})