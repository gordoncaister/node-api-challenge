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
    Projects.get(req.params.id)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(error => {
            res.status(500).json({error:"There was an error fetching project"})
        })
})

router.post("/",validateProject,(req,res)=>{
    Projects.insert(req.body)
        .then((project)=>{
            res.status(201).json(project)
        })
        .catch(()=>{
            res.status(500).json({error: "Database error while creating project"})
        })
})

router.delete("/:id",validateProjectId,(req,res)=>{
    Projects.remove(req.params.id)
        .then((success)=>{
            res.status(200).json({message: `Project ${req.params.id} was successfully deleted`})
        })
        .catch(()=>{
            res.status(500).json({error: "Database error while deleting project"})
        })
    
})

router.put("/:id",validateProjectId,(req,res)=>{

    Projects.get(req.params.id)
        .then((project)=>{
            let newProject = {
                id: project.id,
                name: project.name,
                description: project.description,
                completed: project.completed 
            }
            if(req.body.name && req.body.name != newProject.name) {
                newProject.name=req.body.name
            } else if(req.body.description && req.body.description != newProject.description) {
                console.log(req.body.description)
                newProject.description=req.body.description
            }  else if(req.body.completed && req.body.completed != newProject.completed){
                newProject.completed=req.body.completed
            }
            
            Projects.update(req.params.id,newProject)
                .then(updatedProj => {
                    res.status(201).json(updatedProj);
                })
                .catch(error=>{
                    res.status(500).json({error:"error while updating project"})
                })

        })
        .catch(error=>{
            res.status(500).json({error:"error while updating project"})
        })

    
})


function validateProject (req,res,next){
    if(!req.body){
        res.status(401).json({message: "Missing project body"})
    } else if (!req.body.name){
        res.status(401).json({message: "Missing project name"})
    } else if (!req.body.description){
        res.status(401).json({message: "Missing project description"})
    } else if (!req.body.completed){
        res.status(401).json({message: "Missing project completion status"})
    } else {
        next();
    }
}

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