const express = require('express');
const db = require('../db');
const router = express.Router();


//Get all or Single
//All

router.get('/:uid/purchasesitems', async (req,res) =>{

    const uid = req.params.uid;

    if (!uid){

        return res.status(400).send();

    }
    try {
    const queryResponse = await db.query(`SELECT * FROM produtos_compras WHERE uid = $1`,[uid]);

    const queryData = queryResponse.rows;

    res.status(200).json(queryData);
    }catch(error){

        res.status(500).send("Server Error!");

    }

});

router.get('/:uid/purchasesitems/:pid', async (req,res) =>{

    const {uid,pid} = req.params;

    if (!uid || !pid){

        return res.status(400).send();

    }
    try {
    const queryResponse = await db.query(`SELECT * FROM produtos_compras WHERE uid = $1 AND pid = $2`,[uid,pid]);

    const queryData = queryResponse.rows[0];

    res.status(200).json(queryData);
    }catch(error){

        res.status(500).send("Server Error!");

    }

});

//Create new
router.put('/:uid/purchasesitems', async (req, res) => {

    const uid = req.params.uid;

    if (!uid){

        return res.status(400).send();

    }

    const {product,head} = req.body;

    try {

    const queryResponse = await db.query(`INSERT INTO cabecalho_compras (id_produto, id_cabecalho, uid) SELECT * FROM UNNEST($1::INTEGER[], $2::INTEGER[], $3::UUID[])`,[product,head,uid]);


    res.status(204).send();

    }
    catch(error){

        res.status(500).send("Server Error!");

    }
});
//Update
router.patch('/:uid/purchasesitems/:pid', async (req, res) => {

    const {uid,pid} = req.params;

    if (!uid || !pid){

        return res.status(400).send();

    }

    const {products} = req.body;
    try {
    const queryResponse = await db.query(`UPDATE produtos_compras SET id_produto = u.products, id_cabecalho = u.head FROM UNNEST($1::INTEGER[], $2::INTEGER[], $3::UUID[], $4::INTEGER[]) AS u (products, head, uid, pid) WHERE produtos_compras.uid = u.uid AND produtos_compras.id = u.pid`,[products,head,uid,pid]);

    res.status(204).send();
    }
    catch(error){

        res.status(500).send("Server Error!");

    }
});
//Delete
router.delete('/:uid/purchasesitems/:pid', async (req,res) =>{

    const uid = req.params.uid;

    if (!uid){

        return res.status(400).send();

    }

    const {products} = req.body

    try {
    const queryResponse = await db.query(`DELETE FROM produtos_compras WHERE uid = $1 AND id = ANY($2::INTEGER)`,[uid,products]);

    res.status(204).send();
    }
    catch(error){

        res.status(500).send("Server Error!");

    }

});


module.exports = router;