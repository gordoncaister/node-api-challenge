const express = require('express');

const server = express();

server.use(express.json())

server.use(express.json());

const actionsRouter = require("./routers/actionRouter")
const projectsRouter = require("./routers/projectRouter")

server.use('/api/actions',logger,actionsRouter)
server.use('/api/projects',logger,projectsRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});


function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      'Origin'
    )}`
  );

  next();
}

server.use(logger);



module.exports = server;


