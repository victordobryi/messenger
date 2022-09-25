import axios, { AxiosResponse } from 'axios';
import { IUser, IUserNoId } from '../models/IUser';

const URL = 'https://messenger-viktar.herokuapp.com/users/';

export default class UserService {
  static async getUsers(): Promise<AxiosResponse<IUser[]>> {
    return axios.get<IUser[]>(URL);
  }
  static async getUser(id: string): Promise<AxiosResponse<IUser>> {
    return axios.get<IUser>(URL + id);
  }
  static async updateUser(
    newUser: IUser,
    id: number
  ): Promise<AxiosResponse<IUser>> {
    return axios.put(URL + id, newUser);
  }
  static async deleteUser(id: number): Promise<AxiosResponse<IUser>> {
    return axios.delete(URL + id);
  }
  static async addUser(newUser: IUserNoId): Promise<AxiosResponse<IUser>> {
    return axios.post(URL, newUser);
  }
}
