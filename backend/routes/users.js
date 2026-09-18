const express = require('express');
const db = require('../db');
const bcrypt = require('bcrypt');
const router = express.Router();

//GET user
router.get('/users/:uid', async (req, res) =>{

    const uid = req.params.uid;

    if(!uid){

        res.status(400).send();

    }

    try {

        const queryResponse = await db.query(`SELECT * FROM usuarios WHERE uid = $1`,[uid]);

        res.status(200).json(queryResponse.rows[0]);

    }

    catch(error){

        res.status(500).send(error.name);

    }



});
//Change Username
router.patch('/users/:uid/name', async (req, res) =>{

    const uid = req.params.uid;
    const username = req.body.username;

    if(!uid || !name){

        res.status(400).send();

    }

    try {

        const queryResponse = await db.query(`UPDATE usuarios SET nomeusuario = $1 WHERE uid = $2`,[username,uid]);

        res.status(204).send();

    }

    catch(error){

        res.status(500).send(error.name);

    }



});

//Change Password
router.patch('/users/:uid/password', async (req, res) =>{

    const uid = req.params.uid;
    const password = req.body.password;

    if(!uid || !password){

        res.status(400).send();

    }



    try {

        const passHash = await bcrypt.hash(password,13);

        const queryResponse = await db.query(`UPDATE usuarios SET senha = $1 WHERE uid = $2`,[passHash,uid]);

        res.status(204).send();

    }

    catch(error){

        res.status(500).send(error.name);

    }



});
//Create new User

router.put('/users', async (req, res) => {

    const {username,password} = req.body;

    if (!username || !password){

        res.status(400).send();

    }


    try{
    const passHash = await bcrypt.hash(password,13);

    const queryResponse = db.query(`INSERT INTO usuarios (nomeusuario,senha, permissao) VALUES ($1, $2, 'A')`,[username,passHash]);

    res.status(201).send("Novo Usuário Cadastrado com sucesso!");
    }
    catch(error){

        res.status(500).send(error.name);

    }

});










module.exports = router;