import '../../CSS/sideMenu.css'
import { useState } from 'react';
import Icon from "awesome-react-icons";
import { Link } from "react-router-dom";
import HomeIcon from '../../svg/logoicon.svg'
import EmpleadoIcon from '../../svg/user.svg'
import NominaIcon from '../../svg/check.svg'
import ContabilidadIcon from '../../svg/calculator.svg'

const SideMenu = () => {
    const [isMenuShown, setIsMenuShown] = useState(false)
    /* Set the width of the side navigation to 250px */
    function openNav() {
        setIsMenuShown(true)
    }
    /* Set the width of the side navigation to 0 */
    function closeNav() {
        setIsMenuShown(false)
    }

    return (
        <div className="container">
            <div id="mySidenav" style={{ width: isMenuShown ? '300%' : '100%' }} className="sidenav" onMouseEnter={openNav} onMouseLeave={closeNav}>
                <table>
                    {isMenuShown ?
                        <tbody>
                            <tr>
                                <td><Link to="home"><img src={HomeIcon} style={{width:25, height:25, marginLeft: 10,marginRight:5, marginTop:10}}></img>Incio</Link></td>
                            </tr>
                            <tr>
                                <td><Link to="empleados"><img src={EmpleadoIcon} style={{width:25, height:25, marginLeft: 10,marginRight:5, marginTop:10}}></img>Empleados</Link></td>
                            </tr>
                            <tr>
                                <td><Link to="nominas"><img src={NominaIcon} style={{width:25, height:25, marginLeft: 10,marginRight:5, marginTop:10}}></img>Nominas</Link></td>
                            </tr>
                            <tr>
                                <td><Link to="contabilidad"><img src={ContabilidadIcon} style={{width:25, height:25, marginLeft: 10,marginRight:5, marginTop:10}}></img>Contabilidad</Link></td>
                            </tr>
                        </tbody>
                        :
                        <tbody>
                            <tr>
                                <td><img src={HomeIcon} style={{width:40, height:40, marginLeft: 10, marginTop:10}}></img></td>
                            </tr>
                            <tr>
                                <td><img src={EmpleadoIcon} style={{width:40, height:40, marginLeft: 10, marginTop:10}}></img></td>
                            </tr>
                            <tr>
                                <td><img src={NominaIcon} style={{width:40, height:40, marginLeft: 10, marginTop:10}}></img></td>
                            </tr>
                            <tr>
                                <td><img src={ContabilidadIcon} style={{width:40, height:40, marginLeft: 10, marginTop:10}}></img></td>
                            </tr>
                        </tbody>
                    }
                </table>
            </div>
        </div>
    )
}

export default SideMenu