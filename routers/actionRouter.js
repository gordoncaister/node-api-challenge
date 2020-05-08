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

router.post('/', validateAction, (req, res) => {
    Actions.insert(req.body)
    .then(action => {
        res.status(201).json(action)    
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({message: "There was an error while saving the action to the database"})
    })
})

router.delete("/:id",validateActionId,(req,res)=> {
    Actions.remove(req.params.id)
    .then((success)=>{
        res.status(200).json({message: `Action ${req.params.id} was successfully deleted`})
    })
    .catch(()=>{
        res.status(500).json({error: "Database error while deleting action"})
    })
})

router.put("/:id",validateActionId,validateAction,(req,res)=>{
    Actions.get(req.params.id)
        .then((action)=>{
            
            let newAction = {
                project_id: action.project_id,
                notes: action.notes,
                description: action.description,
                completed: action.completed
            }
            

            if(req.body.project_id && req.body.project_id != newAction.project_id) {
                newAction.project_id=req.body.project_id
            } else if(req.body.description && req.body.description != newAction.description) {
                newAction.description=req.body.description
            }  else if(req.body.completed && req.body.completed != newAction.completed){
                newAction.completed=req.body.completed
            } else if(req.body.notes && req.body.notes != newAction.notes){
                newAction.notes=req.body.notes
            }
            else {
                res.status(401).json({message: "Please make changes to the action before updating"})
                return;
            }

            
            
            Actions.update(req.params.id,newAction)
                .then(updatedAction => {
                    res.status(201).json(updatedAction);
                })
                .catch(error=>{
                    res.status(500).json({error:"error while updating action"})
                })

        })
        .catch(error=>{
            res.status(500).json({error:"error before updating action"})
        })
})



function validateAction (req,res,next){
    console.log(req.body.description.length)
    if(!req.body){
        res.status(401).json({message: "Missing action body"})
    } else if (!req.body.project_id){
        res.status(401).json({message: "Missing action project id"})
    } else if (!req.body.description || req.body.description.length > 128){
        res.status(401).json({message: "Missing action description, or description too long"})
    } else if (!req.body.notes){
        res.status(401).json({message: "Missing action notes"})
    } else {
        next();
    }
}


function validateActionId(req,res,next){
    Actions.get(req.params.id)
        .then((action) => {
            if(action){
                next();
            } else {
                res.status(400).json({message: "Invalid action ID"})
            }
        })
        .catch(()=> {
            res.status(500).json({error:"There was a problem finding the action/s"})
        })
}
module.exports = router;