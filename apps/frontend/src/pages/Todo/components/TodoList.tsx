import { List, ListItem, ListItemButton, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import api from "@/api";

import { useTodoActions } from "../store";

export default function TodoList() {
  const { updateCurrentTodoId } = useTodoActions();

  const { data: todos } = useQuery(["todos"], { queryFn: () => api.getTodos() });

  const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
    const { id } = event.currentTarget.dataset;
    if (id) updateCurrentTodoId(id);
  };

  const handleContextMenu = (event: React.MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    console.log("Mouse Right Button");
  };

  return (
    <List>
      {todos?.map((todo) => (
        <ListItem
          key={todo.id}
          disablePadding
          data-id={todo.id}
          onClick={handleClick}
          onContextMenu={handleContextMenu}
        >
          <ListItemButton>
            <Stack>
              <Typography>{todo.title}</Typography>
              <Typography variant="body2">{new Date(todo.createdAt).toString()}</Typography>
              <Typography variant="body2">{new Date().toString()}</Typography>
            </Stack>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
