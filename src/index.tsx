import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from './App';
import SocketContextComponent from './context/SocketContextComponent';
import { setupStore } from './store/store';

const store = setupStore();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SocketContextComponent>
      <Provider store={store}>
        <App />
      </Provider>
    </SocketContextComponent>
  </React.StrictMode>
);
