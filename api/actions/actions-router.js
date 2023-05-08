// Write your "actions" router here!
const express = require("express");
const Action = require("./actions-model");
const { validateActionID } = require('./actions-middleware');
const router = express.Router();

router.get('/', async (req, res, next) =>{
    const actions = await Action.get();
    try {
        res.status(200).json(actions)
    } catch (err) {
        next(err);
    }
})

router.get('/:id', validateActionID,  async(req, res, next) => {
    const result = await Action.get(req.params.id);
    try {
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
})

// router.post('/', async (req, res, next) => {

// })

// router.put('/:id', validateActionsId, (req,res, next) =>{

// })

// router.delete('/:id', validateActionsId, (req, res, next) => {

// })


router.use((error, req, res, next) => { //eslint-disable-line
    res.status(error.status || 500).json({
        message: error.message,
        customMessage: "something bad happened in the actions router"
    })
})

module.exports = router;
