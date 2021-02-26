const { healthHandler } = require('./health.handler');
const { postHandler, getFeatureHandler, getProductsByQuery } = require('./ecom.handler');

module.exports = {
  healthHandler, postHandler, getFeatureHandler, getProductsByQuery,
};
