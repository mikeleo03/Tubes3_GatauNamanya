import express, { response } from 'express';
import getAnswer from "../algorithms/RegexParser.js";
import checkJwt from '../authz/check-jwt.js';

const router = express.Router();
router.use(express.json());


router.get('/answer', checkJwt, async (req,res) => {
    getAnswer(req.query.question, req.query.algorithm)

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