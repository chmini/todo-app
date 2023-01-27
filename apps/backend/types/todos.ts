export interface Todo {
  content: string;
  createdAt: string;
  done: boolean;
  id: string;
  title: string;
  updatedAt: string;
}

export type TodoInput = Pick<Todo, "title" | "content">;
