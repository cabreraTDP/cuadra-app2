import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import store from '../state/store';
import {login}  from '../state/actions/auth_actions'
import { Post } from '../utils/axiosUtils';
import logo from '../svg/Twhite.svg';
import axios from 'axios';

const URL = process.env.REACT_APP_URL_URI

const SignIn = () => {

    const [datos, setData] = useState({});
    const [error, setError] = useState('');
    const [empresa, setEmpresa] = useState('')
    const navigate = useNavigate();

    const onSubmitHandler = async(e) => {
        e.preventDefault();

        try{
            const respuesta = await Post('/users/signIn', datos);
            if(respuesta){
                await store.dispatch(login(respuesta));
                const cliente = await axios.get(
                    `${URL}/users/getEmpresa`,
                    { withCredentials: true }
                  )
                await store.dispatch(empresa(cliente))
                navigate('/app/home');

            }
        }catch(e){
            console.log('error',e.response.data.error);
            console.error(e.response.data.error);
            setError(e.response.data.error);
        }
        
    };

    const onChangeText = (e) => {
        const {name, value} = e.target;
        setError('');
        setData({
            ...datos,
            [name]: value
        });
    };

    return (
        <>
        <div style={{backgroundColor: '#B9BBFA', opacity: 0.9, borderBottom: '0.5px solid #4D4D4D'}}>
            <img alt="None" src={logo} style={{width: '15%', marginTop: '30px', marginLeft: '60px', marginBottom: '30px'}} ></img>
        </div>


        <div style={{ color: '#4D4D4D', position:'relative', width:'100%', height:'100%', backgroundColor:'#B9BBFA', opacity: 0.9}}>
            <div style={{position:'absolute', top: '15%', left: '25%', width: '50%', height:'65%',margin: '-25px 0 0 -25px', border:'1.5px solid #E6E6E6', 
                borderRadius: 20, backgroundColor:'RGB(255,255,255)'}}>
                <div style={{marginLeft: '25%', width: '50%', marginTop: 50}}>
                    <p style={{marginLeft: '25%', fontSize: '25px', fontWeight: 'bolder'}}>Iniciar Sesión</p>
                </div>
                <form onSubmit={onSubmitHandler}>
                    
                <div style={{width:'60%', marginLeft:'20%', marginTop:50}}>
                    <label style={{fontSize:'23px'}}>Usuario:</label >
                    <input style={{padding: '12px', width:'100%', marginBottom:30, borderRadius: 10, border:'1.5px solid #E6E6E6'}} name='usuario' onChange={onChangeText} required/>

                    <label style={{fontSize:'23px'}}>Contraseña:</label >
                    <input className='input' style={{padding: '12px', width:'100%',marginBottom:5, borderRadius: 10, border:'1.5px solid #E6E6E6'}} type='password' name='password' onChange={onChangeText} required/>
                    
                    <h3 style={{color:'red', textAlign:'center'}}>{error?error:null}</h3>
                </div>

                <div style={{
                    marginTop: 60,
                    marginLeft: '40%', width: '20%'}}>
                     
                    <button type="submit"
                        style={{
                            border: 0,
                            backgroundColor: '#EE9EFF',
                            color: 'white',
                            height: '50px',
                            width: '120px',
                            fontWeight: 'bold',
                            borderRadius: '10px',
                            fontSize:'20px',
                            padding: '3px'
                        }}>
                        Entrar
                    </button>
                    
                </div>
                </form>

            </div>

            
        </div>
        </>
    )
}

export default SignIn