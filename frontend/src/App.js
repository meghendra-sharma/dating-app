import logo from './logo.svg';
import './App.css';
import GetDeviceLocation from './components/GetDeviceLocation';
import Home from './components/Home';
import AppRouter from './AppRouter';
import store from './store';
import { Provider } from 'react-redux';

function App() {
  return (
    <div className="App">
     <Provider store = {store}>
     <AppRouter/>
     </Provider>
    </div>
  );
}

export default App;
