import { useState } from 'react';
import '../CSS/SignIn.css'
import { useNavigate } from 'react-router-dom'
import store from '../state/store';
import { login } from '../state/actions/auth_actions'
import { Post } from '../utils/axiosUtils';


const SignIn = () => {

    const [datos, setData] = useState({});
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const respuesta = await Post('/users/signIn', datos);
            console.log(respuesta)
            if (respuesta.status === 200) {
                console.log('Login');
                await store.dispatch(login(respuesta));
                navigate('/app');
            } else {
                throw respuesta
            }
        } catch (e) {
            console.log('error', e.response.data.error);
            console.error(e.response.data.error);
            setError(e.response.data.error);
        }

    };

    const onChangeText = (e) => {
        const { name, value } = e.target;
        setError('');
        setData({
            ...datos,
            [name]: value
        });
    };

    return (
        <div id='principal'>
            <div >
            </div>
            <div className='contenedor'>
                <h1 style={{ color: 'blue' }}>Bienvenido(a) a <b style={{ color: 'black' }}>CUADRA</b> </h1>
                <h2 style={{ color: 'blue' }}><b> Ingresa aquí</b></h2>
                <form onSubmit={onSubmitHandler}>
                    <div id='inputs'>
                        <label style={{ fontSize: '23px' }}><b>Usuario</b></label >
                        <input className='input' style={{ padding: '5px' }} name='usuario' onChange={onChangeText} required />
                    </div>
                    <div id='inputs' >
                        <label style={{ fontSize: '23px' }}><b>Contraseña</b></label >
                        <input className='input' style={{ padding: '5px' }} type='password' name='password' onChange={onChangeText} required />

                        <a href="https://www.mozilla.org/es-ES/" id='a'>Olvidé mi contraseña</a>.
                        <h3 style={{ color: 'red', textAlign: 'center' }}>{error ? error : null}</h3>
                    </div>

                    <div style={{
                        marginTop: '10px',
                        paddingLeft: '200px',

                    }}>

                        <button type="submit"
                            style={{
                                backgroundColor: 'blue',
                                border: 0,
                                color: 'white',
                                height: '35px',
                                width: '170px',
                                borderRadius: '6px',
                                fontSize: '20px'
                            }}

                        >Iniciar Sesion
                        </button>
                    </div>
                </form>

            </div>

        </div>
    )
}

export default SignIn