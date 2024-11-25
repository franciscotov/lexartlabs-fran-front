import routes from "@/routes/routes";
import { UserRole } from "@/lib/definitions";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const api = axios.create();
// Request interceptor
api.interceptors.request.use(
  async (config) => {
    // validateSession();
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (
      error.response &&
      (error.response.data.key === "INVALID_TOKEN" ||
        error.response.data.key === "JWT_EXPIRED")
    ) {
      // clearLocalStorage();
      if (window.location.href !== "/signup") {
        // window.location.href = "/login";
      }
    }
    return { error, data: "error" };
  }
);

/**
 * isAdmin, check if the user is an admin
 */

export const isAdmin = (token: string) => {
  let decoded: any = jwtDecode(token);
  return decoded === UserRole.ADMIN;
};

/**
 * isAdmin, check if the user is an admin
 */

export const isValidToken = (token: string) => {
  try {
    let decoded: any = jwtDecode(token);
    let now = new Date().getTime() / 1000;
    const path = window.location.pathname;
    if (now > decoded.exp) {
      localStorage.clear();
      if (path !== routes.signup) window.location.href = routes.login;
      return;
    }
  } catch {
    const path = window.location.pathname;
    if (path !== routes.signup) window.location.href = routes.login;
    return;
  }
};
