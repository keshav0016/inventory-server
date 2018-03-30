

const express = require('express');
const app = express();
const passport = require('passport')
const bodyParser =  require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const login = require('./controller/login')
const config = require('./passport/config')


// import assets Router
const assetRouter = require('./routes/assets/index')

// import employees Router
const employeeRouter = require('./routes/employees/index')

// import consumables Router
const consumableRouter = require('./routes/consumables/index') 

// import ticketsAdmin Router
const adminTicketRouter = require('./routes/ticketsAdmin/index')

// import ticketsEmployee Router
const employeeTicketRouter = require('./routes/ticketsEmployee/index')

// import vendor router
const vendorRouter = require('./routes/vendor/index')





app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));


// Body parser and cookie parser initialization
app.use(bodyParser.json());
app.use(cookieParser());


// global error handling
app.use((error, req, res, next) => {
    res.status(500).send('internal error occurred')
    next()
});


// passport initialization
passport.use(config)
app.use(passport.initialize());


// login Router
app.use('/user',login)



// Admin auth middleware

// employees routes
app.use('/employee',employeeRouter)



// assets routes
app.use('/asset', assetRouter)

// consumables routes
app.use('/consumables', consumableRouter)

// vendor routes
app.use('/vendor', vendorRouter)


// admin ticket routes
app.use('/admin/ticket', adminTicketRouter)



// employee auth middleware

// employee tickets routes
app.use('/user/ticket', employeeTicketRouter)


app.listen(3001,() => {
    console.log("started");
});
