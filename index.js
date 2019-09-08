const express = require('express');

const resources = [
  {id: 1, data: "First resource"},
  {id: 2, data: "Second resource"}
];

const app = express();

app.get('/resources/:resourceId', (req, res) => {
  // + to convert string to number
  let resource = resources.find(resource => resource.id === +req.params.resourceId);

  if (!resource) {
    res.status(404).end();
  } else {
    res.send(`Resource data: ${resource.data}`);
  }
});

const port = 5000;
app.listen(port);
