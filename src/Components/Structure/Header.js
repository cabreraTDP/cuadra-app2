import '../../CSS/Header.css'
import Logo from '../../svg/Twhite.svg'
import { Link } from "react-router-dom";

const Header = () => {

    return (
        <div className="header">
            <img  alt="None"
            style={{width:200, marginTop:30, marginLeft: 50}}
            src={Logo} ></img>
            <Link to="/"><button style={{width: '200px', height: '50px', marginTop: 30, marginLeft: '65%', 
                            position: 'absolute', backgroundColor: '#B595E6', color:'white',
                            border:'black solid 0px', borderRadius: 20, fontSize: 22, fontWeight:'bold'}}>Cerrar sesión</button></Link>
        </div>
    )
}

export default Header