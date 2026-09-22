const express = require('express');
const db = require('../db');
const router = express.Router();


//Get Single or All
//Single
router.get('/:uid/pay/:pid',async (req,res) => {

    const {uid, pid} = req.params;

    if (!uid || !pid){

       return res.status(400).send();
    }


    try {
    const queryResponse = await db.query(`SELECT * FROM pagar WHERE uid = $1 AND pid = $2`,[uid,pid]);
    const queryData = queryResponse.rows[0];

    res.status(200).json(queryData);
    }catch(error){

        res.status(500).send("Server Error!");

    }

});
//All
router.get('/:uid/pay/',async (req,res) => {

    const uid = req.params.uid;

    if (!uid){

        return res.status(400).send();

    }
    try{
    const queryResponse = await db.query(`SELECT * FROM pagar WHERE uid = $1`,[uid]);
    const queryData = queryResponse.rows;

    res.status(200).json(queryData);
    } catch(error){
        res.status(500).send("Server Error!");
    }
});
//Create
router.put('/:uid/pay', async (req, res) => {

    const uid = req.params.uid;

    

    const {status, value, closing_date, payID, supplier, purchase } = req.body;

    if (!uid){

        return res.status(400).send();

    }

    try{
    const queryResponse = db.query(`INSERT INTO pagar (status, valor, data_fechamento, id_pagamento, id_fornecedor, id_pedido, uid) VALUES ($1,$2,$3,$4,$5,$6,$7)`,[status,value,closing_date,payID,supplier,purchase,uid]);

        res.status(204).send();

    }
    catch(error){

        res.status(500).send("Server Error!");

    }


})
//Update
router.patch('/:uid/pay/:pid', async (req, res) => {

    const {uid,pid} = req.params;

    

    const {status, value, closing_date, payID, supplier, purchase } = req.body;

    if (!uid || !pid){

        return res.status(400).send();

    }

    try{
    const queryResponse = db.query(`UPDATE pagar SET status =$1, valor = $2, data_fechamento = $3, id_pagamento = $4, id_fornecedor = $5, id_pedido = $6 WHERE uid = $7`,[status,value,closing_date,payID,supplier,purchase]);
    

    res.status(204).send();

    }
    catch(error){

        res.status(500).send("Server Error!");

    }


})
//Delete
router.delete('/:uid/pay/:pid',async (req,res) => {

    const {uid, pid} = req.params;

    if (!uid || !pid){

        return res.status(400).send();

    }
    try {
    const queryResponse = await db.query(`DELETE FROM pagar WHERE uid = $1 AND pid = $2`,[uid,pid]);
    const queryData = queryResponse.rows[0];

    res.status(204).send();
    }catch(error){

        res.status(500).send("Server Error!");

    }
});

module.exports = router;