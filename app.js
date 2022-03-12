const express        = require('express');
const session       = require('express-session');
//const hbs            = require('express-handlebars');
const expressLayouts = require('express-ejs-layouts');
const mongoose       = require('mongoose');
const passport       = require('passport');
const flash          = require('connect-flash');

const app = express();

//Passport config
require('./config/passport')(passport);

//DB config
const db = require('./config/keys').MongoURI;

//Conect to Mongo
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))
;

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Bodyparser
app.use(express.urlencoded({ extended: false }));

//Express-session
app.use(session({
    secret: "verygoodsecret",
    resave: true,
    saveUninitialized: true
}));

//Passport.js
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

//Global Vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error= req.flash('error');
    next();
});

app.use(express.static('public'));

//Routes
app.use('/', require('./routes/index'));
app.use('/s', require('./routes/sweeperRoutes'));
app.use('/users', require('./routes/userRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started at port ${PORT}`));

//update sweep
// const upSweep = require('./sweepDB');
// const update = upSweep.updateSweep();


// //Middleware
// app.engine('hbs', hbs({ extname: '.hbs'}));
// app.set("view engine", 'hbs');
// app.use(express.static(__dirname + '/public'));

// app.use(express.json());



