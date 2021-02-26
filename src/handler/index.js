const { healthHandler } = require('./health.handler');
const { postHandler, getFeatureHandler } = require('./ecom.handler');

module.exports = { healthHandler, postHandler, getFeatureHandler };
