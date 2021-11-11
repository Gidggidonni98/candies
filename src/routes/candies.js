const express = require('express');
const router  = express.Router();
const pool = require('../database.js');

router.get('/', async(req, res) =>{
    let listCandies = pool.query('SELECT * FROM candies');
    res.json({
        status: 200,
        message: "Se ha listado correctamente",
        listCandies: listCandies
    });
});

router.get('/:id', async(req,res) => {
    const { id } = req.params;
    let candie = await pool.query('SELECT * FROM candies WHERE id= ?', [id]);
    res.json({
        status: 200,
        message: "Se ha encontrado correctamente",
        candie:candie
    });
});

router.post('/create', async(req, res) => {
    const {name, price, expiration, isSalad} = req.body;
    var dateCreated = new Date().toISOString();
    const candie = {
        name, price, expiration, isSalad, date_registered: dateCreated, date_created: dateCreated, status: 1
    };
    
    await pool.query('INSERT INTO candies set ?' , [candie]);
    res.json({
        status: 200,
        message: "Se ha creado correctamente",
        candie: candie
    });
});

router.post('/update/:id', (req, res) => {
    const { id } = req.params;
    const {name, price, expiration, isSalad} = req.body;

    const candie = {name, price, expiration, isSalad};
    pool.query('UPDATE candies SET ? WHERE id = ?', [candie, id]);
    res.json({
        status: 200,
        message: "Se ha actualizado correctamente",
        product:product
    });
});

router.post('/delete/:id', (req, res) => {
    const { id } = req.params;

    pool.query('UPDATE candies SET status = 0  WHERE idProduct = ?' , [id]);
    res.json({
        status: 200,
        message: "Se ha inactivado correctamente",
    });
})


module.exports = router;
