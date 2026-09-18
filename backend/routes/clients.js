const express = require('express');
const db = require('../db');
const router = express.Router();



//GET

//All clients
router.get('/:uid/clients',async (req, res) => {

    const uid = req.params.uid;

    if (!uid){

        res.status(400).send();

    }

    try {
    const queryResponse = await db.query(`SELECT * FROM clientes WHERE uid = $1`,[uid]);
    const queryData = queryResponse.rows;
    res.status(200).json(queryData);
    }
    catch(error){

        res.status(500).send(error.name);

    }

})
//Single Client
router.get('/:uid/clients/:cid',async (req, res) => {

    const uid = req.params.uid;
    const cid = req.params.cid;

    if (!uid || !cid){

        res.status(400).send();

    }

    try {

    const queryResponse = await db.query(`SELECT * FROM clientes WHERE uid = $1 AND id = $2`,[uid,cid]);
    const queryData = queryResponse.rows[0];
    res.status(200).json(queryData);
    }
    catch(error){

        res.status(500).send(error.name);

    }
})

//Create new Client


router.put('/:uid/clients',async (req, res) => {
    const uid = req.params.uid;

    if (!uid){

        res.status(400).send();

    }

    const {name, cpf_cnpj, uf, cep, address, number, credit, ie} = req.body;

    try{
    const queryResponse = db.query(`INSERT INTO clientes (nome, cpf_cnpj, uf_id, cep, endereco, numero, credito, ie, uid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,[name, cpf_cnpj, uf, cep, address, number, credit,ie,uid]);

    res.status(204).send();
    }
    catch(error){

        res.status(500).send(error.name);

    }
});

//Delete Client
router.delete('/:uid/clients/:cid', async (req, res) => {
    const uid = req.params.uid;
    const cid = req.params.cid;
    
    if (!uid || !cid){

        res.status(400).send();

    }

    try {
    const queryResponse = db.query(`DELETE FROM clientes WHERE uid = $1 AND id = $2`,[uid,cid]);

    res.status(204).send();
    } 
    catch(error){

        res.status(500).send(error.name);

    }
})


//Update Client
router.patch('/:uid/clients/:cid',async (req, res) => {
    const uid = req.params.uid;
    const cid = req.params.cid;
    const {name, cpf_cnpj, uf, cep, address, number, credit, ie} = req.body;


    const queryResponse = db.query(`UPDATE clientes SET nome = $1, cpf_cnpj = $2, uf_id = $3, cep = $4, endereco = $5, numero = $6, credito = $7, ie = $8 WHERE uid = $9 AND id = $10`,[name,cpf_cnpj,uf,cep, address,number,credit,ie,uid,cid]);

    res.status(204).send();

});






module.exports = router;