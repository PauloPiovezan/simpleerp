const express = require('express');
const db = require('../db');
const router = express.Router();


//Get all or Single
//All

router.get('/:uid/purchases', async (req,res) =>{

    const uid = req.params.uid;

    if (!uid){

        return res.status(400).send();

    }
    try {
    const queryResponse = await db.query(`SELECT * FROM cabecalho_compras WHERE uid = $1`,[uid]);

    const queryData = queryResponse.rows;

    res.status(200).json(queryData);
    }catch(error){

        res.status(500).send("Server Error!");

    }

});

router.get('/:uid/purchases/:pid', async (req,res) =>{

    const {uid,pid} = req.params;

    if (!uid || !pid){

        return res.status(400).send();

    }
    try {
    const queryResponse = await db.query(`SELECT * FROM cabecalho_compras WHERE uid = $1 AND pid = $2`,[uid,pid]);

    const queryData = queryResponse.rows[0];

    res.status(200).json(queryData);
    }catch(error){

        res.status(500).send("Server Error!");

    }

});

//Create new
router.put('/:uid/purchases', async (req, res) => {

    const uid = req.params.uid;

    if (!uid){

        return res.status(400).send();

    }

    const {cfop,supplier,payID,status} = req.body;

    try {

    const queryResponse = db.query(`INSERT INTO cabecalho_compras (id_cfop,id_fornecedor,id_pagamento,status,uid) VALUES ($1, $2, $3, $4, $5)`,[cfop,supplier,payID,status,uid]);


    res.status(204).send();

    }
    catch(error){

        res.status(500).send("Server Error!");

    }
});
//Update
router.patch('/:uid/purchases', async (req, res) => {

    const {uid,pid} = req.params;

    if (!uid || !pid){

        return res.status(400).send();

    }

    const {cfop,supplier,payID,status} = req.body;
    try {
    const queryResponse = db.query(`UPDATE cabecalho_compras SET id_cfop = $1, id_fornecedor = $2, id_pagamento = $3, status = $4 WHERE uid = $5 AND id = $6`,[cfop,supplier,payID,status,uid,pid]);

    res.status(204).send();
    }
    catch(error){

        res.status(500).send("Server Error!");

    }
});
//Delete
router.delete('/:uid/purchases/:pid', async (req,res) =>{

    const {uid,pid} = req.params;

    if (!uid || !pid){

        return res.status(400).send();

    }
    try {
    const queryResponse = await db.query(`DELETE FROM cabecalho_compras WHERE uid = $1 AND pid = $2`,[uid,pid]);

    res.status(204).send();
    }
    catch(error){

        res.status(500).send("Server Error!");

    }

});


module.exports = router;