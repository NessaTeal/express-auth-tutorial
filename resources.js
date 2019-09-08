const resources = [
  {id: 1, data: "First resource", userId: 1},
  {id: 2, data: "Second resource", userId: 2}
];

const resourceMiddleware = (req, res, next) => {
  let resource = resources.find(resource => resource.id === +req.params.resourceId);

  if (!resource) {
    res.status(404).end();
  } else if (resource.userId !== req.userId) {
    console.log(`Unauthorized access to resource ${req.params.resourceId} from user ${req.userId}`);
    res.status(404).end();
  } else {
    req.resource = resource;
    next();
  }
};

const getResource = (req, res) => {
  res.send(`Resource data: ${req.resource.data}`);
};

// create new router object
const router = require('express').Router();

// attach handlers to route the same way as to the app
router.use('/:resourceId', resourceMiddleware);
router.get('/:resourceId', getResource);

module.exports = router;
