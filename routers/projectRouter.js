const express = require('express');

const router = express.Router();

const server = express();
server.use(express.json())

const Actions = require("../data/helpers/actionModel")
const Projects = require("../data/helpers/projectModel")

router.get("/", validateProjectId,(req,res)=>{
    Projects.get()
        .then(projects => {
            res.status(201).json(projects)
        })
        .catch(error => {
            res.status(500).json({error:"There was an error fetching projects"})
        })
})

router.get("/:id", validateProjectId,(req,res)=>{
    Projects.get()
        .then(project => {
            res.status(201).json(project)
        })
        .catch(error => {
            res.status(500).json({error:"There was an error fetching project"})
        })
})


function validateProjectId(req,res,next){
    Projects.get(req.params.id)
        .then((project) => {
            if(project){
                next();
            } else {
                res.status(400).json({message: "Invalid project ID"})
            }
        })
        .catch(()=> {
            res.status(500).json({error:"There was a problem finding the project/s"})
        })
}


module.exports = router;