import express, { response } from 'express';
import Query from '../models/Query.js';

const router = express.Router();

//Render Home

router.get('/queries', (req, res) => {

    Query.find()
    .then(queries => {
        res.json({data : queries})})
    .catch(err => {res.status(500).send({message : err.message})})
})




export default router;