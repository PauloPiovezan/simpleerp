require('dotenv').config();
const loginRouter = require('./routes/login');
const devFrontendRouter = require('./routes/mockfrontendroutes');
const testApiRouter = require('./routes/testapiroutes');
const productRouter = require('./routes/products');
const clientRouter = require('./routes/clients');
const userRouter = require('./routes/users')
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const jwtAuthCookie = require('./middleware/jwtAuthCookie');
const sameUserAuth = require('./middleware/sameUserAuth');
const app = express();
const cors = require('cors')
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/dev/dash',jwtAuthCookie);
app.use('/dev', devFrontendRouter);
app.use('/auth', loginRouter);
//JWT auth comes before any request to /api and subroutes
app.use('/api',jwtAuthCookie);
app.use('/api/:uid',sameUserAuth);
app.use('/api',productRouter);
app.use('/api',clientRouter);
app.use('/api',userRouter);
app.use('/api',testApiRouter);


app.use('/dev', express.static('mockfrontend'));



app.listen(PORT, () => {console.log("App Listening on port " + PORT)})