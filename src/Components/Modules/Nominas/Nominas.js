import TableDisplay from "../../TableDisplay"
import { options } from '../../../datafake';
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import moment from "moment";
import { numberToCurrency } from "../../../utils/format";

const URL = process.env.REACT_APP_URL_URI;

const titlesNomina = ['Periodo Inicio','Periodo Fin','Semana','Total','Ver'];

const Nominas = () => {

    const [dataNominas, setDataNominas] = useState([{
        "Periodo Inicio": '',
        "Periodo Fin": "",
        "Semana": "",
        "Total": "",
        "Ver": ""
    }]);

    useEffect(()=>{
        const getData = async(URL) => {
            const empresa = localStorage.getItem('idEmpresa')
            const nominas = await axios.post(`${URL}/nominas/getByEmpresa`, {empresa}, {withCredentials: true});
            setDataNominas(nominas.data.data.map((nomina) => (
                nomina.detalle ? {
                    "Periodo Inicio": moment(nomina.detalle.periodoInicio).format("DD-MM-YYYY"),
                    "Periodo Fin": moment(nomina.detalle.periodoFin).format("DD-MM-YYYY"),
                    "Semana": nomina.detalle.semana,
                    "Total": numberToCurrency(nomina.detalle.total.toFixed(2)),
                    "Ver": nomina._id
                } :
                {
                    "Periodo Inicio": '',
                    "Periodo Fin": "",
                    "Semana": "",
                    "Total": "",
                    "Ver": ""
                }
            )));
        }
        getData(URL).catch(console.error);


    },[]);
    return (
        <div >
            <h1>Nominas</h1>
            <TableDisplay 
                titles={titlesNomina} 
                filter={true} 
                rawData={dataNominas} 
                options={options} 
                paginacion={true}
                link={'nominas/ver/'} />
        </div>
    )
}

export default Nominas