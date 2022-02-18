import React, { useState, useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  Label,
  Select,
  SelectOption,
  ButtonPrimary,
  DataTableV2,
  DataTableHeadV2,
  DataTableBodyV2,
  DataTableRowV2,
  DataTableHeadCellV2,
  DataTableCellV2,
  Search,
  Pagination,
} from '@americanexpress/dls-react';
import { useOneDataFetchye } from '@americanexpress/fetchye-amex';
import styles from './styles.scss';
import { data } from '../../mocks/applicationFilters';

const ApplicationProperties = () => {
  const { formatMessage } = useIntl();
  const [applicationFilter, setApplicationFilter] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const {
 isLoading, applicationData, error, run 
} = useOneDataFetchye(
    'ReadKnowYourCustomerRefreshApplicationProperties.v1',
    {
      defer: true,
      body: {
        applicationName: applicationFilter,
      },
    });

  const handleDropDownChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const searchClick = (event) => {
    event.preventDefault();
    run().then((x) => {
      if (!x.error && x.data) setTableData(x.data.body);
      else setTableData([]);
    });
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
    if (!tableData) return markup;

    const searchTerm = e.target.value;
    const filteredData = tableData.filter((row) => row.applicationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.group.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.description.toLowerCase().includes(searchTerm.toLowerCase()));
    setSearchTerm(searchTerm);
    setTableData(filteredData);
  };

  const onApplicationFilterChange = (e) => {
    const selectedApplication = data.find((a) => a.id == e.target.value);
    if (selectedApplication) setApplicationFilter(selectedApplication.friendlyName);
  };

  const resetClick = () => {
    setApplicationFilter('');
  };

  const getTable = () => {
    if (!isLoading && tableData != null) {

      return <>
        <div className="flex flex-justify-end col-md-12">
          <Label className="flex flex-align-center pad-1-r">
            <FormattedMessage id="records.per.page" />
          </Label>
          <div className="col-md-1">
            <Select
              id="dt-v2-p-select"
              onChange={handleDropDownChange}
              value={itemsPerPage}
            >
              <SelectOption value="5">5</SelectOption>
              <SelectOption value="7">7</SelectOption>
              <SelectOption value="10">10</SelectOption>
            </Select>
          </div>
        </div>
        <div className="row margin-1">
          <DataTableV2 small={true} id="tablev2-small-instance">
            <DataTableHeadV2>
              <DataTableRowV2>
                <DataTableHeadCellV2><FormattedMessage id="property.app.name" /></DataTableHeadCellV2>
                <DataTableHeadCellV2><FormattedMessage id="property.name" /></DataTableHeadCellV2>
                <DataTableHeadCellV2><FormattedMessage id="group" /></DataTableHeadCellV2>
                <DataTableHeadCellV2><FormattedMessage id="description" /></DataTableHeadCellV2>
                <DataTableHeadCellV2 align="right"><FormattedMessage id="value" /></DataTableHeadCellV2>
              </DataTableRowV2>
            </DataTableHeadV2>
            <DataTableBodyV2>
              {paginatedRows.map((row, i, a) =>
                <DataTableRowV2 key={i}>
                  <DataTableCellV2>{row.applicationName}</DataTableCellV2>
                  <DataTableCellV2>{row.name}</DataTableCellV2>
                  <DataTableCellV2 >{row.group}</DataTableCellV2>
                  <DataTableCellV2 >{row.description}</DataTableCellV2>
                  <DataTableCellV2 align="right">{row.value}</DataTableCellV2>
                </DataTableRowV2>
              )}
            </DataTableBodyV2>
          </DataTableV2>
          {tableData.length > 0 ? <Pagination
            theme={{ background: 'transparent' }}
            selected={currentPage}
            onChange={handlePageChange}
            total={Math.ceil(tableData.length / itemsPerPage)}
          /> : <></>}
        </div>
      </>

    } return <></>;
  }

  return (
    <>
      <div className="pad-2-md-up pad-1-sm-down row shadow-2">
        <div className="col-sm-12 col-md-3">
          <Label htmlFor="accountFilterSelect">
            {formatMessage({ id: 'applicationFilter.label' })}
          </Label>
          <Select
            id="applicationFilterSelect"
            className="fluid"
            onChange={onApplicationFilterChange}
          >
            <SelectOption value=""></SelectOption>
            {data.map((option) => <SelectOption value={option.id} key={option.id}>{option.friendlyName}</SelectOption>)}
          </Select>
        </div>
        <div className={`${styles.searchFieldPadTop} col-sm-12 col-md-3 pad-1-sm-down margin-2-t`}>
          <Search
            id="df-search"
            value={searchTerm}
            onChange={searchTermHandler}
            placeholder={formatMessage({ id: 'search.field.placeholder' })}
          />
        </div>
        <div className="col-lg-2 col-md-3 margin-1-t pad-1-sm-down">
          <ButtonPrimary
            type="submit"
            id="searchBtn"
            className="fluid margin-t"
            onClick={searchClick}
          >
            <FormattedMessage id="search.button.label" />
          </ButtonPrimary>
        </div>
        <div className="col-lg-2 col-md-3 margin-1-t pad-1-sm-down">
          <ButtonPrimary
            type="submit"
            id="resetBtn"
            className="fluid margin-t"
            onClick={resetClick}
          >
            <FormattedMessage id="reset.button.label" />
          </ButtonPrimary>
        </div>
      </div>
      {
        getTable()
      }
    </>
  );
};

export default ApplicationProperties;
