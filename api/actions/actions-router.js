// Write your "actions" router here!
const express = require("express");
const Action = require("./actions-model");
const router = express.Router();

router.get('/', async (req, res, next) =>{
    const actions = await Action.get();
    try {
        res.status(200).json(actions)
    } catch (err) {
        next(err);
    }
})

// router.get('/:id', (req, res) => {

// })

// router.post('/', (req, res) => {

// })

// router.put('/:id', (req,res) =>{

// })

// router.delete('/:id', (req, res) => {

// })


router.use((error, req, res, next) => { //eslint-disable-line
    res.status(error.status || 500).json({
        message: error.message,
        customMessage: "something bad happened in the actions router"
    })
})

module.exports = router;
