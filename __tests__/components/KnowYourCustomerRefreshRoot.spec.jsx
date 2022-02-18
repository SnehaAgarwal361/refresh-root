import React from 'react';
import { render } from '@testing-library/react';
import { TestableKnowYourCustomerRefreshRoot } from '../../src/components/KnowYourCustomerRefreshRoot';

jest.mock('@americanexpress/one-app-ducks', () => ({
  queryLanguagePack: jest.fn((module, { fallbackLocale } = {}) => ({
    message: `lang pack async state for ${module}`,
    fallbackLocale,
  })),
}));

describe('KnowYourCustomerRefreshRoot', () => {
  let props = {
    router: {
      push: jest.fn(),
    },
  };
  const MockHeader = () => <div>Global Header</div>;

  beforeEach(() => {
    props = {
      languageData: { intlKeyMock: 'intlValueMock' },
      locale: 'localeMock',
      GlobalHeader: MockHeader,
    };
  });

  it('should render as expected when loaded', () => {
    const { container } = render(<TestableKnowYourCustomerRefreshRoot {...props} />);
    expect(container).toMatchSnapshot();
  });
});
