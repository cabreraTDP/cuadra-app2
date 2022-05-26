import '../../CSS/sideMenu.css'
import { useState } from 'react';
import Icon from "awesome-react-icons";
import { Link } from "react-router-dom";

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
                                <td><Link to="home"><Icon name="star" strokeWidth="3" size="25" />Incio</Link></td>
                            </tr>
                            <tr>
                                <td><Link to="empleados"><Icon name="user" strokeWidth="3" size="25" />Empleados</Link></td>
                            </tr>
                            <tr>
                                <td><Link to="nominas"><Icon name="briefcase" strokeWidth="3" size="25" />Nominas</Link></td>
                            </tr>
                            <tr>
                                <td><Link to="contabilidad"><Icon name="check" strokeWidth="3" size="25" />Contabilidad</Link></td>
                            </tr>
                        </tbody>
                        :
                        <tbody>
                            <tr>
                                <td><Icon name="star" stroke="#0977F8" strokeWidth="3" size="25" /></td>
                            </tr>
                            <tr>
                                <td><Icon name="user" stroke="#0977F8" strokeWidth="3" size="25" /></td>
                            </tr>
                            <tr>
                                <td><Icon name="briefcase" stroke="#0977F8" strokeWidth="3" size="25" /></td>
                            </tr>
                            <tr>
                                <td><Icon name="check" stroke="#0977F8" strokeWidth="3" size="25" /></td>
                            </tr>
                        </tbody>
                    }
                </table>
            </div>
        </div>
    )
}

export default SideMenu