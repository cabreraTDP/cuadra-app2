import '../../../CSS/nuevoNomina.css'
import TableDisplay from "../../TableDisplay"

import { titles, data } from '../../../dataVerNomina';

const NuevoNomina = () => {

    return (
        <div>
            <h1>Ver Nóminas</h1>
            <div style={{ marginLeft: '50px', marginRight: '50px' }}>

                <div id="verNomina">

                    <div id="titulo">
                        Filtros:

                    </div>
                    <div id="botones">
                        <button type="button"
                            style={{
                                backgroundColor: '#dae6eb',
                                border: '3px solid',
                                borderColor:'#2400ff',
                                color: '#8d8d99',
                                height: '35px',
                                width: '170px',
                                borderRadius: '6px',
                                fontSize: '20px',
                            }}

                        >Por ID</button>
                        <div style={{widht:'20px'}}></div>
                        <button type="button"
                            style={{
                                backgroundColor: '#dae6eb',
                                border: '3px solid',
                                borderColor:'#2400ff',
                                color: '#8d8d99',
                                height: '35px',
                                width: '170px',
                                borderRadius: '6px',
                                fontSize: '20px'
                            }}

                        >Por Semana</button>

                    </div>

                </div>
                <div >
                    <TableDisplay titles={titles} rawData={data} />
                </div>
            </div>
        </div>
    )
}

export default NuevoNomina