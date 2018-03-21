

const express = require('express');
const app = express();
const passport = require('./passport/config')
const bodyParser =  require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const login = require('./controller/login')

//crud of employees
const createEmployee = require('./routes/employees/create')
const listEmployee = require('./routes/employees/list')
const updateEmployee = require('./routes/employees/update')
const delEmployee = require('./routes/employees/delete')

//crud of tickets
const createTicket = require('./routes/tickets/create')

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
app.use('/employee',createEmployee)
app.use('/employee',listEmployee)
app.use('/employee',updateEmployee)
app.use('/employee',delEmployee)

//tickets routes
app.use('/ticket',createTicket)


app.listen(3001,() => {
    console.log("started");
});
