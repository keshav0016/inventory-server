

const express = require('express');
const app = express();
const passport = require('./passport/config')
const bodyParser =  require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const login = require('./controller/login')


// import assets route
const createAssetRoute = require('./routes/assets/create')
const listAssetRoute = require('./routes/assets/list')
const updateAssetRoute = require('./routes/assets/update')
const deleteAssetRoute = require('./routes/assets/update')
const formAssignAssetRoute = require('./routes/assets/formAssignAsset')



// import employees route
const createEmployeeRoute = require('./routes/employees/create')
const listEmployeeRoute = require('./routes/employees/list')
const updateEmployeeRoute = require('./routes/employees/update')
const deleteEmployeeRoute = require('./routes/employees/delete')



// import tickets route
const createTicketRoute = require('./routes/tickets/create')
const listAvailablesRoute = require('./routes/tickets/listOfAvailables')



// passport initialization
app.use(passport.initialize());

app.use(bodyParser.json());
app.use(cookieParser());


app.use(cors({
    origin: '*',
    credentials: true
}));



// global error handling
app.use((error, req, res, next) => {
    res.status(500).send('internal error occurred')
    next()
});

// login route
app.use('/login',login)

// employees routes
app.use('/employee',createEmployeeRoute)
app.use('/employee',listEmployeeRoute)
app.use('/employee',updateEmployeeRoute)
app.use('/employee',deleteEmployeeRoute)

// tickets routes
app.use('/ticket',createTicketRoute)
app.use('/ticket',listAvailablesRoute)



// assets routes
app.use('/asset', createAssetRoute)
app.use('/asset', listAssetRoute)
app.use('/asset', updateAssetRoute)
app.use('/asset', deleteAssetRoute)
app.use('/asset', formAssignAssetRoute)



app.listen(3001,() => {
    console.log("started");
});
