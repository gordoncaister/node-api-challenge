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

router.get('/:id', (req, res) => {
    Actions.get(req.params.id)
      .then(action => {
        
        if (!action) {
            res.status(400).json({message: "No action by that id was found"})
        } else {
            res.status(200).json(action)
        }
      })
      .catch(error => {
        res.status(500).json({error: "There was an error retrieving the action"})
      })  
  })

module.exports = router;