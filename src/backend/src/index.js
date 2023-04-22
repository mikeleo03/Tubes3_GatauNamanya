import express, { json } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes/HomeRoute.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

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

app.use('/', router)

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