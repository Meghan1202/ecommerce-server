const { Product } = require('../models');
const getCategory = require('../utils/ExternalAPI');

const createNewItem = async (names) => {
  const postResponse = [];
  names.forEach(async (category) => {
    const categoryData = await getCategory.getCategoryData(category);
    if (categoryData != null && categoryData.length) {
      categoryData.forEach(async (item) => {
        try {
          await Product.create(item);
          console.log(item);
        } catch (error) {
          return null;
        }
        postResponse.push(categoryData);
      });
    }
  });
  return postResponse;
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

const productsByQuery = async (category, features) => {
  if (category && features && features.length) {
    const getItemsWithCategories = await Product.findAll({
      where: { name_category: category },
      raw: true,
    });
    const productsSearched = getItemsWithCategories.filter((item) => {
      item.features = JSON.parse(item.features);
      return item.features.some((feature) => features.includes(feature.value));
    });
    if (productsSearched.length) {
      return productsSearched;
    }
    return null;
  } if (category) {
    const getItemsWithCategories = await Product.findAll({
      where: { name_category: category },
      raw: true,
    });
    if (getItemsWithCategories.length) {
      return getItemsWithCategories;
    }
    return null;
  }
  return null;
};

module.exports = {
  createNewItem, getCategoryFeatures, productsByQuery,
};
