const mongoose = require('mongoose');
const Sweeper = require('./models/sweeper');

module.exports = {
    updateSweep: async function(){
        const sweep = new Sweeper({ //making course as an object of class Course
            name: 'Ramesh',
            phno: '1234567890',
            email: 'hello@gmail.com',
            password: '123456'
        });
        
        try{
            const result = await sweep.save();
            console.log(result);
        }
        catch(ex) {
            for(field in ex.errors)
                console.log(ex.errors[field].message);
        }
    }
}