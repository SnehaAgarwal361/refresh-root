import { renderHook, act } from '@testing-library/react-hooks';
import useSortTableHandler from '../../../../src/components/pages/applicationProperties/useSortTableHandler';

describe('useSortTableHandler', () => {
  let tableData;
  let setTableData;
  let setCurrentPage;

  beforeEach(() => {
    // Table received should be sorted alphabetically by default
    tableData = [
      { name: 'Alice' },
      { name: 'Bob' },
      { name: 'Charlie' },
    ];
    setTableData = jest.fn();
    setCurrentPage = jest.fn();
  });

  test('should sort table data in descending order on first click', () => {
    const { result } = renderHook(
      () => useSortTableHandler({ tableData, setTableData, setCurrentPage })
    );

    act(() => {
      result.current.handleSortClick();
    });

    expect(setTableData).toHaveBeenCalledWith([
      { name: 'Charlie' },
      { name: 'Bob' },
      { name: 'Alice' },
    ]);
    expect(result.current.sortedDirection).toBe('descending');
    expect(setCurrentPage).toHaveBeenCalledWith(1);
  });

  test('should sort table data in ascending order', () => {
    const { result } = renderHook(
      () => useSortTableHandler({ tableData, setTableData, setCurrentPage })
    );

    // First click to sort in descending order
    act(() => {
      result.current.handleSortClick();
    });

    // Second click to sort in ascending order
    act(() => {
      result.current.handleSortClick();
    });

    expect(setTableData).toHaveBeenNthCalledWith(2, [
      { name: 'Alice' },
      { name: 'Bob' },
      { name: 'Charlie' },
    ]);
    expect(result.current.sortedDirection).toBe('ascending');
    expect(setCurrentPage).toHaveBeenCalledWith(1);
  });
});
