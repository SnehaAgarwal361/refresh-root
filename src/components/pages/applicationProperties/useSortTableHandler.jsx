import { useState } from 'react';

const useSortTableHandler = ({ tableData, setTableData, setCurrentPage }) => {
  const [sortedDirection, setSortedDirection] = useState('ascending');

  const handleSortClick = () => {
    if (sortedDirection === 'descending') {
      // Update table to be sorted in ascending order
      setTableData(tableData.sort((a, b) => a.name.localeCompare(b.name)));
      setSortedDirection('ascending');
    } else {
      // Update table to be sorted in descending order
      setTableData(tableData.sort((a, b) => b.name.localeCompare(a.name)));
      setSortedDirection('descending');
    }
    setCurrentPage(1);
  };
  return { sortedDirection, handleSortClick };
};

export default useSortTableHandler;
