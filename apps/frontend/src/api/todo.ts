import axiosInstance from "./axiosInstance";

export interface TodoFormData {
  title: string;
  content: string;
}

interface TodoResponse<T> {
  data: T;
}

export interface Todo {
  title: string;
  content: string;
  done: boolean;
  id: string;
  createdAt: string;
  updatedAt: string;
}

const createTodo = (formData: TodoFormData) =>
  axiosInstance.post<TodoResponse<Todo>>("/todos", formData).then(({ data: { data } }) => data);

const getTodos = () => axiosInstance.get<TodoResponse<Todo[]>>("/todos").then(({ data: { data } }) => data);

const getTodo = (id: string) =>
  axiosInstance.get<TodoResponse<Todo>>(`/todos/${id}`).then(({ data: { data } }) => data);

const updateTodo = (id: string, formData: TodoFormData) =>
  axiosInstance.put<TodoResponse<Todo>>(`/todos/${id}`, formData).then(({ data: { data } }) => data);

const deleteTodo = (id: string) => axiosInstance.delete<TodoResponse<null>>(`/todos/${id}`);

export default {
  createTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo,
};
