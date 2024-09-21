export interface UserBase {
  id: number;
  name: string;
  username: string;
  lastname: string;
  token: string;
  email: string;
  google: boolean;
}


export interface PaginateDTO<T> {
  count: number;
  rows: T[];
}


export enum Day {
  Lunes = "1",
  Martes = "2",
  Miercoles = "3",
  Jueves = "4",
  Viernes = "5",
  Sabado = "6",
  Domingo = "7",
}


export enum ApiType {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export interface UserDto {
  username: string;
  password: string;
  role: string;
}

export interface SignUpDataDto {
  username: string;
  password: string;
  role: string;
}

interface LenghtValidations {
  min: number;
  max: number;
}
export interface Validations {
  length: LenghtValidations;
}

export interface ErrorList {
  errors: string[];
}
