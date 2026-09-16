require('dotenv').config();
const express = require('express');
const db = require('../db');
const jwt = require('jsonwebtoken');
const loginRouter = express.Router();


loginRouter.post('/login', async (req,res) => {

const username = req.body.username;
const password = req.body.password;

const queryResponse = await db.query(`SELECT * FROM usuarios WHERE nomeusuario = $1 AND senha = $2`,[username,password]);
queryData = queryResponse.rows;

if (queryData.length === 0){

    res.status(401).send("Credencias Incorretas!");

}
else{

    const token = jwt.sign({
        sub : queryData[0].uid,
        iss : 'SimpleERP',
        role: queryData[0].permissao
    }, process.env.JWT_SECRET, {expiresIn: '5m'})

    res.cookie('token',token,{httpOnly:true});
    const reftokenResponse = await db.query(`UPDATE usuarios SET reftoken = gen_random_uuid() WHERE uid = $1 RETURNING reftoken`,[queryData[0].uid]);
    res.cookie('reftoken',reftokenResponse.rows[0].reftoken,{httpOnly:true});
    res.status(200).send("Login Efeituado com sucesso!");
}


});




module.exports = loginRouter;