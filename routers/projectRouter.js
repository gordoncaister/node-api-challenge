const express = require('express');

const router = express.Router();

const server = express();
server.use(express.json())

const Actions = require("../data/helpers/actionModel")
const Projects = require("../data/helpers/projectModel")

router.get("/",(req,res)=>{
    Projects.get()
        .then(projects => {
            res.status(201).json(projects)
        })
        .catch(error => {
            res.status(500).json({error:"There was an error fetching projects"})
        })
})




module.exports = router;