const { Product } = require('../../models');
const getCategory = require('../../utils/ExternalAPI');
const { createNewItem } = require('../ecom.service');

describe('Create New Item', () => {
  it('should get data based on the category', async () => {
    const getCategoryData = [
      {
        id: 6,
        _id: 'shoe_2',
        name: 'adidas jumbo',
        description: 'Extremely comforrtable shoes for all seasons',
        name_category: 'shoes',
        description_category: 'radiant shoes',
        features: [
          {
            name: 'Color',
            value: 'Blue',
          },
          {
            name: 'Size',
            value: 8,
          },
          {
            name: 'Brand',
            value: 'Adidas',
          },
        ],
        createdAt: '2021-02-26T05:41:03.389Z',
        updatedAt: '2021-02-26T05:41:03.389Z',
      }];
    const mockItem = getCategoryData[0];
    const names = ['shoe', 'phone'];
    const spyOnGetCategoryData = jest.spyOn(getCategory, 'getCategoryData').mockResolvedValue(getCategoryData);
    const spyOncreate = jest.spyOn(Product, 'create');
    const newProduct = await createNewItem(names);
    expect(spyOnGetCategoryData).toHaveBeenCalledWith('shoe');
  });
});
