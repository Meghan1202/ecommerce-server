const ecomServices = require('../services/ecom.service');

const postHandler = async (req, res) => {
  const { body } = req;
  const postResponse = [];
  body.names.forEach(async (category) => {
    const response = await ecomServices.createNewItem(category);
    if (response && response.length) {
      postResponse.push(response);
    }
  });
  if (postResponse.length) {
    res.status(201).send(postResponse);
  } else {
    res.status(404).send('Items already present');
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

module.exports = { postHandler, getFeatureHandler };
