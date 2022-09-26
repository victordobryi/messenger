import axios, { AxiosResponse } from 'axios';
import { IMessage, IMessageNoId } from '../models/IMessage';

const URL = 'https://messenger-viktar.herokuapp.com/messages/';

export default class MessageService {
  static async getMessages(): Promise<AxiosResponse<IMessage[]>> {
    return axios.get<IMessage[]>(URL);
  }
  static async addMessage(
    newMessage: IMessageNoId
  ): Promise<AxiosResponse<IMessage>> {
    return axios.post(URL, newMessage);
  }
  static async getMessagesFromUser(
    id: string
  ): Promise<AxiosResponse<IMessage[]>> {
    return axios.get<IMessage[]>(URL + id);
  }
}
