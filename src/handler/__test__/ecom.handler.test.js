const ecomServices = require('../../services/ecom.service');
const { postHandler, getFeatureHandler, getProductsByQuery } = require('../ecom.handler');

describe('Post Handler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const mockSend = jest.fn();
  const mockResponse = {
    status: jest.fn(() => ({ send: mockSend })),
  };
  const mockReq = {
    body: { names: 'abc' },
  };
  it('should set the status flag to 201 and also fetches the response from the external API', async () => {
    const response = [{
      name: 'hii',
      name_category: 'lalal',
    }];
    const spyOnCreateNewItem = jest.spyOn(ecomServices, 'createNewItem').mockResolvedValue(response);
    await postHandler(mockReq, mockResponse);
    expect(spyOnCreateNewItem).toHaveBeenCalledWith('abc');
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockSend).toHaveBeenCalledWith(response);
  });
  it('should set the status flag to 404', async () => {
    const response = [];
    const spyOnCreateNewItem = jest.spyOn(ecomServices, 'createNewItem').mockResolvedValue(response);
    await postHandler(mockReq, mockResponse);
    expect(spyOnCreateNewItem).toHaveBeenCalledWith('abc');
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockSend).toHaveBeenCalledWith('Items already exists');
  });
});

describe('Get Feature Handler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should set a status code of 200 and send distinct features', async () => {
    const response = [{
      color: 'hii',
      size: 'lalal',
      brand: 'qqq',
    }];
    const mockReq = {
      query: {
        category: 'lala',
      },
    };
    const mockSend = jest.fn();
    const mockResponse = {
      status: jest.fn(() => ({ send: mockSend })),
    };
    const spyOnCategoryFeature = jest.spyOn(ecomServices, 'getCategoryFeatures').mockResolvedValue(response);
    await getFeatureHandler(mockReq, mockResponse);
    expect(spyOnCategoryFeature).toHaveBeenCalledWith('lala');
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockSend).toHaveBeenCalledWith(response);
  });
  it('should set status code of 404 if not found', async () => {
    const mockReq = {
      query: {
        category: 'lala',
      },
    };
    const mockSend = jest.fn();
    const mockResponse = {
      status: jest.fn(() => ({ send: mockSend })),
    };
    const spyOnCategoryFeature = jest.spyOn(ecomServices, 'getCategoryFeatures').mockResolvedValue(null);
    await getFeatureHandler(mockReq, mockResponse);
    expect(spyOnCategoryFeature).toHaveBeenCalledWith('lala');
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockSend).toHaveBeenCalledWith("Category doesn't exist");
  });
});

describe('Get Product By Query', () => {
  const mockReq = {
    query: {
      category: 'phone',
      features: 'hello,hii',
    },
  };
  const mockSend = jest.fn();
  const mockResponse = {
    status: jest.fn(() => ({ send: mockSend })),
  };
  const features = mockReq.query.features.split(',');
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should set the status code to 200, and sends the products fetched', async () => {
    const mockUserResponse = [
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
    const spyOnProductsByQuery = jest.spyOn(ecomServices, 'productsByQuery').mockResolvedValue(mockUserResponse);
    await getProductsByQuery(mockReq, mockResponse);
    expect(spyOnProductsByQuery).toHaveBeenCalledWith('phone', features);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockSend).toHaveBeenCalledWith(mockUserResponse);
  });
  it('should set status code of 404 and send product not found if item doesn\'t exist', async () => {
    const spyOnProductsByQuery = jest.spyOn(ecomServices, 'productsByQuery').mockResolvedValue(null);
    await getProductsByQuery(mockReq, mockResponse);
    expect(spyOnProductsByQuery).toHaveBeenCalledWith('phone', features);
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockSend).toHaveBeenCalledWith('Product not found');
  });
});
