require('dotenv').config();
const express = require('express');
const db = require('../db');
const loginRouter = express.Router();


loginRouter.post('/login',(req,res) => {res.send("HELLO")});




module.exports = loginRouter;