import TableDisplay from "../../TableDisplay"
import {   options } from '../../../datafake';
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
const URL = process.env.REACT_APP_URL_URI;

const titlesEmpleados = ['Nombre','RFC','CURP','NSS','Ver'];


const Empleados = () => {

    const [dataEmpleados, setDataEmpleados] = useState([{
        "Nombre": "",
        "RFC": "",
        "CURP": "",
        "NSS": "",
        "Ver": ""
    }]);

    useEffect(()=>{
        const  getData = async(URL) => {
            const trabajadores = await axios.get(`${URL}/trabajadores`, {withCredentials: true});
            setDataEmpleados(trabajadores.data.data.map((trabajador) => (
                trabajador.datosPersonales ? {
                    "Nombre": trabajador.datosPersonales.nombre,
                    "RFC": trabajador.datosPersonales.rfc,
                    "CURP": trabajador.datosPersonales.curp,
                    "NSS": trabajador.datosPersonales.nss,
                    "Ver": trabajador._id
                } :
                {
                    "Nombre": '',
                    "RFC": "",
                    "CURP": "",
                    "NSS": "",
                    "Ver": ""
                }
            )));
        }
        getData(URL).catch(console.error);
        

    },[]);

    return (
        <div >
            <h1>Empleados</h1>
            <TableDisplay 
                titles={titlesEmpleados} 
                filter={true} 
                rawData={dataEmpleados} 
                options={options} 
                link={'empleados/editar/'} />
        </div>
    )
}

export default Empleados