const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const router = express.Router();

router.get('/', (req, res) =>{
     res.render('index');
});

module.exports = router;