import express, { response } from 'express';
import getAnswer from "../algorithms/RegexParser.js";
import History from '../models/History.js'

const router = express.Router();
router.use(express.json());


router.get('/:id', async (req,res) => {
    // find all data
    History.findOne({user_id: req.params.id})
    .then(data => {

        if (data)
        {
            res.status(200).json({
                message: null,
                data: data.pages
            })
        }

        else
        {
            res.status(404).send({
                message: "User history not found",
                data: null,
            })
        }
    })

    .catch(err => {
        res.status(500).send({
            message: err.message || "Unknown Error",
            data: null,
        })
    })
})

router.post('/', async (req,res) => {
    //create model to be saved in database
    const history = new History({

        user_id: req.body.user_id,
        pages: req.body.pages,
    })
  
    // saving to database
    history.save()
    .then(data => {
        res.status(200).json({
            message: "User history is added!",
            data: null,
        });
    })
    
    .catch(err => {
      res.status(500).send({
        message: err.message || "Unknown Error",
        data: null,
      })
    })
})


router.put('/:id', async (req,res) => {

    History.findOneAndUpdate({user_id: req.params.id}, req.body, {new: true})
    .then(data => {
        
        if (data)
        {
            res.status(200).json({
                message : "User history is updated!",
                data: null,
            })
        }
        
        else
        {
            res.status(404).send({
                message: "User history not found",
                data: null,
            })
        }
    })
    .catch(err => {res.status(500).send({
        message : err.message || "Unknown Error",
        data: null,
    })})
})

export default router;