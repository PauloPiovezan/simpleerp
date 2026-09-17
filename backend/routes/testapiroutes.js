const express = require('express');
const path = require('path');
const router = express.Router();




router.get('/test',(req,res) => {res.status(200).send("YOOOOO")})


module.exports = router;