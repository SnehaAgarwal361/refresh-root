import { render } from '@testing-library/react';
import React from 'react';
import { DLSStyle } from '../../../src/components/common/DLSStyle';

test('Display home screen as expected', () => {
  const { container } = render(<DLSStyle version="Test Style" />);
  expect(container.firstChild).toMatchSnapshot();
});
