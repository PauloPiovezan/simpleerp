const express = require('express');
const path = require('path');
const router = express.Router();
const db = require('../db');


//GET the user's products from the DB, or a single one filtered by id;
//All
router.get('/:uid/products/', async (req,res) => {
    const uid = req.params.uid;
    const queryResponse = await db.query(`SELECT * FROM produtos WHERE uid = $1`,[uid]);

    const queryData = queryResponse.rows;

    res.status(200).json(queryData);

})
//Single
router.get('/:uid/products/:product',async (req,res) => {
    const uid = req.params.uid;
    const pid = req.params.product;


    const queryResponse = await db.query(`SELECT * FROM produtos WHERE uid = $1 AND id = $2`,[uid,pid]);

    const queryData = queryResponse.rows[0];

    res.status(200).json(queryData);


})

//CREATE NEW PRODUCT
router.put('/:uid/products',async (req, res) => {

    const name = req.body.name;
    const cost = req.body.cost;
    const price = req.body.price;
    const unitId = req.body.unitId;
    const inventory = req.body.inventory;
    const uid = req.params.uid;

    const queryResponse = await db.query(`INSERT INTO produtos (nome, id_unidade, custo, preco,estoque, uid) VALUES($1, $2, $3, $4, $5, $6)`,[name, unitId, cost, price, inventory, uid ])
    res.status(201).send();



})

router.delete('/:uid/products/:pid',async (req, res) => {

    const pid = req.params.pid;
    const uid = req.params.uid;

    const queryResponse = await db.query(`DELETE FROM produtos WHERE uid = $1 AND id = $2 RETURNING *`,[uid,pid]);
    const queryProduct = queryResponse.rows[0].nome;
    console.log("Produto Excluido:" + queryProduct);
    res.status(204).send();



})



module.exports = router;