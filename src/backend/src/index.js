import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import queryRouter from './routes/QueryRoute.js'
import historyRouter from './routes/HistoryRoute.js'
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import checkJwt from './authz/check-jwt.js';

dotenv.config();
const app = express();

// This variabel stores the value in env file to connect to DB
let connect;

const executorFunction = (resolve, reject) => {
    //This is just an executorFunction of a promise for connecting to DB
    connect = process.env.NODE_ENV === "production"? process.env.CONNECT_DB : process.env.CONNECT_DB_DEV;

    if (connect) {
        
        resolve(connect);
    } else {
        reject("fail to read .env file");
    }
}


const read_env = () => {
    // This function returnS a promise which will try to connect to DB
    return new Promise(executorFunction);
}

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// UNSECURE API
// app.use('/queries', queryRouter)
// app.use('/histories', historyRouter)

// SECURE API
app.use('/queries', checkJwt, queryRouter)
app.use('/histories', checkJwt, historyRouter)

// app.use((err, req, res, next) => {  
//     if (err.name === 'UnauthorizedError') {
//         res.status(401).json({"error" : err.name + ": " + err.message});
//         console.log({"error" : err.name + ": " + err.message})
//     }
// })

//Connecting to DB
read_env()
.then((e) => {

    console.log("Connecting to Database...")
    mongoose.connect(e, {autoIndex: true})
})
.then(() => console.log('Database connected'))

.catch(() => {
    console.log('fail to connect to DB')
})

const port = process.env.PORT || 443;
app.listen(port, () => console.log(`Listening on port ${port} : http://localhost:${port}`));