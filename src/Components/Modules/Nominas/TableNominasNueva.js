import '../../../CSS/TableDisplay.css'
import { useTable, useFilters, useGlobalFilter, useSortBy, usePagination } from 'react-table'
import React from 'react'
import { DefaultColumnFilter} from '../../TableUtils'
import Icon from "awesome-react-icons";
// A great library for fuzzy filtering/sorting items


const TableNominasNueva = (props) => {

    const { titles, rawData } = props;

    const data = React.useMemo(
        () => rawData,[rawData]
      );

    const titlesData = Object.keys(rawData[0])

    let i = 0;
    const titlesObject = titles.map((title) => {
        let titleObj = {};
        titleObj['Header'] = title;
        titleObj['accessor'] = titlesData[i];

        i++
        return titleObj
    })

    /* eslint-disable */
    const columns = React.useMemo(
        () => titlesObject,[rawData]
    )
    /* eslint-enable */

    const defaultColumn = React.useMemo(
        () => ({
            Filter: DefaultColumnFilter,
        }),[]
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        state: { pageIndex },
      } = useTable(
        {
          columns,
          data,
          defaultColumn,
          initialState: { pageIndex: 0, pageSize: 8 },
          autoResetPage: !props.skipPageReset,
        },
        useFilters, // useFilters!
        useGlobalFilter,
        useSortBy,
        usePagination
      )


    return (
        <>
        
        {/* <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
            options={options}
        /> */}
         <div className="TableContainer">
         <table {...getTableProps()} className="Table">
           <thead >             
               <tr>
             </tr>
             {headerGroups.map(headerGroup => (
               <tr {...headerGroup.getHeaderGroupProps()}>
                 {headerGroup.headers.map(column => (
                   <th key={column.id}>
                     {column.render('Header')}
                     <Icon name="burger" size="15" {...column.getHeaderProps(column.getSortByToggleProps())}/>
                     <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                  </span>
                   </th>
                 ))}
               </tr>
             ))}

           </thead>
           <tbody {...getTableBodyProps()}>
             {page.map((row, i) => {
               prepareRow(row)
               return (
                 <tr {...row.getRowProps()}>
                   {row.cells.map(cell => 
                   cell.column.Header!=='Nombre'?
                    <td {...cell.getCellProps()}><input type='number' className='inputNomina' value={cell.value} placeholder={cell.value} name={cell.column.Header} id={cell.row.id} onChange={(e) => props.onChangeHandler(e)}/></td>    :
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                   )}
                 </tr>
               )
             })}
           </tbody>
         </table>

        
        <div className="pagination">
            <span className="total">
              <strong>Total: </strong>{data.length}
            </span>{'  '}
            <span className="botones">
              <button  onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                {'<<'}
              </button>{' '}
              <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                {'<'}
              </button>{' '}
              <button onClick={() => nextPage()} disabled={!canNextPage}>
                {'>'}
              </button>{' '}
              <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                {'>>'}
              </button>{' '}
            </span>
            <span>
              Page{' '}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{' '}
            </span>
            
        </div>

      </div>
    </>
    )
}

export default TableNominasNueva