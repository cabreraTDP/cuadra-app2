import { useState } from 'react'
import store from '../../state/store'
import * as actions from '../../state/actions/auth_actions'
import { Modal } from '../Modal'
import { Post } from '../../utils/axiosUtils'

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [loadingContrato, setLoadingContrato] = useState(false)

  const generarContrato = async () => {
    setLoadingContrato(true)
    const link = document.createElement('a')
    link.download = 'contrato.pdf'
    link.target = '_blank'
    const answer = await Post('/trabajadores/crearContrato', {
      mensaje: 'POR FIIN',
    })
    const buffer = answer.data.data.data
    const decodedBuffer = new Uint8Array(buffer)
    const blob = new Blob([decodedBuffer], { type: 'application/pdf' })
    link.href = URL.createObjectURL(blob)
    link.click()
    URL.revokeObjectURL(link.href)
    setLoadingContrato(false)
  }

  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => store.dispatch(actions.login())}>AUTH</button>
      <button onClick={() => store.dispatch(actions.prueba())}>PROBAR</button>
      <button onClick={() => setModalOpen(true)}>OpenModal</button>

      {loadingContrato ? (
        <h3>Cargando contrato...</h3>
      ) : (
        <button onClick={() => generarContrato()}>Generar Contrato</button>
      )}

      <Modal open={modalOpen} setOpen={setModalOpen}>
        <h2>Eleazar</h2>
        <label for="">Name</label>
        <input placeholder="Name" type="text" />
      </Modal>
    </div>
  )
}

export default Home
