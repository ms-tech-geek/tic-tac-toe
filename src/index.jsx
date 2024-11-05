import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { gameStore } from './store/gameStore';
import './global.scss';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={gameStore}>
    <App />
  </Provider>
);
