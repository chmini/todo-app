import React from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Stack, TextField } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

import api from "@/api";
import { isErrorWithMessage } from "@/api/utils";

import type { TodoFormData } from "@/api/todo";
import type { SubmitHandler } from "react-hook-form";

const schema = yup.object({
  title: yup.string().required("Please enter Title"),
  content: yup.string(),
});

export default function TodoForm() {
  const { enqueueSnackbar } = useSnackbar();
  const {
    control,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm<TodoFormData>({
    resolver: yupResolver(schema),
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation((formData: TodoFormData) => api.createTodo(formData), {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["todos"] });
      enqueueSnackbar("Created Successfully", { variant: "success" });
      reset();
    },
    onError: (error) => {
      if (isErrorWithMessage(error)) {
        enqueueSnackbar(error.message, { variant: "error" });
      }
    },
  });

  const onSubmit: SubmitHandler<TodoFormData> = (formData) => {
    mutate(formData);
    setFocus("title");
  };

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      await handleSubmit(onSubmit)();
    }
  };

  return (
    <Stack component="form" spacing={2} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        defaultValue=""
        name="title"
        rules={{ required: true }}
        render={({ field: { ref, ...field } }) => (
          <TextField
            error={!!errors.title}
            helperText={errors.title?.message}
            inputRef={ref}
            label="Todo Title"
            variant="standard"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        defaultValue=""
        name="content"
        render={({ field: { ref, ...field } }) => (
          <TextField
            multiline
            inputRef={ref}
            label="Description"
            variant="standard"
            onKeyDown={handleKeyDown}
            {...field}
          />
        )}
      />
      <Button size="large" type="submit">
        Add To Do
      </Button>
    </Stack>
  );
}
