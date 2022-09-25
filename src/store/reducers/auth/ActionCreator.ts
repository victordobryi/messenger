import { authSlice } from '.';
import UserService from '../../../API/UserService';
import { IUser } from '../../../models/IUser';
import { AppDispatch } from '../../store';

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
  (username: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(authSlice.actions.setLoading(true));
      const response = await UserService.getUsers();
      const isLoginUser = response.data.find(
        (user) => user.username === username
      );
      if (isLoginUser && !isLoginUser.online) {
        dispatch(authSlice.actions.setUser(isLoginUser));
        dispatch(authSlice.actions.setUsers(response.data));
        dispatch(authSlice.actions.setAuth(true));
      } else if (!isLoginUser) {
        const newUser = (await UserService.addUser({ username })).data;
        dispatch(authSlice.actions.setUser(newUser));
        dispatch(authSlice.actions.setUsers(response.data));
        dispatch(authSlice.actions.setAuth(true));
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

export const userLogout = () => async (dispatch: AppDispatch) => {
  dispatch(authSlice.actions.setUser({} as IUser));
  dispatch(authSlice.actions.setAuth(false));
  dispatch(authSlice.actions.setError(''));
};
