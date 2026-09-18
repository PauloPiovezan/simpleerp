const express = require('express');
const jwt = require('jsonwebtoken');



async function sameUserAuth(req, res, next) {

    const uid = req.params.uid;
    const token = jwt.decode(req.cookies.token);

    if (uid){
    uid == token.sub ? next() : res.status(401).send("ACCESS DENIED");
    }else{
    next();
    }
}


module.exports = sameUserAuth;