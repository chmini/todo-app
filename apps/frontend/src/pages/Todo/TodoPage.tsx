import React from "react";

import { Box, Container, Paper } from "@mui/material";

import { TodoForm, TodoList } from "./components";

export default function TodoPage() {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 2 }}>
        <React.Suspense>
          <TodoList />
        </React.Suspense>
      </Box>
      <Box sx={{ position: "sticky", bottom: 0, pb: 2, backgroundColor: "#fff" }}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <TodoForm />
        </Paper>
      </Box>
    </Container>
  );
}
