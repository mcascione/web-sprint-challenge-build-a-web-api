// Write your "actions" router here!
const express = require("express");
const Action = require("./actions-model");
const router = express.Router();


router.use((error, req, res, next) => { //eslint-disable-line
    res.status(error.status || 500).json({
        message: error.message,
        customMessage: "something bad happened in the actions router"
    })
})

module.exports = router;
