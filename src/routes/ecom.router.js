const express = require('express');
const { postHandler, getFeatureHandler, getProductsByQuery } = require('../handler');

const router = express.Router();
router.post('/categories', postHandler);
router.get('/features', getFeatureHandler);
router.get('/search', getProductsByQuery);
module.exports = { router };
