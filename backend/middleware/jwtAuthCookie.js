const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');



async function jwtAuthCookie(req, res, next){

    const token = req.cookies.token;
    try {

        jwt.verify(token,process.env.JWT_SECRET)
        next();
    } catch(err){
        if (err.name == "TokenExpiredError" ){
        const reftoken = req.cookies.reftoken;
        
        const queryResponse = await db.query(`SELECT * FROM usuarios WHERE uid = $1`,[jwt.decode(token).sub]);
        const queryData = queryResponse.rows;

        if (reftoken == queryData[0].reftoken){
            const newToken = jwt.sign({
                    sub : queryData[0].uid,
                    iss : 'SimpleERP',
                    role: queryData[0].permissao
                }, process.env.JWT_SECRET, {expiresIn: '5m'})
            
                res.cookie('token',newToken,{httpOnly:true});
                next();


        } else {
            res.status(401).send(err.name);
            res.clearCookie('token');
            res.clearCookie('reftoken');
        }
    }
    else{
        res.status(401).send(err.name);
        res.clearCookie('token');
    }

        

    }


}
