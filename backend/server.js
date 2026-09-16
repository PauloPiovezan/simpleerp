require('dotenv').config();
const loginRouter = require('./routes/login');
const express = require('express');

const app = express();
const PORT = process.env.PORT;



app.use('/auth', loginRouter);



app.listen(PORT, () => {console.log("App Listening on port " + PORT)})