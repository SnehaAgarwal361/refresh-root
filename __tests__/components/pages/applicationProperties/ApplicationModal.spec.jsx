import React from 'react';
import {
  render, screen, fireEvent, act,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ApplicationModal } from '../../../../src/components/pages/applicationProperties/ApplicationModal';

describe('ApplicationModal', () => {
  const saveApplication = jest.fn();
  const applicationRow = { name: 'Test Application', value: 'Test Value', last_updated: { user_id: '' } };
  const rowIndex = 0;
  const adsId = 'testUser';

  beforeEach(() => {
    // eslint-disable-next-line global-require -- require needs to be inside browser check
    jest.spyOn(require('../../../../src/components/common/authentication/UserState'), 'useAdsId').mockReturnValue(adsId);
  });

  test('renders correctly when modal is open', () => {
    const ref = { current: { openModal: jest.fn() } };
    render(<ApplicationModal ref={ref} saveApplication={saveApplication} />);
    act(() => {
      ref.current.openModal(applicationRow, rowIndex);
    });
    expect(screen.getByText('Test Application')).toBeInTheDocument();
    expect(screen.getByTestId('modalInputArea')).toHaveValue('Test Value');
  });

  test('updates value on input change', () => {
    const ref = { current: { openModal: jest.fn() } };
    render(<ApplicationModal ref={ref} saveApplication={saveApplication} />);
    act(() => {
      ref.current.openModal(applicationRow, rowIndex);
    });
    act(() => {
      fireEvent.change(screen.getByTestId('modalInputArea'), { target: { value: 'New Value' } });
    });
    expect(screen.getByTestId('modalInputArea')).toHaveValue('New Value');
  });

  test('calls saveApplication with updated value on save', () => {
    const ref = { current: { openModal: jest.fn() } };
    render(<ApplicationModal ref={ref} saveApplication={saveApplication} />);
    act(() => {
      ref.current.openModal(applicationRow, rowIndex);
    });
    act(() => {
      fireEvent.change(screen.getByTestId('modalInputArea'), { target: { value: 'New Value' } });
    });
    act(() => {
      fireEvent.click(screen.getByTestId('modalSaveBtn'));
    });
    expect(saveApplication).toHaveBeenCalledWith({
      application: { ...applicationRow, value: 'New Value', last_updated: { user_id: adsId } },
      index: rowIndex,
    });
  });

  test('closes modal on save', () => {
    const ref = { current: { openModal: jest.fn() } };
    render(<ApplicationModal ref={ref} saveApplication={saveApplication} />);
    act(() => {
      ref.current.openModal(applicationRow, rowIndex);
    });
    act(() => {
      fireEvent.click(screen.getByTestId('modalSaveBtn'));
    });
    expect(screen.queryByText('Test Application')).not.toBeInTheDocument();
  });

  test('closes modal on close button click', () => {
    const ref = { current: { openModal: jest.fn() } };
    render(<ApplicationModal ref={ref} saveApplication={saveApplication} />);
    act(() => {
      ref.current.openModal(applicationRow, rowIndex);
    });
    act(() => {
      fireEvent.click(screen.getByTestId('modalCloseButton'));
    });
    expect(screen.queryByText('Test Application')).not.toBeInTheDocument();
  });
});
