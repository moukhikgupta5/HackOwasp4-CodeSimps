const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');

//User Model
const User = require('../models/User');

//Login Page
router.get('/login', (req, res) => {
    res.render('login');
});

//Register page
router.get('/register', (req, res) => {
    res.render('register');
});

//Register Handle
router.post('/register', (req, res) => {
    const { name, rno, phno, roomno, email, password, password2 } = req.body;
    let errors = [];

    //check required fields
    if(!name || !rno || !phno || !roomno || !email || !password || !password2){
        errors.push({ msg: 'Please fill in all fields' });
    }

    //check passwords match
    if(password != password2){
        errors.push({ msg: 'Passwords donot match' });
    }

    //check pass length
    if(password.length < 6){
        errors.push({ msg: 'Password should be atleast 6 characters long' });
    }

    if(errors.length > 0){
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    }else{
        //validation passed
        User.findOne( { email: email })
            .then(user => {
                if(user){
                    //user exists
                    errors.push({ msg: 'Email is already registered' });
                    res.render('register', {
                        errors,
                        name,
                        rno,
                        phno,
                        roomno,
                        email,
                        password,
                        password2
                    });
                }else{
                    const newUser = new User({
                        name,
                        rno,
                        phno,
                        roomno,
                        email,
                        password
                    });

                    //Hash Password
                    bcrypt.genSalt(10, (err, salt) => 
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) throw err;
                            //Set password to hashed
                            newUser.password = hash;

                            //Save user
                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg', 'You are now registered and can log in');
                                    res.redirect('/users/login');
                                })
                                .catch(err => console.log(err))
                            ;
                    }))
                }
            });

    }
});

//Login Hande
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

//Logout Handle
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out successfully!');
    res.redirect('/users/login');
})

router.post('/request', async (req, res) => {
    const sId = req.user._id;
    const st = await User.findByIdAndUpdate(sId, {
        $set: {
            isRequest: true
        }
    }, {new: true});
    console.log(st);
})
module.exports = router;