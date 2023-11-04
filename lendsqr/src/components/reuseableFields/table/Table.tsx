import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
  } from '@tanstack/react-table';
  import { useEffect, useState } from 'react';
  import './styles.scss';
  import { BsFilter } from 'react-icons/bs';
  import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
  
  interface BasicTableProps {
    data: any[];
    columns: any[];
    rowsPerPage?:number;
  }
  
  export default function BasicTable({ data, columns, rowsPerPage = 5 }: BasicTableProps) {
  
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
    });

    const filteredRows = table.getFilteredRowModel().rows;

    const noOfPages =
      filteredRows && Array.isArray(filteredRows)
        ? Math.ceil(filteredRows.length / rowsPerPage)
        : 0;

const maxPagesToShow = 10;
const pagesArr = [];

if (noOfPages <= maxPagesToShow) {
  // If there are fewer or equal to 5 pages, display all pages
  pagesArr.push(...new Array(noOfPages).fill(null).map((_, index) => index + 1));
} else {
  // Calculate the middle index where the ellipsis should be placed
  const middleIndex = Math.ceil(maxPagesToShow / 2);

  if (noOfPages <= 10) {
    // If there are fewer or equal to 10 pages, display the first 5 pages, an ellipsis, and the last 5 pages
    pagesArr.push(...new Array(maxPagesToShow).fill(null).map((_, index) => {
      if (index < middleIndex) return index + 1;
      if (index === middleIndex) return '...';
      return noOfPages - (maxPagesToShow - index) + 1;
    }));
  } else {
    // If there are more than 10 pages, display the first 2 pages, an ellipsis, the last 2 pages, and the current page
    pagesArr.push(1, 2, '...', noOfPages - 1, noOfPages);
  }
}


    useEffect(()=>{
      table.setPageSize(rowsPerPage);
    },[rowsPerPage,table])

    return (
      <div className='table-div'>
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {
                      header.column.columnDef.header !== 'Actions' ?
                      header.isPlaceholder ? null : (
                        <div className='header'>
                          {flexRender(
                            header.column.columnDef.header as React.ReactNode,
                            header.getContext()
                          )}
                          <span>
                            <BsFilter fontSize={'1.5rem'}/>
                          </span>
                        </div>
                      )
                      : <></>
                    }
                  </th>
                ))}
              </tr>
            ))}
          </thead>
  
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className='pagination'>
          <div className='select-wrapper'>
            <p>Showing</p>
            <div className='select-page'>
              <select className=''
                value={table.getState().pagination.pageSize}
                onChange={e => {
                  table.setPageSize(Number(e.target.value))
                }}
              >
                {[10, 20, 30, 40, 50].map(pageSize => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>
            </div>
            <p>out of {filteredRows.length}</p>
          </div>
          <div className='pageIndex'>
            <button className='prev' disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}>
              <MdKeyboardArrowLeft fontSize={'1.5rem'}/>
            </button>
            {
              pagesArr.map((value,index)=>(
                <button className='pagesArr' key={index} onClick={()=>table.setPageIndex(index)}>{value}</button>
              ))
            }
            <button className='next' disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}>
              <MdKeyboardArrowRight fontSize={'1.5rem'}/>
            </button>
          </div>
        </div>
      </div>
    );
  }
  