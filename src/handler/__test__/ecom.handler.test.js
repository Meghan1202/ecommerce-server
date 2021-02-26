const ecomServices = require('../../services/ecom.service');
const { postHandler, getFeatureHandler } = require('../ecom.handler');

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
});
