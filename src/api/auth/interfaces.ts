export interface TUser {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface TLogin {
  name: string;
  email: string;
  password: string;
  id?: number;
}
export interface TEmail {
  email: string;
}
export interface TPassword {
  password: string;
  newpassword: string;
}

export interface IResetPassword {
  email: string;
  password: string;
  confirmPassword: string;
  id?: number;
  name?: string;
}
