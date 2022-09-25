export interface IUser {
  username: string;
  online?: boolean;
  id: number;
  socketId?: string;
}

export interface IUserNoId {
  username: string;
  online?: boolean;
  socketId?: string;
}
