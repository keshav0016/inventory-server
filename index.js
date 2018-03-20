
const express = require('express');
const app = express();
const passport = require('./passport/config')
const bodyparser =  require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const login = require('./controller/login')

//passport initialization

app.use(passport.initialize());

app.use(bodyparser.json());
app.use(cookieParser());


app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

//global error handling
app.use((error, req, res, next) => {
    res.status(500).send('internal error occurred')
    next()
});

//login route
app.use('/login',login)


app.listen(3001,() => {
    console.log("started");
});
