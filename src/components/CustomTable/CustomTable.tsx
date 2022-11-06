import React, { useEffect, useState } from 'react';
import './CustomTable.scss';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/solid';

interface IColumns {
  access_name: string;
  label: string;
  sortable?: boolean;
}
export interface ITableRows {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  username: string;
  password: string;
  join_date: string;
  email: string;
  address: string;
  country: string;
  active: string;
}

export interface ICustomTable {
  columns: IColumns[];
  data: ITableRows[];
  title: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClick: (id: number) => void;
}

const CustomTable: React.FC<ICustomTable> = ({
  columns,
  data,
  title,
  handleSearch,
  handleClick,
}) => {
  const { length } = data;
  const [rows, setRows] = useState<ITableRows[]>([]);
  useEffect(() => {
    setRows(data.slice(0, 10));
  }, [data]);
  const totalPages = Math.ceil(length / 10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortField, setSortField] = useState<number | string>('');
  const [order, setOrder] = useState<string>('asc');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(e);
  };

  const handleViewClick = (id: number) => {
    handleClick(id);
  };

  const handlePageChanage = (page: number) => {
    setCurrentPage(page);
    const startVal = 10 * page;
    const endVal = startVal + 10;
    setRows(data.slice(startVal, endVal));
  };

  const handleSorting = (
    sortField: string | number,
    sortOrder: 'asc' | 'desc'
  ) => {
    if (sortField) {
      const sorted = [...rows].sort((a, b) => {
        return (
          a[sortField as keyof typeof sortField]
            .toString()
            .localeCompare(
              b[sortField as keyof typeof sortField].toString(),
              'en',
              {
                numeric: true,
              }
            ) * (sortOrder === 'asc' ? 1 : -1)
        );
      });
      setRows(sorted);
    }
  };

  const handleSortingChange = (accessor: string | number) => {
    const sortOrder =
      accessor === sortField && order === 'asc' ? 'desc' : 'asc';
    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
  };

  const isNextDisabled = (): boolean => {
    return currentPage >= totalPages;
  };
  const isPrevDisabled = (): boolean => {
    return currentPage <= 1;
  };

  return (
    <div className="table">
      <div className="table__header">
        <h3>{title}</h3>
        <div className="search">
          <input
            type="text"
            placeholder="Search for users"
            onChange={handleChange}
          />
        </div>
      </div>
      <table className="table__main">
        <thead className="head">
          <tr>
            {columns.map((column) => {
              const SortIcon = column.sortable ? (
                sortField === column.access_name && order === 'asc' ? (
                  <ChevronUpIcon style={{ height: '1rem', width: '1rem' }} />
                ) : sortField === column.access_name && order === 'desc' ? (
                  <ChevronDownIcon style={{ height: '1rem', width: '1rem' }} />
                ) : (
                  ''
                )
              ) : (
                ''
              );
              return (
                <th
                  key={column.access_name}
                  onClick={
                    column.sortable
                      ? () => handleSortingChange(column.access_name)
                      : undefined
                  }
                >
                  {column.label}
                  <span>{SortIcon}</span>
                </th>
              );
            })}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.first_name}</td>
              <td>{row.email}</td>
              <td>{row.username}</td>
              <td>{row.address}</td>
              <td>{row.country}</td>
              <td>
                <button
                  style={
                    row.active === '1'
                      ? { backgroundColor: 'blue', color: 'white' }
                      : { backgroundColor: 'red', color: 'white' }
                  }
                >
                  {row.active === '1' ? 'Active' : 'Inactive'}
                </button>
              </td>
              <td>
                <button onClick={() => handleViewClick(row.id)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav className="table__pagination" aria-label="Table navigation">
        <button
          disabled={isPrevDisabled() ? true : false}
          onClick={() => handlePageChanage(currentPage - 1)}
        >
          <ChevronLeftIcon style={{ height: '1rem', width: '1rem' }} />
        </button>
        <button>{currentPage}</button>
        <button
          disabled={isNextDisabled() ? true : false}
          onClick={() => handlePageChanage(currentPage + 1)}
        >
          <ChevronRightIcon style={{ height: '1rem', width: '1rem' }} />
        </button>
      </nav>
    </div>
  );
};

export default CustomTable;
