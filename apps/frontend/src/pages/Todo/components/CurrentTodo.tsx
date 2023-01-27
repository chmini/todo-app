import { Paper, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import api from "@/api";

import { useCurrentTodoId } from "../store";

export default function CurrentTodo() {
  const currentTodoId = useCurrentTodoId();

  const { data: currentTodo } = useQuery(["currentTodo", currentTodoId], {
    queryFn: () => api.getTodoById(currentTodoId),
  });

  return (
    <Paper sx={{ m: 2, p: 2 }}>
      <Stack spacing={1}>
        <div>title: {currentTodo?.title}</div>
        <div>content: {currentTodo?.content}</div>
      </Stack>
    </Paper>
  );
}
