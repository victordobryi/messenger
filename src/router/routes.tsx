import { Navigate } from 'react-router-dom';
import MessageForm from '../pages/MessageForm';
import Login from '../pages/Login';
import Main from '../pages/Main';
import Error from '../pages/NotFound';

interface IRoutes {
  path: string;
  component: React.ReactNode;
}

export enum RoutesName {
  LOGIN = '/login',
  MESSAGE_FROM = '/messageForm',
  MAIN = '/main'
}

export const publicRoutes: IRoutes[] = [
  {
    path: RoutesName.LOGIN,
    component: <Login />
  },
  {
    path: RoutesName.MESSAGE_FROM,
    component: <Navigate to="/login" />
  },
  {
    path: RoutesName.MAIN,
    component: <Main />
  },
  {
    path: '/',
    component: <Navigate to="/main" />
  },
  {
    path: '*',
    component: <Error />
  }
];

export const privateRoutes: IRoutes[] = [
  {
    path: RoutesName.LOGIN,
    component: <Navigate to={RoutesName.MESSAGE_FROM} />
  },
  {
    path: RoutesName.MESSAGE_FROM,
    component: <MessageForm />
  },
  {
    path: RoutesName.MAIN,
    component: <Main />
  },
  {
    path: '/',
    component: <Navigate to="/main" />
  },
  {
    path: '*',
    component: <Error />
  }
];
