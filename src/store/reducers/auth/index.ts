import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../../models/IUser';

interface Auth {
  isAuth: boolean;
  user: IUser;
  users: IUser[];
  isLoading: boolean;
  error: string;
}

const initialState: Auth = {
  isAuth: false,
  user: {} as IUser,
  users: [],
  isLoading: false,
  error: ''
};

export const authSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
      state.isLoading = false;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    setUsers(state, action: PayloadAction<IUser[]>) {
      state.users = action.payload;
    },
    deleteUsers(state, action: PayloadAction<number>) {
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload)
      };
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

export default authSlice.reducer;
