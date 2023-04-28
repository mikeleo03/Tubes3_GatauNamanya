import express, { response } from 'express';
import getAnswer from "../algorithms/RegexParser.js";

const router = express.Router();
router.use(express.json());


router.get('/answer', async (req,res) => {
    
    getAnswer(req.body.question, req.body.algorithm)

    .then(answer => {
        res.status(200).json({
            message: null,
            data: answer
        })
    })
    
    .catch(err => {
        res.status(500).json({
            message: err.message,
            data: null
        })
    })
})

export default router;