import { useAsyncDebounce } from 'react-table'
import React from 'react'
import '../CSS/TableDisplay.css'
import PlusButton from './PlusButton'

function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
    options
  }) {
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
      setGlobalFilter(value || undefined)
    }, 200)
  
    return (
    <div className="Filters">
      <span className="Filter">
        Buscar:{' '}
        <input className="FilterInput"
          value={value || ""}
          onChange={e => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={''}
          style={{
            
          }}
        />
      </span>
      <span className="FilterEnd">
      {options?<PlusButton options={options}/>:<></>}
      </span>
    </div>
    )
  }

  // Define a default UI for filtering
function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
  }) {
    const count = preFilteredRows.length
  
    return (
      <input
        value={filterValue || ''}
        onChange={e => {
          setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
        }}
        placeholder={`Search ${count} records...`}
      />
    )
  }
  

  export {GlobalFilter, DefaultColumnFilter}