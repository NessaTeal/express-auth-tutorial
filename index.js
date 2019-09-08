const express = require('express');
const authentication = require('./authentication.js');

const resources = [
  {id: 1, data: "First resource"},
  {id: 2, data: "Second resource"}
];

const app = express();

app.use(authentication); // call authentication before each request
app.get('/resources/:resourceId', (req, res) => {
  let resource = resources.find(resource => resource.id === +req.params.resourceId);

  if (!resource) {
    res.status(404).end();
  } else {
    res.send(`Resource data: ${resource.data}`);
  }
});

const port = 5000;
app.listen(port);
