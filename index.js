

const express = require('express');
const app = express();
const passport = require('./passport/config')
const bodyParser =  require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const login = require('./controller/login')
// const create = require('./routes/employees')

//passport initialization

app.use(passport.initialize());

app.use(bodyParser.json());
app.use(cookieParser());


app.use(cors({
    origin: '*',
    credentials: true
}));

//global error handling
app.use((error, req, res, next) => {
    res.status(500).send('internal error occurred')
    next()
});

//login route
app.use('/login',login)
//employees routes
//app.use('/employee',create)
// app.use('/employee',list)


app.listen(3001,() => {
    console.log("started");
});
