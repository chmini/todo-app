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

const signup = () => {};

export default { login, signup };
