import { useState } from 'react'
import '../CSS/PlusButton.css'
import { Link } from "react-router-dom";
import PlusIcon from '../svg/plus.svg'


const PlusButton = (props) => {

    const {options} = props;

    const [isOpened, setIsOpened] = useState(false);

    const toggleMenu = () => {
        setIsOpened(!isOpened);
    }

    return (
    <div>
        {isOpened?
        <>
        <div className="PlusButton" onClick={toggleMenu}>
           <img src={PlusIcon}></img>
        </div>
        <div className="toggleMenu" onMouseLeave={toggleMenu}>
            <ul>
                {options.map((option) => {
                    return(
                    option.link?<li key={option.title}><Link to={option.link}>{option.title}</Link></li>:
                    option.function?<li key={option.title} onClick={()=>option.function()}>{option.title}</li>:
                    null
                    )
                })}
            </ul>
        </div>
        </>
        :
        <div className="PlusButton" onMouseEnter={toggleMenu} onClick={toggleMenu}>
           <img src={PlusIcon}></img>
        </div>
        }
    </div>
    )
}

export default PlusButton