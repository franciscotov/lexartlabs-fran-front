import { ErrorList, SignUpDataDto, UserBase, UserDto } from "@/lib/definitions";
import { api } from "./interceptors";
import { buildAuthHeader } from "@/app/hooks/basicParams";

const API_AIR_URL = process.env.NEXT_PUBLIC_API_APP;

export const signupUser: ErrorList | any = async (
  username: string,
  password: string
) => {
  const body: SignUpDataDto = { username, password, role: "ADMIN" };
  let options = buildAuthHeader();
  try {
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

export const loginUser: UserBase | any = async (
  username: string,
  password: string
) => {
  const body: UserDto = { username, password, role: "ADMIN" };
  let options = buildAuthHeader();
  console.log(options, "33333333333");
  try {
    let response = await api.post<UserBase | any>(
      `${API_AIR_URL}auth/signin`,
      body,
      options
    );
    return response;
  } catch (e) {
    console.error(e, "errorsssss");
    return undefined;
  }
};

