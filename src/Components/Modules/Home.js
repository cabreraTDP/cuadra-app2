import { useState } from 'react'
import store from '../../state/store'
import * as actions from '../../state/actions/auth_actions'
import { Modal } from '../Modal'

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => store.dispatch(actions.login())}>AUTH</button>
      <button onClick={() => store.dispatch(actions.prueba())}>PROBAR</button>
      <button onClick={() => setModalOpen(true)}>OpenModal</button>
      <Modal open={modalOpen} setOpen={setModalOpen}>
        <h2>Eleazar</h2>
        <label for="">Name</label>
        <input placeholder="Name" type="text" />
      </Modal>
    </div>
  )
}

export default Home
