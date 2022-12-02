import '../../CSS/Header.css'
import Logo from '../../svg/logo.svg'
const Header = () => {

    return (
        <div className="header">
            <img 
            style={{width:200, marginTop:10, marginLeft: 25}}
            src={Logo} ></img>
        </div>
    )
}

export default Header