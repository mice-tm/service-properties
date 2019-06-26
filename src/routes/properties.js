let express = require('express');
let router = express.Router();

let PropertyModel = require('../models/property');
let SearchProperty = require('../models/searchProperty');
let PropertyService = require('../services/propertyService');
let AggregationResult = require('../models/aggregationResult');

router.get('/api/v2/properties', (request, response) => {
  // throw new Error('This is a forced error!');
  const searchModel = new SearchProperty(request.query);
  searchModel.setPerPage(typeof request.query['per-page'] !== 'undefined' ? request.query['per-page'] : 20);
  let propertyService = new PropertyService(PropertyModel);

  propertyService.search(searchModel).then(docs => {
    if (!docs) {
      response.json([]);
    } else {
      const aggregaionResult = new AggregationResult(docs.shift());
      response.set('X-Pagination-Total-Count', aggregaionResult.totalCount);
      response.set('X-Pagination-Page-Count', aggregaionResult.pageCount);
      response.set('X-Pagination-Current-Pag', aggregaionResult.currentPage);
      response.set('X-Pagination-Per-Page', aggregaionResult.perPage);
      response.json(aggregaionResult.models);
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