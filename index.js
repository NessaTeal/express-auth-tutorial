const express = require('express');
const authentication = require('./authentication.js');
const resourceRouter = require('./resources.js');

const app = express();

app.use(express.json()); // adding json body parse
app.use(authentication);
app.use('/resources', resourceRouter);

const port = 5000;
app.listen(port);
