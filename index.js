const express = require('express');
const authentication = require('./authentication.js');
const resourceRouter = require('./resources.js');

const app = express();

app.use(authentication);
app.use('/resources', resourceRouter); // attach resources router

const port = 5000;
app.listen(port);
