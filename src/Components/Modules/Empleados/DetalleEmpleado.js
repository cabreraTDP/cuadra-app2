import '../../../CSS/gridLayout.css'
import inputsEmpleado from '../../../Constants/inputsEmpleado'
import InputForm from './InputForm'
import TableDisplay from '../../TableDisplay'
import { useState, useEffect } from 'react'
import { Post } from '../../../utils/axiosUtils'
import { useNavigate, useParams } from 'react-router-dom'
import { Modal } from '../../Modal'
import { Buttom } from '../../Buttom'
import { getProp } from '../../../utils/functions'
import { mapaDetalleEmpleado as mapa} from '../../../Constants/mapaDetalleEmpleado'
import axios from 'axios';
import moment from 'moment';


const URL2 = `${process.env.REACT_APP_URL_URI}`;

const titleArchivos = ['Titulo', 'Fecha', 'Ver']

//Tratar de abstraer una estructura del json para el llenado del formulario

const DetalleEmpleado = () => {
  const [show, setShow] = useState(false)

  const handleShow = () => setShow(true)

  const [show2, setShow2] = useState(false)

  const [showModalFoto , setShowModalFoto] = useState(false)

  const handleShow2 = () => setShow2(true)

  const [loadingContrato, setLoadingContrato] = useState(false)

  const [datosDocumento, setDatosDocumento] = useState({})
  const [archivo, setArchivo] = useState()
  const [foto, setFoto] = useState();

  const changeFile = (e) => {
    setArchivo(e)
  }

  const changeFoto = (e) => {
    setFoto(e)
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

  const navigate = useNavigate();

  const bajaTrabajador = async(id) => {
    await Post('/trabajadores/deleteTrabajador',{idTrabajador:id})
    navigate('/app/empleados')
  }

  const generarContrato = async() => {
    const data = {
      patron: '',
      representante_legal: '',
      rfc_representante: '',
      direccion_representante: '',
      principal_actividad: 'principal actividad',
      nombre_empleado: `${datosTrabajador.datosPersonales.nombre} ${datosTrabajador.datosPersonales.apellidoPaterno} ${datosTrabajador.datosPersonales.apellidoMaterno}`,
      sexo: '',
      fecha_nacimiento: '',
      nss: datosTrabajador.datosPersonales.nss,
      rfc: datosTrabajador.datosPersonales.rfc,
      curp: datosTrabajador.datosPersonales.curp,
      direccion_empleado: `${datosTrabajador.datosPersonales.direccion.calle} ${datosTrabajador.datosPersonales.direccion.numeroExterior} ${datosTrabajador.datosPersonales.direccion.codigoPostal} ${datosTrabajador.datosPersonales.direccion.municipio} ${datosTrabajador.datosPersonales.direccion.estado}`,
      salario_texto: datosTrabajador.datosLaborales.sueldo,
      esquema_pago: 'Semanal',
      fecha_contrato: 'fecha'
    }

    setLoadingContrato(true)
    const link = document.createElement('a')
    link.download = 'contrato.pdf'
    link.target = '_blank'
    const answer = await Post('/trabajadores/crearContrato', data)
    const buffer = answer.data.data.data
    const decodedBuffer = new Uint8Array(buffer)
    const blob = new Blob([decodedBuffer], { type: 'application/pdf' })
    link.href = URL.createObjectURL(blob)
    link.click()
    URL.revokeObjectURL(link.href)
    setLoadingContrato(false)
      
  }

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
    const res = await axios.post(`${URL2}/trabajadores/uploadFile`, f)
    setShow2(false)
  }

  const onSubmitFoto = async (e) => {
    e.preventDefault()

    const f = new FormData()
    f.append('file', foto[0])
    await axios.post(`${URL2}/trabajadores/subirFotoPerfil`, f)
    setShowModalFoto(false)
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
        ingreso: moment(datosDelTrabajador.datosLaborales.ingreso).format('YYYY-MM-DD')
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
            <div onClick={()=>setShowModalFoto(true)} style={{ textAlign: 'center', marginTop: '40%' }}>
              <h3>Añadir Foto</h3>
            </div>
            <Buttom
              onClick={handleShow}
              style={{ marginTop: '50%', marginLeft: '10%', width: '150px', fontSize: '14px'}}
              title='Expediente Digital'
            />
            {loadingContrato ?
              <p
              style={{ marginTop: '10%', marginLeft: '10%' }}
            >
              Generando Contrato ...
            </p>:
            <Buttom
              onClick={()=> generarContrato()}
              style={{ marginTop: '10%', marginLeft: '10%', width: '150px', fontSize: '14px' }}
              title="Generar contrato"
            />
            }
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
              style={{ width: '100%', marginLeft:'90%' }}
            >
              {' '}
              Guardar{' '}
            </button>
            <button type="button" onClick={()=>bajaTrabajador(datosTrabajador._id)} className="submitButtonEmpleado" style={{width:'60%'}}>
              Dar de baja
            </button>
            
          </form>
          
        </div>
        
      </div>

      <>
        {/* EXPEDIENTE DIGITAL */}
        <Modal title="Expediente Digital" open={show} setOpen={setShow}>
          {archivos ? (
            <TableDisplay
              titles={titleArchivos}
              rawData={archivos}
              filtro={false}
              paginacion={false}
              link={`${URL2}/trabajadores/downloadFile/`}
              target="_blank"
            />
          ) : null}
          <Buttom onClick={handleShow2} className="btn-primary" title="Subir Archivos" style={{ marginTop: '25px', width: '100%'}}/>

        </Modal>

        {/* SUBIR ARCHIVOS */}
        <Modal title="Subir Archivos" open={show2} setOpen={setShow2}>
          <form onSubmit={onSubmitHandlerDocumento}>
            <label>Nombre del documento:</label>
            <input
              type="text"
              name="title"
              style={{ width: '100%', marginTop: '10px', padding: '7px' }}
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

            <Buttom
              variant="primary"
              type="submit"
              style={{ width: '100%', marginTop: '20px' }}
              title={'Subir Documento'}
            />
          </form>
        </Modal>

        {/* FOTO DE PERFIL */}
        <Modal title="Foto del Empleado" open={showModalFoto} setOpen={setShowModalFoto}>
        <form onSubmit={onSubmitFoto}>
            <input
              type="file"
              name="file"
              style={{ width: '100%', marginTop: '20px' }}
              onChange={(e) => changeFoto(e.target.files)}
              required
            />

            <Buttom
              variant="primary"
              type="submit"
              style={{ width: '100%', marginTop: '20px' }}
              title={'Subir Foto'}
            />

          </form>
        </Modal>
      </>
    </div>
  )
}

export default DetalleEmpleado
