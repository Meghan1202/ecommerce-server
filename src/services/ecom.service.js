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

const getCategoryFeatures = async (category) => {
  const featuresSet = {
    Color: [],
    Size: [],
    Brand: [],
  };
  const getItemsWithCategories = await Product.findAll({
    where: { name_category: category },
    raw: true,
  });
  getItemsWithCategories.map((item) => {
    const features = JSON.parse(item.features);
    features.forEach((feature) => {
      featuresSet[feature.name].push(feature.value);
    });
  });
  featuresSet.Color = Array.from(new Set(featuresSet.Color));
  featuresSet.Size = Array.from(new Set(featuresSet.Size));
  featuresSet.Brand = Array.from(new Set(featuresSet.Brand));
  console.log(featuresSet);
  return featuresSet;
};

module.exports = {
  createNewItem, getCategoryFeatures,
};
