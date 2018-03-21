

const express = require('express');
const app = express();
const passport = require('./passport/config')
const bodyParser =  require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const login = require('./controller/login')

//crud of employees
const create = require('./routes/employees/create')
const list = require('./routes/employees/list')
const update = require('./routes/employees/update')
const del = require('./routes/employees/delete')

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
app.use('/employee',create)
app.use('/employee',list)
app.use('/employee',update)
app.use('/employee',del)


app.listen(3001,() => {
    console.log("started");
});
