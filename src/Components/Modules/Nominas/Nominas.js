import TableDisplay from "../../TableDisplay"
import { options } from '../../../datafake';
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import moment from "moment";

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
            const nominas = await axios.get(`${URL}/nominas`, {withCredentials: true});
            setDataNominas(nominas.data.data.map((nomina) => (
                nomina.detalle ? {
                    "Periodo Inicio": moment(nomina.detalle.periodoInicio).format("DD-MM-YYYY"),
                    "Periodo Fin": moment(nomina.detalle.periodoFin).format("DD-MM-YYYY"),
                    "Semana": nomina.detalle.semana,
                    "Total": nomina.detalle.total,
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
                link={'nominas/ver/'} />
        </div>
    )
}

export default Nominas