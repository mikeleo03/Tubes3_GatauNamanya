import express, { response } from 'express';
import getAnswer from "../algorithms/RegexParser.js";

const router = express.Router();
router.use(express.json());


router.get('/', async (req,res) => {
    

})

export default router;