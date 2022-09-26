import { authSlice } from '.';
import UserService from '../../../API/UserService';
import { IUser } from '../../../models/IUser';
import { AppDispatch } from '../../store';
import { Socket } from 'socket.io-client';

export const getUsers = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(authSlice.actions.setLoading(true));
    const users = (await UserService.getUsers()).data;
    if (users) {
      dispatch(authSlice.actions.setUsers(users));
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  } finally {
    dispatch(authSlice.actions.setLoading(false));
  }
};

export const userLogin =
  (username: string, socket: Socket) => async (dispatch: AppDispatch) => {
    try {
      dispatch(authSlice.actions.setLoading(true));
      const response = await UserService.getUsers();
      const isLoginUser = response.data.find(
        (user) => user.username === username
      );
      if (isLoginUser) {
        dispatch(authSlice.actions.setUser(isLoginUser));
        dispatch(authSlice.actions.setUsers(response.data));
        dispatch(authSlice.actions.setAuth(true));
        socket.emit('add_NewUser', JSON.stringify(isLoginUser));
      } else if (!isLoginUser) {
        (await UserService.addUser({ username, socketId: socket.id })).data;
        const response = await UserService.getUsers();
        const isLoginUser = response.data.find(
          (user) => user.username === username
        );
        if (isLoginUser) dispatch(authSlice.actions.setUser(isLoginUser));
        dispatch(authSlice.actions.setUsers(response.data));
        dispatch(authSlice.actions.setAuth(true));
        socket.emit('add_NewUser', JSON.stringify(isLoginUser));
      } else {
        dispatch(authSlice.actions.setError('Юзер уже авторизирован!'));
      }
      dispatch(authSlice.actions.setLoading(false));
    } catch (e) {
      if (e instanceof Error) {
        dispatch(authSlice.actions.setError(e.message));
      }
    }
  };

export const userLogout = (id: number) => async (dispatch: AppDispatch) => {
  const user = (await UserService.getUser(id)).data;
  (await UserService.updateUser({ ...user, online: false }, id)).data;
  dispatch(authSlice.actions.setUser({} as IUser));
  dispatch(authSlice.actions.setAuth(false));
  dispatch(authSlice.actions.setError(''));
};
