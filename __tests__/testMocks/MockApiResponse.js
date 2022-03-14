export const mockApiImplementation = (apiFetchResponse) => jest.fn()
  .mockImplementation((functionName) => {
    if (functionName.startsWith('Read')) {
      return {
        isLoading: false,
        data: {
          status: 200,
          body: apiFetchResponse,
          ok: true,
        },
        run: jest.fn()
          .mockImplementation(async () => ({
            data: {
              status: 200,
              body: apiFetchResponse,
              ok: true,
            },
          })),
      };
    }
    return {
      isLoading: false,
      run: async () => ({
        data: {
          status: 204,
          body: '',
          ok: true,
        },
      }),
    };
  });
export const mockUpdateFailureResponse = (apiFetchResponse) => jest.fn()
  .mockImplementation((functionName, options) => {
    if (functionName.startsWith('Read') && options.defer === false) {
      return {
        isLoading: false,
        run: jest.fn(),
        data: {
          status: 200,
          body: apiFetchResponse,
        },
      };
    }
    if (functionName.startsWith('Update')) {
      return {
        isLoading: false,
        run: jest.fn()
          .mockImplementation(async () => ({
            data: {
              status: 504,
              body: {
                error: 'Server Error',
              },
              ok: false,
            },
          })),
      };
    }
    return jest.fn();
  });
export const mockRefreshFailureResponse = (apiFetchResponse) => jest.fn()
  .mockImplementation((functionName, options) => {
    if (functionName.startsWith('Read') && options.defer === false) {
      return {
        isLoading: false,
        run: jest.fn()
          .mockImplementation(async () => ({
            data: {
              status: 504,
              body: {
                error: 'Server Error',
              },
              ok: false,
            },
          })),
        data: {
          status: 200,
          body: apiFetchResponse,
        },
      };
    }
    if (functionName.startsWith('Update')) {
      return {
        isLoading: false,
        run: jest.fn()
          .mockImplementation(async () => ({
            data: {
              status: 204,
              body: '',
              ok: true,
            },
          })),
      };
    }
    return jest.fn();
  });
export const apiTableData = [
  {
    application_name: 'CUSTOMER_ACCOUNT_GATEWAY',
    name: 'GET_DEMOGRAPHICS_API.ENABLED',
    group: 'API_CONTROL',
    value: 'TRUE',
    description: 'Switch enabling/disabling Get Demographics API',
    version: 78,
    lastUpdated: {
      source: 'SUPPORT-UI',
      userId: 'tester',
    },
  }];
export const expectedUpdatePayLoad = {
  defer: true,
  body: {
    applicationName: 'TEST',
    property: {
      application_name: 'CUSTOMER_ACCOUNT_GATEWAY',
      name: 'GET_DEMOGRAPHICS_API.ENABLED',
      group: 'API_CONTROL',
      value: 'FALSE',
      description: 'Switch enabling/disabling Get Demographics API',
      version: 78,
      lastUpdated: {
        source: 'SUPPORT-UI',
        userId: 'tester',
      },
    },
  },
};
