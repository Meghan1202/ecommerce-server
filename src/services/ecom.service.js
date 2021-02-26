const { Product } = require('../models');
const getCategory = require('../utils/ExternalAPI');

const createNewItem = async (category) => {
  const categoryData = await getCategory.getCategoryData(category);
  if (categoryData != null && categoryData.length) {
    categoryData.forEach(async (item) => {
      try {
        await Product.create(item);
      } catch (error) {
        return 'Items already present!';
      }
    });
    return categoryData;
  }
  return null;
};

module.exports = {
  createNewItem,
};
