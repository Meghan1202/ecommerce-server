const express = require('express');
const { healthHandler } = require('../handler');

const router = express.Router();
router.get('', healthHandler);

module.exports = { router };
