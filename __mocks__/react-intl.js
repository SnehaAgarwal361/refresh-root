const IntlProviderMock = ({ children }) => children;
const FormattedMessageMock = ({ id }) => `translated string for id: ${id}`;

module.exports = {
  useIntl: jest.fn(() => ({
    formatMessage: ({ id }) => `translated string for id: ${id}`,
  })),
  IntlProvider: IntlProviderMock,
  FormattedMessage: FormattedMessageMock,
};
