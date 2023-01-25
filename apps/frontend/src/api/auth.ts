import axiosInstance from "./axiosInstance";

export interface LoginFormData {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  token: string;
}

const login = (formData: LoginFormData) =>
  axiosInstance.post<LoginResponse>("/users/login", formData).then(({ data }) => data);

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
