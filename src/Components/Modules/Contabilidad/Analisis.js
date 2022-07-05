import '../../../CSS/analisis.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { currencyToNumber, numberToCurrency } from '../../../utils/format';
import moment from 'moment';
const URL = process.env.REACT_APP_URL_URI;

const calcularTotal = (registros) => {
    const ingreso = calcularIngresos(registros.filter((operacion) => operacion.tipo === "Ingreso"));
    const gasto = calcularGastos(registros.filter((operacion) => operacion.tipo === "Gasto"));
    return ({
        ingresos:ingreso,
        gastos:gasto
    })
};

const calcularIngresos = (ingresos) => {
    let initial = 0;
    const total = numberToCurrency(ingresos.reduce((prev,current)=> prev+current.monto,initial));
    const ventas = numberToCurrency(ingresos.filter((operacion) => operacion.categoria === "Ventas").reduce((prev,current)=> prev+current.monto,initial));
    const resultado = {
        ventas,
        total
    }
    return resultado
};

const calcularGastos = (gastos) => {
    let initial = 0;
    const total = numberToCurrency(gastos.reduce((prev,current)=> prev+current.monto,initial));
    const impuestos = numberToCurrency(gastos.filter((operacion) => operacion.categoria === "Impuestos").reduce((prev,current)=> prev+current.monto,initial));
    const sueldos = numberToCurrency(gastos.filter((operacion) => operacion.categoria === "Sueldos").reduce((prev,current)=> prev+current.monto,initial));

    const resultado = {
        impuestos,
        sueldos,
        total
    }
    return resultado
};

const Analisis = () => {

    const [utilidad, setUtilidad] = useState(0);

    const [data, setData] = useState([]);
    const [dataFiltered, setDataFiltered] = useState({
        ingresos:{},
        gastos:{}
    });

    const [filtroMes, setFiltroMes] = useState('all');

    const funcionFiltroMes = (e) => {
        setFiltroMes(e.target.value);
    };

    useEffect(() => {
        const getData = async (URL) => {
            //Ajustar Dirección y obj json de contabilidad ya que cuenta con información de la tabla trabajadores
            const registros = await axios.get(`${URL}/contabilidad/operaciones`, { withCredentials: true });
            setData(registros.data.data)
            setDataFiltered(calcularTotal(registros.data.data))
        }
        getData(URL).catch(console.error);
    },[]);

    useEffect(() => {
        if(filtroMes==='all'){
            setDataFiltered(calcularTotal(data))
        }else{
            setDataFiltered(calcularTotal(data.filter((operacion) => moment(operacion.fechaOperacion,"DD-MM-YYYY").month()+1 === Number(filtroMes))));
        };
    }, [data,filtroMes]);

    useEffect(()=>{
        if(dataFiltered.ingresos.total && dataFiltered.gastos.total){
            setUtilidad(numberToCurrency(currencyToNumber(dataFiltered.ingresos.total)-currencyToNumber(dataFiltered.gastos.total)));
        }
    },[utilidad,dataFiltered])



    return (
        <div>
            <h1 style={{paddingBottom:'30px'}}>Analisis financiero</h1>
            <div style={{ width: '500px', paddingBottom:'40px' }}>
                <div id='fecha'>
                <div id='filtroOpcion'>
                    <h3>Filtro:</h3>
                    <select style={{ height: '30px', width:'200px' }} value={filtroMes} onChange={(e)=> funcionFiltroMes(e)}>
                        <option selected value="all">Todos los meses...</option>
                        <option value="1">Enero</option>
                        <option value="2">Febrero</option>
                        <option value="3">Marzo</option>
                        <option value="4">Abril</option>
                        <option  value="5">Mayo</option>
                        <option value="6">Junio</option>
                        <option value="7">Julio</option>
                        <option value="8">Agosto</option>
                        <option  value="9">Septiembre</option>
                        <option value="10">Octubre</option>
                        <option value="11">Noviembre</option>
                        <option value="12">Diciembre</option>
                    </select>
                </div>
                </div>
            </div>
            <div id='contenido'>
                <div id='separador' style={{ borderRight: 'solid 2px black'}}>
                    <table id='tabla'>
                        <tr >
                            <td rowSpan={2} style={{ width: '150px' }}>
                                <div id='icono-ingreso' >

                                </div>
                            </td>
                            <td style={{ textAlign: 'left' }}>
                                <h5>Ingresos</h5>
                            </td>
                        </tr>

                        <tr>
                            <td style={{ textAlign: 'right', color:'green'}}>
                                <h6 style={{fontSize: 24 }}>{dataFiltered.ingresos.total}</h6>
                            </td>
                        </tr>

                        <tr>
                            <td >
                                <div style={{ width: '100%', height: '30px' }}>

                                </div>
                            </td>
                            <td ><div style={{ width: '100%', height: '30px' }}>

                            </div>
                            </td>
                        </tr>
                        <tr>
                            <td >
                                Ventas
                            </td>
                            <td style={{ textAlign: 'right' }}>
                                {dataFiltered.ingresos.ventas}
                            </td>

                        </tr>
                    </table>
                </div>
                <div id='separador' style={{ borderRight: 'solid 2px black'}}>
                    <table id='tabla'>
                        <tr >
                            <td rowSpan={2} style={{ width: '150px' }}>
                                <div id='icono-gasto' >

                                </div>
                            </td>
                            <td style={{ textAlign: 'left' }}>
                                <h5>Gastos</h5>
                            </td>

                        </tr>

                        <tr>
                            <td >

                            </td>
                            <td style={{ textAlign: 'right', color:'red' }}>
                                <h6 style={{fontSize: 24 }}>{dataFiltered.gastos.total}</h6>
                            </td>

                        </tr>
                        <tr>
                            <td >
                                <div style={{ width: '100%', height: '30px' }}>

                                </div>
                            </td>
                            <td ><div style={{ width: '100%', height: '30px' }}>

                            </div>
                            </td>
                        </tr>
                        <tr>
                            <td  >
                                Sueldos
                            </td>
                            <td colSpan={2} style={{ textAlign: 'right' }}>
                                {dataFiltered.gastos.sueldos}
                            </td>

                        </tr>
                        <tr>
                            <td >
                                Impuestos
                            </td>
                            <td colSpan={2} style={{ textAlign: 'right' }}>
                                {dataFiltered.gastos.impuestos}
                            </td>

                        </tr>
                    </table>
                </div>
                <div id='separador'>
                    <table id='tabla'>
                        <tr >
                            <td rowSpan={2}>
                                <div id='icono-utilidad' >

                                </div>
                            </td>
                            <td style={{ textAlign: 'left' }}>
                                <h5>Utilidad</h5>
                            </td>

                        </tr>

                        <tr>
                            <td >
                                <div style={{ width: '100%', height: '30px' }}>

                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2} style={{paddingTop:'40px'}}>
                                <div id='utilidad'>

                                    {utilidad}

                                </div>
                            </td>
                        </tr>


                    </table>
                </div>
            </div>
        </div>
    )
}
export default Analisis;
