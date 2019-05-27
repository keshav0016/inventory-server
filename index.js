require('dotenv').config();

const express = require('express');
const app = express();
const passport = require('passport')
const bodyParser =  require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors');
const path = require('path');

const login = require('./controller/login')
const logout = require('./controller/index')
const changePassword = require('./controller/index')
const changePasswordAuto = require('./controller/changePasswordAuto')

const config = require('./passport/config')
const tokenAuth = require('./middleware/tokenAuth')
const admintokenAuth = require('./middleware/admintokenAuth')

//import admin Router
const adminRouter = require('./routes/admin/index')
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

// import Asset Type Router
const assetTypeRouter = require('./routes/assetType/index')

// import forgot password Router
const forgotPasswordRouter = require('./controller/forgotPassword')

// import QRcode router
const qrCodeRouter = require('./routes/assets/qrCode')

const qrAllRouter = require('./qrAll.js')

//Reception
const reception = require('./routes/reception');
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.get('/api/asset/qr', qrCodeRouter)

app.get('/api/asset/qrAll', qrAllRouter)

const publicPath = path.resolve(__dirname, './public');
app.use('/', express.static(publicPath))


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
app.use('/api/user',login)
app.use('/api/user',logout)
app.use('/api/user',forgotPasswordRouter)
app.use('/api/user', changePasswordAuto )


// Admin auth middleware
// app.use(admintokenAuth)




// assets routes
app.use('/api/asset', assetRouter)

// consumables routes
app.use('/api/consumables', consumableRouter)

// vendor routes
app.use('/api/vendor', vendorRouter)

//admin routes
app.use('/api/admin', adminRouter)


// admin ticket routes
app.use('/api/admin/ticket', adminTicketRouter)

// admin employees routes
app.use('/api/employees',employeeRouter)

// vendor routes
app.use('/api/vendor', vendorRouter)

// assetType routes
app.use('/api/assetType', assetTypeRouter)


// employee auth middleware
// app.use(tokenAuth)

// employee tickets routes
app.use('/api/employee/ticket', employeeTicketRouter)

app.use('/api/reception', reception);

app.get("*", (req,res,next)=>{
    res.sendFile(path.resolve(__dirname, './public/index.html'))
})


app.listen(process.env.PORT,() => {
    console.log("started");
});
