import '../CSS/gridLayout.css'
import InputForm from "./Modules/Empleados/InputForm"
const FormDisplay = (props) => {
    const {datosInput}=props
    
    return (
        <>
            {
                datosInput.map((input) =>
                    < InputForm 
                        etiqueta={input.etiqueta}
                        placeholder={input.placeholder}
                        tipo={input.tipo}
                    />
                )}

        </>
    )
}
export default FormDisplay