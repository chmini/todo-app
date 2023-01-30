import { List } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import api from "@/api";

import TodoListItem from "./TodoListItem";

export default function TodoList() {
  const { data: todos } = useQuery(["todos"], { queryFn: () => api.getTodos() });

  return (
    <List>
      {todos?.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} />
      ))}
    </List>
  );
}
