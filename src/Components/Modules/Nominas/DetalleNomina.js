import '../../../CSS/nuevoNomina.css'
import TableDisplay from "../../TableDisplay"

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Post } from '../../../utils/axiosUtils';
const XLSX = require("xlsx")
const titlesNomina = ['Nombre','Banco','Clabe','Faltas','Complementos',"Rebajes", "Total a pagar"]



const DetalleNomina = () => {

    const [nomina, setNomina] = useState([{
        "Nombre": "",
        "Banco": "",
        "Clabe": "",
        "Faltas": "",
        "Complementos": "",
        "Rebajes": "",
        "Total a pagar": ""
    }]);
    const [periodoInicio, setPeriodoInicio] = useState(null);
    const [periodoFin, setPeriodoFin] = useState(null);
    const [semana, setSemana] = useState(null);


    const { id } = useParams();

    const exportarExcel = () => {
        const workBook = XLSX.utils.book_new();
        const workSheet = XLSX.utils.json_to_sheet(nomina);
        XLSX.utils.book_append_sheet(workBook, workSheet, "Nómina");
        const fecha = new Date();
        const hoy = fecha.toDateString();
        XLSX.writeFile(workBook, hoy+'.xlsx');
    }

    useEffect(() => {

        const body = {
            id: id
        };

        const getData = async(body) => {
            const nominas = await Post('/nominas/getById', body);

            const registros = nominas.data.data[0].registros.map((registro) => ({
                "Nombre": `${registro.trabajador.datosPersonales.nombre} ${registro.trabajador.datosPersonales.apellidoPaterno} ${registro.trabajador.datosPersonales.apellidoMaterno}`,
                "Banco": registro.trabajador.datosBancarios?registro.trabajador.datosBancarios.banco:'',
                "Clabe": registro.trabajador.datosBancarios?registro.trabajador.datosBancarios.clabe:'',
                "Faltas": registro.faltas,
                "Complementos": registro.complementos,
                "Rebajes": registro.rebajes,
                "Total a pagar": registro.totalPagar
            }));

            setNomina(registros);
            setPeriodoInicio(nominas.data.data[0].detalle.periodoInicio.slice(0,10));
            setPeriodoFin(nominas.data.data[0].detalle.periodoFin.slice(0,10));
            setSemana(nominas.data.data[0].detalle.semana)
        };

        getData(body).catch(console.error);
        

    },[id]); 

    return (
        <div>
            <h1>Detalle Nómina</h1>
            <div style={{ marginLeft: '50px', marginRight: '50px', marginBottom:'30px' }}>

                <div id="contenedorPrincipal">
                    <div id="informacion">

                        <div id="informacionEspecifica">
                            <div id="titulo">
                                Semana
                            </div>
                            <div id="info">
                                {semana}
                            </div>
                        </div>
                        <div id="informacionEspecifica">
                            <div id="titulo">
                                De la fecha:
                            </div>
                            <div id="info">
                                {periodoInicio}
                            </div>
                        </div>
                        <div id="informacionEspecifica">
                            <div id="titulo">
                                A la fecha:
                            </div>
                            <div id="info">
                                {periodoFin}
                            </div>
                        </div>
                    </div>

                </div>
                <div >
                    <TableDisplay titles={titlesNomina} rawData={nomina} />
                </div>
                <div style={{marginLeft:'80%', marginTop:15}}>
                <button type="button" onClick={()=>exportarExcel}
                style={{
                    marginLeft:'80%', 
                    marginTop:15,
                    float:'right',
                    backgroundColor: '#dae6eb',
                    border: '3px solid',
                    borderColor: '#2400ff',
                    color: '#8d8d99',
                    height: '35px',
                    width: '170px',
                    borderRadius: '6px',
                    fontSize: '20px',
                }}>Crear</button>
                </div>
            </div>


        </div>
            
    )
}

export default DetalleNomina