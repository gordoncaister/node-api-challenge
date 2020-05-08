const express = require('express');

const router = express.Router();


const Actions = require("../data/helpers/actionModel")
const Projects = require("../data/helpers/projectModel")

router.get("/",(req,res)=>{
    
    Actions.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            res.status(500).json({error: "There was an error retrieving the actions"})
        })
})

module.exports = router;