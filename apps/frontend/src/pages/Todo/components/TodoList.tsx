import { List, ListItemButton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import api from "@/api";

import { useTodoActions } from "../store";

export default function TodoList() {
  const { updateCurrentTodoId } = useTodoActions();

  const { data: todos } = useQuery(["todos"], { queryFn: () => api.getTodos() });

  const handleClick = (event: React.MouseEvent<HTMLUListElement>) => {
    if (!(event.target instanceof HTMLDivElement)) return;

    const { id } = event.target.dataset;
    if (id) updateCurrentTodoId(id);
  };

  const handleContextMenu = (event: React.MouseEvent<HTMLUListElement>) => {
    event.preventDefault();
    console.log("Mouse Right Button");
  };

  return (
    <List onClick={handleClick} onContextMenu={handleContextMenu}>
      {todos?.map((todo) => (
        <ListItemButton key={todo.id} data-id={todo.id}>
          {todo.title}
        </ListItemButton>
      ))}
    </List>
  );
}
