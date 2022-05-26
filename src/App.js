
import './App.css';
import Header from './Components/Structure/Header';
import MainBox from './Components/Structure/MainBox';
import SideMenu from './Components/Structure/SideMenu';

import store from './state/store';
import { Provider } from 'react-redux';


function App() {
  
  
    
  return (
    <Provider store={store}>
    <div className="App ">
      <div className="grid-container ">
        <div className="item-header"><Header /></div>
          <div className="item-menu "><SideMenu  /></div>
          <div className="item-main"><MainBox /></div>

      </div>
    </div>
    </Provider>
  );
}

export default App;
