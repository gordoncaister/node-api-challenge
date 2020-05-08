const express = require('express');

const router = express.Router();

const server = express();
server.use(express.json())

const Actions = require("../data/helpers/actionModel")
const Projects = require("../data/helpers/projectModel")

module.exports = router;