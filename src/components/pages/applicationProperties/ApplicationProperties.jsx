import React, {
  useEffect, useMemo, useRef, useState,
} from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  DataTableBodyV2,
  DataTableCellV2,
  DataTableHeadCellV2,
  DataTableHeadV2,
  DataTableRowV2,
  DataTableV2,
  Label,
  Pagination,
  Search,
  Select,
  SelectOption,
} from '@americanexpress/dls-react';
import { useOneDataFetchye } from '@americanexpress/fetchye-amex';
import { ApplicationModal } from './ApplicationModal';
import styles from '../../styles.scss';
import { applicationList } from '../../../applicationList';
import { ErrorMessage, SuccessMessage } from '../../common/PageMessages';

const ApplicationProperties = () => {
  const { formatMessage } = useIntl();
  const [applicationFilter, setApplicationFilter] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRow, setSelectedRow] = useState();
  const [modalSave, setModalSave] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [successMessage, setSuccessMessage] = useState(undefined);

  const {
    isLoading,
    data: fetchData,
    error: fetchError,
    run: fetchRun,
  } = useOneDataFetchye(
    'ReadKnowYourCustomerRefreshApplicationProperties.v1',
    {
      defer: applicationFilter?.trim().length <= 1,
      body: {
        applicationName: applicationFilter,
      },
    });

  const updatePropertyRun = useOneDataFetchye(
    'UpdateKnowYourCustomerRefreshApplicationProperty.v1',
    {
      defer: true,
      body: {
        applicationName: applicationFilter,
        property: {
          ...selectedRow?.application,
        },
      },
    });

  useEffect(() => { // Changes on clicking save
    if (modalSave && selectedRow) {
      updatePropertyRun.run().then((updateResult) => {
        if (updateResult.data.ok) {
          setSuccessMessage('Updated Successfully');
          fetchRun().then((fetchResult) => {
            if (!fetchResult.data.ok) {
              setErrorMessage(fetchResult?.data.body.error);
            }
          });
          setSelectedRow(null);
        } else {
          setErrorMessage(updateResult.data.body.error);
        }
      }
      );
      setModalSave(false);
    }
  }, [selectedRow, modalSave, updatePropertyRun, fetchRun]);

  useEffect(() => { // Changes on selecting an application
    if (!isLoading && !fetchError && fetchData?.body) {
      setTableData(fetchData.body);
    } else {
      setTableData(null);
    }
  }, [fetchData, fetchError, isLoading]);

  const modalRef = useRef();

  const handleDropDownChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedRows = useMemo(() => {
    const markup = [];

    if (!tableData) return markup;

    const beginIndex = (currentPage - 1) * itemsPerPage;
    let endIndex = beginIndex + itemsPerPage;
    endIndex = endIndex < tableData.length ? beginIndex + itemsPerPage : tableData.length;
    for (let i = beginIndex; i < endIndex; i += 1) {
      markup.push(tableData[i]);
    }
    return markup;
  }, [tableData, currentPage, itemsPerPage]);

  const searchTermHandler = (e) => {
    setCurrentPage(1);
    if (tableData) {
      const inputValue = e.target.value;
      if (inputValue?.trim() === '') {
        setTableData(fetchData.body);
      } else {
        const filteredData = tableData.filter(
          (row) => row.applicationName?.toLowerCase()
            .includes(inputValue.toLowerCase())
            || row.name?.toLowerCase()
              .includes(inputValue.toLowerCase())
            || row.group?.toLowerCase()
              .includes(inputValue.toLowerCase())
            || row.value?.toLowerCase()
              .includes(inputValue.toLowerCase())
            || row.description?.toLowerCase()
              .includes(inputValue.toLowerCase()));
        setTableData(filteredData);
      }
      setSearchTerm(inputValue);
    }
  };

  const onApplicationFilterChange = (e) => {
    setApplicationFilter(e.target.value);
    setErrorMessage(undefined);
    setSuccessMessage(undefined);
    setCurrentPage(1);
  };

  const saveApplication = (rowData) => {
    setSelectedRow(rowData);
    setModalSave(true);
  };

  const getTable = () => {
    if (!isLoading && tableData != null) {
      return (
        <>
          <div className="flex flex-justify-end col-md-12">
            <Label className="flex flex-align-center pad-1-r">
              <FormattedMessage id="records.per.page" />
            </Label>
            <div className="col-md-1">
              <Select
                id="dt-v2-p-select"
                data-testid="itemsPageDropDown"
                onChange={handleDropDownChange}
                value={itemsPerPage}
              >
                <SelectOption value="10">10</SelectOption>
                <SelectOption value="20">20</SelectOption>
                <SelectOption value="30">30</SelectOption>
              </Select>
            </div>
          </div>
          <div className="row margin-1">
            <DataTableV2 small={true} id="tablev2-small-instance">
              <DataTableHeadV2>
                <DataTableRowV2 className="body-1">
                  <DataTableHeadCellV2><FormattedMessage id="property.app.name" /></DataTableHeadCellV2>
                  <DataTableHeadCellV2><FormattedMessage id="property.name" /></DataTableHeadCellV2>
                  <DataTableHeadCellV2><FormattedMessage id="group" /></DataTableHeadCellV2>
                  <DataTableHeadCellV2><FormattedMessage id="description" /></DataTableHeadCellV2>
                  <DataTableHeadCellV2><FormattedMessage id="value" /></DataTableHeadCellV2>
                </DataTableRowV2>
              </DataTableHeadV2>
              <DataTableBodyV2>
                {paginatedRows.map((row, i) => (
                  <DataTableRowV2
                    key={`${row.name}-${row.applicationName}`}
                    onClick={() => modalRef.current.openModal(row, i)}
                  >
                    <DataTableCellV2>{row.applicationName}</DataTableCellV2>
                    <DataTableCellV2>{row.name}</DataTableCellV2>
                    <DataTableCellV2>{row.group}</DataTableCellV2>
                    <DataTableCellV2>{row.description}</DataTableCellV2>
                    <DataTableCellV2>{row.value}</DataTableCellV2>
                  </DataTableRowV2>
                )
                )}
              </DataTableBodyV2>
            </DataTableV2>
            {tableData.length > 0 && (
              <Pagination
                data-testid="selectPageNumber"
                theme={{ background: 'transparent' }}
                selected={currentPage}
                onChange={handlePageChange}
                total={Math.ceil(tableData.length / itemsPerPage)}
              />
            )}
          </div>
        </>
      );
    } return <div />;
  };

  return (
    <>
      <h2>
        <div className="text-align-center margin-2-b heading-4">Application Properties</div>
      </h2>
      <ApplicationModal ref={modalRef} saveApplication={saveApplication} />
      <div className="pad-2-md-up pad-1-sm-down flex shadow-2">
        <div className="col-sm-12 row col-md-3 col-md-offset-3">
          <Label htmlFor="accountFilterSelect">
            <FormattedMessage id="applicationFilter.label" />
          </Label>
          <Select
            id="applicationFilterSelect"
            className="fluid"
            value={applicationFilter}
            data-testid="applicationFilterSelect"
            onChange={onApplicationFilterChange}
          >
            <SelectOption value="">
              {formatMessage({ id: 'filter.default.option' })}
            </SelectOption>
            {applicationList.map((option) => (
              <SelectOption value={option.id} key={option.id}>
                {option.friendlyName}
              </SelectOption>
            ))}
          </Select>
        </div>
        <div className={`${styles.searchFieldPadTop} col-sm-12 col-md-3 pad-1-sm-down margin-2-t`}>
          <Search
            id="df-search"
            data-testid="searchTerm"
            value={searchTerm}
            onChange={searchTermHandler}
            placeholder={formatMessage({ id: 'search.field.placeholder' })}
          />
        </div>
      </div>
      <SuccessMessage message={successMessage} setSuccess={setSuccessMessage} />
      <ErrorMessage message={errorMessage} setError={setErrorMessage} />
      {getTable()}
    </>
  );
};

export default ApplicationProperties;
