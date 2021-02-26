const express = require('express');
const { postHandler } = require('../handler');

const router = express.Router();
router.post('', postHandler);

module.exports = { router };
