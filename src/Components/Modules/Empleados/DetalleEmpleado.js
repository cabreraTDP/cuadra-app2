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
import { mapaDetalleEmpleado as mapa } from '../../../Constants/mapaDetalleEmpleado'
import axios from 'axios';
import moment from 'moment';


const URL2 = `${process.env.REACT_APP_URL_URI}`;

const titleArchivos = ['Titulo', 'Fecha', 'Ver', 'Eliminar']

//Tratar de abstraer una estructura del json para el llenado del formulario

const DetalleEmpleado = () => {
  const [show, setShow] = useState(false)

  const handleShow = () => setShow(true)

  const [show2, setShow2] = useState(false)

  const [showModalFoto, setShowModalFoto] = useState(false)

  const [showModalMovimiento, setShowModalMovimiento] = useState(false);

  const handleShow2 = () => setShow2(true)

  const [loadingContrato, setLoadingContrato] = useState(false)

  const [datosDocumento, setDatosDocumento] = useState({})
  const [archivo, setArchivo] = useState()
  const [foto, setFoto] = useState();

  const [fechaMovimiento, setFechaMovimiento] = useState({});

  const [fotoTrabajador, setFotoTrabajador] = useState(false);

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
    idTrabajador: '',
    ID: '',
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    nss: '',
    curp: '',
    rfc: '',
    estadoCivil: '',
    sexo: '',
    calle: '',
    numeroExterior: '',
    numeroInterior: '',
    colonia: '',
    codigoPostal: '',
    municipio: '',
    estado: '',
    banco: '',
    cuenta: '',
    clabe: '',
    puesto: '',
    sueldo: '',
    ingreso: '',
    nacimiento: ''
  })

  const [datosTrabajador, setDatosTrabajador] = useState({})

  const navigate = useNavigate();

  const bajaTrabajador = async (id) => {
    await Post('/trabajadores/deleteTrabajador', { idTrabajador: id, fechaMovimiento })
    navigate('/app/empleados')
  }

  const altaTrabajador = async (id) => {
    await Post('/trabajadores/altaTrabajador', { idTrabajador: id, fechaMovimiento })
    navigate('/app/empleados')
  }

  const generarContrato = async () => {
    const data = {
      patron: '',
      representante_legal: '',
      rfc_representante: '',
      direccion_representante: '',
      principal_actividad: 'principal actividad',
      nombre_empleado: `${datosTrabajador.datosPersonales.nombre} ${datosTrabajador.datosPersonales.apellidoPaterno} ${datosTrabajador.datosPersonales.apellidoMaterno}`,
      sexo: datosTrabajador.datosPersonales.sexo,
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

  const eliminarDocumento = async (value) => {
    const params = {
      uri: value,
      idTrabajador: datos.idTrabajador
    }
    await Post('/trabajadores/deleteFile/', params)

    setArchivos([...archivos.filter((archivo) => archivo.Ver !== value)])

  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    await Post('/trabajadores/edit', datos)
    navigate('/app/empleados')
  }

  const onChangeHandler = async (e) => {
    const { name, value } = e.target
    console.log('ingreso editado', value)
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
    f.append('idTrabajador', id)
    const documento = await axios.post(`${URL2}/trabajadores/uploadFile`, f)
    console.log(documento)
    ////
    setArchivos([
      ...archivos,
      {
        "Titulo": documento.data.documento.titulo,
        "Fecha": moment(Date.now()).format("YYYY-MM-DD"),
        "Ver": documento.data.documento.URI
      }
    ]);
    setShow2(false)
  }

  const onSubmitFoto = async (e) => {
    e.preventDefault()

    const f = new FormData()
    f.append('file', foto[0])
    f.append('idTrabajador', datosTrabajador._id)
    await axios.post(`${URL2}/trabajadores/subirFotoPerfil`, f)


    setShowModalFoto(false)
  }

  const onChangeMovimiento = async (e) => {
    const { name, value } = e.target
    setFechaMovimiento({
      [name]: value,
    })
  }

  useEffect(() => {
    const getDatos = async (id) => {
      const data = {
        idTrabajador: id,
      }
      const trabajador = await Post('/trabajadores/getTrabajador', data)
      const datosDelTrabajador = trabajador.data.data
      console.log(datosDelTrabajador)
      setDatosTrabajador(datosDelTrabajador);
      if (datosDelTrabajador.foto) setFotoTrabajador(`${URL2}/trabajadores/downloadFile/${datosDelTrabajador.foto}`);
      setDatos({
        idTrabajador: datosDelTrabajador._id,
        ID: (datosDelTrabajador.datosLaborales.ID ? datosDelTrabajador.datosLaborales.ID : ''),
        nombre: (datosDelTrabajador.datosPersonales.nombre ? datosDelTrabajador.datosPersonales.nombre : ''),
        apellidoPaterno: (datosDelTrabajador.datosPersonales.apellidoPaterno ? datosDelTrabajador.datosPersonales.apellidoPaterno : ''),
        apellidoMaterno: (datosDelTrabajador.datosPersonales.apellidoMaterno ? datosDelTrabajador.datosPersonales.apellidoMaterno : ''),
        nss: (datosDelTrabajador.datosPersonales.nss ? datosDelTrabajador.datosPersonales.nss : ''),
        curp: (datosDelTrabajador.datosPersonales.curp ? datosDelTrabajador.datosPersonales.curp : ''),
        rfc: (datosDelTrabajador.datosPersonales.rfc ? datosDelTrabajador.datosPersonales.rfc : ''),
        estadoCivil: (datosDelTrabajador.datosPersonales.estadoCivil ? datosDelTrabajador.datosPersonales.estadoCivil : ''),
        sexo: (datosDelTrabajador.datosPersonales.sexo ? datosDelTrabajador.datosPersonales.sexo : ''),
        calle: (datosDelTrabajador.datosPersonales.direccion ? datosDelTrabajador.datosPersonales.direccion.calle : ''),
        numeroExterior: (datosDelTrabajador.datosPersonales.direccion ? datosDelTrabajador.datosPersonales.direccion.numeroExterior : ''),
        numeroInterior: (datosDelTrabajador.datosPersonales.direccion ? datosDelTrabajador.datosPersonales.direccion.numeroInterior : ''),
        colonia: (datosDelTrabajador.datosPersonales.direccion ? datosDelTrabajador.datosPersonales.direccion.colonia : ''),
        codigoPostal: (datosDelTrabajador.datosPersonales.direccion ? datosDelTrabajador.datosPersonales.direccion.codigoPostal : ''),
        municipio: (datosDelTrabajador.datosPersonales.direccion ? datosDelTrabajador.datosPersonales.direccion.municipio : ''),
        estado: (datosDelTrabajador.datosPersonales.direccion ? datosDelTrabajador.datosPersonales.direccion.estado : ''),
        banco: (datosDelTrabajador.datosBancarios ? datosDelTrabajador.datosBancarios.banco : ''),
        cuenta: (datosDelTrabajador.datosBancarios ? datosDelTrabajador.datosBancarios.cuenta : ''),
        clabe: (datosDelTrabajador.datosBancarios ? datosDelTrabajador.datosBancarios.clabe : ''),
        puesto: (datosDelTrabajador.datosLaborales.puesto ? datosDelTrabajador.datosLaborales.puesto : ''),
        sueldo: datosDelTrabajador.datosLaborales.sueldo,
        ingreso: moment.utc(datosDelTrabajador.datosLaborales.ingreso).format('YYYY-MM-DD'),
        nacimiento: "10/05/2003"
      });
      setArchivos(datosDelTrabajador.documentos.length > 0 ?
        datosDelTrabajador.documentos.map(documento => (
          {
            "Titulo": documento.titulo,
            "Fecha": documento.createdAt.slice(0, 10),
            "Ver": documento.URI,
            "Eliminar": documento.URI
          }))
        :
        [{
          "Titulo": '',
          "Fecha": '',
          "Ver": '',
          "Eliminar": ''
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
            onClick={() => setShowModalFoto(true)}
            style={{
              width: '200px',
              height: '200px',
              backgroundColor: 'gray',
              position: 'absolute',
              margin: '45px 0 0 20px',
              borderRadius: '50%',
            }}
          >

            {fotoTrabajador ?
              <img src={fotoTrabajador} alt="No disponible"
                style={{
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                }} /> :
              <h3 style={{ textAlign: 'center', marginTop: '40%', marginBottom: '50%' }}>Añadir Foto</h3>
            }
          </div>
          <div
            style={{
              margin: '265px 0 0 20px',
            }}>
            <Buttom
              onClick={handleShow}
              style={{ marginTop: '5px', marginLeft: '10%', width: '150px', fontSize: '14px' }}
              title='Expediente Digital'
            />
            {loadingContrato ?
              <p
                style={{ marginTop: '10%', marginLeft: '10%' }}
              >
                Generando Contrato ...
              </p> :
              <Buttom
                onClick={() => generarContrato()}
                style={{ marginTop: '10%', marginLeft: '10%', width: '150px', fontSize: '14px' }}
                title="Generar contrato"
              />
            }
          </div>
        </div>
        <div style={{ width: '30px', height: '400px', float: 'left' }}></div>
        <div >
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
            <div style={{ padding: '2px', marginTop: '2px' }}></div>
            <div style={{ padding: '2px', marginTop: '2px' }}></div>
            <div style={{ padding: '2px', marginTop: '2px' }}></div>
            <div style={{ padding: '2px', marginTop: '2px' }}>
              <button
                className="submitButtonEmpleado"
                type="submit"
                style={{ width: '90%', marginLeft: '0' }}
              >
                Guardar
              </button>
            </div>
            <div style={{ padding: '2px', marginTop: '2px' }}>
              {datosTrabajador.activo ?
                <button type="button" onClick={() => setShowModalMovimiento(true)} className="submitButtonEmpleado" style={{ width: '90%', marginLeft: '0' }}>
                  Dar de baja
                </button> :
                <button type="button" onClick={() => setShowModalMovimiento(true)} className="submitButtonEmpleado" style={{ width: '90%', marginLeft: '0' }}>
                  Dar de alta
                </button>
              }
            </div>
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
              buttonFunction={(value) => eliminarDocumento(value)}
            />
          ) : null}
          <Buttom onClick={handleShow2} className="btn-primary" title="Subir Archivos" style={{ marginTop: '25px', width: '100%' }} />

        </Modal>

        {/* SUBIR ARCHIVOS */}
        <Modal title="Subir Archivos" open={show2} setOpen={setShow2}>
          <form onSubmit={(e) => onSubmitHandlerDocumento(e)}>
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

        {/* ALTAS / BAJAS */}
        <Modal title="Mobimiento" open={showModalMovimiento} setOpen={setShowModalMovimiento}>

          <label>Fecha Operación:</label>
          <input
            type="date"
            name="fechaMovimiento"
            style={styles.input}
            onChange={(e) => onChangeMovimiento(e)}
            required
          />

          {datosTrabajador.activo ?
            <Buttom style={{ width: '100%', marginLeft: '0' }}
              type="button"
              title="Dar de baja"
              onClick={() => bajaTrabajador(datosTrabajador._id)}
              className="submitButtonEmpleado" />
            :
            <Buttom
              type="button"
              title="Dar de alta"
              onClick={() => altaTrabajador(datosTrabajador._id)}
              className="submitButtonEmpleado"
              style={{ width: '100%', marginLeft: '0' }} />
          }
        </Modal>
      </>
    </div>
  )
}

export default DetalleEmpleado

const styles = {
  input: {
    width: '100%',
    marginBottom: 15,
    border: '1px black solid',
    height: 35,
    padding: 2,
  },
}