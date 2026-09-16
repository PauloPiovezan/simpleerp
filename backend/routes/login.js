require('dotenv').config();
const express = require('express');
const db = require('../db');
const jwt = require('jsonwebtoken');
const loginRouter = express.Router();


loginRouter.post('/login', async (req,res) => {
//Gets the username and password from the request body
const username = req.body.username;
const password = req.body.password;

//Queries the DB to see if there is a user row matching the requested username and password

const queryResponse = await db.query(`SELECT * FROM usuarios WHERE nomeusuario = $1 AND senha = $2`,[username,password]);
queryData = queryResponse.rows;
//If the length of the array returned from the query is 0, meaning there were no matching users found, the request fails
if (queryData.length === 0){

    res.status(401).send("Credencias Incorretas!");

}

//If the length is NOT 0, meaning there was a match, sign a JWT that expires in 5 minutes 
//and send it as a cookie to the frontend

else{

    const token = jwt.sign({
        sub : queryData[0].uid,
        iss : 'SimpleERP',
        role: queryData[0].permissao
    }, process.env.JWT_SECRET, {expiresIn: '5m'})

    res.cookie('token',token,{httpOnly:true});
//Upon succesful login, updates the matching user's refresh token and stores it in another cookie, also sent to the frontend, and sends a successful login response
    const reftokenResponse = await db.query(`UPDATE usuarios SET reftoken = gen_random_uuid() WHERE uid = $1 RETURNING reftoken`,[queryData[0].uid]);
    res.cookie('reftoken',reftokenResponse.rows[0].reftoken,{httpOnly:true});
    res.status(200).send("Login Efeituado com sucesso!");
}


});




module.exports = loginRouter;