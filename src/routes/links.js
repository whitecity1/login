const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const router = express.Router();

const pool = require('../database');
const {isLoggedIn} = require('../lib/auth');

router.get('/add', isLoggedIn, (req, res)=>{
    res.render('links/add');
});

router.post('/add', isLoggedIn, async (req, res)=>{
   const { titulo, url, descripcion } = req.body;
   const newLink = {
    titulo,
    url,
    descripcion, 
    user_id: req.user.id
   };
   await pool.query('INSERT INTO links set ?', [newLink]);
//    console.log(newLink);
    req.flash('success', 'Registro almacenado exitosamente');
    res.redirect('/links');
    // res.send('received ');
});
router.get('/', isLoggedIn, async (req, res) =>{
   const links = await pool.query('SELECT *  FROM links WHERE user_id = ? ', [req.user.id]);
//    console.log(links);
   res.render('links/list.hbs',{links});
});

router.get('/delete/:id', isLoggedIn, async(req, res)=>{
   const {id} = req.params;
   await pool.query('DELETE FROM links WHERE ID = ? ', [id]);
   req.flash('success', 'Registro eliminado satisfactoriamente');
   res.redirect('/links');
   // console.log(req.params.id);
   // res.send('Eliminado');
});

router.get('/edit/:id', isLoggedIn, async(req, res)=>{
   const {id} = req.params;
   console.log(id);
   const links = await pool.query('SELECT * FROM links WHERE ID = ?', [id]);
   console.log(links[0]);
   res.render('links/edit', {link:links[0]});
});

router.post('/edit/:id', isLoggedIn, async(req, res)=>{
   const {id} = req.params;
   const { titulo, url, descripcion } = req.body;
   const newLink = {
      titulo,
      url, 
      descripcion 
   };
   await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id]);
   req.flash('success', 'Haz actualizado tu registro con éxito');
   res.redirect('/links');
});

module.exports = router;