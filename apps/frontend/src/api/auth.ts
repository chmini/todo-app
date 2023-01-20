import axiosInstance from "./axiosInstance";

export interface LoginFormData {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  token: string;
}

export interface LoginError {
  details: string;
}

const login = (formData: LoginFormData) =>
  axiosInstance.post<LoginResponse>("/users/login", formData).then(({ data }) => data);

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
export const isLoginError = (error: any): error is LoginError => error.details !== undefined;

export interface SignupFormData {
  email: string;
  password: string;
}

interface SignupResponse {
  message: string;
  token: string;
}

const signup = (formData: SignupFormData) =>
  axiosInstance.post<SignupResponse>("/users/create", formData).then(({ data }) => data);

export default { login, signup };
