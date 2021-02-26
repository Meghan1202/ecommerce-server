const ecomServices = require('../services/ecom.service');

const postHandler = async (req, res) => {
  const { names } = req.body;
  const response = await ecomServices.createNewItem(names);
  if (response && response.length) {
    res.status(201).send(response);
  } else {
    res.status(404).send('Items already exists');
  }
};

const getFeatureHandler = async (req, res) => {
  const uniqueFeatureOfCategory = await ecomServices.getCategoryFeatures(req.query.category);
  if (uniqueFeatureOfCategory) {
    res.status(200).send(uniqueFeatureOfCategory);
  } else {
    res.status(404).send();
  }
};

const getProductsByQuery = async (req, res) => {
  const { category } = req.query;
  const features = req.query.features.split(',');
  const getQueryResponse = await ecomServices.productsByQuery(category, features);
  if (getQueryResponse) {
    res.status(200).send(getQueryResponse);
  } else {
    res.status(404).send('Product not found');
  }
};

module.exports = { postHandler, getFeatureHandler, getProductsByQuery };
