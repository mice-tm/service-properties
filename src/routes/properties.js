let express = require('express');
let router = express.Router();

let PropertyModel = require('../models/property');
let SearchProperty = require('../models/searchProperty');
let PropertyService = require('../cservices/propertyService');


router.get('/api/v2/properties', (request, response) => {
  // throw new Error('This is a forced error!');
  const searchModel = new SearchProperty(request.query);
  let propertyService = new PropertyService(PropertyModel);

  propertyService.search(searchModel).then(docs => {
    if (!docs) {
      response.json([]);
    } else {
      response.json(docs);
    }
  }).catch(error => {
    response.status(500).json(error);
  });
});

router.get('/api/v2/properties/:name', (request, response) => {
  if (!request.params.name) {
    response.status(422).send('Url parameter "name" is missing');
  }
  PropertyModel.findOne({
    "name": request.params.name,
    "active": true
  }).then(doc => {
    if (!doc) {
      response.status(404).send('Not found.');
    } else {
      response.json(doc);
    }
  }).catch(error => {
    response.status(500).json(error);
  });
});

router.get('/api/v2/properties/:name/path', (request, response) => {
  response.send(`Property path ${request.params.name} requested.`);
});




module.exports = router;