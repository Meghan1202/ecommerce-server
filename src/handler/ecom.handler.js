const { response } = require('express');
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

module.exports = { postHandler };
