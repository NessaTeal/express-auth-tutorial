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
// new handler function
const createResource = (req, res) => {
  if (!req.body.data) {
    res.status(400).end();
    return;
  }

  resources.push({
    id: resources.length + 1,
    data: req.body.data,
    userId: req.userId
  });

  res.status(201).send('Resource created');
};

const router = require('express').Router();

router.use('/:resourceId', resourceMiddleware);
router.get('/:resourceId', getResource);
router.post('/', createResource); // attaching new function

module.exports = router;
