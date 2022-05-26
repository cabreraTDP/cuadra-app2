import '../CSS/TableDisplay.css'
import { useTable, useFilters, useGlobalFilter, useSortBy, usePagination } from 'react-table'
import React from 'react'
import {GlobalFilter, DefaultColumnFilter} from './TableUtils'
import Icon from "awesome-react-icons";
// A great library for fuzzy filtering/sorting items


const TableDisplay = (props) => {

    const { titles, rawData, options } = props;

    const data = React.useMemo(
        () => rawData,[rawData]
      );
    
 

    let i = 0;

    let titlesData = []
    if(rawData.length > 0){
      titlesData = Object.keys(rawData[0]);
    }else{
      titlesData = Object.keys(titles);
    }
    const titlesObject = titles.map((title) => {
      let titleObj = {};
      titleObj['Header'] = title;
      titleObj['accessor'] = titlesData[i];

      i++
      return titleObj
    });

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
        state,
        preGlobalFilteredRows,
        setGlobalFilter,
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
        },
        useFilters, // useFilters!
        useGlobalFilter,
        useSortBy,
        usePagination
      )


    return (
        <>
        {props.filter?
        <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
            options={options}
        />:
        null
        }
         <div className="TableContainer">
         <table {...getTableProps()} className="Table">
           <thead >             
               <tr>
             </tr>
             {headerGroups.map(headerGroup => (
               <tr {...headerGroup.getHeaderGroupProps()}>
                 {headerGroup.headers.map(column => (
                   <th key={column.id} style={{textAlign:'center'}}>
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
                    {row.cells.map(cell => (
                   cell.column.Header==='Ver'|cell.column.Header==='Editar'| cell.column.Header==='Eliminar'?
                    props.type==='button'?
                    <td {...cell.getCellProps()}><button style={{backgroundColor:'inherit', border:'none', textDecoration:'underline'}} onClick={()=>props.buttonFunction(cell.value)}>{cell.column.Header}</button></td>    :
                    <td {...cell.getCellProps()}><a href={`${props.link}${cell.value}`} target={props.target?props.target:'_self'}>{cell.column.Header}</a></td>    :
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td> 
                    ))}
                 </tr>
               )
             })}
           </tbody>
         </table>

        {props.paginacion?
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
            
        </div>:
        null}

      </div>
    </>
    )
}

export default TableDisplay