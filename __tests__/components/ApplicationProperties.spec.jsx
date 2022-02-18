import React from 'react';
import { render } from '@testing-library/react';
import { TestableApplicationProperties } from '../../src/components/ApplicationProperties';

jest.mock('@americanexpress/one-app-ducks', () => ({
  queryLanguagePack: jest.fn((module, { fallbackLocale } = {}) => ({
    message: `lang pack async state for ${module}`,
    fallbackLocale,
  })),
}));

describe('ApplicationProperties', () => {
  it('should render with correct data', () => {
    const { container } = render(<TestableApplicationProperties {...props} />);
    expect(container).toMatchSnapshot();
  });
});
