const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const cors = require('cors')

const categoriesRouter = require('./app/api/v1/categories/router')
const imageRouter = require('./app/api/v1/images/router')
const talentRouter = require('./app/api/v1/talents/router')
const eventRouter = require('./app/api/v1/events/router')
const organizerRouter = require('./app/api/v1/organizers/router')
const authCMSRouter = require('./app/api/v1/auth/router')
const orderRouter = require('./app/api/v1/order/router')
const participantRouter = require('./app/api/v1/participants/router')
const paymentRouter = require('./app/api/v1/payments/router')
const userRefreshTokenRouter = require('./app/api/v1/userRefreshToken/router')

const v1 = '/api/v1'

const notFoundMiddleware = require('./app/middleware/notFound')
const handleErrorMiddleware = require('./app/middleware/handlerError')

app.use(cors()) //pastiin diatas router

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(`${v1}/cms`, categoriesRouter)
app.use(`${v1}/cms`, imageRouter)
app.use(`${v1}/cms`, talentRouter)
app.use(`${v1}/cms`, eventRouter)
app.use(`${v1}/cms`, organizerRouter)
app.use(`${v1}/cms`, authCMSRouter)
app.use(`${v1}/cms`, orderRouter)
app.use(`${v1}/cms`, paymentRouter)
app.use(`${v1}/cms`, userRefreshTokenRouter)
app.use(`${v1}`, participantRouter)

app.use(notFoundMiddleware)
app.use(handleErrorMiddleware) //error dithrow ke handlerError lalu dihandle oleh middleware ini

app.use('/', (req,res)=>{
    res.status(200).json({
        message: 'Welcome to API'
    })
});


module.exports = app;
