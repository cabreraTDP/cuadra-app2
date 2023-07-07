import '../../CSS/Header.css'
import Logo from '../../svg/Twhite.svg'
import { Link } from "react-router-dom";
import { useState } from 'react';
import store from '../../state/store';
import { setEmpresaId } from '../../state/actions/auth_actions';

const empresas = JSON.parse(localStorage.getItem('empresas'))


const Header = () => {
    const [empresa, setEmpresa] = useState(empresas[0].empresa.empresa)
    const onChangeOperacion = async (e) => {
        const { name, value } = e.target
        setEmpresa(
          value
        )
        await store.dispatch(setEmpresaId(value));
      }
    return (
        <div className="header">
            <img  alt="None"
            style={{width:200, marginTop:30, marginLeft: 50}}
            src={Logo} ></img>
            <select
                onChange={(e) => onChangeOperacion(e)}
                name="empresa"
                required
            >
                <option value={empresas[0].empresa._id}>{empresas[0].empresa.empresa}</option>
                <option value={empresas[1].empresa._id}>{empresas[1].empresa.empresa}</option>
            </select>
            <Link to="/"><button style={{width: '200px', height: '50px', marginTop: 30, marginLeft: '65%', 
                            position: 'absolute', backgroundColor: '#B595E6', color:'white',
                            border:'black solid 0px', borderRadius: 20, fontSize: 22, fontWeight:'bold'}}>Cerrar sesión</button></Link>
        </div>
    )
}

export default Header