const InputForm = ({etiqueta, placeholder, tipo, name, value={}, onChangeHandler}) => {

    return (
        <div style={{ padding:'2px', marginTop:'2px'}}>
                <label style={{ display: 'block', marginLeft:'5%' }}>
                    {etiqueta}
                </label>

                <input style={{ backgroundColor: '#f2ebc2',
                                border:'solid black 0.5px',
                                height: '25px',
                                width:'90%'}}
                
                    placeholder={placeholder}
                    type={tipo}
                    name={name}
                    
                    defaultValue={value || ''}
                    onChange={(e) => onChangeHandler(e)}
                />


        </div>
    )
}

export default InputForm