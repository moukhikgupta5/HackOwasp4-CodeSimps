const express = require('express');
const router = express.Router();
const Sweeper = require('../models/sweeper');
const User = require('../models/User');
const { ensureAuthenticated } = require('../config/auth');
const { findByIdAndUpdate } = require('../models/User');

//Welcome Page
router.get('/Dash', (req, res) => {
    res.render('welcome');
});

router.get('/login', (req, res) => {
    res.render('slogin');
})

router.post('/login', async (req, res) => {
    const sweep = await Sweeper.findOne({email: req.body.email});
    if(sweep){
        const requests = await User.find({isRequest: true});
        res.render('sdash', {name: sweep.name, requests: requests});
    }else{
        res.redirect('/s/login');
    }
});

router.post('/update/:id', async (req, res) => {
    const st_id = req.params.id;
    console.log(st_id);
    const st = await User.findByIdAndUpdate(st_id, {
        $set: {
            isRequest: false
        }
    }, {new: true});
    console.log(st);
})
module.exports = router;