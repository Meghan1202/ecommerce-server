const express = require('express');
const { postHandler, getFeatureHandler } = require('../handler');

const router = express.Router();
router.post('', postHandler);
router.get('', getFeatureHandler);
module.exports = { router };
