import '../../../CSS/nuevoNomina.css'
import TableNominasNueva from './TableNominasNueva';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Post } from '../../../utils/axiosUtils';
import { useNavigate } from 'react-router';
//import PlusButton from '../../PlusButton'

const URL = process.env.REACT_APP_URL_URI;



const NuevoNomina = () => {
    const [dataEmpleados, setDataEmpleados] = useState([{
        "Nombre": '',
        "Faltas": 0,
        "Complementos": 0,
        "Rebajes": 0
    }]);

    const [titles, setTitles] = useState(['Nombre','Faltas','Complementos','Rebajes']);

    /*
    const agregarConcepto = (titulo) => {
        if(titles.filter(title => title === titulo).length === 0){
            setTitles([...titles,titulo]) 
            setDataEmpleados(dataEmpleados.map(objeto => (
                {
                    ...objeto,
                    titulo: 0
                }
            )));
        }
    }

     const options=[
        {
            function: ()=>{
              agregarConcepto('Domingos Trabajados')
            },
            title: 'Prima Dominical'
        },
        {
            function: ()=>{
                agregarConcepto("Horas Extras")
            },
            title: 'Horas Extras'
        }
    ] */

    const [periodoInicio, setPeriodoInicio] = useState();
    const [periodoFin, setPeriodoFin] = useState();
    const [esquema, setEsquema] = useState();

    const onChangePeriodoInicio = (e) => {
        const {value} = e.target;

        setPeriodoInicio(value);
    };

    const onChangePeriodoFin = (e) => {
        const {value} = e.target;

        setPeriodoFin(value);
    };

    const onChangeEsquema = (e) => {
        const {value} = e.target;

        setEsquema(value);
    };

    const [datos, setDatos] = useState([])

    const navigate = useNavigate();

    const onChangeHandler = (e) => {
        const {name, id, value} = e.target;

        datos[id][name] = Number(value)
        setDatos([
            ...datos
        ]);
    };

    const onSubmitHandler = async(e) => {
        e.preventDefault();
        await Post('/nominas/add', {operaciones:datos, detalle:{periodoInicio,periodoFin, esquema}});
        navigate('/app/nominas');
    };

    useEffect(()=>{
        const getData = async(URL) => {
            const trabajadores = await axios.get(`${URL}/trabajadores`, {withCredentials: true});
            setDataEmpleados(trabajadores.data.data.map((trabajador) => (
                trabajador.datosPersonales ? {
                    "Nombre": `${trabajador.datosPersonales.nombre} ${trabajador.datosPersonales.apellidoPaterno} ${trabajador.datosPersonales.apellidoMaterno}`,
                    "Faltas": 0,
                    "Complementos": 0,
                    "Rebajes": 0
                } :
                {
                    "Nombre": '',
                    "Faltas": 0,
                    "Complementos": 0,
                    "Rebajes": 0
                })
            ));
            setDatos(trabajadores.data.data.map(trabajador=>(
                {
                "trabajador": trabajador._id,
                "sueldoBase": Number(trabajador.datosLaborales.sueldo),
                "dias": 0,
                "complementos": 0,
                "rebajes": 0
                }
            )
            ));
        }

        getData(URL).catch(console.error)
        
    },[]);

    return (
        <div>
            <h1>Crear Nómina</h1>
            <div style={{ marginLeft: '50px', marginRight: '50px' }}>
            <form onSubmit={onSubmitHandler}>
                <div id="contenedorPrincipal">

                    <div id="informacion">

                        <div id="informacionEspecifica">
                            <div id="titulo">
                                Esquema
                            </div>
                                <select name="esquema" className='esquemaInput' onChange={onChangeEsquema} required>
                                    <option value="Semana">Semanal</option>
                                    <option value="Quincena">Quincenal</option>

                                </select>
                        </div>
                        <div id="informacionEspecifica">
                            <div id="titulo">
                                De la fecha:
                            </div>
                                <input className='periodoInput' type='date' name="periodoInicio" onChange={onChangePeriodoInicio} required/>
                        </div>
                        <div id="informacionEspecifica">
                            <div id="titulo">
                                A la fecha:
                            </div>
                                <input type='date' className='periodoInput' name="periodoFin" onChange={onChangePeriodoFin} required/>
                        </div>
                        {/*
                        <span className="FilterEnd">
                                <PlusButton options={options} /> 
                            </span>
                        */}
                    </div>

                </div>
                <div >

                    <TableNominasNueva 
                    titles={titles} 
                    rawData={dataEmpleados} 
                    onChangeHandler={(e)=>onChangeHandler(e)}/>

                    <button type='submit' className='submitButton'>Enviar</button>
                    
                </div>
                </form>
            </div>

        </div>
    )
}

export default NuevoNomina