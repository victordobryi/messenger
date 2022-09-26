export interface IMessage {
  title: string;
  message: string;
  fromUserId: number;
  toUserId: number;
  currentDate: string;
  fromUserName: string;
  id: number;
}

export interface IMessageNoId {
  title: string;
  message: string;
  fromUserId: number;
  toUserId: number;
  currentDate: string;
  fromUserName: string;
}
