const { healthHandler } = require('../health.handler');

describe('Server', () => {
  const mockSend = jest.fn();
  const mockResponse = {
    status: jest.fn(() => ({ send: mockSend })),
  };
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should set response status code to 200', () => {
    healthHandler(null, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });
  it('should send a message\'Server is up!', () => {
    healthHandler(null, mockResponse);
    expect(mockSend).toHaveBeenCalledWith('Server is up!');
  });
});
