const ecomServices = require('../../services/ecom.service');
const { postHandler } = require('../ecom.handler');

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
