import { CurrentTodo, TodoForm, TodoList } from "./components";

export default function TodoPage() {
  return (
    <>
      <TodoForm />
      <TodoList />
      <CurrentTodo />
    </>
  );
}
