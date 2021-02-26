const express = require('express');
const { postHandler, getFeatureHandler, getProductsByQuery } = require('../handler');

const router = express.Router();
router.post('', postHandler);
router.get('', getFeatureHandler);
router.get('/search', getProductsByQuery);
module.exports = { router };
