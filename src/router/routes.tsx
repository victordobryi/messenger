import { Navigate } from 'react-router-dom';
import MessageForm from '../pages/MessageForm';
import Login from '../pages/Login';
import Main from '../pages/Main';
import Error from '../pages/NotFound';
import UserMessages from '../pages/UserMessages';
import Messages from '../pages/Messages';

interface IRoutes {
  path: string;
  component: React.ReactNode;
}

export enum RoutesName {
  LOGIN = '/login',
  MESSAGE_FORM = '/messageForm',
  MAIN = '/main',
  USERS_MESSAGES = 'messages/:id',
  MESSAGES = '/messages'
}

export const publicRoutes: IRoutes[] = [
  {
    path: RoutesName.LOGIN,
    component: <Login />
  },
  {
    path: RoutesName.MESSAGE_FORM,
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
    component: <Navigate to={RoutesName.MESSAGE_FORM} />
  },
  {
    path: RoutesName.MESSAGE_FORM,
    component: <MessageForm />
  },
  {
    path: RoutesName.MAIN,
    component: <Main />
  },
  {
    path: RoutesName.USERS_MESSAGES,
    component: <UserMessages />
  },
  {
    path: RoutesName.MESSAGES,
    component: <Messages />
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
