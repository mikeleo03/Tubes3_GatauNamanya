import express, { response } from 'express';
import action from "../algorithms/Actions.js";

const router = express.Router();
router.use(express.json());

//Render Home

// router.get('/', (req, res) => {

//     Query.find()
//     .then(queries => {
//         res.json({data : queries})})
//     .catch(err => {res.status(500).send({message : err.message})})

// })

router.get('/answer', async (req,res) => {
    
    let answer = await action(req.body.question);
    console.log(answer);
    res.json(answer);
    
})

export default router;