import '../../../CSS/gridLayout.css'
import inputsEmpleado from "../../../Constants/inputsEmpleado"
import InputForm from "./InputForm"


import { useState } from 'react'
import { Post } from '../../../utils/axiosUtils'
import {useNavigate} from 'react-router-dom'

const NuevoEmpleado = () => {

    const [datos, setDatos] = useState({})

    const navigate = useNavigate();

    const onSubmitHandler = async(e) => {
        e.preventDefault();
        await Post('/trabajadores/add', datos);
        navigate('/app/empleados');
    };

    const onChangeHandler = async(e) => {
        const {name, value} = e.target;
        setDatos({
            ...datos,
            [name]: value
        });
    };

    return (

        <div>
            <h1>Nuevo Empleado</h1>
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px' }}>
                <div style={{ width: '25%', height: '400px', float: 'left' }}>
                    <div style={{ width: '200px', height: '200px', backgroundColor: 'gray', position: 'absolute', margin: '45px 0 0 70px', borderRadius: '50%' }}>
                        <div style={{ textAlign: 'center', lineHeight: '150px' }}>
                        <h3>Añadir Foto</h3>
                        </div>
                    </div>
                    
                    

                </div>
                <div style={{ width: '30px', height: '400px', float: 'left' }}>

                </div>
                <div >
                    <form className="grid-layout" onSubmit={onSubmitHandler}>
                        {
                            inputsEmpleado.map((input) =>
                                < InputForm 
                                    etiqueta={input.etiqueta}
                                    placeholder={input.placeholder}
                                    tipo={input.tipo}
                                    name={input.name}
                                    onChangeHandler={(e)=>onChangeHandler(e)}
                                />
                        )}
                        <button className="submitButtonEmpleado" type="submit" style={{width:'100%'}} >Dar de Alta </button>
                    </form>
                </div>

            </div>
        </div>



    )
}

export default NuevoEmpleado