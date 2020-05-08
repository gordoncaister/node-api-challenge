const express = require('express');
const helmet = require('helmet'); 
// const cors = require("cors")

const server = express();

const projectRouter = require("./routers/projectRouter");
const actionRouter = require("./routers/actionRouter");

server.use(express.json());
// server.use(helmet())
// server.use(cors())


server.use('/api/projects',logger,projectRouter);
server.use('/api/actions',logger,actionRouter);

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


