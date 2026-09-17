const express = require('express');
const path = require('path');
const router = express.Router();



router.get('/login',(req,res) => {res.sendFile(path.join(__dirname,'../mockfrontend/login.html'))});

router.get('/dash',(req,res) => {res.sendFile(path.join(__dirname,'../mockfrontend/dashboard.html'))});



module.exports = router;