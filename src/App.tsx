import React from 'react';
import Header from './components/Header/Header';
import AppRouter from './router/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import './styles/main.scss';
import { useAppSelector } from './redux-hooks';

export const App = () => {
  const { isAuth } = useAppSelector((state) => state.auth);

  return (
    <>
      <BrowserRouter>
        <Header />
        <main>
          <div className="_container">
            <AppRouter isAuth={isAuth} />
          </div>
        </main>
        <footer>Directed by Viktar Kasilkin</footer>
      </BrowserRouter>
    </>
  );
};

export default App;
