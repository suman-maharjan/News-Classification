export interface ILoginUser {
  email: string;
  password: string;
}

export interface IRegisterUser {
  name: string;
  email: string;
  password: string;
}

export interface IVerifyUser {
  email: string;
  token: string;
}

export interface IforgotPasswordUser {
  email: string;
  token: string;
  password: string;
}
