import express, { response } from 'express';
import Query from '../models/Query.js';

const router = express.Router();

//Render Home

router.get('/', (req, res) => {
    res.json({data: "bruh" })
})

export default router;