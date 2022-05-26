import store from '../../state/store';
import * as actions from '../../state/actions/auth_actions'

const Home = () => {

    return (
        <div >
            <h1>Home</h1>
            <button onClick={() => store.dispatch(actions.login())}>AUTH</button>
            <button onClick={() => store.dispatch(actions.prueba())}>PROBAR</button>
            

        </div>
    )
}

export default Home