import '../../../CSS/gridLayout.css'
import inputsEmpleado from '../../../Constants/inputsEmpleado'
import InputForm from './InputForm'
import TableDisplay from '../../TableDisplay'
import { useState, useEffect } from 'react'
import { Post } from '../../../utils/axiosUtils'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { Modal } from '../../Modal'

import { getProp } from '../../../utils/functions'
import { mapaDetalleEmpleado as mapa} from '../../../Constants/mapaDetalleEmpleado'
import axios from 'axios';
import moment from 'moment';


const URL = `${process.env.REACT_APP_URL_URI}`;

const titleArchivos = ['Titulo', 'Fecha', 'Ver']

//Tratar de abstraer una estructura del json para el llenado del formulario

const DetalleEmpleado = () => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [show2, setShow2] = useState(false)

  const handleClose2 = () => setShow2(false)
  const handleShow2 = () => setShow2(true)

  const [datosDocumento, setDatosDocumento] = useState({})
  const [archivo, setArchivo] = useState()

  const changeFile = (e) => {
    setArchivo(e)
  }

  const onChangeHandlerDocumento = (e) => {
    const { name, value } = e.target
    setDatosDocumento({
      ...datosDocumento,
      [name]: value,
    })
  }

  const [archivos, setArchivos] = useState([
    {
      Titulo: '',
      Fecha: '',
      Ver: '',
    },
  ])

  const { id } = useParams()

  const [datos, setDatos] = useState({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    nss: '',
    curp: '',
    rfc: '',
    calle: '',
    numeroExterior: '',
    numeroInterior: '',
    codigoPostal: '',
    municipio: '',
    estado: '',
    banco: '',
    cuenta: '',
    clabe: '',
    Puesto: '',
    sueldo: '',
    ingreso: '',
  })

  const [datosTrabajador, setDatosTrabajador] = useState({})

  const navigate = useNavigate()

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    await Post('/trabajadores/edit', datos)
    navigate('/app/empleados')
  }

  const onChangeHandler = async (e) => {
    const { name, value } = e.target
    await setDatos({
      ...datos,
      [name]: value,
    })
  }

  const onSubmitHandlerDocumento = async (e) => {
    e.preventDefault()

    const f = new FormData()
    f.append('file', archivo[0])
    f.append('title', datosDocumento.title)
    console.log(f.get('file'))
    const res = await axios.post(`${URL}/trabajadores/uploadFile`, f)
    console.log(res)
    setShow2(false)
  }

  useEffect(() => {
    const getDatos = async (id) => {
      const data = {
        idTrabajador: id,
      }
      const trabajador = await Post('/trabajadores/getTrabajador', data)
      const datosDelTrabajador = trabajador.data.data
      setDatosTrabajador(datosDelTrabajador);
      setDatos({
        idTrabajador: datosDelTrabajador._id,
        nombre: (datosDelTrabajador.datosPersonales.nombre ? datosDelTrabajador.datosPersonales.nombre : ''),
        apellidoPaterno: (datosDelTrabajador.datosPersonales.apellidoPaterno ? datosDelTrabajador.datosPersonales.apellidoPaterno : ''),
        apellidoMaterno: (datosDelTrabajador.datosPersonales.apellidoMaterno ? datosDelTrabajador.datosPersonales.apellidoMaterno : ''),
        nss: (datosDelTrabajador.datosPersonales.nss ? datosDelTrabajador.datosPersonales.nss : ''),
        curp: (datosDelTrabajador.datosPersonales.curp ? datosDelTrabajador.datosPersonales.curp : ''),
        rfc: (datosDelTrabajador.datosPersonales.rfc ? datosDelTrabajador.datosPersonales.rfc : ''),
        calle: (datosDelTrabajador.datosPersonales.direccion ? datosDelTrabajador.datosPersonales.direccion.calle : ''),
        numeroExterior: (datosDelTrabajador.datosPersonales.direccion ? datosDelTrabajador.datosPersonales.direccion.numeroExterior : ''),
        numeroInterior: (datosDelTrabajador.datosPersonales.direccion ? datosDelTrabajador.datosPersonales.direccion.numeroInterior : ''),
        codigoPostal: (datosDelTrabajador.datosPersonales.direccion ? datosDelTrabajador.datosPersonales.direccion.codigoPostal : ''),
        municipio: (datosDelTrabajador.datosPersonales.direccion ? datosDelTrabajador.datosPersonales.direccion.municipio : ''),
        estado: (datosDelTrabajador.datosPersonales.direccion ? datosDelTrabajador.datosPersonales.direccion.estado : ''),
        banco: (datosDelTrabajador.datosBancarios ? datosDelTrabajador.datosBancarios.banco : ''),
        cuenta: (datosDelTrabajador.datosBancarios ? datosDelTrabajador.datosBancarios.cuenta : ''),
        clabe: (datosDelTrabajador.datosBancarios ? datosDelTrabajador.datosBancarios.clabe : ''),
        Puesto: (datosDelTrabajador.datosLaborales.puesto ? datosDelTrabajador.datosLaborales.puesto : ''),
        sueldo: datosDelTrabajador.datosLaborales.sueldo,
        ingreso: moment(datosDelTrabajador.datosLaborales.ingreso).format('YYYY-MM-DD'),
        idTrabajador: datosDelTrabajador._id 
      });
      setArchivos(datosDelTrabajador.documentos.length>0?
        datosDelTrabajador.documentos.map(documento => (
        {
          "Titulo": documento.titulo,
          "Fecha": documento.createdAt.slice(0,10),
          "Ver": documento.URI
        }))
        :
        [{
          "Titulo": '',
          "Fecha": '',
          "Ver": ''
        }]
      );
    //const documentos = datosDelTrabajador.documentos.map(async(documento) => await Get('/trabajadores/downloadFile/'+documento.URI ));
    //const bufferData =  Buffer.from(documento.data, 'base64');
    //const blob = new Blob([bufferData], {type: 'application/octet-stream'});                   // Step 3
    //const fileDownloadUrl = URL.createObjectURL(blob);
   // setURL2(documentos);      // Step 7
    //console.log(documentos)

      //const download = await axios.get(documento.data);
      //console.log(download)
    }

    getDatos(id)
  }, [id])

  return (
    <div>
      <h1>Nuevo Empleado</h1>
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '5px',
        }}
      >
        <div style={{ width: '25%', height: '400px', float: 'left' }}>
          <div
            style={{
              width: '200px',
              height: '200px',
              backgroundColor: 'gray',
              position: 'absolute',
              margin: '45px 0 0 20px',
              borderRadius: '50%',
            }}
          >
            <div style={{ textAlign: 'center', marginTop: '40%' }}>
              <h3>Añadir Foto</h3>
            </div>
            <Button
              variant="primary"
              onClick={handleShow}
              style={{ marginTop: '50%', marginLeft: '10%' }}
            >
              Expediente Digital
            </Button>
          </div>
        </div>
        <div style={{ width: '30px', height: '400px', float: 'left' }}></div>
        <div>
          <form className="grid-layout" onSubmit={onSubmitHandler}>
            {inputsEmpleado.map((input) => (
              <InputForm
                key={input.etiqueta}
                etiqueta={input.etiqueta}
                placeholder={getProp(datosTrabajador, mapa[input.name])}
                tipo={input.tipo}
                name={input.name}
                onChangeHandler={(e) => onChangeHandler(e)}
                value={datos[input.name]}
              />
            ))}
            <button
              className="submitButtonEmpleado"
              type="submit"
              style={{ width: '100%' }}
            >
              {' '}
              Guardar{' '}
            </button>
          </form>
        </div>
      </div>

      <>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossOrigin="anonymous"
        />
        {/* EXPEDIENTE DIGITAL */}
        <Modal title="Expediente Digital" open={show} setOpen={setShow}>
          {archivos ? (
            <TableDisplay
              titles={titleArchivos}
              rawData={archivos}
              filtro={false}
              paginacion={false}
              link={`${URL}/trabajadores/downloadFile/`}
              target="_blank"
            />
          ) : null}
          <button onClick={handleShow2} className="btn-primary">
            Subir Archivos
          </button>
        </Modal>

        {/* SUBIR ARCHIVOS */}
        <Modal title="Subir Archivos" open={show2} setOpen={setShow2}>
          <form onSubmit={onSubmitHandlerDocumento}>
            <label>Nombre del documento:</label>
            <input
              type="text"
              name="title"
              style={{ width: '100%', marginTop: '10px' }}
              onChange={(e) => onChangeHandlerDocumento(e)}
              required
            />

            <input
              type="file"
              name="file"
              style={{ width: '100%', marginTop: '20px' }}
              onChange={(e) => changeFile(e.target.files)}
              required
            />

            <Button
              variant="primary"
              type="submit"
              style={{ width: '100%', marginTop: '20px' }}
            >
              Subir Documento
            </Button>
          </form>
        </Modal>
      </>
    </div>
  )
}

export default DetalleEmpleado
