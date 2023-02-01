import React from "react";

import { Close } from "@mui/icons-material";
import { Box, Button, DialogContent, DialogTitle, IconButton, Stack, TextField, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";

import api from "@/api";
import { isErrorWithMessage } from "@/api/utils";
import { useModalActions } from "@/store/modal";

import { useCurrentTodo } from "../store";

import type { TodoFormData } from "@/api/todo";
import type { SubmitHandler } from "react-hook-form";

export default function TodoDetail() {
  const id = useCurrentTodo();
  const { closeModal } = useModalActions();
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();

  const { data: todo } = useQuery({
    queryKey: ["todoDetail", id],
    queryFn: () => api.getTodo(id),
    enabled: !!id,
  });

  const { mutate } = useMutation({
    mutationFn: (formData: TodoFormData) => api.updateTodo(id, formData),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["todoDetail"] });
      await queryClient.invalidateQueries({ queryKey: ["todos"] });
      enqueueSnackbar("Updated Successfully", { variant: "success" });
    },
    onError: (error) => {
      if (isErrorWithMessage(error)) {
        enqueueSnackbar(error.message, { variant: "error" });
      }
    },
  });

  const { register, handleSubmit } = useForm<TodoFormData>();

  const [editMode, setEditMode] = React.useState(false);

  const handleEditMode = () => {
    setEditMode((prevMode) => !prevMode);
  };

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      await handleSubmit(onSubmit)();
    }
  };

  const onSubmit: SubmitHandler<TodoFormData> = (formData) => {
    mutate(formData);
    setEditMode(false);
  };

  return (
    <>
      <Stack
        direction="row"
        sx={{
          p: 1,
          borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
          justifyContent: "space-between",
          backgroundColor: "#fff",
        }}
      >
        {editMode ? <Box /> : <Button onClick={handleEditMode}>수정</Button>}
        <IconButton onClick={closeModal}>
          <Close />
        </IconButton>
      </Stack>
      {editMode ? (
        <Box sx={{ py: 2, px: 3 }}>
          <Stack component="form" spacing={2} onSubmit={handleSubmit(onSubmit)}>
            <TextField
              autoFocus
              defaultValue={todo?.title}
              label="Todo Title"
              variant="standard"
              {...register("title")}
            />
            <TextField
              multiline
              defaultValue={todo?.content}
              label="Description"
              rows={10}
              variant="standard"
              onKeyDown={handleKeyDown}
              {...register("content")}
            />
            <Stack direction="row" justifyContent="flex-end" spacing={1}>
              <Button type="button" variant="outlined" onClick={handleEditMode}>
                Cancel
              </Button>
              <Button disableElevation type="submit" variant="contained">
                Save
              </Button>
            </Stack>
          </Stack>
        </Box>
      ) : (
        <>
          <DialogTitle>{todo?.title}</DialogTitle>
          <DialogContent>
            {todo?.content
              .split(/\n/)
              .map((paragraph) =>
                paragraph ? (
                  <Typography key={crypto.randomUUID()}>{paragraph}</Typography>
                ) : (
                  <br key={crypto.randomUUID()} />
                )
              )}
          </DialogContent>
        </>
      )}
    </>
  );
}
