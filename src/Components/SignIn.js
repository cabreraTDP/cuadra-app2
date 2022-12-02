import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import store from '../state/store';
import {login}  from '../state/actions/auth_actions'
import { Post } from '../utils/axiosUtils';
import logo from '../svg/logo.svg';

const SignIn = () => {

    const [datos, setData] = useState({});
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const onSubmitHandler = async(e) => {
        e.preventDefault();

        try{
            const respuesta = await Post('/users/signIn', datos);
            if(respuesta){
                console.log('Login');
                await store.dispatch(login(respuesta));
                navigate('/app');
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
        <div style={{position:'relative', width:'100%', height:'100%', backgroundColor:'#B9BBFA', opacity: 0.9}}>
            <div style={{position:'absolute', top: '25%', left: '30%', width: '40%', height:'50%',margin: '-25px 0 0 -25px', border:'2px groove black', 
                borderRadius: 50, backgroundColor:'RGBA(255,255,255,0.5)', boxShadow:'5px 5px 5px 5px gray'}}>
                <div style={{marginLeft: '25%', width: '50%', marginTop: 20}}>
                <img src={logo} ></img>
                </div>
                <form onSubmit={onSubmitHandler}>
                    
                <div style={{width:'60%', marginLeft:'20%', marginTop:25}}>
                    <label style={{fontSize:'23px'}}>Usuario:</label >
                    <input style={{padding: '5px', width:'100%', marginBottom:30}} name='usuario' onChange={onChangeText} required/>

                    <label style={{fontSize:'23px'}}>Contraseña:</label >
                    <input className='input' style={{padding: '5px', width:'100%',marginBottom:5}} type='password' name='password' onChange={onChangeText} required/>
                    
                    <a href="" id='a'>Olvidé mi contraseña</a>.
                    <h3 style={{color:'red', textAlign:'center'}}>{error?error:null}</h3>
                </div>

                <div style={{
                    marginTop: 30,
                    paddingLeft: '200px',}}>
                     
                    <button type="submit"
                        style={{
                            border: 0,
                            backgroundColor: '#1C70E6',
                            color: 'white',
                            height: '35px',
                            width: '170px',
                            borderRadius: '6px',
                            fontSize:'20px'
                        }}>
                        Iniciar Sesion
                    </button>
                    
                </div>
                </form>

            </div>

            
        </div>
    )
}

export default SignIn