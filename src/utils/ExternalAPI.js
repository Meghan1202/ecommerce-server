const fetch = require('node-fetch');

const getCategoryData = async (categoryName) => {
  const url = `https://backend-evaluation-lgsvu.ondigitalocean.app/category?name=${categoryName}`;
  const categoryResponse = await fetch(url);
  const jsonBody = await categoryResponse.json();
  const items = jsonBody.itemMetadata;
  const modifiedItems = await Promise.all(items.map(async (item) => {
    item.name_category = jsonBody.name;
    item.description_category = jsonBody.description;
    const featResponse = await fetch(`https://backend-evaluation-lgsvu.ondigitalocean.app/items/${item.id}`);
    item._id = item.id;
    delete item.id;
    const featJson = await featResponse.json();
    item.features = JSON.stringify(featJson.features);
    return item;
  }));
  return modifiedItems;
};

module.exports = {
  getCategoryData,
};
