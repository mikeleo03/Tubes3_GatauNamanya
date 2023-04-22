import express, { response } from 'express';

const router = express.Router();

//Render Home


router.get('/', (req, res) => {

    res.json({msg : "yo"})
})




export default router;