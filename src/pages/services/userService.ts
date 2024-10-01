import {
  ErrorList,
  SignUpDataDto,
  TokenData,
  UserDto,
} from "@/lib/definitions";
import { api } from "./interceptors";
import { buildHeader } from "../hooks/basicParams";

const API_AIR_URL = process.env.REACT_APP_PUBLIC_API_APP;

export const signupUser: ErrorList | any = async (
  username: string,
  password: string
) => {
  const body: SignUpDataDto = { username, password, role: "ADMIN" };
  let options = buildHeader();
  try {
    console.log({ API_AIR_URL }, "33333333333");
    let response = await api.post<ErrorList | any>(
      `${API_AIR_URL}auth/signup`,
      JSON.stringify(body),
      options
    );
    return response;
  } catch (e) {
    console.error(e, "errorsssss");
    return undefined;
  }
};

export const loginUser: TokenData | any = async (data: UserDto) => {
  const body: UserDto = { ...data };
  let options = buildHeader();
  try {
    let response = await api.post<TokenData | any>(
      `${API_AIR_URL}auth/signin`,
      body,
      options
    );
    console.log({ response });
    return response;
  } catch (e) {
    console.error(e, "errorsssss");
    return undefined;
  }
};
