export interface IUser {
  id: string;
  name: string;
  email: string;
  roles: string[];
}

export interface IMeResponse {
  data: IUser;
  message: "success";
}
