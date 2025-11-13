import { ProductDto } from "@/lib/definitions";
import { api } from "./interceptors";
import { buildAuthHeader } from "../hooks/basicParams";

const API_AIR_URL = process.env.REACT_APP_PUBLIC_API_APP;

export const create: any = async (data: ProductDto) => {
  const body: ProductDto = { ...data };
  let options = buildAuthHeader();

  try {
    let response = await api.post<any>(
      `${API_AIR_URL}products/`,
      body,
      options
    );
    return response;
  } catch (e) {
    console.error(e, "errorsssss");
    return undefined;
  }
};

export const products: any = async () => {
  let options = buildAuthHeader();
  // improve the pagination later
  // improve the type used for the response
  try {
    let response = await api.get<ProductDto[]>(
      `${API_AIR_URL}products/products?page=0&size=10`,
      options
    );
    return response;
  } catch (e) {
    console.error(e, "errorsssss");
    return undefined;
  }
};
