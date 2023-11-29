import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon'
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'

import { useState } from "react"
const TopSideButtons = ({removeFilter, applyFilter}) => {

    const [filterParam, setFilterParam] = useState("")
    const monthFilters = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

    const showFiltersAndApply = (params) => {
        applyFilter(params)
        setFilterParam(params)
    }

    const removeAppliedFilter = () => {
        removeFilter()
        setFilterParam("")
    }

    return(
        <div className="inline-block float-right">
            {filterParam !== "" && <button onClick={() => removeAppliedFilter()} className="btn btn-xs mr-2 btn-active btn-ghost normal-case">{filterParam}<XMarkIcon className="w-4 ml-2"/></button>}
            <div className="dropdown dropdown-bottom dropdown-end"  >
                <label tabIndex={0} className="btn btn-sm btn-outline" style={{fontSize:20}}><FunnelIcon className="w-5 mr-2"/>Filtrar por Mes</label>
                <ul style={{"background-color":"rgba(242, 242, 242,0.95)"}} tabIndex={0}   className="dropdown-content menu p-2 text-sm shadow bg-base-100 rounded-box w-52">
                    {
                        monthFilters.map((l, k) => {
                            return  <li key={k}><a onClick={() => showFiltersAndApply(l)} href="/#">{l}</a></li>
                        })
                    }
                    <div className="divider mt-0 mb-0"></div>
                    <li><a onClick={() => removeAppliedFilter()} href="/#">Remover Filtro</a></li>
                </ul>
            </div>
        </div>
    )
}

export default TopSideButtons